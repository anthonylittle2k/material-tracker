import alerts from "@/data/alerts.json";

const severityConfig = {
  high:   { bar: "bg-red-500",    badge: "bg-red-50 text-red-700 border-red-200",       dot: "bg-red-500" },
  medium: { bar: "bg-amber-500",  badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  low:    { bar: "bg-emerald-500",badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

const typeLabel: Record<string, string> = {
  price_surge:          "Price Surge",
  buying_opportunity:   "Buy Opportunity",
  supplier_overprice:   "Supplier Overprice",
};

export default function AlertsPanel() {
  const unread = alerts.filter((a) => !a.read).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <h2 className="font-semibold text-slate-800 text-sm">Alerts</h2>
        </div>
        {unread > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unread} new
          </span>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {alerts.map((a) => {
          const cfg = severityConfig[a.severity as keyof typeof severityConfig];
          return (
            <div key={a.id} className={`px-5 py-4 relative hover:bg-slate-50 transition-colors ${!a.read ? "bg-blue-50/30" : ""}`}>
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${cfg.bar}`} />
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-slate-800 font-semibold text-sm">{a.material}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${cfg.badge}`}>
                      {typeLabel[a.type]}
                    </span>
                    {!a.read && (
                      <span className="text-xs text-blue-600 font-bold bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">{a.message}</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-600">
                      <span className="text-blue-600 font-semibold">Action: </span>
                      {a.action}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(a.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
