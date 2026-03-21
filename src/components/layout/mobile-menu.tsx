'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  url: string
}

interface MobileMenuProps {
  items: NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const toggle = useCallback(() => setOpen((v) => !v), [])

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={toggle}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-40 flex h-dvh flex-col px-6 pt-24 pb-10 transition-transform duration-200 ease-out',
          open ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
            return (
              <li key={item.name}>
                <Link
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-lg font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/signin"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-full border border-border/60 bg-background/90 py-3 text-sm font-semibold text-foreground"
          >
            Sign in
          </Link>
          <div className="flex gap-2">
            <a
              href="tel:+16285550148"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/90 py-3 text-sm font-semibold text-foreground min-h-[44px]"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call Now
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground min-h-[44px]"
            >
              <MessageSquare className="h-4 w-4" />
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
