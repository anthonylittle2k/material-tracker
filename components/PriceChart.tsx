"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Material } from "@/app/lib/api";

const statusColour = { green: "#10b981", amber: "#f59e0b", red: "#ef4444" };
const statusLabel  = { green: "Buy Now",  amber: "Monitor",  red: "Caution"  };
const statusBadge  = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red:   "bg-red-50 text-red-700 border-red-200",
};

export default function PriceChart({ material }: { material: Material }) {
  const colour  = statusColour[material.status as keyof typeof statusColour] ?? "#64748b";
  const badge   = statusBadge[material.status as keyof typeof statusBadge]   ?? "";
  const label   = statusLabel[material.status as keyof typeof statusLabel]   ?? "Monitor";
  const history = material.history ?? [];

  const priceDiff = material.previousPrice
    ? material.currentPrice - material.previousPrice
    : material.change30d ? material.currentPrice * (material.change30d / 100) : 0;
  const pricePct  = material.change30d ?? 0;
  const isUp      = pricePct > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-800 text-sm">{material.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{material.grade} · per {material.unit}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold flex-shrink-0 ${badge}`}>
            {label}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-4">
          <span className="text-4xl font-bold text-slate-900 tracking-tight">
            £{material.currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={`text-sm mb-1 font-semibold flex items-center gap-1 ${isUp ? "text-red-500" : "text-emerald-500"}`}>
            {isUp ? "▲" : "▼"} {Math.abs(pricePct)}%
            <span className="text-slate-400 font-normal text-xs">30d</span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pt-4 pb-2 h-44">
        {history.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickMargin={6}
                tickFormatter={(v) => {
                  const d = new Date(v);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => `£${Number(v).toLocaleString()}`}
                width={72}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ color: "#94a3b8", marginBottom: 4 }}
                formatter={(v) => [`£${Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, material.name]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={colour}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: colour, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-400 text-xs">Loading price history...</p>
          </div>
        )}
      </div>

      {/* AI Recommendation */}
      <div className="mx-4 mb-4 mt-1 rounded-lg p-3.5 border border-blue-100 bg-blue-50">
        <div className="flex items-center gap-2 mb-1.5">
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">AI Recommendation</p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{material.aiRecommendation}</p>
      </div>
    </div>
  );
}
