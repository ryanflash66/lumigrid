---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - docs/agents/PROJECT_SUMMARY.md
  - README.md
  - docs/agents/design-agent-primer.md
  - docs/agents/content-agent-primer.md
  - docs/CONTENT_AUDIT_REPORT.md
  - docs/CONTENT_IMPROVEMENT_RECOMMENDATIONS.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 6
workflowType: 'prd'
lastStep: 11
project_name: 'llumigrid-website'
user_name: 'Ryanf'
date: '2024-12-22'
aestheticReference: 'Cluely platform'
---

# Product Requirements Document - llumigrid-website

**Author:** Ryanf
**Date:** 2024-12-22

---

## Executive Summary

**llumigrid-website** is a UI/UX refinement and brand consistency initiative for the existing Lumigrid web development agency site. The goal is to transform the current functional website into a visually distinctive, innovation-forward experience inspired by the Cluely platform aesthetic.

**Vision:** When visitors land on Lumigrid, they should immediately feel they've encountered a cutting-edge web studio that practices what it preaches—sophisticated design, polished interactions, and clear value communication.

**Current State:**
- Next.js 16 + Tailwind v4 + shadcn/ui foundation is solid
- Core functionality (forms, navigation, pricing) works correctly
- Content audit identified 47 improvement areas across copy and UI
- Visual design is functional but lacks the innovative, premium feel that sets agencies apart

**Target State:**
- Cluely-inspired aesthetic: soft gradients, elegant typography mixing serif headlines with clean sans-serif body, warm accent colors, spacious layouts
- Unified component design system with consistent buttons, cards, and interactive states
- Refreshed copy that aligns with brand voice: direct, results-focused, professional yet approachable
- Polish pass ensuring consistency across dark/light modes and all breakpoints

---

### What Makes This Special

This isn't just a bug-fix or content swap—it's an **elevation of the entire brand presence**. The Cluely aesthetic represents a new wave of tech design: warm, human, innovative, and confident. By adopting these patterns while maintaining Lumigrid's identity, the site will:

1. **Stand apart from template-based agency sites** — demonstrating the craft Lumigrid sells
2. **Build instant credibility** — visitors will sense the attention to detail before reading a word
3. **Support conversion goals** — polished UI and clear messaging drive trust and action
4. **Create internal alignment** — a documented component system makes future updates consistent

---

## Project Classification

| Aspect | Value |
|--------|-------|
| **Technical Type** | `web_app` — Marketing site with interactive elements |
| **Domain** | `general` — Web agency marketing site |
| **Complexity** | Low — UI/copy refinement, no new architecture |
| **Project Context** | Brownfield — polishing existing Next.js 16 codebase |
| **Work Scope** | Design polish + Copy refresh + Component consistency audit |
| **Aesthetic Reference** | Cluely platform (soft gradients, serif headlines, warm tones, spacious layouts) |

---

## Success Criteria

### User Success

1. **First Impression Excellence** — Visitors immediately perceive Lumigrid as a premium, innovative agency with Cluely-level aesthetic polish
2. **Trust Through Consistency** — Design coherence across all pages reinforces credibility and professionalism
3. **Clear Value Communication** — Copy is direct, jargon-free, and benefit-focused; visitors understand what Lumigrid does within seconds
4. **Smooth Interactions** — All components (buttons, forms, navigation, pricing cards) feel cohesive, responsive, and intentionally designed

### Business Success

1. **Conversion Confidence** — Site quality positions Lumigrid as a premium choice, no longer a potential objection in sales conversations
2. **Brand Differentiation** — Visually distinguishable from template-based agency sites; demonstrates the craft Lumigrid sells
3. **Launch Readiness** — Site ready for active promotion and client acquisition

### Technical Success

1. **Component Consistency** — All buttons, cards, forms, and CTAs follow a unified design system with predictable states
2. **Cross-Mode Parity** — Both dark and light modes feel polished and intentional, not afterthoughts
3. **Responsive Excellence** — All breakpoints (mobile, tablet, desktop) feel designed, not merely adapted
4. **Performance Maintained** — UI polish does not regress Lighthouse performance scores (baseline: ~92)
5. **Audit Completion** — All 47 content/UI issues identified in the content audit are addressed

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Content audit issues resolved | 47/47 (100%) |
| CTA language variants | Reduced from 7+ to 2-3 standard patterns |
| Component visual inconsistencies | Zero |
| Lighthouse Performance Score | ≥90 maintained |
| Dark/light mode parity | Full coverage |

