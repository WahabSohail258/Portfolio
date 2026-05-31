"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="section-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--foreground)",
              textDecoration: "none",
            }}
          >
            <Code2 size={20} style={{ color: "var(--primary)" }} />
            <span>Wahab<span style={{ color: "var(--primary)" }}>.</span></span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: 8,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: active === l.href ? "var(--primary)" : "var(--foreground-muted)",
                  background: active === l.href ? "var(--primary-muted)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              aria-label="Toggle menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "var(--card)",
                color: "var(--foreground)",
                cursor: "pointer",
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              background: "var(--card)",
              borderBottom: "1px solid var(--border)",
              zIndex: 999,
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  padding: "0.65rem 0.85rem",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: active === l.href ? "var(--primary)" : "var(--foreground)",
                  background: active === l.href ? "var(--primary-muted)" : "transparent",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
