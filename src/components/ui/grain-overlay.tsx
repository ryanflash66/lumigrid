'use client'

import { memo } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export const GrainOverlay = memo(function GrainOverlay() {
  const isMobile = useIsMobile()

  // Mobile: skip grain — invisible at 3-4% opacity on small screens, expensive SVG filter
  if (isMobile) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] dark:opacity-[0.04]"
      style={{
        filter: 'url(#grain)',
        mixBlendMode: 'overlay',
      }}
    >
      <svg className="absolute h-0 w-0">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div className="h-full w-full bg-[length:200px_200px] bg-repeat" style={{ filter: 'url(#grain)' }} />
    </div>
  )
})