---

## Product Scope

### MVP - Minimum Viable Product

**Must ship for this initiative to succeed:**

- [ ] Cluely-inspired hero section redesign (soft gradients, serif headline typography, warm accents)
- [ ] CTA language standardization ("Book a Call", "Start a Project")
- [ ] Component consistency pass (buttons, cards, pricing tables)
- [ ] High-priority copy refresh (hero, 404, demo page, technical jargon removal)
- [ ] Color palette refinement aligned with Cluely warmth

### Growth Features (Post-MVP)

**Should include if time permits:**

- [ ] Full content audit implementation (all 47 issues)
- [ ] Typography system upgrade (elegant serif headlines throughout)
- [ ] Testimonials and FAQ visual refresh
- [ ] Enhanced form styling
- [ ] Spacing and layout consistency audit

### Vision (Future)

**Nice-to-have for future iterations:**

- [ ] Animated page transitions
- [ ] Illustration system (Cluely-style decorative elements)
- [ ] Advanced microinteractions on hover/focus states
- [ ] Custom iconography aligned with new aesthetic

---

## User Journeys

### Journey 1: Alex Chen — First Impressions Matter

Alex is a marketing director at a growing climate tech startup. Their current website is embarrassingly dated, and the CEO just asked her to find an agency that "actually gets modern web design." She's seen too many template-based agency sites and is skeptical.

She lands on Lumigrid from a Google search. Within the first 3 seconds, she notices something different — the hero section has a subtle, mesmerizing shader effect that feels innovative without being distracting. The headline is clear: "Websites That Drive Results." No fluff, no jargon.

As she scrolls, the visual consistency impresses her. Every section feels intentionally designed. The pricing is transparent. The testimonials cite specific results, not vague praise. By the time she reaches the contact form, she's already mentally drafting her project brief.

She clicks "Book a Call" and fills out the form. The interaction is smooth — clear validation, helpful placeholder text, and an instant confirmation. She leaves thinking, "If their site is this polished, imagine what they'd build for us."

---

### Journey 2: Marcus Webb — Referral with High Intent

Marcus runs a nonprofit and just got a recommendation from a founder friend: "Talk to Lumigrid — they rebuilt our entire site in six weeks." He arrives on the site already warm, but he needs to justify the budget to his board.

He heads straight to Pricing. The three-tier structure makes sense. The "Business" tier at $3,500 feels accessible for his organization. He clicks through to learn more about what's included, and the CTA takes him smoothly to the contact page with the plan pre-selected.

The site reinforces his friend's recommendation at every step — the design is premium, the copy is professional, and the process feels transparent. He submits a form within 10 minutes of landing, confident he can present Lumigrid as "the agency that looks like they practice what they preach."

---

### Journey 3: Internal Review — Dark Mode & Responsive Check

A Lumigrid team member switches to dark mode to test consistency. They navigate through every page — home, about, pricing, contact, blog. Each component renders correctly. Colors adapt. Contrast ratios are accessible. The shader hero looks just as striking against the dark background.

They open the site on mobile. The navigation collapses elegantly. Forms are thumb-friendly. Pricing cards stack properly. Nothing feels like an afterthought.

---

### Journey Requirements Summary

These journeys reveal the capabilities needed for this polish pass:

| Capability Area | Requirements Revealed |
|-----------------|----------------------|
| **Hero Section** | Must create instant "wow" impression, communicate value in <3 seconds |
| **Visual Consistency** | Every section must feel part of the same intentional design system |
| **Pricing Clarity** | Transparent tiers, smooth CTA flow to contact with plan context preserved |
| **Form Experience** | Polished validation states, clear feedback, professional microcopy |
| **Dark Mode** | Full parity — not an afterthought, but equally designed |
| **Mobile Experience** | Not just responsive, but designed for touch interactions |
| **Trust Signals** | Testimonials with specific metrics, not vague praise |

---

## Web App Technical Requirements

### Architecture Overview

