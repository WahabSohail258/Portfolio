"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, BrainCircuit, Eye, TrendingUp, Cpu, Code2, Zap } from "lucide-react";
import { ParticleCanvas } from "./particle-canvas";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const specialties = [
  { icon: <BrainCircuit size={16} strokeWidth={1.6} />, label: "AI Engineer" },
  { icon: <Eye size={16} strokeWidth={1.6} />, label: "Computer Vision" },
  { icon: <TrendingUp size={16} strokeWidth={1.6} />, label: "Machine Learning" },
  { icon: <Cpu size={16} strokeWidth={1.6} />, label: "Embedded Systems" },
  { icon: <Code2 size={16} strokeWidth={1.6} />, label: "Python Developer" },
  { icon: <Zap size={16} strokeWidth={1.6} />, label: "Edge Computing" },
];

/** Splits a string into per-word spans for the stagger reveal. */
function StaggerWords({
  text,
  baseDelay = 0,
  style,
}: {
  text: string;
  baseDelay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <motion.span
            style={style}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: baseDelay + i * 0.055, ease: EASE }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: content drifts up + fades slightly as you scroll away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (      <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "var(--background)",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Layer 1 — particle depth field (bottom) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5 }}>
        <ParticleCanvas />
      </div>

      {/* Layer 2 — drifting aurora orbs */}
      <div aria-hidden className="aurora aurora-a" style={{ zIndex: 0 }} />
      <div aria-hidden className="aurora aurora-b" style={{ zIndex: 0 }} />
      <div aria-hidden className="aurora aurora-c" style={{ zIndex: 0 }} />

      {/* Layer 3 — fine grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(var(--primary-rgb), 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb), 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        className="section-container"
        style={{ paddingBottom: "4rem", position: "relative", zIndex: 1, y: contentY, opacity: contentOpacity }}
      >
        {/* Main heading — word-by-word rise */}
        <h1
          className="hero-heading"
          style={{
            fontWeight: 800,
            lineHeight: 1.12,
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
            marginBottom: "0",
          }}
        >
          <StaggerWords text="Building intelligent" baseDelay={0.1} />
          <br />
          <StaggerWords text="systems across" baseDelay={0.28} />
        </h1>

        {/* Accent word — rises + unblurs */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "var(--primary)",
            fontStyle: "italic",
            marginBottom: "1.5rem",
          }}
        >
          AI &amp; embedded
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6, ease: EASE }}
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            color: "var(--foreground-muted)",
            maxWidth: 500,
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          I build intelligent systems that connect{" "}
          <strong style={{ color: "var(--foreground)" }}>AI,</strong>{" "}
          <strong style={{ color: "var(--foreground)" }}>hardware</strong> and{" "}
          <strong style={{ color: "var(--foreground)" }}>product execution</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.72, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}
        >
          <button
            onClick={scrollToAbout}
            id="begin-journey"
            className="btn-primary shine"
            style={{ fontSize: "0.95rem", padding: "0.7rem 1.5rem" }}
          >
            Begin the Journey
          </button>
          <a
            href="/Wahab_Resume.pdf"
            download
            id="download-resume"
            className="btn-secondary"
            style={{ fontSize: "0.95rem", padding: "0.7rem 1.5rem" }}
          >
            <Download size={15} />
            Resume
          </a>
        </motion.div>

        {/* Specialty pills — cascade in with slight spring */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } } }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}
        >
          {specialties.map((s) => (
            <motion.span
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.92 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.45rem 0.95rem",
                borderRadius: 999,
                border: "1.5px solid rgba(76,175,80,0.4)",
                background: "rgba(76,175,80,0.06)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--primary)",
                cursor: "default",
                letterSpacing: "0.01em",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(76,175,80,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(76,175,80,0.65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(76,175,80,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(76,175,80,0.4)";
              }}
            >
              {s.icon}
              {s.label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue — fixed at hero bottom */}
      <motion.button
        aria-label="Scroll down"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "1.75rem", left: "50%",
          transform: "translateX(-50%)", zIndex: 1,
          background: "none", border: "none", padding: "0.35rem",
        }}
      >
        <div className="scroll-cue" />
      </motion.button>
    </section>
  );
}
