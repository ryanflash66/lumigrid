'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'
import { useIsMobile } from '@/hooks/use-mobile'
import { brands } from '@/data/brands'

export function BrandsSection() {
  const { ref, y } = useParallax(0.05)
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()

  return (
    <section id="brands" className={isMobile ? "bg-background px-6 py-6" : "bg-background px-6 py-10 md:py-28 lg:py-32"}>
      {!isMobile && (
        <div className="mx-auto max-w-5xl text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/60">Loved by teams everywhere</p>
          <p className="text-sm text-muted-foreground">
            Design leaders and growth teams rely on Lumigrid to ship their most important launches.
          </p>
        </div>
      )}
      {isMobile && (
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Trusted by 120+ teams</p>
      )}
      <motion.div
        ref={isMobile ? undefined : ref}
        style={prefersReduced || isMobile ? undefined : { y }}
        className={`relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${isMobile ? 'mt-0' : 'mt-12'}`}
      >
        <div className="flex w-max animate-marquee items-center gap-12 py-4 hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, idx) => (
            <div key={`${brand.name}-${idx}`} className="flex w-[140px] flex-shrink-0 items-center justify-center">
              <Image
                src={brand.light}
                alt={brand.name}
                width={140}
                height={40}
                className="block w-full max-w-[120px] object-contain opacity-70 transition hover:opacity-100 dark:hidden"
              />
              <Image
                src={brand.dark}
                alt={`${brand.name} dark`}
                width={140}
                height={40}
                className="hidden w-full max-w-[120px] object-contain opacity-80 transition hover:opacity-100 dark:block"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
