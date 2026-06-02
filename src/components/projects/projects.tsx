"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, AlertCircle, Lightbulb, Target, FileText, Layers } from "lucide-react";
import { projects, Project } from "@/data/projects";

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
  "1": "2025",
  "2": "2025",
  "3": "2024",
  "4": "2024",
  "5": "2024",
  "6": "2023",
};

const projectRoles: Record<string, string> = {
  "1": "Final Year Project Lead",
  "2": "Full Stack Developer",
  "3": "Computer Vision Engineer",
  "4": "ML Engineer",
  "5": "Embedded Systems Developer",
  "6": "Backend Developer",
};

// Thesis PDF links — set to "/thesis/fyp_thesis.pdf" after uploading
const thesisLinks: Record<string, string> = {
  "1": "/thesis/fyp_thesis.pdf",
};

const techStacks: Record<string, string[]> = {
  "1": ["Kaldi", "C++", "Python", "OpenFst", "GMM-HMM", "MFCC Processing", "LDA/MLLT", "Transfer Learning"],
  "5": ["Python", "OpenCV", "Raspberry Pi", "PiCamera", "Canny Edge Detection", "Hough Transform", "MOG2 Background Subtraction", "Multithreading"],
  "6": ["Node.js", "Express.js", "MySQL", "SQL", "REST API", "CRUD Operations", "Data Validation", "Relational Schema Design"],
};

const keyOutcomes: Record<string, string[]> = {
  "1": [
    "4-stage progressive training pipeline (Monophone → Triphone → LDA+MLLT → SAT)",
    "88% feature reduction (351 → 40 dims) while improving phoneme discrimination",
    "Frame-accurate alignments for detailed phoneme error analysis",
    "Cross-lingual generalisation via transfer learning (English + Persian → Urdu)",
    "Real-time deployment on Raspberry Pi 5 with <350ms inference latency",
    "Live Kivy UI with pronunciation feedback for speech rehabilitation",
  ],
  "5": [
    "Real-time lane detection pipeline running at live video speed on Raspberry Pi",
    "Canny edge detection + Hough Transform for robust lane boundary identification",
    "Perspective transformation for bird's-eye view lane tracking",
    "Obstacle avoidance via BackgroundSubtractorMOG2 — no ML model required",
    "Multithreaded Python ensuring camera feed and control loop run in parallel",
    "Colour masking for lane isolation under varying lighting conditions",
  ],
  "6": [
    "Relational schema covering donors, recipients, blood types and compatibility rules",
    "Real-time donor search with blood type compatibility filtering",
    "Full CRUD REST API with input validation and structured error responses",
    "Optimised SQL queries for fast donor-recipient matching at scale",
    "Scalable schema design supporting multi-hospital deployments",
    "Robust data models preventing invalid blood-type assignments",
  ],
};

const problems: Record<string, string> = {
  "1": "Standard speech recognition systems operate at the word level, making them unsuitable for pronunciation feedback in language learning apps. Need phoneme-level recognition with specialised error analysis for specific pronunciation errors — and it must run in real time on a Raspberry Pi 5 with <350ms latency.",
  "2": "Engineering teams lose hours manually switching between Gmail, Slack, and Jira to get project status. There was no unified AI layer to surface insights across tools in real time.",
  "3": "Deaf and hard-of-hearing users lack accessible real-time translation tools. Most sign language recognition systems are offline, slow, or require specialised hardware.",
  "4": "The Santander dataset is anonymised and high-dimensional — standard feature engineering fails, requiring statistical feature selection and model comparison for reliable binary classification.",
  "5": "Building a self-driving car prototype on a Raspberry Pi requires real-time lane detection and obstacle avoidance using only classical image processing — deep learning models are too compute-heavy for the constrained hardware. The system must respond fast enough to control the car without lag.",
  "6": "Hospital blood banks operate in silos — donor records, blood type data and recipient requests are managed manually or in disconnected spreadsheets. This causes critical delays when matching compatible donors to patients in urgent need of transfusions.",
};

