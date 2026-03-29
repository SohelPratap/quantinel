import pandas as pd
import pandas_ta as ta


def add_rsi(df: pd.DataFrame, period: int = 14) -> pd.DataFrame:
    df[f"rsi_{period}"] = ta.rsi(df["close"], length=period)
    return df


def add_ema(df: pd.DataFrame, period: int = 20) -> pd.DataFrame:
    df[f"ema_{period}"] = ta.ema(df["close"], length=period)
    return df


def add_sma(df: pd.DataFrame, period: int = 20) -> pd.DataFrame:
    df[f"sma_{period}"] = ta.sma(df["close"], length=period)
    return df


def add_macd(df: pd.DataFrame, fast=12, slow=26, signal=9) -> pd.DataFrame:
    macd = ta.macd(df["close"], fast=fast, slow=slow, signal=signal)
    df = pd.concat([df, macd], axis=1)
    return df


def add_bbands(df: pd.DataFrame, period: int = 20, std: float = 2.0) -> pd.DataFrame:
    bb = ta.bbands(df["close"], length=period, std=std)
    df = pd.concat([df, bb], axis=1)
    return df


def add_atr(df: pd.DataFrame, period: int = 14) -> pd.DataFrame:
    df[f"atr_{period}"] = ta.atr(df["high"], df["low"], df["close"], length=period)
    return df


# Registry — maps indicator name → function
INDICATOR_REGISTRY = {
    "rsi":    add_rsi,
    "ema":    add_ema,
    "sma":    add_sma,
    "macd":   add_macd,
    "bbands": add_bbands,
    "atr":    add_atr,
}


def apply_indicators(df: pd.DataFrame, required: list[dict]) -> pd.DataFrame:
    """
    Apply a list of indicators to the dataframe.
    required: [{"name": "rsi", "params": {"period": 14}}, ...]
    """
    for ind in required:
        name = ind["name"].lower()
        params = ind.get("params", {})
        fn = INDICATOR_REGISTRY.get(name)
        if fn:
            df = fn(df, **params)
    return df
