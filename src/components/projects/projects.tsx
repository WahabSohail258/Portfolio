"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  Github, X,
  Layers, ExternalLink, ChevronRight,
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import Image from "next/image";

/* ── Colour / label maps ─────────────────────────────────── */
const categoryColors: Record<string, string> = {
  aiml: "#4caf50",
  fullstack: "#3b82f6",
  backend: "#f59e0b",
};
const categoryLabels: Record<string, string> = {
  aiml: "AI & ML",
  fullstack: "Full Stack",
  backend: "Backend",
};
const projectYears: Record<string, string> = {
  "8": "2025 — Present", "1": "2025", "7": "2025", "9": "2025", "2": "2025",
  "3": "2024", "4": "2024", "5": "2024", "6": "2023",
};
const projectRoles: Record<string, string> = {
  "8": "AI Engineer @ Blue Group",
  "1": "Final Year Project Lead",
  "7": "AI Agent Developer",
  "9": "AI Agent Developer",
  "2": "Full Stack Developer",
  "3": "Computer Vision Engineer",
  "4": "ML Engineer",
  "5": "Embedded Systems Developer",
  "6": "Backend Developer",
};
const thesisLinks: Record<string, string> = {
  "1": "/thesis/fyp_thesis.pdf",
};

// Every project uses a locally stored photographic cover.
const ProjectImage = memo(function ProjectImage({ project, height }: { project: Project; height: number }) {
  return (
    <div className="project-real-image" style={{ position: "relative", height, width: "100%", overflow: "hidden" }}>
      <Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 540px" style={{ objectFit: "cover" }} />
    </div>
  );
});

const impacts: Record<string, string[]> = {
  "8": ["Voice agent components running in production at Blue Group of Companies", "Natural Urdu TTS adapted from ElevenLabs audio data", "Domain LLM fine-tuning evaluated for factual consistency and directness", "Grounded Urdu responses via retrieval-augmented generation"],
  "1": ["Real-time phoneme recognition on Raspberry Pi 5", "Overcame Urdu data scarcity with cross-language transfer learning", "Live phoneme feedback UI for speech rehabilitation", "Hardware-optimized inference with OpenBLAS"],
  "7": ["Autonomous multi-agent research pipeline with grounded citations", "RAG-ready pgvector index for follow-up queries", "Refined retrieval strategies for better context relevance", "Live streaming agent progress via Next.js frontend"],
  "9": ["Automated ticket triage and grounded response drafting", "Responses cite actual support documentation via FAISS retrieval", "Reproducible deployment with Docker containerization"],
  "2": ["Natural-language queries across connected productivity tools", "OAuth-based integrations via Composio with Clerk authentication", "Reactive conversation history in Convex", "Langfuse traces for agent tool calls"],
  "3": ["Dual-mode recognition covering static alphabet and dynamic gestures", "Real-time operation with MediaPipe", "Text-to-speech output for immediate accessibility"],
  "4": ["Outperformed LightGBM baseline with simpler Naive Bayes model", "SHAP-driven feature analysis revealed key predictors", "Full reproducibility with documented cross-validation"],
  "5": ["Real-time lane detection on Raspberry Pi hardware", "Zero-ML obstacle avoidance using classical CV", "Bird's-eye lane tracking via perspective transformation"],
  "6": ["Full stack web app with donor management dashboard", "Real-time blood type compatibility matching", "Normalised MySQL schema preventing data anomalies"],
};

