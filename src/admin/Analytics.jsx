import React, { useMemo } from "react";
import { summarizeSalesByMonth, listOrders } from "../store/orders";

export default function Analytics() {
  const byMonth = useMemo(() => summarizeSalesByMonth(), []);
  const orders = useMemo(() => listOrders(), []);

  const months = Object.keys(byMonth).sort();
  const maxVal = months.reduce((m, k) => Math.max(m, byMonth[k] || 0), 0) || 1;

  const barData = months.map((m) => ({ label: m, value: byMonth[m] }));
  const chartWidth = 600;
  const chartHeight = 260;
  const barGap = 12;
  const barWidth = Math.max(20, (chartWidth - barGap * (barData.length + 1)) / (barData.length || 1));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-[#1e3532]">Analytics</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Total Orders</div>
          <div className="text-3xl font-bold text-[#1e3532]">{orders.length}</div>
        </div>
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Total Sales</div>
          <div className="text-3xl font-bold text-[#1e3532]">₹{orders.reduce((s,o)=>s+Number(o.total||0),0).toLocaleString()}</div>
        </div>
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Average Order Value</div>
          <div className="text-3xl font-bold text-[#1e3532]">₹{(orders.length? (orders.reduce((s,o)=>s+Number(o.total||0),0)/orders.length):0).toFixed(0)}</div>
        </div>
      </div>

      {/* Monthly bar chart (SVG, no external deps) */}
      <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-6">
        <h2 className="text-lg font-semibold text-[#1e3532] mb-4">Monthly Sales</h2>
        {months.length === 0 ? (
          <div className="text-[#1e3532]/70">No data yet.</div>
        ) : (
          <div className="overflow-auto">
            <svg width={chartWidth} height={chartHeight}>
              {/* axes */}
              <line x1="40" y1="10" x2="40" y2={chartHeight-30} stroke="#ccc" />
              <line x1="40" y1={chartHeight-30} x2={chartWidth-10} y2={chartHeight-30} stroke="#ccc" />
              {barData.map((b, i) => {
                const x = 40 + barGap + i * (barWidth + barGap);
                const h = Math.round(((b.value || 0) / maxVal) * (chartHeight - 60));
                const y = (chartHeight - 30) - h;
                return (
                  <g key={b.label}>
                    <rect x={x} y={y} width={barWidth} height={h} fill="#1e3532" opacity="0.9" />
                    <text x={x + barWidth / 2} y={chartHeight - 12} textAnchor="middle" fontSize="10" fill="#333">{b.label}</text>
                    <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="10" fill="#333">₹{(b.value||0).toLocaleString()}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
