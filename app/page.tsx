import StatCards from "@/components/StatCards";
import MaterialsTable from "@/components/MaterialsTable";
import AlertsPanel from "@/components/AlertsPanel";
import NewsPanel from "@/components/NewsPanel";
import SavingsPanel from "@/components/SavingsPanel";
import summary from "@/data/summary.json";

export default function Dashboard() {
  const lastUpdated = new Date(summary.lastUpdated).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">M</div>
            <div>
              <h1 className="text-base font-bold text-slate-100">MatTrack</h1>
              <p className="text-xs text-slate-500">Material Price Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="hidden sm:inline">{summary.companyName}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live data
            </span>
            <span className="hidden md:inline">Updated: {lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stat cards */}
        <StatCards />

        {/* Materials table + chart */}
        <MaterialsTable />

        {/* Savings + Alerts + News */}
        <div className="grid xl:grid-cols-3 gap-4">
          <SavingsPanel />
          <AlertsPanel />
          <NewsPanel />
        </div>
      </main>

      <footer className="border-t border-slate-800 text-center text-xs text-slate-600 py-4 mt-8">
        MatTrack · Mock data for demonstration purposes · Built with Next.js
      </footer>
    </div>
  );
}
