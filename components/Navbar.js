"use client";
import { useEffect, useState } from "react";

const LINKS = [
  ["01", "About", "#about"],
  ["02", "Experience", "#experience"],
  ["03", "Education", "#education"],
  ["04", "Skills", "#skills"],
  ["05", "Projects", "#projects"],
  ["06", "Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[200] flex items-center justify-between border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-bg/70 px-6 py-3 backdrop-blur-xl md:px-10"
          : "border-transparent px-6 py-5 md:px-10"
      }`}
    >
      <a href="#top" className="flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.18em]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-signal shadow-[0_0_14px_var(--tw-shadow-color)] shadow-signal" />
        Shamin Chokshi
      </a>
      <div className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.12em] md:flex">
        {LINKS.map(([n, label, href]) => (
          <a key={href} href={href} className="group relative text-inkdim transition hover:text-ink">
            <span className="text-signal">{n}</span> {label}
            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </nav>
  );
}
