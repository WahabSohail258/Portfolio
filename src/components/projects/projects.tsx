"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, X, AlertCircle, Lightbulb, Target,
  FileText, Layers, ExternalLink, ChevronRight, Sparkles,
  Mic, MessageSquare, Hand, BarChart2, Car, Droplets,
} from "lucide-react";
import { projects, Project } from "@/data/projects";

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
  "1": "2025", "2": "2025", "3": "2024",
  "4": "2024", "5": "2024", "6": "2023",
};
const projectRoles: Record<string, string> = {
  "1": "Final Year Project Lead",
  "2": "Full Stack Developer",
  "3": "Computer Vision Engineer",
  "4": "ML Engineer",
  "5": "Embedded Systems Developer",
  "6": "Backend Developer",
};
const thesisLinks: Record<string, string> = {
  "1": "/thesis/fyp_thesis.pdf",
};

/* ── Per-project thumbnail config ────────────────────────── */
const thumbnailConfig: Record<string, {
  gradient: string;
  icon: React.ReactNode;
  devicons: string[];
  accentColor: string;
  label: string;
}> = {
  "1": {
    gradient: "linear-gradient(135deg, #0d2015 0%, #1a3a28 50%, #0d1f18 100%)",
    accentColor: "#4caf50",
    icon: <Mic size={32} strokeWidth={1.5} />,
    devicons: ["devicon-python-plain", "devicon-cplusplus-plain", "devicon-linux-plain", "devicon-raspberrypi-plain"],
    label: "Speech · Kaldi · Edge AI",
  },
  "2": {
    gradient: "linear-gradient(135deg, #0d1830 0%, #1a2f50 50%, #0a1828 100%)",
    accentColor: "#3b82f6",
    icon: <MessageSquare size={32} strokeWidth={1.5} />,
    devicons: ["devicon-nextjs-plain", "devicon-typescript-plain", "devicon-googlecloud-plain"],
    label: "Next.js · Convex · Vercel AI",
  },
  "3": {
    gradient: "linear-gradient(135deg, #1a1030 0%, #2d1f50 50%, #110c28 100%)",
    accentColor: "#8b5cf6",
    icon: <Hand size={32} strokeWidth={1.5} />,
    devicons: ["devicon-python-plain", "devicon-opencv-plain", "devicon-tensorflow-plain"],
    label: "CNN · LSTM · MediaPipe",
  },
  "4": {
    gradient: "linear-gradient(135deg, #1a1500 0%, #302800 50%, #1a1200 100%)",
    accentColor: "#f59e0b",
    icon: <BarChart2 size={32} strokeWidth={1.5} />,
    devicons: ["devicon-python-plain", "devicon-jupyter-plain", "devicon-pytorch-plain"],
    label: "LightGBM · SHAP · Naive Bayes",
  },
  "5": {
    gradient: "linear-gradient(135deg, #001220 0%, #002840 50%, #000e1a 100%)",
    accentColor: "#06b6d4",
    icon: <Car size={32} strokeWidth={1.5} />,
    devicons: ["devicon-python-plain", "devicon-opencv-plain", "devicon-raspberrypi-plain"],
    label: "OpenCV · Edge Detection · Pi",
  },
  "6": {
    gradient: "linear-gradient(135deg, #1a0808 0%, #350f0f 50%, #150505 100%)",
    accentColor: "#ef4444",
    icon: <Droplets size={32} strokeWidth={1.5} />,
    devicons: ["devicon-nodejs-plain", "devicon-express-original", "devicon-mysql-plain"],
    label: "Node.js · Express · MySQL",
  },
};

