"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Brain, Globe, Server } from "lucide-react";
import { projects } from "@/data/projects";

const filters = [
  { key: "all", label: "All" },
  { key: "aiml", label: "AI & ML" },
  { key: "fullstack", label: "Full Stack" },
  { key: "backend", label: "Backend" },
] as const;

const categoryColors: Record<string, string> = {
  aiml: "#7c3aed",
  fullstack: "#059669",
  backend: "#dc6803",
  frontend: "#0284c7",
};

const categoryIcons: Record<string, React.ReactNode> = {
  aiml: <Brain size={12} />,
  fullstack: <Globe size={12} />,
  backend: <Server size={12} />,
};

export function Projects() {
  const [active, setActive] = useState<"all" | "aiml" | "fullstack" | "backend">("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--background)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="section-tag">// projects</span>
          <h2 className="section-title">What I&apos;ve Built</h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: 500 }}>
            A selection of projects across AI/ML, full-stack, and systems development.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 8,
                border: "1.5px solid",
                borderColor: active === f.key ? "var(--primary)" : "var(--border)",
                background: active === f.key ? "var(--primary-muted)" : "var(--card)",
                color: active === f.key ? "var(--primary)" : "var(--foreground-muted)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card"
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  cursor: "default",
                }}
              >
                {/* Top row: category badge + links */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.2rem 0.55rem",
                      borderRadius: 6,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      fontFamily: "'Fira Code', monospace",
                      background: `${categoryColors[project.category]}18`,
                      color: categoryColors[project.category],
                      border: `1px solid ${categoryColors[project.category]}30`,
                    }}
                  >
                    {categoryIcons[project.category]}
                    {filters.find((f) => f.key === project.category)?.label ?? project.category}
                  </span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "var(--foreground-muted)",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
                    >
                      <Github size={16} />
                    </a>
                    {project.live && project.live !== project.github && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "var(--foreground-muted)",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--foreground-muted)",
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="tech-tag" style={{ color: "var(--primary)" }}>
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
