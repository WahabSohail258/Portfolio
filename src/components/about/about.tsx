"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 3D tilt card wrapper — follows the cursor
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 140, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xFrac = (e.clientX - rect.left) / rect.width - 0.5;
    const yFrac = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xFrac);
    mouseY.set(yFrac);
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
            background: `radial-gradient(circle 240px at ${glow.x}px ${glow.y}px, rgba(76,175,80,0.14) 0%, transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

/** Divider line that draws itself horizontally when scrolled into view. */
function DrawDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        margin: "1rem 0",
        transformOrigin: "left",
      }}
    />
  );
}

/** Section heading inside the terminal that types itself. */
function TypedHeading() {
  return (
    <div style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.4rem", minHeight: "1.2em" }}>
      <span style={{ opacity: 0.7 }}>$&nbsp;</span>
      <TypeAnimation
        sequence={["whoami", 900, "AI Engineer — conversational AI & voice", 0]}
        wrapper="span"
        speed={45}
        cursor={true}
        repeat={0}
        style={{ display: "inline-block" }}
      />
    </div>
  );
}

// Stagger variants for terminal blocks
const termBlock: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: EASE },
  }),
};

export function About() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* Soft aurora in the section background */}
      <div aria-hidden className="aurora aurora-b" style={{ opacity: 0.05 }} />

      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="section-tag">// about</span>
          <h2 className="section-title">
            Who am I<span className="gradient-text">?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
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

              {/* Terminal body — blocks stagger in like a script executing */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                style={{ padding: "1.75rem", fontFamily: "'Fira Code', monospace", fontSize: "0.92rem", lineHeight: 1.85 }}
              >
                {/* $ WHOAMI — typed */}
                <motion.div custom={0} variants={termBlock}>
                  <TypedHeading />
                </motion.div>
                <motion.div
                  custom={1}
                  variants={termBlock}
                  style={{ color: "#cdd6f4", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.2rem" }}
                >
                  Wahab Sohail 🤚{" "}
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: "#a6b0c3", fontSize: "0.95rem" }}>
                    Making machines speak Urdu.
                  </span>
                </motion.div>

                <DrawDivider delay={0.15} />

                {/* AT A GLANCE */}
                <motion.div custom={2} variants={termBlock} style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  AT A GLANCE
                </motion.div>
                <motion.div custom={3} variants={termBlock} style={{ color: "#cdd6f4", marginBottom: "0.25rem", fontSize: "0.92rem" }}>
                  <span style={{ color: "#4caf50" }}>→</span>{" "}
                  Computer Engineering @ NUST — Class of 2026, Islamabad, Pakistan
                </motion.div>
                <motion.div custom={4} variants={termBlock} style={{ color: "#cdd6f4", fontSize: "0.92rem" }}>
                  <span style={{ color: "#4caf50" }}>→</span>{" "}
                  Into{" "}
                  <span style={{ color: "#89dceb" }}>conversational AI, Urdu voice systems, LLM agents</span>
                  <span style={{ fontFamily: "Poppins, sans-serif", color: "#a6b0c3" }}> — grounded, evaluated, and shipped to real users.</span>
                </motion.div>

                <DrawDivider delay={0.2} />

                {/* EXPERIENCE */}
                <motion.div custom={5} variants={termBlock} style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  EXPERIENCE
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#cdd6f4", marginBottom: "0.2rem", fontWeight: 500, fontSize: "0.92rem" }}>
                  AI Engineer @ Blue Group of Companies{" "}
                  <span style={{ color: "#6c7086", fontWeight: 400 }}>· 2025 – Present</span>
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.2rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Urdu conversational voice agent: local LLM generation, Coqui TTS, RAG grounding
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.75rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Domain LLM fine-tuning with Hugging Face + PEFT/LoRA on English &amp; Roman Urdu
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#cdd6f4", marginBottom: "0.2rem", fontWeight: 500, fontSize: "0.92rem" }}>
                  ML Intern @ RISETech Pvt. Ltd.{" "}
                  <span style={{ color: "#6c7086", fontWeight: 400 }}>· July – Aug 2025</span>
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.2rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  AI &amp; data-driven research: preprocessing, model training, deep learning pipelines
                </motion.div>
                <motion.div custom={6} variants={termBlock} style={{ color: "#a6b0c3", paddingLeft: "0.85rem", marginBottom: "0.75rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Healthcare &amp; biomedical AI solutions using TensorFlow, PyTorch, Scikit-learn
                </motion.div>
                <motion.div custom={7} variants={termBlock} style={{ color: "#cdd6f4", marginBottom: "0.2rem", fontWeight: 500, fontSize: "0.92rem" }}>
                  Intern @ NCRA (National Centre of Robotics &amp; Automation){" "}
                  <span style={{ color: "#6c7086", fontWeight: 400 }}>· Aug – Sep 2024</span>
                </motion.div>
                <motion.div custom={7} variants={termBlock} style={{ color: "#a6b0c3", paddingLeft: "0.85rem", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem" }}>
                  <span style={{ color: "#6c7086" }}>—</span>{" "}
                  Edge AI on Raspberry Pi &amp; Jetson Nano, CUDA, Linux DevOps, Docker
                </motion.div>

                <DrawDivider delay={0.2} />

                {/* ALSO BUILDING */}
                <motion.div custom={8} variants={termBlock} style={{ color: "#4caf50", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: "0.55rem" }}>
                  ALSO BUILDING
                </motion.div>
                <motion.div custom={9} variants={termBlock} style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Side projects spanning multi-agent research systems, ticket-resolution agents, and low-resource Urdu speech tools.
                  Comfortable in{" "}
                  <span style={{ color: "#89dceb", fontFamily: "'Fira Code', monospace" }}>Python, C++,</span>
                  {" "}and{" "}
                  <span style={{ color: "#89dceb", fontFamily: "'Fira Code', monospace" }}>the modern LLM stack</span>
                  {" "}— always curious what&apos;s next.
                </motion.div>

                <DrawDivider delay={0.15} />

                {/* Footer quote */}
                <motion.div custom={10} variants={termBlock} style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  Debugging mindset:{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>House MD</span>
                  {" "}· shipping like{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>Harvey Specter</span>
                  {" "}· midnight commits with{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>Walter White</span>
                  {" "}energy 🧠
                </motion.div>
                <motion.div custom={10} variants={termBlock} style={{ color: "#a6b0c3", fontFamily: "Poppins, sans-serif", fontSize: "0.88rem", marginTop: "0.45rem" }}>
                  I like products that{" "}
                  <span style={{ color: "#cdd6f4", fontFamily: "'Fira Code', monospace" }}>tell a story</span>
                  , fix a real problem, and feel a bit more human. 🌐
                </motion.div>

                {/* Me in a nutshell */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
                  style={{ textAlign: "right", marginTop: "1.25rem", color: "#6c7086", fontSize: "0.75rem" }}
                >
                  Me in a nutshell<br />
                  <span style={{ color: "#4caf50" }}>Code. Coffee. Ship.</span>
                </motion.div>
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
