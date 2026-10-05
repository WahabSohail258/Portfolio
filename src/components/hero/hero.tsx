"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, AudioWaveform, Download } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="studio-hero">
      <div className="section-container hero-layout">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">
            <span /> WAHAB SOHAIL · AI ENGINEER
          </p>
          <h1 className="studio-heading">
            Intelligence.
            <br />
            With a <em>human</em>
            <br />
            connection.
          </h1>
          <p className="hero-intro">
            I build AI that listens, understands, and gets things done. From
            Urdu voice systems to grounded agents — taking ideas from research
            to real products.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">
              Explore my work <ArrowUpRight size={18} />
            </a>
            <a className="hero-resume" href="/Wahab_Resume.pdf" download>
              <Download size={16} /> Download résumé
            </a>
          </div>
          <div className="hero-meta">
            <span>Based in Pakistan</span>
            <span>Voice AI / LLMs / Applied ML</span>
          </div>
        </motion.div>
        <motion.div
          className="voice-feature"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="voice-photo" />
          <div className="voice-topline">
            <span className="voice-chip">
              <AudioWaveform size={15} /> VOICE × INTELLIGENCE
            </span>
            <span className="voice-index">01 / 03</span>
          </div>
          <div className="voice-content">
            <span className="voice-caption">
              A FOCUS ON LOW-RESOURCE LANGUAGES
            </span>
            <p>
              Making technology
              <br />
              speak your language.
            </p>
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 36 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    height: `${12 + ((i * 17) % 43)}px`,
                    animationDelay: `${i * 0.075}s`,
                  }}
                />
              ))}
            </div>
            <div className="voice-footer">
              <span>Urdu voice systems</span>
              <a href="#projects" aria-label="Explore voice AI projects">
                <ArrowUpRight size={22} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="section-container hero-bottom">
        <a href="#projects">
          <ArrowDown size={15} /> Scroll to explore
        </a>
        <span>RESEARCH → ENGINEERING → IMPACT</span>
      </div>
    </section>
  );
}
