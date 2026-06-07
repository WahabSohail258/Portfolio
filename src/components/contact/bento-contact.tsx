"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

/* ── Helpers ─────────────────────────────────────────────── */
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

/** Returns true only if all three EmailJS keys are real (non-empty / non-placeholder) */
function emailjsConfigured() {
  const placeholders = ["", "service_placeholder", "template_placeholder", "placeholder_key"];
  return (
    !placeholders.includes(SERVICE_ID) &&
    !placeholders.includes(TEMPLATE_ID) &&
    !placeholders.includes(PUBLIC_KEY)
  );
}

/* ── Clock Widget ────────────────────────────────────────── */
function ClockWidget() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

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

/* ── Card animation variants ─────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ── Main Component ──────────────────────────────────────── */
export function BentoContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // ── Path A: EmailJS is properly configured ──
    if (emailjsConfigured()) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          { from_name: form.name, from_email: form.email, message: form.message },
          PUBLIC_KEY
        );
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        return;
      } catch {
        // fall through to mailto fallback
      }
    }

    // ── Path B: Mailto fallback — always works ──
    try {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:sohailwahab27@gmail.com?subject=${subject}&body=${body}`, "_blank");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Could not open email client. Please email sohailwahab27@gmail.com directly.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 0.9rem",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--foreground)",
    fontSize: "0.83rem",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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

        {/* Grid: bento left + form right */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}
          className="bento-contact-grid"
        >
          {/* ── Left: Bento cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>

            {/* GitHub */}
            <motion.a
              href="https://github.com/WahabSohail258"
              target="_blank" rel="noopener noreferrer"
              custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                color: "#fff", minHeight: 130,
                textDecoration: "none", display: "flex", flexDirection: "column", cursor: "pointer",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(233,30,140,0.35)" }}
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
            <motion.div
              custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              whileHover={{ scale: 1.02 }}
            >
              <ClockWidget />
            </motion.div>

            {/* Name + available */}
            <motion.div
              custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>Wahab Sohail</div>
              <div style={{ color: "var(--foreground-muted)", fontSize: "0.78rem", marginBottom: "0.5rem" }}>AI &amp; ML Engineer</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span
                  className="animate-pulse-dot"
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50", flexShrink: 0, display: "inline-block" }}
                />
                <span style={{ fontSize: "0.72rem", color: "#4caf50", fontWeight: 600 }}>Available for work</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2, color: "var(--foreground)" }}>Build.</div>
                <div className="gradient-text" style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2 }}>Ship.</div>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2, color: "var(--foreground)" }}>Iterate.</div>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              custom={4} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ fontSize: "0.65rem", color: "var(--foreground-muted)", marginBottom: "0.6rem", fontFamily: "'Fira Code', monospace" }}>
                // socials
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                {[
                  { href: "mailto:sohailwahab27@gmail.com", icon: <Mail size={16} />, color: "#ea4335", label: "Email" },
                  { href: "https://linkedin.com/in/wahab-sohail", icon: <Linkedin size={16} />, color: "#0077b5", label: "LinkedIn" },
                  { href: "https://github.com/WahabSohail258", icon: <Github size={16} />, color: "#4caf50", label: "GitHub" },
                  { href: "#contact", icon: <Send size={16} />, color: "var(--primary)", label: "Message" },
                ].map(({ href, icon, color, label }) => (
                  <a
                    key={label} href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      height: 38, borderRadius: 9,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: color, color: "#fff", textDecoration: "none",
                      transition: "opacity 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              custom={5} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bento-card"
              style={{ background: "linear-gradient(135deg, #f2c94c 0%, #f2994a 100%)", color: "#1a1a0a" }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem" }}>📁 Notes</div>
              <p style={{ fontSize: "0.75rem", lineHeight: 1.55, fontStyle: "italic" }}>
                &quot;Build things that ship in the real world. Curiosity is the engine — discipline is the fuel.&quot;
              </p>
            </motion.div>
          </div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-80px" }}
            className="card"
            style={{ padding: "1.75rem" }}
          >
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: "0.75rem",
              color: "var(--primary)", marginBottom: "1.5rem", letterSpacing: "0.05em",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <span style={{ opacity: 0.5 }}>$</span> send --message
              <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>
                {emailjsConfigured() ? "via EmailJS" : "via mailto"}
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="bc-name"
                  style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}
                >
                  // your_name
                </label>
                <input
                  id="bc-name" name="name" type="text" required
                  value={form.name} onChange={handleChange}
                  placeholder="John Doe" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-rgb),0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label
                  htmlFor="bc-email"
                  style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}
                >
                  // email_address
                </label>
                <input
                  id="bc-email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="john@example.com" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-rgb),0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label
                  htmlFor="bc-message"
                  style={{ display: "block", fontSize: "0.7rem", fontFamily: "'Fira Code', monospace", color: "var(--primary)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}
                >
                  // message
                </label>
                <textarea
                  id="bc-message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-rgb),0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: status === "sending" ? 0.75 : 1, gap: "0.5rem" }}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                    Sending...
                  </>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1rem", borderRadius: 10,
                    background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.25)",
                    color: "#4caf50", fontSize: "0.84rem", fontWeight: 500,
                  }}
                >
                  <CheckCircle size={15} />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex", flexDirection: "column", gap: "0.3rem",
                    padding: "0.75rem 1rem", borderRadius: 10,
                    background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)",
                    color: "#dc2626", fontSize: "0.82rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
                    <AlertCircle size={15} /> {errorMsg || "Something went wrong."}
                  </div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.8 }}>
                    Or email directly:{" "}
                    <a href="mailto:sohailwahab27@gmail.com" style={{ color: "#dc2626", fontWeight: 700 }}>
                      sohailwahab27@gmail.com
                    </a>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
