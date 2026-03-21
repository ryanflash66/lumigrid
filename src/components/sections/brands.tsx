'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'
import { brands } from '@/data/brands'

export function BrandsSection() {
  const { ref, y } = useParallax(0.05)
  const prefersReduced = useReducedMotion()

  return (
    <section id="brands" className="bg-background px-6 py-28 md:py-32">
      <div className="mx-auto max-w-5xl text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.15em] text-foreground/60">Loved by teams everywhere</p>
        <p className="text-sm text-muted-foreground">
          Design leaders and growth teams rely on Lumigrid to ship their most important launches.
        </p>
      </div>
      <motion.div
        ref={ref}
        style={prefersReduced ? undefined : { y }}
        className="relative mt-12 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
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
