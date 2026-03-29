"use client"

import { useState, useEffect } from "react"
import { Play, CheckCircle, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const defaultAICode = `# AI Generated Strategy - BTC/USDT
import pandas as pd
import numpy as np
from quantinel import Strategy, Signal

class RSIMACDStrategy(Strategy):
    """
    Buy when RSI < 30 and MACD bullish crossover
    Stop Loss: 3% | Take Profit: 8%
    """
    
    def __init__(self):
        self.rsi_period = 14
        self.macd_fast = 12
        self.macd_slow = 26
        self.macd_signal = 9
        
    def calculate_indicators(self, df):
        # RSI Calculation
        delta = df['close'].diff()
        gain = delta.where(delta > 0, 0)
        loss = -delta.where(delta < 0, 0)
        avg_gain = gain.rolling(self.rsi_period).mean()
        avg_loss = loss.rolling(self.rsi_period).mean()
        rs = avg_gain / avg_loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # MACD Calculation
        exp1 = df['close'].ewm(span=self.macd_fast).mean()
        exp2 = df['close'].ewm(span=self.macd_slow).mean()
        df['macd'] = exp1 - exp2
        df['macd_signal'] = df['macd'].ewm(span=9).mean()
        
        return df
    
    def generate_signals(self, df):
        df = self.calculate_indicators(df)
        
        # Buy Signal: RSI oversold + MACD crossover
        buy_condition = (
            (df['rsi'] < 30) & 
            (df['macd'] > df['macd_signal']) &
            (df['macd'].shift(1) <= df['macd_signal'].shift(1))
        )
        
        df['signal'] = np.where(buy_condition, Signal.BUY, Signal.HOLD)
        
        return df

# Configure risk management
strategy = RSIMACDStrategy()
strategy.set_stop_loss(0.03)  # 3%
strategy.set_take_profit(0.08)  # 8%`

const defaultManualCode = `# Manual Strategy Template
import pandas as pd
import numpy as np
from quantinel import Strategy, Signal

class CustomStrategy(Strategy):
    """
    Your custom trading strategy
    """
    
    def __init__(self):
        # Initialize your parameters
        pass
        
    def calculate_indicators(self, df):
        # Add your indicator calculations
        return df
    
    def generate_signals(self, df):
        # Define your buy/sell logic
        return df

# Configure and run
strategy = CustomStrategy()
# strategy.set_stop_loss(0.02)
# strategy.set_take_profit(0.05)`

import { type StrategyRules } from "@/lib/api"

function rulesToPythonCode(rules: StrategyRules): string {
  const indicators = rules.indicators
    .map((ind) => {
      const params = Object.entries(ind.params)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ")
      return `        # ${ind.name.toUpperCase()}(${params})`
    })
    .join("\n")

  const entryComment = `entry: ${rules.entry.type} (value=${rules.entry.value}${rules.entry.period ? `, period=${rules.entry.period}` : ""})`
  const exitComment = `exit:  ${rules.exit.type} (value=${rules.exit.value}${rules.exit.period ? `, period=${rules.exit.period}` : ""})`

  return `# AI Generated Strategy
# ${rules.description ?? "Custom strategy"}
import pandas as pd
import numpy as np
from quantinel import Strategy, Signal

class AIGeneratedStrategy(Strategy):
    """
    ${rules.description ?? "AI-generated trading strategy"}
    
    ${entryComment}
    ${exitComment}
    Position size: ${rules.position_size_pct}%
    """

    def __init__(self):
        # Indicators
${indicators || "        pass"}

    def generate_signals(self, df):
        # Entry condition: ${rules.entry.type} = ${rules.entry.value}
        # Exit  condition: ${rules.exit.type} = ${rules.exit.value}
        return df

strategy = AIGeneratedStrategy()
strategy.set_position_size(${rules.position_size_pct})
`
}

interface CodeEditorPanelProps {
  strategyRules?: StrategyRules
  onRun: () => void
}

export function CodeEditorPanel({ strategyRules, onRun }: CodeEditorPanelProps) {
  const [activeTab, setActiveTab] = useState("ai")
  const [aiCode, setAiCode] = useState(defaultAICode)
  const [manualCode, setManualCode] = useState(defaultManualCode)

  useEffect(() => {
    if (strategyRules) {
      setAiCode(rulesToPythonCode(strategyRules))
      setActiveTab("ai")
    }
  }, [strategyRules])

  return (
    <div className="glass-panel rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-accent" />
          </div>
          <h2 className="text-sm font-semibold text-foreground">Strategy Code</h2>
          <span className="flex items-center gap-1 text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Verified
          </span>
        </div>
        <Button
          size="sm"
          onClick={onRun}
          className="bg-[#10B981] hover:bg-[#10B981]/90 text-white h-8"
        >
          <Play className="w-4 h-4 mr-1" />
          Run
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-secondary/50 border border-border w-fit">
          <TabsTrigger
            value="ai"
            className={cn(
              "text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            )}
          >
            AI Code
          </TabsTrigger>
          <TabsTrigger
            value="manual"
            className={cn(
              "text-xs data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
            )}
          >
            Manual Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="flex-1 mt-3">
          <div className="h-full bg-[#0D1117] rounded-lg border border-border overflow-hidden">
            <textarea
              value={aiCode}
              onChange={(e) => setAiCode(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-[#E5E7EB] font-mono text-xs leading-relaxed resize-none outline-none code-editor"
              spellCheck={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="manual" className="flex-1 mt-3">
          <div className="h-full bg-[#0D1117] rounded-lg border border-border overflow-hidden">
            <textarea
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-[#E5E7EB] font-mono text-xs leading-relaxed resize-none outline-none code-editor"
              spellCheck={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
