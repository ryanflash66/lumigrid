'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollSceneProps {
  children: ReactNode
  className?: string
  speed?: number
  scaleFrom?: number
  fadeIn?: boolean
}

export function ScrollScene({
  children,
  className,
  speed = 30,
  scaleFrom = 0.97,
  fadeIn = true,
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleFrom, 1])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeIn ? [0.3, 1, 1, 0.7] : [1, 1, 1, 1]
  )

  if (prefersReduced) {
    return <div ref={ref} className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ y, scale, opacity }}
    >
      {children}
    </motion.div>
  )
}
