"use client";
import { useState } from "react";
import materials from "@/data/materials.json";
import PriceChart from "./PriceChart";

const statusConfig = {
  green:  { dot: "bg-green-400",  badge: "bg-green-400/10 text-green-400 border-green-400/30",  label: "Buy Now" },
  amber:  { dot: "bg-yellow-400", badge: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30", label: "Monitor" },
  red:    { dot: "bg-red-400",    badge: "bg-red-400/10 text-red-400 border-red-400/30",       label: "Caution" },
};

export default function MaterialsTable() {
  const [selected, setSelected] = useState(materials[0]);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="grid xl:grid-cols-3 gap-4">
      {/* Table */}
      <div className="xl:col-span-2 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <h2 className="font-semibold text-slate-200">Tracked Materials</h2>
          <span className="text-xs text-slate-500">Click a row for details</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-700">
                <th className="text-left px-4 py-2">Material</th>
                <th className="text-right px-4 py-2">Price</th>
                <th className="text-right px-4 py-2">7d</th>
                <th className="text-right px-4 py-2">30d</th>
                <th className="text-right px-4 py-2">90d</th>
                <th className="text-center px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => {
                const cfg = statusConfig[m.status as keyof typeof statusConfig];
                const isSelected = selected.id === m.id;
                return (
                  <>
                    <tr
                      key={m.id}
                      onClick={() => { setSelected(m); setExpanded(expanded === m.id ? null : m.id); }}
                      className={`border-b border-slate-700/50 cursor-pointer transition-colors ${isSelected ? "bg-slate-700/40" : "hover:bg-slate-800/60"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <div>
                            <p className="text-slate-200 font-medium">{m.name}</p>
                            <p className="text-slate-500 text-xs">{m.grade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-200">
                        £{m.currentPrice.toLocaleString()}
                        <span className="text-slate-500 text-xs ml-1">{m.unit}</span>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${m.change7d > 0 ? "text-red-400" : "text-green-400"}`}>
                        {m.change7d > 0 ? "+" : ""}{m.change7d}%
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${m.change30d > 0 ? "text-red-400" : "text-green-400"}`}>
                        {m.change30d > 0 ? "+" : ""}{m.change30d}%
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${m.change90d > 0 ? "text-red-400" : "text-green-400"}`}>
                        {m.change90d > 0 ? "+" : ""}{m.change90d}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>{cfg.label}</span>
                      </td>
                    </tr>
                    {expanded === m.id && (
                      <tr key={`${m.id}-expand`} className="bg-slate-800/40 border-b border-slate-700">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="flex gap-2 items-start">
                            <span className="text-blue-400 text-lg mt-0.5">🤖</span>
                            <div>
                              <p className="text-xs text-blue-300 font-medium mb-0.5">AI Recommendation</p>
                              <p className="text-xs text-slate-300">{m.aiRecommendation}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex gap-6 text-xs text-slate-400">
                            <span>Supplier: <span className="text-slate-300">{m.supplierName}</span></span>
                            <span>Your price: <span className={`font-mono ${m.yourSupplierPrice > m.currentPrice ? "text-red-400" : "text-green-400"}`}>£{m.yourSupplierPrice.toLocaleString()}</span></span>
                            <span>Market: <span className="font-mono text-slate-300">£{m.currentPrice.toLocaleString()}</span></span>
                            {m.yourSupplierPrice > m.currentPrice && (
                              <span className="text-red-400">⚠ Paying {((m.yourSupplierPrice - m.currentPrice) / m.currentPrice * 100).toFixed(1)}% above market</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart panel */}
      <PriceChart material={selected} />
    </div>
  );
}
