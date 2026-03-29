"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D"]

// Generate sample candlestick data
const generateCandleData = () => {
  const data = []
  let price = 67500
  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.5) * 800
    const open = price
    const close = price + change
    const high = Math.max(open, close) + Math.random() * 200
    const low = Math.min(open, close) - Math.random() * 200
    price = close
    data.push({ open, close, high, low, index: i })
  }
  return data
}

const candleData = generateCandleData()

// Sample trade markers
const tradeMarkers = [
  { index: 12, type: "buy", price: 67200 },
  { index: 28, type: "sell", price: 68100 },
  { index: 38, type: "buy", price: 67800 },
  { index: 52, type: "sell", price: 68400 },
]

export function TradingChart() {
  const [activeTimeframe, setActiveTimeframe] = useState("1h")

  const minPrice = Math.min(...candleData.map((d) => d.low)) - 200
  const maxPrice = Math.max(...candleData.map((d) => d.high)) + 200
  const priceRange = maxPrice - minPrice

  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * 100
  }

  return (
    <div className="glass-panel rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">BTC/USDT</h2>
            <span className="text-xs text-muted-foreground">Binance Spot</span>
          </div>
          <span className="text-lg font-semibold text-[#10B981] ml-2">
            $67,842.50
          </span>
          <span className="text-xs text-[#10B981]">+2.34%</span>
        </div>

        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md transition-colors",
                activeTimeframe === tf
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Candlestick Chart */}
      <div className="flex-1 relative bg-[#0D1117] rounded-lg border border-border overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y * 3}
              x2="600"
              y2={y * 3}
              stroke="#1A1F26"
              strokeWidth="1"
            />
          ))}

          {/* Candlesticks */}
          {candleData.map((candle, i) => {
            const x = (i / candleData.length) * 600 + 5
            const width = 6
            const isGreen = candle.close > candle.open

            const bodyTop = getY(Math.max(candle.open, candle.close)) * 3
            const bodyBottom = getY(Math.min(candle.open, candle.close)) * 3
            const bodyHeight = Math.max(bodyBottom - bodyTop, 1)

            const wickTop = getY(candle.high) * 3
            const wickBottom = getY(candle.low) * 3

            return (
              <g key={i}>
                {/* Wick */}
                <line
                  x1={x + width / 2}
                  y1={wickTop}
                  x2={x + width / 2}
                  y2={wickBottom}
                  stroke={isGreen ? "#10B981" : "#EF4444"}
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={width}
                  height={bodyHeight}
                  fill={isGreen ? "#10B981" : "#EF4444"}
                  rx="1"
                />
              </g>
            )
          })}

          {/* Trade markers */}
          {tradeMarkers.map((marker, i) => {
            const x = (marker.index / candleData.length) * 600 + 8
            const y = getY(marker.price) * 3

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={marker.type === "buy" ? "#10B981" : "#EF4444"}
                  opacity="0.8"
                />
                {marker.type === "buy" ? (
                  <polygon
                    points={`${x},${y - 3} ${x - 3},${y + 2} ${x + 3},${y + 2}`}
                    fill="#FFFFFF"
                  />
                ) : (
                  <polygon
                    points={`${x},${y + 3} ${x - 3},${y - 2} ${x + 3},${y - 2}`}
                    fill="#FFFFFF"
                  />
                )}
              </g>
            )
          })}
        </svg>

        {/* Indicator labels */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground">
            RSI(14): <span className="text-[#3B82F6]">42.5</span>
          </span>
          <span className="text-[10px] text-muted-foreground">
            MACD: <span className="text-[#10B981]">+125.4</span>
          </span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#10B981]" />
            <span className="text-[10px] text-muted-foreground">Buy Signal</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-[#EF4444]" />
            <span className="text-[10px] text-muted-foreground">Sell Signal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
