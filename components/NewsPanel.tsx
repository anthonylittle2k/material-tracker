import news from "@/data/news.json";

const sentimentConfig = {
  negative: { badge: "bg-red-400/10 text-red-400 border-red-400/30",    icon: "📉" },
  positive: { badge: "bg-green-400/10 text-green-400 border-green-400/30", icon: "📈" },
  neutral:  { badge: "bg-slate-400/10 text-slate-400 border-slate-400/30", icon: "➡️" },
};

export default function NewsPanel() {
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700">
        <h2 className="font-semibold text-slate-200">Market News</h2>
        <p className="text-xs text-slate-500">Filtered to your tracked materials</p>
      </div>
      <div className="divide-y divide-slate-700/50">
        {news.map((n) => {
          const cfg = sentimentConfig[n.sentiment as keyof typeof sentimentConfig];
          return (
            <div key={n.id} className="p-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{cfg.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-slate-200 font-medium mb-1">{n.headline}</p>
                  <p className="text-xs text-slate-400 mb-2">{n.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {n.impact.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>{n.sentiment}</span>
                    <span className="text-xs text-slate-600 ml-auto">{n.source} · {n.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
