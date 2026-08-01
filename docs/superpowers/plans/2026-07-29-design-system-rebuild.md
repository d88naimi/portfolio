# Design System Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's entire presentation layer (theme, components, motion) with the dark cinematic design specified in `docs/superpowers/specs/2026-07-29-design-system-rebuild-design.md`, sourced from the handoff bundle at `~/Desktop/design_handoff_portfolio_rebuild/`.

**Architecture:** Next.js App Router site with a typed data layer (`src/data/*.ts`) feeding server-component sections composed in `app/page.tsx`, plus a shared `app/work/[slug]/page.tsx` case study route. Interaction (nav scroll/menu state, hero cursor glow, scroll-triggered reveals, impact counters, email copy) lives in small `"use client"` leaf components. All motion goes through Framer Motion and a shared `<Reveal>` wrapper that honors `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Framer Motion, `next/font` (Inter).

## Global Constraints

- Colors: `--bg:#000`, `--bg2:#0a0a0a`, `--surface:#141414`, `--surface2:#1c1c1e`, `--text:#fff`, `--muted:rgba(255,255,255,.65)`, `--muted2:rgba(255,255,255,.45)`, `--accent:#4a9eff`, `--accent-glow:rgba(74,158,255,.14)`, `--hairline:rgba(255,255,255,.08)`.
- Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif`, Inter loaded via `next/font`.
- Type scale: Display `clamp(2.75rem,7vw,6.5rem)` / 650 / `-0.03em` / line-height 1.05. H2 `clamp(2rem,4vw,3.25rem)` / 650 / `-0.02em`. Body 16-19px / 400 / `var(--muted)` / line-height 1.6-1.7. Eyebrow 12-13px / `0.06-0.08em` / uppercase / `var(--muted2)`.
- Spacing: 8px base scale, section vertical padding 100-140px, content max-width 900-1200px (1200px showcase/impact, 700-900px reading-width).
- Radius: `--radius-lg:24px`, `--radius-md:16px`, pills `980px`.
- Easing: entrance `cubic-bezier(0.16,1,0.3,1)` 500-900ms; hover `cubic-bezier(0.4,0,0.2,1)` 150-250ms; stagger 60-100ms per child, fires once, never replays on scroll-up.
- Tailwind CSS 4 CSS-first `@theme` config; no `tailwind.config.ts`; no magic numbers in components — colors/radius/easing come from theme tokens, one-off clamp type scales use Tailwind arbitrary-value utilities.
- Framer Motion is the only animation library.
- All content lives in `src/data/*.ts`; components never hardcode copy.
- Server components by default; `"use client"` only where interaction/state requires it.
- `prefers-reduced-motion: reduce` must produce the fully static, finished-state page everywhere (no masked reveal, no counting animation, no cursor glow drift, no fade-ups).
- Animate only `transform`/`opacity`/`background` — never layout properties.
- IntersectionObserver / `whileInView` reveals: threshold/amount 0.15-0.2, fire once, disconnect after trigger.
- No test runner is configured in this repo (no jest/vitest, no `test` script in `package.json`). "Tests" in this plan mean: `npx tsc --noEmit`, `npm run lint`, `npm run build`, and a manual dev-server check of the described behavior — run these instead of unit tests for every task.

---

## File Structure

```
app/
  globals.css              # Tailwind 4 @theme tokens + base styles (rewritten)
  layout.tsx                # Inter font, metadata, JSON-LD Person schema (rewritten)
  page.tsx                  # Section assembly (rewritten)
  sitemap.ts                # new
  robots.ts                 # new
  work/[slug]/page.tsx       # new — case study route
components/
  Nav.tsx                    # rewritten (client)
  Hero.tsx                    # rewritten (client)
  ImpactStrip.tsx            # rewritten (client)
  SelectedWork.tsx            # rewritten (server, delegates reveal to Reveal/client leaves)
  Experience.tsx               # rewritten (server)
  Consulting.tsx                # new (server)
  Capabilities.tsx               # rewritten (server)
  Testimonials.tsx                 # new (server)
  Contact.tsx                       # rewritten (client — copy button)
  Footer.tsx                         # rewritten (server)
  motion/Reveal.tsx                   # new (client) — shared scroll-reveal wrapper
src/
  data/
    impact-stats.ts                   # new
    projects.ts                        # new
    experience.ts                       # new
    capabilities.ts                      # new
    testimonials.ts                       # new
    case-studies.ts                        # new
  lib/
    format.ts                               # new — number formatting for counters
public/
  resume.pdf                                # already exists, reused as-is
  og-image.png                              # copied from handoff bundle
```

Old files deleted in this plan: `components/Contact.tsx`, `components/Experience.tsx`, `components/Footer.tsx`, `components/Hero.tsx`, `components/Nav.tsx`, `components/Projects.tsx`, `components/Skills.tsx`, `tailwind.config.ts`, `postcss.config.js` (replaced by Tailwind 4's PostCSS plugin config), `app/not-found.tsx` (rewritten in dark theme, not deleted).

---

### Task 1: Upgrade to Tailwind CSS 4 and set the dark design-token theme

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.js`
- Delete: `tailwind.config.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: Tailwind utilities driven by `@theme` tokens — `bg-bg`, `bg-bg2`, `bg-surface`, `bg-surface2`, `text-text`, `text-muted`, `text-muted2`, `text-accent`, `border-hairline`, `rounded-lg` (24px), `rounded-md` (16px), `rounded-pill` (980px), `ease-entrance`, `ease-hover` (as CSS var `--ease-entrance`/`--ease-hover`, used via arbitrary `transition-[...]` utilities), `font-sans` (Inter stack).
- Consumes: nothing (first task).

- [ ] **Step 1: Install Tailwind CSS 4 and remove the old Tailwind 3 toolchain**

Run:
```bash
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4
npm uninstall autoprefixer
```

- [ ] **Step 2: Replace `postcss.config.js` with the Tailwind 4 plugin**

```js
// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 3: Delete `tailwind.config.ts`**

```bash
rm tailwind.config.ts
```

- [ ] **Step 4: Rewrite `app/globals.css` with the dark token theme**

```css
@import "tailwindcss";

@theme {
  --color-bg: #000000;
  --color-bg2: #0a0a0a;
  --color-surface: #141414;
  --color-surface2: #1c1c1e;
  --color-text: #ffffff;
  --color-muted: rgba(255, 255, 255, 0.65);
  --color-muted2: rgba(255, 255, 255, 0.45);
  --color-accent: #4a9eff;
  --color-accent-glow: rgba(74, 158, 255, 0.14);
  --color-hairline: rgba(255, 255, 255, 0.08);

  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 980px;

  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-hover: cubic-bezier(0.4, 0, 0.2, 1);

  --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont,
    "SF Pro Display", sans-serif;
}

html {
  background: var(--color-bg);
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

a {
  color: var(--color-accent);
}

::selection {
  background: var(--color-accent);
  color: #000;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: 0.75rem;
  top: -3rem;
  z-index: 100;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-hairline);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: var(--radius-md);
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 5: Verify the build picks up Tailwind 4**

Run: `npm run build`
Expected: build succeeds with no Tailwind/PostCSS errors (component files still reference old classes at this point in the plan — that's fine, they get rewritten in later tasks; the goal here is confirming the CSS pipeline itself compiles).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json postcss.config.js app/globals.css
git rm tailwind.config.ts
git commit -m "Upgrade to Tailwind CSS 4 and set dark design-token theme"
```

---

### Task 2: Root layout — Inter font, metadata, JSON-LD Person schema

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `--font-sans` token from Task 1 (references `var(--font-inter)`).
- Produces: `metadata` export consumed implicitly by Next.js for `/`; the `<body>` wraps `{children}` with a skip link and `id="main-content"` target that `app/page.tsx` (Task 20) will provide on `<main>`.

- [ ] **Step 1: Read the current `app/layout.tsx`**

Run: `cat app/layout.tsx` — confirm current structure (imports, `RootLayout` signature) before replacing.

- [ ] **Step 2: Rewrite `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidnaimi.dev"),
  title: "David Naimi — Senior Frontend Engineer",
  description:
    "David Naimi is a senior frontend engineer in San Marcos, CA with 7 years of experience building React and Next.js products, from a check-in platform running across 3,500+ retail locations to AI powered tools.",
  openGraph: {
    title: "David Naimi — Senior Frontend Engineer",
    description:
      "Senior frontend engineer building React and Next.js products that ship. Available for new roles.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Naimi — Senior Frontend Engineer",
    description:
      "Senior frontend engineer building React and Next.js products that ship.",
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Naimi",
  jobTitle: "Senior Frontend Engineer",
  url: "https://davidnaimi.dev",
  email: "mailto:d88naimi@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Marcos",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: ["https://linkedin.com/in/davidnaimi", "https://github.com/d88naimi"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Engineering",
    "AI Integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: no type errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "Rewrite root layout with Inter font, metadata, and Person JSON-LD"
```

---

### Task 3: Data layer — impact stats

**Files:**
- Create: `src/data/impact-stats.ts`

**Interfaces:**
- Produces:
```ts
export type ImpactStat = {
  key: "years" | "locations" | "checkins" | "nps";
  target: number;
  suffix: string;
  format: "plain" | "comma";
  label: string;
};
export const impactStats: ImpactStat[];
```

- [ ] **Step 1: Create the data file**

```ts
// src/data/impact-stats.ts
export type ImpactStat = {
  key: "years" | "locations" | "checkins" | "nps";
  target: number;
  suffix: string;
  format: "plain" | "comma";
  label: string;
};

export const impactStats: ImpactStat[] = [
  { key: "years", target: 7, suffix: "+", format: "plain", label: "Years experience" },
  { key: "locations", target: 3500, suffix: "+", format: "comma", label: "Locations shipped" },
  { key: "checkins", target: 64, suffix: "%", format: "plain", label: "Faster check-ins" },
  { key: "nps", target: 100, suffix: "", format: "plain", label: "NPS score" },
];
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/impact-stats.ts
git commit -m "Add impact stats data"
```

---

### Task 4: Data layer — number formatting utility

**Files:**
- Create: `src/lib/format.ts`

**Interfaces:**
- Consumes: `ImpactStat["format"]` type from Task 3.
- Produces: `export function formatCount(n: number, format: "plain" | "comma"): string`, used by `ImpactStrip` (Task 12).

- [ ] **Step 1: Create the utility with an inline sanity check**

```ts
// src/lib/format.ts
export function formatCount(n: number, format: "plain" | "comma"): string {
  return format === "comma" ? Math.round(n).toLocaleString("en-US") : String(Math.round(n));
}
```

- [ ] **Step 2: Verify manually**

Run:
```bash
node -e "
const { formatCount } = require('ts-node/register') && {};
" 2>/dev/null; npx tsx -e "
import { formatCount } from './src/lib/format';
console.assert(formatCount(3500, 'comma') === '3,500', 'comma failed');
console.assert(formatCount(64, 'plain') === '64', 'plain failed');
console.log('ok');
"
```
Expected: prints `ok` with no assertion failures. (If `tsx` isn't available, run `npx --yes tsx -e "..."` — it installs on demand.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/format.ts
git commit -m "Add impact counter number formatting utility"
```

---

### Task 5: Data layer — projects (featured + more work)

**Files:**
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces:
```ts
export type ProjectMetric = { value: string; label: string };
export type FeaturedProject = {
  slug: "mavis" | "vehicleiq" | "encinitas-flowers";
  label: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  caseStudyHref: string | null;
  liveHref: string | null;
  githubHref: string | null;
  metrics: ProjectMetric[];
};
export type MoreProject = { title: string; summary: string; href: string; linkLabel: string };
export const featuredProjects: FeaturedProject[];
export const moreProjects: MoreProject[];
```
- Consumed by: `SelectedWork` (Task 13), `case-studies.ts` (Task 8, for cross-linking `slug`).

- [ ] **Step 1: Create the data file, transcribed verbatim from `Portfolio.dc.html`'s `rawFeatured`/`moreProjects` arrays**

```ts
// src/data/projects.ts
export type ProjectMetric = { value: string; label: string };

export type FeaturedProject = {
  slug: "mavis" | "vehicleiq" | "encinitas-flowers";
  label: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  caseStudyHref: string | null;
  liveHref: string | null;
  githubHref: string | null;
  metrics: ProjectMetric[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "mavis",
    label: "Mavis Check-In Dashboard",
    tag: "Method · 01",
    title: "Mavis Check-In Dashboard",
    description:
      "A customer check-in platform deployed across 3,500+ Mavis Discount Tire locations nationwide. I led the frontend build end to end, from Figma to production monitoring.",
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind", "Datadog", "Sentry"],
    caseStudyHref: "/work/mavis",
    liveHref: null,
    githubHref: null,
    metrics: [
      { value: "3,500+", label: "Locations running the platform" },
      { value: "64%", label: "Faster customer check-ins" },
      { value: "40%", label: "Increase in self-service adoption" },
    ],
  },
  {
    slug: "vehicleiq",
    label: "VehicleIQ",
    tag: "Personal · 02",
    title: "VehicleIQ",
    description:
      "An AI-powered vehicle research and comparison tool. Search any car, get a streaming Claude-powered breakdown, compare vehicles side by side, and export a service quote as a PDF.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Anthropic Claude"],
    caseStudyHref: "/work/vehicleiq",
    liveHref: "https://drivra.vercel.app/",
    githubHref: "https://github.com/d88naimi/vehicle-research",
    metrics: [
      { value: "Claude", label: "Streaming AI research chat" },
      { value: "3", label: "Vehicles compared side by side" },
      { value: "PDF", label: "Auto-generated service quotes" },
    ],
  },
  {
    slug: "encinitas-flowers",
    label: "Encinitas Coast Highway Flowers",
    tag: "Client · 03",
    title: "Encinitas Coast Highway Flowers",
    description:
      "A production florist site built for a real small business, with fully owner-editable content so the shop can update products and photos without touching code.",
    stack: ["Next.js 16", "TypeScript", "Tailwind", "Sanity CMS", "Swiper"],
    caseStudyHref: null,
    liveHref: "https://www.encinitascoastflowers.com/",
    githubHref: "https://github.com/Encinitas-Coast-Highway-Flowers/encinitas-flowers",
    metrics: [
      { value: "Sanity", label: "Owner-editable CMS content" },
      { value: "Next 16", label: "Built on the latest App Router" },
      { value: "Live", label: "Serving real customers today" },
    ],
  },
];

export type MoreProject = {
  title: string;
  summary: string;
  href: string;
  linkLabel: string;
};

export const moreProjects: MoreProject[] = [
  {
    title: "Duo Mode",
    summary:
      "Shipped product feature for Zesty.io CMS enabling dual content management views, owned end to end from wireframes to production.",
    href: "https://www.zesty.io/",
    linkLabel: "Live",
  },
  {
    title: "Knowledge Hub",
    summary:
      "Full-stack knowledge-sharing app for articles, code snippets, and learning resources. Next.js 16, NextAuth.js, Supabase.",
    href: "https://knowledge-sharing-app-gold.vercel.app/",
    linkLabel: "Live",
  },
  {
    title: "React Senior Engineer Study Guide",
    summary:
      "Interactive study app covering 13 core React pattern categories, with live working examples for interview prep.",
    href: "https://reactstudyguide.vercel.app/",
    linkLabel: "Live",
  },
  {
    title: "PDF to Markdown",
    summary:
      "A drag-and-drop tool that converts any PDF into Markdown instantly, with live preview and one-click download.",
    href: "https://pdf-to-markdown-roan.vercel.app/",
    linkLabel: "Live",
  },
];
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "Add featured and more-work projects data"
```

---

### Task 6: Data layer — experience, education, certifications

**Files:**
- Create: `src/data/experience.ts`

**Interfaces:**
- Produces:
```ts
export type ExperienceItem = {
  role: string; company: string; location: string; period: string;
  highlights: string[]; stack: string[];
};
export type EducationItem = { title: string; detail: string };
export const experienceItems: ExperienceItem[];
export const educationItems: EducationItem[];
export const certifications: string[];
```
- Consumed by: `Experience` (Task 14).

- [ ] **Step 1: Create the data file, transcribed verbatim from `Portfolio.dc.html`'s `experienceItems`/`educationItems`/`certifications`**

```ts
// src/data/experience.ts
export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  stack: string[];
};

export const experienceItems: ExperienceItem[] = [
  {
    role: "Software Engineer / Consultant",
    company: "Webstacks",
    location: "Remote",
    period: "May 2026 — Present",
    highlights: [
      "Build customer facing marketing sites for B2B SaaS, fintech, and AI clients in a Next.js monorepo with shared UI libraries, deployed on Vercel",
      "Design Sanity CMS schemas and structured content models so client marketing teams can ship pages without engineering support",
      "Improved page load time and Largest Contentful Paint by 30% through frontend performance work",
      "Lead code review across multiple client codebases and onboard contractors onto project conventions",
    ],
    stack: ["React", "Next.js", "TypeScript", "Sanity CMS", "Tailwind", "Vercel"],
  },
  {
    role: "Senior Software Engineer / Consultant",
    company: "Method",
    location: "Remote",
    period: "Jul 2022 — May 2026",
    highlights: [
      "Led frontend engineering for a customer check in dashboard deployed to 3,500+ Mavis Discount Tire locations, built from the ground up",
      "Reduced customer check in time by 64% through workflow redesign and optimized API integration",
      "Built reusable hooks and components to standardize data fetching, raising developer velocity across the team",
      "Shipped a fully typed Next.js i18n localization feature that let Spanish speaking users track their work independently",
      "Wrote integration and unit tests with Playwright and monitored production health with Datadog",
    ],
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind", "Playwright", "Datadog"],
  },
  {
    role: "Front End Engineer",
    company: "Zesty.io",
    location: "San Diego, CA",
    period: "Aug 2020 — Aug 2022",
    highlights: [
      "Designed and delivered Duo Mode, a major product feature, owning it from wireframes to production",
      "Built a productivity analytics dashboard with React and Chart.js, increasing internal engagement by 20%",
      "Maintained an in house design system using atomic design methodology for consistent UI patterns",
      "Refactored a legacy codebase from class components to functional components with hooks",
    ],
    stack: ["React", "Redux", "JavaScript", "Chart.js", "Less", "Cypress"],
  },
  {
    role: "Web Developer",
    company: "LeaseLabs by RealPage",
    location: "San Diego, CA",
    period: "Feb 2018 — Feb 2020",
    highlights: [
      "Built CMS editable single page and multi page websites with Foundation, Ruby, Haml, and SASS",
      "Refactored frontend codebases to meet ADA and WCAG accessibility standards",
      "Improved team efficiency with Gulp hot reload tasks and internal coding workshops, and mentored junior developers",
    ],
    stack: ["JavaScript", "jQuery", "SASS", "Ruby", "Haml", "Foundation"],
  },
  {
    role: "Associate Instructor",
    company: "UC San Diego Coding Bootcamp",
    location: "San Diego, CA",
    period: "Dec 2017 — Aug 2020",
    highlights: [
      "Taught a full stack curriculum including JavaScript, React, Node.js, Express, MongoDB, and MySQL",
      "Mentored students through code reviews, debugging sessions, and architecture discussions",
      "Earned a Net Promoter Score of 100, exceeding all instructional benchmarks",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "MySQL"],
  },
  {
    role: "Software Engineer Intern",
    company: "Victorise",
    location: "Carlsbad, CA",
    period: "Sep 2017 — Dec 2017",
    highlights: [
      "Engineered an app cache clearing feature in Ionic, improving stability and reducing stale data issues",
      "Partnered with senior engineers to architect core functionality protocols, accelerating feature delivery",
      "Worked with the team on analysis, design, and implementation of a mobile web app using Angular and Ionic",
    ],
    stack: ["Ionic", "Angular", "JavaScript"],
  },
];

export type EducationItem = { title: string; detail: string };

export const educationItems: EducationItem[] = [
  { title: "California State University, Fullerton", detail: "BA, Business Administration, Marketing emphasis" },
  { title: "UC San Diego Extension", detail: "Full Stack Web Development Bootcamp, 2017" },
  { title: "Overclock Accelerator", detail: "AI Operations Accelerator, in progress" },
];

export const certifications: string[] = [
  "Microsoft Azure Fundamentals (AZ-900)",
  "Modern React with Redux",
  "React: The Complete Guide",
  "JavaScript: Understanding the Weird Parts",
  "Advanced CSS and Sass",
  "The Web Developer Bootcamp",
];
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/experience.ts
git commit -m "Add experience, education, and certifications data"
```

---

### Task 7: Data layer — capabilities and testimonials

**Files:**
- Create: `src/data/capabilities.ts`
- Create: `src/data/testimonials.ts`

**Interfaces:**
- Produces:
```ts
// capabilities.ts
export type CapabilityGroup = { title: string; blurb: string; skills: string[] };
export const capabilityGroups: CapabilityGroup[];

// testimonials.ts
export type Testimonial = { quote: string; author: string; role: string };
export const testimonials: Testimonial[];
```
- Consumed by: `Capabilities` (Task 16), `Testimonials` (Task 17).

- [ ] **Step 1: Create `src/data/capabilities.ts`**

```ts
// src/data/capabilities.ts
export type CapabilityGroup = {
  title: string;
  blurb: string;
  skills: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Product engineering",
    blurb: "I build the interface layer end to end, from design handoff to a shipped, typed, tested component.",
    skills: ["React", "TypeScript", "Next.js", "JavaScript ES6+", "Tailwind", "Material UI", "SASS", "Storybook", "Design systems"],
  },
  {
    title: "State & data",
    blurb: "Wiring the interface to real data without turning the codebase into a maze.",
    skills: ["Zustand", "Redux", "useSWR", "Axios", "REST APIs", "Node.js", "Express", "Supabase", "PostgreSQL", "Sanity CMS"],
  },
  {
    title: "Quality & reliability",
    blurb: "Shipping fast only matters if it stays up. I test, monitor, and fix before users notice.",
    skills: ["Playwright", "Cypress", "Datadog", "Sentry", "Git", "Figma", "Vercel"],
  },
  {
    title: "AI & automation",
    blurb: "Using AI tools to move faster without lowering the bar, and building AI features clients can actually use.",
    skills: ["Anthropic Claude", "OpenAI API", "Prompt engineering", "Model Context Protocol", "GitHub Copilot"],
  },
];
```

- [ ] **Step 2: Create `src/data/testimonials.ts`**

```ts
// src/data/testimonials.ts
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "David is an approachable and thoughtful engineer who's always pushing himself to keep learning and sharpening his skills. He consistently asks insightful questions and brings thoughtful suggestions to improve our team's workflow. Any team would be lucky to have him.",
    author: "Jessica Davilla",
    role: "Senior Software Engineer, Method",
  },
  {
    quote:
      "Patient, communicative, and respected. David excelled as a student in our bootcamp and transitioned into a reliable, knowledgeable teaching assistant. He exudes confidence and is always willing to go the extra mile.",
    author: "Eric Johnson",
    role: "Program Manager, UCSD Extension",
  },
  {
    quote:
      "David quickly mastered a complex pipeline and refactored large portions of our codebase to get our app ready for App Store submission. He is a self starter, a hard worker, and a leader.",
    author: "Jerome Lacote",
    role: "Entrepreneur Developer, Victorise",
  },
];
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/capabilities.ts src/data/testimonials.ts
git commit -m "Add capabilities and testimonials data"
```

---

### Task 8: Data layer — case studies (shared shape for /work/[slug])

**Files:**
- Create: `src/data/case-studies.ts`

**Interfaces:**
- Produces:
```ts
export type CaseStudyMetric = { value: string; label: string };
export type CaseStudySection = { eyebrow: string; lede: string; body: string };
export type CaseStudy = {
  slug: "mavis" | "vehicleiq";
  tag: string;
  title: string;
  summary: string;
  liveHref: string | null;
  githubHref: string | null;
  heroMetrics: CaseStudyMetric[] | null;
  problem: CaseStudySection;
  approach: CaseStudySection;
  builtItems: string[];
  stack: string[];
  outcome: CaseStudySection;
};
export const caseStudies: Record<"mavis" | "vehicleiq", CaseStudy>;
```
- Consumed by: `app/work/[slug]/page.tsx` (Task 22).

- [ ] **Step 1: Create the data file, transcribed verbatim from both `.dc.html` case study prototypes**

```ts
// src/data/case-studies.ts
export type CaseStudyMetric = { value: string; label: string };

export type CaseStudySection = {
  eyebrow: string;
  lede: string;
  body: string;
};

export type CaseStudy = {
  slug: "mavis" | "vehicleiq";
  tag: string;
  title: string;
  summary: string;
  liveHref: string | null;
  githubHref: string | null;
  heroMetrics: CaseStudyMetric[] | null;
  problem: CaseStudySection;
  approach: CaseStudySection;
  builtItems: string[];
  stack: string[];
  outcome: CaseStudySection;
};

export const caseStudies: Record<"mavis" | "vehicleiq", CaseStudy> = {
  mavis: {
    slug: "mavis",
    tag: "Method · Production",
    title: "Mavis Check-In Dashboard",
    summary:
      "A customer check-in platform I helped design and build from the ground up, now running across 3,500+ Discount Tire locations nationwide.",
    liveHref: null,
    githubHref: null,
    heroMetrics: [
      { value: "3,500+", label: "Locations running the platform" },
      { value: "64%", label: "Faster check-ins" },
      { value: "40%", label: "Self-service adoption increase" },
      { value: "+5/day", label: "Jobs freed up via i18n" },
    ],
    problem: {
      eyebrow: "The problem",
      lede: "Mavis needed a faster, more consistent way for customers to check in for service across thousands of locations.",
      body: "The existing process varied store to store, leaned on staff to manually walk every customer through it, and gave no way for customers to help themselves. That meant longer waits, inconsistent experiences, and more load on already busy service desks.",
    },
    approach: {
      eyebrow: "My approach",
      lede: "Translate the Figma designs into a fast, accessible interface, then build the plumbing so it could scale to thousands of stores.",
      body: "I worked directly from Figma to build pixel accurate, responsive interfaces, then focused on the parts that don't show up in a screenshot: standardized data fetching through reusable hooks, a state layer in Zustand that stayed predictable as the feature set grew, and accessibility built in from the start rather than retrofitted.",
    },
    builtItems: [
      "A staff-facing dashboard and a self-service customer check-in flow, both built from Figma to production",
      "Reusable hooks and components that standardized data fetching across the app",
      "A fully typed Next.js i18n localization feature for Spanish speaking customers",
      "Accessible components with ARIA labeling and semantic HTML, meeting WCAG standards",
      "Integration and unit tests with Playwright, plus production monitoring with Datadog and Sentry",
    ],
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind", "Playwright", "Datadog", "Sentry"],
    outcome: {
      eyebrow: "Outcome",
      lede: "The dashboard now runs in production across every Mavis Discount Tire location, and it's still the platform staff and customers use every day.",
      body: "Check-in time dropped 64%, self-service adoption rose 40%, and a later localization pass let Spanish speaking customers track their own service independently, freeing staff time equal to five extra service jobs a day. I still monitor the app's health in production with Datadog and Sentry.",
    },
  },
  vehicleiq: {
    slug: "vehicleiq",
    tag: "Personal project · Production",
    title: "VehicleIQ",
    summary:
      "An AI-powered vehicle research and comparison tool with a streaming Claude-powered chat and PDF export.",
    liveHref: "https://drivra.vercel.app/",
    githubHref: "https://github.com/d88naimi/vehicle-research",
    heroMetrics: null,
    problem: {
      eyebrow: "The problem",
      lede: "Researching a car means a dozen open tabs, no easy way to compare, and no fast way to estimate what a repair should cost.",
      body: "Reviews, forums, and spec sheets live in different places, written for different audiences. Comparing two or three cars side by side means juggling all of it yourself, and getting a rough service quote usually means calling a shop and waiting.",
    },
    approach: {
      eyebrow: "My approach",
      lede: "Put an AI research assistant in front of the tabs, not another tab to add to the pile.",
      body: "I built a Next.js app around a streaming chat interface powered by Anthropic's Claude API, so answers arrive token by token instead of after a long wait. Around that core I added AI-curated review and article search, a side-by-side comparison view, and a quote generator that turns a plain description of symptoms into a service estimate.",
    },
    builtItems: [
      "A streaming chat interface powered by the Anthropic Claude API, with token-by-token responses",
      "AI-curated review and article search for any vehicle a user searches",
      "A side-by-side comparison view for up to three vehicles at once",
      "A service quote generator that turns a symptom description into a PDF estimate",
      "A responsive Tailwind interface built for fast, unglamorous research sessions",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Anthropic Claude"],
    outcome: {
      eyebrow: "Outcome",
      lede: "VehicleIQ is live and in active use for real vehicle research and comparisons.",
      body: "It's the project I point to when someone asks what I can do with an AI API beyond a chatbot: real tool integration, streaming UX done right, and a comparison and quoting flow that saves the back-and-forth of manual research.",
    },
  },
};
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/case-studies.ts
git commit -m "Add case studies data for /work/[slug]"
```

---

### Task 9: Shared `<Reveal>` scroll-motion wrapper

**Files:**
- Create: `components/motion/Reveal.tsx`

**Interfaces:**
- Consumes: `framer-motion` (`motion`, `useReducedMotion`).
- Produces:
```tsx
type RevealProps = {
  children: React.ReactNode;
  delayMs?: number;      // stagger delay, default 0
  y?: number;             // translate distance in px, default 24
  className?: string;
  as?: "div" | "li";      // element type, default "div"
};
export default function Reveal(props: RevealProps): JSX.Element;
```
Used by every section component from Task 10 onward for scroll-triggered fade-up reveals (threshold/amount 0.15-0.2, fires once).

- [ ] **Step 1: Create the component**

```tsx
// components/motion/Reveal.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
};

export default function Reveal({
  children,
  delayMs = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : delayMs / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/motion/Reveal.tsx
git commit -m "Add shared Reveal scroll-motion wrapper"
```

---

### Task 10: Nav component

**Files:**
- Delete: `components/Nav.tsx` (old light-theme version)
- Create: `components/Nav.tsx` (new dark-theme version)

**Interfaces:**
- Consumes: nothing from data layer (links are static).
- Produces: default export `Nav` rendered once in `app/page.tsx` (Task 20).

- [ ] **Step 1: Read the old `components/Nav.tsx` to confirm nothing besides styling needs preserving**

Run: `cat components/Nav.tsx`

- [ ] **Step 2: Replace `components/Nav.tsx` in full**

```tsx
// components/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#consulting", label: "Consulting" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-[1200px] border-b transition-[background,border-color,padding] duration-300 ease-[var(--ease-hover)] ${
          scrolled
            ? "bg-[rgba(10,10,10,0.72)] backdrop-blur-[20px] border-hairline py-3.5"
            : "bg-transparent border-transparent py-[22px]"
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-8"
        >
          <a href="#hero" className="text-base font-semibold tracking-[-0.01em] text-text">
            David Naimi
          </a>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-hairline px-[18px] py-[9px] text-[13px] text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Resume
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <span className="block h-px w-5 bg-text" />
            <span className="my-[5px] block h-px w-5 bg-text" />
            <span className="block h-px w-5 bg-text" />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[rgba(0,0,0,0.97)] backdrop-blur-[20px]"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="text-[28px] font-semibold tracking-[-0.02em] text-text"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="mt-3 rounded-pill border border-hairline px-6 py-3 text-[15px] text-text"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 p-2 text-[28px] text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            &#10005;
          </button>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Then run `npm run dev` and manually confirm: nav is transparent at top, gains blur/hairline/padding change past 40px scroll, mobile viewport (< 768px) shows hamburger, opens full-screen overlay, Escape and the × button close it.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx
git commit -m "Rebuild Nav for dark cinematic theme"
```

---

### Task 11: Hero component

**Files:**
- Delete/replace: `components/Hero.tsx`

**Interfaces:**
- Consumes: nothing from data layer (copy is fixed hero content, per spec's single fixed headline — not iterated from a data file since there's exactly one hero).
- Produces: default export `Hero` rendered in `app/page.tsx` (Task 20), section `id="hero"`.

- [ ] **Step 1: Replace `components/Hero.tsx` in full**

```tsx
// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LINES = ["Frontend engineering,", "built like it matters."];

export default function Hero() {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [pos, setPos] = useState({ mx: 0.5, my: 0.5 });
  const rafPending = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), reduced ? 0 : 150);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        setPos({ mx: e.clientX / window.innerWidth, my: e.clientY / window.innerHeight });
        rafPending.current = false;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const glowX = 30 + pos.mx * 40;
  const glowY = 20 + pos.my * 30;

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 pb-[100px] pt-[160px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, var(--color-accent-glow), transparent 60%)`,
          opacity: revealed ? 1 : 0,
          transition: reduced ? "none" : "opacity 900ms ease, background 300ms linear",
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-2.5"
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[13px] uppercase tracking-[0.08em] text-muted2">
            San Marcos, CA &middot; Available for new roles
          </span>
        </motion.div>

        <h1 className="m-0 mb-7 max-w-[900px] text-[clamp(2.75rem,7vw,6.5rem)] font-[650] leading-[1.05] tracking-[-0.03em] text-text">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em] pt-[0.2em] -mt-[0.2em]">
              <motion.span
                className="inline-block will-change-transform"
                initial={reduced ? false : { y: "110%", opacity: 0 }}
                animate={revealed ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : (i * 90) / 1000,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-[560px] text-lg leading-[1.6] text-muted"
        >
          Seven years shipping React and Next.js products for real customers, from a check-in
          platform running across 3,500 stores to AI tools people actually use. I care about the
          details most teams skip.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="rounded-pill bg-text px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity duration-200 ease-[var(--ease-hover)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          >
            View the work
          </a>
          <a
            href="#contact"
            className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Then `npm run dev` and confirm: headline masks in from below on load, eyebrow/body/CTAs fade up staggered after, glow follows cursor at low intensity. Toggle OS reduced-motion and confirm everything renders instantly in final state with no glow drift.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "Rebuild Hero with masked headline reveal and cursor glow"
```

---

### Task 12: ImpactStrip component

**Files:**
- Create: `components/ImpactStrip.tsx`

**Interfaces:**
- Consumes: `impactStats` from `src/data/impact-stats.ts` (Task 3), `formatCount` from `src/lib/format.ts` (Task 4).
- Produces: default export `ImpactStrip`, rendered in `app/page.tsx` (Task 20) directly after Hero.

- [ ] **Step 1: Create the component**

```tsx
// components/ImpactStrip.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { impactStats } from "@/src/data/impact-stats";
import { formatCount } from "@/src/lib/format";

export default function ImpactStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(impactStats.map((s) => [s.key, reduced ? s.target : 0]))
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCounts(Object.fromEntries(impactStats.map((s) => [s.key, s.target])));
      return;
    }
    const controls = impactStats.map((stat) =>
      animate(0, stat.target, {
        duration: 1.4,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (value) => {
          setCounts((prev) => ({ ...prev, [stat.key]: value }));
        },
      })
    );
    return () => controls.forEach((c) => c.stop());
  }, [inView, reduced]);

  return (
    <section aria-label="Impact" className="mx-auto max-w-[1200px] px-6 py-[100px]">
      <div ref={ref} className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-8">
        {impactStats.map((stat) => (
          <div key={stat.key} className="text-center">
            <div className="mb-2 text-[clamp(2.25rem,5vw,3.5rem)] font-[650] tracking-[-0.02em] text-text [font-variant-numeric:tabular-nums]">
              {formatCount(counts[stat.key], stat.format)}
              {stat.suffix}
            </div>
            <div className="text-[13px] uppercase tracking-[0.04em] text-muted2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, scroll to the impact strip, confirm all 4 numbers count up once (7+, 3,500+, 64%, 100) and don't replay on scrolling back up. With reduced motion on, confirm they render final values immediately.

- [ ] **Step 3: Commit**

```bash
git add components/ImpactStrip.tsx
git commit -m "Add ImpactStrip with count-up-on-scroll stats"
```

---

### Task 13: SelectedWork component (sticky showcase + more work list)

**Files:**
- Delete: `components/Projects.tsx`
- Create: `components/SelectedWork.tsx`

**Interfaces:**
- Consumes: `featuredProjects`, `moreProjects` from `src/data/projects.ts` (Task 5); `Reveal` from `components/motion/Reveal.tsx` (Task 9).
- Produces: default export `SelectedWork`, rendered in `app/page.tsx` (Task 20), contains `id="work"` on its header section.

- [ ] **Step 1: Delete the old component**

```bash
git rm components/Projects.tsx
```

- [ ] **Step 2: Create `components/SelectedWork.tsx`**

```tsx
// components/SelectedWork.tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { featuredProjects, moreProjects } from "@/src/data/projects";

export default function SelectedWork() {
  return (
    <>
      <section id="work" aria-label="Selected work" className="mx-auto max-w-[1200px] px-6 pb-10 pt-[60px]">
        <Reveal className="mb-6">
          <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Selected work</div>
          <h2 className="m-0 max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
            Three shipped products, told in depth.
          </h2>
        </Reveal>
      </section>

      <section aria-label="Featured projects" className="relative">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="sticky top-0 flex h-screen items-center overflow-hidden bg-bg"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(900px circle at 15% 50%, var(--color-accent-glow), transparent 55%)",
              }}
            />
            <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
              <div>
                <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-accent">{project.tag}</div>
                <h3 className="m-0 mb-5 text-[clamp(1.75rem,3.2vw,2.75rem)] font-[650] leading-[1.1] tracking-[-0.02em] text-text">
                  {project.title}
                </h3>
                <p className="m-0 mb-7 max-w-[480px] text-base leading-[1.65] text-muted">
                  {project.description}
                </p>
                <div className="mb-7 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-pill border border-hairline px-3 py-1.5 text-xs text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  {project.caseStudyHref && (
                    <Link
                      href={project.caseStudyHref}
                      className="border-b border-hairline pb-0.5 text-sm font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-accent hover:text-accent"
                    >
                      Read the case study &#8594;
                    </Link>
                  )}
                  {project.liveHref && (
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-text"
                    >
                      Live &#8599;
                    </a>
                  )}
                  {project.githubHref && (
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-text"
                    >
                      GitHub &#8599;
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-surface px-10 py-12">
                <div className="flex flex-col gap-8">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="mb-1.5 text-[clamp(2rem,4vw,3rem)] font-[650] tracking-[-0.02em] text-accent [font-variant-numeric:tabular-nums]">
                        {metric.value}
                      </div>
                      <div className="text-sm leading-[1.4] text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section aria-label="More projects" className="mx-auto max-w-[900px] px-6 pb-[140px] pt-[120px]">
        <Reveal className="mb-10">
          <div className="text-[13px] uppercase tracking-[0.08em] text-muted2">More work</div>
        </Reveal>
        <div>
          {moreProjects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-t border-hairline py-7 no-underline transition-[padding-left] duration-[250ms] ease-[var(--ease-hover)] hover:pl-3"
            >
              <div className="min-w-0">
                <div className="mb-1.5 text-lg font-semibold tracking-[-0.01em] text-text">{project.title}</div>
                <div className="max-w-[560px] text-sm leading-[1.5] text-muted">{project.summary}</div>
              </div>
              <div className="flex-shrink-0 whitespace-nowrap text-[13px] text-muted2">
                {project.linkLabel} &#8599;
              </div>
            </a>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, scroll through Selected Work: confirm the three panels pin in sequence (Mavis → VehicleIQ → Encinitas) on desktop, check on a narrow viewport (375-428px) that the sticky pin doesn't fight the layout — if it visually breaks on mobile (content clipped/unreadable), add a `md:` prefix to `sticky`/`h-screen` so panels stack normally below `md`, and re-verify.

- [ ] **Step 4: Commit**

```bash
git add components/SelectedWork.tsx
git commit -m "Add SelectedWork sticky showcase and more-work list"
```

---

### Task 14: Experience component (with folded-in education/certs)

**Files:**
- Delete: `components/Experience.tsx` (old)
- Create: `components/Experience.tsx` (new)

**Interfaces:**
- Consumes: `experienceItems`, `educationItems`, `certifications` from `src/data/experience.ts` (Task 6); `Reveal` (Task 9).
- Produces: default export `Experience`, rendered in `app/page.tsx` (Task 20), section `id="experience"`.

- [ ] **Step 1: Replace `components/Experience.tsx` in full**

```tsx
// components/Experience.tsx
import Reveal from "@/components/motion/Reveal";
import { certifications, educationItems, experienceItems } from "@/src/data/experience";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="mx-auto max-w-[900px] px-6 pb-[100px] pt-[140px]">
      <Reveal className="mb-16">
        <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Experience</div>
        <h2 className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
          Where I&rsquo;ve worked.
        </h2>
      </Reveal>

      <div>
        {experienceItems.map((job, i) => (
          <Reveal key={job.company} delayMs={i * 70} className="border-t border-hairline py-9">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="m-0 mb-1 text-xl font-semibold tracking-[-0.01em] text-text">{job.role}</h3>
                <div className="text-sm text-muted">
                  {job.company} &middot; {job.location}
                </div>
              </div>
              <div className="whitespace-nowrap text-[13px] text-muted2">{job.period}</div>
            </div>
            <ul className="m-0 mb-5 flex list-none flex-col gap-2.5 p-0">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-[1.6] text-muted">
                  <span aria-hidden="true" className="flex-shrink-0 text-accent">&middot;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span key={tech} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
        <div className="border-t border-hairline" />
      </div>

      <Reveal delayMs={200} className="mt-14 rounded-md bg-surface p-8">
        <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">Education &amp; certifications</div>
        <div className="flex flex-col gap-4">
          {educationItems.map((edu) => (
            <div key={edu.title}>
              <div className="text-[15px] font-medium text-text">{edu.title}</div>
              <div className="mt-0.5 text-[13px] text-muted2">{edu.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <span key={cert} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
              {cert}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, scroll to Experience: 6 hairline-divided rows in the order Webstacks → Method → Zesty.io → LeaseLabs → UCSD Bootcamp → Victorise, staggered fade-in, education/certs block directly beneath in a rounded surface panel (not a separate section).

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "Rebuild Experience list with folded-in education/certs block"
```

---

### Task 15: Consulting component

**Files:**
- Create: `components/Consulting.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 9). No data-file dependency — this section's copy is fixed, one-off content per spec.
- Produces: default export `Consulting`, rendered in `app/page.tsx` (Task 20), section `id="consulting"`.

- [ ] **Step 1: Create the component**

```tsx
// components/Consulting.tsx
import Reveal from "@/components/motion/Reveal";

export default function Consulting() {
  return (
    <section id="consulting" aria-label="Consulting" className="mx-auto max-w-[900px] px-6 py-[100px]">
      <Reveal className="border-y border-hairline py-14">
        <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">
          Consulting &middot; RD Tech Bridge
        </div>
        <p className="m-0 mb-6 max-w-[640px] text-lg leading-[1.6] text-muted">
          Outside of full time work, I run RD Tech Bridge, a small consulting practice for AI
          workflow design, MCP integrations, and web builds for small businesses. I&rsquo;ve
          shipped AI chat agents, Slack automations, and production sites for real clients.
        </p>
        <a
          href="#contact"
          className="border-b border-hairline pb-0.5 text-sm font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-accent hover:text-accent"
        >
          Start a project &#8594;
        </a>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, confirm Consulting renders as a single hairline-bordered block that doesn't visually compete with Selected Work.

- [ ] **Step 3: Commit**

```bash
git add components/Consulting.tsx
git commit -m "Add Consulting section"
```

---

### Task 16: Capabilities component

**Files:**
- Delete: `components/Skills.tsx`
- Create: `components/Capabilities.tsx`

**Interfaces:**
- Consumes: `capabilityGroups` from `src/data/capabilities.ts` (Task 7); `Reveal` (Task 9).
- Produces: default export `Capabilities`, rendered in `app/page.tsx` (Task 20). Section keeps `id="skills"` to match the handoff prototype exactly (nav does not link here directly, but the id is part of the specified markup).

- [ ] **Step 1: Delete the old component**

```bash
git rm components/Skills.tsx
```

- [ ] **Step 2: Create `components/Capabilities.tsx`**

```tsx
// components/Capabilities.tsx
import Reveal from "@/components/motion/Reveal";
import { capabilityGroups } from "@/src/data/capabilities";

export default function Capabilities() {
  return (
    <section id="skills" aria-label="Capabilities" className="mx-auto max-w-[1200px] px-6 pb-[100px] pt-[60px]">
      <Reveal className="mb-14">
        <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Capabilities</div>
        <h2 className="m-0 max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
          Four things I actually do well.
        </h2>
      </Reveal>
      <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {capabilityGroups.map((group, i) => (
          <Reveal key={group.title} delayMs={i * 90}>
            <h3 className="m-0 mb-2.5 text-[17px] font-semibold text-text">{group.title}</h3>
            <p className="m-0 mb-5 text-sm leading-[1.6] text-muted">{group.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, confirm 4-column auto-fit grid (min 260px) collapsing responsively, buckets in order Product engineering / State & data / Quality & reliability / AI & automation.

- [ ] **Step 4: Commit**

```bash
git add components/Capabilities.tsx
git commit -m "Rebuild Capabilities as a 4-bucket grid"
```

---

### Task 17: Testimonials component

**Files:**
- Create: `components/Testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials` from `src/data/testimonials.ts` (Task 7); `Reveal` (Task 9).
- Produces: default export `Testimonials`, rendered in `app/page.tsx` (Task 20).

- [ ] **Step 1: Create the component**

```tsx
// components/Testimonials.tsx
import Reveal from "@/components/motion/Reveal";
import { testimonials } from "@/src/data/testimonials";

export default function Testimonials() {
  return (
    <section aria-label="Testimonials" className="mx-auto max-w-[800px] px-6 pb-[140px] pt-[100px]">
      <Reveal className="mb-16">
        <div className="text-[13px] uppercase tracking-[0.08em] text-muted2">What people say</div>
      </Reveal>
      <div className="flex flex-col gap-20">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delayMs={i * 100} as="div" className="m-0">
            <figure className="m-0">
              <blockquote className="m-0 mb-6 text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.5] tracking-[-0.01em] text-text">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-muted">
                <span className="text-text">{t.author}</span> &middot; {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, confirm 3 stacked pull-quotes (Jessica Davilla, Eric Johnson, Jerome Lacote in that order) with 80px gaps, staggered reveal.

- [ ] **Step 3: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "Add Testimonials section"
```

---

### Task 18: Contact component

**Files:**
- Delete: `components/Contact.tsx` (old)
- Create: `components/Contact.tsx` (new)

**Interfaces:**
- Consumes: `Reveal` from `components/motion/Reveal.tsx` (Task 9). No data-file dependency — contact details are fixed, single-instance content.
- Produces: default export `Contact`, rendered in `app/page.tsx` (Task 20), section `id="contact"`.

- [ ] **Step 1: Replace `components/Contact.tsx` in full**

```tsx
// components/Contact.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const EMAIL = "d88naimi@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-label="Contact" className="mx-auto max-w-[900px] px-6 pb-[60px] pt-[100px]">
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </p>

      <Reveal className="mb-16 text-center">
        <h2 className="m-0 mb-5 text-[clamp(2.25rem,5vw,4rem)] font-[650] tracking-[-0.02em] text-text">
          Let&rsquo;s build something together.
        </h2>
        <p className="mx-auto max-w-[520px] text-[17px] leading-[1.6] text-muted">
          Open to senior frontend roles, consulting work, and collaborations. Based in San
          Marcos, CA. Remote, hybrid, or onsite all work for me.
        </p>
      </Reveal>

      <div className="mb-12 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <button
          type="button"
          onClick={copyEmail}
          className="w-full rounded-md border border-hairline bg-surface p-6 text-left font-sans transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">Email</div>
          <div className="mb-1 text-[15px] text-text">{EMAIL}</div>
          <div className="text-[13px] text-accent">{copied ? "Copied!" : "Click to copy"}</div>
        </button>

        <a
          href="https://linkedin.com/in/davidnaimi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">LinkedIn</div>
          <div className="mb-1 text-[15px] text-text">/in/davidnaimi</div>
          <div className="text-[13px] text-accent">View profile &#8599;</div>
        </a>

        <a
          href="https://github.com/d88naimi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">GitHub</div>
          <div className="mb-1 text-[15px] text-text">d88naimi</div>
          <div className="text-[13px] text-accent">See code &#8599;</div>
        </a>

        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">Resume</div>
          <div className="mb-1 text-[15px] text-text">PDF download</div>
          <div className="text-[13px] text-accent">Get it &#8599;</div>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add the `sr-only` utility if not already present**

Check `app/globals.css` — Tailwind 4 ships `sr-only` as a built-in utility, so no addition is needed. Confirm with:

Run: `grep -r "sr-only" node_modules/tailwindcss/*.css 2>/dev/null | head -1`
Expected: a match (confirms the utility exists); if nothing matches, add this to `app/globals.css`:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, click the Email card: confirm clipboard receives `d88naimi@gmail.com`, button label flips to "Copied!" for 2s, and a screen reader (or the accessibility tree in devtools) shows the `aria-live="polite"` region updating.

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/globals.css
git commit -m "Rebuild Contact with click-to-copy email card"
```

---

### Task 19: Footer component

**Files:**
- Delete: `components/Footer.tsx` (old)
- Create: `components/Footer.tsx` (new)

**Interfaces:**
- Consumes: nothing (static content).
- Produces: default export `Footer`, rendered in `app/page.tsx` (Task 20).

- [ ] **Step 1: Replace `components/Footer.tsx` in full**

```tsx
// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted2">&copy; {year} David Naimi</span>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/davidnaimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/d88naimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text"
          >
            GitHub
          </a>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text"
          >
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `npm run dev`, confirm footer is a single sparse row with the current year and 3 links, nothing else.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "Rebuild Footer as a single sparse row"
```

---

### Task 20: Assemble `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 10), `Hero` (Task 11), `ImpactStrip` (Task 12), `SelectedWork` (Task 13), `Experience` (Task 14), `Consulting` (Task 15), `Capabilities` (Task 16), `Testimonials` (Task 17), `Contact` (Task 18), `Footer` (Task 19).
- Produces: the `/` route.

- [ ] **Step 1: Read the current `app/page.tsx`**

Run: `cat app/page.tsx`

- [ ] **Step 2: Replace `app/page.tsx` in full**

```tsx
// app/page.tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactStrip from "@/components/ImpactStrip";
import SelectedWork from "@/components/SelectedWork";
import Experience from "@/components/Experience";
import Consulting from "@/components/Consulting";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg">
      <Nav />
      <main id="main-content">
        <Hero />
        <ImpactStrip />
        <SelectedWork />
        <Experience />
        <Consulting />
        <Capabilities />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: clean build. Run `npm run dev`, load `/`, and walk the full page top to bottom confirming section order matches the spec: Nav → Hero → Impact strip → Selected work (sticky showcase + more work) → Experience (+ education/certs) → Consulting → Capabilities → Testimonials → Contact → Footer.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Assemble full page from new dark-theme sections"
```

---

### Task 21: Copy static assets and rewrite `app/not-found.tsx`

**Files:**
- Modify: `public/og-image.png` (copy from handoff bundle)
- Modify: `app/not-found.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: OG image served at `/og-image.png` (referenced by `app/layout.tsx` from Task 2); a dark-themed 404 page.

- [ ] **Step 1: Copy the OG image from the handoff bundle**

```bash
cp ~/Desktop/design_handoff_portfolio_rebuild/og-image.png /Users/davidnaimi/Code/portfolio/public/og-image.png
```

- [ ] **Step 2: Read the current `app/not-found.tsx`**

Run: `cat app/not-found.tsx`

- [ ] **Step 3: Rewrite `app/not-found.tsx` in the dark theme**

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <p className="text-[13px] uppercase tracking-[0.08em] text-muted2">404</p>
      <h1 className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
        Page not found.
      </h1>
      <p className="max-w-[480px] text-base leading-[1.6] text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-pill bg-text px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity duration-200 ease-[var(--ease-hover)] hover:opacity-85"
      >
        Back to home
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: clean build. `npm run dev`, visit `/does-not-exist`, confirm the dark 404 page renders.

- [ ] **Step 5: Commit**

```bash
git add public/og-image.png app/not-found.tsx
git commit -m "Add OG image asset and dark-themed 404 page"
```

---

### Task 22: Case study route `app/work/[slug]/page.tsx`

**Files:**
- Create: `app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `caseStudies` from `src/data/case-studies.ts` (Task 8).
- Produces: `/work/mavis` and `/work/vehicleiq` routes, each with `generateStaticParams`, `generateMetadata`, and a `notFound()` fallback for unknown slugs.

- [ ] **Step 1: Create the route file**

```tsx
// app/work/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import { caseStudies, type CaseStudy } from "@/src/data/case-studies";

type Params = { slug: string };

function getCaseStudy(slug: string): CaseStudy | undefined {
  return (Object.values(caseStudies) as CaseStudy[]).find((cs) => cs.slug === slug);
}

export function generateStaticParams(): Params[] {
  return Object.values(caseStudies).map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} — David Naimi`,
    description: caseStudy.summary,
    openGraph: {
      title: `${caseStudy.title} — David Naimi`,
      description: caseStudy.summary,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} — David Naimi`,
      description: caseStudy.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <div className="relative min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-hairline bg-[rgba(10,10,10,0.7)] backdrop-blur-[20px]">
        <nav aria-label="Case study" className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-5">
          <Link href="/" className="text-sm text-muted hover:text-text">
            &#8592; David Naimi
          </Link>
          <span className="text-[13px] uppercase tracking-[0.04em] text-muted2">Case study</span>
        </nav>
      </header>

      <main id="main-content">
        <section className="mx-auto max-w-[900px] px-6 pb-[60px] pt-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-accent">{caseStudy.tag}</div>
            <h1 className="m-0 mb-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-[650] leading-[1.05] tracking-[-0.03em] text-text">
              {caseStudy.title}
            </h1>
            <p className="m-0 mb-7 max-w-[640px] text-[19px] leading-[1.6] text-muted">{caseStudy.summary}</p>
            {(caseStudy.liveHref || caseStudy.githubHref) && (
              <div className="flex gap-6">
                {caseStudy.liveHref && (
                  <a
                    href={caseStudy.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-hairline pb-0.5 text-sm text-text hover:border-accent hover:text-accent"
                  >
                    Live site &#8599;
                  </a>
                )}
                {caseStudy.githubHref && (
                  <a
                    href={caseStudy.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-hairline pb-0.5 text-sm text-text hover:border-accent hover:text-accent"
                  >
                    GitHub &#8599;
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </section>

        <section className="mx-auto max-w-[900px] px-6 pb-20">
          <div
            role="img"
            aria-label={`${caseStudy.title} product screenshot placeholder`}
            className="flex h-[480px] w-full items-center justify-center rounded-lg border border-dashed border-hairline bg-surface text-sm text-muted2"
          >
            Product screenshot coming soon
          </div>
        </section>

        {caseStudy.heroMetrics && (
          <section className="mx-auto grid max-w-[900px] grid-cols-2 gap-6 border-y border-hairline px-6 py-[60px] md:grid-cols-4">
            {caseStudy.heroMetrics.map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-[650] tracking-[-0.02em] text-text">
                  {m.value}
                </div>
                <div className="text-[13px] text-muted2">{m.label}</div>
              </div>
            ))}
          </section>
        )}

        <section className="mx-auto max-w-[700px] px-6 py-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.problem.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.problem.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.problem.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.approach.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.approach.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.approach.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[100px]">
          <Reveal>
            <div className="mb-6 text-[13px] uppercase tracking-[0.08em] text-muted2">What I built</div>
            <ul className="m-0 mb-8 flex list-none flex-col gap-3.5 p-0">
              {caseStudy.builtItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-[1.6] text-muted">
                  <span aria-hidden="true" className="flex-shrink-0 text-accent">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span key={tech} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[140px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.outcome.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.outcome.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.outcome.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[140px] text-center">
          <Link
            href="/#work"
            className="inline-block rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-medium text-text hover:border-white/30 hover:bg-white/[0.04]"
          >
            Back to selected work
          </Link>
        </section>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: build output lists `/work/mavis` and `/work/vehicleiq` as prerendered routes. `npm run dev`, visit `/work/mavis` and `/work/vehicleiq`, confirm content matches the case study data, sections fade up on scroll once, back link returns to `/#work`, and `/work/nonexistent` renders the 404 page from Task 21.

- [ ] **Step 3: Commit**

```bash
git add app/work
git commit -m "Add case study route for /work/[slug]"
```

---

### Task 23: Update Selected Work case-study links to use the real route

**Files:**
- Modify: `src/data/projects.ts` (verify only — already set in Task 5)

**Interfaces:**
- Consumes: nothing new.
- Produces: confirms `SelectedWork` (Task 13) links resolve correctly now that the route exists.

- [ ] **Step 1: Confirm the links are already correct**

Run: `grep -n "caseStudyHref" src/data/projects.ts`
Expected: `caseStudyHref: "/work/mavis"` and `caseStudyHref: "/work/vehicleiq"` (set in Task 5 — this step is a verification checkpoint now that the route exists, not a new edit).

- [ ] **Step 2: Manual click-through test**

Run: `npm run dev`, on `/`, click "Read the case study →" under both Mavis and VehicleIQ panels, confirm each navigates to its `/work/[slug]` page, and confirm Encinitas Coast Highway Flowers shows only Live/GitHub links (no case-study link, since `caseStudyHref` is `null`).

- [ ] **Step 3: No commit needed**

This task is verification-only; skip if Task 5 and Task 22 already pass their own checks.

---

### Task 24: `sitemap.ts` and `robots.ts`

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Consumes: `caseStudies` from `src/data/case-studies.ts` (Task 8).
- Produces: `/sitemap.xml` and `/robots.txt`.

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { caseStudies } from "@/src/data/case-studies";

const BASE_URL = "https://davidnaimi.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = Object.values(caseStudies).map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    ...caseStudyRoutes,
  ];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://davidnaimi.dev/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds. `npm run dev`, visit `/sitemap.xml` and confirm it lists `/`, `/work/mavis`, `/work/vehicleiq`; visit `/robots.txt` and confirm it allows all and points at the sitemap.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "Add sitemap and robots routes"
```

---

### Task 25: Final verification pass

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: the entire rebuilt site.
- Produces: confirmation the rebuild meets the spec's accessibility, motion, and performance requirements.

- [ ] **Step 1: Full lint/typecheck/build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all clean, zero errors/warnings.

- [ ] **Step 2: Manual reduced-motion pass**

Enable "Reduce motion" at the OS level (macOS: System Settings → Accessibility → Display → Reduce motion). Reload `/`. Confirm: hero headline/eyebrow/body/CTAs render immediately in final position (no mask/translate), impact counters show final values immediately, no cursor glow drift, all `Reveal`-wrapped sections are visible immediately without a fade-up. Repeat on `/work/mavis`.

- [ ] **Step 3: Keyboard and screen-reader pass**

Tab through the full page from the skip link onward: confirm the skip link is focusable and jumps to `#main-content`, all nav links/resume pill/mobile menu button/burger-to-overlay flow, project links, contact email button, and social links all receive a visible focus ring (`accent`, 2px, 2-4px offset) and are operable via keyboard. Confirm heading hierarchy is h1 (hero) → h2 (section headers) → h3 (job titles, project titles) with no skipped levels.

- [ ] **Step 4: Responsive pass at 375px**

Run `npm run dev`, open devtools responsive mode at 375px width. Walk the whole page: nav collapses to hamburger, hero type scales down via `clamp()`, impact strip shows 2-up, Selected Work sticky panels either pin cleanly or (if they don't) confirm the `md:` fallback from Task 13 Step 3 stacks them normally, Capabilities/Contact grids collapse to a single column.

- [ ] **Step 5: Lighthouse mobile spot-check**

Run:
```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --output=json --output-path=/tmp/lighthouse-report.json --chrome-flags="--headless"
```
Expected: performance score printed in the summary is 90+. If below 90, check the report's opportunities (commonly: unoptimized images, unused JS) and address before considering the rebuild done. Stop the `npm run start` background process afterward.

- [ ] **Step 6: Remove the now-unused `clsx` dependency if nothing imports it, otherwise leave it**

Run: `grep -rl "from \"clsx\"" app components src 2>/dev/null`
Expected: if no matches, run `npm uninstall clsx` and commit; if there are matches, leave it as-is (no action needed).

- [ ] **Step 7: Final commit (only if Step 6 produced a change)**

```bash
git add package.json package-lock.json
git commit -m "Remove unused clsx dependency"
```
