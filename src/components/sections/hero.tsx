'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const DotShaderBackground = dynamic(
  () => import('@/components/ui/dot-shader-background').then((m) => m.DotShaderBackground),
  { ssr: false }
)
import { NeonButton } from '@/components/ui/neon-button'
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper'
import { WordReveal } from '@/components/ui/text-reveal'
import { useParallax } from '@/hooks/use-parallax'

/* ------------------------------------------------------------------ */
/*  Cinematic entrance variants                                       */
/* ------------------------------------------------------------------ */

// Badge: fade-in with blur-clear, delay 0.1s
const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
  },
}

// Badge glow pulse: settles after 3s
const badgeGlowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.4, 0.7, 0.3, 0.15],
    transition: { duration: 3, delay: 0.3, ease: 'easeOut' },
  },
}

// Headline container: delay 0.3s (handled by WordReveal delay prop)
const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
}

// Subtext: spring physics, delay 0.7s
const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      delay: 0.7,
    },
  },
}

// CTA buttons: snappy spring with scale overshoot, delay 0.9s
const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 22,
      delay: 0.9,
    },
  },
}

// Mockup: heavy spring for weighty rise + clipPath reveal, delay 1.1s
const mockupVariants: Variants = {
  hidden: { opacity: 0, y: 140, clipPath: 'inset(15% 0% 0% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 16,
      mass: 1.2,
      delay: 1.1,
    },
  },
}

// Reduced motion fallback: opacity-only, no transforms
const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

