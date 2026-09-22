"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";

/**
 * Global motion provider:
 * - LazyMotion (domMax) enables layout animations + gestures while keeping
 *   the bundle lean (needed for nav pill slide, project grid reflow, etc.)
 * - MotionConfig gives every animation a consistent, soft default curve and
 *   tracks prefers-reduced-motion so animations degrade gracefully.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict={false}>
      <MotionConfig
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        reducedMotion="user"
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
