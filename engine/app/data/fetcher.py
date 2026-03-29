import ccxt.async_support as ccxt
import os
from app.data.cache import get_cached_ohlcv, cache_ohlcv

_exchange = None


def _get_exchange():
    global _exchange
    if _exchange is None:
        _exchange = ccxt.binance({
            "apiKey":  os.getenv("BINANCE_API_KEY", ""),
            "secret":  os.getenv("BINANCE_SECRET", ""),
            "options": {"defaultType": "spot"},
            "enableRateLimit": True,
        })
    return _exchange


async def fetch_ohlcv(
    symbol: str,
    timeframe: str,
    start_date: str,
    end_date: str,
) -> list:
    """
    Fetch OHLCV candles, using Redis cache to avoid redundant API calls.
    Returns list of [timestamp_ms, open, high, low, close, volume].
    """
    cache_key = f"ohlcv:{symbol}:{timeframe}:{start_date}:{end_date}"
    cached = await get_cached_ohlcv(cache_key)
    if cached:
        return cached

    exchange = _get_exchange()
    since    = exchange.parse8601(f"{start_date}T00:00:00Z")
    until    = exchange.parse8601(f"{end_date}T23:59:59Z")

    all_candles = []
    while since < until:
        candles = await exchange.fetch_ohlcv(symbol, timeframe, since=since, limit=1000)
        if not candles:
            break
        all_candles.extend(candles)
        since = candles[-1][0] + 1
        if candles[-1][0] >= until:
            break

    # Trim to requested range
    all_candles = [c for c in all_candles if c[0] <= until]

    await cache_ohlcv(cache_key, all_candles, ttl=3600)  # cache 1hr
    return all_candles
