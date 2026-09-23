"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, X, AlertCircle, Lightbulb, Target,
  Layers, ExternalLink, ChevronRight, Sparkles,
  Mic, MessageSquare, Hand, BarChart2, Car, Droplets, Search, Bot, Headphones,
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

/* ── Thumbnail accent config (for badges + fallback) ─────── */
const thumbnailConfig: Record<string, {
  gradient: string;
  icon: React.ReactNode;
  accentColor: string;
}> = {
  "8": {
    gradient: "linear-gradient(135deg, #10201a 0%, #1a3828 50%, #0a1a12 100%)",
    accentColor: "#66bb6a",
    icon: <Headphones size={34} strokeWidth={1.5} />,
  },
  "1": {
    gradient: "linear-gradient(135deg, #0d2015 0%, #1a3a28 50%, #0d1f18 100%)",
    accentColor: "#4caf50",
    icon: <Mic size={32} strokeWidth={1.5} />,
  },
  "2": {
    gradient: "linear-gradient(135deg, #0d1830 0%, #1a2f50 50%, #0a1828 100%)",
    accentColor: "#3b82f6",
    icon: <MessageSquare size={32} strokeWidth={1.5} />,
  },
  "3": {
    gradient: "linear-gradient(135deg, #1a1030 0%, #2d1f50 50%, #110c28 100%)",
    accentColor: "#8b5cf6",
    icon: <Hand size={32} strokeWidth={1.5} />,
  },
  "4": {
    gradient: "linear-gradient(135deg, #1a1500 0%, #302800 50%, #1a1200 100%)",
    accentColor: "#f59e0b",
    icon: <BarChart2 size={32} strokeWidth={1.5} />,
  },
  "5": {
    gradient: "linear-gradient(135deg, #001220 0%, #002840 50%, #000e1a 100%)",
    accentColor: "#06b6d4",
    icon: <Car size={32} strokeWidth={1.5} />,
  },
  "6": {
    gradient: "linear-gradient(135deg, #1a0808 0%, #350f0f 50%, #150505 100%)",
    accentColor: "#ef4444",
    icon: <Droplets size={32} strokeWidth={1.5} />,
  },
  "7": {
    gradient: "linear-gradient(135deg, #061820 0%, #0c3040 50%, #051218 100%)",
    accentColor: "#14b8a6",
    icon: <Search size={32} strokeWidth={1.5} />,
  },
  "9": {
    gradient: "linear-gradient(135deg, #0d1a12 0%, #14301f 50%, #081109 100%)",
    accentColor: "#4caf50",
    icon: <Bot size={32} strokeWidth={1.5} />,
  },
};

