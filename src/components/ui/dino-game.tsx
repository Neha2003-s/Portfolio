import { useEffect, useRef, useState } from "react"

type GameState = "idle" | "running" | "gameover"

interface Hitbox { x: number; y: number; width: number; height: number }
interface Obstacle { x: number; y: number; width: number; height: number; type: "spike" | "box" | "ball"; color: string }

const GRAVITY = 0.55
const JUMP_VEL = -12
const PLAYER_W = 30
const PLAYER_H = 34
const GROUND_RATIO = 0.73
const PLAYER_X_RATIO = 0.10

function isColliding(a: Hitbox, b: Hitbox) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

function shrink(x: number, y: number, w: number, h: number, pct = 0.18): Hitbox {
  const mx = w * pct; const my = h * pct
  return { x: x + mx, y: y + my, width: w - mx * 2, height: h - my * 2 }
}

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const g = useRef({
    state: "idle" as GameState,
    playerY: 0, velY: 0, onGround: true,
    obstacles: [] as Obstacle[],
    score: 0, frame: 0, speed: 4,
    groundY: 0, playerX: 0,
    spawnTimer: 0, nextSpawn: 90,
    animId: 0,
  })
  const [ui, setUi] = useState({ score: 0, state: "idle" as GameState })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      g.current.groundY = canvas.height * GROUND_RATIO
      g.current.playerX = canvas.width * PLAYER_X_RATIO
      if (g.current.state !== "running") g.current.playerY = g.current.groundY - PLAYER_H
    }
    resize()
    window.addEventListener("resize", resize)

    const resetGame = () => {
      const s = g.current
      s.state = "idle"; s.score = 0; s.frame = 0; s.speed = 4
      s.obstacles = []; s.velY = 0; s.onGround = true
      s.playerY = s.groundY - PLAYER_H
      s.spawnTimer = 0; s.nextSpawn = 90
      setUi({ score: 0, state: "idle" })
    }

    const handleInput = () => {
      const s = g.current
      if (s.state === "idle") {
        s.state = "running"
        setUi({ score: 0, state: "running" })
      } else if (s.state === "gameover") {
        resetGame()
      } else if (s.state === "running" && s.onGround) {
        s.velY = JUMP_VEL
        s.onGround = false
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); handleInput() }
    }
    window.addEventListener("keydown", onKey)
    canvas.addEventListener("click", handleInput)

    const spawnObstacle = () => {
      const s = g.current
      const W = canvas.width
      const types: ("spike" | "box" | "ball")[] = ["spike", "box", "ball"]
      const type = types[Math.floor(Math.random() * 3)]
      const color = ["#7ECAC9", "#C9A7F2", "#F2C46A"][Math.floor(Math.random() * 3)]
      let w = 0, h = 0
      if (type === "spike") { w = 22; h = 36 }
      else if (type === "box") { w = 26; h = 26 }
      else { w = 24; h = 24 }
      const y = s.groundY - h
      s.obstacles.push({ x: W + 20, y, width: w, height: h, type, color })
    }

    const drawPlayer = (running: boolean) => {
      const s = g.current
      const x = s.playerX; const y = s.playerY
      const wobble = running ? Math.sin(s.frame * 0.28) * 4 : 0

      ctx.fillStyle = "#f0ebe0"
      ctx.beginPath()
      ctx.ellipse(x + 15, y + 15, 14, 16, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#0a0a0a"
      ctx.beginPath(); ctx.arc(x + 20, y + 10, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = "#f0ebe0"
      ctx.beginPath(); ctx.arc(x + 21, y + 9, 1.2, 0, Math.PI * 2); ctx.fill()

      ctx.fillStyle = "#f0ebe0"
      ctx.beginPath(); ctx.ellipse(x + 9, y + PLAYER_H - 3 + wobble, 5, 4, -0.2, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.ellipse(x + 21, y + PLAYER_H - 3 - wobble, 5, 4, 0.2, 0, Math.PI * 2); ctx.fill()
    }

    const drawObstacle = (o: Obstacle) => {
      ctx.fillStyle = o.color
      if (o.type === "spike") {
        ctx.beginPath()
        ctx.moveTo(o.x + o.width * 0.5, o.y)
        ctx.lineTo(o.x + o.width, o.y + o.height)
        ctx.lineTo(o.x, o.y + o.height)
        ctx.closePath(); ctx.fill()
        ctx.globalAlpha = 0.55
        ctx.beginPath()
        ctx.moveTo(o.x + o.width * 0.82, o.y + o.height * 0.28)
        ctx.lineTo(o.x + o.width * 1.15, o.y + o.height)
        ctx.lineTo(o.x + o.width * 0.48, o.y + o.height)
        ctx.closePath(); ctx.fill()
        ctx.globalAlpha = 1
      } else if (o.type === "box") {
        ctx.fillRect(o.x, o.y, o.width, o.height)
        ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1.5
        ctx.strokeRect(o.x + 1, o.y + 1, o.width - 2, o.height - 2)
        ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + o.width, o.y + o.height); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(o.x + o.width, o.y); ctx.lineTo(o.x, o.y + o.height); ctx.stroke()
      } else {
        ctx.beginPath(); ctx.arc(o.x + o.width / 2, o.y + o.height / 2, o.width / 2, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "rgba(0,0,0,0.18)"
        ctx.beginPath(); ctx.arc(o.x + o.width / 2 - 3, o.y + o.height / 2 - 3, o.width / 5, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => {
      const s = g.current
      const W = canvas.width; const H = canvas.height
      const groundY = s.groundY
      ctx.clearRect(0, 0, W, H)

      ctx.fillStyle = "rgba(240, 235, 224, 0.85)"
      const starOffsets = [12, 45, 78, 120, 210]
      starOffsets.forEach((off, idx) => {
        const starX = (off * 7.5) % W
        const starY = (off * 1.5) % (groundY - 80)
        const twinkle = Math.sin(s.frame * 0.04 + idx) * 0.5 + 0.5
        ctx.globalAlpha = twinkle * 0.85
        ctx.fillRect(starX, starY, 2, 2)
      })
      ctx.globalAlpha = 1.0

      ctx.strokeStyle = "rgba(240, 235, 224, 0.45)"
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x < W; x += 10) {
        const yVal = groundY - 24 + Math.sin(x * 0.008 + s.frame * 0.003) * 6
        if (x === 0) ctx.moveTo(x, yVal)
        else ctx.lineTo(x, yVal)
      }
      ctx.stroke()

      ctx.fillStyle = "rgba(240, 235, 224, 0.45)"
      const drawCloud = (cx: number, cy: number, r: number) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.arc(cx + r * 0.6, cy - r * 0.2, r * 0.8, 0, Math.PI * 2)
        ctx.arc(cx - r * 0.6, cy - r * 0.1, r * 0.7, 0, Math.PI * 2); ctx.fill()
      }
      drawCloud(((W * 0.2 - s.frame * 0.18) % W + W) % W, H * 0.2, 16)
      drawCloud(((W * 0.75 - s.frame * 0.09) % W + W) % W, H * 0.32, 12)

      ctx.strokeStyle = "rgba(240, 235, 224, 0.35)"; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke()

      ctx.fillStyle = "rgba(240, 235, 224, 0.3)"
      for (let i = 0; i < W; i += 18) {
        const dotX = ((i - s.frame * s.speed * 0.5) % W + W) % W
        ctx.fillRect(dotX, groundY + 3, 3, 2)
      }

      ctx.strokeStyle = "rgba(240, 235, 224, 0.55)"
      for (let i = 0; i < W; i += 90) {
        const grassX = ((i - s.frame * s.speed) % W + W) % W
        ctx.beginPath()
        ctx.moveTo(grassX, groundY)
        ctx.lineTo(grassX + 3, groundY - 4)
        ctx.lineTo(grassX + 6, groundY)
        ctx.stroke()
      }

      if (s.state === "idle") {
        ctx.fillStyle = "rgba(240,235,224,0.18)"
        ctx.font = "10px 'Courier New', monospace"
        ctx.textAlign = "center"
        ctx.fillText("PRESS SPACE OR CLICK TO PLAY", W / 2, groundY - PLAYER_H - 18)
        ctx.textAlign = "left"
        drawPlayer(false)
        s.animId = requestAnimationFrame(loop)
        return
      }

      if (s.state === "running") {
        s.frame++
        s.score = Math.floor(s.frame / 6)
        s.speed = Math.min(4 + s.score * 0.009, 13)

        if (!s.onGround) {
          s.velY += GRAVITY
          s.playerY += s.velY
        }

        const groundFloor = groundY - PLAYER_H
        if (s.playerY >= groundFloor) {
          s.playerY = groundFloor
          s.velY = 0
          s.onGround = true
        }

        s.spawnTimer++
        if (s.spawnTimer >= s.nextSpawn) {
          spawnObstacle()
          s.spawnTimer = 0
          s.nextSpawn = Math.max(44, 75 + Math.random() * 70 - s.score * 0.12)
        }

        s.obstacles = s.obstacles.map(o => ({ ...o, x: o.x - s.speed })).filter(o => o.x + o.width > -20)

        const pHitbox = shrink(s.playerX, s.playerY, PLAYER_W, PLAYER_H)
        for (const o of s.obstacles) {
          const oHitbox = shrink(o.x, o.y, o.width, o.height)
          if (isColliding(pHitbox, oHitbox)) {
            s.state = "gameover"
            setUi({ score: s.score, state: "gameover" })
            break
          }
        }

        setUi(prev => prev.state === "running" && prev.score !== s.score ? { score: s.score, state: "running" } : prev)
      }

      s.obstacles.forEach(o => drawObstacle(o))
      drawPlayer(s.state === "running")

      if (s.state === "gameover") {
        ctx.fillStyle = "rgba(212,43,43,0.07)"; ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = "#D42B2B"; ctx.font = "bold 10px 'Courier New', monospace"; ctx.textAlign = "center"
        ctx.fillText(`GAME OVER — SCORE: ${String(s.score).padStart(5, "0")}`, W / 2, groundY - PLAYER_H - 28)
        ctx.fillStyle = "rgba(240,235,224,0.35)"; ctx.font = "9px 'Courier New', monospace"
        ctx.fillText("SPACE OR CLICK TO RESTART", W / 2, groundY - PLAYER_H - 10)
        ctx.textAlign = "left"
      }

      s.animId = requestAnimationFrame(loop)
    }

    g.current.animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(g.current.animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", onKey)
      canvas.removeEventListener("click", handleInput)
    }
  }, [])

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600">/ INTERACTIVE MODULE: NEH-RUN</span>
        <span className="font-mono text-[9px] text-neutral-400 tracking-widest">
          SCORE: {String(ui.score).padStart(5, "0")}
        </span>
      </div>
      <div className="relative border border-neutral-900 flex-1 min-h-[340px]">
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" style={{ minHeight: 340 }} />
      </div>
    </div>
  )
}

export default DinoGame