// Mobile-optimized variants: minimal delays so CTA is visible in ~200ms
const mobileBadgeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}
const mobileHeadlineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, delay: 0.05 } },
}
const mobileSubtextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
}
const mobileCtaVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.15 } },
}
const mobileMockupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const shaderEnabled = !prefersReducedMotion && !isMobile

  // Skip parallax on mobile — saves 3 scroll listeners + transform calculations
  const { ref: mockupRef, y: mockupY } = useParallax(isMobile ? 0 : 0.15)
  const { ref: subtextRef, y: subtextY } = useParallax(isMobile ? 0 : 0.05)
  const { ref: blobRef, y: blobY } = useParallax(isMobile ? 0 : -0.1)

  const pick = (full: Variants, mobileVariant?: Variants): Variants => {
    if (prefersReducedMotion) return reducedFade
    if (isMobile && mobileVariant) return mobileVariant
    return full
  }

  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-20 text-foreground md:pb-40 md:pt-32">
      {shaderEnabled ? (
        <DotShaderBackground />
      ) : (
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/15" />

      {/* Light ray decorative strips */}
      {shaderEnabled && (
        <>
          <div
            className="pointer-events-none absolute -left-20 top-0 z-10 h-full w-[1px] opacity-[0.07] dark:opacity-[0.12]"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--primary), var(--accent), transparent)',
            }}
          />
          <div
            className="pointer-events-none absolute left-1/4 top-0 z-10 h-full w-[1px] opacity-[0.04] dark:opacity-[0.08]"
            style={{
              background: 'linear-gradient(to bottom, transparent 20%, var(--primary), transparent 80%)',
            }}
          />
          <div
            className="pointer-events-none absolute right-1/3 top-0 z-10 h-full w-[1px] opacity-[0.05] dark:opacity-[0.10]"
            style={{
              background: 'linear-gradient(to bottom, transparent 30%, var(--accent), transparent 70%)',
            }}
          />
        </>
      )}

      <motion.div
        ref={blobRef}
        style={prefersReducedMotion || isMobile ? undefined : { y: blobY }}
        className="contents"
      >
        <div className="pointer-events-none absolute -left-40 top-1/3 z-0 h-96 w-96 rounded-full bg-linear-to-br from-primary/15 to-accent/5 blur-[120px] dark:from-primary/25 dark:to-accent/10" />
        <div className="pointer-events-none absolute -right-40 bottom-0 z-0 h-96 w-96 rounded-full bg-linear-to-tl from-blue-500/20 to-transparent blur-[140px] dark:from-blue-400/30" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="pointer-events-none relative z-20 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        {/* Badge — hidden on mobile for cleaner conversion funnel */}
        {!isMobile && (
          <motion.div className="relative">
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden
                variants={badgeGlowVariants}
                initial="hidden"
                animate="visible"
                className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-primary/30 blur-xl"
              />
            )}
            <motion.div
              variants={pick(badgeVariants)}
              initial="hidden"
              animate="visible"
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
          </motion.div>
        )}

        {/* Headline */}
        <motion.div
          variants={pick(headlineVariants, mobileHeadlineVariants)}
          initial="hidden"
          animate="visible"
          className={cn("relative", isMobile ? "mt-0" : "mt-12")}
        >
          {/* Glow behind headline — hidden on mobile to save GPU compositing */}
          {!isMobile && !prefersReducedMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-3/4 rounded-full bg-primary/20 blur-3xl"
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <h1
            className="max-w-5xl text-balance font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 1.05 }}
          >
            {prefersReducedMotion ? (
              <>
                Launch your{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-serif italic text-transparent">
                  vision
                </span>
                {' '}with a site that converts
              </>
            ) : (
              <WordReveal
                className="justify-center"
                highlightWords={['vision']}
                delay={0.3}
              >
                Launch your vision with a site that converts
              </WordReveal>
            )}
          </h1>
        </motion.div>

        {/* Subtext with spring physics */}
        <motion.div
          ref={subtextRef}
          variants={pick(subtextVariants, mobileSubtextVariants)}
          initial="hidden"
          animate="visible"
          style={prefersReducedMotion || isMobile ? undefined : { y: subtextY }}
        >
          <p className={cn(
            "text-pretty text-muted-foreground",
            isMobile ? "mt-4 text-sm max-w-xs" : "mt-8 max-w-2xl text-base md:text-lg lg:text-xl"
          )}>
            {isMobile
              ? "Premium websites that convert visitors into customers."
              : "A premium landing page system built for fast launches, polished experiences, and conversion-focused storytelling."}
          </p>
        </motion.div>

        {/* CTA buttons with snappy spring overshoot */}
        <motion.div
          variants={pick(ctaVariants, mobileCtaVariants)}
          initial="hidden"
          animate="visible"
          className={cn(
            "pointer-events-auto mt-6 flex items-center justify-center gap-4 md:mt-10",
            isMobile ? "flex-col w-full px-2" : "flex-wrap"
          )}
        >
          {isMobile ? (
            <>
              <NeonButton
                asChild
                variant="solid"
                className="w-full rounded-full px-8 py-5 text-lg font-bold shadow-2xl shadow-primary/30"
              >
                <Link href="/contact" className="group flex items-center justify-center gap-2">
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </NeonButton>
              <a
                href="tel:+16285550148"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-8 py-4 text-base font-semibold text-primary"
              >
                Or Call Us Now →
              </a>
            </>
          ) : (
            <>
              <MagneticWrapper strength={0.2}>
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
              </MagneticWrapper>
              <MagneticWrapper strength={0.15}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-8 py-3 text-base font-semibold text-foreground shadow-sm backdrop-blur-md transition hover:border-primary/50 hover:bg-primary/10"
                >
                  View Pricing
                </Link>
              </MagneticWrapper>
            </>
          )}
        </motion.div>

        {/* Social proof line — mobile only */}
        {isMobile && (
          <div className="pointer-events-auto mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted" />
              ))}
            </span>
            <span>120+ projects shipped · 94% retention</span>
          </div>
        )}

        {/* Browser mockup — hidden on mobile to keep CTAs above fold */}
        <motion.div
          ref={mockupRef}
          variants={pick(mockupVariants, mobileMockupVariants)}
          initial="hidden"
          animate="visible"
          className={cn("relative mt-16 w-full max-w-5xl group", isMobile && "hidden")}
          style={prefersReducedMotion || isMobile ? undefined : { y: mockupY }}
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