/* ── Designed cover: gradient + pattern + icon per project ── */
// Memoized: the cover is pure markup per project, so filter/hover state changes
// higher in the tree never re-render the (expensive, blurred) cover layers.
const ProjectImage = memo(function ProjectImage({ src, alt, accent, height }: { src: string; alt: string; accent: string; height: number }) {
  const cfg = thumbnailConfig[altToId(alt)];
  const gradient = cfg?.gradient ?? `linear-gradient(135deg, #0d1a12 0%, #14301f 50%, #081109 100%)`;

  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        height, width: "100%", position: "relative",
        background: gradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", flexShrink: 0,
      }}
    >
      {/* Dot-grid pattern */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, opacity: 0.5,
        backgroundImage: `radial-gradient(${accent}26 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
        maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)",
      }} />
      {/* Soft accent orbs */}
      <div aria-hidden style={{
        position: "absolute", width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`,
        top: -60, right: -40, filter: "blur(10px)",
      }} />
      <div aria-hidden style={{
        position: "absolute", width: 180, height: 180, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
        bottom: -60, left: -30, filter: "blur(10px)",
      }} />
      {/* Corner brackets frame */}
      <div aria-hidden style={{ position: "absolute", inset: 12, pointerEvents: "none" }}>
        {[
          { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
          { top: 0, right: 0, borderLeft: "none", borderBottom: "none" },
          { bottom: 0, left: 0, borderRight: "none", borderTop: "none" },
          { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", width: 14, height: 14,
            borderTop: `1.5px solid ${accent}55`, borderBottom: pos.borderBottom,
            borderLeft: pos.borderLeft, borderRight: pos.borderRight,
            ...pos,
          }} />
        ))}
      </div>
      {/* Centred icon in a glass ring */}
      <div style={{
        position: "relative", zIndex: 1,
        width: 64, height: 64, borderRadius: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${accent}22 0%, ${accent}0d 100%)`,
        border: `1px solid ${accent}45`,
        color: accent,
        filter: `drop-shadow(0 0 18px ${accent}44)`,
        boxShadow: `inset 0 1px 0 ${accent}30`,
        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }} className="project-icon-ring">
        {cfg?.icon}
      </div>
    </div>
  );
});

// helper: map alt text back to project id for the fallback icon
function altToId(alt: string): string {
  const map: Record<string, string> = {
    "Urdu Conversational Voice Agent": "8",
    "SpeakWell — Urdu Phoneme Recognition": "1",
    "Tool Insights Chat": "2",
    "Sign Language Recognition": "3",
    "Santander Transaction Prediction": "4",
    "Autonomous Navigation System": "5",
    "Blood Management System": "6",
    "OrgMind — Multi-Agent Research & QA": "7",
    "Customer Support Ticket Resolution Agent": "9",
  };
  return map[alt] ?? "1";
}

/* ── Data: resume-aligned details ────────────────────────── */
const techStacks: Record<string, string[]> = {
  "8": ["Python", "Coqui TTS", "Hugging Face Transformers", "PEFT / LoRA", "Ollama", "ElevenLabs Audio Data", "RAG", "FastAPI"],
  "1": ["Python", "C++", "Kaldi", "HMM Acoustic Models", "OpenBLAS", "Kivy", "Raspberry Pi 5"],
  "7": ["LangGraph", "Groq", "Sentence Transformers", "Supabase / pgvector", "FastAPI", "Next.js"],
  "9": ["LangGraph", "FAISS", "RAG", "Docker", "Python"],
  "2": ["Next.js", "TypeScript", "Convex", "Vercel AI SDK", "Composio", "Jira"],
  "3": ["Python", "OpenCV", "MediaPipe", "CNN", "LSTM", "Streamlit"],
  "4": ["Python", "LightGBM", "Naive Bayes", "PyTorch", "SHAP", "Scikit-learn"],
  "5": ["Python", "OpenCV", "Edge Detection", "Embedded Systems"],
  "6": ["Node.js", "Express.js", "MySQL", "REST API", "Full Stack"],
};
const keyOutcomes: Record<string, string[]> = {
  "8": [
    "Urdu conversational voice agent components in production: local LLM generation + TTS, STT in progress",
    "Coqui TTS adapted with ElevenLabs audio data for natural Urdu speech synthesis",
    "Domain LLMs fine-tuned with PEFT/LoRA on English and Roman Urdu conversations",
    "Outputs evaluated for factual consistency, directness, and domain adherence",
    "Ollama-hosted LLMs + local embedding models integrated via OpenAI-compatible interfaces",
    "RAG pipelines retrieving knowledge-base context for grounded Urdu responses",
  ],
  "1": [
    "Phoneme-level Urdu ASR built from raw pediatric speech recordings to labelled datasets",
    "Cross-lingual transfer learning reimplementation (English + Persian acoustic models)",
    "Controlled experiments comparing recognition across training-data regimes",
    "Deployed on Raspberry Pi 5 with OpenBLAS and hardware-specific build configurations",
    "Kivy interface for live phoneme feedback and rehabilitation progress tracking",
  ],
  "7": [
    "LangGraph agent workflows for structured QA over heterogeneous web data",
    "Responses grounded in retrieved source context via a complete RAG pipeline",
    "Sentence-transformer embeddings, chunking, and pgvector retrieval behind FastAPI",
    "Retrieval strategies refined to improve context relevance",
    "End-to-end Next.js app deployed through Vercel and cloud infrastructure",
  ],
  "9": [
    "LangGraph workflow: triage → FAISS retrieval → grounded response generation",
    "LLM responses grounded in relevant support documentation",
    "FAISS knowledge retrieval over embedded support articles",
    "Fully containerized with Docker for reproducible dev + deployment environments",
  ],
  "2": ["Unified Gmail, Slack, Jira insights through a single AI chat interface", "Real-time streaming responses with Vercel AI SDK", "Sprint-based agile delivery tracked in Jira", "Scalable full-stack architecture with Convex backend"],
  "3": ["Dual-mode recognition: CNN for static alphabet, LSTM for dynamic gestures", "MediaPipe 21-keypoint hand tracking at live framerate", "Prediction smoothing for stable real-time inference", "Streamlit app with text-to-speech output"],
  "4": ["Outperformed stronger baselines with simpler, interpretable Naive Bayes", "SHAP-driven feature analysis revealed key predictors", "Complete reproducible pipeline with cross-validation"],
  "5": ["Real-time lane detection on embedded hardware", "Edge detection + colour masking + perspective transformation", "Vision-based autonomous path following"],
  "6": ["Full donor/recipient management with compatibility matching", "Structured REST API with validation and error handling", "Normalised MySQL schema preventing data anomalies", "Real-time dashboard for hospital staff"],
};
const problems: Record<string, string> = {
  "8": "Urdu is a low-resource language for conversational AI — most TTS and ASR systems barely support it, and no off-the-shelf voice agent exists for domain-specific Urdu use cases. The pipeline needs natural-sounding Urdu TTS, an LLM that speaks grounded Roman-Urdu/Urdu responses, and eventually full speech-to-text — all running on local infrastructure.",
  "1": "Standard speech recognition systems operate at the word level, making them unsuitable for pronunciation feedback in speech rehabilitation. Urdu has almost no annotated pediatric speech data, and the system must run in real time on a Raspberry Pi 5.",
  "7": "Researching a company manually means hours switching between Google, news sites, LinkedIn, and pricing pages. A single-shot LLM lookup hallucinates and lacks depth. There's no tool that plans its own research strategy and grounds every claim in retrieved sources.",
  "9": "Support teams drown in repetitive tickets whose answers already exist in documentation. Manual triage is slow, and generic LLM responses hallucinate when they aren't grounded in the actual support knowledge base.",
  "2": "Engineering teams lose hours manually switching between Gmail, Slack, and Jira to get project status. There was no unified AI layer to surface insights across tools in real time.",
  "3": "Deaf and hard-of-hearing users lack accessible real-time translation tools. Most sign language recognition systems are offline, slow, or require specialised hardware.",
  "4": "The Santander dataset is anonymised and high-dimensional — standard feature engineering fails, requiring statistical feature selection and model comparison for reliable binary classification.",
  "5": "Building a self-driving car prototype on a Raspberry Pi requires real-time lane detection and obstacle avoidance using only classical image processing — deep learning models are too compute-heavy for the constrained hardware.",
  "6": "Hospital blood banks operate in silos — donor records, blood type data and recipient requests are managed manually or in disconnected spreadsheets, causing critical delays in urgent transfusion matching.",
};
const solutions: Record<string, string> = {
  "8": "Developing components for an Urdu conversational voice agent spanning local LLM response generation and text-to-speech, with speech-to-text integration in progress for an end-to-end pipeline. Applying Coqui TTS with ElevenLabs audio data to Urdu synthesis, fine-tuning domain-specific LLMs with Hugging Face Transformers + PEFT/LoRA on English and Roman Urdu conversations, integrating Ollama-hosted LLMs and local embedding models through OpenAI-compatible interfaces, and building RAG pipelines that ground Urdu responses in knowledge-base context.",
  "1": "Built a phoneme-level Urdu ASR pipeline with Kaldi, addressing data scarcity by reimplementing cross-lingual transfer learning from English and Persian acoustic models and running controlled experiments across training-data regimes. Deployed on Raspberry Pi 5 using OpenBLAS and hardware-specific build configs, with a Kivy interface for live phoneme feedback and rehabilitation progress tracking.",
  "7": "Orchestrated LangGraph agent workflows for structured QA over heterogeneous web data. Implemented sentence-transformer embeddings, document chunking, and pgvector retrieval behind a FastAPI backend, refining retrieval strategies to improve context relevance. Delivered end-to-end with a Next.js interface deployed through Vercel and cloud infrastructure.",
  "9": "Built a LangGraph ticket-resolution workflow combining ticket triage, FAISS knowledge retrieval, and LLM-generated responses grounded in relevant support documentation. Containerized the application with Docker to make the agent runtime and dependencies reproducible across development and deployment environments.",
  "2": "Built a streaming Next.js + TypeScript app using Vercel AI SDK and Composio to unify Gmail, Slack, and Jira. Implemented a real-time AI chatbot with Convex backend that answers natural-language queries about sprint status, blockers, and deadlines.",
  "3": "Built dual-mode recognition: CNN for static signs (A–Z) and LSTM for dynamic gestures, both powered by MediaPipe's 21-keypoint hand tracking. Applied prediction smoothing for stability. Deployed as a live Streamlit app with text-to-speech output.",
  "4": "Selected Naive Bayes after statistical analysis of the feature distribution. Used SHAP for feature importance, LightGBM as a strong baseline, and a Residual MLP for deep comparison. Delivered a fully reproducible ML pipeline with cross-validation.",
  "5": "Implemented a full classical computer vision pipeline: Canny edge detection, Hough Transform for lane line fitting, colour masking in HSV space, and perspective transformation for bird's-eye view. Ran on Raspberry Pi with Python multithreading.",
  "6": "Built a full stack Blood Management System using Node.js and Express backend with server-rendered frontend dashboard. Supports donor registration, recipient request management, and real-time blood type compatibility checks with a normalised MySQL schema.",
};
const impacts: Record<string, string[]> = {
  "8": ["Voice agent components running in production at Blue Group of Companies", "Natural Urdu TTS adapted from ElevenLabs audio data", "Domain LLM fine-tuning evaluated for factual consistency and directness", "Grounded Urdu responses via retrieval-augmented generation"],
  "1": ["Real-time phoneme recognition on Raspberry Pi 5", "Overcame Urdu data scarcity with cross-language transfer learning", "Live phoneme feedback UI for speech rehabilitation", "Hardware-optimized inference with OpenBLAS"],
  "7": ["Autonomous multi-agent research pipeline with grounded citations", "RAG-ready pgvector index for follow-up queries", "Refined retrieval strategies for better context relevance", "Live streaming agent progress via Next.js frontend"],
  "9": ["Automated ticket triage and grounded response drafting", "Responses cite actual support documentation via FAISS retrieval", "Reproducible deployment with Docker containerization"],
  "2": ["Reduced daily project status check time for teams", "Natural language interface for sprint/blocker queries", "Integrated 3 external tools through a single AI interface"],
  "3": ["Dual-mode recognition covering static alphabet and dynamic gestures", "Real-time operation with MediaPipe", "Text-to-speech output for immediate accessibility"],
  "4": ["Outperformed LightGBM baseline with simpler Naive Bayes model", "SHAP-driven feature analysis revealed key predictors", "Full reproducibility with documented cross-validation"],
  "5": ["Real-time lane detection on Raspberry Pi hardware", "Zero-ML obstacle avoidance using classical CV", "Bird's-eye lane tracking via perspective transformation"],
  "6": ["Full stack web app with donor management dashboard", "Real-time blood type compatibility matching", "Normalised MySQL schema preventing data anomalies"],
};

/* ── Modal ─────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"summary" | "impact">("summary");
  const color = categoryColors[project.category] ?? "#4caf50";

  // ESC to close + scroll lock while modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

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
          <ProjectImage src={project.image} alt={project.title} accent={color} height={200} />
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
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}
                  >
                    <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.15rem" }}>▸</span>
                    {item}
                  </motion.li>
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
// Memoized: with a stable onSelect callback, typing in a sibling input or
// toggling filter state never re-renders unaffected cards in the grid.
const ProjectCard = memo(function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const color = categoryColors[project.category] ?? "#4caf50";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  // Cursor-tracking glow position
  const glowRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.background = `radial-gradient(circle 260px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${color}14 0%, transparent 70%)`;
  };
  const handlePointerLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card project-card"
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}
      onClick={() => onSelect(project)}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
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
          <ProjectImage src={project.image} alt={project.title} accent={color} height={160} />
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
      <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, position: "relative", zIndex: 1 }}>
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
          <ChevronRight size={13} className="project-cta-arrow" style={{ marginLeft: "auto" }} />
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
            Production voice AI, multi-agent systems, and applied ML — plus the full-stack work behind them.
            Click any card for the problem, solution, and real-world impact.
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
