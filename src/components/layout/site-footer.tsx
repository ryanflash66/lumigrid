'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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

export function SiteFooter() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border/60 bg-background px-6 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="space-y-3">
          <p className="text-lg font-semibold">Lumigrid</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Web development agency crafting shader-powered hero moments, design systems, and Core Web Vitals-friendly
            sites.
          </p>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lumigrid. All rights reserved.</p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2">
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {column.title}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
