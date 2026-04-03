"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Brain,
  CircleDot,
  Send,
  CheckCircle2,
  XCircle,
  Bot,
  User,
  Play,
  Square,
  Loader2,
  TrendingUp,
  BarChart2,
  DollarSign,
  Activity,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const tradingPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "ADA/USDT"]
const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D"]

interface Suggestion {
  id: number
  text: string
  status: "pending" | "accepted" | "rejected"
}

interface ChatMessage {
  role: "user" | "ai"
  content: string
}

const initialChat: ChatMessage[] = [
  { role: "ai", content: "Adaptive backtest mode ready. I'll monitor market conditions and suggest parameter adjustments in real time." },
  { role: "user", content: "What regime is the market in right now?" },
  { role: "ai", content: "Detected a ranging regime with moderate volatility. RSI thresholds adjusted to 35/75 for better accuracy." },
]

export default function BacktestAdaptivePage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, text: "Add resistance filter at $68,400", status: "pending" },
    { id: 2, text: "Consider RSI(7) for faster signals", status: "pending" },
  ])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat)
  const [chatInput, setChatInput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [pair, setPair] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [startDate, setStartDate] = useState("2024-01-01")
  const [endDate, setEndDate] = useState("2024-03-01")
  const [capital, setCapital] = useState("10000")

  const handleSuggestion = (id: number, action: "accepted" | "rejected") => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: action } : s))
    )
    toast.success(action === "accepted" ? "Suggestion applied to strategy" : "Suggestion dismissed")
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: chatInput },
      { role: "ai", content: "Analyzing your query against current backtest data..." },
    ])
    setChatInput("")
  }

  const handleStart = async () => {
    setIsStarting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsStarting(false)
    setIsRunning(true)
    toast.success("Adaptive backtest started!")
  }

  const handleStop = () => {
    setIsRunning(false)
    toast.info("Adaptive backtest stopped.")
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex gap-4">
        {/* Left: AI Chat Panel */}
        <div className="w-72 glass-panel rounded-xl flex flex-col min-h-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#8B5CF6]" />
              <h2 className="text-sm font-medium text-foreground">AI Agent</h2>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
              <CircleDot className="w-2.5 h-2.5 text-[#10B981] animate-pulse" />
              <span className="text-[10px] font-medium text-[#10B981]">Active</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  msg.role === "user" ? "bg-primary/20" : "bg-[#8B5CF6]/20"
                )}>
                  {msg.role === "user"
                    ? <User className="w-3 h-3 text-primary" />
                    : <Bot className="w-3 h-3 text-[#8B5CF6]" />}
                </div>
                <div className={cn(
                  "rounded-lg px-3 py-2 text-xs max-w-[85%]",
                  msg.role === "user" ? "bg-primary/20 text-foreground" : "bg-secondary/80 text-foreground"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* AI Suggestions inline */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Agent Suggestions
              </p>
              {suggestions.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-secondary/30 rounded-lg px-2 py-1.5 gap-2">
                  <span className="text-xs text-foreground flex-1 leading-tight">{s.text}</span>
                  {s.status === "pending" ? (
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" className="h-5 text-[10px] px-1.5 bg-[#10B981] hover:bg-[#10B981]/90" onClick={() => handleSuggestion(s.id, "accepted")}>✓</Button>
                      <Button size="sm" variant="outline" className="h-5 text-[10px] px-1.5 border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444]/10" onClick={() => handleSuggestion(s.id, "rejected")}>✕</Button>
                    </div>
                  ) : (
                    <span className="shrink-0">
                      {s.status === "accepted"
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        : <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              placeholder="Ask agent..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendChat() }}
              className="flex-1 bg-secondary/50 border border-border rounded-md px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary"
            />
            <Button size="sm" className="px-2 bg-[#8B5CF6] hover:bg-[#8B5CF6]/90" onClick={handleSendChat}>
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Right: Chart + Stats */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Config bar */}
          <div className="glass-panel rounded-xl px-4 py-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm font-semibold text-foreground">Adaptive Backtest</span>
            </div>
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Pair</Label>
                <Select value={pair} onValueChange={setPair}>
                  <SelectTrigger className="w-28 bg-secondary/50 border-border h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {tradingPairs.map((p) => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground">TF</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-16 bg-secondary/50 border-border h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {timeframes.map((tf) => <SelectItem key={tf} value={tf} className="text-xs">{tf}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">From</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-secondary/50 border-border h-7 text-xs w-32" />
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">To</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-secondary/50 border-border h-7 text-xs w-32" />
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Capital $</Label>
                <Input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} className="bg-secondary/50 border-border h-7 text-xs w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isRunning && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                  <CircleDot className="w-3 h-3 text-[#8B5CF6] animate-pulse" />
                  <span className="text-xs font-medium text-[#8B5CF6]">RUNNING</span>
                </div>
              )}
              {!isRunning ? (
                <Button
                  size="sm"
                  className="h-7 text-xs bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                  onClick={handleStart}
                  disabled={isStarting}
                >
                  {isStarting ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1" />}
                  {isStarting ? "Starting..." : "Run"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="h-7 text-xs bg-[#EF4444] hover:bg-[#EF4444]/90"
                  onClick={handleStop}
                >
                  <Square className="w-3 h-3 mr-1" />
                  Stop
                </Button>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-0">
            <TradingChart />
          </div>

          {/* Live Stats */}
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#8B5CF6]" />
                Backtest Statistics
              </h3>
              {isRunning && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                  <span className="text-[10px] font-medium text-[#8B5CF6]">Processing</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-xs text-muted-foreground">Win Rate</span>
                </div>
                <span className={cn("text-lg font-semibold", isRunning ? "text-[#10B981]" : "text-muted-foreground")}>
                  {isRunning ? "68.5%" : "—"}
                </span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="text-xs text-muted-foreground">Total P&L</span>
                </div>
                <span className={cn("text-lg font-semibold", isRunning ? "text-[#10B981]" : "text-muted-foreground")}>
                  {isRunning ? "+$2,480" : "—"}
                </span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <BarChart2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="text-xs text-muted-foreground">Total Trades</span>
                </div>
                <span className={cn("text-lg font-semibold", isRunning ? "text-foreground" : "text-muted-foreground")}>
                  {isRunning ? "34" : "—"}
                </span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span className="text-xs text-muted-foreground">Max Drawdown</span>
                </div>
                <span className={cn("text-lg font-semibold", isRunning ? "text-[#EF4444]" : "text-muted-foreground")}>
                  {isRunning ? "-8.2%" : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
