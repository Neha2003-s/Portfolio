"use client"

import * as React from "react"
import type { SVGProps } from "react"
import { Dithering } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const MemoizedDithering = React.memo(Dithering)

type DitheringProps = React.ComponentProps<typeof Dithering>
type DitheringIcon = React.ComponentType<SVGProps<SVGSVGElement>>

export interface HeroDitheringTechItem {
  name: string
  version?: string
  icon?: DitheringIcon
}

export interface HeroDitheringCTAProps {
  label: React.ReactNode
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
  buttonClassName?: string
}

export interface HeroDitheringRootProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  srTitle?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
  showCta?: boolean
  ctaProps?: Partial<HeroDitheringCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges?: boolean
  techStack?: HeroDitheringTechItem[]
  renderBadge?: (
    tech: HeroDitheringTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
  desktopShaderProps?: Partial<DitheringProps>
  mobileShaderProps?: Partial<DitheringProps>
}

export interface HeroDitheringHeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  headingClassName?: string
}

export interface HeroDitheringDescriptionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  description?: React.ReactNode
  descriptionClassName?: string
}

export interface HeroDitheringActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showCta?: boolean
  ctaProps?: Partial<HeroDitheringCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
}

export interface HeroDitheringBadgesProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showBadges?: boolean
  techStack?: HeroDitheringTechItem[]
  renderBadge?: (
    tech: HeroDitheringTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
}

export interface HeroDitheringVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  desktopShaderProps?: Partial<DitheringProps>
  desktopClassName?: string
}

export interface HeroDitheringMobileVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  mobileShaderProps?: Partial<DitheringProps>
}

export interface HeroDitheringProps extends HeroDitheringRootProps {
  containerClassName?: string
  contentClassName?: string
  headingWrapClassName?: string
  headingClassName?: string
  descriptionWrapClassName?: string
  descriptionClassName?: string
  ctaWrapClassName?: string
  badgesWrapClassName?: string
  visualClassName?: string
  mobileVisualClassName?: string
}

interface HeroDitheringContextValue {
  srTitle: string
  title: React.ReactNode
  subtitle: React.ReactNode
  description: React.ReactNode
  showCta: boolean
  mergedCtaProps: HeroDitheringCTAProps
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges: boolean
  techStack: HeroDitheringTechItem[]
  renderBadge?: HeroDitheringBadgesProps["renderBadge"]
  mergedDesktopShaderProps: Partial<DitheringProps>
  mergedMobileShaderProps: Partial<DitheringProps>
}

const defaultDesktopShaderProps: Partial<DitheringProps> = {
  width: 1280,
  height: 720,
  colorBack: "#16121f",
  colorFront: "#d9447c",
  shape: "swirl",
  type: "4x4",
  size: 2,
  speed: 1,
  scale: 0.6,
}

const defaultMobileShaderProps: Partial<DitheringProps> = {
  colorBack: "#00000000",
  colorFront: "#d9447c",
  shape: "swirl",
  size: 2,
  speed: 0.85,
  scale: 0.52,
  type: "4x4",
  style: { height: "100%", width: "100%" },
}

const defaultCtaProps: HeroDitheringCTAProps = {
  label: "Check it out",
  href: "#work",
  target: "_self",
  rel: undefined,
}

const defaultDescription = <>Building tools that ship.</>

const defaultTechStack: HeroDitheringTechItem[] = []

const HeroDitheringContext = React.createContext<
  HeroDitheringContextValue | undefined
>(undefined)

function useHeroDitheringContext() {
  const context = React.useContext(HeroDitheringContext)
  if (!context) {
    throw new Error(
      "HeroDithering components must be used within HeroDitheringRoot"
    )
  }
  return context
}

export function useHeroDithering() {
  return useHeroDitheringContext()
}

export const HeroDitheringRoot = React.forwardRef<
  HTMLElement,
  HeroDitheringRootProps
