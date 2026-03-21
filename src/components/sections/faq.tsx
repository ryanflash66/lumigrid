'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      'Absolutely. We typically wire GA4, PostHog, or Mixpanel, plus any experimentation platforms you rely on. Bring your tools and we’ll integrate them during QA.'
  }
]

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(faqs[0].question)

  return (
    <section id="faq" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-4xl font-semibold">Questions and Answers</h2>
      </div>
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-border/60">
        {faqs.map((faq) => {
          const isOpen = open === faq.question
          return (
            <button
              key={faq.question}
              type="button"
              className="w-full py-5 text-left transition"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : faq.question)}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-base font-medium">{faq.question}</p>
                <ChevronDown className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} />
              </div>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-out',
                  isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <p className="overflow-hidden text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
