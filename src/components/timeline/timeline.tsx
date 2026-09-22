"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Star, MapPin, ChevronDown } from "lucide-react";
import { experiences, Experience } from "@/data/experience";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Small icon per entry type — the only place colour varies, everything else stays on-theme */
const typeConfig = {
  work: { icon: <Briefcase size={12} strokeWidth={2.2} />, label: "Work" },
  education: { icon: <GraduationCap size={12} strokeWidth={2.2} />, label: "Education" },
  leadership: { icon: <Star size={12} strokeWidth={2.2} />, label: "Leadership" },
};

/* ── One timeline entry ─────────────────────────────────── */
function TimelineEntry({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[exp.type];
  const isLeft = index % 2 === 0;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        paddingBottom: "2rem",
      }}
      className="timeline-row"
    >
      {/* Center node — on-theme monogram avatar on the rail */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.08 }}
        className="timeline-node"
        style={{
          position: "absolute",
          left: "50%",
          top: 8,
          transform: "translateX(-50%)",
          width: 46,
          height: 46,
          borderRadius: 14,
          background: "var(--card)",
          border: "1.5px solid rgba(var(--primary-rgb), 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 6px var(--background), 0 6px 20px rgba(var(--primary-rgb), 0.18)",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Fira Code', monospace",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "var(--primary)",
            letterSpacing: "-0.02em",
          }}
        >
          {exp.monogram}
        </span>
      </motion.div>

      {/* Card — alternating sides, springs in from its side */}
      <motion.div
        initial={{ opacity: 0, y: 28, x: isLeft ? -30 : 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="timeline-card card"
        style={{ width: "calc(50% - 3rem)", position: "relative", zIndex: 1, overflow: "hidden" }}
      >
        {/* On-theme top edge */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, var(--primary), transparent)",
            opacity: 0.65,
          }}
        />

        <div style={{ padding: "1.15rem 1.3rem 1.05rem", position: "relative" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.55rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.16rem 0.55rem",
                borderRadius: 999,
                fontSize: "0.64rem",
                fontWeight: 700,
                fontFamily: "'Fira Code', monospace",
                background: "var(--primary-muted)",
                color: "var(--primary)",
                border: "1px solid rgba(var(--primary-rgb), 0.25)",
              }}
            >
              {cfg.icon} {cfg.label}
            </span>
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.68rem",
                color: "var(--foreground-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: exp.endDate === "Present" ? "var(--green)" : "var(--border)",
                  display: "inline-block",
                }}
              />
              {exp.startDate} — {exp.endDate}
            </span>
          </div>

          {/* Role + company */}
          <h3
            style={{
              fontSize: "1.02rem",
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: "0.15rem",
              lineHeight: 1.3,
            }}
          >
            {exp.role}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              flexWrap: "wrap",
              fontSize: "0.83rem",
              fontWeight: 600,
              color: "var(--primary)",
              marginBottom: "0.45rem",
            }}
          >
            {exp.company}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontWeight: 400, color: "var(--foreground-muted)", fontSize: "0.72rem" }}>
              <MapPin size={10} />
              {exp.location}
            </span>
          </div>

          {/* Highlight — the one-liner */}
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--foreground)",
              lineHeight: 1.55,
              marginBottom: expanded ? "0.85rem" : "0.9rem",
              fontWeight: 500,
            }}
          >
            {exp.highlight}
          </p>

          {/* Collapsible detail */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "0.85rem 1rem",
                    margin: "0 0 0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {exp.description.map((d, di) => (
                    <li
                      key={di}
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--foreground-muted)",
                        lineHeight: 1.6,
                        display: "flex",
                        gap: "0.45rem",
                      }}
                    >
                      <span style={{ color: "var(--primary)", flexShrink: 0, fontWeight: 700 }}>▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech tags — capped at 4 until expanded */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem", marginBottom: "0.65rem" }}>
            {exp.tech.slice(0, expanded ? undefined : 4).map((t) => (
              <span key={t} className="tech-tag" style={{ fontSize: "0.68rem" }}>
                {t}
              </span>
            ))}
            {!expanded && exp.tech.length > 4 && (
              <span className="tech-tag" style={{ fontSize: "0.68rem", color: "var(--primary)" }}>
                +{exp.tech.length - 4}
              </span>
            )}
          </div>

          {/* Toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: "0.76rem",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: "var(--primary)",
              transition: "opacity 0.2s ease",
            }}
          >
            {expanded ? "Show less" : "Show details"}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }} style={{ display: "inline-flex" }}>
              <ChevronDown size={13} />
            </motion.span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section
      id="experience"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden className="aurora aurora-b" style={{ opacity: 0.05 }} />

      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <span className="section-tag">// experience</span>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.93rem", marginTop: "0.5rem" }}>
            A quick tour of where I&apos;ve worked, studied and led.
          </p>
        </motion.div>

        {/* Scroll-progress rail */}
        <div style={{ position: "relative" }} ref={listRef}>
          <div
            aria-hidden
            className="timeline-rail"
            style={{
              position: "absolute",
              left: "50%",
              top: 20,
              bottom: 40,
              width: 2,
              transform: "translateX(-50%)",
              background: "var(--border)",
              borderRadius: 2,
            }}
          />
          <motion.div
            aria-hidden
            className="timeline-rail"
            style={{
              position: "absolute",
              left: "50%",
              top: 20,
              bottom: 40,
              width: 2,
              transform: "translateX(-50%)",
              transformOrigin: "top",
              background: "linear-gradient(to bottom, var(--primary), var(--accent))",
              borderRadius: 2,
              scaleY: lineScale,
            }}
          />

          <div>
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
