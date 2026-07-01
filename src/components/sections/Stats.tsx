interface StatItem {
  num: string
  accent?: string
  label: string
}

const stats: StatItem[] = [
  { num: "20", accent: "+", label: "VFX Nodes Built" },
  { num: "100", accent: "+", label: "Nodes Documented" },
  { num: "7", label: "AI Backends Integrated" },
  { num: "3", accent: "yr", label: "Techfest Branding" }
]

export function Stats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-neutral-900 border-b border-neutral-900">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-neutral-950 py-8 px-6 text-center border-b-2 border-transparent hover:border-signal transition-all duration-300">
          <div className="font-display font-extrabold text-4xl text-paper tracking-tighter leading-none">
            {stat.num}
            {stat.accent && <span className="text-signal">{stat.accent}</span>}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mt-3 select-none">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Stats
