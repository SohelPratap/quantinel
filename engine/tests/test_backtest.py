import pandas as pd
import pytest
from app.backtest.indicators import add_rsi, add_ema
from app.backtest.metrics import calculate_metrics
from app.backtest.simulator import _check_rule


def make_df(prices):
    return pd.DataFrame({
        "open":   prices,
        "high":   [p * 1.01 for p in prices],
        "low":    [p * 0.99 for p in prices],
        "close":  prices,
        "volume": [1000] * len(prices),
    })


def test_rsi_computed():
    df = make_df([100 + i % 5 for i in range(30)])
    df = add_rsi(df, period=14)
    assert "rsi_14" in df.columns
    assert df["rsi_14"].dropna().between(0, 100).all()


def test_ema_computed():
    df = make_df([100 + i for i in range(30)])
    df = add_ema(df, period=10)
    assert "ema_10" in df.columns


def test_metrics_empty():
    m = calculate_metrics([], [10000], 10000)
    assert m["total_trades"] == 0
    assert m["win_rate"] == 0


def test_metrics_one_winning_trade():
    trades = [{
        "entry_time": "2024-01-01", "exit_time": "2024-01-10",
        "entry_price": 100, "exit_price": 120,
        "qty": 10, "pnl": 200, "pnl_pct": 20, "side": "long"
    }]
    equity = [10000, 10200]
    m = calculate_metrics(trades, equity, 10000)
    assert m["total_trades"] == 1
    assert m["win_rate"] == 100.0
    assert m["total_pnl"] == 200


def test_check_rule_rsi_below():
    row = pd.Series({"close": 45000, "rsi_14": 28.5})
    assert _check_rule(row, {"type": "rsi_below", "value": 30, "period": 14}) is True
    assert _check_rule(row, {"type": "rsi_below", "value": 25, "period": 14}) is False
