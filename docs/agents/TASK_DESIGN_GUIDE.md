# Task: Create Design Guide / Brand Guide Page

## Overview
Create a comprehensive design guide/brand guide page that serves as a visual reference for all design system components, color palette, typography, spacing, and design assets used throughout the Lumigrid website. This page should be visually rich, displaying components and assets in their actual rendered form (not just text descriptions), making it easy for developers and designers to reference the design system.

## Route
Create this page at: `src/app/design-guide/page.tsx`

## Navigation & Access
- Add a "Design Guide" entry to the header navigation (`navItems` in `src/components/layout/site-header.tsx`) so the page is discoverable from the Tubelight navbar.
- Mirror the link in the footer (`footerLinks` inside `src/components/layout/site-footer.tsx`) under a relevant column (e.g., Company or Resources).
- If you add a sidebar/table of contents within the page, ensure the corresponding skip links still pass Lighthouse accessibility checks.

## Page Structure Requirements

### 1. Hero Section
- Title: "Lumigrid Design System"
- Subtitle: "A comprehensive guide to our components, colors, and design assets"
- Use the existing Hero component styling as reference
- Include a subtle background (can use DotShaderBackground if appropriate)

### 2. Color Palette Section
**Display Requirements:**
- Show all brand colors with visual color swatches (large squares/circles)
- Include both light mode and dark mode variants side-by-side
- For each color, display:
  - Color swatch (actual rendered color)
  - Color name (Primary, Secondary, Accent, etc.)
  - Hex value
  - OKLCH value (as defined in globals.css)
  - Usage description
  - Example of text on that color (for foreground colors)

**Colors to Document:**
- Pull the canonical values directly from `src/app/globals.css` so updates to design tokens stay in sync.
- **Primary**: `#3757FA` (oklch(0.55 0.22 260)) - Light mode
- **Primary**: Lighter variant (oklch(0.70 0.22 260)) - Dark mode
- **Secondary**: `#03BAFC` (oklch(0.65 0.18 210)) - Light mode
- **Secondary**: Lighter variant (oklch(0.75 0.18 210)) - Dark mode
- **Accent**: `#1B95F5` (oklch(0.60 0.20 240)) - Light mode
- **Accent**: Lighter variant (oklch(0.75 0.20 240)) - Dark mode
- **Destructive**: `#DB7203` (oklch(0.50 0.18 30)) - Light mode
- **Destructive**: Lighter variant (oklch(0.65 0.18 30)) - Dark mode
- **Background**: Light and dark variants
- **Foreground**: Light and dark variants
- **Muted**: Light and dark variants
- **Border**: Light and dark variants
- **Chart Colors**: All 5 chart color variants

**Visual Layout:**
- Use a grid layout (responsive: 1 column mobile, 2-3 columns desktop)
- Each color card should show the color prominently
- Include theme toggle to show both light/dark variants
- Use actual CSS classes to render colors (e.g., `bg-primary`, `text-primary-foreground`)

### 3. Typography Section
**Display Requirements:**
- Show all heading levels (h1-h6) with actual rendered examples
- Display body text variants (regular, semibold, bold)
- Show font families used (Geist Sans, Geist Mono)
- Include font sizes from the design system
- Show line heights and letter spacing where applicable
- Display text color variants (foreground, muted-foreground, etc.)

**Typography to Document:**
- Font families: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono)
- Heading hierarchy: text-4xl, text-3xl, text-2xl, text-xl, text-lg, text-base
- Font weights: normal, semibold, bold
- Text colors: foreground, muted-foreground, primary, accent
- Letter spacing: tracking-tight, tracking-wide, tracking-[0.3em], etc.

### 4. UI Components Section
**For each component, display:**
- Component name and description
- Visual rendering of the component in all its variants/states
- Code example (optional, can be collapsible)
- Usage guidelines
- Props/API documentation

**Components to Document:**

#### 4.1 Button Component (`src/components/ui/button.tsx`)
- Show all variants: default, destructive, outline, secondary, ghost, link
- Show all sizes: default, sm, lg, icon, icon-sm, icon-lg
- Show states: default, hover, focus, disabled
- Show with icons
- Show `asChild` usage example

#### 4.2 NeonButton Component (`src/components/ui/neon-button.tsx`)
- Show all variants: default, solid, ghost
- Show all sizes: sm, default, lg
- Show with `neon={true}` and `neon={false}` comparison
- Show hover states (glow effects)
- Show `asChild` usage with Link
- Explain the neon glow animation

#### 4.3 Card Component (`src/components/ui/card.tsx`)
- Show Card with all sub-components:
  - CardHeader
  - CardTitle
  - CardDescription
  - CardContent
  - CardFooter
