import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function CandlestickChart({ candles = [], trades = [] }) {
  const containerRef = useRef(null);
  const chartRef     = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !candles.length) return;

    const chart = createChart(containerRef.current, {
      width:  containerRef.current.clientWidth,
      height: 420,
      layout: {
        background: { color: "#111827" },
        textColor:  "#9ca3af",
      },
      grid: {
        vertLines:   { color: "#1f2937" },
        horzLines:   { color: "#1f2937" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#374151" },
      timeScale: {
        borderColor:    "#374151",
        timeVisible:    true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // ── Candlestick series ────────────────────────────────────
    const candleSeries = chart.addCandlestickSeries({
      upColor:        "#10b981",
      downColor:      "#ef4444",
      borderUpColor:  "#10b981",
      borderDownColor:"#ef4444",
      wickUpColor:    "#10b981",
      wickDownColor:  "#ef4444",
    });
    candleSeries.setData(candles);

    // ── Buy/Sell markers ──────────────────────────────────────
    if (trades.length) {
      const markers = trades.flatMap((t) => [
        {
          time:     Math.floor(new Date(t.entry_time).getTime() / 1000),
          position: "belowBar",
          color:    "#10b981",
          shape:    "arrowUp",
          text:     `Buy ${t.entry_price}`,
        },
        {
          time:     Math.floor(new Date(t.exit_time).getTime() / 1000),
          position: "aboveBar",
          color:    "#ef4444",
          shape:    "arrowDown",
          text:     `Sell ${t.exit_price}`,
        },
      ]).sort((a, b) => a.time - b.time);

      candleSeries.setMarkers(markers);
    }

    chart.timeScale().fitContent();

    // Responsive resize
    const observer = new ResizeObserver(() => {
      chart.applyOptions({ width: containerRef.current.clientWidth });
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
    };
  }, [candles, trades]);

  return (
    <div className="card">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Price Chart</h3>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
