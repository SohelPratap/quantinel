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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample strategy data
const strategyData = {
  id: "1",
  name: "RSI + MACD Crossover",
  pair: "BTC/USDT",
  timeframe: "1h",
  createdAt: "2024-03-15",
  description: "Buy when RSI drops below 30 and MACD shows bullish crossover. Set stop loss at 3% and take profit at 8%.",
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
  },
  code: `# AI Generated Strategy - BTC/USDT
import pandas as pd
import numpy as np
from quantinel import Strategy, Signal

class RSIMACDStrategy(Strategy):
    def __init__(self):
        self.rsi_period = 14
        self.macd_fast = 12
        self.macd_slow = 26
        
    def calculate_indicators(self, df):
        # RSI Calculation
        delta = df['close'].diff()
        gain = delta.where(delta > 0, 0)
        loss = -delta.where(delta < 0, 0)
        avg_gain = gain.rolling(self.rsi_period).mean()
        avg_loss = loss.rolling(self.rsi_period).mean()
        rs = avg_gain / avg_loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # MACD Calculation
        exp1 = df['close'].ewm(span=self.macd_fast).mean()
        exp2 = df['close'].ewm(span=self.macd_slow).mean()
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=9).mean()
        
        return df
    
    def generate_signals(self, df):
        df = self.calculate_indicators(df)
        buy_condition = (
            (df['rsi'] < 30) & 
            (df['macd'] > df['macd_signal'])
        )
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
}

// Generate sample equity curve data
const generateEquityCurve = () => {
  const data = []
  let equity = 10000
  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.4) * 150
    equity = Math.max(equity + change, 8000)
    data.push({ day: i, equity })
  }
  return data
}

const equityCurve = generateEquityCurve()
const minEquity = Math.min(...equityCurve.map((d) => d.equity)) - 200
const maxEquity = Math.max(...equityCurve.map((d) => d.equity)) + 200
const equityRange = maxEquity - minEquity

export default function StrategyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  console.log("[v0] Viewing strategy:", id)

  const getY = (value: number) => {
    return ((maxEquity - value) / equityRange) * 100
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/history"
              className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {strategyData.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground">
                  {strategyData.pair}
                </span>
                <span className="text-sm text-muted-foreground">
                  {strategyData.timeframe}
                </span>
                <span className="text-sm text-muted-foreground">
                  {strategyData.createdAt}
                </span>
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
          {/* Left Column - Metrics */}
          <div className="space-y-4">
            {/* Main metrics */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-foreground">Performance Metrics</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs text-muted-foreground">Total Return</span>
                  </div>
                  <span className="text-xl font-semibold text-[#10B981]">
                    {strategyData.metrics.totalReturn}
                  </span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                  </div>
                  <span className="text-xl font-semibold text-[#3B82F6]">
                    {strategyData.metrics.winRate}
                  </span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs text-muted-foreground">Sharpe Ratio</span>
                  </div>
                  <span className="text-xl font-semibold text-[#8B5CF6]">
                    {strategyData.metrics.sharpeRatio}
                  </span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-xs text-muted-foreground">Max Drawdown</span>
                  </div>
                  <span className="text-xl font-semibold text-[#EF4444]">
                    {strategyData.metrics.maxDrawdown}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Trades</span>
                  <span className="text-foreground">{strategyData.metrics.winningTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Losing Trades</span>
                  <span className="text-foreground">{strategyData.metrics.losingTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Win</span>
                  <span className="text-[#10B981]">{strategyData.metrics.avgWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Loss</span>
                  <span className="text-[#EF4444]">{strategyData.metrics.avgLoss}</span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-muted-foreground">Profit Factor</span>
                  <span className="text-foreground">{strategyData.metrics.profitFactor}</span>
                </div>
              </div>
            </div>

            {/* Trade list */}
            <div className="glass-panel rounded-xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Trades</h3>
              <div className="space-y-2 max-h-[200px] overflow-auto">
                {strategyData.trades.map((trade, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-6 h-6 rounded flex items-center justify-center text-xs font-medium",
                          trade.type === "BUY"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : "bg-[#EF4444]/20 text-[#EF4444]"
                        )}
                      >
                        B
                      </span>
                      <div>
                        <span className="text-xs text-foreground font-mono">
                          ${trade.price.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-muted-foreground">{trade.date}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-mono",
                        trade.pnl.startsWith("+") ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    >
                      {trade.pnl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Chart & Code */}
          <div className="lg:col-span-2 space-y-4">
            {/* Equity Curve */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="font-medium text-foreground">Equity Curve</h2>
              </div>

              <div className="h-[200px] bg-[#0D1117] rounded-lg border border-border overflow-hidden relative">
                <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y * 2}
                      x2="600"
                      y2={y * 2}
                      stroke="#1A1F26"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Equity line */}
                  <polyline
                    points={equityCurve
                      .map((d, i) => `${(i / equityCurve.length) * 600},${getY(d.equity) * 2}`)
                      .join(" ")}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Area fill */}
                  <polygon
                    points={`0,200 ${equityCurve
                      .map((d, i) => `${(i / equityCurve.length) * 600},${getY(d.equity) * 2}`)
                      .join(" ")} 600,200`}
                    fill="url(#equityGradient)"
                  />

                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Labels */}
                <div className="absolute top-2 left-2 text-xs">
                  <span className="text-muted-foreground">Starting: </span>
                  <span className="text-foreground">$10,000</span>
                </div>
                <div className="absolute top-2 right-2 text-xs">
                  <span className="text-muted-foreground">Final: </span>
                  <span className="text-[#10B981]">$12,480</span>
                </div>
              </div>
            </div>

            {/* Strategy Code */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-accent" />
                <h2 className="font-medium text-foreground">Strategy Code</h2>
              </div>

              <div className="h-[300px] bg-[#0D1117] rounded-lg border border-border overflow-auto">
                <pre className="p-4 text-xs font-mono text-[#E5E7EB] leading-relaxed">
                  {strategyData.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
