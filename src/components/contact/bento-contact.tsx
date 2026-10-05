"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Send,
  Loader2,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import emailjs from "@emailjs/browser";
const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const configured = Boolean(
  service &&
  template &&
  publicKey &&
  ![service, template, publicKey].some((v) => /placeholder/i.test(v)),
);
export function BentoContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "draft" | "error"
  >("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    if (configured) {
      try {
        await emailjs.send(
          service,
          template,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          publicKey,
        );
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        return;
      } catch {
        setStatus("error");
        return;
      }
    }
    const subject = encodeURIComponent("Portfolio enquiry from " + form.name);
    const body = encodeURIComponent(
      "Name: " + form.name + "\nEmail: " + form.email + "\n\n" + form.message,
    );
    window.location.href =
      "mailto:sohailwahab27@gmail.com?subject=" + subject + "&body=" + body;
    setStatus("draft");
  }
  return (
    <section id="contact" className="section-padding contact-studio">
      <div className="section-container contact-layout">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">05 / LET’S TALK</span>
          <h2 className="section-title">
            Have something
            <br />
            <span className="gradient-text">in mind?</span>
          </h2>
          <p className="contact-intro">
            An interesting problem, a collaboration, or your next AI project.
            I’d love to hear about it.
          </p>
          <a className="contact-email" href="mailto:sohailwahab27@gmail.com">
            sohailwahab27@gmail.com <ArrowUpRight size={20} />
          </a>
          <div className="contact-socials">
            {[
              {
                href: "https://github.com/WahabSohail258",
                icon: Github,
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/wahab-sohail",
                icon: Linkedin,
                label: "LinkedIn",
              },
              {
                href: "mailto:sohailwahab27@gmail.com",
                icon: Mail,
                label: "Email",
              },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={16} />
                {label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
          <div className="contact-location">
            <span /> Pakistan · UTC +05:00
          </div>
        </motion.div>
        <form className="contact-form" onSubmit={submit}>
          <h3>Start a conversation</h3>
          <div className="form-row">
            <label htmlFor="contact-name">
              Your name
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setStatus("idle");
                }}
                placeholder="Your name"
              />
            </label>
            <label htmlFor="contact-email">
              Email address
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setStatus("idle");
                }}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label htmlFor="contact-message">
            What are you thinking?
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                setStatus("idle");
              }}
              placeholder="Tell me about your idea or opportunity…"
            />
          </label>
          <button
            className="btn-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}{" "}
            {status === "sending"
              ? "Sending…"
              : configured
                ? "Send message"
                : "Compose email"}
          </button>
          <p className="form-note" role="status">
            {status === "sent"
              ? "Message sent. Thanks for reaching out!"
              : status === "draft"
                ? "Your email draft is ready. Send it from your email app to finish."
                : status === "error"
                  ? "Couldn’t send the message. Please use the email link to contact me directly."
                  : configured
                    ? "Your message goes straight to my inbox."
                    : "Opens your email app with a prepared draft."}
          </p>
        </form>
      </div>
    </section>
  );
}
