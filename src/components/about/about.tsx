"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 3D tilt card wrapper — follows the cursor
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xFrac = (e.clientX - rect.left) / rect.width - 0.5;
    const yFrac = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xFrac);
    mouseY.set(yFrac);
    // Pixel position for the glow (relative to card)
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setGlow(null);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Cursor-tracking glow */}
      {glow && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            pointerEvents: "none",
            zIndex: 2,
            background: `radial-gradient(circle 220px at ${glow.x}px ${glow.y}px, rgba(76,175,80,0.13) 0%, transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="section-tag">// about</span>
          <h2 className="section-title">
            Who am I<span className="gradient-text">?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ maxWidth: 820, margin: "0 auto" }}
        >
          <TiltCard>
            <div className="terminal-window">
              {/* Title bar */}
              <div className="terminal-titlebar">
                <div className="terminal-dots">
                  <div className="terminal-dot" style={{ background: "#ff5f57" }} />
                  <div className="terminal-dot" style={{ background: "#ffbd2e" }} />
                  <div className="terminal-dot" style={{ background: "#28c840" }} />
                </div>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
                  ══ CODE FILES ══ ···
                </span>
                <div style={{ width: 50 }} />
              </div>

              {/* Terminal body */}
              <div style={{ padding: "1.75rem", fontFamily: "'Fira Code', monospace", fontSize: "0.92rem", lineHeight: 1.85 }}>

                {/* $ WHOAMI */}
                <div style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                  $ WHOAMI — FROM MY POV
                </div>
                <div style={{ color: "#cdd6f4", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                  Wahab Sohail 🤚{" "}
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: "#a6b0c3", fontSize: "0.95rem" }}>
                    Coffee in one hand, keyboard in the other.
                  </span>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "1rem 0" }} />

                {/* AT A GLANCE */}
                <div style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  AT A GLANCE
                </div>
                <div style={{ color: "#cdd6f4", marginBottom: "0.25rem", fontSize: "0.92rem" }}>
                  <span style={{ color: "#4caf50" }}>→</span>{" "}
                  Computer Engineering @ NUST — Class of 2026, Islamabad, Pakistan
                </div>
                <div style={{ color: "#cdd6f4", fontSize: "0.92rem" }}>
                  <span style={{ color: "#4caf50" }}>→</span>{" "}
                  Into{" "}
                  <span style={{ color: "#89dceb" }}>AI, machine learning, embedded systems</span>
                  <span style={{ fontFamily: "Poppins, sans-serif", color: "#a6b0c3" }}> — building things that ship in the real world.</span>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "1rem 0" }} />

                {/* EXPERIENCE */}
                <div style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  EXPERIENCE
                </div>
                <div style={{ color: "#cdd6f4", marginBottom: "0.2rem", fontWeight: 500, fontSize: "0.92rem" }}>
                  ML Intern @ RISETech Pvt. Ltd.{" "}
                  <span style={{ color: "#6c7086", fontWeight: 400 }}>· July – Aug 2025</span>
                </div>
                <div style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.2rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  AI &amp; data-driven research: preprocessing, model training, deep learning pipelines
                </div>
                <div style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.75rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Healthcare &amp; biomedical AI solutions using TensorFlow, PyTorch, Scikit-learn
                </div>
                <div style={{ color: "#cdd6f4", marginBottom: "0.2rem", fontWeight: 500, fontSize: "0.92rem" }}>
                  Intern @ NCRA (National Centre of Robotics &amp; Automation){" "}
                  <span style={{ color: "#6c7086", fontWeight: 400 }}>· Aug – Sep 2024</span>
                </div>
                <div style={{ color: "#a6b0c3", paddingLeft: "0.85rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Edge AI on Raspberry Pi &amp; Jetson Nano, CUDA, Linux DevOps, Docker
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "1rem 0" }} />

                {/* ALSO BUILDING */}
                <div style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  ALSO BUILDING
                </div>
                <div style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Side projects spanning computer vision, autonomous systems, and full-stack AI apps.
                  Comfortable in{" "}
                  <span style={{ color: "#89dceb", fontFamily: "'Fira Code', monospace" }}>Python, C++,</span>
                  {" "}and{" "}
                  <span style={{ color: "#89dceb", fontFamily: "'Fira Code', monospace" }}>common ML stacks</span>
                  {" "}— always curious what&apos;s next.
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "1rem 0" }} />

                {/* Footer quote */}
                <div style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  Debugging mindset:{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>House MD</span>
                  {" "}· shipping like{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>Harvey Specter</span>
                  {" "}· midnight commits with{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>Walter White</span>
                  {" "}energy 🧠
                </div>
                <div style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem", marginTop: "0.45rem" }}>
                  I like products that{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>tell a story</span>
                  , fix a real problem, and feel a bit more human. 🌐
                </div>

                {/* Me in a nutshell */}
                <div style={{ textAlign: "right", marginTop: "1.25rem", color: "#6c7086", fontSize: "0.75rem" }}>
                  Me in a nutshell<br />
                  <span style={{ color: "#4caf50" }}>Code. Coffee. Ship.</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
