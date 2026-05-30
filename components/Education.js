import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          index="03"
          label="Education"
          title={
            <>
              How I <em className="text-signal [font-style:italic]">learned</em> to build.
            </>
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="hoverable group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg2 to-bg p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-signal/40">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_120%_at_100%_0,rgba(212,255,69,0.10),transparent_50%)]" />
                <div className="relative">
                  <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{e.when} · {e.where}</div>
                  <h3 className="font-display text-[2rem] leading-tight">{e.school}</h3>
                  <p className="mt-2 text-[1.05rem] text-ink">{e.degree}</p>
                  <p className="mt-4 text-[0.98rem] text-inkdim">{e.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
