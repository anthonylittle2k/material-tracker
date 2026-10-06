import StatCards from "@/components/StatCards";
import MaterialsTable from "@/components/MaterialsTable";
import AlertsPanel from "@/components/AlertsPanel";
import NewsPanel from "@/components/NewsPanel";
import SavingsPanel from "@/components/SavingsPanel";
import { fetchSummary } from "@/app/lib/api";

export const revalidate = 300; // Revalidate page every 5 minutes

export default async function Dashboard() {
  // Fetch summary server-side — stat cards and savings panel get real data immediately
  let summary;
  try {
    summary = await fetchSummary();
  } catch {
    // Fallback if API is unreachable
    summary = {
      companyName: "Precision Parts Ltd",
      lastUpdated: new Date().toISOString(),
      stats: { materialsTracked: 8, activeAlerts: 0, pricesRising: 0, pricesFalling: 0 },
      monthlySavingsOpportunities: [],
    };
  }

  const lastUpdated = new Date(summary.lastUpdated).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
              M
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight">MatTrack</span>
              <span className="hidden sm:inline text-slate-400 text-xs ml-2">Material Price Intelligence</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-emerald-600">Synced</span>
              <span className="text-slate-300">·</span>
              <span>{lastUpdated}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              {summary.companyName.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-8 pb-2">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">{summary.companyName} · material pricing overview</p>
      </div>

      {/* Main content */}
      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        <StatCards summary={summary} />
        <MaterialsTable />
        <div className="grid xl:grid-cols-3 gap-5">
          <SavingsPanel summary={summary} />
          <AlertsPanel />
          <NewsPanel />
        </div>
      </main>

      <footer className="max-w-screen-2xl mx-auto px-6 py-6 mt-4 border-t border-slate-200 text-xs text-slate-400 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 MatTrack · Material Price Intelligence</span>
          <span>Market prices are monthly averages, updated as sources publish</span>
        </div>
        <p className="leading-relaxed">
          Data sources:{" "}
          <a className="underline hover:text-slate-600" href="https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/producerpriceindexstatisticalbulletindataset">ONS Producer Price Indices</a>
          {" "}— contains public sector information licensed under the{" "}
          <a className="underline hover:text-slate-600" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.{" "}
          <a className="underline hover:text-slate-600" href="https://www.worldbank.org/en/research/commodity-markets">World Bank Commodity Price Data (The Pink Sheet)</a>
          {" "}— licensed under{" "}
          <a className="underline hover:text-slate-600" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.{" "}
          Exchange rates — source: ECB statistics. Material prices are MatTrack estimates derived from these sources.
        </p>
      </footer>
    </div>
  );
}
