import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of Lumigrid AI services.',
  openGraph: {
    title: 'Terms of Service — Lumigrid AI',
    description: 'Terms governing use of Lumigrid AI services.',
  },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 25, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Services</h2>
          <p className="mt-2">
            Lumigrid AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides AI
            automation consulting and development services, including but not limited to custom AI
            workflow design, integration, and deployment for businesses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Use of Website</h2>
          <p className="mt-2">
            By accessing this website, you agree to these Terms of Service. You may use this site for
            lawful purposes only. You agree not to misuse the site or its content, including
            attempting to interfere with the proper functioning of the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Intellectual Property</h2>
          <p className="mt-2">
            All content on this website, including text, graphics, logos, and software, is the
            property of Lumigrid AI or its licensors and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works from this
            content without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Payment Terms</h2>
          <p className="mt-2">
            Payment terms for our services are established on a per-project basis and will be outlined
            in a separate service agreement or statement of work. All fees are due according to the
            schedule specified in the applicable agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, Lumigrid AI shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or
            revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or
            other intangible losses resulting from your use of our services or website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. No Guarantees</h2>
          <p className="mt-2">
            Our services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; While we
            strive to deliver high-quality results, we make no warranties or guarantees regarding
            specific outcomes, performance improvements, or return on investment from our AI
            automation services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Termination</h2>
          <p className="mt-2">
            We reserve the right to terminate or suspend access to our services at our sole
            discretion, without notice, for conduct that we believe violates these Terms or is harmful
            to other users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Governing Law</h2>
          <p className="mt-2">
            These Terms shall be governed by and construed in accordance with the laws of the State of
            North Carolina, United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Changes to Terms</h2>
          <p className="mt-2">
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to this page. Your continued use of the site after changes are
            posted constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about these Terms of Service, please contact us at{' '}
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
