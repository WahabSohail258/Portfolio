"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  X,
  ExternalLink,
  FileText,
  Plus,
  Minus,
} from "lucide-react";
import { projects, Project } from "@/data/projects";

const labels: Record<string, string> = {
  aiml: "AI & ML",
  fullstack: "Full stack",
  backend: "Backend",
  frontend: "Frontend",
};
const filters = ["all", "aiml", "fullstack"] as const;

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.15) }}
      className="work-card"
    >
      <button
        className="work-open"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title}`}
      >
        <div className="work-image">
          <Image
            src={project.image}
            alt={
              project.id === "7"
                ? "OrgMind live research application"
                : `${project.title} — illustrative project cover`
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
          <span className="work-category">{labels[project.category]}</span>
          <span className="work-arrow">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <div className="work-body">
          <div className="work-number">
            <span>
              {project.featured ? "FEATURED PROJECT" : "PROJECT ARCHIVE"}
            </span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="work-tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="work-cta">
            Explore project <ArrowRight size={16} />
          </div>
        </div>
      </button>
    </motion.article>
  );
}
export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = projects.filter((p) =>
    filter === "all" ? expanded || p.featured : p.category === filter,
  );
  return (
    <section id="projects" className="section-padding work-section">
      <div className="section-container">
        <div className="work-heading">
          <div>
            <span className="section-tag">01 / SELECTED WORK</span>
            <h2 className="section-title">
              From an idea.
              <br />
              To <span className="gradient-text">something useful.</span>
            </h2>
          </div>
          <p>
            Voice systems, grounded agents, and applied machine learning. A
            selection of things I’ve built and problems I’ve explored.
          </p>
        </div>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All work" : labels[f]}{" "}
              <span>
                {f === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
          <span className="work-filter-note">
            BUILT WITH CURIOSITY. BACKED BY CODE.
          </span>
        </div>
        <div className="work-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
        {filter === "all" && (
          <div className="archive-toggle">
            <button
              className="btn-secondary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <Minus size={16} /> : <Plus size={16} />}
              {expanded
                ? "Show featured work"
                : `Explore all ${projects.length} projects`}
            </button>
          </div>
        )}
        <p className="cover-note">
          OrgMind shows the live application. Photographs illustrate the other
          project domains.
        </p>
      </div>
      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="project-overlay" />
          <Dialog.Content
            className="project-dialog"
            aria-describedby="project-description"
          >
            {selected && (
              <>
                <div className="dialog-image">
                  <Image
                    src={selected.image}
                    alt={
                      selected.id === "7"
                        ? "OrgMind live research application"
                        : `Illustrative cover for ${selected.title}`
                    }
                    fill
                    sizes="640px"
                  />
                  <Dialog.Close
                    className="dialog-close"
                    aria-label="Close project details"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </div>
                <div className="dialog-body">
                  <span className="section-tag">
                    {labels[selected.category]}
                  </span>
                  <Dialog.Title>{selected.title}</Dialog.Title>
                  <Dialog.Description id="project-description">
                    {selected.description}
                  </Dialog.Description>
                  <div className="work-tags">
                    {selected.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <h3>Behind the build</h3>
                  <p>{selected.longDescription}</p>
                  <div className="dialog-links">
                    <a
                      className="btn-primary"
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      {selected.github === "https://github.com/WahabSohail258"
                        ? "GitHub profile"
                        : "View source"}
                      <ArrowUpRight size={16} />
                    </a>
                    {selected.live && (
                      <a
                        className="btn-secondary"
                        href={selected.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} /> Live project
                      </a>
                    )}
                    {selected.id === "1" && (
                      <a
                        className="btn-secondary"
                        href="/thesis/fyp_thesis.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText size={16} /> Read thesis
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
