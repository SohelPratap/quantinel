import json
import os
import redis.asyncio as aioredis

_redis = None


async def init_redis():
    global _redis
    url = os.getenv("REDIS_URL", "redis://localhost:6379")
    _redis = await aioredis.from_url(url, decode_responses=True)
    return _redis


def get_redis():
    return _redis


async def get_cached_ohlcv(key: str):
    if not _redis:
        return None
    data = await _redis.get(key)
    return json.loads(data) if data else None


async def cache_ohlcv(key: str, data: list, ttl: int = 3600):
    if not _redis:
        return
    await _redis.setex(key, ttl, json.dumps(data))


async def cache_set(key: str, value: dict, ttl: int = 600):
    if not _redis:
        return
    await _redis.setex(key, ttl, json.dumps(value))


async def cache_get(key: str):
    if not _redis:
        return None
    data = await _redis.get(key)
    return json.loads(data) if data else None
