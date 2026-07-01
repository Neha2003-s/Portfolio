import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * PixelText
 *
 * Adapted from Cult UI's "Pixel Heading" component. The original relies on
 * `geist/font/pixel`, a Next.js-only font loader with five pixel typeface
 * variants — there's no Vite equivalent, so this version reproduces the
 * per-character cycling interaction using a single pixel webfont
 * (Press Start 2P) instead. Hover (or autoPlay) staggers each character
 * from its normal font into the pixel font and back.
 */

export type PixelTextMode = "wave" | "random"

export interface PixelTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  mode?: PixelTextMode
  autoPlay?: boolean
  staggerDelay?: number
  holdDuration?: number
  className?: string
}

export function PixelText({
  children,
  as = "span",
  mode = "wave",
  autoPlay = false,
  staggerDelay = 40,
  holdDuration = 900,
  className,
  ...props
}: PixelTextProps) {
  const chars = React.useMemo(() => children.split(""), [children])
  const [active, setActive] = React.useState<boolean[]>(() =>
    chars.map(() => false)
  )
  const timeouts = React.useRef<number[]>([])

  const clearTimers = () => {
    timeouts.current.forEach((t) => window.clearTimeout(t))
    timeouts.current = []
  }

  const run = React.useCallback(() => {
    clearTimers()
    const order =
      mode === "random"
        ? [...chars.keys()].sort(() => Math.random() - 0.5)
        : [...chars.keys()]

    order.forEach((charIndex, orderIndex) => {
      const onTimeout = window.setTimeout(() => {
        setActive((prev) => {
          const next = [...prev]
          next[charIndex] = true
          return next
        })
        const offTimeout = window.setTimeout(() => {
          setActive((prev) => {
            const next = [...prev]
            next[charIndex] = false
            return next
          })
        }, holdDuration)
        timeouts.current.push(offTimeout)
      }, orderIndex * staggerDelay)
      timeouts.current.push(onTimeout)
    })
  }, [chars, mode, staggerDelay, holdDuration])

  React.useEffect(() => {
    if (autoPlay) {
      run()
      const interval = window.setInterval(
        run,
        chars.length * staggerDelay + holdDuration + 600
      )
      return () => {
        window.clearInterval(interval)
        clearTimers()
      }
    }
    return () => clearTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay])

  const Tag = as as any

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      onMouseEnter={autoPlay ? undefined : run}
      {...props}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all duration-150",
            active[i] ? "font-pixel" : "font-display"
          )}
          style={{
            transform: active[i] ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  )
}

export default PixelText
