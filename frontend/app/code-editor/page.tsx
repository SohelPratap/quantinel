"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Code2, Play, CheckCircle2, XCircle, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Mode = "backtest" | "live-test" | "backtest-adaptive" | "live-test-adaptive"

const codeTemplates: Record<Mode, string> = {
  backtest: `def strategy(data, params):
    """Standard Backtesting Strategy"""
    rsi = compute_rsi(data['close'], params.get('rsi_period', 14))
    macd, signal, hist = compute_macd(
        data['close'],
        params.get('fast', 12),
        params.get('slow', 26),
        params.get('signal', 9)
    )
    
    stop_loss_pct = params.get('stop_loss', 0.03)
    take_profit_pct = params.get('take_profit', 0.09)
    
    buy_signal = (rsi < 40) & (macd > signal)
    sell_signal = (rsi > 70) | (macd < signal)
    
    return {
        'buy': buy_signal,
        'sell': sell_signal,
        'stop_loss': stop_loss_pct,
        'take_profit': take_profit_pct,
    }`,

  "live-test": `def strategy(data, params):
    """Live Trading Strategy"""
    import time
    
    rsi = compute_rsi(data['close'], 14)
    ema_fast = compute_ema(data['close'], 20)
    ema_slow = compute_ema(data['close'], 50)
    
    position_size = params.get('position_size', 0.1)
    stop_loss_pct = params.get('stop_loss', 0.02)
    
    # Live entry conditions
    buy_signal = (
        (rsi < 45) &
        (ema_fast > ema_slow) &
        (data['volume'] > data['volume'].rolling(20).mean())
    )
    
    sell_signal = (
        (rsi > 65) |
        (ema_fast < ema_slow)
    )
    
    return {
        'buy': buy_signal.iloc[-1],
        'sell': sell_signal.iloc[-1],
        'position_size': position_size,
        'stop_loss': stop_loss_pct,
    }`,

  "backtest-adaptive": `def strategy(data, params, agent_context):
    """Adaptive Backtesting Strategy with AI Agent Hooks"""
    
    # Agent reads market regime
    regime = agent_context.detect_regime(data)
    
    # AI adapts parameters based on regime
    if regime == 'trending':
        rsi_oversold = 45
        rsi_overbought = 65
    elif regime == 'ranging':
        rsi_oversold = 35
        rsi_overbought = 75
    else:  # high_volatility
        rsi_oversold = 30
        rsi_overbought = 80
    
    rsi = compute_rsi(data['close'], 14)
    macd, signal, _ = compute_macd(data['close'], 12, 26, 9)
    
    # Agent can suggest parameter mutations
    params = agent_context.suggest_params(params, regime)
    
    buy_signal = (rsi < rsi_oversold) & (macd > signal)
    sell_signal = (rsi > rsi_overbought) | (macd < signal)
    
    agent_context.log(f"Regime: {regime}, RSI thresholds: {rsi_oversold}/{rsi_overbought}")
    
    return {'buy': buy_signal, 'sell': sell_signal, 'regime': regime}`,

  "live-test-adaptive": `def strategy(data, params, agent_context):
    """Adaptive Live Trading Strategy with AI Agent Hooks"""
    import asyncio
    
    # Continuous regime monitoring
    regime = agent_context.detect_regime(data)
    sentiment = agent_context.get_market_sentiment()
    
    # AI dynamically adjusts risk based on conditions
    base_position = params.get('position_size', 0.1)
    if sentiment == 'bearish' or regime == 'high_volatility':
        position_size = base_position * 0.5  # Reduce exposure
    elif sentiment == 'bullish' and regime == 'trending':
        position_size = base_position * 1.3  # Increase exposure
    else:
        position_size = base_position
    
    rsi = compute_rsi(data['close'], 14)
    macd, signal, _ = compute_macd(data['close'], 12, 26, 9)
    
    # Agent observes and can pause trading
    if agent_context.detect_anomaly(data):
        agent_context.pause_trading("Anomaly detected")
        return None
    
    buy = (rsi < 40) & (macd > signal) & (sentiment != 'bearish')
    sell = (rsi > 70) | (macd < signal)
    
    return {
        'buy': buy.iloc[-1],
        'sell': sell.iloc[-1],
        'position_size': position_size,
        'regime': regime,
    }`,
}

