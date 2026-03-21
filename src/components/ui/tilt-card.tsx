'use client'

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  className?: string
  children: React.ReactNode
  /** Maximum tilt in degrees */
  maxTilt?: number
  /** Show luminous border glow that follows cursor */
  glowBorder?: boolean
}

export function TiltCard({ className, children, maxTilt = 4, glowBorder = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 })

  const glowBackground = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    const pctX = (x * 100).toFixed(1)
    const pctY = (y * 100).toFixed(1)
    return `radial-gradient(circle at ${pctX}% ${pctY}%, var(--primary) 0%, var(--accent) 40%, transparent 70%)`
  })

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      mouseX.set(x)
      mouseY.set(y)
      rawRotateY.set((x - 0.5) * maxTilt * 2)
      rawRotateX.set((0.5 - y) * maxTilt * 2)
    },
    [maxTilt, mouseX, mouseY, rawRotateX, rawRotateY]
  )

  const handlePointerLeave = useCallback(() => {
    rawRotateX.set(0)
    rawRotateY.set(0)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [rawRotateX, rawRotateY, mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={cn('group relative motion-reduce:!transform-none', className)}
    >
      {/* Luminous border glow overlay */}
      {glowBorder && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background: glowBackground,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1.5px',
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