>(
  (
    {
      className,
      children,
      srTitle = "Neha Singh",
      title = "Neha Singh",
      subtitle = "Creative Technologist",
      description = defaultDescription,
      showCta = true,
      ctaProps,
      renderCta,
      showBadges = true,
      techStack = defaultTechStack,
      renderBadge,
      desktopShaderProps,
      mobileShaderProps,
      ...props
    },
    ref
  ) => {
    const mergedCtaProps = React.useMemo(
      () => ({
        ...defaultCtaProps,
        ...ctaProps,
      }),
      [ctaProps]
    )

    const mergedDesktopShaderProps = React.useMemo(
      () => ({
        ...defaultDesktopShaderProps,
        ...desktopShaderProps,
      }),
      [desktopShaderProps]
    )

    const mergedMobileShaderProps = React.useMemo(
      () => ({
        ...defaultMobileShaderProps,
        ...mobileShaderProps,
        style: {
          ...(defaultMobileShaderProps.style as React.CSSProperties),
          ...(mobileShaderProps?.style as React.CSSProperties | undefined),
        },
      }),
      [mobileShaderProps]
    )

    const contextValue = React.useMemo<HeroDitheringContextValue>(
      () => ({
        srTitle,
        title,
        subtitle,
        description,
        showCta,
        mergedCtaProps,
        renderCta,
        showBadges,
        techStack,
        renderBadge,
        mergedDesktopShaderProps,
        mergedMobileShaderProps,
      }),
      [
        srTitle,
        title,
        subtitle,
        description,
        showCta,
        mergedCtaProps,
        renderCta,
        showBadges,
        techStack,
        renderBadge,
        mergedDesktopShaderProps,
        mergedMobileShaderProps,
      ]
    )

    return (
      <HeroDitheringContext.Provider value={contextValue}>
        <section
          className={cn("relative h-full w-full overflow-hidden", className)}
          data-slot="hero-dithering-root"
          ref={ref}
          {...props}
        >
          <h1 className="sr-only">{srTitle}</h1>
          {children}
        </section>
      </HeroDitheringContext.Provider>
    )
  }
)
HeroDitheringRoot.displayName = "HeroDitheringRoot"

export function HeroDitheringContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container relative z-10 mx-auto grid gap-6 px-6 pb-16 sm:gap-8 sm:pb-20 lg:grid-cols-[1fr_minmax(300px,500px)] lg:items-center lg:gap-12 lg:pb-24 xl:grid-cols-[1fr_1fr]",
        className
      )}
      data-slot="hero-dithering-container"
      {...props}
    />
  )
}

export function HeroDitheringContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 text-balance sm:gap-5 sm:px-4 md:px-8 lg:gap-6 lg:pr-0 lg:pl-4 xl:pl-8 2xl:pl-0",
        className
      )}
      data-slot="hero-dithering-content"
      {...props}
    />
  )
}

export function HeroDitheringHeading({
  className,
  title,
  subtitle,
  headingClassName,
  children,
  ...props
}: HeroDitheringHeadingProps) {
  const context = useHeroDitheringContext()
  const resolvedTitle = title ?? context.title
  const resolvedSubtitle = subtitle ?? context.subtitle

  return (
    <div
      className={cn("pt-4 text-center sm:pt-6 lg:pt-0 lg:text-left", className)}
      data-slot="hero-dithering-heading-wrap"
      {...props}
    >
      {children ?? (
        <div className="relative">
          <p
            className="mb-3 font-mono text-xs tracking-[0.25em] text-secondary uppercase"
            data-slot="hero-dithering-eyebrow"
          >
            {">> creative_technologist.init"}
          </p>
          <h2
            className={cn(
              "relative mb-0 text-balance font-display font-semibold text-4xl tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-7xl",
              headingClassName
            )}
            data-slot="hero-dithering-heading"
          >
            {resolvedTitle}
            <br />
            <span className="text-primary">{resolvedSubtitle}</span>
          </h2>
        </div>
      )}
    </div>
  )
}

export function HeroDitheringDescription({
  className,
  description,
  descriptionClassName,
  children,
  ...props
}: HeroDitheringDescriptionProps) {
  const context = useHeroDitheringContext()
  const resolvedDescription = description ?? context.description

  return (
    <div
      className={cn(
        "mx-auto max-w-xl pb-2 text-center sm:pb-4 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left",
        className
      )}
      data-slot="hero-dithering-description-wrap"
      {...props}
    >
      {children ?? (
        <p
          className={cn(
            "mt-0 mb-0 font-sans text-base text-foreground/70 sm:text-lg lg:text-xl",
            descriptionClassName
          )}
          data-slot="hero-dithering-description"
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  )
}

export function HeroDitheringActions({
  className,
  showCta,
  ctaProps,
  renderCta,
  children,
  ...props
}: HeroDitheringActionsProps) {
  const context = useHeroDitheringContext()
  const shouldShowCta = showCta ?? context.showCta
  const resolvedCtaProps = { ...context.mergedCtaProps, ...ctaProps }
  const resolvedRenderCta = renderCta ?? context.renderCta

  if (!shouldShowCta) {
    return null
  }

  const defaultCta = <HeroDitheringCTA {...resolvedCtaProps} />

  return (
    <div
      className={cn("flex justify-center lg:justify-start", className)}
      data-slot="hero-dithering-cta-wrap"
      {...props}
    >
      {children ??
        (resolvedRenderCta ? resolvedRenderCta(defaultCta) : defaultCta)}
    </div>
  )
}

export function HeroDitheringCTA({
  label,
  href,
  target,
  rel,
  onClick,
  className,
  buttonClassName,
}: HeroDitheringCTAProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 pb-4 md:pb-0",
        className
      )}
      data-slot="hero-dithering-cta"
    >
      <Button asChild className={cn("font-medium", buttonClassName)} size="lg">
        <a href={href} onClick={onClick} rel={rel} target={target}>
          {label}
        </a>
      </Button>
    </div>
  )
}

