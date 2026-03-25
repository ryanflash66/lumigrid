import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Lumigrid AI collects and uses your information.',
  openGraph: {
    title: 'Privacy Policy — Lumigrid AI',
    description: 'How Lumigrid AI collects and uses your information.',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 25, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p className="mt-2">
            When you use our website or contact us, we may collect the following information:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Name, email address, phone number, and company name submitted through our contact form</li>
            <li>Information about your project needs and budget range</li>
            <li>Usage data collected automatically through Google Analytics 4 (GA4), including pages visited, session duration, device type, and approximate geographic location</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p className="mt-2">We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Respond to your inquiries and provide information about our services</li>
            <li>Improve our website experience and content</li>
            <li>Understand how visitors interact with our site</li>
            <li>Communicate with you about projects and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Third-Party Services</h2>
          <p className="mt-2">
            We use the following third-party services:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong className="text-foreground">Google Analytics 4</strong> — to collect anonymized
              website usage data. Google may use this data in accordance with their own privacy policy.
              You can opt out of Google Analytics by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </li>
            <li>
              <strong className="text-foreground">Formspree</strong> — to process contact form
              submissions securely.
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — to host and serve our website.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
          <p className="mt-2">
            We do not sell, trade, or rent your personal information to third parties. We only share
            your information with the third-party service providers listed above, solely for the
            purposes described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Data Retention</h2>
          <p className="mt-2">
            Contact form submissions are retained for as long as necessary to respond to your inquiry
            and maintain our business relationship. Analytics data is retained according to Google
            Analytics default retention settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal information at any
            time by contacting us at the email address below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a
              href="mailto:hello@lumigrid.ai"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              hello@lumigrid.ai
            </a>.
          </p>
        </section>
      </div>
    </main>
  )
}
