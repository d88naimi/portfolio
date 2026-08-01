// app/work/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import { caseStudies, type CaseStudy } from "@/src/data/case-studies";

type Params = { slug: string };

function getCaseStudy(slug: string): CaseStudy | undefined {
  return (Object.values(caseStudies) as CaseStudy[]).find((cs) => cs.slug === slug);
}

export function generateStaticParams(): Params[] {
  return Object.values(caseStudies).map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} — David Naimi`,
    description: caseStudy.summary,
    openGraph: {
      title: `${caseStudy.title} — David Naimi`,
      description: caseStudy.summary,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} — David Naimi`,
      description: caseStudy.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <div className="relative min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-hairline bg-[rgba(10,10,10,0.7)] backdrop-blur-[20px]">
        <nav aria-label="Case study" className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            &#8592; David Naimi
          </Link>
          <span className="text-[13px] uppercase tracking-[0.04em] text-muted2">Case study</span>
        </nav>
      </header>

      <main id="main-content">
        <section className="mx-auto max-w-[900px] px-6 pb-[60px] pt-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-accent">{caseStudy.tag}</div>
            <h1 className="m-0 mb-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-[650] leading-[1.05] tracking-[-0.03em] text-text">
              {caseStudy.title}
            </h1>
            <p className="m-0 mb-7 max-w-[640px] text-[19px] leading-[1.6] text-muted">{caseStudy.summary}</p>
            {(caseStudy.liveHref || caseStudy.githubHref) && (
              <div className="flex gap-6">
                {caseStudy.liveHref && (
                  <a
                    href={caseStudy.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-hairline pb-0.5 text-sm text-text hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    Live site &#8599;
                  </a>
                )}
                {caseStudy.githubHref && (
                  <a
                    href={caseStudy.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-hairline pb-0.5 text-sm text-text hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    GitHub &#8599;
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </section>

        <section className="mx-auto max-w-[900px] px-6 pb-20">
          <div
            role="img"
            aria-label={`${caseStudy.title} product screenshot placeholder`}
            className="flex h-[480px] w-full items-center justify-center rounded-lg border border-dashed border-hairline bg-surface text-sm text-muted2"
          >
            Product screenshot coming soon
          </div>
        </section>

        {caseStudy.heroMetrics && (
          <section className="mx-auto grid max-w-[900px] grid-cols-2 gap-6 border-y border-hairline px-6 py-[60px] md:grid-cols-4">
            {caseStudy.heroMetrics.map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-[650] tracking-[-0.02em] text-text">
                  {m.value}
                </div>
                <div className="text-[13px] text-muted2">{m.label}</div>
              </div>
            ))}
          </section>
        )}

        <section className="mx-auto max-w-[700px] px-6 py-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.problem.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.problem.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.problem.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[100px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.approach.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.approach.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.approach.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[100px]">
          <Reveal>
            <div className="mb-6 text-[13px] uppercase tracking-[0.08em] text-muted2">What I built</div>
            <ul className="m-0 mb-8 flex list-none flex-col gap-3.5 p-0">
              {caseStudy.builtItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-[1.6] text-muted">
                  <span aria-hidden="true" className="flex-shrink-0 text-accent">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span key={tech} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[140px]">
          <Reveal>
            <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">{caseStudy.outcome.eyebrow}</div>
            <p className="m-0 mb-5 text-xl font-medium leading-[1.6] tracking-[-0.01em] text-text">
              {caseStudy.outcome.lede}
            </p>
            <p className="m-0 text-base leading-[1.7] text-muted">{caseStudy.outcome.body}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[700px] px-6 pb-[140px] text-center">
          <Link
            href="/#work"
            className="inline-block rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-medium text-text hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Back to selected work
          </Link>
        </section>
      </main>
    </div>
  );
}
