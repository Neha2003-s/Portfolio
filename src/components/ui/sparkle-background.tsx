import { useEffect, useRef } from "react"

interface Sparkle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  pulseSpeed: number
}

const colors = ["#F2A900", "#f0ebe0", "#7ECAC9", "#C9A7F2", "#A0E4B0", "#F2C46A", "#B8D4F2"]

interface SparkleBackgroundProps {
  mode?: "background" | "foreground"
}

export function SparkleBackground({ mode = "background" }: SparkleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const numSparkles = mode === "background" ? 32 : 14

    const resize = () => {
      if (!containerRef.current) return
      canvas.width = containerRef.current.clientWidth
      canvas.height = containerRef.current.clientHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const sparkles: Sparkle[] = []

    for (let i = 0; i < numSparkles; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        size: mode === "background" ? Math.random() * 4 + 2.5 : Math.random() * 6.5 + 3.5,
        color,
        alpha: mode === "background" ? Math.random() * 0.4 + 0.55 : Math.random() * 0.4 + 0.45,
        pulseSpeed: Math.random() * 0.005 + 0.002,
      })
    }

    const drawOrb = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save()
      c.globalAlpha = alpha
      c.shadowBlur = 32
      c.shadowColor = color
      c.beginPath()
      c.arc(cx, cy, size, 0, Math.PI * 2)
      c.fillStyle = color
      c.fill()
      c.shadowBlur = 55
      c.fill()
      c.restore()
    }

    const draw = () => {
      if (!ctx) return

      if (mode === "background") {
        ctx.fillStyle = "#0a0a0a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = "rgba(255,255,255,0.018)"
        ctx.lineWidth = 1
        const gs = 65
        for (let x = 0; x < canvas.width; x += gs) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
        }
        for (let y = 0; y < canvas.height; y += gs) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      for (const s of sparkles) {
        s.x += s.vx
        s.y += s.vy
        s.alpha += s.pulseSpeed

        if (s.alpha > 0.96) { s.alpha = 0.96; s.pulseSpeed = -s.pulseSpeed }
        else if (s.alpha < 0.22) { s.alpha = 0.22; s.pulseSpeed = -s.pulseSpeed }

        if (s.x < -10) s.x = canvas.width + 10
        else if (s.x > canvas.width + 10) s.x = -10
        if (s.y < -10) s.y = canvas.height + 10
        else if (s.y > canvas.height + 10) s.y = -10

        drawOrb(ctx, s.x, s.y, s.size, s.color, s.alpha)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [mode])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-transparent">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

export default SparkleBackground
