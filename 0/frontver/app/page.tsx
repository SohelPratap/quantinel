"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AIStrategyPanel } from "@/components/dashboard/ai-strategy-panel"
import { CodeEditorPanel } from "@/components/dashboard/code-editor-panel"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { BacktestConfig } from "@/components/dashboard/backtest-config"
import { BacktestResults } from "@/components/dashboard/backtest-results"

export default function DashboardPage() {
  const [hasResults, setHasResults] = useState(false)
  const [isBacktesting, setIsBacktesting] = useState(false)

  const handleGenerateStrategy = (prompt: string) => {
    console.log("[v0] Strategy generated with prompt:", prompt)
  }

  const handleRunCode = () => {
    console.log("[v0] Running strategy code")
  }

  const handleStartBacktest = async () => {
    setIsBacktesting(true)
    // Simulate backtest
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setHasResults(true)
    setIsBacktesting(false)
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex flex-col gap-4">
        {/* Top Section - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[380px]">
          <AIStrategyPanel onGenerate={handleGenerateStrategy} />
          <CodeEditorPanel onRun={handleRunCode} />
          <TradingChart />
        </div>

        {/* Bottom Section - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[320px]">
          <BacktestConfig
            onStartBacktest={handleStartBacktest}
            isRunning={isBacktesting}
          />
          <BacktestResults hasResults={hasResults} />
        </div>
      </div>
    </DashboardLayout>
  )
}
