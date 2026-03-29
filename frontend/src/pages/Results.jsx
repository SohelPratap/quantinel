import { Link } from "react-router-dom";
import { useBacktestStore } from "../store/backtestStore";
import MetricsPanel from "../components/MetricsPanel/MetricsPanel";
import CandlestickChart from "../components/Chart/CandlestickChart";

export default function Results() {
  const { results } = useBacktestStore();

  if (!results) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center gap-4">
        <p className="text-gray-500">No results yet.</p>
        <Link to="/backtest" className="btn-primary">Run a Backtest</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Results</h1>
      <MetricsPanel metrics={results.metrics} />
      <CandlestickChart candles={results.candles} trades={results.trades} />
    </div>
  );
}
