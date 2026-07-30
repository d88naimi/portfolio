// components/Consulting.tsx
import Reveal from "@/components/motion/Reveal";

export default function Consulting() {
  return (
    <section id="consulting" aria-label="Consulting" className="mx-auto max-w-[900px] px-6 py-[100px]">
      <Reveal className="border-y border-hairline py-14">
        <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">
          Consulting &middot; RD Tech Bridge
        </div>
        <p className="m-0 mb-6 max-w-[640px] text-lg leading-[1.6] text-muted">
          Outside of full time work, I run RD Tech Bridge, a small consulting practice for AI
          workflow design, MCP integrations, and web builds for small businesses. I&rsquo;ve
          shipped AI chat agents, Slack automations, and production sites for real clients.
        </p>
        <a
          href="#contact"
          className="border-b border-hairline pb-0.5 text-sm font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-accent hover:text-accent"
        >
          Start a project &#8594;
        </a>
      </Reveal>
    </section>
  );
}
