"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { History, TrendingUp, TrendingDown, Clock, ArrowRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const sessions = [
  {
    id: "1",
    name: "RSI + EMA Live",
    pair: "BTC/USDT",
    timeframe: "1h",
    startedAt: "2024-03-15",
    totalReturn: "+8.4%",
    winRate: "70.0%",
    trades: 10,
    status: "profitable",
    type: "Live",
  },
  {
    id: "2",
    name: "MACD Momentum",
    pair: "ETH/USDT",
    timeframe: "4h",
    startedAt: "2024-03-13",
    totalReturn: "+5.2%",
    winRate: "66.7%",
    trades: 9,
    status: "profitable",
    type: "Live Adaptive",
  },
  {
    id: "3",
    name: "Bollinger Reversion",
    pair: "SOL/USDT",
    timeframe: "15m",
    startedAt: "2024-03-11",
    totalReturn: "-2.1%",
    winRate: "44.4%",
    trades: 18,
    status: "loss",
    type: "Live",
  },
  {
    id: "4",
    name: "Volume Breakout",
    pair: "BNB/USDT",
    timeframe: "1h",
    startedAt: "2024-03-09",
    totalReturn: "+11.3%",
    winRate: "71.4%",
    trades: 7,
    status: "profitable",
    type: "Live Adaptive",
  },
  {
    id: "5",
    name: "EMA Trend Follower",
    pair: "XRP/USDT",
    timeframe: "4h",
    startedAt: "2024-03-06",
    totalReturn: "+3.8%",
    winRate: "60.0%",
    trades: 5,
    status: "profitable",
    type: "Live",
  },
]

export default function LiveTestHistoryPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <History className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Live Test History</h1>
              <p className="text-sm text-muted-foreground">
                View and analyze your past live sessions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{sessions.length} sessions</span>
          </div>
        </div>

        <div className="grid gap-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/live-test/history/${session.id}`}
              className="glass-panel rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover-glow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    session.status === "profitable" ? "bg-[#10B981]/20" : "bg-[#EF4444]/20"
                  )}>
                    {session.status === "profitable" ? (
                      <TrendingUp className="w-6 h-6 text-[#10B981]" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-[#EF4444]" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{session.name}</h3>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full border font-medium",
                        session.type === "Live Adaptive"
                          ? "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30"
                          : "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30"
                      )}>
                        {session.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{session.pair}</span>
                      <span className="text-xs text-muted-foreground">{session.timeframe}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {session.startedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <span className={cn(
                      "text-lg font-semibold",
                      session.status === "profitable" ? "text-[#10B981]" : "text-[#EF4444]"
                    )}>
                      {session.totalReturn}
                    </span>
                    <p className="text-xs text-muted-foreground">Total Return</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">{session.winRate}</span>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">{session.trades}</span>
                    <p className="text-xs text-muted-foreground">Trades</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
