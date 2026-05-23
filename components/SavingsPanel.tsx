import summary from "@/data/summary.json";

export default function SavingsPanel() {
  const { monthlySavingsOpportunities } = summary;
  const total = monthlySavingsOpportunities.reduce((a, b) => a + b.saving, 0);

  return (
    <div className="rounded-xl border border-yellow-500/30 bg-yellow-400/5 overflow-hidden">
      <div className="px-4 py-3 border-b border-yellow-500/20 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-yellow-300">💰 Savings Opportunities</h2>
          <p className="text-xs text-slate-500">Based on current market data</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-400">£{total.toLocaleString()}</p>
          <p className="text-xs text-slate-500">potential / month</p>
        </div>
      </div>
      <div className="divide-y divide-slate-700/30">
        {monthlySavingsOpportunities.map((s, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-slate-200 font-medium">{s.material}</p>
              <p className="text-xs text-slate-400">{s.action}</p>
            </div>
            <p className="text-yellow-400 font-bold font-mono">£{s.saving.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
