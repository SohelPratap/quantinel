import pandas as pd
from typing import Tuple, List


def simulate_trades(
    df: pd.DataFrame,
    entry_rule: dict,
    exit_rule: dict,
    initial_capital: float,
    position_size_pct: float = 100.0,
) -> Tuple[List[dict], List[float]]:
    """
    Simulate long-only trades based on entry/exit rules.
    Returns (trades, equity_curve).
    """
    capital     = initial_capital
    position    = None        # {"entry_price": float, "qty": float, "entry_time": ts}
    trades      = []
    equity_curve = []

    for ts, row in df.iterrows():
        current_price = row["close"]

        # ── Check EXIT first (avoid same-bar entry+exit) ─────────
        if position and _check_rule(row, exit_rule):
            pnl     = (current_price - position["entry_price"]) * position["qty"]
            pnl_pct = (current_price - position["entry_price"]) / position["entry_price"] * 100
            capital += position["qty"] * current_price

            trades.append({
                "entry_time":   str(position["entry_time"]),
                "exit_time":    str(ts),
                "entry_price":  round(position["entry_price"], 4),
                "exit_price":   round(current_price, 4),
                "qty":          round(position["qty"], 6),
                "pnl":          round(pnl, 2),
                "pnl_pct":      round(pnl_pct, 3),
                "side":         "long",
            })
            position = None

        # ── Check ENTRY ───────────────────────────────────────────
        if not position and _check_rule(row, entry_rule):
            invest = capital * (position_size_pct / 100)
            qty    = invest / current_price
            capital -= invest
            position = {
                "entry_price": current_price,
                "qty":         qty,
                "entry_time":  ts,
            }

        # ── Track equity ──────────────────────────────────────────
        open_value = (position["qty"] * current_price) if position else 0
        equity_curve.append(round(capital + open_value, 2))

    # ── Force close any open position at end ─────────────────────
    if position:
        last_price = df["close"].iloc[-1]
        pnl = (last_price - position["entry_price"]) * position["qty"]
        trades.append({
            "entry_time":  str(position["entry_time"]),
            "exit_time":   str(df.index[-1]),
            "entry_price": round(position["entry_price"], 4),
            "exit_price":  round(last_price, 4),
            "qty":         round(position["qty"], 6),
            "pnl":         round(pnl, 2),
            "pnl_pct":     round((last_price - position["entry_price"]) / position["entry_price"] * 100, 3),
            "side":        "long",
            "forced_close": True,
        })

    return trades, equity_curve


def _check_rule(row: pd.Series, rule: dict) -> bool:
    """Evaluate a single entry/exit rule against a candle row."""
    rule_type = rule.get("type", "")
    value     = rule.get("value")
    period    = rule.get("period", 14)

    col_map = {
        "rsi_below": (f"rsi_{period}", lambda v, t: v < t),
        "rsi_above": (f"rsi_{period}", lambda v, t: v > t),
        "ema_cross_above": (f"ema_{period}", lambda v, t: row["close"] > v),
        "ema_cross_below": (f"ema_{period}", lambda v, t: row["close"] < v),
        "price_above":     ("close",         lambda v, t: v > t),
        "price_below":     ("close",         lambda v, t: v < t),
    }

    if rule_type not in col_map:
        return False

    col, fn = col_map[rule_type]
    indicator_val = row.get(col)

    if indicator_val is None or pd.isna(indicator_val):
        return False

    return fn(indicator_val, value)
