"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

type Material = {
  name: string;
  grade: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  status: string;
  change30d: number;
  aiRecommendation: string;
  history: { date: string; price: number }[];
};

const statusColour = { green: "#34d399", amber: "#fbbf24", red: "#f87171" };
const statusLabel  = { green: "Buy Now", amber: "Monitor", red: "Caution" };

export default function PriceChart({ material }: { material: Material }) {
  const colour   = statusColour[material.status as keyof typeof statusColour] ?? "#94a3b8";
  const label    = statusLabel[material.status as keyof typeof statusLabel] ?? "Unknown";
  const priceDiff = material.currentPrice - material.previousPrice;
  const pricePct  = ((priceDiff / material.previousPrice) * 100).toFixed(1);
  const isUp      = priceDiff > 0;

  return (
    <div className="rounded-xl border border-slate-800 flex flex-col gap-0 overflow-hidden"
      style={{ background: "rgba(15,23,42,0.6)" }}>

      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-100 text-sm">{material.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{material.grade} · per {material.unit}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium flex-shrink-0"
            style={{
              color: colour,
              borderColor: `${colour}40`,
              background: `${colour}10`,
            }}>
            {label}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-4">
          <span className="text-4xl font-bold text-white tracking-tight">
            £{material.currentPrice.toLocaleString()}
          </span>
          <span className={`text-sm mb-1 font-semibold flex items-center gap-1 ${isUp ? "text-red-400" : "text-emerald-400"}`}>
            {isUp ? "▲" : "▼"} {Math.abs(Number(pricePct))}%
            <span className="text-slate-600 font-normal text-xs">30d</span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pt-4 pb-2 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={material.history} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colour} stopOpacity={0.6} />
                <stop offset="100%" stopColor={colour} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#475569", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickMargin={6}
            />
            <YAxis
              tick={{ fill: "#475569", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `£${v.toLocaleString()}`}
              width={68}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 8,
                fontSize: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              labelStyle={{ color: "#64748b", marginBottom: 4 }}
              formatter={(v) => [`£${Number(v).toLocaleString()}`, material.name]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={`url(#chartLine)`}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: colour, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Recommendation */}
      <div className="mx-4 mb-4 mt-1 rounded-lg p-3.5 border border-blue-500/15"
        style={{ background: "rgba(59,130,246,0.05)" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">AI Recommendation</p>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{material.aiRecommendation}</p>
      </div>
    </div>
  );
}
