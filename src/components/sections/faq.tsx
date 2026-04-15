'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { faqs } from '@/data/faq'

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 30 }

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(faqs[0].question)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="faq" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <ScrollReveal variant="clip-reveal">
          <h2 className="text-4xl font-semibold">Questions and Answers</h2>
        </ScrollReveal>
      </div>
      <StaggerContainer stagger={0.1} className="mx-auto mt-12 max-w-3xl divide-y divide-border/60">
        {faqs.map((faq) => {
          const isOpen = open === faq.question
          return (
            <StaggerItem key={faq.question} variant="fade-up">
              <motion.div layout={!prefersReducedMotion} className="relative">
                {/* Left indicator bar */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary"
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                />

                <button
                  type="button"
                  className="w-full py-5 pl-4 text-left"
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
