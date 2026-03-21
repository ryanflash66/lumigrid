'use client'

import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useParallax(
  speed: number = 0.1,
  velocityFactor?: number
): {
  ref: React.RefObject<HTMLDivElement | null>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const range = velocityFactor
    ? speed * 100 * (1 + velocityFactor * 0.5)
    : speed * 100
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])
  return { ref, y }
}
