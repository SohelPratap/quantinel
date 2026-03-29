import pandas as pd
import numpy as np
from typing import List


def calculate_metrics(trades: List[dict], equity_curve: List[float], initial_capital: float) -> dict:
    """
    Calculate key performance metrics from a completed backtest.

    Args:
        trades: list of trade dicts with keys: entry_time, exit_time,
                entry_price, exit_price, side, pnl, pnl_pct
        equity_curve: list of portfolio values over time
        initial_capital: starting capital

    Returns:
        dict with all performance metrics
    """
    if not trades:
        return _empty_metrics(initial_capital)

    equity = pd.Series(equity_curve)
    final_capital = equity.iloc[-1]

    # ── P&L ──────────────────────────────────────────────────────
    total_pnl = final_capital - initial_capital
    total_return_pct = (total_pnl / initial_capital) * 100

    # ── Win Rate ─────────────────────────────────────────────────
    winning = [t for t in trades if t["pnl"] > 0]
    losing  = [t for t in trades if t["pnl"] <= 0]
    win_rate = len(winning) / len(trades) * 100 if trades else 0

    # ── Avg Win / Loss ────────────────────────────────────────────
    avg_win  = np.mean([t["pnl"] for t in winning]) if winning else 0
    avg_loss = np.mean([t["pnl"] for t in losing])  if losing  else 0
    profit_factor = abs(avg_win / avg_loss) if avg_loss != 0 else float("inf")

    # ── Max Drawdown ─────────────────────────────────────────────
    rolling_max = equity.cummax()
    drawdown    = (equity - rolling_max) / rolling_max * 100
    max_drawdown = drawdown.min()

    # ── Sharpe Ratio (annualised, assumes hourly bars) ────────────
    returns = equity.pct_change().dropna()
    sharpe  = 0.0
    if returns.std() > 0:
        sharpe = (returns.mean() / returns.std()) * np.sqrt(8760)  # 8760 hrs/year

    return {
        "total_trades":      len(trades),
        "winning_trades":    len(winning),
        "losing_trades":     len(losing),
        "win_rate":          round(win_rate, 2),
        "total_pnl":         round(total_pnl, 2),
        "total_return_pct":  round(total_return_pct, 2),
        "max_drawdown_pct":  round(max_drawdown, 2),
        "profit_factor":     round(profit_factor, 3),
        "sharpe_ratio":      round(sharpe, 3),
        "avg_win":           round(avg_win, 2),
        "avg_loss":          round(avg_loss, 2),
        "initial_capital":   initial_capital,
        "final_capital":     round(final_capital, 2),
    }


def _empty_metrics(initial_capital: float) -> dict:
    return {
        "total_trades": 0, "winning_trades": 0, "losing_trades": 0,
        "win_rate": 0, "total_pnl": 0, "total_return_pct": 0,
        "max_drawdown_pct": 0, "profit_factor": 0, "sharpe_ratio": 0,
        "avg_win": 0, "avg_loss": 0,
        "initial_capital": initial_capital, "final_capital": initial_capital,
    }
