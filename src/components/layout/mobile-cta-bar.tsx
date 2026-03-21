'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileCTABar() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        // Show when scrolling up (re-engaging) or near top
        if (currentY < 100 || currentY < lastScrollY.current - 5) {
          setVisible(true)
        }
        // Hide when scrolling down (reading content)
        else if (currentY > lastScrollY.current + 5) {
          setVisible(false)
        }
        lastScrollY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-24 left-0 right-0 z-40 flex gap-2 px-4 md:hidden transition-transform duration-200',
        visible ? 'translate-y-0' : 'translate-y-[calc(100%+2rem)]'
      )}
    >
      <a
        href="tel:+16285550148"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/90 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur-md min-h-[44px]"
      >
        <Phone className="h-4 w-4 text-primary" />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg min-h-[44px]"
      >
        <MessageSquare className="h-4 w-4" />
        Get a Quote
      </Link>
    </div>
  )
}