/* ── Project Thumbnail (replaces AI image) ───────────────── */
function ProjectThumbnail({ projectId, compact = false }: { projectId: string; compact?: boolean }) {
  const cfg = thumbnailConfig[projectId];
  if (!cfg) return null;
  const h = compact ? 160 : 200;

  return (
    <div style={{
      height: h, width: "100%", position: "relative",
      background: cfg.gradient,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", flexShrink: 0,
    }}>
      {/* Soft glow orbs */}
      <div style={{
        position: "absolute", top: -30, left: -30,
        width: 160, height: 160, borderRadius: "50%",
        background: `radial-gradient(circle, ${cfg.accentColor}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -20, right: -20,
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${cfg.accentColor}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Grid dot pattern */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.08 }}
        width="100%" height="100%"
      >
        <defs>
          <pattern id={`dots-${projectId}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={cfg.accentColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${projectId})`} />
      </svg>

      {/* Main icon */}
      <div style={{
        color: cfg.accentColor,
        marginBottom: "0.75rem",
        filter: `drop-shadow(0 0 12px ${cfg.accentColor}60)`,
        position: "relative", zIndex: 1,
      }}>
        {cfg.icon}
      </div>

      {/* Devicons row */}
      <div style={{
        display: "flex", gap: "0.6rem", marginBottom: "0.6rem",
        position: "relative", zIndex: 1,
      }}>
        {cfg.devicons.map((cls) => (
          <i
            key={cls}
            className={cls}
            style={{
              fontSize: compact ? "1.3rem" : "1.5rem",
              color: "rgba(255,255,255,0.75)",
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))",
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div style={{
        fontSize: "0.67rem",
        color: "rgba(255,255,255,0.45)",
        fontFamily: "'Fira Code', monospace",
        letterSpacing: "0.04em",
        position: "relative", zIndex: 1,
      }}>
        {cfg.label}
      </div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const techStacks: Record<string, string[]> = {
  "1": ["Kaldi", "C++", "Python", "OpenFst", "GMM-HMM", "MFCC Processing", "LDA/MLLT", "Transfer Learning"],
  "5": ["Python", "OpenCV", "Raspberry Pi", "PiCamera", "Canny Edge Detection", "Hough Transform", "MOG2 Background Subtraction", "Multithreading"],
  "6": ["Node.js", "Express.js", "MySQL", "EJS / HTML", "CSS", "REST API", "CRUD Operations", "Normalised Schema Design"],
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
    "Full donor registration and management with blood type records",
    "Real-time blood type compatibility matching for recipient requests",
    "Frontend dashboard for hospital staff to search, filter and manage donors",
    "RESTful API with structured validation and meaningful error responses",
    "Normalised MySQL schema preventing data anomalies across tables",
    "Inventory tracking module for blood stock levels across blood types",
  ],
};
const problems: Record<string, string> = {
  "1": "Standard speech recognition systems operate at the word level, making them unsuitable for pronunciation feedback in language learning apps. Need phoneme-level recognition with specialised error analysis for specific pronunciation errors — and it must run in real time on a Raspberry Pi 5 with <350ms latency.",
  "2": "Engineering teams lose hours manually switching between Gmail, Slack, and Jira to get project status. There was no unified AI layer to surface insights across tools in real time.",
  "3": "Deaf and hard-of-hearing users lack accessible real-time translation tools. Most sign language recognition systems are offline, slow, or require specialised hardware.",
  "4": "The Santander dataset is anonymised and high-dimensional — standard feature engineering fails, requiring statistical feature selection and model comparison for reliable binary classification.",
  "5": "Building a self-driving car prototype on a Raspberry Pi requires real-time lane detection and obstacle avoidance using only classical image processing — deep learning models are too compute-heavy for the constrained hardware.",
  "6": "Hospital blood banks operate in silos — donor records, blood type data and recipient requests are managed manually or in disconnected spreadsheets, causing critical delays in urgent transfusion matching.",
};
const solutions: Record<string, string> = {
  "1": "Designed a complete phoneme-level ASR pipeline using Kaldi with progressive acoustic modelling (Monophone → Triphone → SAT). Built a custom Phoneme Error Rate (PER) module with lattice-to-phoneme conversion. Deployed on Raspberry Pi with <350ms inference and <1s total latency with a screen-based UI.",
  "2": "Built a streaming Next.js + TypeScript app using Vercel AI SDK and Composio to unify Gmail, Slack, and Jira. Implemented a real-time AI chatbot with Convex backend that answers natural-language queries about sprint status, blockers, and deadlines.",
  "3": "Built dual-mode recognition: CNN for static signs (A–Z) and LSTM for dynamic gestures, both powered by MediaPipe's 21-keypoint hand tracking. Applied prediction smoothing for stability. Deployed as a live Streamlit app with text-to-speech output.",
  "4": "Selected Naive Bayes after statistical analysis of the feature distribution. Used SHAP for feature importance, LightGBM as a strong baseline, and a Residual MLP for deep comparison. Delivered a fully reproducible ML pipeline with cross-validation.",
  "5": "Implemented a full classical computer vision pipeline: Canny edge detection, Hough Transform for lane line fitting, colour masking in HSV space, and perspective transformation for bird's-eye view. BackgroundSubtractorMOG2 for moving obstacle detection. Ran on Raspberry Pi with Python multithreading.",
  "6": "Built a full stack Blood Management System using Node.js and Express backend with server-rendered frontend dashboard. Supports donor registration, recipient request management, and real-time blood type compatibility checks with a normalised MySQL schema.",
};
const impacts: Record<string, string[]> = {
  "1": ["Achieved real-time phoneme recognition under 350ms on Raspberry Pi 5", "Overcame Urdu data scarcity using cross-language transfer learning", "4-stage progressive pipeline: Monophone → Triphone → LDA+MLLT → SAT", "88% feature reduction (351→40 dims) preserving phoneme discrimination"],
  "2": ["Reduced daily project status check time for teams", "Natural language interface for sprint/blocker queries", "Integrated 3 external tools through a single AI interface"],
  "3": ["Dual-mode recognition covering static alphabet and dynamic gestures", "Real-time operation at 30fps with MediaPipe", "Text-to-speech output for immediate accessibility"],
  "4": ["Outperformed LightGBM baseline with simpler Naive Bayes model", "SHAP-driven feature analysis revealed key predictors", "Full reproducibility with documented cross-validation"],
  "5": ["Real-time lane detection and following on Raspberry Pi hardware", "Zero-ML obstacle avoidance using classical background subtraction", "Bird's-eye lane tracking via perspective transformation", "Colour-masked lane isolation robust to lighting changes"],
  "6": ["Full stack web app with donor management dashboard", "Real-time blood type compatibility matching", "Structured REST API with validation and error handling", "Normalised MySQL schema preventing data anomalies"],
};

/* ── Modal ─────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"summary" | "impact">("summary");
  const color = categoryColors[project.category] ?? "#4caf50";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
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
        {/* Thumbnail header */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ProjectThumbnail projectId={project.id} compact={false} />
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
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff",
              }}
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
                {projectYears[project.id] ?? "2024"}
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
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: "0.2rem 0.65rem",
                border: `1px solid ${color}40`, color: color,
                borderRadius: 6, fontSize: "0.72rem",
                fontFamily: "'Fira Code', monospace", background: `${color}08`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            {thesisLinks[project.id] ? (
              <a href={thesisLinks[project.id]} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                <FileText size={14} /> View Thesis
              </a>
            ) : (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                <Github size={14} /> View Code
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--foreground-muted)", fontSize: "0.82rem", textDecoration: "none" }}>
              <ExternalLink size={13} /> GitHub
            </a>
          </div>

          <p style={{ color: "var(--foreground-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            {project.description}
          </p>

          {/* Problem */}
          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(245,158,11,0.12)" }}>
              <AlertCircle size={14} style={{ color: "#f59e0b" }} />
              <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.88rem" }}>The Problem</span>
            </div>
            <p style={{ color: "var(--foreground-muted)", fontSize: "0.84rem", lineHeight: 1.7 }}>{problems[project.id]}</p>
          </div>

          {/* Solution */}
          <div style={{ background: `${color}06`, border: `1px solid ${color}25`, borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.6rem", borderBottom: `1px solid ${color}15` }}>
              <Lightbulb size={14} style={{ color }} />
              <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.88rem" }}>The Solution</span>
            </div>
            <p style={{ color: "var(--foreground-muted)", fontSize: "0.84rem", lineHeight: 1.7 }}>{solutions[project.id]}</p>
          </div>

          {/* Tech Stack */}
          {techStacks[project.id] && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "1px solid var(--border)" }}>
                <Layers size={14} style={{ color: "var(--primary)" }} />
                <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.88rem" }}>Tech Stack</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {techStacks[project.id].map((t) => (
                  <span key={t} style={{ padding: "0.25rem 0.65rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: "0.75rem", color: "var(--foreground-muted)", fontFamily: "'Fira Code', monospace" }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Outcomes */}
          {keyOutcomes[project.id] && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
              <div style={{ paddingBottom: "0.6rem", marginBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.88rem" }}>Key Outcomes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {keyOutcomes[project.id].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>
                    <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.15rem" }}>▸</span>
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
                key={t} onClick={() => setTab(t)}
                style={{
                  padding: "0.3rem 0.85rem", borderRadius: 8, border: "1px solid",
                  borderColor: tab === t ? "var(--primary)" : "var(--border)",
                  background: tab === t ? "var(--primary-muted)" : "transparent",
                  color: tab === t ? "var(--primary)" : "var(--foreground-muted)",
                  fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                  fontFamily: "Poppins, sans-serif", transition: "all 0.2s ease",
                }}
              >
                {t === "summary" ? "Summary" : "Real-world Impact"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "summary" && (
              <motion.p key="summary" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                style={{ color: "var(--foreground-muted)", fontSize: "0.84rem", lineHeight: 1.7 }}>
                {project.longDescription}
              </motion.p>
            )}
            {tab === "impact" && (
              <motion.ul key="impact" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(impacts[project.id] ?? []).map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
                    <Target size={13} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.2rem" }} />
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const color = categoryColors[project.category] ?? "#4caf50";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card project-card"
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", overflow: "hidden" }}
      onClick={onClick}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }} className="project-thumb-wrap">
        <ProjectThumbnail projectId={project.id} compact />
        {/* Category badge */}
        <span style={{
          position: "absolute", top: "0.75rem", right: "0.75rem",
          padding: "0.2rem 0.6rem", borderRadius: 6,
          fontSize: "0.68rem", fontWeight: 700,
          background: `${color}22`, color: color,
          border: `1px solid ${color}50`, backdropFilter: "blur(8px)",
          fontFamily: "'Fira Code', monospace",
        }}>
          {categoryLabels[project.category]}
        </span>
        {/* Year badge */}
        <span style={{
          position: "absolute", top: "0.75rem", left: "0.75rem",
          padding: "0.2rem 0.55rem", borderRadius: 6,
          fontSize: "0.68rem", fontWeight: 600,
          background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)", fontFamily: "'Fira Code', monospace",
        }}>
          {projectYears[project.id]}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.81rem", color: "var(--foreground-muted)", lineHeight: 1.6, flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="tech-tag" style={{ color: "var(--primary)" }}>+{project.tags.length - 3}</span>
          )}
        </div>

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          fontSize: "0.78rem", color: color, fontWeight: 600,
          paddingTop: "0.25rem", borderTop: `1px solid ${color}20`,
        }}>
          <Sparkles size={12} />
          View project details
          <ChevronRight size={13} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export function Projects() {
  const [filter, setFilter] = useState<"all" | "aiml" | "fullstack" | "backend">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filterButtons = [
    { key: "all",       label: "All Projects", count: projects.length },
    { key: "aiml",      label: "AI & ML",      count: projects.filter(p => p.category === "aiml").length },
    { key: "fullstack", label: "Full Stack",   count: projects.filter(p => p.category === "fullstack").length },
    { key: "backend",   label: "Backend",      count: projects.filter(p => p.category === "backend").length },
  ];

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-tag">// projects</span>
          <h2 className="section-title">
            What I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.6rem", maxWidth: 520 }}>
            A selection of projects spanning AI/ML, full-stack, and embedded systems.
            Click any card to explore the problem, solution, and real-world impact.
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
          {filterButtons.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              style={{
                padding: "0.4rem 1rem", borderRadius: 10, border: "1.5px solid",
                borderColor: filter === f.key ? "var(--primary)" : "var(--border)",
                background: filter === f.key ? "var(--primary-muted)" : "var(--card)",
                color: filter === f.key ? "var(--primary)" : "var(--foreground-muted)",
                fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s ease", fontFamily: "Poppins, sans-serif",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}
            >
              {f.label}
              <span style={{
                fontSize: "0.68rem", fontWeight: 700,
                background: filter === f.key ? "var(--primary)" : "var(--border)",
                color: filter === f.key ? "#fff" : "var(--foreground-muted)",
                borderRadius: 4, padding: "0.05rem 0.35rem", lineHeight: 1.5,
              }}>
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
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
        .project-card:hover .project-thumb-wrap > div { transform: scale(1.04); transition: transform 0.45s ease; }
      `}</style>
    </section>
  );
}
