"use client";
import { Canvas } from "@react-three/fiber";
import { Sparkles, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import RealisticAvatar from "./RealisticAvatar";

// No talking — the character walks & jumps as you scroll.
export default function TalkingAvatar() {
  const url = process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.glb";

  return (
    <div className="relative h-[420px] w-full md:h-[480px]">
      <Canvas camera={{ position: [0, 0.5, 7], fov: 42 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} castShadow />
        <pointLight position={[-4, 1, 3]} intensity={18} color="#6ee7d8" />
        <pointLight position={[3, -1, 2]} intensity={12} color="#d4ff45" />
        <Sparkles count={50} scale={7} size={2} speed={0.4} color="#d4ff45" opacity={0.5} />
        <Suspense fallback={null}>
          <RealisticAvatar url={url} />
        </Suspense>
        <ContactShadows position={[0, -2.2, 0]} opacity={0.35} scale={6} blur={2.4} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}