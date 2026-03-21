# Repository Guidelines

## Project Structure & Module Organization
Next.js 16 App Router lives in `src/app` (route groups, layouts, global styles in `app/globals.css`). Section-level building blocks live in `src/components/sections`, UI primitives plus the dot shader in `src/components/ui`, and shared helpers in `src/lib`. Marketing assets stay under `public/assets`; never hotlink new imagery. Historical references live in `legacy-site/` and prior agent docs under `docs/agents`—consult them when porting UX from the legacy stack.

## Build, Test, and Development Commands
- `npm run dev` — local RSC/Edge dev server at `http://localhost:3000` with hot reload.
- `npm run lint` — ESLint (Next + Tailwind) across `.ts/.tsx`, catching accessibility, import order, and shader issues early.
- `npm run build` — verifies production compilation and server actions before a deploy request.
- `npm run start` — runs the compiled bundle; use for smoke tests after `build`.

## Coding Style & Naming Conventions
Write strict TypeScript components using the `@/` alias, 2-space indentation, and kebab-case filenames (`src/components/sections/contact-strip.tsx`). Prefer functional, server-first components; when Client Components are required, add the `"use client"` pragma and keep side-effects inside hooks. Tailwind tokens live in `app/globals.css`; extend via CSS variables or design tokens rather than inline hex values. Run `npm run lint` before pushing; ESLint already ignores `legacy-site/**`.

## Testing Guidelines
There is no automated harness yet, so treat lint + manual QA as the acceptance gate. For UI work, open `/` plus any touched route (e.g., `/demo` for shader updates) in light and dark themes, and compare against `legacy-site/` to avoid regressions. Document manual checks in the PR description until we adopt Playwright; include mobile viewport notes when relevant.

## Commit & Pull Request Guidelines
Follow the current history: imperative, descriptive subject lines (`Modernize CTA button`), optional body for detail, and one logical unit per commit. PRs must describe scope, list key screens touched, detail the test plan (`npm run lint`, `npm run build`, manual routes), and attach before/after screenshots or Loom clips for visual changes. Link to relevant `docs/*` playbooks when they shape the work.

## Security & Configuration Tips
Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` so contact forms avoid mock delays. Never commit secrets; `.env.local` is already gitignored. Audit third-party scripts and analytics additions via `docs/DEPLOYMENT_CHECKLIST.md` before requesting deploys.

# 📢 Broadcast: New Agent Coordination System

**Date**: 2025-11-10
**From**: Lead Dev Agent  
**To**: All Agents (Content, Design, Feature, Performance)  
**Priority**: High - Action Required

---

## 🎯 Purpose

A new coordination system has been established to ensure smooth collaboration between all agents working on the Lumigrid website project. This system will help us track changes, avoid conflicts, and maintain clear communication.

---

## 📄 New Coordination Document

**Location**: `agents/COORDINATION.md`

This document serves as our central communication hub and change log. **All agents MUST read and update this document.**

---

## ✅ Required Actions

### Immediate Actions (Before Next Work Session)

1. **Read the Coordination Document**
   - Review `agents/COORDINATION.md` in full
   - Understand the rules and update format
   - Familiarize yourself with the structure

2. **Check Recent Updates**
   - Before starting any work, read the "Recent Updates" section
   - Check if any other agent is working on files you plan to modify
   - Review "Coordination Notes" for any relevant information

### Ongoing Actions (Every Work Session)

1. **Before Starting Work**
   - Read recent updates in `agents/COORDINATION.md`
   - Check "File Change Tracking" to see what's been modified
   - Review "Coordination Notes" for blockers or dependencies

2. **After Completing Work**
   - **MANDATORY**: Write an update entry in `agents/COORDINATION.md`
   - Use the provided update template
   - List ALL files you modified, created, or deleted
   - Note any coordination needs or important considerations
   - Update your status in "Agent Activity Summary"

3. **When Coordinating**
   - If your work affects another agent's domain, note it in your update
   - Use coordination tags: @ContentAgent, @DesignAgent, @FeatureAgent, @PerformanceAgent, @LeadDev
   - Add notes to "Coordination Notes" section if needed

---

## 📋 Update Template

When logging your work, use this format:

```markdown
### [Your Agent Name] - [Brief Description] - [YYYY-MM-DD HH:MM]

**What was done:**
- [Clear description of changes]

**Files modified:**
- `path/to/file1.html` - [what changed]
- `path/to/file2.css` - [what changed]

**Files created:**
- `path/to/newfile.js` - [purpose]

**Files deleted:**
- `path/to/oldfile.html` - [reason]

**Important notes:**
- [Any important considerations, dependencies, or coordination needs]

**Coordination needed:**
- [Tag other agents if needed]

**Status:** ✅ Complete / 🚧 In Progress / ⏸️ Blocked
```

---

## 🚨 Critical Rules

1. **Always Update**: No exceptions - every work session must be logged
2. **Check First**: Always read recent updates before starting work
3. **List All Files**: Even minor changes must be documented
4. **Coordinate Early**: Flag coordination needs immediately
5. **Use Template**: Follow the update template format exactly

---

## 💡 Benefits

This system will help us:
- ✅ Avoid file conflicts between agents
- ✅ Track project progress and changes
- ✅ Maintain clear communication
- ✅ Identify blockers and dependencies quickly
- ✅ Ensure all agents are aware of recent changes
- ✅ Coordinate work more effectively

---

## 📞 Questions or Issues?

If you have questions about the coordination system or encounter issues:
- Review `agents/COORDINATION.md` rules section
- Check with Lead Dev Agent for clarification
- Note blockers in the "Coordination Notes" section

---

## 🎯 Next Steps

1. **Read** `agents/COORDINATION.md` now
2. **Understand** the rules and update format
3. **Start using** the system for your next work session
4. **Update** the document after every work session

---

**Thank you for your cooperation. This system will make our collaboration much more efficient and effective.**

**- Lead Dev Agent**

