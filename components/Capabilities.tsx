// components/Capabilities.tsx
import Reveal from "@/components/motion/Reveal";
import { capabilityGroups } from "@/src/data/capabilities";

export default function Capabilities() {
  return (
    <section id="capabilities" aria-label="Capabilities" className="mx-auto max-w-[1200px] px-6 pb-[100px] pt-[60px]">
      <Reveal className="mb-14">
        <div className="mb-4 text-[13px] uppercase tracking-[0.08em] text-muted2">Capabilities</div>
        <h2 className="m-0 max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
          Four things I actually do well.
        </h2>
      </Reveal>
      <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {capabilityGroups.map((group, i) => (
          <Reveal key={group.title} delayMs={i * 90}>
            <h3 className="m-0 mb-2.5 text-[17px] font-semibold text-text">{group.title}</h3>
            <p className="m-0 mb-5 text-sm leading-[1.6] text-muted">{group.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-pill border border-hairline px-3 py-[5px] text-xs text-muted2">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
