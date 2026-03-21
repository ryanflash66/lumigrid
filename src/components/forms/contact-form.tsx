'use client'

import { useEffect, useId, useState } from 'react'
import { NeonButton } from '@/components/ui/neon-button'
import { cn } from '@/lib/utils'

type FormFields = {
  fullName: string
  email: string
  phone: string
  company: string
  projectType: string
  budgetRange: string
  message: string
  website: string
}

const buildInitialFields = (plan?: string): FormFields => ({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budgetRange: '',
  message: plan ? `We're interested in the ${plan} plan. Please share next steps.` : '',
  website: ''
})

type FieldErrors = Partial<Record<keyof FormFields, string>>
type FieldTouched = Partial<Record<keyof FormFields, boolean>>

// Enhanced email validation - RFC 5322 compliant pattern
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Enhanced phone validation - supports international formats
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}[-\s\.]?[0-9]{1,9}$/

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

const PROJECT_TYPES = [
  { value: '', label: 'Select project type (optional)' },
  { value: 'website', label: 'Website Development' },
  { value: 'redesign', label: 'Website Redesign' },
  { value: 'ecommerce', label: 'E-commerce Platform' },
  { value: 'webapp', label: 'Web Application' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'other', label: 'Other' }
]

const BUDGET_RANGES = [
  { value: '', label: 'Select budget range (optional)' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
  { value: 'custom', label: 'Custom Quote' }
]

type ContactFormProps = {
  compact?: boolean
  prefillPlan?: string
}

export function ContactForm({ compact = false, prefillPlan }: ContactFormProps) {
  const ids = {
    fullName: useId(),
    email: useId(),
    phone: useId(),
    company: useId(),
    projectType: useId(),
    budgetRange: useId(),
    message: useId(),
    website: useId()
  }

  const [fields, setFields] = useState<FormFields>(() => buildInitialFields(prefillPlan))
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<FieldTouched>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')

  const characterCount = fields.message.length
  const maxMessageLength = 500

  useEffect(() => {
    // Only reset form if it's idle and user hasn't started filling it out
    // This prevents wiping user input if prefillPlan changes while they're typing
    if (status !== 'idle') {
      return
    }

    // Check if user has started filling the form by checking if any required field has been modified
    const initialFields = buildInitialFields(prefillPlan)
    const hasUserInput =
      fields.fullName !== initialFields.fullName ||
      fields.email !== initialFields.email ||
      fields.phone !== initialFields.phone ||
      (fields.message !== initialFields.message && fields.message.trim().length > 0)

    // Only reset if no user input detected
    if (!hasUserInput) {
      setFields(buildInitialFields(prefillPlan))
      setErrors({})
      setTouched({})
    }
  }, [prefillPlan, status, fields.fullName, fields.email, fields.phone, fields.message])

  // Real-time validation for individual fields
  const validateField = (key: keyof FormFields, value: string): string | undefined => {
    switch (key) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 100) return 'Name must be less than 100 characters'
        return undefined

      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address'
        return undefined

      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        const cleanedPhone = value.trim().replace(/\s/g, '')
        if (!phoneRegex.test(cleanedPhone)) {
          return 'Please enter a valid phone number (e.g., +1 (415) 555-1234)'
        }
        return undefined

      case 'company':
        // Optional field - only validate if provided
        if (value.trim() && value.trim().length > 100) {
          return 'Company name must be less than 100 characters'
        }
        return undefined

      case 'message':
        if (!value.trim()) return 'Project details are required'
        if (value.trim().length < 10) return 'Please provide more details (minimum 10 characters)'
        if (value.trim().length > maxMessageLength) {
          return `Message must be less than ${maxMessageLength} characters`
        }
        return undefined

      default:
        return undefined
    }
  }

  // Validate all required fields
  const validate = (payload: FormFields): FieldErrors => {
    const nextErrors: FieldErrors = {}
    
    const requiredFields: (keyof FormFields)[] = ['fullName', 'email', 'phone', 'message']
    
    requiredFields.forEach((field) => {
      const error = validateField(field, payload[field])
      if (error) nextErrors[field] = error
    })

    // Validate optional fields if they have values
    if (payload.company.trim()) {
      const error = validateField('company', payload.company)
      if (error) nextErrors.company = error
    }

    return nextErrors
  }

  const handleChange = (key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    
    // Clear error when user starts typing
    if (errors[key]) {
      const error = validateField(key, value)
      setErrors((prev) => ({ ...prev, [key]: error }))
    }
  }

  const handleBlur = (key: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const error = validateField(key, fields[key])
    setErrors((prev) => ({ ...prev, [key]: error }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Honeypot check
    if (fields.website.trim() !== '') {
      // Silent success for bots
      setStatus('success')
      setStatusMessage("Thank you! We'll get back to you shortly.")
      setFields(buildInitialFields(prefillPlan))
      setTouched({})
      setErrors({})
      return
    }

    // Mark all fields as touched
    const allTouched: FieldTouched = {
      fullName: true,
      email: true,
      phone: true,
      message: true
    }
    setTouched(allTouched)

    const validation = validate(fields)
    setErrors(validation)
    
    if (Object.values(validation).some(Boolean)) {
      // Focus first error field
      const firstErrorField = Object.keys(validation)[0] as keyof FormFields
      const errorElement = document.getElementById(ids[firstErrorField])
      errorElement?.focus()
      return
    }

    setStatus('loading')
    setStatusMessage('')

    try {
      if (FORMSPREE_ENDPOINT) {
        const formData = new FormData()
        
        // Map fields to Formspree format
        formData.append('name', fields.fullName)
        formData.append('email', fields.email)
        formData.append('phone', fields.phone)
        
        // Add optional fields only if they have values
        if (fields.company.trim()) {
          formData.append('company', fields.company)
        }
        if (fields.projectType) {
          formData.append('project_type', fields.projectType)
        }
        if (fields.budgetRange) {
          formData.append('budget_range', fields.budgetRange)
        }
        if (prefillPlan) {
          formData.append('selected_plan', prefillPlan)
        }

        formData.append('message', fields.message)

        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        })

        const data = await response.json()

        if (!response.ok) {
          // Handle Formspree-specific errors
          if (data.errors) {
            throw new Error(data.errors.map((e: { message: string }) => e.message).join(', '))
          }
          throw new Error('Form submission failed. Please try again.')
        }
      } else {
        // Simulate network call for local development
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus('success')
      setStatusMessage("Thank you! We'll get back to you within two business days.")
      setFields(buildInitialFields(prefillPlan))
      setTouched({})
      setErrors({})
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setStatusMessage('')
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later or contact us directly.'
      )
    }
  }

  const formClassName = compact ? 'space-y-4' : 'space-y-6'

  return (
    <form onSubmit={handleSubmit} className={formClassName} noValidate>
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={fields.website}
        onChange={(event) => handleChange('website', event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      {/* Full Name - Required */}
      <div className="space-y-2">
        <label htmlFor={ids.fullName} className="text-sm font-medium text-foreground">
          Full name <span className="text-destructive">*</span>
        </label>
        <input
          id={ids.fullName}
          type="text"
          name="name"
          autoComplete="name"
          className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
            'bg-background text-foreground',
            'border-border ring-ring/30',
            'focus:ring-2 focus:ring-ring focus:border-ring',
            touched.fullName && errors.fullName && 'border-destructive ring-destructive/20',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          placeholder="Jordan Michaels"
          value={fields.fullName}
          onChange={(event) => handleChange('fullName', event.target.value)}
          onBlur={() => handleBlur('fullName')}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? `${ids.fullName}-error` : undefined}
          disabled={status === 'loading'}
        />
        {touched.fullName && errors.fullName && (
          <p id={`${ids.fullName}-error`} className="text-sm text-destructive" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email and Phone - Required, Side by Side */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={ids.email} className="text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id={ids.email}
            type="email"
            name="email"
            autoComplete="email"
            className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
              'bg-background text-foreground',
              'border-border ring-ring/30',
              'focus:ring-2 focus:ring-ring focus:border-ring',
              touched.email && errors.email && 'border-destructive ring-destructive/20',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            placeholder="team@lumigrid.com"
            value={fields.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            disabled={status === 'loading'}
          />
          {touched.email && errors.email && (
            <p id={`${ids.email}-error`} className="text-sm text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor={ids.phone} className="text-sm font-medium text-foreground">
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            id={ids.phone}
            type="tel"
            name="phone"
            autoComplete="tel"
            className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
              'bg-background text-foreground',
              'border-border ring-ring/30',
              'focus:ring-2 focus:ring-ring focus:border-ring',
              touched.phone && errors.phone && 'border-destructive ring-destructive/20',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            placeholder="+1 (415) 555-8911"
            value={fields.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
            disabled={status === 'loading'}
          />
          {touched.phone && errors.phone && (
            <p id={`${ids.phone}-error`} className="text-sm text-destructive" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Company - Optional */}
      <div className="space-y-2">
        <label htmlFor={ids.company} className="text-sm font-medium text-foreground">
          Company <span className="text-xs text-muted-foreground">(optional)</span>
        </label>
        <input
          id={ids.company}
          type="text"
          name="company"
          autoComplete="organization"
          className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
            'bg-background text-foreground',
            'border-border ring-ring/30',
            'focus:ring-2 focus:ring-ring focus:border-ring',
            touched.company && errors.company && 'border-destructive ring-destructive/20',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          placeholder="Acme Inc."
          value={fields.company}
          onChange={(event) => handleChange('company', event.target.value)}
          onBlur={() => handleBlur('company')}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? `${ids.company}-error` : undefined}
          disabled={status === 'loading'}
        />
        {touched.company && errors.company && (
          <p id={`${ids.company}-error`} className="text-sm text-destructive" role="alert">
            {errors.company}
          </p>
        )}
      </div>

      {/* Project Type and Budget Range - Optional, Side by Side */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={ids.projectType} className="text-sm font-medium text-foreground">
            Project type <span className="text-xs text-muted-foreground">(optional)</span>
          </label>
          <select
            id={ids.projectType}
            name="project_type"
            className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
              'bg-background text-foreground',
              'border-border ring-ring/30',
              'focus:ring-2 focus:ring-ring focus:border-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'cursor-pointer'
            )}
            value={fields.projectType}
            onChange={(event) => handleChange('projectType', event.target.value)}
            disabled={status === 'loading'}
          >
            {PROJECT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor={ids.budgetRange} className="text-sm font-medium text-foreground">
            Budget range <span className="text-xs text-muted-foreground">(optional)</span>
          </label>
          <select
            id={ids.budgetRange}
            name="budget_range"
            className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all hover:border-border/80',
              'bg-background text-foreground',
              'border-border ring-ring/30',
              'focus:ring-2 focus:ring-ring focus:border-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'cursor-pointer'
            )}
            value={fields.budgetRange}
            onChange={(event) => handleChange('budgetRange', event.target.value)}
            disabled={status === 'loading'}
          >
            {BUDGET_RANGES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message - Required */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={ids.message} className="text-sm font-medium text-foreground">
            Project details <span className="text-destructive">*</span>
          </label>
          <span
            className={cn(
              'text-xs',
              characterCount > maxMessageLength * 0.9
                ? 'text-destructive'
                : 'text-muted-foreground'
            )}
          >
            {characterCount}/{maxMessageLength}
          </span>
        </div>
        <textarea
          id={ids.message}
          name="message"
          rows={compact ? 4 : 6}
          maxLength={maxMessageLength}
          className={cn(
            'w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all resize-y',
            'bg-background text-foreground',
            'border-border ring-ring/30',
            'focus:ring-2 focus:ring-ring focus:border-ring',
            touched.message && errors.message && 'border-destructive ring-destructive/20',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          placeholder="Tell us about your goals, timeline, and success metrics..."
          value={fields.message}
          onChange={(event) => handleChange('message', event.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          disabled={status === 'loading'}
        />
        {touched.message && errors.message && (
          <p id={`${ids.message}-error`} className="text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <NeonButton
        type="submit"
        size="lg"
        variant="solid"
        className="w-full gap-2"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </NeonButton>

      {/* Status Messages */}
      {status !== 'idle' && statusMessage && (
        <div
          className={cn(
            'rounded-xl border px-4 py-3 text-sm',
            status === 'success'
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'border-destructive/50 bg-destructive/10 text-destructive'
          )}
          role="alert"
          aria-live={status === 'success' ? 'polite' : 'assertive'}
        >
          {statusMessage}
        </div>
      )}
    </form>
  )
}
