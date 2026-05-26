import news from "@/data/news.json";

const sentimentConfig = {
  negative: { badge: "bg-red-50 text-red-700 border-red-200",         dot: "bg-red-500",     label: "Bearish" },
  positive: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", label: "Bullish" },
  neutral:  { badge: "bg-slate-100 text-slate-600 border-slate-200",   dot: "bg-slate-400",   label: "Neutral" },
};

export default function NewsPanel() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
          </div>
          <h2 className="font-semibold text-slate-800 text-sm">Market News</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
          {news.length} articles
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {news.map((n) => {
          const cfg = sentimentConfig[n.sentiment as keyof typeof sentimentConfig];
          return (
            <div key={n.id} className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-semibold mb-1 leading-snug group-hover:text-slate-900 transition-colors">
                    {n.headline}
                  </p>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{n.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {n.impact.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">{n.source} · {n.date}</span>
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
