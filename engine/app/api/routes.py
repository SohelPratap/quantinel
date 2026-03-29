from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.backtest.runner import run_backtest
from app.data.fetcher import fetch_ohlcv
from app.parser.strategy_parser import parse_strategy

router = APIRouter()


# ─── Request / Response Models ────────────────────────────────────────────────

class BacktestRequest(BaseModel):
    symbol: str = "BTC/USDT"
    timeframe: str = "1h"
    start_date: str          # "2024-01-01"
    end_date: str            # "2024-12-31"
    initial_capital: float = 10000.0
    strategy_rules: dict     # structured rules from parser


class ParseStrategyRequest(BaseModel):
    prompt: str              # plain English strategy from user
    symbol: Optional[str] = "BTC/USDT"


class OHLCVRequest(BaseModel):
    symbol: str = "BTC/USDT"
    timeframe: str = "1h"
    start_date: str
    end_date: str


# ─── Endpoints ────────────────────────────────────────────────────────────────

@router.post("/backtest/run")
async def backtest(req: BacktestRequest):
    try:
        result = await run_backtest(
            symbol=req.symbol,
            timeframe=req.timeframe,
            start_date=req.start_date,
            end_date=req.end_date,
            initial_capital=req.initial_capital,
            strategy_rules=req.strategy_rules,
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/strategy/parse")
async def parse(req: ParseStrategyRequest):
    """Convert plain-English strategy into structured rules via AI."""
    try:
        rules = await parse_strategy(req.prompt)
        return {"success": True, "rules": rules}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/data/ohlcv")
async def ohlcv(req: OHLCVRequest):
    try:
        candles = await fetch_ohlcv(
            symbol=req.symbol,
            timeframe=req.timeframe,
            start_date=req.start_date,
            end_date=req.end_date,
        )
        return {"success": True, "candles": candles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
