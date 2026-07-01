import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [clicked, setClicked] = useState(false)
  const [bypassSeconds, setBypassSeconds] = useState(8)
  const [isFading, setIsFading] = useState(false)
  const [isAskingSoHard, setIsAskingSoHard] = useState(false)
  
  const [hoverCount, setHoverCount] = useState(0)
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 })
  const [warningText, setWarningText] = useState(
    "System core is locked. Unauthorized activation of the portal interface is strictly prohibited."
  )

  useEffect(() => {
    if (clicked) return

    const tick = setInterval(() => {
      setBypassSeconds(prev => {
        if (prev <= 1) {
          clearInterval(tick)
          setClicked(true)
          setIsAskingSoHard(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(tick)
  }, [clicked])

  useEffect(() => {
    if (!isAskingSoHard) return

    const fadeTimer = setTimeout(() => {
      setIsFading(true)
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 400)
      return () => clearTimeout(completeTimer)
    }, 1500)

    return () => clearTimeout(fadeTimer)
  }, [isAskingSoHard, onComplete])

  const handleButtonHover = () => {
    if (clicked) return

    if (hoverCount === 0) {
      setBtnOffset({ x: -160, y: -80 })
      setWarningText("SYSTEM: HEY! I SAID DO NOT PRESS!")
      setHoverCount(1)
    } else if (hoverCount === 1) {
      setBtnOffset({ x: 170, y: 90 })
      setWarningText("SYSTEM: SERIOUSLY, ARE YOU STILL TRYING?")
      setHoverCount(2)
    } else if (hoverCount === 2) {
      setBtnOffset({ x: -140, y: 110 })
      setWarningText("SYSTEM: STOP IT! THIS IS CRITICAL CORE MACHINERY!")
      setHoverCount(3)
    } else if (hoverCount === 3) {
      setBtnOffset({ x: 0, y: 0 })
      setWarningText("SYSTEM: FINE. GO AHEAD. PRESS IT. SEE WHAT HAPPENS.")
      setHoverCount(4)
    }
  }

  const handleButtonClick = () => {
    setClicked(true)
    setIsAskingSoHard(true)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black p-6 font-mono text-[10px] tracking-wider select-none transition-all duration-400 ease-out ${
        isFading ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
      }`}
    >
      {!isAskingSoHard ? (
        <div className="flex flex-col items-center gap-8 max-w-sm text-center">
          <div className="flex flex-col items-center gap-3">
            <AlertTriangle className="size-6 text-signal animate-bounce" />
            <span className="text-signal uppercase tracking-widest font-bold">
              Critical Warning
            </span>
            <p className="text-neutral-400 text-[9px] leading-relaxed uppercase transition-all duration-300">
              {warningText}
            </p>
          </div>

          <div
            style={{
              transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
              transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            className="relative"
          >
            <button
              onMouseEnter={handleButtonHover}
              onClick={handleButtonClick}
              className="relative group flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center group-hover:border-signal/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-signal shadow-[0_0_15px_rgba(214,43,43,0.4)] group-hover:shadow-[0_0_25px_rgba(214,43,43,0.85)] group-active:scale-95 transition-all duration-300 border border-signal-dim" />
              </div>
              <span className="font-mono text-[9px] text-signal group-hover:text-paper uppercase tracking-widest font-black mt-4 transition-colors">
                DO NOT PRESS
              </span>
            </button>
          </div>

          <span className="text-neutral-500 text-[8px] uppercase tracking-widest mt-4">
            Security Override in {bypassSeconds}s...
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center max-w-sm animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full border border-signal/60 flex items-center justify-center bg-signal/5 animate-pulse">
            <AlertTriangle className="size-6 text-signal" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-paper uppercase tracking-tighter mt-4 leading-none animate-bounce">
            WAS IT SO HARD?
          </h2>
          <span className="text-[7px] text-neutral-500 uppercase tracking-widest animate-pulse">
            Initializing portal core...
          </span>
        </div>
      )}
    </div>
  )
}

export default LoadingScreen
