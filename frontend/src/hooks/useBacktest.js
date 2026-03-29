import { useBacktestStore } from "../store/backtestStore";
import { parseStrategy, runBacktest } from "../api";

export function useBacktest() {
  const store = useBacktestStore();

  async function parseAndRun() {
    store.setLoading(true);
    store.setError(null);

    try {
      // Step 1 — parse plain-English strategy
      const parsed = await parseStrategy(store.strategyPrompt, store.symbol);
      if (parsed.error) throw new Error(parsed.error);

      store.setStrategyRules(parsed.rules);
      store.setParsedDesc(parsed.rules?.description || "");

      // Step 2 — run backtest
      const result = await runBacktest({
        symbol:          store.symbol,
        timeframe:       store.timeframe,
        start_date:      store.startDate,
        end_date:        store.endDate,
        initial_capital: store.initialCapital,
        strategy_rules:  parsed.rules,
      });

      if (!result.success) throw new Error("Backtest failed");
      store.setResults(result.data);
    } catch (err) {
      store.setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      store.setLoading(false);
    }
  }

  return { ...store, parseAndRun };
}
