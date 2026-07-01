import { useEffect, useRef, useState } from "react"

const wordsList = [
  "DESIGN", "DEV", "CRAFT", "MOTION", "CODE",
  "CREATE", "AI", "PIXELS", "NEHA", "SINGH",
  "INTERACTIVE", "SHADERS", "REACT", "VISION"
]

export function TypographicTerrain() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: Infinity, y: Infinity })

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      if (!containerRef.current) return
      canvas.width = containerRef.current.clientWidth
      canvas.height = containerRef.current.clientHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const cols = 14
    const rows = 12
    const spacingX = 130
    const spacingZ = 85
    const depthOffset = 150
    const fov = 350

    const gridWords: string[][] = []
    const gridAccents: boolean[][] = []

    for (let c = 0; c < cols; c++) {
      gridWords[c] = []
      gridAccents[c] = []
      for (let r = 0; r < rows; r++) {
        const wordIdx = Math.floor(Math.random() * wordsList.length)
        gridWords[c][r] = wordsList[wordIdx]
        gridAccents[c][r] = Math.random() < 0.15
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseLeave = () => {
      setMouse({ x: Infinity, y: Infinity })
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const draw = () => {
      if (!ctx) return
      time += 1.2

      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.65

      const projectedPoints: { sx: number; sy: number; scale: number; valY: number; c: number; r: number }[][] = []

      for (let c = 0; c < cols; c++) {
        projectedPoints[c] = []
        for (let r = 0; r < rows; r++) {
          const x = (c - cols / 2 + 0.5) * spacingX
          const z = r * spacingZ + depthOffset

          const timeFactor = time * 0.012
          let y = Math.sin(c * 0.35 + timeFactor) * Math.cos(r * 0.3 + timeFactor) * 45

          const scale = fov / (z + fov)
          const tempSx = centerX + x * scale
          const tempSy = centerY + (y + 110) * scale

          if (mouse.x !== Infinity) {
            const dist = Math.hypot(tempSx - mouse.x, tempSy - mouse.y)
            if (dist < 160) {
              const pushStrength = (160 - dist) / 160
              y += Math.sin(pushStrength * Math.PI) * -50
            }
          }

          const sx = centerX + x * scale
          const sy = centerY + (y + 110) * scale

          projectedPoints[c][r] = { sx, sy, scale, valY: y, c, r }
        }
      }

      ctx.strokeStyle = "rgba(214, 43, 43, 0.08)"
      ctx.lineWidth = 1

      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const p = projectedPoints[c][r]
          if (c === 0) ctx.moveTo(p.sx, p.sy)
          else ctx.lineTo(p.sx, p.sy)
        }
        ctx.stroke()
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const p = projectedPoints[c][r]
          if (r === 0) ctx.moveTo(p.sx, p.sy)
          else ctx.lineTo(p.sx, p.sy)
        }
        ctx.stroke()
      }

      ctx.textBaseline = "middle"
      ctx.textAlign = "center"

      for (let r = rows - 1; r >= 0; r--) {
        for (let c = 0; c < cols; c++) {
          const p = projectedPoints[c][r]
          const size = Math.max(6, Math.floor(16 * p.scale))

          ctx.font = `bold ${size}px "Space Grotesk", sans-serif`
          ctx.letterSpacing = "1px"

          const isAccent = gridAccents[c][r]
          ctx.fillStyle = isAccent ? "#D42B2B" : "rgba(240, 235, 224, 0.8)"

          if (p.sx > -50 && p.sx < canvas.width + 50 && p.sy > -50 && p.sy < canvas.height + 50) {
            ctx.fillText(gridWords[c][r], p.sx, p.sy)
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouse])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

export default TypographicTerrain
