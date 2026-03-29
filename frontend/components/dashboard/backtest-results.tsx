"use client"

import { TrendingUp, Percent, Activity, TrendingDown, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface BacktestResultsProps {
  hasResults: boolean
}

const metrics = [
  {
    label: "Total Return",
    value: "+24.8%",
    change: "+$2,480",
    icon: TrendingUp,
    color: "text-[#10B981]",
    bgColor: "bg-[#10B981]/20",
  },
  {
    label: "Win Rate",
    value: "68.5%",
    change: "23/34 trades",
    icon: Percent,
    color: "text-[#3B82F6]",
    bgColor: "bg-[#3B82F6]/20",
  },
  {
    label: "Sharpe Ratio",
    value: "1.85",
    change: "Above avg",
    icon: Activity,
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]/20",
  },
  {
    label: "Max Drawdown",
    value: "-8.2%",
    change: "-$820",
    icon: TrendingDown,
    color: "text-[#EF4444]",
    bgColor: "bg-[#EF4444]/20",
  },
]

const tradeLogs = [
  { time: "2024-01-15 09:32:00", action: "BUY", price: 42850.00, amount: 0.234, pnl: null },
  { time: "2024-01-16 14:15:00", action: "SELL", price: 43520.00, amount: 0.234, pnl: "+$156.78" },
  { time: "2024-01-18 11:45:00", action: "BUY", price: 43100.00, amount: 0.232, pnl: null },
  { time: "2024-01-19 16:22:00", action: "SELL", price: 42800.00, amount: 0.232, pnl: "-$69.60" },
  { time: "2024-01-22 08:10:00", action: "BUY", price: 41200.00, amount: 0.243, pnl: null },
  { time: "2024-01-24 13:55:00", action: "SELL", price: 44100.00, amount: 0.243, pnl: "+$704.70" },
  { time: "2024-01-28 10:30:00", action: "BUY", price: 43800.00, amount: 0.228, pnl: null },
  { time: "2024-01-30 15:45:00", action: "SELL", price: 45200.00, amount: 0.228, pnl: "+$319.20" },
]

export function BacktestResults({ hasResults }: BacktestResultsProps) {
  return (
    <div className="glass-panel rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#10B981]" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Backtest Results</h2>
      </div>

      {!hasResults ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Run a backtest to see results
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.label}
                  className="bg-secondary/30 rounded-lg p-3 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", metric.bgColor)}>
                      <Icon className={cn("w-3.5 h-3.5", metric.color)} />
                    </div>
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={cn("text-lg font-semibold", metric.color)}>
                      {metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{metric.change}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trade Logs */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              Trade Execution Logs
            </h3>
            <div className="flex-1 overflow-auto bg-[#0D1117] rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-[#0D1117]">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left p-2 font-medium">Time</th>
                    <th className="text-left p-2 font-medium">Action</th>
                    <th className="text-right p-2 font-medium">Price</th>
                    <th className="text-right p-2 font-medium">Amount</th>
                    <th className="text-right p-2 font-medium">PnL</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeLogs.map((log, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                      <td className="p-2 text-muted-foreground font-mono">{log.time}</td>
                      <td className="p-2">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-medium",
                            log.action === "BUY"
                              ? "bg-[#10B981]/20 text-[#10B981]"
                              : "bg-[#EF4444]/20 text-[#EF4444]"
                          )}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="p-2 text-right font-mono text-foreground">
                        ${log.price.toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-mono text-foreground">
                        {log.amount}
                      </td>
                      <td
                        className={cn(
                          "p-2 text-right font-mono",
                          log.pnl?.startsWith("+")
                            ? "text-[#10B981]"
                            : log.pnl?.startsWith("-")
                            ? "text-[#EF4444]"
                            : "text-muted-foreground"
                        )}
                      >
                        {log.pnl || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
