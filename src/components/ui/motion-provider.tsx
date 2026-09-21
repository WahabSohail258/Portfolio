"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Global motion provider:
 * - LazyMotion (domAnimation) keeps the motion bundle lean.
 * - MotionConfig tracks prefers-reduced-motion so every framer-motion
 *   animation degrades gracefully to instant/none.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