const solutions: Record<string, string> = {
  "1": "Designed a complete phoneme-level ASR pipeline using Kaldi with progressive acoustic modelling (Monophone → Triphone → SAT). Built a custom Phoneme Error Rate (PER) module with lattice-to-phoneme conversion. Deployed on Raspberry Pi with <350ms inference and <1s total latency with a screen-based UI. Applied transfer learning across multiple languages (English & Persian) for cross-lingual generalisation.",
  "2": "Built a streaming Next.js + TypeScript app using Vercel AI SDK and Composio to unify Gmail, Slack, and Jira. Implemented a real-time AI chatbot with Convex backend that answers natural-language queries about sprint status, blockers, and deadlines.",
  "3": "Built dual-mode recognition: CNN for static signs (A–Z) and LSTM for dynamic gestures, both powered by MediaPipe's 21-keypoint hand tracking. Applied prediction smoothing for stability. Deployed as a live Streamlit app with text-to-speech output for real-world accessibility.",
  "4": "Selected Naive Bayes after statistical analysis of the feature distribution. Used SHAP for feature importance, LightGBM as a strong baseline, and a Residual MLP for deep comparison. Delivered a fully reproducible ML pipeline with cross-validation.",
  "5": "Implemented a full classical computer vision pipeline: Canny edge detection for boundary extraction, Hough Transform for lane line fitting, colour masking in HSV space for robustness, and perspective transformation to get a bird's-eye view of the road. BackgroundSubtractorMOG2 was used for moving obstacle detection. Ran the entire pipeline on Raspberry Pi with PiCamera using Python multithreading to keep the control loop and camera feed in sync.",
  "6": "Designed a normalised relational MySQL schema with tables for donors, recipients, blood inventory and compatibility rules. Built a Node.js + Express REST API with full CRUD operations, structured error handling, and input validation. The system performs real-time blood type compatibility checks and returns ranked donor matches instantly — designed to be extensible across multiple hospital branches.",
};

