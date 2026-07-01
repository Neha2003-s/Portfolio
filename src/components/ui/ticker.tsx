interface TickerProps {
  items?: string[]
}

const defaultItems = [
  "Neha Singh",
  "Creative Technologist",
  "AI Tools Builder",
  "Visual Designer",
  "Open to Freelance",
  "Open to Full-Time",
  "Jaipur → Remote"
]

export function Ticker({ items = defaultItems }: TickerProps) {
  const repeatedItems = [...items, ...items]

  return (
    <div className="w-full bg-signal py-3 overflow-hidden border-y border-neutral-900">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-ticker">
          {repeatedItems.map((item, idx) => (
            <div key={idx} className="inline-flex items-center text-xs font-mono tracking-widest uppercase text-paper px-8">
              <span>{item}</span>
              <span className="opacity-45 ml-8 text-[9px]">&diams;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ticker
