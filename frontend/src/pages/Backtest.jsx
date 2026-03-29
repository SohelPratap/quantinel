import { useBacktest } from "../hooks/useBacktest";
import StrategyInput  from "../components/StrategyInput/StrategyInput";
import CandlestickChart from "../components/Chart/CandlestickChart";
import MetricsPanel   from "../components/MetricsPanel/MetricsPanel";

export default function Backtest() {
  const { isLoading, error, results, parsedDesc, strategyPrompt, parseAndRun } = useBacktest();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Strategy Backtester</h1>
        <p className="text-gray-500 text-sm mt-1">
          Describe your strategy in plain English — AI converts it and runs it on real market data.
        </p>
      </div>

      <StrategyInput />

      {/* Run button */}
      <div className="flex items-center gap-4">
        <button
          className="btn-primary"
          onClick={parseAndRun}
          disabled={isLoading || !strategyPrompt.trim()}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Running backtest…
            </span>
          ) : "Run Backtest"}
        </button>
        {isLoading && (
          <p className="text-sm text-gray-500">Fetching data &amp; running strategy…</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Parsed strategy description */}
      {parsedDesc && !isLoading && (
        <div className="bg-emerald-950/40 border border-emerald-900 rounded-xl px-4 py-3 text-emerald-300 text-sm">
          <span className="text-emerald-500 font-medium">AI parsed: </span>{parsedDesc}
        </div>
      )}

      {/* Results */}
      {results && (
        <>
          <MetricsPanel metrics={results.metrics} />
          <CandlestickChart candles={results.candles} trades={results.trades} />

          {/* Trades table */}
          <div className="card overflow-x-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-4">
              Trade Log ({results.trades.length} trades)
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
                  {["Entry Time","Exit Time","Entry Price","Exit Price","P&L","Return"].map((h) => (
                    <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.trades.map((t, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 pr-4 text-gray-400">{new Date(t.entry_time).toLocaleDateString()}</td>
                    <td className="py-2 pr-4 text-gray-400">{new Date(t.exit_time).toLocaleDateString()}</td>
                    <td className="py-2 pr-4 tabular-nums">${t.entry_price.toLocaleString()}</td>
                    <td className="py-2 pr-4 tabular-nums">${t.exit_price.toLocaleString()}</td>
                    <td className={`py-2 pr-4 tabular-nums font-medium ${t.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {t.pnl >= 0 ? "+" : ""}${t.pnl.toLocaleString()}
                    </td>
                    <td className={`py-2 tabular-nums ${t.pnl_pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {t.pnl_pct >= 0 ? "+" : ""}{t.pnl_pct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
