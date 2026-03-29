import { create } from "zustand";

export const useBacktestStore = create((set) => ({
  // Strategy
  strategyPrompt:  "",
  strategyRules:   null,
  parsedDesc:      "",

  // Backtest config
  symbol:          "BTC/USDT",
  timeframe:       "1h",
  startDate:       "2024-01-01",
  endDate:         "2024-12-31",
  initialCapital:  10000,

  // Results
  results:         null,
  isLoading:       false,
  error:           null,

  // Actions
  setStrategyPrompt: (v)  => set({ strategyPrompt: v }),
  setStrategyRules:  (v)  => set({ strategyRules: v }),
  setParsedDesc:     (v)  => set({ parsedDesc: v }),
  setSymbol:         (v)  => set({ symbol: v }),
  setTimeframe:      (v)  => set({ timeframe: v }),
  setStartDate:      (v)  => set({ startDate: v }),
  setEndDate:        (v)  => set({ endDate: v }),
  setInitialCapital: (v)  => set({ initialCapital: v }),
  setResults:        (v)  => set({ results: v }),
  setLoading:        (v)  => set({ isLoading: v }),
  setError:          (v)  => set({ error: v }),
  reset:             ()   => set({ results: null, error: null, strategyRules: null }),
}));
