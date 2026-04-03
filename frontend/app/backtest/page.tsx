"use client"

import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { BacktestConfig } from "@/components/dashboard/backtest-config"
import { BacktestResults } from "@/components/dashboard/backtest-results"
import { api, type BacktestData } from "@/lib/api"

export default function BacktestPage() {
  const [backtestResults, setBacktestResults] = useState<BacktestData | undefined>()
  const [isBacktesting, setIsBacktesting] = useState(false)

  const handleStartBacktest = async (config: {
    symbol: string
    timeframe: string
    start_date: string
    end_date: string
    initial_capital: number
    position_size_pct: number
  }) => {
    setIsBacktesting(true)
    try {
      const { position_size_pct, ...restConfig } = config
      const { data } = await api.backtest.run({
        ...restConfig,
        strategy_rules: {
          indicators: [{ name: "RSI", params: { period: 14 } }],
          entry: { type: "rsi", value: 40 },
          exit: { type: "rsi", value: 70 },
          position_size_pct,
        },
      })
      setBacktestResults(data)
      toast.success(`Backtest complete — ${data.metrics.total_trades} trades executed.`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Backtest failed")
    } finally {
      setIsBacktesting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex flex-col gap-4">
        {/* Chart - full width on top */}
        <div className="h-[380px]">
          <TradingChart />
        </div>

        {/* Config + Results - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[320px]">
          <BacktestConfig
            onStartBacktest={handleStartBacktest}
            isRunning={isBacktesting}
          />
          <BacktestResults results={backtestResults} />
        </div>
      </div>
    </DashboardLayout>
  )
}
