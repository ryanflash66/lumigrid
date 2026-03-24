'use client'

import { type ReactNode, useCallback } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

const cardBaseClasses = 'relative overflow-hidden rounded-[24px] border border-border/50 bg-card/40 shadow-sm'

export function GlowCard({ children, className }: GlowCardProps) {
  const isMobile = useIsMobile()

  // Mobile: plain div, no motion overhead
  if (isMobile) {
    return (
      <div className={cn(cardBaseClasses, className)}>
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  return <GlowCardDesktop className={className}>{children}</GlowCardDesktop>
}

function GlowCardDesktop({ children, className }: GlowCardProps) {
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const background = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, oklch(0.55 0.25 250 / 0.06), transparent 80%)`

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [prefersReduced, mouseX, mouseY]
  )

  const handlePointerEnter = useCallback(() => {
    if (!prefersReduced) scale.set(1.01)
  }, [prefersReduced, scale])

  const handlePointerLeave = useCallback(() => {
    scale.set(1)
  }, [scale])

  return (
    <motion.div
      className={cn(
        cardBaseClasses,
        'backdrop-blur-xl transition-colors duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        className
      )}
      style={prefersReduced ? undefined : { scale }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
