'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper'

const INTERACTION_IDLE_MS = 1500
const INTERACTION_THROTTLE_MS = 150

export function FloatingCTA() {
  const [isActive, setIsActive] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  const throttleTimer = useRef<NodeJS.Timeout | null>(null)
  const prefersReduced = useReducedMotion()

  const { scrollY } = useScroll()
  const ctaOpacity = useTransform(scrollY, [300, 500], [0, 1])
  const ctaX = useTransform(scrollY, [300, 500], [100, 0])

  useEffect(() => {
    return scrollY.on('change', (v) => {
      const shouldShow = v > 400
      setPastHero((prev) => (prev === shouldShow ? prev : shouldShow))
    })
  }, [scrollY])

  useEffect(() => {
    const interactions: Array<[keyof WindowEventMap, AddEventListenerOptions | boolean | undefined]> = [
      ['scroll', { passive: true }],
      ['pointermove', { passive: true }],
      ['touchstart', { passive: true }],
      ['wheel', { passive: true }],
      ['keydown', undefined],
      ['click', undefined],
      ['focus', undefined]
    ]

    const handleInteraction = () => {
      if (throttleTimer.current) return
      setIsActive(true)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setIsActive(false), INTERACTION_IDLE_MS)
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null
      }, INTERACTION_THROTTLE_MS)
    }

    interactions.forEach(([event, options]) => {
      window.addEventListener(event, handleInteraction, options)
    })

    return () => {
      interactions.forEach(([event]) => window.removeEventListener(event, handleInteraction))
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (throttleTimer.current) clearTimeout(throttleTimer.current)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 right-4 z-40 hidden flex-col gap-1 md:flex lg:right-8"
      style={prefersReduced ? { opacity: pastHero ? 1 : 0 } : { opacity: ctaOpacity, x: ctaX }}
      animate={
        prefersReduced || !pastHero
          ? {}
          : { scale: [1, 1.02, 1] }
      }
      transition={{
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <p className="pointer-events-auto text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
        Need to ship?
      </p>
      <MagneticWrapper>
        <Link
          href="/contact"
          className={cn('floating-cta pointer-events-auto group', isActive && 'floating-cta--interacting')}
          aria-label="Book a call with Lumigrid"
        >
          <div className="flex flex-col">
            <span className="text-base font-semibold">Book a Call</span>
            <span className="text-xs text-muted-foreground/80">Kickoff slots open two weeks out</span>
          </div>
          <ArrowUpRight className="ml-auto h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </MagneticWrapper>
    </motion.div>
  )
}
