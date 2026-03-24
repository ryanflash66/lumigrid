'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DotShaderBackground } from '@/components/ui/dot-shader-background'

// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

// --- EXPORTED Building Blocks --- //

/**
 * We export the Props interface so you can easily type the data for your plans.
 */
export interface PricingCardProps {
  planName: string
  description: string
  price: string
  priceSuffix?: string // Optional suffix like "One-Time Project" instead of "/mo"
  features: string[]
  buttonText: string
  buttonHref?: string // Optional href for Next.js Link
  isPopular?: boolean
  buttonVariant?: 'primary' | 'secondary'
}

/**
 * We export the PricingCard component itself in case you want to use it elsewhere.
 */
export const PricingCard = ({
  planName,
  description,
  price,
  priceSuffix,
  features,
  buttonText,
  buttonHref,
  isPopular = false
}: PricingCardProps) => {
  const cardClasses = `
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-lg flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300 hover:shadow-xl
    from-card/80 to-card/60 border border-border
    dark:from-card/90 dark:to-card/70 dark:border-border dark:backdrop-brightness-[0.95]
    ${isPopular ? 'scale-105 relative ring-2 ring-primary/30 dark:ring-primary/40 shadow-xl shadow-primary/10' : ''}
  `

  const buttonContent = buttonHref ? (
    <Link
      href={buttonHref}
      className="mt-auto w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
    >
      {buttonText}
    </Link>
  ) : (
    <button className="mt-auto w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]">
      {buttonText}
    </button>
  )

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-primary text-primary-foreground shadow-md">
          Most Popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="font-serif text-4xl tracking-tight text-foreground">
          {planName}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2">
        <span className="font-serif text-5xl text-foreground">${price}</span>
        {priceSuffix && (
          <span className="text-sm text-muted-foreground">{priceSuffix}</span>
        )}
      </div>
      <div className="w-full mb-5 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <ul className="flex flex-col gap-2.5 text-sm text-foreground/85 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2.5">
            <CheckIcon className="text-primary w-4 h-4 flex-shrink-0" /> {feature}
          </li>
        ))}
      </ul>
      {buttonContent}
    </div>
  )
}

// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  /** The main title. Can be a string or a ReactNode for more complex content. */
  title: React.ReactNode
  /** The subtitle text appearing below the main title. */
  subtitle: React.ReactNode
  /** An array of plan objects that conform to PricingCardProps. */
  plans: PricingCardProps[]
  /** Whether to show the animated WebGL background. Defaults to true. */
  showAnimatedBackground?: boolean
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true
}: ModernPricingPageProps) => {
  const [shaderEnabled, setShaderEnabled] = useState(true)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setShaderEnabled(!media.matches && !isMobile)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const shouldRenderShader = showAnimatedBackground && shaderEnabled

  return (
    <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6 md:py-16 lg:px-8">
      {shouldRenderShader ? (
        <DotShaderBackground />
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      )}

      {/* Warm gradient orbs — hidden on mobile */}
      <div className="pointer-events-none absolute -left-32 top-1/3 z-0 hidden h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-3xl dark:from-primary/25 dark:to-accent/15 md:block" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 z-0 hidden h-80 w-80 rounded-full bg-gradient-to-tl from-accent/10 to-secondary/10 blur-3xl dark:from-accent/20 dark:to-secondary/15 md:block" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent dark:from-primary/12" />

      <main className="pointer-events-none relative z-20 flex w-full flex-1 flex-col items-center justify-center">
        <div className="mx-auto mb-14 w-full max-w-5xl px-2 text-center">
          <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="pointer-events-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row md:gap-6">
          {plans.map(plan => (
            <PricingCard key={plan.planName} {...plan} />
          ))}
        </div>
      </main>
    </section>
  )
}

