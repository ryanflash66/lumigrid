'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { CharReveal } from '@/components/ui/text-reveal'
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useIsMobile } from '@/hooks/use-mobile'

const springTransition = { type: 'spring' as const, stiffness: 80, damping: 25 }

const glowVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: springTransition },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { ...springTransition, delay: 0.15 } },
}

export function ContactStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()
  const skipAnimations = !!prefersReduced || isMobile

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const gradientX = useTransform(scrollYProgress, [0, 1], ['40%', '60%'])
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const gradientBg = useTransform(
    [gradientX, gradientY],
    ([x, y]) =>
      `radial-gradient(ellipse 60% 40% at ${x} ${y}, hsl(var(--primary) / 0.06), transparent)`,
  )

  if (isMobile) {
    return (
      <section
        id="contact"
        ref={sectionRef}
        className="bg-primary/5 px-6 py-10"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to launch?
          </h2>
          <p className="text-sm text-muted-foreground">
            Get a free strategy call.
          </p>
          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold touch-manipulation"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Start Your Project
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <a
            href="tel:+16285550148"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 bg-primary/10 px-6 py-3.5 text-base font-semibold text-foreground touch-manipulation"
          >
            <Phone className="h-5 w-5 text-primary" />
            Or Call Us Now
          </a>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-6 py-12 md:py-24"
    >
      {!skipAnimations && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: gradientBg }}
        />
      )}

      {!skipAnimations && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-full bg-blue-500/20 blur-[140px]"
          variants={glowVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
      )}

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">
          <CharReveal>Start building</CharReveal>
        </h2>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Launch your next site with a system that keeps the experience crisp,
            fast, and ready to scale.
          </p>
        </ScrollReveal>

        {skipAnimations ? (
          <div className="h-px w-full max-w-md bg-primary/30" />
        ) : (
          <motion.div
            className="h-px w-full max-w-md bg-primary/30"
            style={{ transformOrigin: 'center' }}
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
        )}

        <ScrollReveal variant="fade-scale" delay={0.2}>
          <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-center md:gap-4">
            <MagneticWrapper>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg transition hover:-translate-y-px hover:shadow-xl"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40"
              >
                View Pricing
              </Link>
            </MagneticWrapper>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
