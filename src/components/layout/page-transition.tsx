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

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  // Mobile: skip AnimatePresence entirely — it forces layout recalc on every route change
  if (isMobile || prefersReduced) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={fullVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease }}
        style={{ willChange: 'opacity, transform, clip-path' }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
