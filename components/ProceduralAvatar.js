"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// A stylized, always-works 3D "AI head". Its mouth (a voice-equalizer)
// animates while `speakingRef.current` is true.
export default function ProceduralAvatar({ speakingRef }) {
  const group = useRef();
  const wire = useRef();
  const halo = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const bars = useRef([]);
  const level = useRef(0);
  const blink = useRef(0);

  const barX = [-0.36, -0.18, 0, 0.18, 0.36];

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += (state.pointer.x * 0.5 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * 0.05;
      group.current.position.y = Math.sin(t * 0.8) * 0.06;
    }
    if (wire.current) wire.current.rotation.y += delta * 0.15;
    if (halo.current) halo.current.rotation.z -= delta * 0.4;

    // mouth level — lively jitter while speaking, eases to 0 when silent
    const desired = speakingRef && speakingRef.current ? 0.25 + Math.random() * 0.75 : 0;
    level.current += (desired - level.current) * 0.35;
    bars.current.forEach((b, i) => {
      if (!b) return;
      const h = 0.08 + level.current * 0.55 * (0.6 + 0.4 * Math.sin(i * 1.7 + t * 22));
      b.scale.y = Math.max(0.08, h);
    });

    // blink
    blink.current += delta;
    let s = 1;
    if (blink.current > 3.2) {
      const p = (blink.current - 3.2) / 0.16;
      s = p < 0.5 ? 1 - p * 2 : (p - 0.5) * 2;
      if (blink.current > 3.36) blink.current = 0;
    }
    if (eyeL.current) eyeL.current.scale.y = s;
    if (eyeR.current) eyeR.current.scale.y = s;
  });

  return (
    <group ref={group} scale={1.15}>
      {/* halo ring */}
      <mesh ref={halo} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 16, 120]} />
        <meshBasicMaterial color="#6ee7d8" transparent opacity={0.4} />
      </mesh>

      {/* solid faceted head */}
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#0c0e11" roughness={0.35} metalness={0.6} flatShading />
      </mesh>

      {/* glowing wireframe overlay */}
      <mesh ref={wire} scale={1.02}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#d4ff45" wireframe transparent opacity={0.25} />
      </mesh>

      {/* eyes */}
      <mesh ref={eyeL} position={[-0.34, 0.2, 1.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#6ee7d8" emissive="#6ee7d8" emissiveIntensity={2.6} />
      </mesh>
      <mesh ref={eyeR} position={[0.34, 0.2, 1.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#6ee7d8" emissive="#6ee7d8" emissiveIntensity={2.6} />
      </mesh>

      {/* mouth equalizer */}
      <group position={[0, -0.42, 1.0]}>
        {barX.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} ref={(el) => (bars.current[i] = el)}>
            <boxGeometry args={[0.1, 0.4, 0.06]} />
            <meshStandardMaterial color="#d4ff45" emissive="#d4ff45" emissiveIntensity={1.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
