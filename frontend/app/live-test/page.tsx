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
import { Play, Loader2, CircleDot, TrendingUp, DollarSign, Activity, Zap } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const tradingPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"]
const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D"]

const liveMetrics = [
  { label: "Win Rate", value: "65.2%", icon: TrendingUp, color: "text-[#10B981]", bg: "bg-[#10B981]/20" },
  { label: "P&L", value: "+$1,234", icon: DollarSign, color: "text-[#10B981]", bg: "bg-[#10B981]/20" },
  { label: "Active Positions", value: "2", icon: Activity, color: "text-primary", bg: "bg-primary/20" },
  { label: "Total Trades", value: "18", icon: Zap, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/20" },
]

export default function LiveTestPage() {
  const [pair, setPair] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [positionSize, setPositionSize] = useState("10")
  const [capital, setCapital] = useState("10000")
  const [isLive, setIsLive] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = async () => {
    setIsStarting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsStarting(false)
    setIsLive(true)
    toast.success("Live test started!")
  }

  const handleStop = () => {
    setIsLive(false)
    toast.info("Live test stopped")
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">Live Test</h1>
              {isLive && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                  <CircleDot className="w-3 h-3 text-[#10B981] animate-pulse" />
                  <span className="text-xs font-medium text-[#10B981]">LIVE</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Run strategies on live market data</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[320px]">
          <TradingChart />
        </div>

        {/* Config + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[280px]">
          {/* Config */}
          <div className="glass-panel rounded-xl p-4 flex flex-col">
            <h2 className="text-sm font-semibold text-foreground mb-4">Live Test Config</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Trading Pair</Label>
                <Select value={pair} onValueChange={setPair}>
                  <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {tradingPairs.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Timeframe</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {timeframes.map((tf) => (
                      <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Capital ($)</Label>
                <Input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="bg-secondary/50 border-border h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Position Size (%)</Label>
                <Input
                  type="number"
                  value={positionSize}
                  onChange={(e) => setPositionSize(e.target.value)}
                  className="bg-secondary/50 border-border h-9 text-sm"
                  max="100"
                />
              </div>
            </div>
            {isLive ? (
              <Button
                onClick={handleStop}
                className="mt-4 w-full bg-[#EF4444] hover:bg-[#EF4444]/90 text-white"
              >
                Stop Live Test
              </Button>
            ) : (
              <Button
                onClick={handleStart}
                disabled={isStarting}
                className="mt-4 w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Live Test
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Live Results */}
          <div className="glass-panel rounded-xl p-4">
            <h2 className="text-sm font-semibold text-foreground mb-4">Live Results</h2>
            <div className="grid grid-cols-2 gap-3">
              {liveMetrics.map((m) => (
                <div key={m.label} className="bg-secondary/30 rounded-xl p-3 text-center">
                  <div className={cn("w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center", m.bg)}>
                    <m.icon className={cn("w-4 h-4", m.color)} />
                  </div>
                  <p className={cn("text-lg font-bold", m.color)}>{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
            {!isLive && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Start a live test to see real-time metrics
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
