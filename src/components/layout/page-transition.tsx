'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

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

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={prefersReduced ? reducedVariants : fullVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: prefersReduced ? 0.15 : 0.35, ease }}
        style={{ willChange: 'opacity, transform, clip-path' }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
