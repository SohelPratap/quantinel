"use client"

import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AIStrategyPanel } from "@/components/dashboard/ai-strategy-panel"
import { CodeEditorPanel } from "@/components/dashboard/code-editor-panel"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { BacktestConfig } from "@/components/dashboard/backtest-config"
import { BacktestResults } from "@/components/dashboard/backtest-results"
import { api, type StrategyRules, type BacktestData } from "@/lib/api"

export default function DashboardPage() {
  const [strategyRules, setStrategyRules] = useState<StrategyRules | undefined>()
  const [backtestResults, setBacktestResults] = useState<BacktestData | undefined>()
  const [isBacktesting, setIsBacktesting] = useState(false)

  const handleGenerateStrategy = (rules: StrategyRules) => {
    setStrategyRules(rules)
  }

  const handleRunCode = () => {
    toast.info("Use the Backtest Settings below to run a full backtest.")
  }

  const handleStartBacktest = async (config: {
    symbol: string
    timeframe: string
    start_date: string
    end_date: string
    initial_capital: number
    position_size_pct: number
  }) => {
    if (!strategyRules) {
      toast.error("Generate a strategy first using the AI Strategy Generator.")
      return
    }

    setIsBacktesting(true)
    try {
      const { data } = await api.backtest.run({
        ...config,
        strategy_rules: {
          ...strategyRules,
          position_size_pct: config.position_size_pct,
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
        {/* Top Section - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[380px]">
          <AIStrategyPanel onGenerate={handleGenerateStrategy} />
          <CodeEditorPanel strategyRules={strategyRules} onRun={handleRunCode} />
          <TradingChart />
        </div>

        {/* Bottom Section - 2 columns */}
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
