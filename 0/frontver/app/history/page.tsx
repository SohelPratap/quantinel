"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { History, TrendingUp, TrendingDown, Clock, ArrowRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const strategies = [
  {
    id: "1",
    name: "RSI + MACD Crossover",
    pair: "BTC/USDT",
    timeframe: "1h",
    createdAt: "2024-03-15",
    totalReturn: "+24.8%",
    winRate: "68.5%",
    trades: 34,
    status: "profitable",
  },
  {
    id: "2",
    name: "Bollinger Band Breakout",
    pair: "ETH/USDT",
    timeframe: "4h",
    createdAt: "2024-03-12",
    totalReturn: "+18.2%",
    winRate: "62.3%",
    trades: 28,
    status: "profitable",
  },
  {
    id: "3",
    name: "EMA Trend Following",
    pair: "SOL/USDT",
    timeframe: "1D",
    createdAt: "2024-03-10",
    totalReturn: "-5.4%",
    winRate: "45.2%",
    trades: 21,
    status: "loss",
  },
  {
    id: "4",
    name: "Volume Spike Strategy",
    pair: "BNB/USDT",
    timeframe: "15m",
    createdAt: "2024-03-08",
    totalReturn: "+12.1%",
    winRate: "58.7%",
    trades: 56,
    status: "profitable",
  },
  {
    id: "5",
    name: "Mean Reversion",
    pair: "XRP/USDT",
    timeframe: "1h",
    createdAt: "2024-03-05",
    totalReturn: "+8.9%",
    winRate: "71.4%",
    trades: 14,
    status: "profitable",
  },
  {
    id: "6",
    name: "Momentum Scalping",
    pair: "ADA/USDT",
    timeframe: "5m",
    createdAt: "2024-03-01",
    totalReturn: "-2.3%",
    winRate: "48.9%",
    trades: 89,
    status: "loss",
  },
]

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <History className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Strategy History</h1>
              <p className="text-sm text-muted-foreground">
                View and analyze your past backtests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{strategies.length} strategies</span>
          </div>
        </div>

        <div className="grid gap-4">
          {strategies.map((strategy) => (
            <Link
              key={strategy.id}
              href={`/history/${strategy.id}`}
              className="glass-panel rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover-glow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      strategy.status === "profitable"
                        ? "bg-[#10B981]/20"
                        : "bg-[#EF4444]/20"
                    )}
                  >
                    {strategy.status === "profitable" ? (
                      <TrendingUp
                        className={cn(
                          "w-6 h-6",
                          strategy.status === "profitable" ? "text-[#10B981]" : "text-[#EF4444]"
                        )}
                      />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-[#EF4444]" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground">{strategy.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {strategy.pair}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {strategy.timeframe}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {strategy.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <span
                      className={cn(
                        "text-lg font-semibold",
                        strategy.status === "profitable" ? "text-[#10B981]" : "text-[#EF4444]"
                      )}
                    >
                      {strategy.totalReturn}
                    </span>
                    <p className="text-xs text-muted-foreground">Total Return</p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">
                      {strategy.winRate}
                    </span>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">
                      {strategy.trades}
                    </span>
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
