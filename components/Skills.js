import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          index="04"
          label="Toolkit"
          title={
            <>
              The <em className="text-signal [font-style:italic]">stack</em> I build with.
            </>
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="hoverable h-full bg-bg p-8 transition-colors duration-300 hover:bg-bg2">
                <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{s.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-[0.96rem] text-inkdim">{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
