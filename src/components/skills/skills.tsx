"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";

interface FileItem {
  name: string;
  ext: string;
  color: string;
  symbol?: string;
}

interface FolderItem {
  name: string;
  files: FileItem[];
}

const tree: FolderItem[] = [
  {
    name: "programming-languages",
    files: [
      { name: "python", ext: ".py", color: "#3776AB", symbol: "🔷" },
      { name: "c", ext: ".c", color: "#A8B9CC", symbol: "🔹" },
      { name: "cplusplus", ext: ".cpp", color: "#00599C", symbol: "🔷" },
      { name: "typescript", ext: ".ts", color: "#3178C6", symbol: "🔷" },
      { name: "javascript", ext: ".js", color: "#F7DF1E", symbol: "○" },
      { name: "bash", ext: ".sh", color: "#4EAA25", symbol: "·" },
      { name: "sql", ext: ".sql", color: "#336791", symbol: "○" },
    ],
  },
  {
    name: "ai-machine-learning",
    files: [
      { name: "tensorflow", ext: ".ts", color: "#FF6F00", symbol: "🔷" },
      { name: "pytorch", ext: ".ts", color: "#EE4C2C", symbol: "🔷" },
      { name: "scikit-learn", ext: ".ts", color: "#F7931E", symbol: "🔷" },
      { name: "deep-learning", ext: ".ts", color: "#a78bfa", symbol: "🔷" },
      { name: "computer-vision", ext: ".ts", color: "#5C3EE8", symbol: "🔷" },
      { name: "yolov8", ext: ".ts", color: "#00FFFF", symbol: "🔷" },
      { name: "mediapipe", ext: ".ts", color: "#0F9D58", symbol: "🔷" },
    ],
  },
  {
    name: "frameworks",
    files: [
      { name: "react", ext: ".tsx", color: "#61DAFB", symbol: "🔷" },
      { name: "nextjs", ext: ".tsx", color: "#cdd6f4", symbol: "🔷" },
      { name: "fastapi", ext: ".py", color: "#009688", symbol: "🔷" },
      { name: "flask", ext: ".py", color: "#cdd6f4", symbol: "🔷" },
      { name: "nodejs", ext: ".js", color: "#339933", symbol: "🔷" },
    ],
  },
  {
    name: "tools-and-systems",
    files: [
      { name: "docker", ext: ".sh", color: "#2496ED", symbol: "🔷" },
      { name: "linux", ext: ".sh", color: "#FCC624", symbol: "·" },
      { name: "raspberry-pi", ext: ".sh", color: "#C51A4A", symbol: "·" },
      { name: "git", ext: ".sh", color: "#F05032", symbol: "·" },
      { name: "cuda", ext: ".cu", color: "#76b900", symbol: "Σ" },
      { name: "mongodb", ext: ".js", color: "#47A248", symbol: "○" },
      { name: "postgresql", ext: ".sql", color: "#336791", symbol: "○" },
    ],
  },
];

function FileTreeItem({ file }: { file: FileItem }) {
  return (
    <div
      className="file-tree-item"
      style={{ paddingLeft: "2rem" }}
      title={file.name + file.ext}
    >
      <span style={{ color: file.color, fontSize: "0.7rem", width: 12, textAlign: "center", flexShrink: 0 }}>
        {file.symbol ?? "🔷"}
      </span>
      <span style={{ color: "#89ddff", fontSize: "0.75rem", flexShrink: 0 }}>📄</span>
      <span style={{ color: "#cdd6f4" }}>{file.name}</span>
      <span style={{ color: file.color }}>{file.ext}</span>
    </div>
  );
}

function FolderTreeItem({ folder }: { folder: FolderItem }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div
        className="file-tree-item"
        onClick={() => setOpen(!open)}
        style={{ paddingLeft: "0.75rem" }}
      >
        {open ? <ChevronDown size={12} style={{ color: "#6c7086", flexShrink: 0 }} /> : <ChevronRight size={12} style={{ color: "#6c7086", flexShrink: 0 }} />}
        {open
          ? <FolderOpen size={14} style={{ color: "#e8a838", flexShrink: 0 }} />
          : <Folder size={14} style={{ color: "#e8a838", flexShrink: 0 }} />}
        <span style={{ color: "#cdd6f4" }}>{folder.name}</span>
      </div>
      {open && (
        <div>
          {folder.files.map((f) => (
            <FileTreeItem key={f.name} file={f} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.9rem",
              borderRadius: 999,
              border: "1.5px solid var(--card-border)",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              color: "var(--primary)",
              fontWeight: 600,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
            Stack &amp; tooling
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Technical{" "}
            <span className="gradient-text">toolbox</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", maxWidth: 500, margin: "0 auto" }}>
            Skills as a project tree — expand folders to explore languages, ML, cloud, data, and tooling.
          </p>
        </motion.div>

        {/* File tree terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          className="terminal-window"
          style={{ maxWidth: 680, margin: "0 auto" }}
        >
          {/* Titlebar */}
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <div className="terminal-dot" style={{ background: "#ff5f57" }} />
              <div className="terminal-dot" style={{ background: "#ffbd2e" }} />
              <div className="terminal-dot" style={{ background: "#28c840" }} />
            </div>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
              toolbox
            </span>
            <div style={{ width: 50 }} />
          </div>

          {/* File tree body */}
          <div style={{ padding: "1rem 0.5rem" }} className="file-tree">
            {/* Root */}
            <div className="file-tree-item" style={{ paddingLeft: "0.5rem" }}>
              <ChevronDown size={12} style={{ color: "#6c7086" }} />
              <Folder size={14} style={{ color: "#e8a838" }} />
              <span style={{ color: "#cdd6f4", fontWeight: 600 }}>portfolio</span>
            </div>

            {tree.map((folder) => (
              <FolderTreeItem key={folder.name} folder={folder} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
