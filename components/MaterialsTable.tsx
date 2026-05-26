"use client";
import { useState } from "react";
import materials from "@/data/materials.json";
import PriceChart from "./PriceChart";

const statusConfig = {
  green: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Buy Now",
  },
  amber: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Monitor",
  },
  red: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 border-red-200",
    label: "Caution",
  },
};

function ChangeCell({ value }: { value: number }) {
  const positive = value > 0;
  const colour = positive ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50";
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-mono font-semibold ${colour}`}>
      {positive ? "▲" : "▼"} {Math.abs(value)}%
    </span>
  );
}

export default function MaterialsTable() {
  const [selected, setSelected] = useState(materials[0]);
  const [expanded, setExpanded] = useState<number | null>(materials[0].id);

  return (
    <div className="grid xl:grid-cols-3 gap-5">
      {/* Table */}
      <div className="xl:col-span-2 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">

        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-semibold text-slate-800 text-sm">Tracked Materials</h2>
            <p className="text-xs text-slate-400 mt-0.5">{materials.length} materials · click a row to expand</p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            All materials
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Material</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">7d</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">30d</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">90d</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {materials.map((m) => {
                const cfg = statusConfig[m.status as keyof typeof statusConfig];
                const isSelected = selected.id === m.id;
                const isExpanded = expanded === m.id;

                return (
                  <>
                    <tr
                      key={m.id}
                      onClick={() => { setSelected(m); setExpanded(isExpanded ? null : m.id); }}
                      className={`cursor-pointer transition-all duration-150 border-l-2 ${
                        isSelected
                          ? "bg-blue-50/60 border-l-blue-500"
                          : "hover:bg-slate-50 border-l-transparent"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <div>
                            <p className="text-slate-800 font-semibold text-sm">{m.name}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{m.grade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="font-mono text-slate-800 font-bold">£{m.currentPrice.toLocaleString()}</span>
                        <span className="text-slate-400 text-xs ml-1">/{m.unit}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right"><ChangeCell value={m.change7d} /></td>
                      <td className="px-4 py-3.5 text-right"><ChangeCell value={m.change30d} /></td>
                      <td className="px-4 py-3.5 text-right"><ChangeCell value={m.change90d} /></td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${m.id}-expand`} className="bg-blue-50/40 border-l-2 border-l-blue-500">
                        <td colSpan={6} className="px-5 py-4">
                          {/* AI Recommendation */}
                          <div className="flex gap-3 items-start mb-4">
                            <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wide">AI Recommendation</p>
                              <p className="text-xs text-slate-600 leading-relaxed">{m.aiRecommendation}</p>
                            </div>
                          </div>

                          {/* Supplier benchmarking */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <p className="text-xs text-slate-400 mb-1">Supplier</p>
                              <p className="text-sm text-slate-700 font-semibold">{m.supplierName}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <p className="text-xs text-slate-400 mb-1">Your Price</p>
                              <p className={`text-sm font-mono font-bold ${m.yourSupplierPrice > m.currentPrice ? "text-red-600" : "text-emerald-600"}`}>
                                £{m.yourSupplierPrice.toLocaleString()}
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <p className="text-xs text-slate-400 mb-1">Market Price</p>
                              <p className="text-sm font-mono font-bold text-slate-700">£{m.currentPrice.toLocaleString()}</p>
                            </div>
                            {m.yourSupplierPrice > m.currentPrice ? (
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <p className="text-xs text-red-500 mb-1">Overpaying by</p>
                                <p className="text-sm font-bold text-red-600">
                                  {((m.yourSupplierPrice - m.currentPrice) / m.currentPrice * 100).toFixed(1)}%
                                </p>
                              </div>
                            ) : (
                              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-emerald-600 mb-1">Good deal</p>
                                <p className="text-sm font-bold text-emerald-600">Below market</p>
                              </div>
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
