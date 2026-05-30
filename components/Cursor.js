"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.style.cursor = "none";
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const enter = () => ring.current && ring.current.classList.add("cursor-hover");
    const leave = () => ring.current && ring.current.classList.remove("cursor-hover");
    window.addEventListener("mousemove", move);
    loop();
    const targets = document.querySelectorAll("a,button,.hoverable");
    targets.forEach((t) => { t.addEventListener("mouseenter", enter); t.addEventListener("mouseleave", leave); });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      targets.forEach((t) => { t.removeEventListener("mouseenter", enter); t.removeEventListener("mouseleave", leave); });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[7px] w-[7px] rounded-full bg-signal mix-blend-difference" />
      <div ref={ring} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] h-[34px] w-[34px] rounded-full border border-white/50 mix-blend-difference transition-[width,height,border-color,background] duration-200" />
    </>
  );
}
