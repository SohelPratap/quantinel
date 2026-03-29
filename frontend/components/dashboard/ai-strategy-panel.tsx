"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { api, type StrategyRules } from "@/lib/api"

interface AIStrategyPanelProps {
  onGenerate: (rules: StrategyRules) => void
}

export function AIStrategyPanel({ onGenerate }: AIStrategyPanelProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const { rules } = await api.strategy.parse(prompt)
      if (rules.error) {
        toast.error(rules.error)
        return
      }
      onGenerate(rules)
      toast.success("Strategy generated!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate strategy")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="glass-panel rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">AI Strategy Generator</h2>
      </div>

      <Textarea
        placeholder="Describe your trading strategy in plain English...

Example: Buy BTC when RSI drops below 30 and MACD shows bullish crossover. Set stop loss at 3% and take profit at 8%."
        className="flex-1 min-h-[180px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none text-sm"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Strategy
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-3">
        Powered by GPT-4 Turbo for advanced strategy generation
      </p>
    </div>
  )
}
