 "use client";
import { useRef, useMemo, useEffect } from "react";
import { useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

// DUMB RENDERER driven by stateRef { walking, jumping, facing, sliding }.
//  - walking -> step bob + arm/leg swing
//  - sliding -> legs together & slightly forward, arms tucked, gentle lean
//               (as if sliding down the pipe); subtle wobble
//  - idle standing -> raise right arm to point
const SCALE = 6.5;
const FACE = Math.PI;
const BASE_Y = -2.2;

export default function RealisticAvatar({ url, stateRef }) {
  const root = useRef();
  const gltf = useLoader(GLTFLoader, url);
  const scene = gltf.scene;
  const { actions, names } = useAnimations(gltf.animations || [], root);
  const pointing = useRef(0);

  const bones = useMemo(() => {
    const b = {};
    scene.traverse((o) => {
      if (!o.isBone) return;
      const n = o.name.toLowerCase();
      if (/head/.test(n) && !b.head) b.head = o;
      if (/neck/.test(n) && !b.neck) b.neck = o;
      if (/(spine|chest)/.test(n) && !b.spine) b.spine = o;
      if (/(rightarm|right_arm|upperarm.?r|arm.?r|shoulder.?r|rightshoulder|mixamorigrightarm)/.test(n) && !b.armR) b.armR = o;
      if (/(rightforearm|forearm.?r|lowerarm.?r|mixamorigrightforearm)/.test(n) && !b.foreR) b.foreR = o;
      if (/(righthand|hand.?r|mixamorigrighthand)/.test(n) && !b.handR && !/forearm|finger|thumb|index|middle|ring|pinky/.test(n)) b.handR = o;
      if (/(leftforearm|forearm.?l|lowerarm.?l|mixamorigleftforearm)/.test(n) && !b.foreL) b.foreL = o;
      if (/(rightleg|shin.?r|calf.?r|mixamorigrightleg)/.test(n) && !b.shinR && !/upleg/.test(n) && /leg|shin|calf/.test(n)) b.shinR = o;
      if (/(leftleg|shin.?l|calf.?l|mixamorigleftleg)/.test(n) && !b.shinL && !/upleg/.test(n) && /leg|shin|calf/.test(n)) b.shinL = o;
      if (/(leftarm|left_arm|upperarm.?l|arm.?l|shoulder.?l|leftshoulder|mixamorigleftarm)/.test(n) && !b.armL) b.armL = o;
      if (/(rightupleg|rightleg|upleg.?r|leg.?r|thigh.?r|mixamorigrightupleg)/.test(n) && !b.legR) b.legR = o;
      if (/(leftupleg|leftleg|upleg.?l|leg.?l|thigh.?l|mixamorigleftupleg)/.test(n) && !b.legL) b.legL = o;
    });
    Object.values(b).forEach((bn) => {
      bn.userData._rest = { x: bn.rotation.x, y: bn.rotation.y, z: bn.rotation.z };
    });
    return b;
  }, [scene]);

  useMemo(() => {
    const idle = names && names[0];
    if (idle && actions[idle]) actions[idle].reset().fadeIn(0.3).play();
  }, [actions, names]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const st = (stateRef && stateRef.current) || {};
    const walking = st.walking || 0;
    const facing = st.facing || 1;
    const sliding = st.sliding || 0;

    // no auto-pointing — keep idle clean
    pointing.current += (0 - pointing.current) * 0.1;

    const step = Math.sin(t * 11);
    const wobble = Math.sin(t * 5) * 0.04; // subtle slide wobble

    // gentle pendulum sway while hanging from the rope
    const sway = Math.sin(t * 1.6) * 0.18;        // body swing angle
    const swayLag = Math.sin(t * 1.6 - 0.5) * 0.1; // legs lag behind for life

    if (root.current) {
      // FACE THE USER while hanging; walking adds slight turn toward travel.
      const faceY = FACE + (facing >= 0 ? -0.45 : 0.45) * walking;
      root.current.rotation.y += (faceY - root.current.rotation.y) * 0.1;
      // SWAY: rotate the whole body around Z like a pendulum while hanging
      root.current.rotation.x = walking * step * 0.04;
      root.current.rotation.z = sliding * sway;
      root.current.scale.y = SCALE;
      root.current.scale.x = root.current.scale.z = SCALE;
      // hangs a touch higher so the raised hand meets the rope above
      root.current.position.y = BASE_Y + walking * Math.abs(step) * 0.06 - sliding * 0.1;
      // shift body LEFT while hanging so his raised RIGHT hand meets the rope
      root.current.position.x = -sliding * 0.9;
    }

    // LEGS dangle together with a slight lag-swing while hanging
    if (bones.legR) {
      const r = bones.legR.userData._rest;
      bones.legR.rotation.x = r.x + walking * step * 0.5 + sliding * (0.15 + swayLag);
      bones.legR.rotation.z = r.z - sliding * 0.04;
    }
    if (bones.legL) {
      const r = bones.legL.userData._rest;
      bones.legL.rotation.x = r.x - walking * step * 0.5 + sliding * (0.12 - swayLag);
      bones.legL.rotation.z = r.z + sliding * 0.04;
    }
    if (bones.shinR) {
      const r = bones.shinR.userData._rest;
      bones.shinR.rotation.x = r.x - sliding * 0.25;
    }
    if (bones.shinL) {
      const r = bones.shinL.userData._rest;
      bones.shinL.rotation.x = r.x - sliding * 0.3;
    }

    // ONE-HAND HANG: RIGHT arm FULLY EXTENDED straight overhead gripping the rope;
    // LEFT arm hangs relaxed at the side.
    if (bones.armR) {
      const r = bones.armR.userData._rest;
      const swingW = walking * step * 0.4;
      if (sliding > 0.05) {
        // Point the upper arm STRAIGHT UP via lookAt (axis-independent, reliable).
        // World point high above the shoulder:
        bones.armR.updateWorldMatrix(true, false);
        const up = new THREE.Vector3();
        bones.armR.getWorldPosition(up);
        up.y += 100; // far above
        bones.armR.lookAt(up);
        // bone "forward" is usually +Y for limbs, so rotate so its length aligns up
        bones.armR.rotateX(Math.PI / 2);
      } else {
        bones.armR.rotation.set(r.x + swingW, r.y, r.z);
      }
    }
    if (bones.foreR) {
      const r = bones.foreR.userData._rest;
      if (sliding > 0.05) {
        // keep forearm straight in line with upper arm
        bones.foreR.rotation.set(0, 0, 0);
      } else {
        bones.foreR.rotation.set(r.x, r.y, r.z);
      }
    }
    if (bones.armL) {
      const r = bones.armL.userData._rest;
      bones.armL.rotation.x = r.x - walking * step * 0.4 + sliding * 0.1; // relaxed at side
      bones.armL.rotation.z = r.z;
    }
    if (bones.foreL) {
      const r = bones.foreL.userData._rest;
      bones.foreL.rotation.x = r.x + sliding * 0.1;
    }

    if (bones.spine) {
      const r = bones.spine.userData._rest;
      bones.spine.rotation.y = r.y + walking * step * 0.06;
      bones.spine.rotation.z = r.z - sliding * sway * 0.3; // body curves with the sway
    }
    // head faces the user (no big turn needed — he's already front-facing)
    if (bones.neck) {
      const r = bones.neck.userData._rest;
      bones.neck.rotation.y += (r.y - bones.neck.rotation.y) * 0.08;
    }
    if (bones.head) {
      const r = bones.head.userData._rest;
      bones.head.rotation.y += (r.y + state.pointer.x * 0.15 - bones.head.rotation.y) * 0.08;
      bones.head.rotation.x = r.x;
    }

  });

  return (
    <group ref={root} position={[0, BASE_Y, 0]} rotation={[0, FACE, 0]} scale={SCALE}>
      <primitive object={scene} />
    </group>
  );
}