const modeLabels: Record<Mode, string> = {
  backtest: "Backtest",
  "live-test": "Live Test",
  "backtest-adaptive": "Backtest Adaptive",
  "live-test-adaptive": "Live Test Adaptive",
}

interface ChatMessage {
  role: "user" | "ai"
  content: string
}

const initialChat: ChatMessage[] = [
  { role: "ai", content: "I'm monitoring your code. Ask me to modify the strategy or explain any part of it." },
  { role: "user", content: "Add a volume filter to the buy condition" },
  { role: "ai", content: "Added a volume filter: buy signals now require volume > 20-period moving average. This reduces false breakouts." },
]

export default function CodeEditorPage() {
  const [mode, setMode] = useState<Mode>("backtest")
  const [code, setCode] = useState(codeTemplates["backtest"])
  const [checkResult, setCheckResult] = useState<{ valid: boolean; message: string } | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat)
  const [chatInput, setChatInput] = useState("")

  const handleModeChange = (value: Mode) => {
    setMode(value)
    setCode(codeTemplates[value])
    setCheckResult(null)
  }

  const handleCheckCode = () => {
    const hasError = code.includes("syntax_error") || code.trim().length < 10
    setCheckResult(
      hasError
        ? { valid: false, message: "Syntax error on line 12: unexpected token" }
        : { valid: true, message: `Code is valid for ${modeLabels[mode]} format` }
    )
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: chatInput },
      { role: "ai", content: "Updating your strategy based on the request..." },
    ])
    setChatInput("")
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex gap-4">
        {/* Chat panel */}
        <div className="w-72 glass-panel rounded-xl flex flex-col min-h-0">
          <div className="p-3 border-b border-border flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="text-sm font-medium text-foreground">AI Assistant</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  msg.role === "user" ? "bg-primary/20" : "bg-[#8B5CF6]/20"
                )}>
                  {msg.role === "user" ? <User className="w-3 h-3 text-primary" /> : <Bot className="w-3 h-3 text-[#8B5CF6]" />}
                </div>
                <div className={cn(
                  "rounded-lg px-3 py-2 text-xs max-w-[85%]",
                  msg.role === "user" ? "bg-primary/20 text-foreground" : "bg-secondary/80 text-foreground"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              placeholder="Ask AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendChat() }}
              className="flex-1 bg-secondary/50 border border-border rounded-md px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary"
            />
            <Button size="sm" className="px-2 bg-primary hover:bg-primary/90" onClick={handleSendChat}>
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Code editor panel */}
        <div className="flex-1 glass-panel rounded-xl flex flex-col min-h-0">
          <div className="p-4 border-b border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-medium text-foreground">Code Editor</h2>
            </div>
            <div className="flex items-center gap-3">
              <Select value={mode} onValueChange={(v) => handleModeChange(v as Mode)}>
                <SelectTrigger className="w-48 bg-secondary/50 border-border h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {(Object.keys(modeLabels) as Mode[]).map((m) => (
                    <SelectItem key={m} value={m} className="text-xs">
                      {modeLabels[m]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="h-8 text-xs border-border" onClick={handleCheckCode}>
                Check Code
              </Button>
              <Button size="sm" className="h-8 text-xs bg-[#10B981] hover:bg-[#10B981]/90">
                <Play className="w-3 h-3 mr-1" />
                Run
              </Button>
            </div>
          </div>

          {checkResult && (
            <div className={cn(
              "mx-4 mt-3 px-3 py-2 rounded-lg text-xs flex items-center gap-2",
              checkResult.valid
                ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
                : "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30"
            )}>
              {checkResult.valid
                ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                : <XCircle className="w-3.5 h-3.5 shrink-0" />
              }
              {checkResult.message}
            </div>
          )}

          <div className="flex-1 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-secondary/30 border border-border rounded-lg p-4 text-sm font-mono text-foreground resize-none outline-none focus:border-primary min-h-[400px]"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
