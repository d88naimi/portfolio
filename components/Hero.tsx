// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LINES = ["Frontend engineering,", "built like it matters."];

export default function Hero() {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [pos, setPos] = useState({ mx: 0.5, my: 0.5 });
  const rafPending = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), reduced ? 0 : 150);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        setPos({ mx: e.clientX / window.innerWidth, my: e.clientY / window.innerHeight });
        rafPending.current = false;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const glowX = 30 + pos.mx * 40;
  const glowY = 20 + pos.my * 30;

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 pb-[100px] pt-[160px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, var(--color-accent-glow), transparent 60%)`,
          opacity: revealed ? 1 : 0,
          transition: reduced ? "none" : "opacity 900ms ease, background 300ms linear",
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-2.5"
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[13px] uppercase tracking-[0.08em] text-muted2">
            San Marcos, CA &middot; Available for new roles
          </span>
        </motion.div>

        <h1 className="m-0 mb-7 max-w-[900px] text-[clamp(2.75rem,7vw,6.5rem)] font-[650] leading-[1.05] tracking-[-0.03em] text-text">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em] pt-[0.2em] -mt-[0.2em]">
              <motion.span
                className="inline-block will-change-transform"
                initial={reduced ? false : { y: "110%", opacity: 0 }}
                animate={revealed ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : (i * 90) / 1000,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-[560px] text-lg leading-[1.6] text-muted"
        >
          Seven years shipping React and Next.js products for real customers, from a check-in
          platform running across 3,500 stores to AI tools people actually use. I care about the
          details most teams skip.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="rounded-pill bg-text px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity duration-200 ease-[var(--ease-hover)] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          >
            View the work
          </a>
          <a
            href="#contact"
            className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
