'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// WordReveal — viewport-triggered staggered word entrance
// ---------------------------------------------------------------------------

interface HighlightedWord {
  text: string
  highlight?: boolean
}

interface WordRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
  /** Words or phrases to render with highlight styling (font-serif italic gradient) */
  highlightWords?: string[]
}

const wordContainerVars: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
}

const wordVars: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const reducedWordVars: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export function WordReveal({
  children,
  className,
  delay = 0,
  once = true,
  highlightWords = [],
}: WordRevealProps) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-40px' })

  const [forcedVisible, setForcedVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || isInView || forcedVisible) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40) {
      setForcedVisible(true)
    }
  }, [isInView, forcedVisible])

  const visible = isInView || forcedVisible

  // Build word list with highlight flags
  const words = children.split(' ')
  const highlightSet = new Set(highlightWords.flatMap(phrase => phrase.split(' ')))

  // For multi-word highlight phrases, track which words are part of one
  const wordData: HighlightedWord[] = words.map(word => ({
    text: word,
    highlight: highlightSet.has(word),
  }))

  return (
    <motion.span
      ref={ref}
      className={cn('inline-flex flex-wrap', className)}
      variants={wordContainerVars}
      custom={delay}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
    >
      {wordData.map((word, i) => (
        <span key={`${word.text}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className={cn(
              'inline-block',
              word.highlight &&
                'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-serif italic'
            )}
            variants={prefersReduced ? reducedWordVars : wordVars}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// ---------------------------------------------------------------------------
// CharReveal — scroll-progress-linked character reveal
// ---------------------------------------------------------------------------

interface CharRevealProps {
  children: string
  className?: string
  once?: boolean
}

function CharSpan({
  char,
  index,
  total,
  progress,
  prefersReduced,
}: {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  prefersReduced: boolean | null
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.15, 1])

  if (prefersReduced) {
    return <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
  }

  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

export function CharReveal({ children, className, once = true }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })
  const chars = children.split('')

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {chars.map((char, i) => (
        <CharSpan
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
          prefersReduced={prefersReduced}
        />
      ))}
    </span>
  )
}
