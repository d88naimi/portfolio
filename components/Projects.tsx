"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Mavis Check-In Dashboard",
    description:
      "Customer check-in platform deployed across 3,500+ Mavis Discount Tire locations. Built with React, Next.js, and Zustand — reduced check-in time by 64%.",
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind"],
    status: "Production",
    link: "#",
    github: "#",
  },
  {
    id: "02",
    title: "Duo Mode — Zesty.io",
    description:
      "Major product feature for Zesty.io CMS allowing dual content management views. Led end-to-end from wireframes through production release.",
    stack: ["React", "Redux", "JavaScript", "Less"],
    status: "Production",
    link: "https://www.zesty.io/",
    github: "#",
  },
  {
    id: "03",
    title: "Knowledge Hub",
    description:
      "A full-stack web application built with Next.js 16, TypeScript, Tailwind CSS, NextAuth.js, and Supabase for sharing knowledge through articles, code snippets, and learning resources.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth.js",
      "Supabase (PostgreSQL)",
      "Vercel",
    ],
    status: "Deployed",
    link: "https://knowledge-sharing-app-gold.vercel.app/",
    github: "https://github.com/d88naimi/knowledge-sharing-app",
  },
];

const statusColors: Record<string, string> = {
  Production: "#7a8c6e",
  Shipped: "#c4622d",
  "Coming Soon": "#9a8a7a",
};

export default function Projects() {
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
      id="projects"
      ref={ref}
      className="relative py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(245,240,232,0.5) 20%, rgba(245,240,232,0.5) 80%, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="section-label mb-3">Projects</div>
          <h2 className="font-display text-4xl md:text-5xl text-text">
            Selected <em className="text-accent">work</em>
          </h2>
          <div className="mt-4 w-10 h-0.5 bg-accent2" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`group bg-surface border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {/* Top color strip */}
              <div
                className="h-1"
                style={{
                  background: statusColors[p.status] || "#c4622d",
                  opacity: 0.6,
                }}
              />

              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-4xl text-border italic">
                    {p.id}
                  </span>
                  <span
                    className="font-sans text-xs px-3 py-1 rounded-full"
                    style={{
                      background: statusColors[p.status] + "18",
                      color: statusColors[p.status],
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <h3 className="font-display text-lg text-text mb-3 group-hover:text-accent transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-5 pt-5 border-t border-border">
                  {p.github && p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs text-muted hover:text-accent transition-colors warm-underline"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.link && p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs text-muted hover:text-accent transition-colors warm-underline"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
