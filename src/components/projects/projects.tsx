"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { projects, Project } from "@/data/projects";

type Filter = "all" | "aiml" | "fullstack" | "backend";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "aiml", label: "AI & ML" },
  { key: "fullstack", label: "Full Stack" },
  { key: "backend", label: "Backend" },
];

const projectColors: Record<string, string[]> = {
  "1": ["#3b82f6", "#06b6d4"],
  "2": ["#8b5cf6", "#3b82f6"],
  "3": ["#06b6d4", "#10b981"],
  "4": ["#f59e0b", "#ef4444"],
  "5": ["#10b981", "#3b82f6"],
  "6": ["#f43f5e", "#8b5cf6"],
};

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const [colors] = useState(projectColors[project.id] ?? ["#3b82f6", "#06b6d4"]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-2xl border border-white/[0.06] hover:border-electric-500/30 overflow-hidden transition-all duration-300 hover:shadow-card-hover cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* Gradient header */}
      <div
        className="h-44 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors[0]}20 0%, ${colors[1]}20 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` }}
        />
        {/* Project initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-6xl font-black opacity-30"
            style={{ color: colors[0] }}
          >
            {project.title[0]}
          </span>
        </div>
        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 backdrop-blur-sm flex items-center justify-center gap-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full glass border border-white/20 text-white hover:text-electric-400 hover:border-electric-400/50 transition-all duration-200 hover:scale-110"
            id={`project-github-${project.id}`}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full glass border border-white/20 text-white hover:text-electric-400 hover:border-electric-400/50 transition-all duration-200 hover:scale-110"
            id={`project-live-${project.id}`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        {featured && project.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium bg-electric-600/80 text-white backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-electric-400 transition-colors duration-300">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-electric-400 flex-shrink-0 transition-colors duration-300" />
        </div>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium glass-electric text-electric-400 border border-electric-500/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-white/30">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Workaround: featured is always true for display purposes in the card render scope
const featured = true;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const colors = projectColors[project.id] ?? ["#3b82f6", "#06b6d4"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-2xl glass border border-white/[0.08] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div
          className="h-48 relative"
          style={{ background: `linear-gradient(135deg, ${colors[0]}30 0%, ${colors[1]}30 100%)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl font-black opacity-20" style={{ color: colors[0] }}>
              {project.title[0]}
            </span>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 text-white/60 hover:text-white transition-colors"
          id="modal-close-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-electric-400 text-xs font-medium uppercase tracking-widest mb-1 block">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl glass-electric border border-electric-500/20 text-electric-400 hover:shadow-glow-sm transition-all duration-200"
                id={`modal-github-${project.id}`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl glass-electric border border-electric-500/20 text-electric-400 hover:shadow-glow-sm transition-all duration-200"
                id={`modal-live-${project.id}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed mb-6">{project.longDescription}</p>

          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs font-medium glass-electric text-electric-400 border border-electric-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-12">
            <p className="text-electric-400 text-sm font-medium tracking-widest uppercase mb-3">What I&apos;ve built</p>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-electric mx-auto mt-4" />
          </SectionWrapper>

          {/* Filters */}
          <SectionWrapper className="flex justify-center mb-10">
            <div className="flex gap-2 flex-wrap justify-center p-1 glass rounded-xl border border-white/[0.06]">
              {filters.map((f) => (
                <button
                  key={f.key}
                  id={`project-filter-${f.key}`}
                  onClick={() => setFilter(f.key)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === f.key
                      ? "bg-electric-600 text-white shadow-glow-sm"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </SectionWrapper>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
