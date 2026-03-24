"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type SectionDividerVariant = "glow-line" | "wave" | "dot-cluster"

interface SectionDividerProps {
  variant: SectionDividerVariant
  className?: string
}

function GlowLine() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div
        className="h-px w-full"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--primary) 0%, transparent 70%)",
          boxShadow: "0 0 8px 1px var(--primary)",
          opacity: 0.6,
        }}
      />
    </div>
  )
}

function Wave() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[40px] w-full sm:h-[60px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30 L1200,60 L0,60 Z"
          fill="url(#wave-gradient)"
        />
        <path
          d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30"
          stroke="var(--primary)"
          strokeWidth="0.5"
          strokeOpacity="0.1"
          fill="none"
        />
      </svg>
    </div>
  )
}

function DotCluster() {
  const dots = [
    { size: 3, opacity: 0.25, color: "var(--primary)" },
    { size: 5, opacity: 0.35, color: "var(--accent)" },
    { size: 2, opacity: 0.2, color: "var(--primary)" },
    { size: 6, opacity: 0.3, color: "var(--accent)" },
    { size: 4, opacity: 0.25, color: "var(--primary)" },
    { size: 3, opacity: 0.35, color: "var(--accent)" },
    { size: 2, opacity: 0.2, color: "var(--primary)" },
  ]

  return (
    <div className="flex items-center justify-center gap-3">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function SectionDivider({ variant, className }: SectionDividerProps) {
  const isMobile = useIsMobile()

  // On mobile: render static divider without motion wrapper
  if (isMobile) {
    return (
      <div className={cn("py-1 md:py-4", className)}>
        {variant === "glow-line" && <GlowLine />}
        {variant === "wave" && <Wave />}
        {variant === "dot-cluster" && <DotCluster />}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn("py-1 md:py-4", className)}
    >
      {variant === "glow-line" && <GlowLine />}
      {variant === "wave" && <Wave />}
      {variant === "dot-cluster" && <DotCluster />}
    </motion.div>
  )
}
