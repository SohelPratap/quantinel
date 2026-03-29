const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:3001"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrategyRules {
  indicators: Array<{ name: string; params: Record<string, number> }>
  entry: { type: string; value: number; period?: number }
  exit: { type: string; value: number; period?: number }
  position_size_pct: number
  description?: string
  error?: string
}

export interface BacktestParams {
  symbol: string
  timeframe: string
  start_date: string
  end_date: string
  initial_capital: number
  strategy_rules: StrategyRules
}

export interface Trade {
  entry_time: string
  exit_time: string
  entry_price: number
  exit_price: number
  qty: number
  pnl: number
  pnl_pct: number
  side: string
  forced_close?: boolean
}

export interface BacktestMetrics {
  total_trades: number
  winning_trades: number
  losing_trades: number
  win_rate: number
  total_pnl: number
  total_return_pct: number
  max_drawdown_pct: number
  profit_factor: number
  sharpe_ratio: number
  avg_win: number
  avg_loss: number
  initial_capital: number
  final_capital: number
}

export interface BacktestData {
  metrics: BacktestMetrics
  trades: Trade[]
  equity_curve: number[]
  candles: Array<{ time: number; open: number; high: number; low: number; close: number }>
  symbol: string
  timeframe: string
}

export interface AuthUser {
  id: string
  email: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("quantinel_token")
}

export function saveToken(token: string): void {
  localStorage.setItem("quantinel_token", token)
}

export function clearToken(): void {
  localStorage.removeItem("quantinel_token")
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })
  let data: Record<string, unknown>
  try {
    data = await res.json()
  } catch {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  if (!res.ok) throw new Error((data.error ?? data.message ?? `Request failed: ${res.status}`) as string)
  return data as T
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const api = {
  auth: {
    login(email: string, password: string) {
      return request<{ token: string; user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
    },
    register(email: string, password: string) {
      return request<{ token: string; user: AuthUser }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
    },
  },

  strategy: {
    parse(prompt: string, symbol?: string) {
      return request<{ success: boolean; rules: StrategyRules }>("/api/strategy/parse", {
        method: "POST",
        body: JSON.stringify({ prompt, symbol }),
      })
    },
  },

  backtest: {
    run(params: BacktestParams) {
      return request<{ success: boolean; data: BacktestData }>("/api/backtest/run", {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
  },
}
