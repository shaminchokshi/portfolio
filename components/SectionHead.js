import Reveal from "./Reveal";

export default function SectionHead({ index, label, title, children }) {
  return (
    <>
      <Reveal>
        <div className="mb-4 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.24em] text-signal">
          <span className="h-2 w-2 rounded-full bg-signal" />
          {index} — {label}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-[760px] font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight">
          {title}
        </h2>
      </Reveal>
      {children}
    </>
  );
}