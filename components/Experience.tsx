// components/Experience.tsx
import Reveal from "@/components/motion/Reveal";
import { certifications, educationItems, experienceItems } from "@/src/data/experience";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="mx-auto max-w-[900px] px-6 pb-[100px] pt-[140px]">
      <Reveal className="mb-16">
        <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Experience</div>
        <h2 className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
          Where I&rsquo;ve worked.
        </h2>
      </Reveal>

      <div>
        {experienceItems.map((job, i) => (
          <Reveal key={job.company} delayMs={i * 70} className="border-t border-hairline py-9">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="m-0 mb-1 text-xl font-semibold tracking-[-0.01em] text-text">{job.role}</h3>
                <div className="text-sm text-muted">
                  {job.company} &middot; {job.location}
                </div>
              </div>
              <div className="whitespace-nowrap text-[13px] text-muted2">{job.period}</div>
            </div>
            <ul className="m-0 mb-5 flex list-none flex-col gap-2.5 p-0">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-[1.6] text-muted">
                  <span aria-hidden="true" className="flex-shrink-0 text-accent">&middot;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span key={tech} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
        <div className="border-t border-hairline" />
      </div>

      <Reveal delayMs={200} className="mt-14 rounded-md bg-surface p-8">
        <div className="mb-5 text-[13px] uppercase tracking-[0.08em] text-muted2">Education &amp; certifications</div>
        <div className="flex flex-col gap-4">
          {educationItems.map((edu) => (
            <div key={edu.title}>
              <div className="text-[15px] font-medium text-text">{edu.title}</div>
              <div className="mt-0.5 text-[13px] text-muted2">{edu.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <span key={cert} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
              {cert}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
