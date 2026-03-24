'use client'

import { motion, useInView } from 'framer-motion'
import { Activity, Zap, Layers, Users } from 'lucide-react'
import { useRef } from 'react'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { ScrollScene } from '@/components/ui/scroll-storytelling'
import { useIsMobile } from '@/hooks/use-mobile'

const metrics = [
  { id: 1, label: 'Guaranteed Uptime', value: '99.9%', numericPercent: 0.999, icon: Activity, delay: 0.1 },
  { id: 2, label: 'Avg. Response Time', value: '120ms', numericPercent: 0.88, icon: Zap, delay: 0.2 },
  { id: 3, label: 'Seamless Integrations', value: '45+', numericPercent: 0.65, icon: Layers, delay: 0.3 },
  { id: 4, label: 'Daily Active Users', value: '10k+', numericPercent: 0.78, icon: Users, delay: 0.4 },
]

const RING_SIZE = 72
const STROKE_WIDTH = 3.5
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2
const CENTER = RING_SIZE / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ProgressRing({ percent, delay, inView }: { percent: number; delay: number; inView: boolean }) {
  const offset = CIRCUMFERENCE * (1 - percent)

  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      className="absolute inset-0 m-auto"
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
    >
      {/* Track */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        className="text-border opacity-30"
      />
      {/* Progress */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        className="text-primary opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          rotate: -90,
          transformOrigin: 'center',
          strokeDasharray: CIRCUMFERENCE,
        }}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={{ strokeDashoffset: inView ? offset : CIRCUMFERENCE }}
        transition={{ delay: delay + 0.3, duration: 1.4, ease: 'easeOut' }}
      />
    </svg>
  )
}

export function QualitySection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const inView = useInView(gridRef, { once: true, margin: '-50px' })

  return (
    <section id="quality" className="relative overflow-hidden bg-background px-6 py-16 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[80%] rounded-full bg-linear-to-r from-foreground/5 via-blue-500/20 to-foreground/5 blur-[140px]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <h2 className="max-w-5xl text-4xl font-semibold text-foreground md:text-6xl">
          Quality you can trust.
          <br />
          And build on.
        </h2>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Every layout is designed with scalability in mind, so your team can keep shipping new pages without starting
          from scratch.
        </p>

        {/* Metrics Dashboard Mockup */}
        <ScrollScene scaleFrom={0.97} speed={15} fadeIn={false}>
        <div className="relative mt-16 flex min-h-[320px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-[28px] border border-border/70 bg-muted/20 p-8 shadow-sm md:p-12">
          <div className="absolute inset-0 bg-linear-to-br from-foreground/5 via-transparent to-foreground/10" />

          {/* Faint CSS grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div ref={gridRef} className="relative z-10 grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {metrics.map((metric) => {
              const cardContent = (
                <>
                  <div className="relative flex h-[56px] w-[56px] md:h-[72px] md:w-[72px] items-center justify-center">
                    <ProgressRing percent={metric.numericPercent} delay={isMobile ? 0 : metric.delay} inView={isMobile || inView} />
                    <div className="relative z-10 rounded-full bg-primary/10 p-2 md:p-3 text-primary">
                      <metric.icon size={isMobile ? 22 : 28} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col items-center text-center">
                    <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      <AnimatedNumber value={metric.value} />
                    </span>
                    <span className="mt-1 md:mt-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                </>
              )

              if (isMobile) {
                return (
                  <div
                    key={metric.id}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/50 bg-background/60 p-4"
                  >
                    {cardContent}
                  </div>
                )
              }

              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: metric.delay, type: 'spring', stiffness: 300, damping: 24 }}
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-background/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:-translate-y-1.5 hover:border-border/80 hover:bg-background/80 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] dark:hover:shadow-[0_12px_40px_rgb(255,255,255,0.04)]"
                >
                  {cardContent}
                </motion.div>
              )
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background/90 md:h-56" />
        </div>
        </ScrollScene>
      </div>
    </section>
  )
}
