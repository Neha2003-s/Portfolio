import React, { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type DitherAspectRatio = "square" | "video" | "portrait" | "wide" | string

function resolveAspectRatio(ratio?: DitherAspectRatio): string | undefined {
  if (!ratio) return undefined
  if (ratio === "square") return "1 / 1"
  if (ratio === "video") return "16 / 9"
  if (ratio === "portrait") return "3 / 4"
  if (ratio === "wide") return "21 / 9"
  return ratio
}

export const DitherImage = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <figure
        className={cn("inline-flex flex-col gap-3 w-full", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImage.displayName = "DitherImage"

export interface DitherImageFrameProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: DitherAspectRatio
  ditherOpacity?: number
  rounded?: boolean | string
  enableHoverEffect?: boolean
}

export const DitherImageFrame = forwardRef<HTMLDivElement, DitherImageFrameProps>(
  ({ className, aspectRatio, ditherOpacity = 0.35, rounded = true, enableHoverEffect = true, style, ...props }, ref) => {
    const resolvedAspect = resolveAspectRatio(aspectRatio)
    const roundedClass = rounded === true ? "rounded-xl" : typeof rounded === "string" ? rounded : ""

    return (
      <div
        className={cn(
          "relative overflow-hidden bg-black w-full group",
          roundedClass,
          className
        )}
        ref={ref}
        style={{
          aspectRatio: resolvedAspect,
          ...style,
        }}
        {...props}
      >
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
          {props.children}
        </div>
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            enableHoverEffect ? "opacity-100 group-hover:opacity-20" : ""
          )}
          style={{
            backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.8) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
            opacity: ditherOpacity,
          }}
        />
      </div>
    )
  }
)
DitherImageFrame.displayName = "DitherImageFrame"

export const DitherImageContent = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        alt={alt || ""}
        className={cn(
          "block h-full w-full object-cover filter grayscale brightness-95 contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageContent.displayName = "DitherImageContent"

export const DitherImageCaption = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <figcaption
        className={cn("text-pretty text-neutral-400 text-xs font-mono tracking-tight", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageCaption.displayName = "DitherImageCaption"
