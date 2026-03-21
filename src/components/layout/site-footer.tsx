'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const footerLinks = [
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Performance notes', href: '/blog/scaling-mission-driven-products' }
    ]
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Top border gradient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)'
        }}
      />

      {/* Dot grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.06
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative mx-auto max-w-6xl px-6 pt-20 pb-12"
      >
        {/* Large typographic CTA */}
        <motion.h2
          variants={childVariants}
          className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-16 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent"
        >
          Let&rsquo;s build something
          <br />
          luminous
        </motion.h2>

        {/* Main footer content */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <motion.div variants={childVariants} className="space-y-3">
            <p className="text-lg font-semibold">Lumigrid</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Web development agency crafting shader-powered hero moments, design systems, and Core Web Vitals-friendly
              sites.
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

        {/* Back-to-top button */}
        <motion.div
          variants={childVariants}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
              'group flex h-10 w-10 items-center justify-center rounded-full',
              'border border-border/60 bg-background/80 backdrop-blur-sm',
              'text-muted-foreground transition-colors duration-300',
              'hover:border-primary/40 hover:text-primary'
            )}
          >
            <ArrowUp className="h-4 w-4 animate-pulse" />
          </button>
        </motion.div>
      </motion.div>
    </footer>
  )
}
