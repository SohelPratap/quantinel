"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  BarChart3,
  Code2,
  FileText,
  Download,
  Share2,
  Brain,
  Clock,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const liveSessionRecords: Record<string, {
  id: string
  name: string
  pair: string
  timeframe: string
  startedAt: string
  duration: string
  type: "Live" | "Live Adaptive"
  description: string
  metrics: {
    totalReturn: string
    totalPnL: string
    winRate: string
    winningTrades: number
    losingTrades: number
    sharpeRatio: string
    maxDrawdown: string
    avgWin: string
    avgLoss: string
    profitFactor: string
    initialCapital: string
    peakEquity: string
  }
  code: string
  trades: { time: string; type: string; price: number; pnl: string }[]
}> = {
  "1": {
    id: "1",
    name: "RSI + EMA Live",
    pair: "BTC/USDT",
    timeframe: "1h",
    startedAt: "2024-03-15",
    duration: "6h 42m",
    type: "Live",
    description: "Live trading using RSI and EMA crossover. Ran for ~7 hours with 10 executed trades.",
    metrics: {
      totalReturn: "+8.4%",
      totalPnL: "+$840",
      winRate: "70.0%",
      winningTrades: 7,
      losingTrades: 3,
      sharpeRatio: "1.62",
      maxDrawdown: "-3.1%",
      avgWin: "+$178.40",
      avgLoss: "-$94.20",
      profitFactor: "2.24",
      initialCapital: "$10,000",
      peakEquity: "$10,960",
    },
    code: `# RSI + EMA Live Strategy — BTC/USDT
def strategy(data, params):
    """Live Trading Strategy"""
    rsi = compute_rsi(data['close'], 14)
    ema_fast = compute_ema(data['close'], 20)
    ema_slow = compute_ema(data['close'], 50)
    position_size = params.get('position_size', 0.1)
    stop_loss_pct = params.get('stop_loss', 0.02)

    buy_signal = (
        (rsi < 45) &
        (ema_fast > ema_slow) &
        (data['volume'] > data['volume'].rolling(20).mean())
    )
    sell_signal = (rsi > 65) | (ema_fast < ema_slow)

    return {
        'buy': buy_signal.iloc[-1],
        'sell': sell_signal.iloc[-1],
        'position_size': position_size,
        'stop_loss': stop_loss_pct,
    }`,
    trades: [
      { time: "09:12", type: "BUY", price: 67200.0, pnl: "+$178.40" },
      { time: "10:45", type: "BUY", price: 67850.0, pnl: "-$94.20" },
      { time: "12:30", type: "BUY", price: 68100.0, pnl: "+$210.60" },
      { time: "14:15", type: "BUY", price: 67600.0, pnl: "+$145.30" },
      { time: "15:50", type: "SELL", price: 68400.0, pnl: "+$88.70" },
    ],
  },
  "2": {
    id: "2",
    name: "MACD Momentum",
    pair: "ETH/USDT",
    timeframe: "4h",
    startedAt: "2024-03-13",
    duration: "18h 05m",
    type: "Live Adaptive",
    description: "Adaptive live session. Agent monitored sentiment and adjusted position sizing in real time based on market regime.",
    metrics: {
      totalReturn: "+5.2%",
      totalPnL: "+$520",
      winRate: "66.7%",
      winningTrades: 6,
      losingTrades: 3,
      sharpeRatio: "1.14",
      maxDrawdown: "-2.8%",
      avgWin: "+$132.50",
      avgLoss: "-$72.80",
      profitFactor: "1.83",
      initialCapital: "$10,000",
      peakEquity: "$10,680",
    },
    code: `# Adaptive MACD Momentum — ETH/USDT
def strategy(data, params, agent_context):
    """Adaptive Live Trading — MACD with AI Agent"""
    regime = agent_context.detect_regime(data)
    sentiment = agent_context.get_market_sentiment()

    base_position = params.get('position_size', 0.1)
    if sentiment == 'bearish' or regime == 'high_volatility':
        position_size = base_position * 0.5
    elif sentiment == 'bullish' and regime == 'trending':
        position_size = base_position * 1.3
    else:
        position_size = base_position

    macd, signal, hist = compute_macd(data['close'], 12, 26, 9)
    buy = (macd > signal) & (macd.shift(1) <= signal.shift(1))
    sell = (macd < signal) & (macd.shift(1) >= signal.shift(1))

    if agent_context.detect_anomaly(data):
        agent_context.pause_trading("Anomaly detected")
        return None

    return {
        'buy': buy.iloc[-1],
        'sell': sell.iloc[-1],
        'position_size': position_size,
        'regime': regime,
    }`,
    trades: [
      { time: "04:00", type: "BUY", price: 3420.0, pnl: "+$132.50" },
      { time: "08:00", type: "BUY", price: 3480.0, pnl: "-$72.80" },
      { time: "12:00", type: "BUY", price: 3510.0, pnl: "+$98.20" },
      { time: "16:00", type: "SELL", price: 3560.0, pnl: "+$165.40" },
    ],
  },
  "3": {
    id: "3",
    name: "Bollinger Reversion",
    pair: "SOL/USDT",
    timeframe: "15m",
    startedAt: "2024-03-11",
    duration: "4h 28m",
    type: "Live",
    description: "Mean reversion on Bollinger Bands during a volatile session. High trade frequency on 15m chart.",
    metrics: {
      totalReturn: "-2.1%",
      totalPnL: "-$210",
      winRate: "44.4%",
      winningTrades: 8,
      losingTrades: 10,
      sharpeRatio: "-0.41",
      maxDrawdown: "-4.5%",
      avgWin: "+$62.30",
      avgLoss: "-$83.40",
      profitFactor: "0.65",
      initialCapital: "$10,000",
      peakEquity: "$10,180",
    },
    code: `# Bollinger Mean Reversion — SOL/USDT
def strategy(data, params):
    period = params.get('period', 20)
    std_mult = params.get('std_mult', 2.0)
    rolling_mean = data['close'].rolling(period).mean()
    rolling_std = data['close'].rolling(period).std()
    upper = rolling_mean + std_mult * rolling_std
    lower = rolling_mean - std_mult * rolling_std
    buy_signal = data['close'] < lower
    sell_signal = data['close'] > upper
    return {'buy': buy_signal.iloc[-1], 'sell': sell_signal.iloc[-1]}`,
    trades: [
      { time: "09:00", type: "BUY", price: 148.0, pnl: "+$62.30" },
      { time: "09:45", type: "BUY", price: 145.0, pnl: "-$83.40" },
      { time: "10:30", type: "BUY", price: 143.0, pnl: "+$48.70" },
      { time: "11:15", type: "SELL", price: 150.0, pnl: "-$91.20" },
    ],
  },
  "4": {
    id: "4",
    name: "Volume Breakout",
    pair: "BNB/USDT",
    timeframe: "1h",
    startedAt: "2024-03-09",
    duration: "8h 12m",
    type: "Live Adaptive",
    description: "Agent detected a bullish regime early in the session and scaled positions up. Strong momentum trade.",
    metrics: {
      totalReturn: "+11.3%",
      totalPnL: "+$1,130",
      winRate: "71.4%",
      winningTrades: 5,
      losingTrades: 2,
      sharpeRatio: "1.94",
      maxDrawdown: "-2.3%",
      avgWin: "+$286.40",
      avgLoss: "-$112.50",
      profitFactor: "3.01",
      initialCapital: "$10,000",
      peakEquity: "$11,240",
    },
    code: `# Adaptive Volume Breakout — BNB/USDT
def strategy(data, params, agent_context):
    regime = agent_context.detect_regime(data)
    vol_ma = data['volume'].rolling(20).mean()
    vol_spike = data['volume'] > vol_ma * 1.8

    position_size = params.get('position_size', 0.1)
    if regime == 'trending':
        position_size *= 1.4

    price_breakout_up = data['close'] > data['close'].rolling(20).max().shift(1)
    price_breakout_down = data['close'] < data['close'].rolling(20).min().shift(1)
    buy = vol_spike & price_breakout_up
    sell = vol_spike & price_breakout_down

    return {
        'buy': buy.iloc[-1],
        'sell': sell.iloc[-1],
        'position_size': position_size,
        'regime': regime,
    }`,
    trades: [
      { time: "10:00", type: "BUY", price: 392.0, pnl: "+$286.40" },
      { time: "12:00", type: "BUY", price: 405.0, pnl: "+$312.80" },
      { time: "14:00", type: "BUY", price: 398.0, pnl: "-$112.50" },
      { time: "16:00", type: "BUY", price: 412.0, pnl: "+$244.60" },
    ],
  },
  "5": {
    id: "5",
    name: "EMA Trend Follower",
    pair: "XRP/USDT",
    timeframe: "4h",
    startedAt: "2024-03-06",
    duration: "12h 00m",
    type: "Live",
    description: "Simple EMA trend following live session over 3 candles. Clean trend day with consistent profits.",
    metrics: {
      totalReturn: "+3.8%",
      totalPnL: "+$380",
      winRate: "60.0%",
      winningTrades: 3,
      losingTrades: 2,
      sharpeRatio: "0.92",
      maxDrawdown: "-1.9%",
      avgWin: "+$172.30",
      avgLoss: "-$68.40",
      profitFactor: "1.71",
      initialCapital: "$10,000",
      peakEquity: "$10,450",
    },
    code: `# EMA Trend Follower — XRP/USDT
def strategy(data, params):
    ema_fast = data['close'].ewm(span=20).mean()
    ema_slow = data['close'].ewm(span=50).mean()
    position_size = params.get('position_size', 0.1)
    stop_loss = params.get('stop_loss', 0.015)

    buy = (ema_fast > ema_slow) & (ema_fast.shift(1) <= ema_slow.shift(1))
    sell = (ema_fast < ema_slow) & (ema_fast.shift(1) >= ema_slow.shift(1))
    return {
        'buy': buy.iloc[-1],
        'sell': sell.iloc[-1],
        'position_size': position_size,
        'stop_loss': stop_loss,
    }`,
    trades: [
      { time: "00:00", type: "BUY", price: 0.618, pnl: "+$172.30" },
      { time: "04:00", type: "BUY", price: 0.631, pnl: "-$68.40" },
      { time: "08:00", type: "BUY", price: 0.645, pnl: "+$148.20" },
    ],
  },
}

