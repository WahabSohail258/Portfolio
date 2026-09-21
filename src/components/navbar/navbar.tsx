"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.9rem 1.5rem",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.3s ease",
        }}
      >
        {/* ── Single pill container ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.45rem 0.6rem 0.45rem 0.75rem",
            borderRadius: 999,
            border: "1.5px solid var(--border)",
            background: "var(--card)",
            backdropFilter: "blur(12px)",
            width: "100%",
            maxWidth: 720,
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.22)"
              : "0 4px 24px rgba(0,0,0,0.18)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontWeight: 800,
              fontSize: "0.9rem",
              color: "var(--foreground)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              padding: "0.2rem 0.6rem",
              marginRight: "0.25rem",
            }}
          >
            <span style={{ color: "var(--foreground-muted)" }}>&lt;</span>
            <span style={{ color: "var(--primary)" }}>WAHAB</span>
            <span style={{ color: "var(--foreground-muted)" }}>&nbsp;/&gt;</span>
          </motion.a>

          {/* Divider */}
          <div style={{ width: 1, height: 22, background: "var(--border)", flexShrink: 0 }} />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Nav links — sliding highlight pill behind active link */}
          <div
            className="nav-links"
            style={{ display: "flex", alignItems: "center", gap: "0.1rem", flex: 1 }}
          >
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="nav-link"
                  style={{
                    position: "relative",
                    padding: "0.35rem 0.75rem",
                    borderRadius: 999,
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: isActive ? "var(--primary)" : "var(--foreground-muted)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 0.25s ease",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 999,
                        background: "var(--primary-muted)",
                        zIndex: -1,
                      }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="nav-right-items" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 1, height: 22, background: "var(--border)", flexShrink: 0 }} />

            {/* Resume */}
            <a
              href="/Wahab_Resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.35rem 0.75rem",
                borderRadius: 999,
                color: "var(--foreground-muted)",
                fontSize: "0.88rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
            >
              <Download size={13} strokeWidth={2} />
              Resume
            </a>

            {/* Let's Connect CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.4rem 1.1rem",
                borderRadius: 999,
                background: "var(--primary)",
                color: "#fff",
                fontSize: "0.88rem",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 12px rgba(var(--primary-rgb), 0.35)",
                letterSpacing: "0.01em",
              }}
            >
              Let&apos;s Connect
            </motion.a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="hamburger"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--foreground)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "fixed",
              top: 72,
              left: "1rem",
              right: "1rem",
              transformOrigin: "top center",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              zIndex: 999,
              padding: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {[...links, { href: "#experience", label: "Experience" }, { href: "#contact", label: "Contact" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ delay: open ? i * 0.045 : 0 }}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  padding: "0.65rem 0.9rem",
                  borderRadius: 10,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: active === l.href ? "var(--primary)" : "var(--foreground)",
                  background: active === l.href ? "var(--primary-muted)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 680px) {
          .nav-links { display: none !important; }
          .nav-right-items { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
