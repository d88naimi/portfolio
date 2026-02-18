"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "Method",
    role: "Senior Software Engineer / Consultant",
    period: "July 2022 — Present",
    location: "Remote, NC",
    highlights: [
      "Lead frontend engineer for customer check-in dashboard deployed to 3,500+ Mavis Discount Tire locations nationwide",
      "Translated Figma designs into responsive, pixel-accurate interfaces ensuring usability and accessibility",
      "Reduced check-in time by 64% through UX improvements and optimized API integration",
      "Built reusable hooks and components to standardize data fetching, improving developer velocity",
      "Wrote and maintained integration/unit tests using Playwright, reducing regressions",
      "Monitored application health via Datadog and Sentry, proactively resolving production issues",
    ],
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Playwright"],
  },
  {
    company: "Zesty.io",
    role: "Front End Engineer",
    period: "Aug 2020 — Aug 2022",
    location: "San Diego, CA",
    highlights: [
      "Designed and delivered Duo Mode — a major product feature — owning end-to-end from wireframes to production",
      "Developed a productivity analytics dashboard with React and Chart.js, increasing internal engagement by 20%",
      "Built and maintained a media manager using reusable React components and internal design systems",
      "Refactored legacy class components to functional components with hooks, improving maintainability",
      "Wrote Cypress E2E tests to improve UI quality and reduce regression defects",
    ],
    stack: ["React", "JavaScript", "Redux", "Chart.js", "Less", "Cypress"],
  },
  {
    company: "LeaseLabs",
    role: "Web Developer",
    period: "Feb 2018 — Feb 2020",
    location: "San Diego, CA",
    highlights: [
      "Built CMS-editable SPAs and multi-page websites using Foundation, Ruby, Haml, and SASS",
      "Refactored frontend codebases to meet ADA/WCAG accessibility standards",
      "Improved team efficiency by creating Gulp hot-reload tasks and leading internal coding workshops",
      "Onboarded and mentored junior developers on workflows and best practices",
    ],
    stack: ["JavaScript", "jQuery", "SASS", "Ruby", "Haml", "Foundation"],
  },
  {
    company: "UCSD Bootcamp",
    role: "Associate Instructor",
    period: "Dec 2017 — Aug 2020",
    location: "San Diego, CA",
    highlights: [
      "Taught full-stack curriculum: HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB, MySQL",
      "Mentored students through code reviews, debugging sessions, and architecture discussions",
      "Achieved NPS of 100, exceeding all instructional benchmarks",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "MySQL"],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const exp = experiences[active];

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 px-6 max-w-6xl mx-auto"
    >
      {/* Section header */}
      <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="section-label mb-3">Experience</div>
        <h2 className="font-display text-4xl md:text-5xl text-text">
          Where I&apos;ve <em className="text-accent">worked</em>
        </h2>
        <div className="mt-4 w-10 h-0.5 bg-accent2" />
      </div>

      <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Company tabs */}
        <div className="flex lg:flex-col gap-0 overflow-x-auto lg:overflow-x-visible min-w-0 lg:min-w-[180px]">
          {experiences.map((e, i) => (
            <button
              key={e.company}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 text-left px-5 py-3.5 font-sans text-sm border-b-2 lg:border-b-0 lg:border-l-2 transition-all duration-200 ${
                active === i
                  ? "text-accent border-accent bg-accent-light/30"
                  : "text-muted border-border hover:text-text hover:border-border/60"
              }`}
            >
              {e.company}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="flex-1 bg-surface/80 border border-border p-8 rounded-sm shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
            <div>
              <h3 className="font-display text-xl text-text mb-1">{exp.role}</h3>
              <p className="font-sans text-sm text-accent font-medium">
                {exp.company} · {exp.location}
              </p>
            </div>
            <span className="font-sans text-xs text-muted border border-border px-3 py-1.5 rounded-full bg-bg2">
              {exp.period}
            </span>
          </div>

          <ul className="space-y-3 mb-8">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-text/75 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent2 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
            {exp.stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

