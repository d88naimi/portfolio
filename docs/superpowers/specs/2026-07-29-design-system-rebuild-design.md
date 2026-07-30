# Design System Rebuild — Spec

## Overview
Full presentation-layer rebuild of the portfolio site (`d88naimi/portfolio`) from its current warm/cream theme to a dark, cinematic, Apple-discipline direction: restrained color, massive type, physical motion. Every component is replaced. Content (jobs, projects, testimonials, contact) is inventoried and finalized in the design handoff bundle at `~/Desktop/design_handoff_portfolio_rebuild/` (README.md, `Portfolio.dc.html`, `Case Study - Mavis.dc.html`, `Case Study - VehicleIQ.dc.html`, `screenshots/`).

The `.dc.html` files are high-fidelity design references (proprietary prototyping runtime), not code to copy — exact colors, type scale, spacing, copy, and motion timing are final and must be recreated pixel-for-pixel in this repo's Next.js App Router + TypeScript + Tailwind CSS + Framer Motion stack. The handoff bundle's `Portfolio.dc.html` `<script>` section contains the canonical copy for `rawFeatured`, `moreProjects`, `experienceItems`, `capabilityGroups`, and `testimonials` — these must be transcribed verbatim into this repo's typed data files, not paraphrased.

## Goals
- Replace the entire visual system (theme, components, motion) with the dark cinematic design specified in the handoff bundle.
- Single-page site (`/`) with anchored sections: Nav → Hero → Impact strip → Selected work → Experience (incl. education/certs) → Consulting → Capabilities → Testimonials → Contact → Footer.
- New case study route `/work/[slug]`, driven by one shared typed data file, initially serving `mavis` and `vehicleiq`.
- Full accessibility (landmarks, heading hierarchy, focus rings, keyboard reachability, `prefers-reduced-motion` producing a fully static fallback everywhere).
- Lighthouse mobile performance target 90+.

