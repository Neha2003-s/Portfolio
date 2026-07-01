"use client"

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  animate,
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

interface DockContextType {
  width: number
  hovered: boolean
  mouseX: MotionValue<number>
  isMobile: boolean
}

const INITIAL_WIDTH = 48

const DockContext = createContext<DockContextType>({
  width: 0,
  hovered: false,
  mouseX: null as any,
  isMobile: false,
})

const useDock = () => useContext(DockContext)

interface DockProps {
  className?: string
  children: ReactNode
}

function Dock({ className, children }: DockProps) {
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState(0)
  const dockRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useWindowResize(() => {
    setWidth(dockRef.current?.clientWidth || 0)
  })

  return (
    <DockContext.Provider value={{ hovered, width, mouseX, isMobile }}>
      <motion.div
        ref={dockRef}
        className={cn(
          "fixed bottom-3 sm:bottom-5 left-1/2 z-50 flex h-12 sm:h-14 -translate-x-1/2 items-end gap-1.5 sm:gap-3 rounded-2xl border border-border/60 bg-card/90 p-1.5 sm:p-2 backdrop-blur-md max-w-[95vw]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_24px_0_rgba(0,0,0,0.5)]",
          className
        )}
        onMouseMove={(e) => {
          mouseX.set(e.pageX)
          setHovered(true)
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity)
          setHovered(false)
        }}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

interface DockCardProps {
  children: ReactNode
  label: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

function DockCard({ children, label, href, target, rel, onClick }: DockCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const dock = useDock()
  const [showLabel, setShowLabel] = useState(false)

  const distance = useTransform(dock.mouseX, (val) => {
    const bounds = cardRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const baseSize = dock.isMobile ? 32 : 40
  const zoomSize = dock.isMobile ? 48 : 76

  const widthSync = useTransform(distance, [-150, 0, 150], [baseSize, zoomSize, baseSize])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const content = (
    <motion.button
      ref={cardRef}
      type="button"
      className="group relative flex aspect-square items-center justify-center rounded-xl border border-border/60 bg-dusk text-foreground/80 transition-colors hover:text-primary"
      onClick={onClick}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      style={{ width }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
    >
      {children}
      <AnimatePresence>
        {showLabel ? (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/60 bg-dusk px-2 py-1 font-mono text-[10px] tracking-wide text-foreground/90 shadow-md"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )

  return (
    <div className="flex flex-col items-center gap-1">
      {href ? (
        <a href={href} target={target} rel={rel} aria-label={label}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}

function DockDivider() {
  return (
    <div className="flex h-full items-center px-1">
      <span className="h-7 w-px rounded bg-border" />
    </div>
  )
}

type UseWindowResizeCallback = (width: number, height: number) => void

function useWindowResize(callback: UseWindowResizeCallback) {
  const callbackRef = useCallbackRef(callback)

  useEffect(() => {
    const handleResize = () => {
      callbackRef(window.innerWidth, window.innerHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [callbackRef])
}

function useCallbackRef<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useMemo(() => ((...args: any[]) => callbackRef.current?.(...args)) as T, [])
}

// kept for parity with upstream cult-ui dock API surface
export function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      animate(x, event.clientX)
      animate(y, event.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  return { x, y }
}

export { Dock, DockCard, DockDivider, useDock }
export default Dock