/* ── Modal ─────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const color = categoryColors[project.category] ?? "#4caf50";

  // ESC to close + scroll lock while modal is open
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex="0"]') ?? []);
    focusable().find(el => el.getAttribute("aria-label") === "Close project details")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = focusable();
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{
          width: "min(540px, 96vw)",
          height: "calc(100vh - 2rem)",
          background: "var(--card)",
          borderRadius: 20,
          border: `1px solid ${color}30`,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${color}15`,
        }}
      >
        {/* Image header */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ProjectImage project={project} height={200} />
          {/* Gradient scrim for text legibility */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
            pointerEvents: "none",
          }} />
          {/* Controls overlay */}
          <div style={{ position: "absolute", top: "0.9rem", right: "0.9rem", display: "flex", gap: "0.45rem", zIndex: 10 }}>
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Github size={15} />
            </a>
            <button
              onClick={onClose}
              aria-label="Close project details"
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(90deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
            >
              <X size={15} />
            </button>
          </div>
          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", right: "1.25rem", zIndex: 10 }}>
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.45rem", flexWrap: "wrap" }}>
              <span style={{
                background: color, color: "#fff",
                padding: "0.15rem 0.55rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700,
              }}>
                {projectYears[project.id] ?? "2025"}
              </span>
              <span style={{
                background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
                color: "rgba(255,255,255,0.85)", padding: "0.15rem 0.55rem",
                borderRadius: 6, fontSize: "0.7rem", fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.15)",
              }}>
                {projectRoles[project.id] ?? "Developer"}
              </span>
            </div>
            <h2 style={{
              color: "#fff", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.3,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.035 }}
                style={{
                  padding: "0.2rem 0.65rem",
                  border: `1px solid ${color}40`, color: color,
                  borderRadius: 6, fontSize: "0.72rem",
                  fontFamily: "'Fira Code', monospace", background: `${color}08`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {thesisLinks[project.id] ? (
              <a href={thesisLinks[project.id]} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                <Layers size={14} /> View Thesis
              </a>
            ) : (
              project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                  <Github size={14} /> View Code
                </a>
              )
            )}
            {project.live && project.live !== project.github && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color, fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>

          <p style={{ color: "var(--foreground-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            {project.description}
          </p>

          <div className="project-highlights">
            <h3>Highlights</h3>
            <ul>{(impacts[project.id] ?? []).slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <details className="project-more-details">
            <summary>More details</summary>
            <p>{project.longDescription}</p>
          </details>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Card ─────────────────────────────────────────── */
// Memoized: with a stable onSelect callback, typing in a sibling input or
// toggling filter state never re-renders unaffected cards in the grid.
const ProjectCard = memo(function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const reducedMotion = useReducedMotion();
  const color = categoryColors[project.category] ?? "#4caf50";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  // Cursor-tracking glow position
  const glowRef = useRef<HTMLDivElement>(null);
  // 3D tilt state (transform-only — no layout, no re-render per move)
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetTilt = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch drags should scroll, not tilt the card
    if (e.pointerType !== "mouse" || reducedMotion) return;
    const el = glowRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    // Radial glow follows the cursor
    if (el) {
      el.style.opacity = "1";
      el.style.background = `radial-gradient(circle 260px at ${px}px ${py}px, ${color}14 0%, transparent 70%)`;
    }
    // Tilt targets — applied on the next rAF (coalesces rapid pointermove)
    targetTilt.current = {
      rx: -(py / rect.height - 0.5) * 7,
      ry: (px / rect.width - 0.5) * 9,
      gx: (px / rect.width) * 100,
      gy: (py / rect.height) * 100,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  };

  // rAF loop while hovering: eases the card toward the pointer tilt and
  // brightens a soft radial glow at the cursor. Cancels on leave.
  const applyTilt = () => {
    rafRef.current = 0;
    const el = tiltRef.current;
    if (!el) return;
    const t = targetTilt.current;
    el.style.transform = `perspective(900px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg) translateZ(0)`;
    const glare = el.querySelector<HTMLElement>(".project-glare");
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle 300px at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 45%, transparent 70%)`;
    }
  };

  const handlePointerLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const el = tiltRef.current;
    if (el) {
      el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
    const glare = tiltRef.current?.querySelector<HTMLElement>(".project-glare");
    if (glare) {
      glare.style.transition = "opacity 0.4s ease";
      glare.style.opacity = "0";
    }
  };

  const handlePointerEnter = () => {
    const el = tiltRef.current;
    if (el) el.style.transition = "transform 0.12s ease-out";
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 24 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.18), ease: [0.22, 1, 0.36, 1] }}
      className="card project-card"
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(project); } }}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}
      onClick={() => onSelect(project)}
      whileHover={{ y: reducedMotion ? 0 : -4, transition: { duration: 0.22 } }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D tilt layer — inner wrapper so framer's y-hover doesn't fight the tilt transform */}
      <div ref={tiltRef} style={{ display: "flex", flexDirection: "column", flex: 1, transformStyle: "preserve-3d", willChange: "transform" }}>
      {/* Cursor-following soft glow */}
      <div
        aria-hidden
        className="project-glare"
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          pointerEvents: "none", zIndex: 4, opacity: 0,
          transition: "opacity 0.35s ease",
        }}
      />
      {/* Cursor-tracking sheen */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          pointerEvents: "none", zIndex: 3, opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Image thumbnail */}
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }} className="project-thumb-wrap">
        <div className="project-thumb-zoom" style={{ height: "100%" }}>
          <ProjectImage project={project} height={190} />
        </div>
        {/* Bottom scrim for depth */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />
        {/* Category badge */}
        <span style={{
          position: "absolute", top: "0.75rem", right: "0.75rem",
          padding: "0.2rem 0.6rem", borderRadius: 6,
          fontSize: "0.68rem", fontWeight: 700,
          background: "rgba(15,25,20,0.88)", color: "#f0f5ee",
          border: `1px solid ${color}50`, backdropFilter: "blur(8px)",
          fontFamily: "'Fira Code', monospace",
        }}>
          {categoryLabels[project.category]}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, position: "relative", zIndex: 1 }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>
          {project.cardTitle}
        </h3>
        <p style={{ fontSize: "0.81rem", color: "var(--foreground-muted)", lineHeight: 1.6, flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tags.slice(0, 2).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}

        </div>

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          fontSize: "0.78rem", color: color, fontWeight: 600,
          paddingTop: "0.25rem", borderTop: `1px solid ${color}20`,
        }}>

          Explore project
          <ChevronRight size={13} className="project-cta-arrow" style={{ marginLeft: "auto" }} />
        </div>
      </div>
      </div>
    </motion.div>
  );
});

/* ── Main Section ─────────────────────────────────────────── */
export function Projects() {
  const [filter, setFilter] = useState<"all" | "aiml" | "fullstack" | "backend">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  // Stable identity so memoized ProjectCards skip re-renders entirely.
  const onSelect = useCallback((p: Project) => setSelected(p), []);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filterButtons = [
    { key: "all",       label: "All Projects", count: projects.length },
    { key: "aiml",      label: "AI & ML",      count: projects.filter(p => p.category === "aiml").length },
    { key: "fullstack", label: "Full Stack",   count: projects.filter(p => p.category === "fullstack").length },
    { key: "backend",   label: "Backend",      count: projects.filter(p => p.category === "backend").length },
  ].filter((f) => f.count > 0);

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-tag">// projects</span>
          <h2 className="section-title">
            What I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.6rem", maxWidth: 520 }}>
            Voice AI, useful agents, and software built around real problems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}
        >
          {filterButtons.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                style={{
                  position: "relative",
                  padding: "0.4rem 1rem", borderRadius: 10, border: "1.5px solid",
                  borderColor: isActive ? "var(--primary)" : "var(--border)",
                  background: isActive ? "var(--primary-muted)" : "var(--card)",
                  color: isActive ? "var(--primary)" : "var(--foreground-muted)",
                  fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                }}
              >
                {f.label}
                <span style={{
                  fontSize: "0.68rem", fontWeight: 700,
                  background: isActive ? "var(--primary)" : "var(--border)",
                  color: isActive ? "#fff" : "var(--foreground-muted)",
                  borderRadius: 4, padding: "0.05rem 0.35rem", lineHeight: 1.5,
                }}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onSelect={onSelect} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
