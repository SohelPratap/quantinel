"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  BarChart3,
  Code2,
  FileText,
  Download,
  Share2,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const backtestRecords: Record<string, {
  id: string
  name: string
  pair: string
  timeframe: string
  createdAt: string
  type: "Normal" | "Adaptive"
  description: string
  metrics: {
    totalReturn: string
    totalPnL: string
    winRate: string
    winningTrades: number
    losingTrades: number
    sharpeRatio: string
    maxDrawdown: string
    avgWin: string
    avgLoss: string
    profitFactor: string
    initialCapital: string
  }
  code: string
  trades: { date: string; type: string; price: number; pnl: string }[]
}> = {
  "1": {
    id: "1",
    name: "RSI + MACD Crossover",
    pair: "BTC/USDT",
    timeframe: "1h",
    createdAt: "2024-03-15",
    type: "Normal",
    description: "Buy when RSI drops below 30 and MACD shows bullish crossover. Stop loss at 3%, take profit at 8%.",
    metrics: {
      totalReturn: "+24.8%",
      totalPnL: "+$2,480",
      winRate: "68.5%",
      winningTrades: 23,
      losingTrades: 11,
      sharpeRatio: "1.85",
      maxDrawdown: "-8.2%",
      avgWin: "+$156.50",
      avgLoss: "-$89.20",
      profitFactor: "2.34",
      initialCapital: "$10,000",
    },
    code: `# RSI + MACD Crossover Strategy — BTC/USDT
import pandas as pd
import numpy as np
from quantinel import Strategy, Signal

class RSIMACDStrategy(Strategy):
    def __init__(self):
        self.rsi_period = 14
        self.macd_fast = 12
        self.macd_slow = 26

    def calculate_indicators(self, df):
        delta = df['close'].diff()
        gain = delta.where(delta > 0, 0)
        loss = -delta.where(delta < 0, 0)
        avg_gain = gain.rolling(self.rsi_period).mean()
        avg_loss = loss.rolling(self.rsi_period).mean()
        rs = avg_gain / avg_loss
        df['rsi'] = 100 - (100 / (1 + rs))
        exp1 = df['close'].ewm(span=self.macd_fast).mean()
        exp2 = df['close'].ewm(span=self.macd_slow).mean()
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=9).mean()
        return df

    def generate_signals(self, df):
        df = self.calculate_indicators(df)
        buy_condition = (df['rsi'] < 30) & (df['macd'] > df['macd_signal'])
        df['signal'] = np.where(buy_condition, Signal.BUY, Signal.HOLD)
        return df

strategy = RSIMACDStrategy()
strategy.set_stop_loss(0.03)
strategy.set_take_profit(0.08)`,
    trades: [
      { date: "2024-01-15", type: "BUY", price: 42850.0, pnl: "+$156.78" },
      { date: "2024-01-18", type: "BUY", price: 43100.0, pnl: "-$69.60" },
      { date: "2024-01-22", type: "BUY", price: 41200.0, pnl: "+$704.70" },
      { date: "2024-01-28", type: "BUY", price: 43800.0, pnl: "+$319.20" },
      { date: "2024-02-02", type: "BUY", price: 42100.0, pnl: "+$245.40" },
      { date: "2024-02-08", type: "BUY", price: 44500.0, pnl: "-$112.30" },
      { date: "2024-02-15", type: "BUY", price: 43200.0, pnl: "+$189.50" },
      { date: "2024-02-22", type: "BUY", price: 45800.0, pnl: "+$412.80" },
    ],
  },
  "2": {
    id: "2",
    name: "Bollinger Band Breakout",
    pair: "ETH/USDT",
    timeframe: "4h",
    createdAt: "2024-03-12",
    type: "Adaptive",
    description: "Agent detects regime and adjusts band width dynamically. Enters on breakout with volume confirmation.",
    metrics: {
      totalReturn: "+18.2%",
      totalPnL: "+$1,820",
      winRate: "62.3%",
      winningTrades: 17,
      losingTrades: 11,
      sharpeRatio: "1.52",
      maxDrawdown: "-6.4%",
      avgWin: "+$143.20",
      avgLoss: "-$76.50",
      profitFactor: "1.98",
      initialCapital: "$10,000",
    },
    code: `# Adaptive Bollinger Band Strategy — ETH/USDT
def strategy(data, params, agent_context):
    """Adaptive Bollinger Band Breakout with AI Agent"""
    regime = agent_context.detect_regime(data)

    # Agent adjusts band width based on volatility regime
    if regime == 'high_volatility':
        std_multiplier = 2.5
    elif regime == 'ranging':
        std_multiplier = 1.8
    else:
        std_multiplier = 2.0

    period = params.get('period', 20)
    rolling_mean = data['close'].rolling(period).mean()
    rolling_std = data['close'].rolling(period).std()
    upper_band = rolling_mean + (std_multiplier * rolling_std)
    lower_band = rolling_mean - (std_multiplier * rolling_std)

    volume_filter = data['volume'] > data['volume'].rolling(20).mean()
    buy_signal = (data['close'] > upper_band) & volume_filter
    sell_signal = data['close'] < lower_band

    agent_context.log(f"Regime: {regime}, Multiplier: {std_multiplier}")
    return {'buy': buy_signal, 'sell': sell_signal, 'regime': regime}`,
    trades: [
      { date: "2024-01-10", type: "BUY", price: 2210.0, pnl: "+$98.50" },
      { date: "2024-01-17", type: "BUY", price: 2380.0, pnl: "+$205.30" },
      { date: "2024-01-25", type: "BUY", price: 2290.0, pnl: "-$88.40" },
      { date: "2024-02-03", type: "BUY", price: 2450.0, pnl: "+$312.60" },
      { date: "2024-02-14", type: "BUY", price: 2530.0, pnl: "+$178.90" },
    ],
  },
  "3": {
    id: "3",
    name: "EMA Trend Following",
    pair: "SOL/USDT",
    timeframe: "1D",
    createdAt: "2024-03-10",
    type: "Normal",
    description: "Enter long when EMA(20) crosses above EMA(50). Exit when EMA crosses back below.",
    metrics: {
      totalReturn: "-5.4%",
      totalPnL: "-$540",
      winRate: "45.2%",
      winningTrades: 9,
      losingTrades: 12,
      sharpeRatio: "-0.32",
      maxDrawdown: "-12.1%",
      avgWin: "+$89.30",
      avgLoss: "-$124.50",
      profitFactor: "0.72",
      initialCapital: "$10,000",
    },
    code: `# EMA Trend Following — SOL/USDT
def strategy(data, params):
    ema_fast = data['close'].ewm(span=20).mean()
    ema_slow = data['close'].ewm(span=50).mean()
    buy_signal = (ema_fast > ema_slow) & (ema_fast.shift(1) <= ema_slow.shift(1))
    sell_signal = (ema_fast < ema_slow) & (ema_fast.shift(1) >= ema_slow.shift(1))
    return {'buy': buy_signal, 'sell': sell_signal}`,
    trades: [
      { date: "2024-01-05", type: "BUY", price: 98.50, pnl: "+$89.30" },
      { date: "2024-01-20", type: "BUY", price: 105.0, pnl: "-$124.50" },
      { date: "2024-02-01", type: "BUY", price: 92.0, pnl: "-$98.20" },
    ],
  },
  "4": {
    id: "4",
    name: "Volume Spike Strategy",
    pair: "BNB/USDT",
    timeframe: "15m",
    createdAt: "2024-03-08",
    type: "Adaptive",
    description: "AI agent detects anomalous volume spikes and adjusts position size dynamically for momentum trades.",
    metrics: {
      totalReturn: "+12.1%",
      totalPnL: "+$1,210",
      winRate: "58.7%",
      winningTrades: 33,
      losingTrades: 23,
      sharpeRatio: "1.21",
      maxDrawdown: "-5.8%",
      avgWin: "+$72.40",
      avgLoss: "-$47.10",
      profitFactor: "1.76",
      initialCapital: "$10,000",
    },
    code: `# Adaptive Volume Spike Strategy — BNB/USDT
def strategy(data, params, agent_context):
    vol_ma = data['volume'].rolling(20).mean()
    vol_spike = data['volume'] > vol_ma * 2.0
    sentiment = agent_context.get_market_sentiment()
    base_size = params.get('position_size', 0.1)
    position_size = base_size * (1.5 if sentiment == 'bullish' else 0.7)
    buy_signal = vol_spike & (data['close'] > data['close'].shift(1))
    sell_signal = vol_spike & (data['close'] < data['close'].shift(1))
    return {'buy': buy_signal, 'sell': sell_signal, 'position_size': position_size}`,
    trades: [
      { date: "2024-03-01", type: "BUY", price: 385.0, pnl: "+$72.40" },
      { date: "2024-03-02", type: "BUY", price: 391.0, pnl: "-$47.10" },
      { date: "2024-03-03", type: "BUY", price: 388.0, pnl: "+$95.20" },
      { date: "2024-03-05", type: "BUY", price: 395.0, pnl: "+$68.30" },
    ],
  },
  "5": {
    id: "5",
    name: "Mean Reversion",
    pair: "XRP/USDT",
    timeframe: "1h",
    createdAt: "2024-03-05",
    type: "Normal",
    description: "Buy oversold conditions (RSI < 30) and sell overbought (RSI > 70). Works well in ranging markets.",
    metrics: {
      totalReturn: "+8.9%",
      totalPnL: "+$890",
      winRate: "71.4%",
      winningTrades: 10,
      losingTrades: 4,
      sharpeRatio: "1.43",
      maxDrawdown: "-3.6%",
      avgWin: "+$121.80",
      avgLoss: "-$58.70",
      profitFactor: "2.87",
      initialCapital: "$10,000",
    },
    code: `# Mean Reversion Strategy — XRP/USDT
def strategy(data, params):
    rsi = compute_rsi(data['close'], 14)
    buy_signal = rsi < 30
    sell_signal = rsi > 70
    return {
        'buy': buy_signal,
        'sell': sell_signal,
        'stop_loss': 0.02,
        'take_profit': 0.05,
    }`,
    trades: [
      { date: "2024-03-01", type: "BUY", price: 0.62, pnl: "+$121.80" },
      { date: "2024-03-03", type: "BUY", price: 0.59, pnl: "+$98.40" },
      { date: "2024-03-05", type: "BUY", price: 0.64, pnl: "-$58.70" },
    ],
  },
}

