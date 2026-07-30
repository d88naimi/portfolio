import Reveal from "@/components/motion/Reveal";
import { testimonials } from "@/src/data/testimonials";

export default function Testimonials() {
  return (
    <section aria-label="Testimonials" className="mx-auto max-w-[800px] px-6 pb-[140px] pt-[100px]">
      <Reveal className="mb-16">
        <div className="text-[13px] uppercase tracking-[0.08em] text-muted2">What people say</div>
      </Reveal>
      <div className="flex flex-col gap-20">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delayMs={i * 100} as="div" className="m-0">
            <figure className="m-0">
              <blockquote className="m-0 mb-6 text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.5] tracking-[-0.01em] text-text">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-muted">
                <span className="text-text">{t.author}</span> &middot; {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
