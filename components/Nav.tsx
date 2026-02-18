"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-xl text-accent italic">
          David Naimi
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200 warm-underline"
            >
              {l.label}
            </a>
          ))}
          <a href="/resume.pdf" className="btn-primary" target="_blank" rel="noopener noreferrer">
            <span>Resume</span>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-text transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-b border-border px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-sans text-sm text-muted hover:text-accent transition-colors" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="/resume.pdf" className="btn-primary text-center" target="_blank" rel="noopener noreferrer"><span>Resume</span></a>
        </div>
      )}
    </header>
  );
}
