'use client'

import { useCallback, useEffect, useState } from 'react'
import Script from 'next/script'
import { Calendar } from 'lucide-react'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

export function CalendlyButton({ url }: { url: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.Calendly) setReady(true)
  }, [])

  const openCalendly = useCallback(() => {
    window.Calendly?.initPopupWidget({ url })
  }, [url])

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <button
        type="button"
        onClick={openCalendly}
        disabled={!ready}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-50"
      >
        <Calendar className="h-4 w-4" />
        Schedule a Call &rarr;
      </button>
    </>
  )
}
