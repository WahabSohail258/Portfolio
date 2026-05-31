"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Terminal } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem 1rem",
    background: "var(--input-bg)",
    border: "1.5px solid var(--border)",
    borderRadius: 8,
    color: "var(--foreground)",
    fontSize: "0.88rem",
    fontFamily: "'Poppins', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    fontFamily: "'Fira Code', monospace",
    color: "var(--primary)",
    marginBottom: "0.35rem",
    letterSpacing: "0.05em",
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-tag">// contact</span>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.93rem", marginTop: "0.5rem", maxWidth: 500 }}>
            Open to new opportunities, collaborations, or just a good conversation.
            My inbox is always open.
          </p>
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Left — terminal-style contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Terminal contact window */}
            <div className="terminal-window">
              <div className="terminal-titlebar">
                <div className="terminal-dots">
                  <div className="terminal-dot" style={{ background: "#ff5f57" }} />
                  <div className="terminal-dot" style={{ background: "#ffbd2e" }} />
                  <div className="terminal-dot" style={{ background: "#28c840" }} />
                </div>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>
                  connect.sh
                </span>
                <div style={{ width: 50 }} />
              </div>

              <div style={{ padding: "1.25rem", fontFamily: "'Fira Code', monospace", fontSize: "0.82rem", lineHeight: 2 }}>
                <div style={{ color: "#6c7086" }}>$ whoami --contact</div>

                {[
                  { label: "email", value: "sohailwahab27@gmail.com", href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={13} /> },
                  { label: "github", value: "WahabSohail258", href: "https://github.com/WahabSohail258", icon: <Github size={13} /> },
                  { label: "linkedin", value: "wahab-sohail", href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={13} /> },
                ].map(({ label, value, href, icon }) => (
                  <div key={label}>
                    <span style={{ color: "#4caf50" }}>{label}</span>
                    <span style={{ color: "#6c7086" }}>: </span>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#89dceb",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      {icon} {value}
                    </a>
                  </div>
                ))}

                <div style={{ marginTop: "0.5rem", color: "#6c7086" }}>
                  status: <span style={{ color: "#4caf50" }}>available_for_work</span>
                </div>
                <div style={{ color: "#6c7086" }}>
                  location: <span style={{ color: "#cdd6f4" }}>Rawalpindi, Pakistan</span>
                </div>
                <div style={{ color: "#6c7086" }}>
                  open_to: <span style={{ color: "#cdd6f4" }}>remote &amp; relocation</span>
                </div>

                <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "#4caf50" }}>
                  <Terminal size={12} />
                  <span style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}>█</span>
                </div>
              </div>
            </div>

            {/* Availability pill */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1rem",
                borderRadius: 10,
                background: "rgba(76,175,80,0.08)",
                border: "1px solid rgba(76,175,80,0.2)",
              }}
            >
              <span
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span style={{ fontSize: "0.83rem", color: "#4caf50", fontWeight: 600 }}>
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label htmlFor="contact-name" style={labelStyle}>// your_name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label htmlFor="contact-email" style={labelStyle}>// email_address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label htmlFor="contact-message" style={labelStyle}>// message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary"
              style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
            >
              {status === "sending" ? (
                "Sending..."
              ) : (
                <><Send size={14} /> Send Message</>
              )}
            </button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.7rem 0.9rem", borderRadius: 8,
                  background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)",
                  color: "#4caf50", fontSize: "0.84rem", fontWeight: 500,
                }}
              >
                <CheckCircle size={15} /> Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.7rem 0.9rem", borderRadius: 8,
                  background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)",
                  color: "#dc2626", fontSize: "0.84rem", fontWeight: 500,
                }}
              >
                <AlertCircle size={15} /> Failed to send. Email me directly at sohailwahab27@gmail.com
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
