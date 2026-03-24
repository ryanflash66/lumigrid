"use client"

import { useEffect, useState } from "react"

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
      <div
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/40 blur-[120px] mix-blend-screen dark:mix-blend-color-dodge opacity-60 animate-[orb1_20s_ease-in-out_infinite]"
      />

      {/* Orb 2: Accent (Bottom Left) */}
      <div
        className="absolute -bottom-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-accent/30 blur-[150px] mix-blend-screen dark:mix-blend-color-dodge opacity-50 animate-[orb2_25s_ease-in-out_infinite]"
      />

      {/* Orb 3: Highlight (Center Left/Top) */}
      <div
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[100px] mix-blend-screen dark:mix-blend-color-dodge opacity-40 animate-[orb3_30s_ease-in-out_infinite]"
      />

      <style jsx>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(100px, 50px) scale(1.2); }
          50% { transform: translate(-50px, -100px) scale(0.9); }
          75% { transform: translate(50px, -50px) scale(1.1); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-80px, -100px) scale(1.3); }
          50% { transform: translate(60px, 50px) scale(0.8); }
          75% { transform: translate(-40px, 80px) scale(1.1); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.5); }
          50% { transform: translate(-50px, 50px) scale(0.8); }
          75% { transform: translate(30px, 30px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}
