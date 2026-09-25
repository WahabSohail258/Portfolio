"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HeroCrystal — the HxnDev-style scroll-driven 3D object for the hero.
 *
 * A wireframe icosahedron ("the signal") wrapped around a soft glowing core.
 * Scroll progress morphs it: pulls vertices outward (the crystal "opens"),
 * accelerates rotation and tilts the axis — so scrolling away from the hero
 * feels like the machine powering up and dissolving. Pointer position adds
 * a damped parallax tilt. All motion is transform-only inside the render
 * loop; vertex displacement writes into a pre-allocated buffer with zero
 * per-frame allocations.
 *
 * Props:
 *  - progressRef: 0..1 hero scroll progress, updated by the parent via a
 *    ref (no React state per frame).
 */

export interface CrystalProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

export function HeroCrystal({ progressRef, reducedMotion }: CrystalProps) {
  const rigRef = useRef<THREE.Group>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);

  const basePos = useRef<Float32Array | null>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const smoothProgress = useRef(0);
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = reducedMotion ? 0 : state.clock.elapsedTime;

    // Damped scroll progress — the crystal glides, never snaps
    smoothProgress.current += (progressRef.current - smoothProgress.current) * Math.min(1, dt * 5);
    const p = smoothProgress.current;

    // Damped pointer parallax
    const pointer = state.pointer;
    smoothMouse.current.x += (pointer.x - smoothMouse.current.x) * Math.min(1, dt * 3);
    smoothMouse.current.y += (pointer.y - smoothMouse.current.y) * Math.min(1, dt * 3);
    const mx = reducedMotion ? 0 : smoothMouse.current.x;
    const my = reducedMotion ? 0 : smoothMouse.current.y;

    /* ── Responsive rig: right of the headline on wide screens,
          softly above-center behind the text on narrow ones ── */
    if (rigRef.current) {
      const wide = state.viewport.aspect > 1.05;
      const targetPos = wide ? [1.12, 0.05, -1.3] : [0, 0.58, -1.75];
      const targetScale = wide ? 0.55 : 0.4;
      rigRef.current.position.x += (targetPos[0] - rigRef.current.position.x) * 0.08;
      rigRef.current.position.y += (targetPos[1] - rigRef.current.position.y) * 0.08;
      rigRef.current.position.z += (targetPos[2] - rigRef.current.position.z) * 0.08;
      const s = rigRef.current.scale.x + (targetScale - rigRef.current.scale.x) * 0.08;
      rigRef.current.scale.setScalar(s);
    }

    /* ── Rotation: idle spin + scroll acceleration + pointer tilt ── */
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.18 + p * 2.4 + mx * 0.45;
      wireRef.current.rotation.x = 0.28 + my * 0.3 + p * 0.9;
      wireRef.current.rotation.z = Math.sin(t * 0.22) * 0.08 + p * 0.35;

      /* ── Vertex morph: vertices bulge outward with scroll ── */
      const geo = wireRef.current.geometry as THREE.BufferGeometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      if (!basePos.current) {
        basePos.current = new Float32Array(pos.array as Float32Array);
      }
      const base = basePos.current;
      const arr = pos.array as Float32Array;
      const bulge = 1 + p * 0.55 + (reducedMotion ? 0 : Math.sin(t * 0.9) * 0.02);
      const spike = p * 0.35;
      for (let i = 0; i < arr.length; i += 3) {
        tmp.set(base[i], base[i + 1], base[i + 2]);
        const len = tmp.length() || 1;
        // outward bulge + subtle scroll-proportional wobble
        const wobble = spike * Math.sin(tmp.y * 3.1 + t * 1.3) * Math.cos(tmp.x * 2.7);
        const scale = bulge + wobble / len;
        arr[i] = base[i] * scale;
        arr[i + 1] = base[i + 1] * scale;
        arr[i + 2] = base[i + 2] * scale;
      }
      pos.needsUpdate = true;
    }

    /* ── Inner core: counter-rotation + breathing ── */
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.3 - p * 1.6;
      coreRef.current.rotation.z = t * 0.14;
      const breathe = reducedMotion ? 1 : 1 + Math.sin(t * 1.8) * 0.06;
      coreRef.current.scale.setScalar(breathe * (1 - p * 0.35));
    }

    /* ── Outer shell: fades + expands as you scroll away ── */
    if (shellRef.current) {
      const shellMat = shellRef.current.material as THREE.MeshBasicMaterial;
      shellMat.opacity = 0.05 + p * 0.12;
      shellRef.current.scale.setScalar(1 + p * 1.6);
      shellRef.current.rotation.y = t * 0.05 - p * 0.8;
    }
  });

  return (
    <group ref={rigRef} scale={0.001}>
      {/* Wireframe crystal */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#4caf50" wireframe transparent opacity={0.32} />
      </mesh>

      {/* Glowing inner core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshBasicMaterial color="#8ff0a4" transparent opacity={0.16} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#c8ffd8" transparent opacity={0.85} />
      </mesh>

      {/* Faint outer shell that blooms on scroll */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.45, 0]} />
        <meshBasicMaterial color="#4caf50" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
