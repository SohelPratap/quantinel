"use client"

import { useState } from "react"
import { Play, Loader2, Settings2 } from "lucide-react"
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

const tradingPairs = [
  "BTC/USDT",
  "ETH/USDT",
  "SOL/USDT",
  "BNB/USDT",
  "XRP/USDT",
  "ADA/USDT",
]

const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D"]

interface BacktestConfigProps {
  onStartBacktest: (config: {
    symbol: string
    timeframe: string
    start_date: string
    end_date: string
    initial_capital: number
    position_size_pct: number
  }) => void
  isRunning: boolean
}

export function BacktestConfig({ onStartBacktest, isRunning }: BacktestConfigProps) {
  const [pair, setPair] = useState("BTC/USDT")
  const [timeframe, setTimeframe] = useState("1h")
  const [startDate, setStartDate] = useState("2024-01-01")
  const [endDate, setEndDate] = useState("2024-03-01")
  const [capital, setCapital] = useState("10000")
  const [positionSize, setPositionSize] = useState("10")

  const handleStart = () => {
    onStartBacktest({
      symbol: pair,
      timeframe: timeframe.toLowerCase(),
      start_date: startDate,
      end_date: endDate,
      initial_capital: parseFloat(capital) || 10000,
      position_size_pct: parseFloat(positionSize) || 10,
    })
  }

  return (
    <div className="glass-panel rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center">
          <Settings2 className="w-4 h-4 text-[#06B6D4]" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Backtest Settings</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Trading Pair</Label>
          <Select value={pair} onValueChange={setPair}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {tradingPairs.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
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
                <SelectItem key={tf} value={tf}>
                  {tf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-secondary/50 border-border h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-secondary/50 border-border h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Initial Capital ($)</Label>
          <Input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="bg-secondary/50 border-border h-9 text-sm"
            placeholder="10000"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Position Size (%)</Label>
          <Input
            type="number"
            value={positionSize}
            onChange={(e) => setPositionSize(e.target.value)}
            className="bg-secondary/50 border-border h-9 text-sm"
            placeholder="10"
            max="100"
          />
        </div>
      </div>

      <Button
        onClick={handleStart}
        disabled={isRunning}
        className="mt-4 w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Running Backtest...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Start Backtest
          </>
        )}
      </Button>
    </div>
  )
}