const impacts: Record<string, string[]> = {
  "1": ["Achieved real-time phoneme recognition under 350ms on Raspberry Pi 5", "Overcame Urdu data scarcity using cross-language transfer learning", "4-stage progressive pipeline: Monophone → Triphone → LDA+MLLT → SAT", "88% feature reduction (351→40 dims) preserving phoneme discrimination", "Validated in speech rehabilitation clinical context"],
  "2": ["Reduced daily project status check time for teams", "Natural language interface for sprint/blocker queries", "Integrated 3 external tools through a single AI interface"],
  "3": ["Dual-mode recognition covering static alphabet and dynamic gestures", "Real-time operation at 30fps with MediaPipe", "Text-to-speech output for immediate accessibility"],
  "4": ["Outperformed LightGBM baseline with simpler Naive Bayes model", "SHAP-driven feature analysis revealed key predictors", "Full reproducibility with documented cross-validation"],
  "5": ["Real-time lane detection and following on Raspberry Pi hardware", "Zero-ML obstacle avoidance using classical background subtraction", "Bird's-eye lane tracking via perspective transformation", "Colour-masked lane isolation robust to lighting changes", "Multithreaded control loop keeping car response lag-free"],
  "6": ["Instant donor-recipient matching with blood type compatibility logic", "Normalised relational schema preventing data anomalies", "Structured REST API with full CRUD and error handling", "Scalable multi-hospital deployment ready architecture", "SQL-optimised queries for fast donor lookups at scale"],
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"summary" | "impact">("summary");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 250 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 96vw)",
          height: "calc(100vh - 2rem)",
          background: "#1a2420",
          borderRadius: 16,
          border: "1px solid rgba(76,175,80,0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header image area */}
        <div
          style={{
            height: 160,
            background: "linear-gradient(135deg, #1a3a2a 0%, #0d2a1a 50%, #0a1f15 100%)",
            position: "relative",
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: "1rem",
          }}
        >
          {/* Decorative orb */}
          <div style={{
            position: "absolute",
            top: -40, right: -40,
            width: 200, height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", textDecoration: "none",
              }}
            >
              <Github size={16} />
            </a>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Year + role */}
          <div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span style={{
                background: "#4caf50", color: "#fff",
                padding: "0.15rem 0.5rem", borderRadius: 5,
                fontSize: "0.72rem", fontWeight: 700,
              }}>
                {projectYears[project.id] ?? "2024"}
              </span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", alignSelf: "center" }}>
                {projectRoles[project.id] ?? "Developer"}
              </span>
            </div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.3 }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.6rem",
                  border: `1px solid ${categoryColors[project.category] ?? "#4caf50"}55`,
                  color: categoryColors[project.category] ?? "#4caf50",
                  borderRadius: 5,
                  fontSize: "0.72rem",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Thesis / View Code */}
          {thesisLinks[project.id] ? (
            <a
              href={thesisLinks[project.id]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: "#c8e6c9", fontSize: "0.82rem", textDecoration: "none",
                marginBottom: "1.25rem", fontWeight: 600,
              }}
            >
              <FileText size={14} /> View Thesis
            </a>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: "#c8e6c9", fontSize: "0.82rem", textDecoration: "none",
                marginBottom: "1.25rem", fontWeight: 500,
              }}
            >
              <Github size={14} /> View Code
            </a>
          )}

          <p style={{ color: "#a6b0c3", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            {project.description}
          </p>

          {/* Problem */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "1rem", marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <AlertCircle size={14} style={{ color: "#f59e0b" }} />
              <span style={{ fontWeight: 700, color: "#f0ebe5", fontSize: "0.9rem" }}>The problem</span>
            </div>
            <p style={{ color: "#a6b0c3", fontSize: "0.84rem", lineHeight: 1.7 }}>
              {problems[project.id]}
            </p>
          </div>

          {/* Solution */}
          <div style={{
            background: "rgba(76,175,80,0.04)", border: "1px solid rgba(76,175,80,0.15)",
            borderRadius: 10, padding: "1rem", marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(76,175,80,0.1)" }}>
              <Lightbulb size={14} style={{ color: "#4caf50" }} />
              <span style={{ fontWeight: 700, color: "#f0ebe5", fontSize: "0.9rem" }}>The solution</span>
            </div>
            <p style={{ color: "#a6b0c3", fontSize: "0.84rem", lineHeight: 1.7 }}>
              {solutions[project.id]}
            </p>
          </div>

          {/* Tech Stack — shown for FYP only */}
          {techStacks[project.id] && (
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "1rem", marginBottom: "1rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Layers size={14} style={{ color: "#4caf50" }} />
                <span style={{ fontWeight: 700, color: "#f0ebe5", fontSize: "0.9rem" }}>Tech stack</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {techStacks[project.id].map((t) => (
                  <span key={t} style={{
                    padding: "0.25rem 0.65rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6, fontSize: "0.78rem",
                    color: "#cdd6f4", fontFamily: "'Fira Code', monospace",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Outcomes — shown for FYP only */}
          {keyOutcomes[project.id] && (
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "1rem", marginBottom: "1rem",
            }}>
              <div style={{ paddingBottom: "0.6rem", marginBottom: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontWeight: 700, color: "#f0ebe5", fontSize: "0.9rem" }}>Key outcomes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {keyOutcomes[project.id].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.84rem", color: "#a6b0c3", lineHeight: 1.65 }}>
                    <span style={{ color: "#4caf50", flexShrink: 0, marginTop: "0.15rem" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            {(["summary", "impact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "0.3rem 0.75rem", borderRadius: 7,
                  border: "1px solid",
                  borderColor: tab === t ? "#4caf50" : "rgba(255,255,255,0.08)",
                  background: tab === t ? "rgba(76,175,80,0.12)" : "transparent",
                  color: tab === t ? "#4caf50" : "#6c7086",
                  fontSize: "0.78rem", fontWeight: 600,
                  cursor: "pointer", fontFamily: "Poppins, sans-serif",
                  textTransform: "capitalize",
                }}
              >
                {t === "summary" ? "Summary" : "Real world impact"}
              </button>
            ))}
          </div>

          {tab === "summary" && (
            <p style={{ color: "#a6b0c3", fontSize: "0.84rem", lineHeight: 1.7 }}>
              {project.longDescription}
            </p>
          )}
          {tab === "impact" && (
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(impacts[project.id] ?? []).map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.84rem", color: "#a6b0c3", lineHeight: 1.6 }}
                >
                  <Target size={13} style={{ color: "#4caf50", flexShrink: 0, marginTop: "0.2rem" }} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<"all" | "aiml" | "fullstack" | "backend">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="section-tag">// projects</span>
          <h2 className="section-title">
            What I&apos;ve{" "}
            <span className="gradient-text">built</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            Click any project to see problem, solution &amp; real-world impact.
          </p>
        </motion.div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {[
            { key: "all", label: "All" },
            { key: "aiml", label: "AI & ML" },
            { key: "fullstack", label: "Full Stack" },
            { key: "backend", label: "Backend" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              style={{
                padding: "0.35rem 0.9rem", borderRadius: 8,
                border: "1.5px solid",
                borderColor: filter === f.key ? "var(--primary)" : "var(--border)",
                background: filter === f.key ? "var(--primary-muted)" : "var(--card)",
                color: filter === f.key ? "var(--primary)" : "var(--foreground-muted)",
                fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s ease", fontFamily: "Poppins, sans-serif",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="card"
                style={{ padding: "1.25rem", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.6rem" }}
                onClick={() => setSelected(p)}
              >
                {/* Year + category */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.7rem",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {projectYears[p.id]}
                  </span>
                  <span
                    style={{
                      padding: "0.15rem 0.5rem", borderRadius: 5,
                      fontSize: "0.68rem", fontWeight: 700,
                      background: `${categoryColors[p.category]}18`,
                      color: categoryColors[p.category],
                      border: `1px solid ${categoryColors[p.category]}30`,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {categoryLabels[p.category]}
                  </span>
                </div>

                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.6, flex: 1 }}>
                  {p.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="tech-tag" style={{ color: "var(--primary)" }}>+{p.tags.length - 3}</span>
                  )}
                </div>

                <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  View details →
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
