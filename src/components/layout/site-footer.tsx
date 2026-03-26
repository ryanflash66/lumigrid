'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CursorToggle } from '@/components/ui/cursor-toggle'

const footerLinks = [
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const wordRevealItem: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const headlineWords = ["Let's", 'build', 'something', '|', 'luminous']

export function SiteFooter() {
  const prefersReduced = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Animated gradient border sweep at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] animate-[gradient-sweep_4s_linear_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--primary), var(--accent), var(--primary), transparent)',
          backgroundSize: '200% 100%',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-30"
        style={{
          background:
            'linear-gradient(to bottom, var(--primary), transparent)',
          filter: 'blur(12px)',
        }}
      />

      {/* Pulsing dot grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 animate-[dot-pulse_6s_ease-in-out_infinite]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Year watermark */}
      <div
        className="pointer-events-none absolute bottom-4 right-6 select-none font-mono text-[10rem] font-bold leading-none opacity-[0.02] md:text-[14rem]"
        aria-hidden
      >
        2026
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-36"
      >
        {/* Large typographic CTA with word reveal */}
        {prefersReduced ? (
          <motion.h2
            variants={childVariants}
            className="mb-20 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text font-serif leading-[1.1] text-transparent"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            Let&rsquo;s build something
            <br />
            luminous
          </motion.h2>
        ) : (
          <motion.h2
            variants={wordRevealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-20 flex flex-wrap gap-x-[0.3em] bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text font-serif leading-[1.1] text-transparent"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            {headlineWords.map((word, i) =>
              word === '|' ? (
                <span key={i} className="w-full h-0" />
              ) : (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span className="inline-block" variants={wordRevealItem}>
                    {word === "Let's" ? 'Let\u2019s' : word}
                  </motion.span>
                </span>
              )
            )}
          </motion.h2>
        )}

        {/* Main footer content */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <motion.div variants={childVariants} className="space-y-3">
            <p className="text-lg font-semibold">Lumigrid</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              AI automation agency that builds custom automations to save your
              business time and money.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Lumigrid. All rights reserved.
            </p>
          </motion.div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2">
            {footerLinks.map((column) => (
              <motion.div
                key={column.title}
                variants={childVariants}
                className="space-y-3"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {column.title}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'relative inline-block pb-0.5 transition-colors duration-300 hover:text-primary',
                          'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
                          'after:origin-left after:scale-x-0 after:bg-primary',
                          'after:transition-transform after:duration-300 after:ease-out',
                          'hover:after:scale-x-100'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back-to-top & cursor toggle */}
        <motion.div variants={childVariants} className="mt-16 flex items-center justify-center gap-3">
          <CursorToggle />
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
              'group flex h-12 w-12 items-center justify-center rounded-full',
              'border border-border/60 bg-background/80 backdrop-blur-sm',
              'text-muted-foreground transition-all duration-300',
              'hover:scale-110 hover:border-primary/40 hover:text-primary',
              'hover:shadow-[0_0_20px_oklch(0.55_0.25_250/0.25)]'
            )}
          >
            <ArrowUp className="h-4 w-4 animate-pulse" />
          </button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
        }
      `}</style>
    </footer>
  )
}
