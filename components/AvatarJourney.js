"use client";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import RealisticAvatar from "./RealisticAvatar";

// STATE MACHINE (only active in the rope region: About -> Contact)
//  grabbed = true  -> HANGS from the rope; rides the scroll down/up.
//  grabbed = false -> WALKS freely; Arrow/A-D move him on X (scroll-independent).
//
// TRANSITIONS:
//  - SPACE while hanging  -> release & drop (walk mode).
//  - SPACE while walking  -> walk to the rope & grab it.
//  - SCROLL while walking -> auto walk to the rope, grab, then ride the scroll.
const ROPE_X = 0.82;            // rope horizontal position (fraction of width)
const TOP_ID = "about";
const BOTTOM_ID = "contact";
const sideFor = (i) => (i % 2 === 0 ? 0.74 : 0.26); // hero zig-zag

export default function AvatarJourney() {
  const walker = useRef();
  const stateRef = useRef({ walking: 0, jumping: 0, facing: 1, sliding: 0 });
  const url = process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.glb";

  const inRegion = useRef(false);   // are we in the rope region?
  const grabbed = useRef(true);     // hanging (true) vs walking (false)
  const freeX = useRef(ROPE_X);     // his x when walking freely
  const keyDir = useRef(0);
  const scrollP = useRef(0);        // 0..1 progress through rope region
  const target = useRef({ x: 0.74, y: 0.4 });
  const pos = useRef({ x: 0.74, y: 0.4 });

  useEffect(() => {
    const rectFor = (id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect() : null;
    };

    let lastScrollY = window.scrollY;

    const compute = () => {
      const vh = innerHeight;
      const aboutR = rectFor(TOP_ID);
      const contactR = rectFor(BOTTOM_ID);
      if (!aboutR || !contactR) return;

      const region = aboutR.top <= vh * 0.45;
      inRegion.current = region;

      // progress through the rope region (0 at About, 1 at Contact)
      const span = contactR.top - aboutR.top;
      const along = span !== 0 ? (vh * 0.45 - aboutR.top) / span : 1;
      scrollP.current = Math.min(1, Math.max(0, along));

      // detect a scroll while WALKING in-region -> auto-grab the rope
      const sy = window.scrollY;
      const scrolled = Math.abs(sy - lastScrollY) > 1;
      lastScrollY = sy;
      if (region && !grabbed.current && scrolled) {
        grabbed.current = true; // he'll walk to the rope (loop handles approach)
      }

      if (!region) {
        // ---- HERO WALK (above About): zig-zag with scroll ----
        grabbed.current = true; // reset so he re-grabs on entering region
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? sy / max : 0;
        const N = 2;
        const seg = Math.min(N - 1e-4, Math.max(0, (p / 0.28) * N));
        const i = Math.floor(seg);
        const frac = seg - i;
        const x0 = sideFor(i), x1 = sideFor(i + 1);
        target.current.x = x0 + (x1 - x0) * frac;
        target.current.y = 0.4;
        stateRef.current.facing = x1 >= x0 ? 1 : -1;
      }
    };

    compute();
    addEventListener("scroll", compute, { passive: true });
    addEventListener("resize", compute);

    const onDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (inRegion.current) {
          grabbed.current = !grabbed.current;
          // when dropping, start free-walk from current x
          if (!grabbed.current) freeX.current = pos.current.x;
        }
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keyDir.current = 1;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keyDir.current = -1;
    };
    const onUp = (e) => {
      if (["ArrowRight", "ArrowLeft", "a", "A", "d", "D"].includes(e.key)) keyDir.current = 0;
    };
    addEventListener("keydown", onDown);
    addEventListener("keyup", onUp);

    let raf;
    const loop = () => {
      const tg = target.current, pc = pos.current;

      if (inRegion.current) {
        if (grabbed.current) {
          // HANGING: move to rope X, ride scroll vertically
          tg.x = ROPE_X;
          tg.y = 0.16 + scrollP.current * 0.55;
        } else {
          // WALKING: free X via keys, fixed comfortable height
          freeX.current = Math.min(0.92, Math.max(0.08, freeX.current + keyDir.current * 0.011));
          tg.x = freeX.current;
          tg.y = 0.62; // stand lower (feet on ground band)
          if (keyDir.current !== 0) stateRef.current.facing = keyDir.current;
        }
      }

      const dx = tg.x - pc.x, dy = tg.y - pc.y;
      pc.x += dx * 0.1;
      pc.y += dy * 0.12;

      // He is only "hanging" once he's actually reached the rope (dx small).
      const atRope = Math.abs(pc.x - ROPE_X) < 0.02;
      const hangNow = inRegion.current && grabbed.current && atRope ? 1 : 0;
      stateRef.current.sliding += (hangNow - stateRef.current.sliding) * 0.12;

      // walking when moving horizontally (approaching rope or key-walking)
      const keyWalk = !grabbed.current && keyDir.current ? 1 : 0;
      const approaching = grabbed.current && !atRope ? 1 : 0;
      stateRef.current.walking = (1 - stateRef.current.sliding) * Math.min(1, Math.abs(dx) * 70 + keyWalk + approaching);
      stateRef.current.jumping = 0;

      if (walker.current) {
        const vw = innerWidth, vh = innerHeight;
        const cx = pc.x * vw, cy = pc.y * vh;
        walker.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
        // publish the gripping HAND position so the CSS rope can meet it.
        // hand sits near the top of the 460px window when arm is raised.
        const WIN_H = 460;
        window.__rope = window.__rope || {}; window.__rope.handX = cx;
        window.__rope.handY = cy; // middle of the avatar div
        window.__rope.grabbed = stateRef.current.sliding > 0.5;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      removeEventListener("scroll", compute);
      removeEventListener("resize", compute);
      removeEventListener("keydown", onDown);
      removeEventListener("keyup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={walker}
      style={{ position: "fixed", left: 0, top: 0, width: 320, height: 680, zIndex: 40, pointerEvents: "none" }}
    >
      <Canvas camera={{ position: [2, -1.0, 13.5], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.99} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-4, 1, 3]} intensity={18} color="#6ee7d8" />
        <pointLight position={[3, -1, 2]} intensity={12} color="#ffffff" />
        <Sparkles count={40} scale={5} size={2} speed={0.4} color="#d4ff45" opacity={0.4} />
        <Suspense fallback={null}>
          <RealisticAvatar url={url} stateRef={stateRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}