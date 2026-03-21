"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function AmbientBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 border-0 bg-transparent">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px] z-10" />
      
      {/* Orb 1: Primary (Top Right) */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/40 blur-[120px] mix-blend-screen dark:mix-blend-color-dodge opacity-60"
      />
      
      {/* Orb 2: Accent (Bottom Left) */}
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-accent/30 blur-[150px] mix-blend-screen dark:mix-blend-color-dodge opacity-50"
      />

      {/* Orb 3: Highlight (Center Left/Top) */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.5, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[100px] mix-blend-screen dark:mix-blend-color-dodge opacity-40"
      />
    </div>
  )
}
