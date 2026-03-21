# Changelog

All notable changes to this project will be documented in this file. The format mirrors [Keep a Changelog](https://keepachangelog.com) and uses semantic sections for clarity.

## [Unreleased]

### Added
- Document created to track ongoing Lumigrid 2.0 rebuild work.
- Testimonials and FAQ sections added to the homepage (`src/components/sections/testimonials.tsx`, `faq.tsx`) and wired into `app/page.tsx`.
- Brands logo grid added via `src/components/sections/brands.tsx` and surfaced on the homepage.
- Alternate CTA components (`GradientCTASection`, `SplitCTASection`) added and hooked into Pricing and About pages.
- Floating “Book a Call” CTA, scroll-aware Tubelight navigation, and reduced-motion-safe shader lazy loading to mirror the legacy polish.
- Pricing plan buttons now deep-link to `/contact?plan=…` and the contact form pre-fills + forwards the selected plan to Formspree.

### Planned
- Replace Unsplash placeholder assets with final art direction and update copy for launch.
- Integrate analytics/monitoring (GA4, PostHog, or Sentry) prior to launch and emit conversion events.
- Add per-route metadata (SEO, Open Graph, Twitter cards) before deployment.
