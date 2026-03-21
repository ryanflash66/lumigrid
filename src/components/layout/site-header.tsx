'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { NeonButton } from '@/components/ui/neon-button'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { Home, Info, CreditCard, BookOpen, MessageCircle } from 'lucide-react'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: Info },
  { name: 'Pricing', url: '/pricing', icon: CreditCard },
  { name: 'Projects', url: '/blog', icon: BookOpen },
  { name: 'Contact', url: '/contact', icon: MessageCircle }
]

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  const transitionConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: 'easeOut' as const }

  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full pointer-events-none transition-[background-color,border-color,backdrop-filter] duration-300 ease-out border-b',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-border/50'
          : 'bg-transparent border-transparent backdrop-blur-none'
      )}
    >
      <ReadingProgress />

      {/* Bottom glow line */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none transition-opacity duration-300 ease-out',
          scrolled ? 'opacity-40' : 'opacity-0'
        )}
      />

      <motion.div
        className="mx-auto flex max-w-6xl items-center justify-between px-6 pointer-events-auto"
        animate={{ paddingTop: scrolled ? '0.5rem' : '1rem', paddingBottom: scrolled ? '0.5rem' : '1rem' }}
        transition={transitionConfig}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/images/logo/logo.svg" alt="Lumigrid" width={32} height={32} />
          <span className="text-sm font-semibold tracking-[0.2em] text-foreground">LUMIGRID</span>
        </Link>

        {/* Tubelight Navbar: floating on mobile, inline on desktop */}
        <NavBar
          items={navItems}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:bottom-auto"
        />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/signin" className="hidden text-sm font-medium text-foreground/70 transition hover:text-foreground sm:inline-flex">
            Sign in
          </Link>
          <NeonButton
            asChild
            variant="solid"
            size="sm"
            className="hidden items-center rounded-full sm:inline-flex"
          >
            <Link href="/contact">Get started</Link>
          </NeonButton>
        </div>
      </motion.div>
    </header>
  )
}
