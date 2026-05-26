import summary from "@/data/summary.json";

const icons = {
  tracking: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
  ),
  alerts: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  ),
  rising: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  falling: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
    </svg>
  ),
  savings: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
};

export default function StatCards() {
  const { stats, monthlySavingsOpportunities } = summary;
  const totalSavings = monthlySavingsOpportunities.reduce((a, b) => a + b.saving, 0);

  const cards = [
    {
      label: "Materials Tracked",
      value: stats.materialsTracked,
      sub: "across 5 suppliers",
      colour: "text-blue-400",
      iconColour: "text-blue-400",
      bg: "bg-blue-500/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
      icon: icons.tracking,
    },
    {
      label: "Active Alerts",
      value: stats.activeAlerts,
      sub: "require attention",
      colour: "text-red-400",
      iconColour: "text-red-400",
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      iconBg: "bg-red-500/10",
      icon: icons.alerts,
    },
    {
      label: "Prices Rising",
      value: stats.pricesRising,
      sub: "materials — caution",
      colour: "text-orange-400",
      iconColour: "text-orange-400",
      bg: "bg-orange-500/5",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/10",
      icon: icons.rising,
    },
    {
      label: "Prices Falling",
      value: stats.pricesFalling,
      sub: "buying opportunity",
      colour: "text-emerald-400",
      iconColour: "text-emerald-400",
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      icon: icons.falling,
    },
    {
      label: "Monthly Saving",
      value: `£${totalSavings.toLocaleString()}`,
      sub: "via timing & renegotiation",
      colour: "text-yellow-400",
      iconColour: "text-yellow-400",
      bg: "bg-yellow-500/5",
      border: "border-yellow-500/20",
      iconBg: "bg-yellow-500/10",
      icon: icons.savings,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-xl border ${c.border} ${c.bg} p-5 flex flex-col gap-3 relative overflow-hidden`}
        >
          {/* Icon */}
          <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center ${c.iconColour}`}>
            {c.icon}
          </div>

          {/* Value */}
          <div>
            <p className={`text-3xl font-bold tracking-tight ${c.colour}`}>{c.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{c.label}</p>
          </div>

          {/* Sub */}
          <p className="text-xs text-slate-600">{c.sub}</p>

          {/* Decorative glow */}
          <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full ${c.iconBg} blur-2xl opacity-60`} />
        </div>
      ))}
    </div>
  );
}
