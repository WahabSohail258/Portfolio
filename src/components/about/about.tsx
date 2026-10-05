"use client";
import { motion } from "framer-motion";
import { AudioWaveform, BrainCircuit, Cpu, ArrowUpRight } from "lucide-react";
const focus = [
  {
    icon: AudioWaveform,
    title: "AI that listens",
    text: "Urdu speech recognition, conversational voice pipelines, and text-to-speech for more accessible interactions.",
  },
  {
    icon: BrainCircuit,
    title: "Answers with context",
    text: "Retrieval, fine-tuning, and agent workflows that connect language models to useful, grounded information.",
  },
  {
    icon: Cpu,
    title: "Built for the real world",
    text: "From FastAPI backends and Next.js interfaces to deploying speech models on a Raspberry Pi 5.",
  },
];
export function About() {
  return (
    <section id="about" className="section-padding about-studio">
      <div className="section-container">
        <motion.div
          className="about-layout"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="section-tag">02 / THE PERSON BEHIND THE CODE</span>
            <h2 className="section-title">
              Curious by nature.
              <br />
              <span className="gradient-text">Engineer by practice.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              I’m Wahab, an AI engineer working at the intersection of language,
              speech, and software. At Blue Group of Companies, I’m developing
              Urdu conversational AI with local language models, fine-tuned TTS,
              and retrieval pipelines.
            </p>
            <p>
              My computer engineering background at NUST shapes how I build:
              understand the problem, test the idea, and make it work beyond the
              notebook.
            </p>
            <a href="#experience">
              Explore my journey <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
        <div className="focus-grid">
          {focus.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Icon size={25} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
