"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const EMAIL = "d88naimi@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-label="Contact" className="mx-auto max-w-[900px] px-6 pb-[60px] pt-[100px]">
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </p>

      <Reveal className="mb-16 text-center">
        <h2 className="m-0 mb-5 text-[clamp(2.25rem,5vw,4rem)] font-[650] tracking-[-0.02em] text-text">
          Let&rsquo;s build something together.
        </h2>
        <p className="mx-auto max-w-[520px] text-[17px] leading-[1.6] text-muted">
          Open to senior frontend roles, consulting work, and collaborations. Based in San
          Marcos, CA. Remote, hybrid, or onsite all work for me.
        </p>
      </Reveal>

      <div className="mb-12 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <button
          type="button"
          onClick={copyEmail}
          className="w-full rounded-md border border-hairline bg-surface p-6 text-left font-sans transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">Email</div>
          <div className="mb-1 text-[15px] text-text">{EMAIL}</div>
          <div className="text-[13px] text-accent">{copied ? "Copied!" : "Click to copy"}</div>
        </button>

        <a
          href="https://linkedin.com/in/davidnaimi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">LinkedIn</div>
          <div className="mb-1 text-[15px] text-text">/in/davidnaimi</div>
          <div className="text-[13px] text-accent">View profile &#8599;</div>
        </a>

        <a
          href="https://github.com/d88naimi"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">GitHub</div>
          <div className="mb-1 text-[15px] text-text">d88naimi</div>
          <div className="text-[13px] text-accent">See code &#8599;</div>
        </a>

        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-hairline bg-surface p-6 transition-colors duration-200 ease-[var(--ease-hover)] hover:border-white/20 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.06em] text-muted2">Resume</div>
          <div className="mb-1 text-[15px] text-text">PDF download</div>
          <div className="text-[13px] text-accent">Get it &#8599;</div>
        </Link>
      </div>
    </section>
  );
}
