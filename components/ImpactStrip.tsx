// components/ImpactStrip.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { impactStats } from "@/src/data/impact-stats";
import { formatCount } from "@/src/lib/format";

export default function ImpactStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(impactStats.map((s) => [s.key, reduced ? s.target : 0]))
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCounts(Object.fromEntries(impactStats.map((s) => [s.key, s.target])));
      return;
    }
    const controls = impactStats.map((stat) =>
      animate(0, stat.target, {
        duration: 1.4,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (value) => {
          setCounts((prev) => ({ ...prev, [stat.key]: value }));
        },
      })
    );
    return () => controls.forEach((c) => c.stop());
  }, [inView, reduced]);

  return (
    <section aria-label="Impact" className="mx-auto max-w-[1200px] px-6 py-[100px]">
      <div ref={ref} className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-8">
        {impactStats.map((stat) => (
          <div key={stat.key} className="text-center">
            <div className="mb-2 text-[clamp(2.25rem,5vw,3.5rem)] font-[650] tracking-[-0.02em] text-text [font-variant-numeric:tabular-nums]">
              {formatCount(counts[stat.key], stat.format)}
              {stat.suffix}
            </div>
            <div className="text-[13px] uppercase tracking-[0.04em] text-muted2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
