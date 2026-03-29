import pandas as pd
from typing import Optional

from app.data.fetcher import fetch_ohlcv
from app.backtest.indicators import apply_indicators
from app.backtest.simulator import simulate_trades
from app.backtest.metrics import calculate_metrics


async def run_backtest(
    symbol: str,
    timeframe: str,
    start_date: str,
    end_date: str,
    initial_capital: float,
    strategy_rules: dict,
) -> dict:
    """
    End-to-end backtest pipeline.

    strategy_rules shape:
    {
        "indicators": [{"name": "rsi", "params": {"period": 14}}],
        "entry": {"type": "rsi_below", "value": 30},
        "exit":  {"type": "rsi_above", "value": 70},
        "position_size_pct": 100   # % of capital per trade
    }
    """

    # 1. Fetch OHLCV data
    candles = await fetch_ohlcv(symbol, timeframe, start_date, end_date)
    df = pd.DataFrame(candles, columns=["timestamp", "open", "high", "low", "close", "volume"])
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df.set_index("timestamp", inplace=True)

    # 2. Compute indicators
    required_indicators = strategy_rules.get("indicators", [])
    df = apply_indicators(df, required_indicators)

    # 3. Simulate trades
    trades, equity_curve = simulate_trades(
        df=df,
        entry_rule=strategy_rules["entry"],
        exit_rule=strategy_rules["exit"],
        initial_capital=initial_capital,
        position_size_pct=strategy_rules.get("position_size_pct", 100),
    )

    # 4. Calculate metrics
    metrics = calculate_metrics(trades, equity_curve, initial_capital)

    # 5. Build chart data (OHLCV + signals for frontend)
    chart_candles = [
        {
            "time":  int(row.name.timestamp()),
            "open":  row["open"],
            "high":  row["high"],
            "low":   row["low"],
            "close": row["close"],
        }
        for _, row in df.iterrows()
    ]

    return {
        "metrics":      metrics,
        "trades":       trades,
        "equity_curve": equity_curve,
        "candles":      chart_candles,
        "symbol":       symbol,
        "timeframe":    timeframe,
    }
