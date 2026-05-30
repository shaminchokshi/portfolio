"use client";
import { useEffect, useRef } from "react";

// Layered, dynamic background:
//  1) drifting aurora blobs (CSS, GPU-cheap)
//  2) animated grid that parallax-shifts on scroll
//  3) floating particle field (canvas)
//  4) scroll-reactive glow that follows progress down the page
// All fixed, behind content (-z), pointer-events none.
export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const gridRef = useRef(null);

  // particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf;
    const N = 70;
    const pts = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    };
    resize();
    addEventListener("resize", resize);

    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.6 + 0.4) * dpr,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // connecting lines
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < N; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 130 * dpr;
          if (d2 < max * max) {
            const o = (1 - Math.sqrt(d2) / max) * 0.16;
            ctx.strokeStyle = `rgba(212,255,69,${o})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // dots
      for (const p of pts) {
        ctx.fillStyle = "rgba(212,255,69,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);

  // scroll-reactive glow + grid parallax
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      if (glowRef.current) {
        // glow drifts diagonally as you scroll
        const x = 50 + Math.sin(p * Math.PI * 2) * 30;
        const y = 10 + p * 80;
        glowRef.current.style.background = `radial-gradient(40vw 40vw at ${x}% ${y}%, rgba(212,255,69,0.14), transparent 60%)`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${p * -120}px)`;
      }
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base tint */}
      <div className="absolute inset-0 bg-bg" />

      {/* aurora blobs */}
      <div className="bgfx-aurora absolute inset-0" />

      {/* moving grid */}
      <div ref={gridRef} className="bgfx-grid absolute inset-[-20%]" />

      {/* particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* scroll-reactive glow */}
      <div ref={glowRef} className="absolute inset-0" />

      {/* vignette to keep text crisp */}
      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_0,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}