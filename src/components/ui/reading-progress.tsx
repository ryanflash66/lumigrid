'use client'

import { motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export function ReadingProgress() {
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Mobile: hide progress bar — saves a global scroll listener
  if (!mounted || isMobile) return null

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-primary to-primary/60"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
