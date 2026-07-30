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
