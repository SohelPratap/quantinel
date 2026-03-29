import { Link } from "react-router-dom";

const features = [
  { icon: "✦", title: "Plain English Strategy", desc: "Type your idea — AI converts it into executable trading logic." },
  { icon: "◈", title: "Real Market Data",        desc: "Runs on real historical crypto OHLCV data via Binance." },
  { icon: "◉", title: "Instant Results",          desc: "P&L, win rate, Sharpe ratio, max drawdown — all at a glance." },
  { icon: "◐", title: "Visual Chart",             desc: "Candlestick chart with buy/sell markers for every trade." },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-10">
      <div className="flex flex-col gap-4">
        <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
          No code. No complexity.
        </span>
        <h1 className="text-5xl font-bold text-gray-100 leading-tight">
          Test trading strategies<br />
          <span className="text-emerald-400">like a pro.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Describe your idea in plain English. Quantinel converts it into a strategy,
          runs it on real crypto data, and shows you the results — instantly.
        </p>
        <div className="flex gap-3 justify-center mt-2">
          <Link to="/backtest" className="btn-primary text-base px-8 py-3">
            Start Backtesting →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="card text-left hover:border-gray-700 transition-colors">
            <span className="text-emerald-400 text-xl">{icon}</span>
            <h3 className="font-semibold text-gray-200 mt-2">{title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-4">
        ⚠ Quantinel is for simulation and learning only. No real money is involved.
      </p>
    </div>
  );
}
