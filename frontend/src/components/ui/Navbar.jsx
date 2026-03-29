import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  { to: "/",         label: "Home" },
  { to: "/backtest", label: "Backtest" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-emerald-400 text-xl font-bold tracking-tight">Quantinel</span>
          <span className="text-xs text-gray-600 border border-gray-800 rounded px-1.5 py-0.5">beta</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === to
                  ? "bg-gray-800 text-gray-100"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
