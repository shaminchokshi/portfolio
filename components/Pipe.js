"use client";

// CSS ROPE — fixed on screen, spanning the TOP HALF of the viewport, at the
// same X the avatar hangs from (ROPE_X). The avatar's window snaps to this X
// when grabbed, so his raised hand meets the rope = visually attached.
const ROPE_X = 0.82; // must match AvatarJourney ROPE_X

export default function Pipe() {
  return (
    <div
      className="pointer-events-none fixed z-[35]"
      style={{
        left: `${ROPE_X * 100}%`,
        top: 0,
        height: "50vh",           // HALF the screen
        width: 14,
        transform: "translateX(-50%)",
      }}
    >
      {/* anchor knot at the very top */}
      <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-signal/70 shadow-[0_0_12px_rgba(212,255,69,0.6)]" />
      {/* the rope */}
      <div className="bgfx-rope absolute left-1/2 top-0 h-full w-[6px] -translate-x-1/2 rounded-full" />
    </div>
  );
} 