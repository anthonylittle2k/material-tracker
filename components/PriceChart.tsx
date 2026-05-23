"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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

const statusColour = { green: "#4ade80", amber: "#facc15", red: "#f87171" };

export default function PriceChart({ material }: { material: Material }) {
  const colour = statusColour[material.status as keyof typeof statusColour] ?? "#94a3b8";
  const priceDiff = material.currentPrice - material.previousPrice;
  const pricePct = ((priceDiff / material.previousPrice) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-700 p-4 flex flex-col gap-3">
      <div>
        <h2 className="font-semibold text-slate-200">{material.name}</h2>
        <p className="text-xs text-slate-500">{material.grade} · {material.unit}</p>
      </div>

      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-slate-100">£{material.currentPrice.toLocaleString()}</p>
        <p className={`text-sm mb-1 font-medium ${priceDiff > 0 ? "text-red-400" : "text-green-400"}`}>
          {priceDiff > 0 ? "▲" : "▼"} {Math.abs(Number(pricePct))}% (30d)
        </p>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={material.history} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `£${v.toLocaleString()}`}
              width={70}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(v) => [`£${Number(v).toLocaleString()}`, "Price"]}
            />
            <Line type="monotone" dataKey="price" stroke={colour} strokeWidth={2} dot={{ r: 3, fill: colour }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/60 rounded-lg p-3">
        <p className="text-xs text-blue-300 font-medium mb-1">🤖 AI Recommendation</p>
        <p className="text-xs text-slate-300 leading-relaxed">{material.aiRecommendation}</p>
      </div>
    </div>
  );
}
