// components/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#consulting", label: "Consulting" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-[1200px] border-b transition-[background,border-color,padding] duration-300 ease-[var(--ease-hover)] ${
          scrolled
            ? "bg-[rgba(10,10,10,0.72)] backdrop-blur-[20px] border-hairline py-3.5"
            : "bg-transparent border-transparent py-[22px]"
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-8"
        >
          <a href="#hero" className="text-base font-semibold tracking-[-0.01em] text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4">
            David Naimi
          </a>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-hairline px-[18px] py-[9px] text-[13px] text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Resume
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <span className="block h-px w-5 bg-text" />
            <span className="my-[5px] block h-px w-5 bg-text" />
            <span className="block h-px w-5 bg-text" />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[rgba(0,0,0,0.97)] backdrop-blur-[20px]"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="text-[28px] font-semibold tracking-[-0.02em] text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
            className="mt-3 rounded-pill border border-hairline px-6 py-3 text-[15px] text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 p-2 text-[28px] text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            &#10005;
          </button>
        </div>
      )}
    </header>
  );
}
