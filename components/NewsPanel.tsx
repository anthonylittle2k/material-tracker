"use client";
import { useState, useEffect } from "react";
import { fetchNews, NewsItem } from "@/app/lib/api";

const tagStyle: Record<string, string> = {
  "Trade measures": "bg-violet-50 border-violet-200 text-violet-700",
  "Energy costs":   "bg-amber-50 border-amber-200 text-amber-700",
};
const defaultTagStyle = "bg-slate-100 border-slate-200 text-slate-500";

export default function NewsPanel() {
  const [news, setNews]       = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 text-sm">Policy &amp; Market Updates</h2>
            <p className="text-[11px] text-slate-400">UK government · trade, steel &amp; energy</p>
          </div>
        </div>
        {!loading && !error && (
          <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            {news.length} updates
          </span>
        )}
      </div>

      {loading ? (
        <div className="p-5 space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-slate-100 rounded-lg" />)}
        </div>
      ) : error || news.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-slate-400">
          {error ? "Updates are unavailable right now." : "No recent updates for your materials."}
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {news.map((n) => (
            <a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-4 hover:bg-slate-50 transition-colors group"
            >
              <p className="text-sm text-slate-800 font-semibold mb-1 leading-snug group-hover:text-blue-700 transition-colors">
                {n.headline}
              </p>
              {n.summary && (
                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{n.summary}</p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                {n.tags.map((tag) => (
                  <span key={tag} className={`text-xs border px-2 py-0.5 rounded-full ${tagStyle[tag] ?? defaultTagStyle}`}>
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-slate-400 ml-auto text-right">
                  {n.type} · {new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 truncate">{n.source} · GOV.UK</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
