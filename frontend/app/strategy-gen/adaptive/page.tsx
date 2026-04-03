"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Brain,
  Loader2,
  RefreshCw,
  Activity,
  TrendingUp,
  TrendingDown,
  Cpu,
  MessageSquare,
  CircleDot,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const regimes = ["Trending Bull", "Trending Bear", "Ranging", "High Volatility", "Low Volume"]

const decisionLog = [
  {
    time: "14:32:05",
    regime: "Trending Bull",
    action: "HOLD",
    reason: "RSI approaching overbought (72). Waiting for pullback before adding.",
    mutation: null,
  },
  {
    time: "14:28:41",
    regime: "Trending Bull",
    action: "BUY",
    reason: "MACD bullish crossover confirmed. Momentum strong above 50 EMA.",
    mutation: "Increased position size from 2% → 2.8% due to high confidence signal",
  },
  {
    time: "14:15:20",
    regime: "Ranging",
    action: "CLOSE",
    reason: "Regime shift detected: trending → ranging. Reducing exposure.",
    mutation: "Switched from trend-following to mean-reversion parameters",
  },
  {
    time: "14:02:11",
    regime: "Ranging",
    action: "SELL",
    reason: "Price reached upper Bollinger Band boundary. Mean-reversion sell trigger.",
    mutation: null,
  },
]

export default function AdaptiveStrategyGenPage() {
  const [baseStrategy, setBaseStrategy] = useState("")
  const [isLaunching, setIsLaunching] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [currentRegime, setCurrentRegime] = useState("Trending Bull")
  const [mutations, setMutations] = useState(3)

  const handleLaunch = async () => {
    if (!baseStrategy.trim()) return
    setIsLaunching(true)
    await new Promise((r) => setTimeout(r, 2200))
    setIsLaunching(false)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Adaptive Strategy Generation</h1>
              <p className="text-sm text-muted-foreground">
                AI agent that evolves your strategy in real-time as market regimes change
              </p>
            </div>
          </div>
          {isRunning && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
              <CircleDot className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
              <span className="text-xs font-medium text-[#10B981]">Agent Active</span>
            </div>
          )}
        </div>

        {!isRunning ? (
          /* Setup form */
          <div className="glass-panel rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-medium text-foreground">Base Strategy</h2>
            <Textarea
              placeholder="e.g. Start with a momentum strategy using EMA crossover (20/50). The agent will adapt parameters and logic based on changing market conditions."
              className="min-h-[120px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
              value={baseStrategy}
              onChange={(e) => setBaseStrategy(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Provide a starting point — the agent continuously mutates it to fit live conditions
              </p>
              <Button
                onClick={handleLaunch}
                disabled={!baseStrategy.trim() || isLaunching}
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 gap-2"
              >
                {isLaunching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Initialising Agent…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Launch Adaptive Agent
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Running agent view */
          <div className="space-y-4">
            {/* Agent Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass-panel rounded-xl p-4 text-center">
                <Cpu className="w-5 h-5 mx-auto mb-2 text-[#8B5CF6]" />
                <p className="text-lg font-semibold text-foreground">{currentRegime}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Current Regime</p>
              </div>
              <div className="glass-panel rounded-xl p-4 text-center">
                <RefreshCw className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-lg font-semibold text-foreground">{mutations}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Strategy Mutations</p>
              </div>
              <div className="glass-panel rounded-xl p-4 text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[#10B981]" />
                <p className="text-lg font-semibold text-[#10B981]">+11.3%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Session Return</p>
              </div>
              <div className="glass-panel rounded-xl p-4 text-center">
                <Activity className="w-5 h-5 mx-auto mb-2 text-[#F59E0B]" />
                <p className="text-lg font-semibold text-foreground">71.4%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Win Rate</p>
              </div>
            </div>

            {/* Regime Detection */}
            <div className="glass-panel rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#8B5CF6]" />
                Market Regime Detection
              </h2>
              <div className="flex flex-wrap gap-2">
                {regimes.map((r) => (
                  <span
                    key={r}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border transition-all",
                      r === currentRegime
                        ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/50 text-[#8B5CF6] font-medium"
                        : "bg-secondary/50 border-border text-muted-foreground"
                    )}
                  >
                    {r === currentRegime && "● "}
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Decision Log */}
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  Agent Decision Log
                </h2>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/20 text-xs"
                  onClick={handleStop}
                >
                  Stop Agent
                </Button>
              </div>
              <div className="divide-y divide-border">
                {decisionLog.map((entry, i) => (
                  <div key={i} className="px-5 py-3 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono">{entry.time}</span>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          entry.action === "BUY"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : entry.action === "SELL"
                            ? "bg-[#EF4444]/20 text-[#EF4444]"
                            : entry.action === "CLOSE"
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {entry.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Regime: <span className="text-foreground">{entry.regime}</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.reason}</p>
                    {entry.mutation && (
                      <p className="text-xs text-[#8B5CF6] flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3" />
                        {entry.mutation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
