"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 30 };
  const ringSpring = { stiffness: 150, damping: 20 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const smoothRingX = useSpring(ringX, ringSpring);
  const smoothRingY = useSpring(ringY, ringSpring);

  const scaleRef = useRef(1);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleEnter = () => {
      scaleRef.current = 1.8;
    };
    const handleLeave = () => {
      scaleRef.current = 1;
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="cursor-ring hidden md:block"
        style={{ x: smoothRingX, y: smoothRingY }}
      />
    </>
  );
}
