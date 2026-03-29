import clsx from "clsx";

function MetricCard({ label, value, sub, positive }) {
  return (
    <div className="metric-card">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={clsx("text-2xl font-bold tabular-nums",
        positive === true  && "text-emerald-400",
        positive === false && "text-red-400",
        positive === null  && "text-gray-100"
      )}>
        {value}
      </span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </div>
  );
}

export default function MetricsPanel({ metrics }) {
  if (!metrics) return null;

  const {
    total_trades, win_rate, total_pnl, total_return_pct,
    max_drawdown_pct, sharpe_ratio, profit_factor,
    initial_capital, final_capital,
  } = metrics;

  const isProfit = total_pnl >= 0;

  return (
    <div className="card">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="Total Return"
          value={`${total_return_pct > 0 ? "+" : ""}${total_return_pct}%`}
          sub={`$${initial_capital.toLocaleString()} → $${final_capital.toLocaleString()}`}
          positive={isProfit}
        />
        <MetricCard
          label="Net P&L"
          value={`${isProfit ? "+" : ""}$${total_pnl.toLocaleString()}`}
          positive={isProfit}
        />
        <MetricCard
          label="Win Rate"
          value={`${win_rate}%`}
          sub={`${metrics.winning_trades}W / ${metrics.losing_trades}L of ${total_trades}`}
          positive={win_rate >= 50 ? true : false}
        />
        <MetricCard
          label="Max Drawdown"
          value={`${max_drawdown_pct}%`}
          positive={false}
        />
        <MetricCard
          label="Sharpe Ratio"
          value={sharpe_ratio}
          sub="Annualised"
          positive={sharpe_ratio >= 1 ? true : null}
        />
        <MetricCard
          label="Profit Factor"
          value={profit_factor === Infinity ? "∞" : profit_factor}
          positive={profit_factor >= 1.5 ? true : null}
        />
        <MetricCard
          label="Total Trades"
          value={total_trades}
          positive={null}
        />
      </div>
    </div>
  );
}
