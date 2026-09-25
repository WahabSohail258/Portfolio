"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { skillTree } from "@/data/skills";

/**
 * SkillConstellation — the "skills constellation" visualization.
 *
 * Each folder in `skills.ts` becomes an orbiting hub (octahedron crystal);
 * every skill inside it becomes a leaf node connected by a glowing edge.
 * Hovering a hub highlights its whole cluster. Idle motion is a slow orbit;
 * the camera parallaxes with the pointer. Everything animates via transforms
 * in the render loop (no React state per frame), the frameloop stops when
 * the canvas is offscreen or the tab is hidden, DPR is capped, and
 * prefers-reduced-motion renders one static frame.
 */

const CATEGORY_COLORS = ["#4caf50", "#89dceb", "#f59e0b", "#ba68c8", "#42a5f5", "#14b8a6", "#e8a838", "#f55036"];

interface ClusterSpec {
  name: string;
  color: string;
  hub: THREE.Vector3;
  leaves: { name: string; pos: THREE.Vector3 }[];
}

function buildClusters(): ClusterSpec[] {
  const R = 2.15;
  return skillTree.map((folder, i) => {
    const angle = (i / skillTree.length) * Math.PI * 2;
    const hub = new THREE.Vector3(
      Math.cos(angle) * R,
      Math.sin(angle * 2) * 0.42,
      Math.sin(angle) * R
    );
    const leaves = folder.files.map((file, j) => {
      const count = folder.files.length;
      const a = (j / count) * Math.PI * 2 + i * 0.8;
      const lr = count > 6 ? 0.68 : 0.58;
      return {
        name: file.name,
        pos: hub
          .clone()
          .add(new THREE.Vector3(Math.cos(a) * lr, Math.sin(a * 1.7) * 0.26, Math.sin(a) * lr)),
      };
    });
    return { name: folder.name, color: CATEGORY_COLORS[i % CATEGORY_COLORS.length], hub, leaves };
  });
}

