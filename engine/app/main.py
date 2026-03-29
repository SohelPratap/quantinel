from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.routes import router
from app.data.cache import init_redis


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_redis()
    yield


app = FastAPI(
    title="Quantinel Engine",
    description="Backtesting engine for Quantinel",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "quantinel-engine"}
