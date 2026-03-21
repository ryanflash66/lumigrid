import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 isolate overflow-visible',
  {
    variants: {
      variant: {
        default:
          'border border-primary/30 bg-primary/10 text-foreground shadow-lg shadow-primary/20 hover:border-primary/45 hover:bg-primary/15 hover:shadow-xl hover:shadow-primary/30 dark:border-primary/35 dark:bg-primary/15 dark:hover:border-primary/50 dark:hover:shadow-primary/40',
        solid:
          'border border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] dark:shadow-primary/50',
        ghost:
          'border border-transparent bg-transparent text-primary hover:border-primary/25 hover:bg-primary/5 dark:hover:bg-primary/10',
      },
      size: {
        sm: 'h-9 px-5 text-xs',
        default: 'h-11 px-8 text-sm',
        lg: 'h-12 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean
  asChild?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, asChild = false, children, type = 'button', ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    const neonLayers = (
      <>
        {/* Inner glow layer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-primary/40 bg-gradient-to-r from-primary/10 via-accent/15 to-secondary/10 opacity-90 transition-all duration-500 group-hover:border-primary/60 dark:border-primary/45 dark:from-primary/15 dark:via-accent/20 dark:to-secondary/15"
        />
        {/* Outer blur glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-20 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 blur-3xl transition duration-500 group-hover:opacity-60 dark:group-hover:opacity-70"
        />
        {/* Ring highlight */}
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-20 rounded-full ring-1 ring-primary/20 blur-[1px] group-hover:ring-primary/35" />
        {/* Top shine line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-0.5 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-all duration-500 group-hover:opacity-80 dark:via-primary/80"
        />
        {/* Bottom shine line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 bottom-0 h-0.5 w-2/3 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-60 dark:via-accent/70"
        />
        {/* Ambient conic glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,var(--accent)_50%,var(--secondary)_100%)] opacity-0 blur-[32px] transition duration-500 group-hover:opacity-30"
        />
      </>
    )

    const wrapChildren = (content: React.ReactNode) => (
      <>
        {neon && neonLayers}
        <span className="relative z-10 inline-flex items-center gap-2">{content}</span>
      </>
    )

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement> & { className?: string }>
      return React.cloneElement(child, {
        ...props,
        className: cn(classes, child.props.className),
        children: wrapChildren(child.props.children),
      } as Partial<React.HTMLAttributes<HTMLElement>>)
    }

    return (
      <button className={classes} ref={ref} type={type} {...props}>
        {wrapChildren(children)}
      </button>
    )
  }
)

NeonButton.displayName = 'NeonButton'

export { NeonButton, buttonVariants }

