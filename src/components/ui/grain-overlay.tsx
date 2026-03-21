'use client'

import { memo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

export const GrainOverlay = memo(function GrainOverlay() {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  // Mobile: skip grain — invisible at 3-4% opacity on small screens, expensive SVG filter
  if (isMobile) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] dark:opacity-[0.04]"
      style={{
        filter: 'url(#grain)',
        mixBlendMode: 'overlay',
        willChange: 'filter',
      }}
    >
      <svg className="absolute h-0 w-0">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          >
            {!prefersReduced && (
              <animate
                attributeName="seed"
                values="0;1;2;3;4;5"
                dur="0.5s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
        </filter>
      </svg>
      <div className="h-full w-full bg-[length:200px_200px] bg-repeat" style={{ filter: 'url(#grain)' }} />
    </div>
  )
})
