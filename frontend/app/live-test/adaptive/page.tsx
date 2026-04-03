"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Brain, CircleDot, Send, CheckCircle2, XCircle, Play, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const observations = [
  "Price bouncing off key support at $67,200",
  "Volume 40% above 20-period average — momentum increasing",
  "Smart money accumulation pattern detected on 15m chart",
]

interface Suggestion {
  id: number
  text: string
  status: "pending" | "accepted" | "rejected"
}

const tradingPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT"]
const timeframes = ["1m", "5m", "15m", "1h", "4h"]

export default function LiveTestAdaptivePage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, text: "Scale into position — momentum confirming", status: "pending" },
    { id: 2, text: "Tighten stop loss to $66,800 (break-even)", status: "pending" },
  ])
  const [agentMessage, setAgentMessage] = useState("")
  const [isLive, setIsLive] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [pair, setPair] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [capital, setCapital] = useState("10000")

  const handleSuggestion = (id: number, action: "accepted" | "rejected") => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: action } : s))
    )
    toast.success(action === "accepted" ? "Agent suggestion applied" : "Suggestion dismissed")
  }

  const handleStart = async () => {
    setIsStarting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsStarting(false)
    setIsLive(true)
    toast.success("Adaptive live test started!")
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
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Adaptive Live Test</h1>
                {isLive && (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                    <CircleDot className="w-3 h-3 text-[#10B981] animate-pulse" />
                    <span className="text-xs font-medium text-[#10B981]">LIVE</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                AI agent watches and advises during live trading
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
            <CircleDot className="w-3.5 h-3.5 text-[#8B5CF6] animate-pulse" />
            <span className="text-xs font-medium text-[#8B5CF6]">Agent Status: Active</span>
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Config + Chart */}
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-4">
              <h2 className="text-sm font-semibold text-foreground mb-3">Live Config</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Trading Pair</Label>
                  <Select value={pair} onValueChange={setPair}>
                    <SelectTrigger className="bg-secondary/50 border-border h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {tradingPairs.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-secondary/50 border-border h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {timeframes.map((tf) => <SelectItem key={tf} value={tf}>{tf}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Capital ($)</Label>
                  <Input
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="bg-secondary/50 border-border h-8 text-sm"
                  />
                </div>
              </div>
              <Button
                onClick={handleStart}
                disabled={isStarting || isLive}
                className="mt-3 w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white"
              >
                {isStarting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Starting...</>
                ) : isLive ? (
                  "Live Test Running"
                ) : (
                  <><Play className="w-4 h-4 mr-2" />Start Adaptive Live Test</>
                )}
              </Button>
            </div>
            <div className="h-64">
              <TradingChart />
            </div>
          </div>

          {/* Right: AI Advisor */}
          <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#8B5CF6]" />
                AI Live Advisor
              </h2>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Live Observations
                </p>
                <div className="space-y-2">
                  {observations.map((obs, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-foreground bg-secondary/30 rounded-lg px-3 py-2">
                      <span className="text-[#10B981] mt-0.5">●</span>
                      {obs}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Agent Suggestions
                </p>
                <div className="space-y-2">
                  {suggestions.map((s) => (
                    <div key={s.id} className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2 gap-3">
                      <span className="text-sm text-foreground flex-1">{s.text}</span>
                      {s.status === "pending" ? (
                        <div className="flex gap-1.5 shrink-0">
                          <Button size="sm" className="h-6 text-xs px-2 bg-[#10B981] hover:bg-[#10B981]/90" onClick={() => handleSuggestion(s.id, "accepted")}>Accept</Button>
                          <Button size="sm" variant="outline" className="h-6 text-xs px-2 border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444]/10" onClick={() => handleSuggestion(s.id, "rejected")}>Reject</Button>
                        </div>
                      ) : (
                        <span className="text-xs shrink-0">
                          {s.status === "accepted"
                            ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                            : <XCircle className="w-4 h-4 text-[#EF4444]" />}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Ask the Agent</p>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask about live market conditions..."
                    value={agentMessage}
                    onChange={(e) => setAgentMessage(e.target.value)}
                    className="flex-1 min-h-[70px] bg-secondary/50 border-border text-sm resize-none"
                    rows={2}
                  />
                  <Button size="sm" className="self-end bg-[#8B5CF6] hover:bg-[#8B5CF6]/90" onClick={() => { toast.info("Agent received your message"); setAgentMessage("") }}>
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
