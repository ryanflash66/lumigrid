'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView, type Variant, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type RevealVariant = 'fade-up' | 'fade-scale' | 'slide-in-left' | 'slide-in-right' | 'clip-reveal'

const easeOut = [0.25, 0.1, 0.25, 1] as const

const variantMap: Record<RevealVariant, { hidden: Variant; visible: Variant }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-scale': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-in-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-in-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'clip-reveal': {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0 0 0)', opacity: 1 },
  },
}

const reducedMotionFallback: { hidden: Variant; visible: Variant } = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

/** Build Framer Motion variants, collapsing to opacity-only when reduced motion is preferred. */
function buildVariants(
  variant: RevealVariant,
  prefersReduced: boolean | null,
  duration: number,
  delay?: number,
): Variants {
  const v = prefersReduced ? reducedMotionFallback : variantMap[variant]
  return {
    hidden: v.hidden,
    visible: {
      ...v.visible,
      transition: {
        duration: prefersReduced ? 0.4 : duration,
        ...(delay != null && delay > 0 ? { delay } : {}),
        ease: easeOut,
      },
    },
  }
}

// ---------------------------------------------------------------------------
// ScrollReveal
// ---------------------------------------------------------------------------

interface ScrollRevealProps {
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  children: ReactNode
}

export function ScrollReveal({
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  once = true,
  className,
  children,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-40px' })

  // Fallback: if the element is already above-the-fold on mount,
  // IntersectionObserver may fire asynchronously and miss it.
  const [forcedVisible, setForcedVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || isInView || forcedVisible) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40) {
      setForcedVisible(true)
    }
  }, [isInView, forcedVisible])

  return (
    <motion.div
      ref={ref}
      variants={buildVariants(variant, reducedMotion, duration, delay)}
      initial="hidden"
      animate={isInView || forcedVisible ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// StaggerContainer
// ---------------------------------------------------------------------------

interface StaggerContainerProps {
  stagger?: number
  delay?: number
  once?: boolean
  className?: string
  children: ReactNode
}

export function StaggerContainer({
  stagger = 0.08,
  delay = 0,
  once = true,
  className,
  children,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-40px' })

  const [forcedVisible, setForcedVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || isInView || forcedVisible) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40) {
      setForcedVisible(true)
    }
  }, [isInView, forcedVisible])

  const variants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView || forcedVisible ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// StaggerItem
// ---------------------------------------------------------------------------

interface StaggerItemProps {
  variant?: RevealVariant
  duration?: number
  className?: string
  children: ReactNode
}

export function StaggerItem({
  variant = 'fade-up',
  duration = 0.7,
  className,
  children,
}: StaggerItemProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={buildVariants(variant, reducedMotion, duration)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
