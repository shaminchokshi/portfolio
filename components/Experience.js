import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          index="02"
          label="Experience"
          title={
            <>
              Where I've <em className="text-signal [font-style:italic]">built</em>.
            </>
          }
        />
        <div className="mt-14">
          {EXPERIENCE.map((xp, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group grid grid-cols-1 gap-6 border-t border-line py-10 transition-all duration-300 last:border-b hover:pl-3.5 md:grid-cols-[210px_1fr] md:gap-10">
                <div>
                  <div className="font-mono text-[13px] tracking-[0.06em] text-ink">{xp.company}</div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.05em] text-inkfaint">{xp.when}</div>
                  <div className="mt-1 text-[12px] text-inkfaint">{xp.where}</div>
                </div>
                <div>
                  <h3 className="mb-4 font-display text-[1.9rem]">{xp.role}</h3>
                  <ul className="flex flex-col gap-3">
                    {xp.points.map((p, j) => (
                      <li key={j} className="relative pl-6 text-[1.02rem] text-inkdim">
                        <span className="absolute left-0 font-mono text-signal">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
