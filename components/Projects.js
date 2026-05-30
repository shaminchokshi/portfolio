import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          index="05"
          label="Selected Projects"
          title={
            <>
              Things I <em className="text-signal [font-style:italic]">shipped</em> for fun and real users.
            </>
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="hoverable group relative h-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg2 to-bg p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-signal/40">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_120%_at_100%_0,rgba(212,255,69,0.12),transparent_50%)]" />
                <div className="relative">
                  <div className="mb-5 inline-block rounded-full border border-signal/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">{p.tag}</div>
                  <div className="float-right font-mono text-[10px] tracking-[0.06em] text-inkfaint">{p.when}</div>
                  <h3 className="mb-3.5 font-display text-[2.1rem]">{p.title}</h3>
                  <p className="mb-6 text-[1.02rem] text-inkdim">{p.desc}</p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-5 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-3.5 py-2 font-mono text-[11px] tracking-[0.04em] text-signal transition hover:bg-signal hover:text-black"
                    >
                      <span>{p.linkLabel || "View project"}</span>
                      <span>↗</span>
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-inkdim">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
