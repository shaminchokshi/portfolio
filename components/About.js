import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Counter from "./Counter";
import { METRICS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          index="01"
          label="Profile"
          title={
            <>
              I turn ambiguous problems into <em className="text-signal [font-style:italic]">agents</em> that act, and data into decisions.
            </>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-2">
          <div>
            <Reveal delay={0.08}>
              <p className="mb-5 text-[1.18rem] text-inkdim">
                I'm a <b className="font-semibold text-ink">Generative AI Data Scientist at Bright Horizons</b> with a Master's in Data Architecture & Management from Northeastern. My work lives at the intersection of large language models, autonomous agents, and applied machine learning.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mb-5 text-[1.18rem] text-inkdim">
                From <b className="font-semibold text-ink">RAG-powered counseling chatbots</b> to <b className="font-semibold text-ink">multi-agent fraud detection</b> that prevented $10M in erroneous payouts, I care about systems that are reliable, measurable, and genuinely useful — not demos. I ship end-to-end: data pipelines, training, evaluation, and CI/CD.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-[1.18rem] text-inkdim">Northeastern GenAI Hackathon winner. Builder of things people actually use.</p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-bg p-7 hoverable">
                  <div className="font-display text-[3.2rem] leading-none text-signal">
                    <Counter num={m.num} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-inkdim">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
