import Reveal from "./Reveal";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="px-8 pb-24 pt-36 text-center">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="mb-4 flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.24em] text-signal">
            <span className="h-2 w-2 rounded-full bg-signal" /> 06 — Let's talk
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.98] tracking-tight">
            Building something
            <br />
            with <em className="text-signal [font-style:italic]">AI?</em> Let's chat.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <a href={`mailto:${PROFILE.email}`} className="mt-8 inline-block border-b border-line pb-2 font-mono text-[clamp(0.9rem,2vw,1.3rem)] tracking-[0.04em] transition hover:border-signal hover:text-signal">
            {PROFILE.email}
          </a>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap justify-center gap-3.5">
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-inkdim transition hover:border-signal hover:bg-signal hover:text-black">
                {s.label}
              </a>
            ))}
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-inkdim transition hover:border-signal hover:bg-signal hover:text-black">
              {PROFILE.phone}
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1240px] flex-wrap justify-between gap-3.5 border-t border-line pt-8 text-left font-mono text-[11px] tracking-[0.08em] text-inkfaint">
        <span>© {new Date().getFullYear()} Shamin Chokshi</span>
        <span>Designed & built with intent · Boston, MA</span>
      </footer>
    </section>
  );
}
