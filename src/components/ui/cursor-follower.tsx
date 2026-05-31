"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18 });
  const visible = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible.current) visible.current = true;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
