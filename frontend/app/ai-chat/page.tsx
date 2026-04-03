"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Code2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "ai"
  content: string
  hasCode?: boolean
}

const initialMessages: Message[] = [
  {
    role: "user",
    content: "Create a strategy using RSI and MACD for BTC",
  },
  {
    role: "ai",
    content:
      "I'll create a strategy using RSI(14) and MACD(12,26,9) for BTC/USDT.\n\nThe strategy logic:\n• Buy when RSI < 40 AND MACD line crosses above signal line\n• Sell when RSI > 70 OR MACD line crosses below signal line\n• Stop loss: 3% below entry\n• Take profit: 9% above entry\n\nI've updated your code editor with the full strategy implementation.",
    hasCode: true,
  },
  {
    role: "user",
    content: "Can you add a stop loss at 2%?",
  },
  {
    role: "ai",
    content:
      "I've added a 2% stop loss to your strategy. Here's what changed:\n\n• `stop_loss_pct = 0.02` (was 0.03)\n• Added trailing stop logic that activates after 1.5% profit\n\nThe tighter stop loss will reduce max drawdown but may increase the number of stopped-out trades. I recommend backtesting both versions.",
    hasCode: true,
  },
]

const codePreview = `def strategy(data, params):
    rsi = compute_rsi(data['close'], 14)
    macd, signal = compute_macd(
        data['close'], 12, 26, 9
    )
    
    stop_loss_pct = 0.02  # 2% stop loss
    take_profit_pct = 0.09
    
    # Entry: RSI oversold + MACD cross
    buy_signal = (
        (rsi < 40) &
        (macd > signal) &
        (macd.shift(1) <= signal.shift(1))
    )
    
    # Exit: RSI overbought or MACD cross
    sell_signal = (
        (rsi > 70) |
        (macd < signal)
    )
    
    return buy_signal, sell_signal`

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "ai",
        content: "I'm processing your request and updating the strategy accordingly. One moment...",
      },
    ])
    setInput("")
  }

  return (
    <DashboardLayout>
      <div className="h-full p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Strategy Assistant</h1>
            <p className="text-sm text-muted-foreground">Chat with AI to build and refine strategies</p>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Chat panel - 2/3 */}
          <div className="flex-[2] glass-panel rounded-xl flex flex-col min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === "user" ? "bg-primary/20" : "bg-[#8B5CF6]/20"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-[#8B5CF6]" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-3 text-sm",
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground"
                        : "bg-secondary/80 text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.hasCode && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#10B981]">
                        <Code2 className="w-3 h-3" />
                        Code editor updated
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <Textarea
                placeholder="Ask AI to create or modify your strategy..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="flex-1 min-h-[40px] max-h-32 bg-secondary/50 border-border text-sm resize-none"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-primary hover:bg-primary/90 self-end"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Code panel - 1/3 */}
          <div className="flex-1 glass-panel rounded-xl flex flex-col min-h-0">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-medium text-foreground">Code Editor</h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                AI Connected
              </span>
            </div>
            <div className="p-3 flex-1 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                AI has access to your code editor and can read and write strategy code directly.
              </p>
              <textarea
                readOnly
                value={codePreview}
                className="flex-1 bg-secondary/50 border border-border rounded-lg p-3 text-xs font-mono text-foreground resize-none min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
