"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, BrainCircuit, Eye, TrendingUp, Cpu, Code2, Zap } from "lucide-react";

const specialties = [
  { icon: <BrainCircuit size={16} strokeWidth={1.6} />, label: "AI Engineer" },
  { icon: <Eye size={16} strokeWidth={1.6} />, label: "Computer Vision" },
  { icon: <TrendingUp size={16} strokeWidth={1.6} />, label: "Machine Learning" },
  { icon: <Cpu size={16} strokeWidth={1.6} />, label: "Embedded Systems" },
  { icon: <Code2 size={16} strokeWidth={1.6} />, label: "Python Developer" },
  { icon: <Zap size={16} strokeWidth={1.6} />, label: "Edge Computing" },
];

export function Hero() {
  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
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
      {/* Subtle background glow */}
      <div aria-hidden style={{
        position: "absolute", top: "20%", right: "0%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(76,175,80,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ paddingBottom: "4rem" }}>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="hero-heading" style={{
            fontWeight: 800,
            lineHeight: 1.1,
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
            marginBottom: "0",
          }}>
            Building intelligent
            <br />
            systems across
          </h1>

          {/* Accent word — solid green, no gradient */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--primary)",
              fontStyle: "italic",
              marginBottom: "1.5rem",
            }}
          >
            AI &amp; embedded
          </motion.div>
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}
        >
          <button
            onClick={scrollDown}
            id="begin-journey"
            className="btn-primary"
            style={{ fontSize: "0.95rem", padding: "0.7rem 1.5rem" }}
          >
            Begin the Journey
            <ChevronDown size={16} />
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

        {/* Specialty pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}
        >
          {specialties.map((s, i) => (
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              whileHover={{ scale: 1.04, y: -1 }}
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
                transition: "background 0.15s, border-color 0.15s",
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
      </div>
    </section>
  );
}
