# Quantinel

> AI-powered no-code trading strategy backtester. Describe your strategy in plain English — Quantinel converts it into logic, runs it on real crypto data, and shows you the results.

---

## 📋 Prerequisites

Make sure you have the following installed before getting started:

| Requirement | Version | Notes |
|---|---|---|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | Required to run all services |
| [Docker Compose](https://docs.docker.com/compose/install/) | v2+ | Bundled with Docker Desktop |
| Free Disk Space | ~2 GB | For Docker images and volumes |

> **Docker Desktop** (Mac/Windows) includes both Docker and Docker Compose out of the box.

---

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/SohelPratap/quantinel.git
cd quantinel

# 2. Start everything
make dev
```

Then open:
- **Frontend** → http://localhost:3000
- **Gateway API** → http://localhost:3001
- **Python Engine** → http://localhost:8000/docs

---

## 🗂 Project Structure

```
quantinel/
├── frontend/      React + Vite (UI, chart, metrics)
├── gateway/       Node.js + Express (API layer, auth, queue)
├── engine/        Python + FastAPI (backtest, indicators, AI parser)
├── infra/         Docker Compose + Kubernetes manifests
├── shared/        JSON schemas shared across services
└── .github/       CI/CD workflows
```

---

## 🧠 How It Works

1. **User types** a plain-English strategy (e.g. "Buy when RSI < 30, sell when RSI > 70")
2. **AI Parser** (Claude) converts it into structured JSON rules
3. **Backtest Engine** fetches historical OHLCV data from Binance, runs the strategy, simulates trades
4. **Frontend** displays a candlestick chart with buy/sell markers + full performance metrics

---

## 🔧 Services

| Service   | Port | Stack                  |
|-----------|------|------------------------|
| Frontend  | 3000 | React, Vite, Tailwind  |
| Gateway   | 3001 | Node.js, Express       |
| Engine    | 8000 | Python, FastAPI        |
| Redis     | 6379 | Job queue + OHLCV cache|
| Postgres  | 5432 | User/strategy storage  |

---

## 📊 Supported Indicators

- RSI (Relative Strength Index)
- EMA (Exponential Moving Average)
- SMA (Simple Moving Average)
- MACD
- Bollinger Bands
- ATR (Average True Range)

---

## 🧪 Running Tests

```bash
# Python engine tests
cd engine && python -m pytest tests/ -v

# Gateway lint
cd gateway && npm run lint

# Frontend lint
cd frontend && npm run lint
```

---

## 🚀 Development Commands

```bash
make dev          # Start full stack (Docker)
make dev-bg       # Start in background
make stop         # Stop all containers
make clean        # Stop + wipe volumes
make logs         # Tail all logs
make engine-local # Run engine without Docker
```

---

## ⚠️ Disclaimer

Quantinel is for **simulation and learning only**. No real money is ever involved. Past backtest results do not guarantee future performance.

---

## 🛣 Roadmap

- [x] Phase 1 — RSI strategy, OHLCV data, chart, metrics
- [ ] Phase 2 — AI strategy parsing, multi-indicator support
- [ ] Phase 3 — Live paper trading, strategy comparison
