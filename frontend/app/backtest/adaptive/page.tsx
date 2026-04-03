"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BacktestConfig } from "@/components/dashboard/backtest-config"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain, CircleDot, Send, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

const observations = [
  "Detected strong resistance at $68,400",
  "RSI showing oversold conditions at 28.3",
  "Big players positioning LONG — institutional buying detected",
]

interface Suggestion {
  id: number
  text: string
  status: "pending" | "accepted" | "rejected"
}

export default function BacktestAdaptivePage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, text: "Add resistance filter at $68,400", status: "pending" },
    { id: 2, text: "Consider RSI(7) for faster signals", status: "pending" },
  ])
  const [agentMessage, setAgentMessage] = useState("")
  const [isBacktesting, setIsBacktesting] = useState(false)

  const handleSuggestion = (id: number, action: "accepted" | "rejected") => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: action } : s))
    )
    toast.success(action === "accepted" ? "Suggestion applied to strategy" : "Suggestion dismissed")
  }

  const handleStartBacktest = async (config: {
    symbol: string
    timeframe: string
    start_date: string
    end_date: string
    initial_capital: number
    position_size_pct: number
  }) => {
    setIsBacktesting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsBacktesting(false)
    toast.success("Adaptive backtest complete")
  }

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Adaptive Backtest</h1>
              <p className="text-sm text-muted-foreground">
                AI agent watches and advises while backtesting
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
            <CircleDot className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#10B981]">Agent Status: Active</span>
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Config + Chart */}
          <div className="space-y-4">
            <BacktestConfig onStartBacktest={handleStartBacktest} isRunning={isBacktesting} />
            <div className="h-64">
              <TradingChart />
            </div>
          </div>

          {/* Right: AI Advisor */}
          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#8B5CF6]" />
                AI Advisor
              </h2>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Market observations */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Market Observations
                </p>
                <div className="space-y-2">
                  {observations.map((obs, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground bg-secondary/30 rounded-lg px-3 py-2"
                    >
                      <span className="text-[#8B5CF6] mt-0.5">●</span>
                      {obs}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  AI Suggestions
                </p>
                <div className="space-y-2">
                  {suggestions.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2 gap-3"
                    >
                      <span className="text-sm text-foreground flex-1">{s.text}</span>
                      {s.status === "pending" ? (
                        <div className="flex gap-1.5 shrink-0">
                          <Button
                            size="sm"
                            className="h-6 text-xs px-2 bg-[#10B981] hover:bg-[#10B981]/90"
                            onClick={() => handleSuggestion(s.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs px-2 border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444]/10"
                            onClick={() => handleSuggestion(s.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs shrink-0">
                          {s.status === "accepted" ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          ) : (
                            <XCircle className="w-4 h-4 text-[#EF4444]" />
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversation area */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Ask the Agent
                </p>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask the AI agent about market conditions..."
                    value={agentMessage}
                    onChange={(e) => setAgentMessage(e.target.value)}
                    className="flex-1 min-h-[70px] bg-secondary/50 border-border text-sm resize-none"
                    rows={2}
                  />
                  <Button
                    size="sm"
                    className="self-end bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                    onClick={() => {
                      toast.info("Agent received your message")
                      setAgentMessage("")
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
