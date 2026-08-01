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
