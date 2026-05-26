import news from "@/data/news.json";

const sentimentConfig = {
  negative: { badge: "bg-red-500/10 text-red-400 border-red-500/25",         dot: "bg-red-400",     label: "Bearish" },
  positive: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", dot: "bg-emerald-400", label: "Bullish" },
  neutral:  { badge: "bg-slate-500/10 text-slate-400 border-slate-500/25",    dot: "bg-slate-400",   label: "Neutral" },
};

export default function NewsPanel() {
  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden"
      style={{ background: "rgba(15,23,42,0.6)" }}>

      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-700/60 border border-slate-700 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
          </div>
          <h2 className="font-semibold text-slate-100 text-sm">Market News</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
          {news.length} articles
        </span>
      </div>

      {/* News list */}
      <div className="divide-y divide-slate-800/60">
        {news.map((n) => {
          const cfg = sentimentConfig[n.sentiment as keyof typeof sentimentConfig];
          return (
            <div key={n.id} className="px-5 py-4 hover:bg-slate-800/20 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-100 font-medium mb-1 leading-snug group-hover:text-white transition-colors">
                    {n.headline}
                  </p>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{n.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {n.impact.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-800 border border-slate-700/60 text-slate-400 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
                      {cfg.label}
                    </span>
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
