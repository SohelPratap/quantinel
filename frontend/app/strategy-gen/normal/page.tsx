"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Wand2,
  Loader2,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  DollarSign,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const symbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"]
const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D"]

const sampleStrategy = {
  name: "AI-Generated Momentum Strategy",
  description:
    "Combines RSI divergence with MACD crossover signals. Enters long positions when RSI shows bullish divergence and MACD crosses above signal line. Uses ATR-based stop-loss.",
  rules: [
    "Enter LONG when RSI(14) shows bullish divergence on 1H chart",
    "Confirm with MACD(12,26,9) bullish crossover",
    "Stop-loss at 1.5× ATR(14) below entry",
    "Take profit at 3× ATR(14) above entry (2:1 R/R)",
    "Max 2% capital risk per trade",
  ],
  metrics: [
    { label: "Expected Return", value: "+18.4%", positive: true, icon: TrendingUp },
    { label: "Win Rate", value: "64.2%", positive: true, icon: Percent },
    { label: "Max Drawdown", value: "-9.7%", positive: false, icon: TrendingDown },
    { label: "Sharpe Ratio", value: "1.62", positive: true, icon: Activity },
  ],
}

export default function NormalStrategyGenPage() {
  const [symbol, setSymbol] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [capital, setCapital] = useState("")
  const [risk, setRisk] = useState("")
  const [idea, setIdea] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsGenerating(false)
    setGenerated(true)
  }

  const canGenerate = capital.trim() && risk.trim()

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Normal Strategy Generation</h1>
            <p className="text-sm text-muted-foreground">
              Set your parameters — AI generates a complete trading strategy and backtests it
            </p>
          </div>
        </div>

        {/* Parameters */}
        <div className="glass-panel rounded-xl p-5 space-y-5">
          <h2 className="text-sm font-medium text-foreground">Trading Parameters</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Symbol */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Trading Pair</label>
              <div className="relative">
                <select
                  className="w-full h-9 rounded-md bg-secondary/50 border border-border text-foreground text-sm px-3 appearance-none cursor-pointer"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                >
                  {symbols.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Timeframe */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Timeframe</label>
              <div className="relative">
                <select
                  className="w-full h-9 rounded-md bg-secondary/50 border border-border text-foreground text-sm px-3 appearance-none cursor-pointer"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  {timeframes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Capital */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Initial Capital (USDT)</label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="10000"
                  className="pl-8 bg-secondary/50 border-border text-foreground"
                  value={capital}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === "" || (Number(v) >= 0 && !isNaN(Number(v)))) setCapital(v)
                  }}
                  type="number"
                  min="0"
                />
              </div>
            </div>

            {/* Risk */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Risk per Trade (%)</label>
              <div className="relative">
                <Percent className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="2"
                  className="pl-8 bg-secondary/50 border-border text-foreground"
                  value={risk}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === "" || (Number(v) >= 0 && Number(v) <= 100 && !isNaN(Number(v)))) setRisk(v)
                  }}
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Optional idea */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Strategy Idea (optional — AI generates from scratch if blank)
            </label>
            <Input
              placeholder="e.g. Trend-following using moving averages on high-volume breakouts"
              className="bg-secondary/50 border-border text-foreground"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="bg-accent hover:bg-accent/90 gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Strategy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Generated Strategy */}
        {generated && (
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">{sampleStrategy.name}</h2>
                <Button size="sm" variant="outline" className="bg-secondary/50 border-border text-xs">
                  Save Strategy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{sampleStrategy.description}</p>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Strategy Rules
                </h3>
                <ul className="space-y-2">
                  {sampleStrategy.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 font-medium">
                        {i + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Backtest preview metrics */}
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Instant Backtest Preview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleStrategy.metrics.map((m) => {
                  const Icon = m.icon
                  return (
                    <div key={m.label} className="glass-panel rounded-xl p-4 text-center">
                      <Icon
                        className={cn(
                          "w-5 h-5 mx-auto mb-2",
                          m.positive ? "text-[#10B981]" : "text-[#EF4444]"
                        )}
                      />
                      <p
                        className={cn(
                          "text-lg font-semibold",
                          m.positive ? "text-[#10B981]" : "text-[#EF4444]"
                        )}
                      >
                        {m.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
