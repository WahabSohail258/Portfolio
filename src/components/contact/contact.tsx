"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
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

  const socials = [
    {
      href: "mailto:sohailwahab27@gmail.com",
      icon: <Mail size={18} />,
      label: "Email",
      value: "sohailwahab27@gmail.com",
    },
    {
      href: "https://github.com/WahabSohail258",
      icon: <Github size={18} />,
      label: "GitHub",
      value: "github.com/WahabSohail258",
    },
    {
      href: "https://linkedin.com/in/wahab-sohail",
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      value: "linkedin.com/in/wahab-sohail",
    },
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-tag">// contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: 520 }}>
            I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to connect — my inbox is always open.
          </p>
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {socials.map(({ href, icon, label, value }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--primary-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", marginBottom: "0.1rem" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* Availability badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1rem",
                borderRadius: 10,
                background: "rgba(5,150,105,0.08)",
                border: "1px solid rgba(5,150,105,0.2)",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#059669",
                  animation: "pulse 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "0.85rem", color: "#059669", fontWeight: 500 }}>
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.4rem" }}
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    background: "var(--input-bg)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--foreground)",
                    fontSize: "0.9rem",
                    fontFamily: "'Poppins', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.4rem" }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    background: "var(--input-bg)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--foreground)",
                    fontSize: "0.9rem",
                    fontFamily: "'Poppins', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.4rem" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    background: "var(--input-bg)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--foreground)",
                    fontSize: "0.9rem",
                    fontFamily: "'Poppins', sans-serif",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: 8,
                    background: "rgba(5,150,105,0.08)",
                    border: "1px solid rgba(5,150,105,0.2)",
                    color: "#059669",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle size={16} /> Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: 8,
                    background: "rgba(220,38,38,0.08)",
                    border: "1px solid rgba(220,38,38,0.2)",
                    color: "#dc2626",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  <AlertCircle size={16} /> Something went wrong. Email me directly at sohailwahab27@gmail.com
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
