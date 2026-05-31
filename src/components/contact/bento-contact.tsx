"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin, ArrowUpRight, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

function ClockWidget() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Don't render time on server — prevents hydration mismatch
  if (!mounted) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", border: "5px solid var(--card-border)", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "0.65rem", color: "var(--foreground-muted)", marginBottom: "0.1rem" }}>--</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>Loading...</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}>--:--</div>
        </div>
      </div>
    );
  }

  const h = now.getHours();
  const greeting = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : h < 21 ? "Good Evening" : "Late Night";
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric", year: "2-digit" });

  const totalMins = h * 60 + now.getMinutes();
  const progress = totalMins / 1440;
  const r = 34, cx = 40, cy = 40;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
      <svg width={80} height={80} style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--card-border)" strokeWidth={5} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)" strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={6} fill="var(--primary)" opacity={0.25} />
        <circle cx={cx} cy={cy} r={3} fill="var(--primary)" />
      </svg>
      <div>
        <div style={{ fontSize: "0.65rem", color: "var(--foreground-muted)", marginBottom: "0.1rem" }}>{dateStr}</div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>{greeting}</div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}>
          {timeStr}
        </div>
      </div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" },
  }),
};

export function BentoContact() {
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
    padding: "0.55rem 0.85rem",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--foreground)",
    fontSize: "0.83rem",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <span className="section-tag" style={{ justifyContent: "center", display: "flex" }}>
            // connect
          </span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Let&apos;s <span className="gradient-text">work together</span>
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.93rem", marginTop: "0.5rem" }}>
            Open to opportunities, collaborations, or just a good conversation.
          </p>
        </motion.div>

        {/* Two-column: bento left + form right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="bento-contact-grid">

          {/* Bento left */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>

            {/* GitHub card — fully clickable */}
            <motion.a
              href="https://github.com/WahabSohail258"
              target="_blank"
              rel="noopener noreferrer"
              custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                color: "#fff", minHeight: 130,
                textDecoration: "none", display: "flex", flexDirection: "column",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02, opacity: 0.95 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "auto" }}>
                <Github size={24} />
                <ArrowUpRight size={14} opacity={0.7} />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>GitHub</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>@WahabSohail258</div>
              </div>
            </motion.a>

            {/* Clock */}
            <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card">
              <ClockWidget />
            </motion.div>

            {/* Name + available */}
            <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card">
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>Wahab Sohail</div>
              <div style={{ color: "var(--foreground-muted)", fontSize: "0.78rem", marginBottom: "0.5rem" }}>AI &amp; ML Engineer</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span className="animate-pulse-dot"
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50", flexShrink: 0 }} />
                <span style={{ fontSize: "0.72rem", color: "#4caf50", fontWeight: 600 }}>Available for work</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2, color: "var(--foreground)" }}>Build.</div>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2 }}>Ship.</div>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2, color: "var(--foreground)" }}>Iterate.</div>
              </div>
            </motion.div>

            {/* Social icons 2×2 */}
            <motion.div custom={4} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card">
              <div style={{ fontSize: "0.65rem", color: "var(--foreground-muted)", marginBottom: "0.6rem", fontFamily: "'Fira Code', monospace" }}>
                // socials
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                {[
                  { href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={16} />, color: "#ea4335" },
                  { href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={16} />, color: "#0077b5" },
                  { href: "https://github.com/WahabSohail258", icon: <Github size={16} />, color: "#4caf50" },
                  { href: "#contact", icon: <Send size={16} />, color: "var(--primary)" },
                ].map(({ href, icon, color }, i) => (
                  <a key={i} href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      height: 38, borderRadius: 9,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: color, color: "#fff", textDecoration: "none",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div custom={5} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{ background: "linear-gradient(135deg, #f2c94c 0%, #f2994a 100%)", color: "#1a1a0a" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem" }}>📁 Notes</div>
              <p style={{ fontSize: "0.75rem", lineHeight: 1.55, fontStyle: "italic" }}>
                &quot;Build things that ship in the real world. Curiosity is the engine — discipline is the fuel.&quot;
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            className="card"
            style={{ padding: "1.5rem" }}
          >
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.75rem", color: "var(--primary)", marginBottom: "1.25rem", letterSpacing: "0.05em" }}>
              $ send --message
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label htmlFor="bc-name" style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.3rem" }}>
                  // name
                </label>
                <input id="bc-name" name="name" type="text" required value={form.name}
                  onChange={handleChange} placeholder="John Doe" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
              </div>
              <div>
                <label htmlFor="bc-email" style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.3rem" }}>
                  // email
                </label>
                <input id="bc-email" name="email" type="email" required value={form.email}
                  onChange={handleChange} placeholder="john@example.com" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
              </div>
              <div>
                <label htmlFor="bc-message" style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.3rem" }}>
                  // message
                </label>
                <textarea id="bc-message" name="message" required rows={5} value={form.message}
                  onChange={handleChange} placeholder="Tell me about your project or opportunity..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-primary"
                style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending..." : <><Send size={14} /> Send Message</>}
              </button>

              {status === "success" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 0.8rem", borderRadius: 8, background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", color: "#4caf50", fontSize: "0.8rem" }}>
                  <CheckCircle size={14} /> Sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 0.8rem", borderRadius: 8, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#dc2626", fontSize: "0.8rem" }}>
                  <AlertCircle size={14} /> Failed. Email: sohailwahab27@gmail.com
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
