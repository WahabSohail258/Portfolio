"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { skillTree } from "@/data/skills";

/**
 * SkillConstellation — the "skills constellation" visualization (v2).
 *
 * Design language: monochrome terminal-green, a precise ring of 8 category
 * hubs around a central core, tight leaf clusters, thin edges. One hue keeps
 * it professional; hierarchy comes from brightness, not a rainbow. Hovering
 * a hub highlights its cluster and dims the rest.
 *
 * Geometry is sized so nodes + labels always sit inside the frame (no edge
 * clipping): hub ring R=1.78, camera distance ≥5.9 on a 42° FOV keeps the
 * outermost label ≥0.4 world-units from the frame edge.
 */

const GREEN = "#4caf50";
const GREEN_SOFT = "#8ff0a4";

interface ClusterSpec {
  name: string;
  hub: THREE.Vector3;
  leaves: { name: string; pos: THREE.Vector3 }[];
}

function buildClusters(): ClusterSpec[] {
  const R = 1.78;
  return skillTree.map((folder, i) => {
    const angle = (i / skillTree.length) * Math.PI * 2 - Math.PI / 2;
    const hub = new THREE.Vector3(Math.cos(angle) * R, Math.sin(angle) * R * 0.62, Math.sin(angle * 2) * 0.25);
    const leaves = folder.files.map((file, j) => {
      const count = folder.files.length;
      const a = (j / count) * Math.PI * 2 + i * 1.3;
      const lr = 0.44 + (j % 2) * 0.1;
      return {
        name: file.name,
        pos: hub
          .clone()
          .add(new THREE.Vector3(Math.cos(a) * lr, Math.sin(a * 1.9) * 0.2, Math.sin(a) * lr * 0.7)),
      };
    });
    return { name: folder.name, hub, leaves };
  });
}

function Constellation({ reduced }: { reduced: boolean }) {
  const clusters = useMemo(buildClusters, []);
  const orbitRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;
  const growRef = useRef(reduced ? 1 : 0);
  const camera = useThree(({ camera }) => camera);
  useFrame((state, dt) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const clampedDt = Math.min(dt, 0.05);

    if (!reduced) growRef.current = Math.min(1, growRef.current + clampedDt / 1.1);
    const eased = 1 - Math.pow(1 - growRef.current, 3);

    if (orbitRef.current) {
      orbitRef.current.rotation.z = t * 0.05;
      orbitRef.current.scale.setScalar(0.001 + eased * 0.999);
      const pointer = state.pointer;
      orbitRef.current.rotation.x = THREE.MathUtils.lerp(orbitRef.current.rotation.x, -0.18 + pointer.y * 0.06, 0.03);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.16;
      coreRef.current.rotation.x = -t * 0.07;
      const pulse = reduced ? 1 : 1 + Math.sin(t * 1.5) * 0.05;
      coreRef.current.scale.setScalar(eased * pulse);
    }

    // Fit the graph inside the frame: portrait hosts sit farther back
    const el = state.gl.domElement;
    const aspect = el.clientWidth / Math.max(1, el.clientHeight);
    const dist = aspect < 0.9 ? 6.5 : 5.9;
    if (Math.abs(camera.position.z - dist) > 0.01) {
      camera.position.z += (dist - camera.position.z) * 0.08;
    }
  });

  return (
    <>
      {/* Core — the engineer at the center */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.24, 0]} />
          <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.85} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.075, 14, 14]} />
          <meshBasicMaterial color={GREEN_SOFT} />
        </mesh>
      </group>

      {/* Sparse star backdrop */}
      <Stars />

      <group ref={orbitRef}>
        {clusters.map((cluster, ci) => {
          const active = hovered === ci;
          const dimmed = hovered !== null && !active;
          return (
            <group key={cluster.name}>
              {/* Hub node */}
              <mesh
                position={cluster.hub}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(ci);
                }}
                onPointerOut={() => setHovered((h) => (h === ci ? null : h))}
              >
                <octahedronGeometry args={[0.13, 0]} />
                <meshBasicMaterial color={active ? "#ffffff" : GREEN} transparent opacity={dimmed ? 0.35 : 1} />
              </mesh>

              {/* Hub label — dim by default, brightens on hover */}
              <Html position={cluster.hub} center style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
                <div
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 9,
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    color: active ? "#ffffff" : "rgba(220, 235, 225, 0.5)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                    transition: "color 0.25s",
                  }}
                >
                  {cluster.name}
                </div>
              </Html>

              {/* Spine: core → hub */}
              <Line
                points={[[0, 0, 0], cluster.hub]}
                color={GREEN}
                transparent
                opacity={active ? 0.8 : dimmed ? 0.07 : 0.28}
                lineWidth={active ? 1.5 : 1}
              />

              {/* Leaves */}
              {cluster.leaves.map((leaf) => (
                <Line
                  key={leaf.name + "-e"}
                  points={[cluster.hub, leaf.pos]}
                  color={GREEN}
                  transparent
                  opacity={active ? 0.5 : dimmed ? 0.04 : 0.14}
                  lineWidth={1}
                />
              ))}
              {cluster.leaves.map((leaf) => (
                <mesh key={leaf.name} position={leaf.pos}>
                  <sphereGeometry args={[0.032, 8, 8]} />
                  <meshBasicMaterial
                    color={active ? "#ffffff" : GREEN_SOFT}
                    transparent
                    opacity={active ? 0.95 : dimmed ? 0.2 : 0.5}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
    </>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const N = 110;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 3.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color={GREEN_SOFT} transparent opacity={0.3} sizeAttenuation depthWrite={false} />
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
    const onVis = () => {
      setTabVisible(!document.hidden);
      // IO callbacks can be starved while the tab is hidden — re-sync the
      // onscreen state once when the tab becomes visible again.
      if (!document.hidden && hostRef.current) {
        const r = hostRef.current.getBoundingClientRect();
        setOnScreen(r.width > 0 && r.bottom > -100 && r.top < window.innerHeight + 100);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Mount after first paint (LCP-safe), with a setTimeout fallback for
  // occluded/rAF-hostile environments.
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
      className="skill-constellation-host"
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
        background: "radial-gradient(ellipse 78% 62% at 50% 44%, #0c1410 0%, #070b09 70%)",
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
        <span style={{ color: GREEN, fontWeight: 700 }}>$</span> skill-graph --interactive · hover a hub
      </div>

      {render && onScreen && (
        <Canvas
          camera={{ position: [0, 0, 5.9], fov: 42 }}
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
