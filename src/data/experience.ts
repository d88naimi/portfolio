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
