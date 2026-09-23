"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { skillTree, SkillFile, SkillFolder } from "@/data/skills";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Memoized: folder open/close re-renders shouldn't re-run entrance
// transitions on unchanged sibling files.
const FileTreeItem = memo(function FileTreeItem({ file, index }: { file: SkillFile; index: number }) {
  return (
    <motion.div
      className="file-tree-item"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.035, ease: EASE }}
      whileHover={{ x: 3 }}
      style={{ paddingLeft: "2rem" }}
      title={file.name + file.ext}
    >
      <span style={{ color: file.color, fontSize: "0.7rem", width: 12, textAlign: "center", flexShrink: 0 }}>
        {file.symbol ?? "🔷"}
      </span>
      <span style={{ color: "#89ddff", fontSize: "0.75rem", flexShrink: 0 }}>📄</span>
      <span style={{ color: "#cdd6f4" }}>{file.name}</span>
      <span style={{ color: file.color }}>{file.ext}</span>
    </motion.div>
  );
});

const FolderTreeItem = memo(function FolderTreeItem({ folder, folderIndex }: { folder: SkillFolder; folderIndex: number }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + folderIndex * 0.08, ease: EASE }}
    >
      <div
        className="file-tree-item"
        onClick={() => setOpen(!open)}
        style={{ paddingLeft: "0.75rem", cursor: "pointer", userSelect: "none" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
        }}
        aria-expanded={open}
      >
        <motion.span
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          {open ? (
            <ChevronDown size={12} style={{ color: "#6c7086" }} />
          ) : (
            <ChevronRight size={12} style={{ color: "#6c7086" }} />
          )}
        </motion.span>
        <motion.span
          animate={{ scale: open ? 1 : 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          {open ? (
            <FolderOpen size={14} style={{ color: "#e8a838" }} />
          ) : (
            <Folder size={14} style={{ color: "#e8a838" }} />
          )}
        </motion.span>
        <span style={{ color: "#cdd6f4" }}>{folder.name}</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="files"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            {folder.files.map((f, i) => (
              <FileTreeItem key={f.name} file={f} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden className="aurora aurora-a" style={{ opacity: 0.06 }} />

      <div className="section-container" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
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
            <span
              className="animate-pulse-dot"
              style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }}
            />
            Stack &amp; tooling
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Technical{" "}
            <span className="gradient-text">toolbox</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto" }}>
            Skills as a project tree — from LLM fine-tuning and voice AI to retrieval, backend, and infrastructure.
          </p>
        </motion.div>

        {/* File tree terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
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
            <motion.div
              className="file-tree-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              style={{ paddingLeft: "0.5rem" }}
            >
              <ChevronDown size={12} style={{ color: "#6c7086" }} />
              <Folder size={14} style={{ color: "#e8a838" }} />
              <span style={{ color: "#cdd6f4", fontWeight: 600 }}>portfolio</span>
            </motion.div>

            {skillTree.map((folder, i) => (
              <FolderTreeItem key={folder.name} folder={folder} folderIndex={i} />
            ))}

            {/* Blinking caret at the bottom like a prompt */}
            <div style={{ paddingLeft: "0.5rem", marginTop: "0.4rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ color: "#4caf50", fontWeight: 600 }}>$</span>
              <span className="terminal-caret" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
