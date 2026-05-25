"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/WahabSohail258", color: "#ffffff" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/wahab-sohail", color: "#0077b5" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "#1da1f2" },
  { icon: Mail, label: "Email", href: "mailto:sohailwahab27@gmail.com", color: "#3b82f6" },
];

interface FormField {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full px-4 pt-6 pb-2 rounded-xl glass border border-white/[0.08] bg-transparent text-white text-sm outline-none transition-all duration-300 peer focus:border-electric-500/50 focus:shadow-glow-sm"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          focused || hasValue
            ? "top-2 text-[10px] text-electric-400 font-medium tracking-wider uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-white/30"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={5}
        className="w-full px-4 pt-8 pb-3 rounded-xl glass border border-white/[0.08] bg-transparent text-white text-sm outline-none transition-all duration-300 resize-none focus:border-electric-500/50 focus:shadow-glow-sm"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          focused || hasValue
            ? "top-2 text-[10px] text-electric-400 font-medium tracking-wider uppercase"
            : "top-4 text-sm text-white/30"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState<FormField>({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (field: keyof FormField) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // EmailJS integration — fill in your keys in .env.local
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Demo mode — simulate success
        await new Promise((r) => setTimeout(r, 1200));
        toast.success("Message sent! I'll get back to you soon 🚀", {
          description: "This is a demo — set up your EmailJS keys to enable real sending.",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        return;
      }

      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        publicKey
      );

      toast.success("Message sent successfully! 🚀", {
        description: "I'll get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again or reach out via email directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] translate-x-1/3 translate-y-1/3 bg-electric-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="text-center mb-16">
          <p className="text-electric-400 text-sm font-medium tracking-widest uppercase mb-3">Get in touch</p>
          <h2 className="section-heading">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-electric mx-auto mt-4" />
          <p className="text-white/40 mt-4 max-w-md mx-auto text-sm">
            Have a project in mind, an opportunity to discuss, or just want to connect?
            I&apos;d love to hear from you.
          </p>
        </SectionWrapper>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <SectionWrapper direction="left" className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-6 border border-white/[0.06] space-y-5">
              {[
                { icon: Mail, label: "Email", value: "sohailwahab27@gmail.com", href: "mailto:sohailwahab27@gmail.com" },
                { icon: MapPin, label: "Location", value: "Rawalpindi, Pakistan", href: null },
                { icon: Clock, label: "Availability", value: "Open to opportunities", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass-electric border border-electric-500/20 flex items-center justify-center text-electric-400 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-electric-400 transition-colors duration-200">{value}</a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`social-${label.toLowerCase()}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl glass border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:border-white/20"
                    aria-label={label}
                    style={{ "--hover-color": color } as React.CSSProperties}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Form */}
          <SectionWrapper direction="right" delay={0.2} className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/[0.06] space-y-4" id="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput id="contact-name" label="Your Name" value={form.name} onChange={updateField("name")} required />
                <FloatingInput id="contact-email" label="Email Address" type="email" value={form.email} onChange={updateField("email")} required />
              </div>
              <FloatingInput id="contact-subject" label="Subject" value={form.subject} onChange={updateField("subject")} required />
              <FloatingTextarea id="contact-message" label="Your Message" value={form.message} onChange={updateField("message")} required />

              <motion.button
                type="submit"
                id="contact-submit"
                disabled={sending}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary text-white flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