const generatePnLCurve = (seed: number) => {
  const data = []
  let equity = 10000
  const rng = (n: number) => ((Math.sin(n * seed * 7193 + 53741) + 1) / 2)
  for (let i = 0; i < 40; i++) {
    const change = (rng(i) - 0.43) * 130
    equity = Math.max(equity + change, 8000)
    data.push({ point: i, equity })
  }
  return data
}

export default function LiveTestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const record = liveSessionRecords[id] ?? liveSessionRecords["1"]
  const pnlCurve = generatePnLCurve(parseInt(id) || 1)
  const minEquity = Math.min(...pnlCurve.map((d) => d.equity)) - 200
  const maxEquity = Math.max(...pnlCurve.map((d) => d.equity)) + 200
  const equityRange = maxEquity - minEquity
  const getY = (value: number) => ((maxEquity - value) / equityRange) * 100
  const isProfit = record.metrics.totalReturn.startsWith("+")
  const isAdaptive = record.type === "Live Adaptive"

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/live-test/history"
              className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-foreground">{record.name}</h1>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full border font-medium",
                  isAdaptive
                    ? "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30"
                    : "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30"
                )}>
                  {isAdaptive && <Brain className="w-3 h-3 inline mr-1" />}
                  {record.type}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground">{record.pair}</span>
                <span className="text-sm text-muted-foreground">{record.timeframe}</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {record.startedAt}
                </span>
                <span className="text-sm text-muted-foreground">Duration: {record.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/50 border-border">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Metrics */}
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#10B981]" />
                <h2 className="font-medium text-foreground">Session Metrics</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {isProfit
                      ? <TrendingUp className="w-4 h-4 text-[#10B981]" />
                      : <TrendingDown className="w-4 h-4 text-[#EF4444]" />}
                    <span className="text-xs text-muted-foreground">Total Return</span>
                  </div>
                  <span className={cn("text-xl font-semibold", isProfit ? "text-[#10B981]" : "text-[#EF4444]")}>
                    {record.metrics.totalReturn}
                  </span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                  </div>
                  <span className="text-xl font-semibold text-[#3B82F6]">{record.metrics.winRate}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs text-muted-foreground">Sharpe Ratio</span>
                  </div>
                  <span className="text-xl font-semibold text-[#8B5CF6]">{record.metrics.sharpeRatio}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-xs text-muted-foreground">Max Drawdown</span>
                  </div>
                  <span className="text-xl font-semibold text-[#EF4444]">{record.metrics.maxDrawdown}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Capital</span>
                  <span className="text-foreground">{record.metrics.initialCapital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net P&L</span>
                  <span className={isProfit ? "text-[#10B981]" : "text-[#EF4444]"}>{record.metrics.totalPnL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peak Equity</span>
                  <span className="text-foreground">{record.metrics.peakEquity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Trades</span>
                  <span className="text-foreground">{record.metrics.winningTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Losing Trades</span>
                  <span className="text-foreground">{record.metrics.losingTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Win</span>
                  <span className="text-[#10B981]">{record.metrics.avgWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Loss</span>
                  <span className="text-[#EF4444]">{record.metrics.avgLoss}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Factor</span>
                  <span className="text-foreground">{record.metrics.profitFactor}</span>
                </div>
              </div>
            </div>

            {/* Trade list */}
            <div className="glass-panel rounded-xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Live Trades</h3>
              <div className="space-y-2 max-h-[220px] overflow-auto">
                {record.trades.map((trade, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-6 h-6 rounded flex items-center justify-center text-xs font-medium",
                        trade.type === "BUY" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#EF4444]/20 text-[#EF4444]"
                      )}>
                        {trade.type === "BUY" ? "B" : "S"}
                      </span>
                      <div>
                        <span className="text-xs text-foreground font-mono">${trade.price.toLocaleString()}</span>
                        <p className="text-[10px] text-muted-foreground">{trade.time}</p>
                      </div>
                    </div>
                    <span className={cn("text-xs font-mono", trade.pnl.startsWith("+") ? "text-[#10B981]" : "text-[#EF4444]")}>
                      {trade.pnl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Chart & Code */}
          <div className="lg:col-span-2 space-y-4">
            {/* P&L Curve */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="font-medium text-foreground">P&L Curve</h2>
              </div>
              <div className="h-[200px] bg-[#0D1117] rounded-lg border border-border overflow-hidden relative">
                <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line key={y} x1="0" y1={y * 2} x2="600" y2={y * 2} stroke="#1A1F26" strokeWidth="1" />
                  ))}
                  <defs>
                    <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isProfit ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={isProfit ? "#10B981" : "#EF4444"} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,200 ${pnlCurve.map((d, i) => `${(i / pnlCurve.length) * 600},${getY(d.equity) * 2}`).join(" ")} 600,200`}
                    fill="url(#pnlGrad)"
                  />
                  <polyline
                    points={pnlCurve.map((d, i) => `${(i / pnlCurve.length) * 600},${getY(d.equity) * 2}`).join(" ")}
                    fill="none"
                    stroke={isProfit ? "#10B981" : "#EF4444"}
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute top-2 left-2 text-xs">
                  <span className="text-muted-foreground">Capital: </span>
                  <span className="text-foreground">{record.metrics.initialCapital}</span>
                </div>
                <div className="absolute top-2 right-2 text-xs">
                  <span className="text-muted-foreground">P&L: </span>
                  <span className={isProfit ? "text-[#10B981]" : "text-[#EF4444]"}>{record.metrics.totalPnL}</span>
                </div>
                <div className="absolute bottom-2 right-2 text-xs flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Peak: </span>
                  <span className="text-foreground">{record.metrics.peakEquity}</span>
                </div>
              </div>
            </div>

            {/* Session description */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">Session Description</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{record.description}</p>
            </div>

            {/* Strategy Code */}
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-accent" />
                <h2 className="font-medium text-foreground">Strategy Code</h2>
                {isAdaptive && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                    <Brain className="w-3 h-3 inline mr-1" />
                    Adaptive
                  </span>
                )}
              </div>
              <div className="h-[280px] bg-[#0D1117] rounded-lg border border-border overflow-auto">
                <pre className="p-4 text-xs font-mono text-[#E5E7EB] leading-relaxed">{record.code}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
