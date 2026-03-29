# Quantinel

> AI-powered no-code trading strategy backtester. Describe your strategy in plain English — Quantinel converts it into logic, runs it on real crypto data, and shows you the results.

---

## 📋 Prerequisites

Everything runs inside **Docker**, so the only things you need installed are:

| Tool | Version | Download |
|------|---------|----------|
| Docker Desktop (Windows / Mac) | Latest | https://www.docker.com/products/docker-desktop |
| Docker Engine + Docker Compose (Linux) | Latest | https://docs.docker.com/engine/install/ |
| Git | Any | https://git-scm.com/downloads |

> **Windows users:** Make sure Docker Desktop is running before you start. All commands below can be run in **PowerShell**, **Git Bash**, or **WSL2** (WSL2 is recommended).
>
> **`make` not available on Windows?** See the [Windows (without make)](#-windows-without-make) section below.

---

## ⚡ Quick Start (Mac / Linux)

```bash
# 1. Clone the repo
git clone https://github.com/SohelPratap/quantinel.git
cd quantinel

# 2. Create your .env file  (.env is NOT included in the repo — you must create it)
cp .env.example .env
# Open .env in any editor and replace ANTHROPIC_API_KEY with your own key
# Get a free key at: https://console.anthropic.com/

# 3. Start everything
make dev
```

Once everything is up, open:

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Gateway API** | http://localhost:3001 |
| **Engine API docs** | http://localhost:8000/docs |

---

## 🪟 Windows (with Docker Desktop)

### Option A — PowerShell / Git Bash (with `make`)

If you have `make` installed (via [Chocolatey](https://chocolatey.org/): `choco install make`):

```powershell
git clone https://github.com/SohelPratap/quantinel.git
cd quantinel
copy .env.example .env   # creates your .env — then open it and set your ANTHROPIC_API_KEY
make dev
```

### Option B — Windows (without `make`)

Run the Docker Compose command directly — this is equivalent to `make dev`:

```powershell
git clone https://github.com/SohelPratap/quantinel.git
cd quantinel
copy .env.example .env   # creates your .env — then open it and set your ANTHROPIC_API_KEY
cd infra
docker compose up --build
```

---

## 🔑 Environment Variables

**`.env` is not included in the repo.** You must create it yourself:

```bash
cp .env.example .env   # Mac / Linux / Git Bash
copy .env.example .env # Windows PowerShell
```

Then open `.env` and fill in your own values — especially `ANTHROPIC_API_KEY`:

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ | **Your own key** — get it free at https://console.anthropic.com/ |
| `POSTGRES_USER` | ✅ | Database username (default: `quantinel`) |
| `POSTGRES_PASSWORD` | ✅ | Database password |
| `JWT_SECRET` | ✅ | Random secret for auth tokens |
| `BINANCE_API_KEY` | ❌ | Optional — public market data works without it |

---

## 🗂 Project Structure

```
quantinel/
├── frontend/      Next.js + Tailwind (UI, chart, metrics)
├── gateway/       Node.js + Express (API layer, auth, queue)
├── engine/        Python + FastAPI (backtest, indicators, AI parser)
├── infra/         Docker Compose config
└── shared/        JSON schemas shared across services
```

---

## 🧠 How It Works

1. **You type** a plain-English strategy (e.g. "Buy when RSI < 30, sell when RSI > 70")
2. **AI Parser** (Claude) converts it into structured JSON rules
3. **Backtest Engine** fetches historical OHLCV data from Binance, runs the strategy, and simulates trades
4. **Frontend** displays a candlestick chart with buy/sell markers and full performance metrics

---

## 🔧 Services

| Service | Port | Stack |
|---------|------|-------|
| Frontend | 3000 | Next.js, Tailwind |
| Gateway | 3001 | Node.js, Express |
| Engine | 8000 | Python, FastAPI |
| Redis | 6379 | Job queue + OHLCV cache |
| Postgres | 5432 | User/strategy storage |

---

## 📊 Supported Indicators

- RSI (Relative Strength Index)
- EMA (Exponential Moving Average)
- SMA (Simple Moving Average)
- MACD
- Bollinger Bands
- ATR (Average True Range)

---

## 🚀 Development Commands

```bash
make dev           # Start full stack (Docker, foreground)
make dev-bg        # Start in background
make stop          # Stop all containers
make clean         # Stop + wipe volumes (full reset)
make logs          # Tail all service logs
make engine-local  # Run Python engine without Docker
make gateway-local # Run Node gateway without Docker
make frontend-local# Run Next.js frontend without Docker
```

**Docker Compose equivalents (for Windows without `make`):**

```powershell
cd infra
docker compose up --build          # make dev
docker compose up --build -d       # make dev-bg
docker compose down                # make stop
docker compose down -v             # make clean
docker compose logs -f             # make logs
```

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

## 🛠 Troubleshooting

| Problem | Fix |
|---------|-----|
| `docker: command not found` | Install Docker Desktop and make sure it's running |
| `port already in use` | Stop whatever is using ports 3000, 3001, 8000, 5432, or 6379 |
| Engine crashes on startup | Check that `ANTHROPIC_API_KEY` is set in your `.env` file |
| Containers keep restarting | Run `make logs` (or `docker compose logs -f`) to see what's failing |
| Windows — `copy` fails | Use Git Bash or WSL2 and run `cp .env.example .env` instead |

---

## ⚠️ Disclaimer

Quantinel is for **simulation and learning only**. No real money is ever involved. Past backtest results do not guarantee future performance.

---

## 🛣 Roadmap

- [x] Phase 1 — RSI strategy, OHLCV data, chart, metrics
- [ ] Phase 2 — AI strategy parsing, multi-indicator support
- [ ] Phase 3 — Live paper trading, strategy comparison
