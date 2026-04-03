"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  FlaskConical,
  Play,
  Loader2,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const sampleResults = [
  { label: "Total Return", value: "+24.8%", positive: true, icon: TrendingUp },
  { label: "Win Rate", value: "68.5%", positive: true, icon: Percent },
  { label: "Max Drawdown", value: "-8.2%", positive: false, icon: TrendingDown },
  { label: "Sharpe Ratio", value: "1.84", positive: true, icon: Activity },
  { label: "Total Trades", value: "34", positive: true, icon: BarChart3 },
  { label: "Avg Hold Time", value: "4h 22m", positive: true, icon: Clock },
]

const sampleTrades = [
  { id: 1, type: "BUY", pair: "BTC/USDT", entry: "42,150", exit: "44,320", pnl: "+$2,170", result: "win" },
  { id: 2, type: "SELL", pair: "BTC/USDT", entry: "44,100", exit: "43,200", pnl: "+$900", result: "win" },
  { id: 3, type: "BUY", pair: "BTC/USDT", entry: "43,800", exit: "43,100", pnl: "-$700", result: "loss" },
  { id: 4, type: "BUY", pair: "BTC/USDT", entry: "42,900", exit: "45,600", pnl: "+$2,700", result: "win" },
  { id: 5, type: "SELL", pair: "BTC/USDT", entry: "45,400", exit: "44,800", pnl: "+$600", result: "win" },
]

export default function BacktestingPage() {
  const [prompt, setPrompt] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  const handleRunBacktest = async () => {
    if (!prompt.trim()) return
    setIsRunning(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsRunning(false)
    setHasResults(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Backtesting Suite</h1>
            <p className="text-sm text-muted-foreground">
              Describe your strategy in plain English — we'll test it on historical data
            </p>
          </div>
        </div>

        {/* Strategy Input */}
        <div className="glass-panel rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-medium text-foreground">Strategy Description</h2>
          <Textarea
            placeholder="e.g. Buy BTC when RSI drops below 30 and price is above the 200-day moving average. Sell when RSI exceeds 70 or price drops 5% from entry."
            className="min-h-[120px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Supports any plain-English strategy: indicators, conditions, risk rules
            </p>
            <Button
              onClick={handleRunBacktest}
              disabled={!prompt.trim() || isRunning}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running…
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Backtest
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        {hasResults && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {sampleResults.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.label} className="glass-panel rounded-xl p-4 text-center">
                    <Icon
                      className={cn(
                        "w-5 h-5 mx-auto mb-2",
                        metric.positive ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    />
                    <p
                      className={cn(
                        "text-lg font-semibold",
                        metric.positive ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    >
                      {metric.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{metric.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Trade Log */}
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">Trade Log</h2>
                <span className="text-xs text-muted-foreground">{sampleTrades.length} trades shown</span>
              </div>
              <div className="divide-y divide-border">
                {sampleTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="px-5 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          trade.type === "BUY"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : "bg-[#EF4444]/20 text-[#EF4444]"
                        )}
                      >
                        {trade.type}
                      </span>
                      <span className="text-sm text-foreground">{trade.pair}</span>
                      <span className="text-xs text-muted-foreground">
                        {trade.entry} → {trade.exit}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          trade.result === "win" ? "text-[#10B981]" : "text-[#EF4444]"
                        )}
                      >
                        {trade.pnl}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