| Aspect | Specification |
|--------|---------------|
| **Framework** | Next.js 16 App Router (hybrid SSR/RSC with client components) |
| **Styling** | Tailwind CSS v4 with CSS variables for theming |
| **UI Library** | shadcn/ui primitives |
| **Special Effects** | Three.js shader hero (with reduced-motion fallback) |
| **Form Handling** | Formspree integration |

### Browser Compatibility

- **Target:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **Minimum versions:** Last 2 major versions of each browser
- **No support required:** IE11 or legacy browsers
- **Constraint:** All visual polish (gradients, shadows, borders) must work across targets

### Responsive Design Targets

| Breakpoint | Width | Focus |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

**Approach:** Mobile-first with progressive enhancement

### Performance Constraints

| Metric | Requirement |
|--------|-------------|
| Lighthouse Performance | ≥90 maintained |
| Font loading | Use `next/font` for new serif typeface |
| Bundle size | No significant increase from CSS changes |
| Shader | Lazy-loaded, respects `prefers-reduced-motion` |

### Accessibility Standards

| Requirement | Standard |
|-------------|----------|
| Target level | WCAG AA |
| Color contrast | 4.5:1 for normal text, 3:1 for large text |
| Focus states | Visible on all interactive elements |
| Motion | Respect `prefers-reduced-motion` for animations |
| Screen readers | Semantic HTML, proper ARIA labels |

### Dark/Light Mode Requirements

- All new styles must define both light and dark variants
- Use CSS variables (`--primary`, `--background`, etc.) — no hardcoded colors
- Maintain contrast ratios in both modes
- Test both modes before any change is considered complete

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — elevate the aesthetic experience of existing functionality
**Resource Requirements:** Solo developer, 2-3 days focused work
**Launch Criteria:** Hero redesigned, CTAs standardized, all components pass visual consistency audit

### Phase Boundaries

#### Phase 1: MVP (This Sprint)

**Focus:** Visual transformation and immediate impact

- Cluely-inspired hero section (soft gradients, serif typography, warm accents)
- CTA language standardization across entire site
- Button, card, and pricing table consistency pass
- High-priority copy refresh (hero, 404, demo)
- Color palette refinement

**Definition of Done:** Site creates instant "premium" impression; no visual inconsistencies

#### Phase 2: Polish Pass (This Sprint if time permits)

**Focus:** Complete content audit resolution

- All 47 content audit items addressed
- Typography system upgrade sitewide
- Testimonials and FAQ visual refresh
- Enhanced form styling
- Spacing and layout consistency

#### Phase 3: Enhancement (Future)

**Focus:** Delight and differentiation

- Animated page transitions
- Cluely-style decorative elements
- Advanced hover/focus microinteractions
- Custom iconography

### Risk Mitigation Strategy

| Category | Risk | Mitigation |
|----------|------|------------|
| Technical | Typography affecting layout | Responsive testing before commit |
| Technical | Color contrast issues | WCAG validation tooling |
| Scope | Feature creep | Pre-defined component checklist |
| Quality | Dark/light mode drift | Dual-mode testing for every change |

---

## Functional Requirements

### Visual Identity & Branding

- FR1: Visitors can see a hero section with Cluely-inspired aesthetic (soft gradients, serif headlines, warm accent colors)
- FR2: Visitors can see consistent typography with elegant serif headlines paired with clean sans-serif body text
- FR3: Visitors can see a warm, premium color palette that conveys innovation and trustworthiness
- FR4: Visitors can see the Three.js shader effect on the hero section (with graceful degradation for reduced-motion preferences)

### Component System Consistency

- FR5: Visitors can interact with buttons that have consistent styling, sizes, and hover/focus states across all pages
- FR6: Visitors can see pricing cards with unified visual treatment (borders, shadows, spacing)
- FR7: Visitors can interact with CTAs that use standardized language patterns ("Book a Call", "Start a Project")
- FR8: Visitors can see cards and containers with consistent corner radii, padding, and shadow styles
- FR9: Visitors can see form inputs with consistent styling, placeholder text, and validation states

### Theme & Mode Support

- FR10: Visitors can toggle between light and dark modes with full visual parity
- FR11: Visitors can see proper color contrast ratios (WCAG AA) in both light and dark modes
- FR12: Visitors can see all components render correctly in both theme modes without visual artifacts

### Responsive Experience

