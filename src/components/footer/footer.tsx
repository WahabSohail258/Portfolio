"use client";

import { Github, Linkedin, Mail, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "2rem 0",
      }}
    >
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
          <Code2 size={18} style={{ color: "var(--primary)" }} />
          <span>Wahab<span style={{ color: "var(--primary)" }}>.</span></span>
        </div>

        {/* Copyright */}
        <span style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", fontFamily: "'Fira Code', monospace" }}>
          © {new Date().getFullYear()} Wahab Sohail. All rights reserved.
        </span>

        {/* Socials */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {[
            { href: "https://github.com/WahabSohail258", icon: <Github size={15} />, label: "GitHub" },
            { href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={15} />, label: "LinkedIn" },
            { href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={15} />, label: "Email" },
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
                width: 32,
                height: 32,
                borderRadius: 7,
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--foreground-muted)",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--foreground-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
