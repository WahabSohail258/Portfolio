"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Eye, MapPin, GraduationCap } from "lucide-react";

const ParticleCanvas = dynamic(
  () => import("./particle-canvas").then((m) => m.ParticleCanvas),
  { ssr: false }
);

const firstName = "Wahab";
const lastName = "Sohail";

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        background: "var(--background)",
      }}
    >
      {/* Particle background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5 }}>
        <ParticleCanvas />
      </div>

      {/* Subtle orb decorations */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Text */}
          <div>
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 0.85rem",
                borderRadius: 999,
                background: "var(--primary-muted)",
                border: "1px solid rgba(37,99,235,0.2)",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.75rem",
                  color: "var(--primary)",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                }}
              >
                open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <h1
              style={{
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1rem",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              }}
            >
              <div style={{ display: "flex", gap: "0.04em", flexWrap: "wrap" }}>
                {firstName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="gradient-text"
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.04em", flexWrap: "wrap" }}>
                {lastName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i + firstName.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: "inline-block", color: "var(--foreground)" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: "var(--foreground-muted)",
                marginBottom: "1.25rem",
                minHeight: 28,
              }}
            >
              <span style={{ color: "var(--primary)" }}>&gt; </span>
              <TypeAnimation
                sequence={[
                  "AI & ML Engineer",
                  2000,
                  "Computer Vision Engineer",
                  2000,
                  "Embedded Systems Developer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "Edge Computing Specialist",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: "var(--foreground)" }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{
                color: "var(--foreground-muted)",
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: "1.5rem",
              }}
            >
              Computer Engineering graduate from NUST — building AI-powered systems,
              real-time computer vision pipelines, and scalable full-stack applications.
            </motion.p>

            {/* Info chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}
            >
              {[
                { icon: <MapPin size={12} />, label: "Rawalpindi, Pakistan" },
                { icon: <GraduationCap size={12} />, label: "NUST Graduate" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.3rem 0.7rem",
                    borderRadius: 6,
                    background: "var(--tag-bg)",
                    border: "1px solid var(--card-border)",
                    fontSize: "0.78rem",
                    color: "var(--foreground-muted)",
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
            >
              <a
                href="#projects"
                id="view-my-work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                <Eye size={15} />
                View Projects
              </a>
              <a href="/Wahab_Resume.pdf" download id="download-cv" className="btn-secondary">
                <Download size={15} />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right: Avatar visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="hero-avatar hidden md:flex"
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Avatar ring */}
            <div
              className="animate-float"
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                padding: 3,
                boxShadow: "0 0 60px rgba(37,99,235,0.2)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "var(--card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                  userSelect: "none",
                }}
              >
                👨‍💻
              </div>
            </div>

            {/* Stats below avatar */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
              {[
                { value: "2+", label: "Internships" },
                { value: "6+", label: "Projects" },
                { value: "NUST", label: "Graduate" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    className="gradient-text"
                    style={{ fontWeight: 700, fontSize: "1.2rem", lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: "-2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: "var(--primary)" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
