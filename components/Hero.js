"use client";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.15 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Hero() {
  return (
    <header id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 animate-pulse-slow [background:radial-gradient(60vw_60vw_at_78%_8%,rgba(212,255,69,0.10),transparent_60%),radial-gradient(50vw_50vw_at_10%_85%,rgba(110,231,216,0.08),transparent_60%)]" />

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-10 px-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div custom={1} variants={fade} initial="hidden" animate="show" className="mb-6 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.28em] text-signal">
            <span className="h-px w-10 bg-signal" /> Generative AI · Data Science
          </motion.div>

          <motion.h1 custom={2} variants={fade} initial="hidden" animate="show" className="font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            Shamin
            <br />
            <em className="text-signal not-italic [font-style:italic]">Chokshi</em>
          </motion.h1>

          <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="my-6 font-mono text-[clamp(0.85rem,1.5vw,1rem)] uppercase tracking-[0.16em] text-inkdim">
            <span className="text-signal">▮</span> {PROFILE.role} · {PROFILE.location}
          </motion.div>

          <motion.p custom={4} variants={fade} initial="hidden" animate="show" className="mb-9 max-w-[540px] text-[1.12rem] text-inkdim">
            I build <b className="font-semibold text-ink">agentic AI systems</b>, RAG pipelines, and ML at production scale — turning messy data and language into products that save money and ship fast.
          </motion.p>

          <motion.div custom={5} variants={fade} initial="hidden" animate="show" className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2.5 rounded-full bg-signal px-6 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,255,69,0.4)]">
              View Work <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] transition hover:-translate-y-0.5 hover:border-ink hover:bg-white/5">
              Get in touch
            </a>
            <a href="/resume.pdf" target="_blank" className="rounded-full border border-line px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] transition hover:-translate-y-0.5 hover:border-ink hover:bg-white/5">
              Résumé
            </a>
          </motion.div>
        </div>

        {/* Right column intentionally light — the roaming character walks the
            whole page (mounted at page level), so no avatar lives here. */}
        <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="relative hidden md:flex md:h-[420px] md:items-end md:justify-center">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
            meet the dev · he walks, then hangs from the rope · press SPACE to drop &amp; walk
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-inkfaint">
        Scroll
        <span className="h-10 w-px animate-scrollline bg-gradient-to-b from-signal to-transparent" />
      </div>
    </header>
  );
}