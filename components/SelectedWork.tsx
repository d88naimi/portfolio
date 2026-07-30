// components/SelectedWork.tsx
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { featuredProjects, moreProjects } from "@/src/data/projects";

export default function SelectedWork() {
  return (
    <>
      <section id="work" aria-label="Selected work" className="mx-auto max-w-[1200px] px-6 pb-10 pt-[60px]">
        <Reveal className="mb-6">
          <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Selected work</div>
          <h2 className="m-0 max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
            Three shipped products, told in depth.
          </h2>
        </Reveal>
      </section>

      <section aria-label="Featured projects" className="relative">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="flex items-center bg-bg py-20 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(900px circle at 15% 50%, var(--color-accent-glow), transparent 55%)",
              }}
            />
            <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
              <div>
                <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-accent">{project.tag}</div>
                <h3 className="m-0 mb-5 text-[clamp(1.75rem,3.2vw,2.75rem)] font-[650] leading-[1.1] tracking-[-0.02em] text-text">
                  {project.title}
                </h3>
                <p className="m-0 mb-7 max-w-[480px] text-base leading-[1.65] text-muted">
                  {project.description}
                </p>
                <div className="mb-7 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-pill border border-hairline px-3 py-1.5 text-xs text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  {project.caseStudyHref && (
                    <Link
                      href={project.caseStudyHref}
                      className="border-b border-hairline pb-0.5 text-sm font-medium text-text transition-colors duration-200 ease-[var(--ease-hover)] hover:border-accent hover:text-accent"
                    >
                      Read the case study &#8594;
                    </Link>
                  )}
                  {project.liveHref && (
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-text"
                    >
                      Live &#8599;
                    </a>
                  )}
                  {project.githubHref && (
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-text"
                    >
                      GitHub &#8599;
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-surface px-10 py-12">
                <div className="flex flex-col gap-8">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="mb-1.5 text-[clamp(2rem,4vw,3rem)] font-[650] tracking-[-0.02em] text-accent [font-variant-numeric:tabular-nums]">
                        {metric.value}
                      </div>
                      <div className="text-sm leading-[1.4] text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section aria-label="More projects" className="mx-auto max-w-[900px] px-6 pb-[140px] pt-[120px]">
        <Reveal className="mb-10">
          <div className="text-[13px] uppercase tracking-[0.08em] text-muted2">More work</div>
        </Reveal>
        <div>
          {moreProjects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-t border-hairline py-7 no-underline transition-[padding-left] duration-[250ms] ease-[var(--ease-hover)] hover:pl-3"
            >
              <div className="min-w-0">
                <div className="mb-1.5 text-lg font-semibold tracking-[-0.01em] text-text">{project.title}</div>
                <div className="max-w-[560px] text-sm leading-[1.5] text-muted">{project.summary}</div>
              </div>
              <div className="flex-shrink-0 whitespace-nowrap text-[13px] text-muted2">
                {project.linkLabel} &#8599;
              </div>
            </a>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </section>
    </>
  );
}
