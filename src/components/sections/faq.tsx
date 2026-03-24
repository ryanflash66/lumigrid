'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { useIsMobile } from '@/hooks/use-mobile'

const faqs = [
  {
    question: 'How quickly can you launch a marketing site?',
    answer:
      'Launchpad projects typically take 4–6 weeks. We start with a discovery sprint, finalize the site structure, and then build in weekly releases so you can preview progress in staging.'
  },
  {
    question: 'Do you hand off to our internal team?',
    answer:
      'Yes. We document every component, share the design system, and host a recorded walkthrough so your team can continue building without us.'
  },
  {
    question: 'What tech stack do you specialize in?',
    answer:
      'Modern web platforms (Next.js), design systems (Tailwind), and integrations like form handling and content management systems.'
  },
  {
    question: 'Can you work with our analytics and growth stack?',
    answer:
      "Absolutely. We typically wire GA4, PostHog, or Mixpanel, plus any experimentation platforms you rely on. Bring your tools and we\u2019ll integrate them during QA."
  }
]

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 30 }

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(faqs[0].question)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // On mobile: show only first 2 FAQs to reduce scroll depth
  const displayedFaqs = isMobile ? faqs.slice(0, 2) : faqs

  if (isMobile) {
    return (
      <section id="faq" className="bg-background px-6 py-8">
        <h2 className="text-lg font-semibold text-foreground">Quick answers</h2>
        <div className="mt-4 divide-y divide-border/60">
          {displayedFaqs.map((faq) => {
            const isOpen = open === faq.question
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="w-full py-4 text-left touch-manipulation"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : faq.question)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{faq.question}</p>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isOpen && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section id="faq" className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <ScrollReveal variant="clip-reveal">
          <h2 className="text-4xl font-semibold">Questions and Answers</h2>
        </ScrollReveal>
      </div>
      <StaggerContainer stagger={0.1} className="mx-auto mt-8 max-w-3xl divide-y divide-border/60 md:mt-12">
        {faqs.map((faq) => {
          const isOpen = open === faq.question
          return (
            <StaggerItem key={faq.question} variant="fade-up">
              <motion.div layout={!prefersReducedMotion} className="relative">
                <motion.div
                  className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary"
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                />

                <button
                  type="button"
                  className="w-full py-5 pl-4 text-left touch-manipulation"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : faq.question)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium">{faq.question}</p>
                    <motion.div
                      initial={false}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </section>
  )
}
