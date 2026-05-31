"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Star, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/experience";

const typeConfig = {
  work: {
    icon: <Briefcase size={14} />,
    color: "#2563eb",
    bg: "rgba(37,99,235,0.1)",
    label: "Work",
  },
  education: {
    icon: <GraduationCap size={14} />,
    color: "#059669",
    bg: "rgba(5,150,105,0.1)",
    label: "Education",
  },
  leadership: {
    icon: <Star size={14} />,
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
    label: "Leadership",
  },
};

export function Timeline() {
  return (
    <section
      id="experience"
      className="section-padding"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="section-tag">// experience</span>
          <h2 className="section-title">My Journey</h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: 500 }}>
            Work experience, education, and leadership roles.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, var(--primary), rgba(37,99,235,0.1))",
              borderRadius: 2,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {experiences.map((exp, i) => {
              const cfg = typeConfig[exp.type];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true, margin: "-60px" }}
                  style={{ position: "relative" }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -26,
                      top: 20,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: cfg.color,
                      border: "2px solid var(--background)",
                      boxShadow: `0 0 0 3px ${cfg.bg}`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="card"
                    style={{ padding: "1.25rem 1.5rem" }}
                  >
                    {/* Top row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              padding: "0.15rem 0.5rem",
                              borderRadius: 5,
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              fontFamily: "'Fira Code', monospace",
                              background: cfg.bg,
                              color: cfg.color,
                            }}
                          >
                            {cfg.icon} {cfg.label}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "var(--foreground)",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {exp.role}
                        </h3>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)" }}>
                          {exp.company}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.25rem",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.78rem",
                            color: "var(--foreground-muted)",
                            fontFamily: "'Fira Code', monospace",
                          }}
                        >
                          <Calendar size={11} />
                          {exp.startDate} — {exp.endDate}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.78rem",
                            color: "var(--foreground-muted)",
                          }}
                        >
                          <MapPin size={11} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description bullets */}
                    <ul style={{ margin: "0.5rem 0 0.75rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      {exp.description.map((d, di) => (
                        <li
                          key={di}
                          style={{
                            fontSize: "0.84rem",
                            color: "var(--foreground-muted)",
                            lineHeight: 1.6,
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "flex-start",
                          }}
                        >
                          <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.35rem" }}>›</span>
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
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
