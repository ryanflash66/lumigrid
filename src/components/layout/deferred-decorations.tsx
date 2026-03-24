'use client'

import dynamic from 'next/dynamic'

const AmbientBackground = dynamic(
  () => import('@/components/ui/ambient-background').then((m) => m.AmbientBackground),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/ui/custom-cursor').then((m) => m.CustomCursor),
  { ssr: false }
)
const GrainOverlay = dynamic(
  () => import('@/components/ui/grain-overlay').then((m) => m.GrainOverlay),
  { ssr: false }
)

export function DeferredDecorations() {
  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <GrainOverlay />
    </>
  )
}
