"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Star, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/experience";

const typeConfig = {
  work: { icon: <Briefcase size={12} />, color: "var(--primary)", bg: "var(--primary-muted)", label: "Work" },
  education: { icon: <GraduationCap size={12} />, color: "#059669", bg: "rgba(5,150,105,0.1)", label: "Education" },
  leadership: { icon: <Star size={12} />, color: "#d97706", bg: "rgba(217,119,6,0.1)", label: "Leadership" },
};

export function Timeline() {
  return (
    <section
      id="experience"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="section-tag">// experience</span>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.93rem", marginTop: "0.5rem" }}>
            Work, education, and leadership — in chronological order.
          </p>
        </motion.div>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 12,
              bottom: 12,
              width: 2,
              background: "linear-gradient(to bottom, var(--primary), transparent)",
              borderRadius: 2,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experiences.map((exp, i) => {
              const cfg = typeConfig[exp.type];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  viewport={{ once: true, margin: "-60px" }}
                  style={{ position: "relative" }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -26,
                      top: 18,
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: cfg.color,
                      border: "2px solid var(--background)",
                      boxShadow: `0 0 0 3px ${cfg.bg}`,
                    }}
                  />

                  <div className="card" style={{ padding: "1.1rem 1.3rem" }}>
                    {/* Top */}
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <div>
                        {/* Type badge */}
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            padding: "0.12rem 0.45rem",
                            borderRadius: 5,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            fontFamily: "'Fira Code', monospace",
                            background: cfg.bg,
                            color: cfg.color,
                            marginBottom: "0.35rem",
                          }}
                        >
                          {cfg.icon} {cfg.label}
                        </span>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.1rem" }}>
                          {exp.role}
                        </h3>
                        <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--primary)" }}>
                          {exp.company}
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem", flexShrink: 0 }}>
                        <div
                          style={{
                            display: "flex", alignItems: "center", gap: "0.25rem",
                            fontFamily: "'Fira Code', monospace",
                            fontSize: "0.72rem",
                            color: "var(--foreground-muted)",
                          }}
                        >
                          <Calendar size={10} />
                          {exp.startDate} — {exp.endDate}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem", color: "var(--foreground-muted)" }}>
                          <MapPin size={10} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {exp.description.map((d, di) => (
                        <li key={di} style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.6, display: "flex", gap: "0.45rem" }}>
                          <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.3rem" }}>›</span>
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {exp.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