## Non-Goals
- No CMS or backend changes — content stays in static typed data files.
- No new projects/content beyond what's in the handoff bundle.
- No redesign of content/copy — copy is final per the handoff; only visual/structural recreation is in scope.
- `resume.pdf` already exists at `public/resume.pdf` in this repo — reuse it as-is (already satisfies the handoff's "wire the link" requirement).

## Architecture

### Stack changes
- Upgrade Tailwind CSS 3.4 → 4 (CSS-first `@theme` config in `app/globals.css`, remove `tailwind.config.ts`, drop `autoprefixer`/postcss config as needed for Tailwind 4's built-in pipeline).
- Keep Next.js 16 / React 19 / Framer Motion (already installed) / `clsx`.
- `next/font` for Inter as the loaded fallback in the `-apple-system, ... "Inter", sans-serif` stack.

### Design tokens (`app/globals.css` `@theme`)
```
Colors: --bg #000, --bg2 #0a0a0a, --surface #141414, --surface2 #1c1c1e,
        --text #fff, --muted rgba(255,255,255,.65), --muted2 rgba(255,255,255,.45),
        --accent #4a9eff, --accent-glow rgba(74,158,255,.14), --hairline rgba(255,255,255,.08)
Type:   Display clamp(2.75rem,7vw,6.5rem)/650/-0.03em/1.05
        H2 clamp(2rem,4vw,3.25rem)/650/-0.02em
        Body 16-19px/400/var(--muted)/1.6-1.7
        Eyebrow 12-13px/0.06-0.08em/uppercase/var(--muted2)
Spacing: 8px base scale, section padding 100-140px, content max-width 900-1200px
Radius: --radius-lg 24px, --radius-md 16px, pill 980px
Easing: entrance cubic-bezier(0.16,1,0.3,1) 500-900ms; hover cubic-bezier(0.4,0,0.2,1) 150-250ms; stagger 60-100ms, once only
```
No magic numbers in components — everything above is a Tailwind theme token, referenced by class/utility.

### Data layer (`src/data/`)
Typed, transcribed verbatim from `Portfolio.dc.html`'s data arrays:
- `impact-stats.ts` — 4 stats (7+ years, 3,500+ locations, 64% faster check-ins, 100 NPS).
- `projects.ts` — `featuredProjects` (Mavis, VehicleIQ, Encinitas Coast Highway Flowers, ranked) and `moreProjects` (Duo Mode, Knowledge Hub, React Senior Engineer Study Guide, PDF to Markdown), from `rawFeatured`/`moreProjects`.
- `experience.ts` — `experienceItems` (Webstacks, Method, Zesty.io, LeaseLabs, UCSD Bootcamp instructor, Victorise) plus the folded-in education/certs block content.
- `capabilities.ts` — `capabilityGroups` (Product engineering, State & data, Quality & reliability, AI & automation), each with title/blurb/pills.
- `testimonials.ts` — 3 quotes (Jessica Davilla, Eric Johnson, Jerome Lacote).
- `case-studies.ts` — shared shape for `/work/[slug]`, seeded with `mavis` and `vehicleiq` from the two `.dc.html` case study files (tag, title, summary, links, hero image, quick metrics (Mavis only), Problem/Approach/What I built/Outcome sections, stack pills).

Components import from these files only; no hardcoded copy in components.

### Components (`components/`)
Delete: current `Hero.tsx`, `Experience.tsx`, `Projects.tsx`, `Skills.tsx`, `Contact.tsx`, `Footer.tsx`, `Nav.tsx`.

Rebuild fresh:
- `Nav` — fixed, transparent→blurred at 40px scroll (padding 22px→14px), Work/Experience/Consulting/Contact links + Resume pill, mobile hamburger → full-screen overlay (Escape + click-outside/link close). Client component (scroll + menu state).
- `Hero` — masked two-line headline reveal, eyebrow, body, two CTA pills, cursor-following radial glow (rAF-throttled mousemove, `transform`/`opacity`/`background` only). Client component.
- `ImpactStrip` — 4-up (2-up mobile) stat grid, count-up-from-0 on IntersectionObserver entry (1400ms, easeOutCubic, once).
- `SelectedWork` — sticky showcase (3 full-viewport `position: sticky` panels for Mavis/VehicleIQ/Encinitas, two-column copy+metrics layout, radial glow) + quieter "More work" hairline list below. On small viewports, drop the sticky pin and stack normally (per handoff's responsive guidance) rather than fighting the viewport.
- `Experience` — plain hairline-divided list (not tabs), role/company/location/period/bullets/stack pills, with the education/certs `var(--surface)` rounded block folded in directly beneath.
- `Consulting` — single hairline-bordered block, RD Tech Bridge label + short copy + CTA to `#contact`.
- `Capabilities` — 4-column auto-fit grid (min 260px) of capability buckets.
- `Testimonials` — 3 stacked large pull-quotes, 80px gap.
- `Contact` — centered headline, 4-up card grid (Email click-to-copy w/ `aria-live="polite"` "Copied!", LinkedIn, GitHub, Resume PDF).
- `Footer` — single row, © year + name + 3 links.

All entrance animations: IntersectionObserver, threshold 0.15-0.2, fire once (disconnect after trigger), never replay on scroll-up. Server components by default; `"use client"` only where interaction/state requires it (Nav, Hero, animated counters/reveals).

### Case study route (`app/work/[slug]/page.tsx`)
One shared layout, `generateStaticParams` from `case-studies.ts` keys. Sticky header (back link, "Case study" label) → hero (tag/title/summary/links) → full-width hero image → optional 4-up quick-metrics (Mavis only) → Problem → Approach → What I built → Outcome → "Back to selected work" CTA. Each section fades up on scroll entry (24px translate, 700ms, cubic-bezier(0.16,1,0.3,1), once).

### Assets
- Copy the 8 screenshots from the handoff `screenshots/` folder into `public/` (or `public/images/`) and wire them in as real `next/image` usage: `portfolio-01-hero.png` through `-06-final.png` for in-page reference/OG use as applicable, `case-study-mavis.png` and `case-study-vehicleiq.png` as the case study hero images (replacing the `<image-slot>` placeholders from the prototype).
- Reuse existing `public/resume.pdf` for Resume nav pill + Contact card link.
- Regenerate or reuse `og-image.png` for Open Graph metadata.

### Metadata / SEO
Per-route `metadata` exports (root + `/work/[slug]`), Open Graph images, JSON-LD Person schema on the root layout, `sitemap.ts`, `robots.ts`.

## Accessibility & Motion
- `prefers-reduced-motion: reduce` → fully static, finished-state page: no masked reveal, no counting animation (final values immediately), no cursor glow drift, no fade-ups. Implemented via a shared `useReducedMotion` check (Framer Motion's hook) gating every animated component, plus the existing CSS `@media (prefers-reduced-motion: reduce)` blanket rule in `globals.css`.
- Semantic landmarks (`nav`, `main`, section `aria-label`s), real heading hierarchy (h1 hero → h2 section headers → h3 within), visible focus rings (`--accent`, 2px outline, 2-4px offset per element as specified in the prototype), full keyboard reachability (mobile nav overlay, Contact copy button), sufficient contrast (already satisfied by the token palette).

## Verification
- `npm run lint` and `npm run build` clean.
- Manual pass in-browser (via `/run` or dev server) covering: nav scroll/blur transition + mobile overlay, hero reveal + cursor glow, impact counters, sticky work showcase behavior (including a narrow-viewport check), experience list, contact copy-to-clipboard + `aria-live`, both case study routes, and a `prefers-reduced-motion` pass (OS-level toggle) confirming the fully static fallback.
- Lighthouse mobile performance spot-check (target 90+) on `/` after build.

## Out of Scope / Deferred
- Any content not present in the handoff bundle (no additional projects, roles, or testimonials).
- Design changes beyond what's specified — this is a high-fidelity recreation, not a new design pass.
