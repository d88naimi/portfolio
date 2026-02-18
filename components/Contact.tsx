"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("d88naimi@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Decorative top rule */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-border" />
          <span className="section-label">Get in touch</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-display text-4xl md:text-6xl text-text mb-6 leading-tight">
            Let&apos;s build something <em className="text-accent">together</em>
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed max-w-xl mx-auto">
            Open to senior frontend roles, consulting work, and interesting
            collaborations. Based in San Marcos, CA — happy to work remote,
            hybrid or onsite.
          </p>
        </div>

        {/* Contact cards */}
        <div
          className={`grid sm:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {[
            {
              label: "Email",
              value: "d88naimi@gmail.com",
              onClick: copyEmail,
              href: "mailto:d88naimi@gmail.com",
              note: copied ? "Copied!" : "Click to copy",
            },
            {
              label: "LinkedIn",
              value: "/in/davidnaimi",
              href: "https://linkedin.com/in/davidnaimi",
              external: true,
              note: "View profile →",
            },
            {
              label: "GitHub",
              value: "d88naimi",
              href: "https://github.com/d88naimi",
              external: true,
              note: "See code →",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              onClick={c.onClick}
              className="block bg-surface border border-border p-6 hover:border-accent/40 hover:shadow-sm transition-all duration-200 group text-center"
            >
              <div className="section-label mb-2 group-hover:text-accent transition-colors">
                {c.label}
              </div>
              <div className="font-sans text-sm text-text/70 mb-2 break-all">
                {c.value}
              </div>
              <div className="font-sans text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                {c.note}
              </div>
            </a>
          ))}
        </div>

        <div
          className={`flex justify-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <a
            href="mailto:d88naimi@gmail.com"
            className="btn-primary text-sm px-12 py-4"
          >
            <span>Send a message</span>
          </a>
        </div>
      </div>
    </section>
  );
}
