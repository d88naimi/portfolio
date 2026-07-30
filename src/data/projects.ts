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
