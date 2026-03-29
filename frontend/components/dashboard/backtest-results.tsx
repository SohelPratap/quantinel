"use client"

import { TrendingUp, Percent, Activity, TrendingDown, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { type BacktestData } from "@/lib/api"

interface BacktestResultsProps {
  results?: BacktestData
}

export function BacktestResults({ results }: BacktestResultsProps) {
  const hasResults = !!results

  const metrics = results
    ? [
        {
          label: "Total Return",
          value: `${results.metrics.total_return_pct >= 0 ? "+" : ""}${results.metrics.total_return_pct.toFixed(2)}%`,
          change: `${results.metrics.total_pnl >= 0 ? "+" : ""}$${Math.abs(results.metrics.total_pnl).toLocaleString()}`,
          icon: TrendingUp,
          color: results.metrics.total_return_pct >= 0 ? "text-[#10B981]" : "text-[#EF4444]",
          bgColor: results.metrics.total_return_pct >= 0 ? "bg-[#10B981]/20" : "bg-[#EF4444]/20",
        },
        {
          label: "Win Rate",
          value: `${results.metrics.win_rate.toFixed(1)}%`,
          change: `${results.metrics.winning_trades}/${results.metrics.total_trades} trades`,
          icon: Percent,
          color: "text-[#3B82F6]",
          bgColor: "bg-[#3B82F6]/20",
        },
        {
          label: "Sharpe Ratio",
          value: results.metrics.sharpe_ratio.toFixed(2),
          change: results.metrics.sharpe_ratio >= 1 ? "Above avg" : "Below avg",
          icon: Activity,
          color: "text-[#8B5CF6]",
          bgColor: "bg-[#8B5CF6]/20",
        },
        {
          label: "Max Drawdown",
          value: `${results.metrics.max_drawdown_pct.toFixed(1)}%`,
          change: `Final: $${results.metrics.final_capital.toLocaleString()}`,
          icon: TrendingDown,
          color: "text-[#EF4444]",
          bgColor: "bg-[#EF4444]/20",
        },
      ]
    : []
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
                  {results!.trades.map((trade, i) => (
                    <>
                      <tr key={`buy-${i}`} className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 text-muted-foreground font-mono">{trade.entry_time}</td>
                        <td className="p-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#10B981]/20 text-[#10B981]">
                            BUY
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono text-foreground">
                          ${trade.entry_price.toLocaleString()}
                        </td>
                        <td className="p-2 text-right font-mono text-foreground">
                          {trade.qty.toFixed(4)}
                        </td>
                        <td className="p-2 text-right font-mono text-muted-foreground">—</td>
                      </tr>
                      <tr key={`sell-${i}`} className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 text-muted-foreground font-mono">{trade.exit_time}</td>
                        <td className="p-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#EF4444]/20 text-[#EF4444]">
                            SELL
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono text-foreground">
                          ${trade.exit_price.toLocaleString()}
                        </td>
                        <td className="p-2 text-right font-mono text-foreground">
                          {trade.qty.toFixed(4)}
                        </td>
                        <td
                          className={cn(
                            "p-2 text-right font-mono",
                            trade.pnl >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
                          )}
                        >
                          {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                        </td>
                      </tr>
                    </>
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
