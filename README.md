<div align="center">

# Lumigrid 2.0

Next.js + shadcn/ui + Tailwind v4 rebuild of the Lumigrid web agency site, now fully componentised with TypeScript and a reusable Three.js hero shader.

</div>

## Stack

- **Next.js 16 / App Router / TypeScript**
- **Tailwind CSS v4** with design tokens mirrored from the legacy HTML build
- **shadcn/ui** for composable primitives (`components.json` defined for `@/components/ui`)
- **next-themes** for dark/light synchronisation
- **@react-three/fiber + drei + three** for the `DotShaderBackground`
- Legacy static export + agent documentation retained under `docs/` and `legacy-site/`

## Project layout

```
src/
 ├─ app/
 │   ├─ page.tsx            # Home page composed of hero, capabilities, CTA strip
 │   ├─ demo/page.tsx       # Standalone shader demo requested in spec
 │   └─ globals.css         # Tailwind v4 tokens + shadcn overrides + legacy styles
 ├─ components/
 │   ├─ sections/           # Page sections (hero, capabilities, etc.)
 │   ├─ theme-provider.tsx  # next-themes wrapper
 │   └─ ui/                 # shadcn ui primitives + dot shader
 └─ lib/utils.ts            # shadcn helper

public/assets/              # Migrated imagery + icons from the static site
docs/agents                 # Original multi-agent coordination docs
legacy-site/                # Frozen HTML/JS build for reference & QA history
```

### Routes implemented

- `/` – Hero with shader background, capabilities grid, CTA strip
- `/about` – Story, values, leadership grid
- `/pricing` – Tiered pricing cards
- `/contact` – Full contact funnel + React Formspree integration
- `/brands` section (on homepage) – logo grid highlighting client trust
- CTA variations – gradient banner on Pricing + split CTA on About
- `/blog` + `/blog/[slug]` – Insights feed and case-study template
- `/demo` – Standalone Dot Screen shader showcase
- `/(auth)/signin`, `/(auth)/signup` – Client workspace forms
- `/not-found` – Custom 404 surface

## Scripts

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start Next.js dev server at `localhost:3000` |
| `npm run lint`  | Run ESLint (Next + Tailwind rules)           |
| `npm run build` | Production build (SSR + RSC)                 |
| `npm run start` | Serve compiled build                         |

## shadcn usage

The CLI is already initialised (`components.json`). Generate primitives into `/src/components/ui`:

```bash
npx shadcn@latest add card
```

Use them via `import { Card } from "@/components/ui/card"`. The folder must exist because the CLI expects a dedicated destination for Radix-powered building blocks.

## Dot shader integration

`src/components/ui/dot-shader-background.tsx` exports:

- `DotShaderBackground` – absolute-position helper for hero sections
- `DotScreenShader` – full-screen canvas (used on `/demo`)

The shader uses `useTrailTexture` for pointer trails and reads the current theme via `next-themes`. `app/layout.tsx` already wraps every page with the local `ThemeProvider`.

## Assets & Unsplash

All historical imagery now resides in `public/assets`. New sections use stock photography with reliable Unsplash IDs (e.g., `photo-1500530855697-b586d89ba3ee`). Replace them with client-approved visuals during production.

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to your live Formspree URL. When the variable is absent, the contact form falls back to a simulated delay, so local development still feels responsive.

## Legacy documentation

- `docs/agents` – multi-agent primers, QA review, and coordination log
- `docs/DEPLOYMENT_CHECKLIST.md` – pre/post launch steps
- `docs/PERFORMANCE_OPTIMIZATIONS.md` – historical perf notes
- `legacy-site/` – frozen HTML + JS site for auditing diffs

## Next steps

1. Replace remaining Unsplash placeholders under `public/assets/` with final art direction, alt text, and copy tweaks.
2. Wire analytics/monitoring (GA4, PostHog, Sentry, etc.) plus per-route metadata/OG cards before launch.
3. Once assets + analytics are locked, re-run Lighthouse/WebPageTest and capture the ship-ready performance baseline.

Happy shipping ✨
