import alerts from "@/data/alerts.json";

const severityConfig = {
  high:   { bg: "bg-red-400/10",    border: "border-red-400/30",    icon: "🔴", text: "text-red-300" },
  medium: { bg: "bg-yellow-400/10", border: "border-yellow-400/30", icon: "🟡", text: "text-yellow-300" },
  low:    { bg: "bg-green-400/10",  border: "border-green-400/30",  icon: "🟢", text: "text-green-300" },
};

const typeLabel: Record<string, string> = {
  price_surge:      "Price Surge",
  buying_opportunity: "Buy Opportunity",
  supplier_overprice: "Supplier Overprice",
};

export default function AlertsPanel() {
  const unread = alerts.filter((a) => !a.read).length;

  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-200">Alerts</h2>
        {unread > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread} new</span>
        )}
      </div>
      <div className="divide-y divide-slate-700/50">
        {alerts.map((a) => {
          const cfg = severityConfig[a.severity as keyof typeof severityConfig];
          return (
            <div key={a.id} className={`p-4 ${!a.read ? "bg-slate-800/40" : ""}`}>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{cfg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-slate-200 font-medium text-sm">{a.material}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                      {typeLabel[a.type]}
                    </span>
                    {!a.read && <span className="text-xs text-blue-400 font-medium">NEW</span>}
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{a.message}</p>
                  <div className="bg-slate-700/40 rounded p-2">
                    <p className="text-xs text-slate-300"><span className="text-blue-400 font-medium">Action: </span>{a.action}</p>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{new Date(a.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
