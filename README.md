# Quantinel

> AI-powered no-code trading platform. Describe your strategy in plain English — Quantinel converts it into logic, runs it across multiple modes (backtest, live, adaptive), and guides you to a better strategy through agentic intelligence and two-way conversation.

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

## 🚦 Trading Modes

Quantinel supports four distinct trading modes:

| Mode | Description |
|------|-------------|
| **Backtest** | Run your strategy on historical OHLCV data and evaluate performance |
| **Live** | Execute your strategy signals in a real-time (paper or live) market environment |
| **Adaptive Backtest** | Backtest with agentic intelligence watching over the run — AI surfaces market context, refines rules, and suggests improvements mid-session |
| **Adaptive Live** | Trade live while the AI agent monitors the session in real time, flags structure shifts, and recommends strategy adjustments via conversation |

---

## 🧠 How It Works

1. **User types** a plain-English strategy (e.g. "Buy when RSI < 30, sell when RSI > 70")
2. **AI Parser** (Claude) converts it into structured JSON rules
3. **Engine** fetches OHLCV data (historical or real-time), runs the strategy, and simulates trades
4. **Frontend** displays a candlestick chart with buy/sell markers + full performance metrics
5. **Agentic Intelligence** watches the session and steps in with insights (see below)

---

## 🤖 Agentic Intelligence

In **Adaptive** modes the AI agent acts as a co-pilot alongside the trader. It does not place trades — it watches, reads the market, and advises.

### What the agent observes
- **Market structure** — detects support/resistance zones, trend lines, and key price levels
- **Order-flow signals** — reads bidding and ask-side activity to gauge participant intent
- **Player positioning** — identifies whether institutional participants ("big players") or retail traders are likely positioned long or short, and flags when they may be entering or exiting

### What the agent suggests
- Surfaces contextual features the current strategy may be missing (e.g. "There is a strong resistance zone at X; consider adding a filter")
- Recommends complementary indicators or rules to combine with the existing strategy for a better expected outcome
- Explains its reasoning so the trader can accept, reject, or modify each suggestion

### Two-way strategy refinement conversation
- The trader and the agent iterate through a **back-and-forth dialogue** — the trader shares intent, the agent proposes specific rule changes
- Refinement can happen during an Adaptive Backtest *or* an Adaptive Live session
- Once the trader is satisfied, the refined strategy can be promoted to **paper trading** to validate it in a risk-free environment before finalising

### Refinement workflow
```
Idea → Adaptive Backtest/Live → AI suggestions → Conversation → Refined Strategy → Paper Trading → Finalised
```

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

Quantinel is for **simulation, learning, and strategy research only**. Any live or paper-trading features do not constitute financial advice. Past backtest results do not guarantee future performance. Always do your own research before risking real capital.

---

## 🛣 Roadmap

- [x] Phase 1 — RSI strategy, OHLCV data, chart, metrics
- [ ] Phase 2 — AI strategy parsing, multi-indicator support
- [ ] Phase 3 — Live & paper trading, strategy comparison
- [ ] Phase 4 — Adaptive Backtest mode with agentic intelligence overlay
- [ ] Phase 5 — Adaptive Live mode, order-flow analysis, player-positioning signals
- [ ] Phase 6 — Two-way strategy refinement conversation, strategy promotion to paper trading
