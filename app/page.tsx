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
    <div className="min-h-screen text-slate-100" style={{ background: "var(--background)" }}>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-800/80 backdrop-blur-md"
        style={{ background: "rgba(8,14,26,0.85)" }}>
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
              M
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-slate-900 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">MatTrack</span>
              <span className="hidden sm:inline text-slate-500 text-xs ml-2">Material Price Intelligence</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Live</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">{lastUpdated}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-semibold text-slate-300">
              {summary.companyName.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-8 pb-2">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">{summary.companyName} · material pricing overview</p>
      </div>

      {/* Main content */}
      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        <StatCards />
        <MaterialsTable />
        <div className="grid xl:grid-cols-3 gap-5">
          <SavingsPanel />
          <AlertsPanel />
          <NewsPanel />
        </div>
      </main>

      <footer className="max-w-screen-2xl mx-auto px-6 py-6 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-600">
        <span>© 2026 MatTrack · Material Price Intelligence</span>
        <span>Mock data · Built with Next.js</span>
      </footer>
    </div>
  );
}
