# Lumigrid Agent Team Structure

This directory contains primer prompts for each specialized agent contributing to the Lumigrid 2.0 website rebuild. The active product is a **Next.js 16 + Tailwind v4 + shadcn/ui** application under `src/`, while the frozen static export remains in `legacy-site/` strictly for historical reference and audits.

## Agent Overview

The project uses a multi-agent workflow. Every primer now references the React codebase so agents work against the same architecture:

1. **Lead Dev Agent** (`lead-dev-primer.md`)
   - Owns architecture, deployment, and multi-agent coordination for the Next.js stack
   - Reviews and approves major changes
   - Keeps the coordination log and documentation current

2. **Content Agent** (`content-agent-primer.md`)
   - Writes and edits copy inside React Server Components and shared sections
   - Ensures brand voice consistency across `/src/app/**/page.tsx` and `src/components/sections/*`
   - Produces CTA/microcopy for forms and UI primitives

3. **Design/UI Agent** (`design-agent-primer.md`)
   - Maintains Tailwind v4 tokens defined in `src/app/globals.css`
   - Owns shadcn/ui styling, responsive layouts, and dark-mode parity
   - Partners with Feature Agent on Tubelight nav, shader overlays, and other interactive polish

4. **Feature Development Agent** (`feature-agent-primer.md`)
   - Builds new interactive React components and forms
   - Integrates third-party services (Formspree, analytics, monitoring) via environment variables
   - Keeps shared UI (contact form, CTA variants, Tubelight nav) accessible and testable

5. **Performance Agent** (`performance-agent-primer.md`)
   - Optimizes the Next.js build (Core Web Vitals, bundle size, shader impact)
   - Manages image/font strategies using Next tooling
   - Documents measurable gains in `docs/PERFORMANCE_OPTIMIZATIONS.md`

## How to Use

When spinning up a new agent for a specific task:

1. Read the relevant primer file to understand responsibilities within the current React architecture.
2. Provide the primer content plus any task-specific requirements when prompting the agent.
3. Ensure the agent logs work in `docs/agents/COORDINATION.md` using the required template.
4. Coordinate with the Lead Dev Agent for architectural or cross-team changes.

## Agent Coordination

- Agents work independently inside their domains but must read recent entries in `COORDINATION.md` before touching files.
- Lead Dev Agent facilitates sequencing, resolves conflicts, and documents architectural calls.
- Major changes (new dependencies, schema shifts, production config) require Lead Dev review.
- When work affects another discipline, tag that agent in the coordination log entry.

## Current Status

All primers have been updated for the Next.js 2.0 codebase. Each includes:
- Role and purpose
- Responsibilities and scope
- Boundaries and limitations
- Communication protocols
- Technical context (React components, Tailwind tokens, etc.)
- Examples of tasks
- Workflow guidelines aligned with the coordination system

