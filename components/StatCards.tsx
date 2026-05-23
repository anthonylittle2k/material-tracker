import summary from "@/data/summary.json";

export default function StatCards() {
  const { stats, monthlySavingsOpportunities } = summary;
  const totalSavings = monthlySavingsOpportunities.reduce((a, b) => a + b.saving, 0);

  const cards = [
    { label: "Materials Tracked", value: stats.materialsTracked, sub: "across 5 suppliers", colour: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Active Alerts", value: stats.activeAlerts, sub: "require attention", colour: "text-red-400", bg: "bg-red-400/10" },
    { label: "Prices Rising", value: stats.pricesRising, sub: "materials — caution", colour: "text-red-400", bg: "bg-red-400/10" },
    { label: "Prices Falling", value: stats.pricesFalling, sub: "materials — buy opportunity", colour: "text-green-400", bg: "bg-green-400/10" },
    { label: "Potential Monthly Saving", value: `£${totalSavings.toLocaleString()}`, sub: "via renegotiation & timing", colour: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl border border-slate-700 p-4 ${c.bg}`}>
          <p className="text-xs text-slate-400 mb-1">{c.label}</p>
          <p className={`text-3xl font-bold ${c.colour}`}>{c.value}</p>
          <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
