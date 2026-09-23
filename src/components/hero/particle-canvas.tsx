"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const count = 3000;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = t + mouse.y * 0.15;
    ref.current.rotation.y = t + mouse.x * 0.15;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

export function ParticleCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  // Default true (fail-safe): if IntersectionObserver is unavailable or the
  // tab is hidden, the canvas mounts exactly like the old always-on behavior.
  const [onScreen, setOnScreen] = useState(true);
  const [render, setRender] = useState(false);

  // Respect prefers-reduced-motion: keep the static starfield, drop the
  // continuous animation loop (and its GPU/battery cost).
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // IntersectionObserver: unmount the whole Canvas when the hero scrolls away
  // (frees the WebGL context, GPU buffers and the per-frame render loop).
  // Unmounting is delayed ~350ms so boundary scrolling (in/out within the
  // rootMargin band) doesn't thrash WebGL context creation/destruction.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(unmountTimer);
          setOnScreen(true);
        } else {
          clearTimeout(unmountTimer);
          unmountTimer = setTimeout(() => setOnScreen(false), 350);
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(host);
    return () => {
      clearTimeout(unmountTimer);
      observer.disconnect();
    };
  }, []);

  // Mount the Canvas only after first paint so it never competes with LCP.
  useEffect(() => {
    const id = requestAnimationFrame(() => setRender(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Freeze the loop while the tab is hidden (r3f keeps driving frames when
  // occluded on some platforms — switch frameloop via state instead).
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      ref={hostRef}
      style={{ position: "absolute", inset: 0, opacity: reducedMotion ? 0.35 : 1 }}
    >
      {render && onScreen && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          style={{ position: "absolute", inset: 0 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          // Cap DPR: defaults to devicePixelRatio (up to 3x on retina/phones),
          // which quadruples fragment work for a soft background field nobody
          // inspects at native resolution.
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? "demand" : tabVisible ? "always" : "never"}
        >
          <ParticleField />
        </Canvas>
      )}
    </div>
  );
}
