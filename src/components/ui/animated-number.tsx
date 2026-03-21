'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedNumberProps {
  value: string
  /** Use spring physics instead of tween-based easing */
  spring?: boolean
  /** Custom format callback for the displayed number */
  format?: (value: number) => string
}

export function AnimatedNumber({ value, spring = false, format }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const match = value.match(/^([\D]*)?([\d,.]+)([\D]*)?$/)
    if (!match) return

    const prefix = match[1] || ''
    const numStr = match[2]
    const suffix = match[3] || ''

    const isCommaSeparated = numStr.includes(',')
    const num = parseFloat(numStr.replace(/,/g, ''))
    if (isNaN(num)) return

    const hasDecimals = numStr.includes('.')
    const decimals = hasDecimals ? numStr.split('.')[1].length : 0

    const animationOptions = spring
      ? { type: 'spring' as const, stiffness: 100, damping: 30 }
      : { duration: 2, ease: "easeOut" as const }

    const controls = animate(0, num, {
      ...animationOptions,
      onUpdate(current) {
        if (ref.current) {
          if (format) {
            ref.current.textContent = format(current)
          } else {
            let currentStr = current.toFixed(decimals)
            if (isCommaSeparated) {
               currentStr = parseFloat(currentStr).toLocaleString('en-US', {
                 minimumFractionDigits: decimals,
                 maximumFractionDigits: decimals
               })
            }
            ref.current.textContent = `${prefix}${currentStr}${suffix}`
          }
        }
      }
    })

    return () => controls.stop()
  }, [value, isInView, spring, format])

  return <span ref={ref}>{value}</span>
}
