import { useEffect, useState } from "react"
import { SparkleBackground } from "@/components/ui/sparkle-background"

export function Hero() {
  const [timeStr, setTimeStr] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      const hrs = String(d.getHours()).padStart(2, "0")
      const mins = String(d.getMinutes()).padStart(2, "0")
      const secs = String(d.getSeconds()).padStart(2, "0")
      setTimeStr(`${hrs}:${mins}:${secs}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent px-6 py-6 sm:px-12 sm:py-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/80" />
      </div>

      <div className="relative z-10 flex justify-between items-center w-full font-mono text-[9px] tracking-widest text-neutral-400 select-none border-b border-neutral-900/40 pb-4">
        <div className="flex items-center gap-4">
          <span className="border border-neutral-800 px-2 py-0.5 text-neutral-500 font-bold bg-neutral-950/20">
            SYS-001
          </span>
          <span>PORTFOLIO V.2.0</span>
        </div>
        <div className="text-right">
          LOCAL TIME: {timeStr}
        </div>
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full py-20">
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-paper tracking-tight text-center select-none uppercase flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          <span>NEHA</span>
          <span className="inline-flex items-center">
            <span>S</span>
            <span className="inline-flex relative items-center justify-center mx-[-0.41em] z-10 w-[1.65em] h-[1.65em] text-paper select-none">
              <svg viewBox="0 0 32 32" className="w-full h-full fill-current overflow-visible">
                <path d="M16,9 L18,18.5 L16,32 L14,18.5 Z" />
                <path
                  d="M16,-6 C16,-2.2 17.5,-0.7 21,-0.7 C17.5,-0.7 16,0.8 16,4.6 C16,0.8 14.5,-0.7 11,-0.7 C14.5,-0.7 16,-2.2 16,-6 Z"
                  fill="var(--color-signal)"
                  style={{ filter: "drop-shadow(0 0 6px var(--color-signal))" }}
                  className="animate-pulse"
                />
              </svg>
            </span>
            <span>NGH</span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 mt-auto flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 font-mono text-[8px] tracking-widest text-neutral-500 select-none border-t border-neutral-900/40 pt-4">
        <div>
          &copy; 2026 NEHA SINGH &bull; ALL RIGHTS RESERVED
        </div>
        <div className="text-left md:text-center">
          LAT: 26.9124&deg; N / LONG: 75.7873&deg; E
        </div>
        <div className="text-left md:text-right text-signal">
          ENCRYPTED PROTOCOL: ACTIVATED
        </div>
      </div>
    </section>
  )
}

export default Hero
