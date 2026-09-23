"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { askAgent, AGENT_GREETING, AgentReply } from "@/data/agent-kb";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Msg {
  role: "user" | "agent";
  text: string;
  suggestions?: string[];
}

/** Types out agent text char-by-char for a natural, responsive feel. */
function TypedText({ text, onTick }: { text: string; onTick?: () => void }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 90)); // ~90 frames total
    const t = setInterval(() => {
      i += step;
      setShown(text.slice(0, i));
      onTick?.();
      if (i >= text.length) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <>{shown}<span className="terminal-caret" style={{ width: 6, height: "0.9em" }} /></>;
}

export function AgentWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "agent", text: AGENT_GREETING.answer, suggestions: AGENT_GREETING.suggestions },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTopicRef = useRef<string | undefined>(undefined);

  // Autoscroll while messages arrive or text streams in
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  // Focus input when opened; ESC to close
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setTyping(true);
    // Small "thinking" beat keeps the interaction from feeling like an if-statement
    setTimeout(() => {
      const reply: AgentReply = askAgent(text, lastTopicRef.current);
      if (reply.topicId) lastTopicRef.current = reply.topicId;
      setTyping(false);
      setMsgs((m) => [...m, { role: "agent", text: reply.answer, suggestions: reply.suggestions }]);
    }, 550);
  };

  return (
    <>
      {/* Launcher FAB */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open portfolio assistant"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 60,
          width: 52,
          height: 52,
          borderRadius: 16,
          border: "1px solid rgba(var(--primary-rgb), 0.35)",
          background: "var(--card)",
          color: "var(--primary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 28px rgba(var(--primary-rgb), 0.25)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "bot"}
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ display: "flex" }}
          >
            {open ? <X size={20} /> : <Bot size={22} />}
          </motion.span>
        </AnimatePresence>
        {/* Presence dot */}
        {!open && (
          <span
            className="animate-pulse-dot"
            style={{
              position: "absolute", top: 8, right: 8, width: 9, height: 9,
              borderRadius: "50%", background: "var(--green)", border: "2px solid var(--card)",
            }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease: EASE }}
            role="dialog"
            aria-label="Portfolio assistant"
            style={{
              position: "fixed",
              bottom: "5.4rem",
              left: "1.5rem",
              zIndex: 60,
              width: "min(370px, calc(100vw - 2rem))",
              height: "min(520px, calc(100vh - 8rem))",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              borderRadius: 18,
              boxShadow: "var(--shadow-lg), 0 24px 64px rgba(0,0,0,0.3)",
              transformOrigin: "bottom left",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1rem",
                borderBottom: "1px solid var(--card-border)",
                background: "var(--surface)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "var(--primary-muted)",
                  border: "1px solid rgba(var(--primary-rgb), 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                }}
              >
                <Bot size={17} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>
                  Portfolio Assistant
                </div>
                <div style={{ fontSize: "0.66rem", color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                  Ask me about Wahab
                </div>
              </div>
              <Sparkles size={14} style={{ color: "var(--primary)", opacity: 0.6 }} />
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.45rem", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{
                      maxWidth: "88%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: m.role === "user" ? "var(--primary)" : "var(--surface)",
                      border: m.role === "user" ? "none" : "1px solid var(--card-border)",
                      color: m.role === "user" ? "#fff" : "var(--foreground)",
                      fontSize: "0.82rem",
                      lineHeight: 1.55,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.role === "agent" && i === msgs.length - 1 ? (
                      <TypedText text={m.text} onTick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })} />
                    ) : (
                      m.text
                    )}
                  </motion.div>

                  {/* Suggestion chips on the latest agent message */}
                  {m.role === "agent" && i === msgs.length - 1 && m.suggestions && !typing && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", maxWidth: "95%" }}>
                      {m.suggestions.map((s) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.4, ease: EASE }}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => send(s)}
                          style={{
                            padding: "0.32rem 0.7rem",
                            borderRadius: 999,
                            border: "1px solid rgba(var(--primary-rgb), 0.35)",
                            background: "rgba(var(--primary-rgb), 0.06)",
                            color: "var(--primary)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            fontFamily: "Poppins, sans-serif",
                            cursor: "pointer",
                          }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: "flex-start",
                    display: "flex",
                    gap: 4,
                    padding: "0.7rem 0.9rem",
                    borderRadius: "14px 14px 14px 4px",
                    background: "var(--surface)",
                    border: "1px solid var(--card-border)",
                  }}
                  aria-label="Assistant is typing"
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="animate-pulse-dot"
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", animationDelay: `${d * 0.18}s` }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              style={{
                display: "flex",
                gap: "0.5rem",
                padding: "0.75rem",
                borderTop: "1px solid var(--card-border)",
                flexShrink: 0,
                background: "var(--surface)",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects…"
                aria-label="Ask the portfolio assistant"
                style={{
                  flex: 1,
                  padding: "0.55rem 0.85rem",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--input-bg)",
                  color: "var(--foreground)",
                  fontSize: "0.82rem",
                  fontFamily: "Poppins, sans-serif",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-rgb), 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "none",
                  background: "var(--primary)",
                  color: "#fff",
                  cursor: input.trim() && !typing ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: input.trim() && !typing ? 1 : 0.5,
                  transition: "opacity 0.2s ease",
                }}
              >
                <Send size={15} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint bubble on first load */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ delay: 2, duration: 0.4, ease: EASE }}
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              bottom: "2.6rem",
              left: "4.7rem",
              zIndex: 59,
              padding: "0.45rem 0.8rem",
              borderRadius: "12px 12px 12px 4px",
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              color: "var(--foreground)",
              fontSize: "0.74rem",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              boxShadow: "var(--shadow)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <MessageCircle size={12} style={{ color: "var(--primary)" }} />
            Ask my AI about me
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
