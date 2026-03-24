'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

const ease = [0.22, 1, 0.36, 1] as const

const fullVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(2px)',
    clipPath: 'inset(0 0 5% 0)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0 0)',
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(2px)',
    clipPath: 'inset(0 0 5% 0)',
  },
}

// Mobile: opacity-only — blur and clip-path are expensive composite ops on mobile GPUs
// Explicit filter: 'none' ensures any blur from a hydration-mismatch variant switch is cleared
const lightVariants = {
  initial: { opacity: 0, filter: 'none', clipPath: 'none' },
  animate: { opacity: 1, filter: 'none', clipPath: 'none' },
  exit: { opacity: 0 },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  const useLightVariants = prefersReduced || isMobile
  const variants = useLightVariants ? lightVariants : fullVariants
  const duration = useLightVariants ? 0.1 : 0.25

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, ease }}
        style={isMobile ? undefined : { willChange: 'opacity, transform, clip-path' }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
