"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  PlayCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Percent,
  Clock,
  CircleDot,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const positions = [
  {
    id: 1,
    pair: "BTC/USDT",
    side: "LONG",
    entry: "42,500",
    current: "43,820",
    size: "0.235 BTC",
    pnl: "+$310.20",
    pnlPct: "+3.1%",
    positive: true,
  },
  {
    id: 2,
    pair: "ETH/USDT",
    side: "LONG",
    entry: "2,840",
    current: "2,790",
    size: "1.8 ETH",
    pnl: "-$90.00",
    pnlPct: "-1.8%",
    positive: false,
  },
]

const recentTrades = [
  { time: "14:41:02", pair: "SOL/USDT", side: "SELL", price: "148.30", qty: "12.5", pnl: "+$87.50", win: true },
  { time: "14:22:15", pair: "BTC/USDT", side: "BUY", price: "42,500", qty: "0.235", pnl: "—", win: null },
  { time: "13:58:44", pair: "ETH/USDT", side: "BUY", price: "2,840", qty: "1.8", pnl: "—", win: null },
  { time: "13:30:21", pair: "SOL/USDT", side: "BUY", price: "141.20", qty: "12.5", pnl: "—", win: null },
]

export default function StandardPaperPage() {
  const [isActive, setIsActive] = useState(true)
  const [strategyName] = useState("RSI + MACD Crossover")

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Paper Trading</h1>
              <p className="text-sm text-muted-foreground">
                Live execution of <span className="text-foreground font-medium">{strategyName}</span> with virtual funds
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isActive && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                <CircleDot className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
                <span className="text-xs font-medium text-[#10B981]">Live</span>
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
              {isActive ? "Stop Session" : "Resume Session"}
            </Button>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-panel rounded-xl p-4 text-center">
            <DollarSign className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-lg font-semibold text-foreground">$10,220.20</p>
            <p className="text-xs text-muted-foreground mt-0.5">Portfolio Value</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[#10B981]" />
            <p className="text-lg font-semibold text-[#10B981]">+$220.20</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total P&L</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <Percent className="w-5 h-5 mx-auto mb-2 text-[#10B981]" />
            <p className="text-lg font-semibold text-[#10B981]">+2.2%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Return</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <Activity className="w-5 h-5 mx-auto mb-2 text-[#F59E0B]" />
            <p className="text-lg font-semibold text-foreground">4</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Trades</p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-medium text-foreground">Open Positions</h2>
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

        {/* Recent Trades */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground">Recent Trades</h2>
          </div>
          <div className="divide-y divide-border">
            {recentTrades.map((trade, i) => (
              <div
                key={i}
                className="px-5 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground font-mono w-16">{trade.time}</span>
                  <span className="text-sm text-foreground">{trade.pair}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded",
                      trade.side === "BUY"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : "bg-[#EF4444]/20 text-[#EF4444]"
                    )}
                  >
                    {trade.side}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {trade.qty} @ {trade.price}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    trade.win === true
                      ? "text-[#10B981]"
                      : trade.win === false
                      ? "text-[#EF4444]"
                      : "text-muted-foreground"
                  )}
                >
                  {trade.pnl}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
