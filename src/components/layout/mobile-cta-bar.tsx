'use client'

import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'

export function MobileCTABar() {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex gap-2 px-4 md:hidden">
      <a
        href="tel:+16285550148"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/90 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur-md"
      >
        <Phone className="h-4 w-4 text-primary" />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg"
      >
        <MessageSquare className="h-4 w-4" />
        Get a Quote
      </Link>
    </div>
  )
}
