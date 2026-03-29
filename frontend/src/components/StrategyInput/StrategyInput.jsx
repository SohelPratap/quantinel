import { useBacktestStore } from "../../store/backtestStore";

const SYMBOLS    = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"];
const TIMEFRAMES = ["15m", "1h", "4h", "1d"];

const EXAMPLES = [
  "Buy when RSI drops below 30, sell when RSI rises above 70",
  "Buy when price crosses above the 20-period EMA, sell when it crosses below",
  "Buy when RSI is below 40 and EMA20 is trending up, sell when RSI exceeds 65",
];

export default function StrategyInput() {
  const {
    strategyPrompt, setStrategyPrompt,
    symbol, setSymbol,
    timeframe, setTimeframe,
    startDate, setStartDate,
    endDate, setEndDate,
    initialCapital, setInitialCapital,
  } = useBacktestStore();

  return (
    <div className="card flex flex-col gap-5">
      {/* Strategy prompt */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe your strategy in plain English
        </label>
        <textarea
          className="input resize-none h-28"
          placeholder='e.g. "Buy when RSI drops below 30, sell when RSI rises above 70"'
          value={strategyPrompt}
          onChange={(e) => setStrategyPrompt(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-900
                         hover:border-emerald-700 rounded px-2 py-1 transition-colors"
              onClick={() => setStrategyPrompt(ex)}
            >
              {ex.slice(0, 40)}…
            </button>
          ))}
        </div>
      </div>

      {/* Config row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Symbol</label>
          <select className="input" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            {SYMBOLS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Timeframe</label>
          <select className="input" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            {TIMEFRAMES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Initial Capital (USD)</label>
          <input
            type="number"
            className="input"
            value={initialCapital}
            onChange={(e) => setInitialCapital(Number(e.target.value))}
            min={100}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Start Date</label>
          <input type="date" className="input" value={startDate}
            onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">End Date</label>
          <input type="date" className="input" value={endDate}
            onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
