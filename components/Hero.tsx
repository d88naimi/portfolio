"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "Senior Frontend Engineer",
  "React / Next.js",
  "Web Developer",
  "UI/UX Collaborator",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const target = ROLES[roleIndex];
    if (typing) {
      if (charIndex < target.length) {
        const t = setTimeout(() => {
          setDisplayed(target.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2400);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(target.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 pt-28 pb-20 overflow-hidden">
      {/* Decorative circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: "1px solid rgba(196,98,45,0.12)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      />
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          width: 680,
          height: 680,
          borderRadius: "50%",
          border: "1px solid rgba(196,98,45,0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      />

      {/* Location tag */}
      <div className="mb-8 flex items-center justify-center gap-2 max-w-[22rem] sm:max-w-none text-center">
        <span className="w-2 h-2 rounded-full bg-sage inline-block" />
        <span className="font-sans text-[11px] sm:text-xs text-muted tracking-wide sm:tracking-widest uppercase leading-relaxed">
          San Marcos, CA · Available for new roles
        </span>
      </div>

      {/* Name — big serif display */}
      <h1
        className="font-display text-center font-normal text-text leading-tight mb-4"
        style={{
          fontSize: "clamp(3rem, 9vw, 6.5rem)",
          letterSpacing: "-0.01em",
        }}
      >
        David <em className="text-accent">Naimi</em>
      </h1>

      {/* Typewriter subtitle */}
      <div className="h-8 flex items-center justify-center mb-7">
        <span className="font-sans text-base md:text-lg text-muted">
          {displayed}
          <span className="text-accent animate-pulse">|</span>
        </span>
      </div>

      {/* Divider */}
      <div className="w-12 h-px bg-accent mb-7" />

      {/* Tagline */}
      <p className="max-w-lg text-center text-text/60 font-sans text-base leading-relaxed mb-12">
        7 years of web development experience building high-performance
        interfaces with React, TypeScript, and Next.js. I turn complex problems
        into clean, human-centered experiences.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-20">
        <a href="#experience" className="btn-primary">
          <span>View My Work</span>
        </a>
        <a href="#contact" className="btn-outline">
          Get in Touch
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-8 md:gap-20 justify-center">
        {[
          { value: "7+", label: "Years Experience" },
          { value: "3,500+", label: "Locations Shipped" },
          { value: "64%", label: "Faster Check-Ins" },
          { value: "100", label: "NPS Score" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1.5">
            <span className="font-display text-3xl md:text-4xl text-accent italic">
              {s.value}
            </span>
            <span className="font-sans text-xs text-muted tracking-wider uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-accent/40 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
