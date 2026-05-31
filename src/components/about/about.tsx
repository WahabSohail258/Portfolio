"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, GraduationCap, Briefcase, Code2 } from "lucide-react";

const stats = [
  { value: "2+", label: "Internships", icon: <Briefcase size={18} /> },
  { value: "6+", label: "Projects", icon: <Code2 size={18} /> },
  { value: "2026", label: "NUST Grad", icon: <GraduationCap size={18} /> },
];

export function About() {
  return (
    <section id="about" className="section-padding" style={{ background: "var(--background)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="section-tag">// about me</span>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
            marginTop: "2.5rem",
          }}
          className="about-grid"
        >
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p style={{ color: "var(--foreground)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.975rem" }}>
              I&apos;m a <strong>Computer Engineering graduate from NUST</strong> (Class of 2026) based in
              Rawalpindi, Pakistan. My work focuses on building intelligent systems at the intersection of
              AI, computer vision, and embedded platforms.
            </p>
            <p style={{ color: "var(--foreground-muted)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.975rem" }}>
              During my internships at <strong>RISETech</strong> and <strong>NCRA</strong>, I worked on
              real-world AI pipelines, autonomous systems, and Linux-based edge deployments. I led the
              community as <strong>President of COMPPEC</strong> and contributed to innovation ecosystems
              as an NVC Fund Manager and P@SHA volunteer.
            </p>
            <p style={{ color: "var(--foreground-muted)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.975rem" }}>
              I&apos;m passionate about turning complex problems into elegant, performant solutions —
              whether that&apos;s a computer vision pipeline running on a Raspberry Pi or a
              full-stack web application with AI at its core. Currently <strong>open to remote opportunities
              and relocation</strong>.
            </p>

            {/* Info chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { icon: <MapPin size={14} />, label: "Rawalpindi, Pakistan" },
                { icon: <GraduationCap size={14} />, label: "B.E. Computer Engineering — NUST, 2026" },
                { icon: <Briefcase size={14} />, label: "Open to remote & relocation" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.875rem",
                    color: "var(--foreground-muted)",
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={16} />, label: "Email" },
                { href: "https://github.com/WahabSohail258", icon: <Github size={16} />, label: "GitHub" },
                { href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={16} />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    border: "1.5px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground-muted)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.background = "var(--primary-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--card)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + code block */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="card"
                  style={{
                    padding: "1.25rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "var(--primary)" }}>{s.icon}</span>
                  <div
                    className="gradient-text"
                    style={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Code block */}
            <div
              style={{
                background: "#1e1e2e",
                borderRadius: 12,
                padding: "1.25rem",
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                border: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <div style={{ color: "#6c7086", marginBottom: "0.5rem", fontSize: "0.7rem" }}>
                // wahab.ts
              </div>
              <div>
                <span style={{ color: "#cba6f7" }}>const</span>{" "}
                <span style={{ color: "#cdd6f4" }}>wahab</span>{" "}
                <span style={{ color: "#89dceb" }}>=</span>{" "}
                <span style={{ color: "#89b4fa" }}>{"{"}</span>
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <span style={{ color: "#a6e3a1" }}>role</span>
                <span style={{ color: "#cdd6f4" }}>: </span>
                <span style={{ color: "#a6e3a1" }}>&quot;AI & ML Engineer&quot;</span>
                <span style={{ color: "#6c7086" }}>,</span>
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <span style={{ color: "#a6e3a1" }}>university</span>
                <span style={{ color: "#cdd6f4" }}>: </span>
                <span style={{ color: "#a6e3a1" }}>&quot;NUST&quot;</span>
                <span style={{ color: "#6c7086" }}>,</span>
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <span style={{ color: "#a6e3a1" }}>location</span>
                <span style={{ color: "#cdd6f4" }}>: </span>
                <span style={{ color: "#a6e3a1" }}>&quot;Rawalpindi, PK&quot;</span>
                <span style={{ color: "#6c7086" }}>,</span>
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <span style={{ color: "#a6e3a1" }}>openToWork</span>
                <span style={{ color: "#cdd6f4" }}>: </span>
                <span style={{ color: "#fab387" }}>true</span>
                <span style={{ color: "#6c7086" }}>,</span>
              </div>
              <div style={{ paddingLeft: "1rem" }}>
                <span style={{ color: "#a6e3a1" }}>loves</span>
                <span style={{ color: "#cdd6f4" }}>: </span>
                <span style={{ color: "#89b4fa" }}>[</span>
                <span style={{ color: "#a6e3a1" }}>&quot;AI&quot;</span>
                <span style={{ color: "#6c7086" }}>, </span>
                <span style={{ color: "#a6e3a1" }}>&quot;CV&quot;</span>
                <span style={{ color: "#6c7086" }}>, </span>
                <span style={{ color: "#a6e3a1" }}>&quot;Linux&quot;</span>
                <span style={{ color: "#89b4fa" }}>]</span>
              </div>
              <div>
                <span style={{ color: "#89b4fa" }}>{"}"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