- Show in light and dark modes
- Show with different content examples

#### 4.4 PricingCard Component (`src/components/ui/animated-glassy-pricing.tsx`)
- Show PricingCard with all props
- Show featured/popular variant
- Show with different pricing examples
- Explain the glassmorphism effect

#### 4.5 TubelightNavbar Component (`src/components/ui/tubelight-navbar.tsx`)
- Show the navigation bar
- Show active state highlighting
- Show scroll-aware behavior
- Show with different navigation items

#### 4.6 DotShaderBackground Component (`src/components/ui/dot-shader-background.tsx`)
- Show the shader background
- Explain the interactive mouse trail effect
- Show theme-aware behavior
- Show reduced-motion fallback

#### 4.7 ThemeToggle Component (`src/components/layout/theme-toggle.tsx`)
- Show the theme toggle button
- Show light/dark mode states

### 5. Section Components Section
**For each section component, display:**
- Component name and description
- Visual rendering
- Usage context
- Props/configuration

**Sections to Document:**
- Hero (`src/components/sections/hero.tsx`)
- ContactStrip (`src/components/sections/contact-strip.tsx`)
- GradientCTASection (`src/components/sections/cta-variations.tsx`)
- SplitCTASection (`src/components/sections/cta-variations.tsx`)
- TestimonialsSection (`src/components/sections/testimonials.tsx`)
- FAQSection (`src/components/sections/faq.tsx`)
- BrandsSection (`src/components/sections/brands.tsx`)
- CapabilitiesSection (`src/components/sections/capabilities.tsx`)

### 6. Layout Components Section
**Components to Document:**
- SiteHeader (`src/components/layout/site-header.tsx`)
- SiteFooter (`src/components/layout/site-footer.tsx`)
- FloatingCTA (`src/components/layout/floating-cta.tsx`)
  - Show normal state
  - Show interacting state (glassmorphism effect)
  - Explain the interaction detection

### 7. Form Components Section
**Document:**
- ContactForm (`src/components/forms/contact-form.tsx`)
  - Show all form fields
  - Show validation states (error, success)
  - Show loading state
  - Show different field types (text, email, tel, select, textarea)
  - Show compact variant

### 8. Spacing System Section
**Display Requirements:**
- Visual grid showing Tailwind spacing scale
- Show spacing tokens: xs, sm, md, lg, xl, 2xl, 3xl, etc.
- Show examples of spacing in use (margins, padding, gaps)
- Show responsive spacing patterns
- Reference the actual Tailwind scale (0, 0.5, 1, 1.5, 2, 2.5, ... 24rem) and call out the increments most used in this repo (`px-6`, `py-20`, `gap-10`, etc.) with their pixel/rem equivalents.

### 9. Border Radius Section
**Display Requirements:**
- Show all radius tokens: sm, md, lg, xl, 2xl, 3xl, full
- Visual examples of each radius applied to buttons, cards, etc.
- Show the radius values in pixels/rem

### 10. Shadows Section
**Display Requirements:**
- Show all shadow variants used in the design system
- Visual examples of shadows on cards, buttons
- Show shadow tokens if defined

### 11. Design Assets Section
**Display Requirements:**
- Show all logo variants:
  - Logo (light mode)
  - Logo white (dark mode)
  - Favicon
- Show all brand logos (from `public/assets/images/brands/`)
- Show decorative assets (shapes, patterns)
- Show image assets organized by category:
  - Hero images
  - About images
  - Blog images
  - Team images
  - Testimonial images
- For each asset, show:
  - Visual preview
  - File path
  - Usage context
  - Dimensions (if applicable)

**Assets to Document:**
- Logos: `logo.svg`, `logo-white.svg`, `favicon.svg`, `favicon.png`
- Brand logos: All SVG files in `public/assets/images/brands/`
- Hero: `hero-image.jpg`, `brand.svg`
- About: `about-image-01.jpg`, `about-image-02.jpg`
- Blog: All blog-related images
- Team: `team-01.png` through `team-04.png`
- Testimonials: `author-01.jpg` through `author-03.jpg`, `icon-star.svg`
- Decorative: All SVG shapes and patterns

### 12. Animations & Transitions Section
**Display Requirements:**
- Show transition examples (hover, focus, etc.)
- Document transition durations used (200ms, 300ms, 500ms)
- Show animation examples (if any custom animations)
- Document easing functions used

### 13. Responsive Breakpoints Section
**Display Requirements:**
- Show all breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Show examples of responsive behavior
- Show mobile-first approach examples

