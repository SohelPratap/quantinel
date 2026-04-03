"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Zap,
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  RefreshCw,
  CircleDot,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const agentDecisions = [
  {
    time: "14:52:11",
    regime: "High Volatility",
    action: "REDUCE",
    reason: "Volatility spike detected (VIX proxy +18%). Reducing position size by 40%.",
    mutation: "Position size: 2.8% → 1.7%",
    tradeExec: null,
  },
  {
    time: "14:47:33",
    regime: "Trending Bull",
    action: "BUY",
    reason: "Strong momentum signal. EMA crossover + volume surge. Agent confidence: 87%.",
    mutation: null,
    tradeExec: "BUY 0.18 BTC/USDT @ 43,200",
  },
  {
    time: "14:38:05",
    regime: "Ranging",
    action: "CLOSE",
    reason: "Regime transition from trending → ranging. Exiting trend-following positions.",
    mutation: "Activated mean-reversion mode. RSI thresholds: 30/70 → 35/65",
    tradeExec: "SELL 0.22 BTC/USDT @ 43,650",
  },
  {
    time: "14:21:48",
    regime: "Trending Bull",
    action: "BUY",
    reason: "Initial entry. Strong uptrend confirmed on 1H and 4H timeframes.",
    mutation: null,
    tradeExec: "BUY 0.22 BTC/USDT @ 42,800",
  },
]

const positions = [
  {
    id: 1,
    pair: "BTC/USDT",
    side: "LONG",
    entry: "43,200",
    current: "43,820",
    size: "0.18 BTC",
    pnl: "+$111.60",
    pnlPct: "+1.4%",
    positive: true,
    agentManaged: true,
  },
]

export default function AdaptivePaperPage() {
  const [isActive, setIsActive] = useState(true)
  const [currentRegime] = useState("High Volatility")
  const [mutations] = useState(5)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Adaptive Paper Trading</h1>
              <p className="text-sm text-muted-foreground">
                Adaptive AI agent trades live with virtual funds — strategy evolves in real-time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isActive && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30">
                <CircleDot className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
                <span className="text-xs font-medium text-[#F59E0B]">Agent Live</span>
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "text-xs border",
                isActive
                  ? "bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/20"
                  : "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20"
              )}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Stop Agent" : "Restart Agent"}
            </Button>
          </div>
        </div>

        {/* Agent Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-panel rounded-xl p-4 text-center">
            <Brain className="w-5 h-5 mx-auto mb-2 text-[#8B5CF6]" />
            <p className="text-lg font-semibold text-foreground">{currentRegime}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Detected Regime</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <RefreshCw className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-lg font-semibold text-foreground">{mutations}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Live Mutations</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <DollarSign className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-lg font-semibold text-foreground">$10,111.60</p>
            <p className="text-xs text-muted-foreground mt-0.5">Portfolio Value</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[#10B981]" />
            <p className="text-lg font-semibold text-[#10B981]">+1.1%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Session Return</p>
          </div>
        </div>

        {/* Current Strategy State */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#8B5CF6]" />
            Current Agent Strategy State
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
              <p className="text-muted-foreground">Mode</p>
              <p className="text-foreground font-medium">Volatility-adjusted momentum</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
              <p className="text-muted-foreground">Position Size</p>
              <p className="text-[#F59E0B] font-medium">1.7% (reduced from 2.8%)</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
              <p className="text-muted-foreground">Stop-loss</p>
              <p className="text-foreground font-medium">2.0× ATR(14) — widened for volatility</p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Open Positions</h2>
            <span className="text-xs text-muted-foreground">Agent-managed</span>
          </div>
          {positions.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No open positions
            </div>
          ) : (
            <div className="divide-y divide-border">
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className="px-5 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        pos.positive ? "bg-[#10B981]/20" : "bg-[#EF4444]/20"
                      )}
                    >
                      {pos.positive ? (
                        <ChevronUp className="w-5 h-5 text-[#10B981]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#EF4444]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{pos.pair}</span>
                        <span
                          className={cn(
                            "text-xs px-1.5 py-0.5 rounded font-medium",
                            pos.side === "LONG"
                              ? "bg-[#10B981]/20 text-[#10B981]"
                              : "bg-[#EF4444]/20 text-[#EF4444]"
                          )}
                        >
                          {pos.side}
                        </span>
                        {pos.agentManaged && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
                            AI
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pos.size} · Entry: {pos.entry} · Now: {pos.current}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        pos.positive ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    >
                      {pos.pnl}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        pos.positive ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    >
                      {pos.pnlPct}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent Decision Log */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground">Agent Decision Log</h2>
          </div>
          <div className="divide-y divide-border">
            {agentDecisions.map((entry, i) => (
              <div key={i} className="px-5 py-3 space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-muted-foreground font-mono">{entry.time}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded",
                      entry.action === "BUY"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : entry.action === "SELL" || entry.action === "CLOSE"
                        ? "bg-[#EF4444]/20 text-[#EF4444]"
                        : entry.action === "REDUCE"
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
                {entry.tradeExec && (
                  <p className="text-xs text-[#10B981] flex items-center gap-1.5">
                    <Activity className="w-3 h-3" />
                    Executed: {entry.tradeExec}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
