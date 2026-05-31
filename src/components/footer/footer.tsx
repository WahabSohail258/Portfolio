"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        padding: "1.75rem 0",
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
        {/* Terminal logo */}
        <span style={{ fontFamily: "'Fira Code', monospace", fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground-muted)" }}>
          <span style={{ color: "var(--primary)" }}>~/wahab</span> $ _
        </span>

        {/* Copyright */}
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
          © {new Date().getFullYear()} Wahab Sohail
        </span>

        {/* Socials */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { href: "https://github.com/WahabSohail258", icon: <Github size={14} />, label: "GitHub" },
            { href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={14} />, label: "LinkedIn" },
            { href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={14} />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 30, height: 30, borderRadius: 7,
                border: "1px solid var(--border)",
                background: "var(--card)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--foreground-muted)",
                transition: "all 0.15s ease",
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
      </div>
    </footer>
  );
}