const generateEquityCurve = (seed: number) => {
  const data = []
  let equity = 10000
  const rng = (n: number) => ((Math.sin(n * seed * 9301 + 49297) + 1) / 2)
  for (let i = 0; i < 60; i++) {
    const change = (rng(i) - 0.42) * 160
    equity = Math.max(equity + change, 7500)
    data.push({ day: i, equity })
  }
  return data
}

export default function BacktestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const record = backtestRecords[id] ?? backtestRecords["1"]
  const equityCurve = generateEquityCurve(parseInt(id) || 1)
  const minEquity = Math.min(...equityCurve.map((d) => d.equity)) - 200
  const maxEquity = Math.max(...equityCurve.map((d) => d.equity)) + 200
  const equityRange = maxEquity - minEquity
  const getY = (value: number) => ((maxEquity - value) / equityRange) * 100
  const isProfit = record.metrics.totalReturn.startsWith("+")

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/backtest/history"
              className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground">{record.name}</h1>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full border font-medium",
                  record.type === "Adaptive"
                    ? "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30"
                    : "bg-secondary text-muted-foreground border-border"
                )}>
                  {record.type === "Adaptive" && <Brain className="w-3 h-3 inline mr-1" />}
                  {record.type}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground">{record.pair}</span>
                <span className="text-sm text-muted-foreground">{record.timeframe}</span>
                <span className="text-sm text-muted-foreground">{record.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Metrics */}
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-foreground">Performance Metrics</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {isProfit
                      ? <TrendingUp className="w-4 h-4 text-[#10B981]" />
                      : <TrendingDown className="w-4 h-4 text-[#EF4444]" />}
                    <span className="text-xs text-muted-foreground">Total Return</span>
                  </div>
                  <span className={cn("text-xl font-semibold", isProfit ? "text-[#10B981]" : "text-[#EF4444]")}>
                    {record.metrics.totalReturn}
                  </span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                  </div>
                  <span className="text-xl font-semibold text-[#3B82F6]">{record.metrics.winRate}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs text-muted-foreground">Sharpe Ratio</span>
                  </div>
                  <span className="text-xl font-semibold text-[#8B5CF6]">{record.metrics.sharpeRatio}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-xs text-muted-foreground">Max Drawdown</span>
                  </div>
                  <span className="text-xl font-semibold text-[#EF4444]">{record.metrics.maxDrawdown}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Capital</span>
                  <span className="text-foreground">{record.metrics.initialCapital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net P&L</span>
                  <span className={isProfit ? "text-[#10B981]" : "text-[#EF4444]"}>{record.metrics.totalPnL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Trades</span>
                  <span className="text-foreground">{record.metrics.winningTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Losing Trades</span>
                  <span className="text-foreground">{record.metrics.losingTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Win</span>
                  <span className="text-[#10B981]">{record.metrics.avgWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Loss</span>
                  <span className="text-[#EF4444]">{record.metrics.avgLoss}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Factor</span>
                  <span className="text-foreground">{record.metrics.profitFactor}</span>
                </div>
              </div>
            </div>

            {/* Trade list */}
            <div className="glass-panel rounded-xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Trades</h3>
              <div className="space-y-2 max-h-[220px] overflow-auto">
                {record.trades.map((trade, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-6 h-6 rounded flex items-center justify-center text-xs font-medium",
                        trade.type === "BUY" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#EF4444]/20 text-[#EF4444]"
                      )}>
                        {trade.type === "BUY" ? "B" : "S"}
                      </span>
                      <div>
                        <span className="text-xs text-foreground font-mono">${trade.price.toLocaleString()}</span>
                        <p className="text-[10px] text-muted-foreground">{trade.date}</p>
                      </div>
                    </div>
                    <span className={cn("text-xs font-mono", trade.pnl.startsWith("+") ? "text-[#10B981]" : "text-[#EF4444]")}>
                      {trade.pnl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Chart & Code */}
          <div className="lg:col-span-2 space-y-4">
            {/* Equity Curve */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="font-medium text-foreground">Equity Curve</h2>
              </div>
              <div className="h-[200px] bg-[#0D1117] rounded-lg border border-border overflow-hidden relative">
                <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line key={y} x1="0" y1={y * 2} x2="600" y2={y * 2} stroke="#1A1F26" strokeWidth="1" />
                  ))}
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,200 ${equityCurve.map((d, i) => `${(i / equityCurve.length) * 600},${getY(d.equity) * 2}`).join(" ")} 600,200`}
                    fill="url(#equityGrad)"
                  />
                  <polyline
                    points={equityCurve.map((d, i) => `${(i / equityCurve.length) * 600},${getY(d.equity) * 2}`).join(" ")}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute top-2 left-2 text-xs">
                  <span className="text-muted-foreground">Initial: </span>
                  <span className="text-foreground">{record.metrics.initialCapital}</span>
                </div>
                <div className="absolute top-2 right-2 text-xs">
                  <span className="text-muted-foreground">Final: </span>
                  <span className={isProfit ? "text-[#10B981]" : "text-[#EF4444]"}>{record.metrics.totalPnL}</span>
                </div>
              </div>
            </div>

            {/* Strategy description */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">Strategy Description</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{record.description}</p>
            </div>

            {/* Strategy Code */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-accent" />
                <h2 className="font-medium text-foreground">Strategy Code</h2>
                {record.type === "Adaptive" && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                    <Brain className="w-3 h-3 inline mr-1" />
                    Adaptive
                  </span>
                )}
              </div>
              <div className="h-[280px] bg-[#0D1117] rounded-lg border border-border overflow-auto">
                <pre className="p-4 text-xs font-mono text-[#E5E7EB] leading-relaxed">{record.code}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
