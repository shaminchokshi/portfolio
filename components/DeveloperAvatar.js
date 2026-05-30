"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// A stylized, friendly "Disney-ish" male developer character built from
// primitives (no external model needed). Big expressive head, hair, brows,
// hoodie, idle breathing + blinking + head bob + a gentle wave. The jaw and
// mouth lip-sync while `speakingRef.current` is true.
export default function DeveloperAvatar({ speakingRef }) {
  const root = useRef();
  const head = useRef();
  const jaw = useRef();
  const mouth = useRef();
  const browL = useRef();
  const browR = useRef();
  const lidL = useRef();
  const lidR = useRef();
  const pupilL = useRef();
  const pupilR = useRef();
  const chest = useRef();
  const armWave = useRef();

  const level = useRef(0);
  const blink = useRef(Math.random() * 3);

  const skin = "#e8b692";
  const skinShadow = "#d89b78";
  const hair = "#2a2018";
  const hoodie = "#11161c";
  const hoodieTrim = "#d4ff45";

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // follow cursor (head + slight body)
    if (head.current) {
      head.current.rotation.y += (state.pointer.x * 0.5 - head.current.rotation.y) * 0.06;
      head.current.rotation.x += (-state.pointer.y * 0.3 - head.current.rotation.x) * 0.06;
    }
    if (root.current) {
      root.current.rotation.y += (state.pointer.x * 0.15 - root.current.rotation.y) * 0.04;
      root.current.position.y = -0.2 + Math.sin(t * 1.4) * 0.03; // gentle float
    }
    // breathing
    if (chest.current) {
      const b = 1 + Math.sin(t * 1.6) * 0.03;
      chest.current.scale.set(1, b, 1);
    }

    // lip-sync: mouth opens + jaw drops while speaking
    const desired = speakingRef && speakingRef.current ? 0.3 + Math.random() * 0.7 : 0;
    level.current += (desired - level.current) * 0.35;
    if (mouth.current) {
      mouth.current.scale.y = 0.25 + level.current * 1.6;
      mouth.current.scale.x = 1 - level.current * 0.25;
    }
    if (jaw.current) jaw.current.position.y = -0.62 - level.current * 0.1;
    // brows lift a touch while talking = expressive
    const browLift = level.current * 0.05;
    if (browL.current) browL.current.position.y = 0.34 + browLift + Math.sin(t * 0.7) * 0.01;
    if (browR.current) browR.current.position.y = 0.34 + browLift + Math.sin(t * 0.7 + 1) * 0.01;

    // blink
    blink.current += delta;
    let lid = 0;
    if (blink.current > 3.2) {
      const p = (blink.current - 3.2) / 0.16;
      lid = p < 0.5 ? p * 2 : (1 - p) * 2;
      if (blink.current > 3.36) blink.current = 0;
    }
    if (lidL.current) lidL.current.scale.y = lid;
    if (lidR.current) lidR.current.scale.y = lid;
    // pupils drift (alive)
    const px = Math.sin(t * 0.6) * 0.03 + state.pointer.x * 0.04;
    const py = Math.cos(t * 0.5) * 0.02 - state.pointer.y * 0.03;
    [pupilL, pupilR].forEach((r) => {
      if (r.current) {
        r.current.position.x = (r === pupilL ? -0.22 : 0.22) + px;
        r.current.position.y = 0.1 + py;
      }
    });

    // friendly wave when speaking, otherwise rests
    if (armWave.current) {
      const target = speakingRef && speakingRef.current ? Math.sin(t * 6) * 0.35 - 0.2 : 1.15;
      armWave.current.rotation.z += (target - armWave.current.rotation.z) * 0.08;
    }
  });

  return (
    <group ref={root} scale={1.1} position={[0, -0.2, 0]}>
      {/* ===== BODY (hoodie) ===== */}
      <group ref={chest} position={[0, -1.15, 0]}>
        {/* torso */}
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.62, 0.5, 8, 16]} />
          <meshStandardMaterial color={hoodie} roughness={0.7} metalness={0.05} />
        </mesh>
        {/* hoodie collar trim */}
        <mesh position={[0, 0.42, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.06, 12, 32]} />
          <meshStandardMaterial color={hoodieTrim} roughness={0.7} metalness={0.05} emissive={hoodieTrim} emissiveIntensity={0.5} />
        </mesh>
        {/* left arm (static, resting) */}
        <mesh position={[-0.7, -0.1, 0]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.16, 0.6, 6, 12]} />
          <meshStandardMaterial color={hoodie} roughness={0.7} metalness={0.05} />
        </mesh>
        {/* right arm (waves) */}
        <group ref={armWave} position={[0.6, 0.18, 0]}>
          <mesh position={[0.18, -0.35, 0]}>
            <capsuleGeometry args={[0.15, 0.6, 6, 12]} />
            <meshStandardMaterial color={hoodie} roughness={0.7} metalness={0.05} />
          </mesh>
          {/* hand */}
          <mesh position={[0.32, -0.72, 0]}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.7} metalness={0.05} />
          </mesh>
        </group>
      </group>

      {/* ===== HEAD ===== */}
      <group ref={head} position={[0, 0.15, 0]}>
        {/* face/skull — slightly oval, Disney-big */}
        <mesh scale={[1, 1.08, 0.95]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color={skin} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* hair — swept top */}
        <mesh position={[0, 0.5, -0.04]} scale={[1.02, 0.7, 1.02]}>
          <sphereGeometry args={[0.95, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
          <meshStandardMaterial color={hair} roughness={0.9} metalness={0.05} />
        </mesh>
        {/* side fringe */}
        <mesh position={[0.35, 0.45, 0.55]} rotation={[0.3, 0, -0.4]} scale={[0.5, 0.3, 0.3]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color={hair} roughness={0.9} metalness={0.05} />
        </mesh>

        {/* ears */}
        <mesh position={[-0.92, 0.02, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={skinShadow} roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0.92, 0.02, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={skinShadow} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* eyes — whites */}
        <mesh position={[-0.32, 0.1, 0.78]}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0.32, 0.1, 0.78]}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* pupils */}
        <mesh ref={pupilL} position={[-0.32, 0.1, 0.95]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color="#3a2a1a" />
        </mesh>
        <mesh ref={pupilR} position={[0.32, 0.1, 0.95]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color="#3a2a1a" />
        </mesh>
        {/* eyelids (blink) — skin discs that scale down to cover eyes */}
        <mesh ref={lidL} position={[-0.32, 0.1, 0.82]} scale={[1, 0, 1]}>
          <sphereGeometry args={[0.21, 24, 24]} />
          <meshStandardMaterial color={skin} roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh ref={lidR} position={[0.32, 0.1, 0.82]} scale={[1, 0, 1]}>
          <sphereGeometry args={[0.21, 24, 24]} />
          <meshStandardMaterial color={skin} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* eyebrows */}
        <mesh ref={browL} position={[-0.32, 0.34, 0.86]} rotation={[0, 0, 0.12]}>
          <boxGeometry args={[0.28, 0.06, 0.08]} />
          <meshStandardMaterial color={hair} roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh ref={browR} position={[0.32, 0.34, 0.86]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[0.28, 0.06, 0.08]} />
          <meshStandardMaterial color={hair} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* nose */}
        <mesh position={[0, -0.08, 0.92]}>
          <coneGeometry args={[0.12, 0.26, 16]} />
          <meshStandardMaterial color={skinShadow} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* glasses — developer vibe */}
        <group position={[0, 0.1, 0.92]}>
          <mesh position={[-0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.025, 12, 28]} />
            <meshStandardMaterial color="#0c0e11" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.025, 12, 28]} />
            <meshStandardMaterial color="#0c0e11" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.18, 0.03, 0.03]} />
            <meshStandardMaterial color="#0c0e11" />
          </mesh>
        </group>

        {/* jaw + mouth */}
        <group ref={jaw} position={[0, -0.62, 0.7]}>
          {/* mouth cavity (scales with speech) */}
          <mesh ref={mouth} position={[0, 0.05, 0.12]} scale={[1, 0.25, 1]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color="#5a2230" roughness={0.6} />
          </mesh>
          {/* smile line */}
          <mesh position={[0, -0.02, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.02, 8, 20, Math.PI]} />
            <meshStandardMaterial color={skinShadow} roughness={0.7} metalness={0.05} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