### 14. Dark Mode Section
**Display Requirements:**
- Show side-by-side comparisons of components in light and dark modes
- Explain the dark mode implementation
- Show how colors adapt in dark mode
- Include theme toggle for interactive viewing

### 15. Iconography Section
**Display Requirements:**
- Showcase the Lucide icon set we rely on (`lucide-react`) with the core icons already used in components (e.g., `Sparkles`, `ArrowRight`, `Home`, `PenLine`).
- Document stroke width, sizing guidance (16px, 20px, 24px), and color usage (inherit text color vs forced tokens).
- Provide examples of icons inside buttons, badges, and CTA chips to demonstrate spacing/alignment best practices.
- Call out how to extend the icon set (adding new imports, tree-shaking considerations) and when to opt for custom SVGs stored under `public/assets`.

## Design Requirements

### Visual Design
- Use the existing design system to style the guide page itself
- Maintain consistent spacing and typography
- Use cards/sections to organize content
- Make it visually appealing and easy to scan
- Use the brand colors appropriately
- Ensure proper contrast and accessibility

### Layout
- Use a clean, organized layout
- Consider using a sidebar navigation for easy jumping between sections (optional)
- Use sticky section headers
- Make it easy to copy color values, component names, etc.

### Interactivity
- Include theme toggle to see light/dark mode variants
- Make component examples interactive where possible (hover states, etc.)
- Consider collapsible sections for code examples
- Add smooth scrolling navigation

### Responsiveness
- Ensure the guide page works on all screen sizes
- Use responsive grids for color swatches and component examples
- Test on mobile, tablet, and desktop

## Technical Requirements

### File Structure
- Create: `src/app/design-guide/page.tsx`
- Can create supporting components in `src/components/design-guide/` if needed
- Use existing components where possible to demonstrate them

### Code Quality
- Follow existing code patterns and conventions
- Use TypeScript properly
- Ensure accessibility (proper headings, ARIA labels, etc.)
- Use semantic HTML

### Performance
- Lazy load images where appropriate
- Optimize component rendering
- Consider code splitting if the page becomes large

## Content Requirements

### Descriptions
- Write clear, concise descriptions for each component
- Explain when to use each component
- Include usage guidelines and best practices
- Note any accessibility considerations

### Examples
- Show real, working examples of each component
- Use realistic content in examples
- Show edge cases and variations
- Include both simple and complex usage examples

## Testing Requirements

### Visual Testing
- Test in both light and dark modes
- Test on different screen sizes
- Verify all components render correctly
- Check that all images load properly

### Functional Testing
- Test theme toggle functionality
- Test any interactive elements
- Verify navigation works (if sidebar is included)
- Test copy-to-clipboard functionality (if implemented)

## Documentation Requirements

### Metadata
- Add proper page metadata (title, description)
- Include Open Graph tags if appropriate

### Code Comments
- Add comments explaining complex sections
- Document any custom logic or patterns

## Deliverables

1. **Design Guide Page** (`src/app/design-guide/page.tsx`)
   - Fully functional, visually rich design guide
   - All sections implemented
   - All components and assets displayed

2. **Supporting Components** (if needed)
   - Any reusable components created for the guide page
   - Organized in `src/components/design-guide/`

3. **Documentation Update**
   - Update `docs/agents/COORDINATION.md` with completion entry
   - Note any important design decisions or patterns

## Success Criteria

- ✅ All color palette colors are displayed visually with values
- ✅ All UI components are shown with all variants and states
- ✅ All section components are documented with examples
- ✅ All layout components are shown
- ✅ All design assets are displayed with file paths
- ✅ Typography system is fully documented
- ✅ Spacing and radius systems are shown visually
- ✅ Dark mode variants are shown for all relevant components
- ✅ Page is responsive and works on all screen sizes
- ✅ Page follows the design system it documents
- ✅ All examples are interactive/functional where appropriate
- ✅ Code is clean, well-organized, and follows project conventions

## Notes

- This page should serve as both a reference for developers and a showcase of the design system
- Make it visually impressive while remaining functional and informative
- Consider this page as part of the public-facing site (or decide if it should be password-protected)
- Use actual component imports to ensure examples stay in sync with code changes
- Consider adding a "Copy" button for color values and component names for easy reference

## Coordination

- **@ContentAgent**: May need help with descriptions and usage guidelines text
- **@FeatureAgent**: May need help with any interactive features (copy buttons, collapsible sections)
- **@LeadDev**: Review final implementation and approve for production

---

**Status:** 🚧 Assigned to Design Agent

**Priority:** Medium

**Estimated Complexity:** High (comprehensive page with many sections)

