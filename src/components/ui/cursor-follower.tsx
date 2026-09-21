"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 160, damping: 20, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 160, damping: 20, mass: 0.6 });
  const visible = useRef(false);
  const ringEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible.current) {
        visible.current = true;
        document.documentElement.style.setProperty("cursor", "auto");
      }
      // Grow the ring over interactive elements
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      if (ringEl.current) {
        ringEl.current.style.transform = `translate(-50%, -50%) scale(${interactive ? 1.8 : 1})`;
        ringEl.current.style.borderColor = interactive
          ? "rgba(var(--primary-rgb), 0.8)"
          : "rgba(var(--primary-rgb), 0.45)";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        ref={ringEl}
        className="cursor-ring"
        style={{ x: ringX, y: ringY, transition: "transform 0.18s ease, border-color 0.18s ease" }}
      />
    </>
  );
}
