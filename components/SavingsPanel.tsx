import { Summary } from "@/app/lib/api";

export default function SavingsPanel({ summary }: { summary: Summary }) {
  const { monthlySavingsOpportunities: opportunities } = summary;
  const total = opportunities.reduce((a, b) => a + b.saving, 0);

  return (
    <div className="rounded-xl border border-amber-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-amber-100 bg-amber-50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 text-sm">Savings Opportunities</h2>
              <p className="text-xs text-slate-500 mt-0.5">Based on current market data</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-amber-600 tracking-tight">£{total.toLocaleString()}</p>
            <p className="text-xs text-slate-500">potential / month</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {opportunities.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-400 text-center">No savings opportunities identified yet.</p>
        ) : (
          opportunities.map((s, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 font-semibold truncate">{s.material}</p>
                <p className="text-xs text-slate-400 truncate">{s.action}</p>
              </div>
              <p className="text-amber-600 font-bold font-mono text-sm flex-shrink-0">
                £{s.saving.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
