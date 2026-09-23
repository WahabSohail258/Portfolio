"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    // rAF-throttled: coalesces bursty scroll events to one check per display frame
    let ticking = false;
    const update = () => {
      ticking = false;
      setShow(window.scrollY > 400);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update(); // sync initial state without waiting for a scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (ticking) ticking = false;
    };
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const r = 20; // svg circle radius (viewBox 44)
  const circ = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          onClick={scrollTop}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 55,
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            // Promote while animating in/out only (AnimatePresence unmounts after exit)
            willChange: "transform, opacity",
          }}
        >
          {/* Scroll progress ring */}
          <svg
            width="44" height="44"
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)", pointerEvents: "none" }}
          >
            <circle cx="22" cy="22" r={r} fill="none" stroke="var(--border)" strokeWidth="2" />
            <motion.circle
              cx="22" cy="22" r={r}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circ}
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={16} style={{ position: "relative" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