export function HeroDitheringBadges({
  className,
  showBadges,
  techStack,
  renderBadge,
  ...props
}: HeroDitheringBadgesProps) {
  const context = useHeroDitheringContext()
  const shouldShowBadges = showBadges ?? context.showBadges
  const resolvedTechStack = techStack ?? context.techStack
  const resolvedRenderBadge = renderBadge ?? context.renderBadge

  if (!shouldShowBadges || resolvedTechStack.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5",
        className
      )}
      data-slot="hero-dithering-badges"
      {...props}
    >
      {resolvedTechStack.map((tech, index) => {
        const Icon = tech.icon
        const defaultBadge = (
          <Badge
            className={cn(
              "group relative px-3.5 py-1.5 font-medium transition-all duration-150",
              "border border-border/50 bg-card text-card-foreground",
              "hover:-translate-y-px"
            )}
            data-slot="hero-dithering-badge"
            key={tech.name}
            variant="outline"
          >
            {Icon ? <Icon className="size-3.5 opacity-80 mr-1" /> : null}
            <span className="font-semibold tracking-tight">{tech.name}</span>
            {tech.version ? (
              <span className="font-mono text-xs opacity-50">
                {tech.version}
              </span>
            ) : null}
          </Badge>
        )

        if (resolvedRenderBadge) {
          return (
            <React.Fragment key={tech.name}>
              {resolvedRenderBadge(tech, index, defaultBadge)}
            </React.Fragment>
          )
        }

        return defaultBadge
      })}
    </div>
  )
}

export function HeroDitheringVisual({
  className,
  desktopClassName,
  desktopShaderProps,
  ...props
}: HeroDitheringVisualProps) {
  const context = useHeroDitheringContext()
  const resolvedDesktopShaderProps = {
    ...context.mergedDesktopShaderProps,
    ...desktopShaderProps,
  }

  return (
    <div
      className={cn(
        "relative hidden h-[350px] lg:block lg:h-[400px] xl:h-[500px]",
        className
      )}
      data-slot="hero-dithering-visual"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full",
          desktopClassName
        )}
        data-slot="hero-dithering-desktop"
      >
        <MemoizedDithering {...resolvedDesktopShaderProps} />
      </div>
    </div>
  )
}

export function HeroDitheringMobileVisual({
  className,
  mobileShaderProps,
  ...props
}: HeroDitheringMobileVisualProps) {
  const context = useHeroDitheringContext()
  const resolvedMobileShaderProps = {
    ...context.mergedMobileShaderProps,
    ...mobileShaderProps,
    style: {
      ...(context.mergedMobileShaderProps.style as React.CSSProperties),
      ...(mobileShaderProps?.style as React.CSSProperties | undefined),
    },
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-24 -z-10 h-[360px] overflow-hidden lg:hidden",
        className
      )}
      data-slot="hero-dithering-mobile"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-56 bg-gradient-to-b from-background via-background/95 to-transparent" />
      <MemoizedDithering {...resolvedMobileShaderProps} />
    </div>
  )
}

export function HeroDithering({
  containerClassName,
  contentClassName,
  headingWrapClassName,
  headingClassName,
  descriptionWrapClassName,
  descriptionClassName,
  ctaWrapClassName,
  badgesWrapClassName,
  visualClassName,
  mobileVisualClassName,
  ...props
}: HeroDitheringProps) {
  return (
    <HeroDitheringRoot {...props}>
      <HeroDitheringContainer className={containerClassName}>
        <HeroDitheringContent className={contentClassName}>
          <HeroDitheringHeading
            className={headingWrapClassName}
            headingClassName={headingClassName}
          />
          <HeroDitheringDescription
            className={descriptionWrapClassName}
            descriptionClassName={descriptionClassName}
          />
          <HeroDitheringActions className={ctaWrapClassName} />
          <div
            className={cn(
              "flex justify-center lg:justify-start",
              badgesWrapClassName
            )}
            data-slot="hero-dithering-badges-wrap"
          >
            <HeroDitheringBadges />
          </div>
        </HeroDitheringContent>
        <HeroDitheringVisual className={visualClassName} />
      </HeroDitheringContainer>
      <HeroDitheringMobileVisual className={mobileVisualClassName} />
    </HeroDitheringRoot>
  )
}

export default HeroDithering
