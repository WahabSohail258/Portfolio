"use client";
import { motion } from "framer-motion";
import { skillTree } from "@/data/skills";
const names: Record<string, string> = {
  "llms-and-agents": "LLMs & agents",
  "voice-ai": "Voice & speech",
  "rag-and-retrieval": "RAG & retrieval",
  "ml-and-deep-learning": "Machine learning",
  languages: "Languages",
  "backend-and-apis": "Backend & APIs",
  infrastructure: "Infrastructure",
  research: "Research & evaluation",
};
const tools: Record<string, string> = {
  huggingface: "Hugging Face",
  "peft-lora": "PEFT / LoRA",
  langgraph: "LangGraph",
  langchain: "LangChain",
  ollama: "Ollama",
  groq: "Groq",
  "coqui-tts": "Coqui TTS",
  "urdu-asr": "Urdu ASR",
  "hmm-acoustic": "Acoustic models",
  cplusplus: "C++",
  pytorch: "PyTorch",
  tensorflow: "TensorFlow",
  fastapi: "FastAPI",
  "scikit-learn": "Scikit-learn",
  pgvector: "pgvector",
  faiss: "FAISS",
  chromadb: "ChromaDB",
  postgresql: "PostgreSQL",
  typescript: "TypeScript",
  cuda: "CUDA",
  openblas: "OpenBLAS",
  "rest-apis": "REST APIs",
  "paper-reimpl": "Paper reimplementation",
  "model-eval": "Model evaluation",
  "tech-docs": "Technical writing",
  "elevenlabs-data": "ElevenLabs audio data",
};
function label(name: string) {
  return (
    tools[name] ||
    name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <div className="work-heading">
          <div>
            <span className="section-tag">03 / THE TOOLKIT</span>
            <h2 className="section-title">
              The right tools.
              <br />
              <span className="gradient-text">For the right problem.</span>
            </h2>
          </div>
          <p>
            A practical toolkit spanning model development, speech, retrieval,
            and the software that brings it all together.
          </p>
        </div>
        <div className="toolkit-grid">
          {skillTree.map((folder, i) => (
            <motion.article
              key={folder.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
            >
              <span className="toolkit-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{names[folder.name]}</h3>
              <div>
                {folder.files.map((f) => (
                  <span key={f.name}>{label(f.name)}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
