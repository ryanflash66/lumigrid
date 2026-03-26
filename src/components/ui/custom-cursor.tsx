'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useCursorEnabled } from '@/contexts/cursor-context'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="pointer"], input, textarea, select, label'

export function CustomCursor() {
  const { enabled } = useCursorEnabled()
  const prefersReduced = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28 })
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseX, { stiffness: 150, damping: 20 })

  // Use separate spring for ring Y
  const ringYActual = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    // Check if device has fine pointer (not touch)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsTouch(!mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsTouch(!e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    },
    [mouseX, mouseY]
  )

  const handlePointerLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handlePointerOver = useCallback((e: PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest(INTERACTIVE_SELECTOR)) {
      setIsHovering(true)
    }
  }, [])

  const handlePointerOut = useCallback((e: PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest(INTERACTIVE_SELECTOR)) {
      setIsHovering(false)
    }
  }, [])

  useEffect(() => {
    if (isTouch || !enabled) return

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [isTouch, enabled, handlePointerMove, handlePointerLeave, handlePointerOver, handlePointerOut])

  if (isTouch || prefersReduced || !enabled) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-full w-full rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          x: ringX,
          y: ringYActual,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-full w-full rounded-full border border-white/60" />
      </motion.div>
    </>
  )
}
