'use client'

import { useScroll, useTransform, useVelocity, useSpring, type MotionValue } from 'framer-motion'

export function useScrollVelocity(): {
  velocity: MotionValue<number>
  absVelocity: MotionValue<number>
} {
  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 100, damping: 30 })
  const absVelocity = useTransform(smoothVelocity, (v) => Math.abs(v))
  return { velocity: smoothVelocity, absVelocity }
}