- FR13: Visitors can navigate the site on mobile devices with thumb-friendly touch targets
- FR14: Visitors can see pricing cards stack appropriately on smaller screens
- FR15: Visitors can use the navigation menu that collapses elegantly on mobile viewports
- FR16: Visitors can see all content and components adapt gracefully across all defined breakpoints (sm, md, lg, xl, 2xl)

### Content & Messaging

- FR17: Visitors can read hero copy that communicates value within 3 seconds without jargon
- FR18: Visitors can read copy across the site that follows the brand voice (direct, results-focused, professional yet approachable)
- FR19: Visitors can see testimonials with specific, credible outcomes rather than vague praise
- FR20: Visitors can see the 404 page with helpful navigation and on-brand styling
- FR21: Visitors can see FAQ content with clear, jargon-free answers

### Navigation & Wayfinding

- FR22: Visitors can navigate between all main sections (Home, About, Pricing, Blog, Contact) from any page
- FR23: Visitors can see their current location indicated in the navigation
- FR24: Visitors can access the contact form from floating CTAs visible during scroll

### Form Experience

- FR25: Visitors can submit the contact form with clear field labels and helpful placeholder text
- FR26: Visitors can see validation feedback (errors, success) with polished, on-brand styling
- FR27: Visitors can see form confirmation messages that match the overall site aesthetic

### Accessibility

- FR28: Visitors using screen readers can navigate the site with proper semantic HTML and ARIA labels
- FR29: Visitors can see visible focus indicators on all interactive elements
- FR30: Visitors with motion sensitivity can experience the site with reduced animations when prefers-reduced-motion is set

### Content Audit Resolution

- FR31: Visitors can see resolution of all 47 identified content/UI issues from the content audit
- FR32: Visitors can see CTA variants reduced from 7+ to 2-3 standardized patterns

---

## Non-Functional Requirements

### Performance

| Metric | Requirement | Rationale |
|--------|-------------|-----------|
| Lighthouse Performance Score | ≥90 | Maintain current baseline; UI changes must not regress performance |
| Largest Contentful Paint (LCP) | <2.5s | Hero section must render quickly for first impression |
| First Input Delay (FID) | <100ms | Interactive elements must feel responsive |
| Cumulative Layout Shift (CLS) | <0.1 | No jarring layout shifts during page load |
| Font Loading | next/font with display swap | Prevent invisible text during font load |
| Image Optimization | WebP/AVIF with lazy loading | Maintain fast page loads despite visual richness |

### Accessibility

| Requirement | Standard | Verification |
|-------------|----------|--------------|
| WCAG Level | AA compliance | Automated + manual testing |
| Color Contrast | 4.5:1 (text), 3:1 (large text/UI) | Contrast checker validation in both modes |
| Focus Visibility | All interactive elements | Tab navigation audit |
| Motion Sensitivity | prefers-reduced-motion respected | Shader and animations honor user preference |
| Screen Reader | Semantic HTML, ARIA labels | VoiceOver/NVDA testing |
| Keyboard Navigation | Full site navigable | Tab-through audit |

### Browser Compatibility

| Requirement | Specification |
|-------------|---------------|
| Target Browsers | Chrome, Firefox, Safari, Edge (last 2 versions) |
| CSS Features | Gradients, shadows, CSS variables must render correctly |
| JavaScript | ES2020+ features with Next.js transpilation |
| Mobile Browsers | iOS Safari 15+, Chrome for Android |

### Reliability

| Requirement | Specification |
|-------------|---------------|
| Form Submission | 99.9% success rate for valid submissions |
| Error Handling | Graceful degradation if Formspree unavailable |
| Shader Fallback | Static gradient if WebGL unavailable or disabled |
| Theme Persistence | User theme preference remembered across sessions |

### Maintainability

| Requirement | Specification |
|-------------|---------------|
| CSS Variables | All colors defined as CSS custom properties |
| Component Consistency | Design tokens documented for future updates |
| Dark/Light Parity | Every component tested in both modes before merge |
| Code Style | ESLint + Tailwind conventions enforced |

---

## Document Status

| Attribute | Value |
|-----------|-------|
| **Status** | ✅ Complete |
| **Completed** | 2024-12-22 |
| **Author** | Ryanf |
| **Workflow** | BMAD PRD Workflow v1.0 |

---

*This PRD is now ready to guide UX design, technical decisions, and development planning for the llumigrid-website polish initiative.*

