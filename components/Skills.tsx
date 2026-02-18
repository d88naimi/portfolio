"use client";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5 / CSS3" },
    ],
  },
  {
    label: "Styling & UI",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Material UI" },
      { name: "SASS / SCSS" },
      { name: "Storybook" },
      { name: "Design Systems" },
    ],
  },
  {
    label: "State & Data",
    skills: [
      { name: "Zustand" },
      { name: "Redux" },
      { name: "useSWR / Axios" },
      { name: "REST APIs" },
      { name: "Node.js / Express" },
    ],
  },
  {
    label: "Testing & Tools",
    skills: [
      { name: "Playwright" },
      { name: "Cypress" },
      { name: "Datadog / Sentry" },
      { name: "Git / Bitbucket" },
      { name: "Figma" },
    ],
  },
];

const education: Array<{ school: string; program: string; period?: string }> = [
  {
    school: "California State University, Fullerton",
    program: "Bachelor of Arts, Business Administration (Marketing)",
  },
  {
    school: "University of California, San Diego Extension",
    program: "Full Stack Web Development Bootcamp",
    period: "2017",
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6 max-w-6xl mx-auto"
    >
      <div
        className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="section-label mb-3">Skills</div>
        <h2 className="font-display text-4xl md:text-5xl text-text">
          My <em className="text-accent">toolkit</em>
        </h2>
        <div className="mt-4 w-10 h-0.5 bg-accent2" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {skillGroups.map((group, gi) => (
          <div
            key={group.label}
            className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${gi * 100 + 200}ms` }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2 inline-block" />
              <span className="section-label text-text/50">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="font-sans text-xs px-3 py-2 border border-border bg-bg2 text-muted rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div
        className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 delay-400 mb-6 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-label mb-5">Education</div>
        <div className="space-y-5">
          {education.map((edu) => (
            <div
              key={`${edu.school}-${edu.program}`}
              className="border border-border bg-bg2 p-5"
            >
              <h3 className="font-display text-lg text-text leading-snug">
                {edu.school}
              </h3>
              <p className="font-sans text-sm text-muted mt-1">{edu.program}</p>
              {edu.period && (
                <p className="font-sans text-xs text-accent mt-2">
                  {edu.period}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certs */}
      <div
        className={`bg-surface border border-border p-7 shadow-sm transition-all duration-700 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-label mb-5">Certifications</div>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Microsoft Azure Fundamentals (AZ-900)",
            "Modern React with Redux",
            "React — The Complete Guide",
            "JS: Understanding the Weird Parts",
            "Advanced CSS & Sass",
            "The Complete JavaScript Course",
          ].map((cert) => (
            <span
              key={cert}
              className="font-sans text-xs px-4 py-2 border border-border bg-bg2 text-muted rounded-full hover:border-accent/30 hover:text-accent transition-colors"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