function Constellation({ reduced }: { reduced: boolean }) {
  const { mouse, camera } = useThree();
  const clusters = useMemo(buildClusters, []);
  const orbitRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;
  const growRef = useRef(reduced ? 1 : 0);

  // Entrance growth trigger is owned by the parent (inView); ease toward 1.
  useFrame((state, dt) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const clampedDt = Math.min(dt, 0.05);

    // Ease the reveal
    if (!reduced) growRef.current = Math.min(1, growRef.current + clampedDt / 1.1);
    const g = growRef.current;
    const eased = 1 - Math.pow(1 - g, 3);

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.07;
      orbitRef.current.scale.setScalar(0.001 + eased * 0.999);
      // Gentle pointer parallax (added to orbit, doesn't fight hover)
      orbitRef.current.rotation.x = THREE.MathUtils.lerp(orbitRef.current.rotation.x, mouse.y * 0.12, 0.04);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.11;
      coreRef.current.rotation.z = t * 0.05;
      const pulse = reduced ? 1 : 1 + Math.sin(t * 1.4) * 0.04;
      coreRef.current.scale.setScalar(eased * pulse);
    }

    // Fit the graph inside the frame: portrait hosts (mobile) sit farther back
    const el = state.gl.domElement;
    const aspect = el.clientWidth / Math.max(1, el.clientHeight);
    const dist = aspect < 0.9 ? 6.3 : 5.7;
    if (Math.abs(camera.position.z - dist) > 0.01) {
      camera.position.z += (dist - camera.position.z) * 0.08;
    }
    // Hub crystals spin individually + cluster response on hover
    if (orbitRef.current) {
      orbitRef.current.children.forEach((child) => {
        const cluster = child.userData.clusterIndex as number | undefined;
        if (cluster !== undefined) {
          const target = hoveredRef.current === cluster ? 1.18 : 1;
          child.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
        }
      });
    }
  });

  return (
    <>
      {/* Camera parallax is handled by orbit tilt; keep camera fixed */}
      {/* Core — the "you" at the center */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.34, 0]} />
          <meshBasicMaterial color="#4caf50" wireframe transparent opacity={0.9} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color="#8ff0a4" />
        </mesh>
      </group>

      {/* Star backdrop */}
      <Points />

      <group ref={orbitRef}>
        {clusters.map((cluster, ci) => (
          <group key={cluster.name} userData={{ clusterIndex: ci }}>
            {/* Hub crystal */}
            <mesh
              position={cluster.hub}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(ci);
              }}
              onPointerOut={() => setHovered((h) => (h === ci ? null : h))}
            >
              <octahedronGeometry args={[0.17, 0]} />
              <meshBasicMaterial color={cluster.color} />
            </mesh>
            {/* Hub glow halo */}
            <mesh position={cluster.hub}>
              <sphereGeometry args={[0.28, 12, 12]} />
              <meshBasicMaterial color={cluster.color} transparent opacity={hovered === ci ? 0.16 : 0.07} depthWrite={false} />
            </mesh>
            {/* Hub label (DOM overlay, crisp text) */}
            <Html position={cluster.hub} center style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
              <div
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  color: hovered === ci ? "#fff" : cluster.color,
                  background: "rgba(5, 8, 7, 0.55)",
                  border: `1px solid ${hovered === ci ? cluster.color : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 4,
                  padding: "1px 6px",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {cluster.name}
              </div>
            </Html>

            {/* Edges: core → hub, hub → leaves */}
            <Line
              points={[[0, 0, 0], cluster.hub]}
              color={cluster.color}
              transparent
              opacity={hovered === ci ? 0.75 : 0.32}
              lineWidth={hovered === ci ? 1.6 : 1}
            />
            {cluster.leaves.map((leaf) => (
              <Line
                key={leaf.name + "-edge"}
                points={[cluster.hub, leaf.pos]}
                color={cluster.color}
                transparent
                opacity={hovered === ci ? 0.55 : 0.18}
                lineWidth={1}
              />
            ))}

            {/* Leaf nodes */}
            {cluster.leaves.map((leaf) => (
              <mesh key={leaf.name} position={leaf.pos}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color={hovered === ci ? "#ffffff" : cluster.color} transparent opacity={hovered === ci ? 0.95 : 0.7} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Subtle floor ring for grounding */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <ringGeometry args={[2.5, 2.54, 64]} />
        <meshBasicMaterial color="#4caf50" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

function Points() {
  const positions = useMemo(() => {
    const N = 140;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.55;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#89dceb" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function SkillConstellation() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [render, setRender] = useState(false);

  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Pause the frameloop when scrolled away (debounced against boundary thrash)
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timer);
          setOnScreen(true);
        } else {
          clearTimeout(timer);
          timer = setTimeout(() => setOnScreen(false), 350);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(host);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Mount after first paint so it never competes with LCP.
  // setTimeout fallback so hostile/occluded rAF environments still mount.
  useEffect(() => {
    let done = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if (done) return;
      done = true;
      setRender(true);
    };
    const rafId = requestAnimationFrame(go);
    timer = setTimeout(go, 300);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Interactive 3D constellation of skills — hover a hub to highlight its cluster"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
        aspectRatio: "1 / 1",
        maxHeight: 480,
        alignSelf: "start",
        justifySelf: "center",
        borderRadius: 16,
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 65% at 50% 42%, #0d1512 0%, #070b09 68%)",
        border: "1px solid rgba(var(--primary-rgb), 0.16)",
        boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.45)",
        opacity: reducedMotion ? 0.9 : 1,
      }}
    >
      {/* Corner brackets — echoes the project-card design language */}
      <div aria-hidden style={{ position: "absolute", inset: 10, pointerEvents: "none", zIndex: 2 }}>
        {[
          { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
          { top: 0, right: 0, borderLeft: "none", borderBottom: "none" },
          { bottom: 0, left: 0, borderRight: "none", borderTop: "none" },
          { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute", width: 12, height: 12,
              borderTop: "1.5px solid rgba(var(--primary-rgb), 0.4)",
              borderBottom: pos.borderBottom, borderLeft: pos.borderLeft, borderRight: pos.borderRight,
              ...pos,
            }}
          />
        ))}
      </div>

      {/* Caption bar */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: 12, left: 0, right: 0, zIndex: 2,
          display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem",
          fontFamily: "'Fira Code', monospace", fontSize: "0.62rem",
          color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", pointerEvents: "none",
        }}
      >
        <span style={{ color: "#4caf50", fontWeight: 700 }}>$</span> skill-graph --interactive · hover a hub
      </div>

      {render && onScreen && (
        <Canvas
          camera={{ position: [0, 0.4, 6.4], fov: 42 }}
          style={{ position: "absolute", inset: 0 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.75]}
          frameloop={reducedMotion ? "demand" : tabVisible ? "always" : "never"}
        >
          <Constellation reduced={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
