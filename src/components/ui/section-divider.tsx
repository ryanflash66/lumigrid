'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type DividerVariant = 'glow-line' | 'wave' | 'dot-cluster'

interface SectionDividerProps {
  variant: DividerVariant
  className?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

function GlowLine() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div
        className="h-px w-full rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
          boxShadow: '0 0 8px 1px var(--color-primary)',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

function Wave() {
  return (
    <svg
      viewBox="0 0 1200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[50px] w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.05" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M0 25 C150 10, 300 40, 450 25 S750 10, 900 25 S1050 40, 1200 25 L1200 50 L0 50 Z"
        fill="url(#wave-gradient)"
      />
      <path
        d="M0 25 C150 10, 300 40, 450 25 S750 10, 900 25 S1050 40, 1200 25"
        stroke="var(--color-primary)"
        strokeOpacity="0.1"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

const dots = [
  { size: 3, opacity: 0.2 },
  { size: 5, opacity: 0.35 },
  { size: 2, opacity: 0.25 },
  { size: 6, opacity: 0.3 },
  { size: 4, opacity: 0.2 },
  { size: 3, opacity: 0.35 },
  { size: 5, opacity: 0.25 },
]

function DotCluster() {
  return (
    <div className="flex items-center justify-center gap-3">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor:
              i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function SectionDivider({ variant, className }: SectionDividerProps) {
  return (
    <motion.div
      className={cn('py-6', className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {variant === 'glow-line' && <GlowLine />}
      {variant === 'wave' && <Wave />}
      {variant === 'dot-cluster' && <DotCluster />}
    </motion.div>
  )
}
