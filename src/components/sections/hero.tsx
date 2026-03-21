'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { DotShaderBackground } from '@/components/ui/dot-shader-background'
import { NeonButton } from '@/components/ui/neon-button'

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const headlineReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const ctaScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const mockupSlideUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 },
  },
}

const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const shaderEnabled = !prefersReducedMotion

  const container = prefersReducedMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : staggerContainer

  const pick = (full: Variants): Variants =>
    prefersReducedMotion ? reducedFade : full

  return (
    <section className="relative isolate overflow-hidden px-6 pb-28 pt-24 text-foreground">
      {shaderEnabled ? (
        <DotShaderBackground />
      ) : (
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/15" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-0 h-96 w-96 rounded-full bg-linear-to-br from-primary/15 to-accent/5 blur-[120px] dark:from-primary/25 dark:to-accent/10" />
      <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-96 w-96 rounded-full bg-linear-to-tl from-blue-500/20 to-transparent blur-[140px] dark:from-blue-400/30" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="pointer-events-none relative z-20 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          variants={pick(fadeIn)}
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary shadow-[0_0_15px_rgba(100,100,250,0.15)] backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(100,100,250,0.6)] animate-pulse" />
          <span>New Lumigrid launch kit is live</span>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
          >
            Read more
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Headline with glow */}
        <motion.div variants={pick(headlineReveal)} className="relative mt-10">
          {/* Glow behind headline */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-3/4 rounded-full bg-primary/20 blur-3xl"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: [0.1, 0.2, 0.1],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl lg:tracking-tighter">
            Give your{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-serif italic text-transparent">
              big idea
            </span>{' '}
            the website it deserves
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={pick(fadeIn)}
          className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          A premium landing page system built for fast launches, polished
          experiences, and conversion-focused storytelling.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={pick(ctaScale)}
          className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <NeonButton
            asChild
            variant="solid"
            className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20"
          >
            <Link href="/contact" className="group flex items-center gap-2">
              Book a Call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </NeonButton>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-8 py-3 text-base font-semibold text-foreground shadow-sm backdrop-blur-md transition hover:border-primary/50 hover:bg-primary/10"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          variants={pick(mockupSlideUp)}
          className="relative mt-14 w-full max-w-5xl group"
        >
          <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-linear-to-r from-primary/30 to-accent/30 opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-70" />
          <div className="relative overflow-hidden rounded-[20px] border border-border/50 bg-background/40 p-3 shadow-2xl shadow-primary/20 backdrop-blur-2xl ring-1 ring-border/50">
            <div className="overflow-hidden rounded-[12px] border border-border/50 bg-background shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-3 text-xs font-medium text-foreground/60 backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                <span className="ml-2">lumigrid.co</span>
              </div>
              <Image
                src="/assets/images/hero/hero-image.jpg"
                alt="Lumigrid hero preview"
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-background" />
        </motion.div>
      </motion.div>
    </section>
  )
}
