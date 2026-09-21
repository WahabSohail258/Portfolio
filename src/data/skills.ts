export interface SkillFile {
  name: string;
  ext: string;
  color: string;
  symbol?: string;
}

export interface SkillFolder {
  name: string;
  files: SkillFile[];
}

/**
 * Skills taxonomy mirrors the resume:
 * LLMs & Agents / Voice AI / RAG & Retrieval / ML & DL /
 * Languages / Backend & APIs / Infrastructure / Research
 */
export const skillTree: SkillFolder[] = [
  {
    name: "llms-and-agents",
    files: [
      { name: "huggingface", ext: ".py", color: "#FFD21E", symbol: "🔷" },
      { name: "peft-lora", ext: ".py", color: "#FFC107", symbol: "🔷" },
      { name: "langgraph", ext: ".py", color: "#FF6F00", symbol: "🔷" },
      { name: "langchain", ext: ".py", color: "#1C3C3C", symbol: "🔷" },
      { name: "ollama", ext: ".sh", color: "#a78bfa", symbol: "·" },
      { name: "groq", ext: ".py", color: "#F55036", symbol: "🔷" },
      { name: "prompt-engineering", ext: ".md", color: "#89dceb", symbol: "○" },
    ],
  },
  {
    name: "voice-ai",
    files: [
      { name: "coqui-tts", ext: ".py", color: "#4caf50", symbol: "🔷" },
      { name: "kaldi", ext: ".cpp", color: "#F05032", symbol: "🔷" },
      { name: "hmm-acoustic", ext: ".py", color: "#5C6BC0", symbol: "🔷" },
      { name: "urdu-asr", ext: ".py", color: "#4caf50", symbol: "🔷" },
      { name: "speech-datasets", ext: ".py", color: "#ba68c8", symbol: "·" },
      { name: "elevenlabs-data", ext: ".wav", color: "#89dceb", symbol: "○" },
    ],
  },
  {
    name: "rag-and-retrieval",
    files: [
      { name: "embeddings", ext: ".py", color: "#42A5F5", symbol: "🔷" },
      { name: "chunking", ext: ".py", color: "#66BB6A", symbol: "🔷" },
      { name: "reranking", ext: ".py", color: "#FFA726", symbol: "🔷" },
      { name: "sentence-transformers", ext: ".py", color: "#26C6DA", symbol: "🔷" },
      { name: "faiss", ext: ".py", color: "#5C6BC0", symbol: "🔷" },
      { name: "pgvector", ext: ".sql", color: "#336791", symbol: "○" },
      { name: "chromadb", ext: ".py", color: "#FF7043", symbol: "○" },
    ],
  },
  {
    name: "ml-and-deep-learning",
    files: [
      { name: "pytorch", ext: ".py", color: "#EE4C2C", symbol: "🔷" },
      { name: "tensorflow", ext: ".py", color: "#FF6F00", symbol: "🔷" },
      { name: "scikit-learn", ext: ".py", color: "#F7931E", symbol: "🔷" },
      { name: "transformers", ext: ".py", color: "#FFD21E", symbol: "🔷" },
      { name: "fine-tuning", ext: ".py", color: "#AB47BC", symbol: "🔷" },
      { name: "model-evaluation", ext: ".ipynb", color: "#F7931E", symbol: "○" },
    ],
  },
  {
    name: "languages",
    files: [
      { name: "python", ext: ".py", color: "#3776AB", symbol: "🔷" },
      { name: "cplusplus", ext: ".cpp", color: "#00599C", symbol: "🔷" },
      { name: "sql", ext: ".sql", color: "#336791", symbol: "○" },
      { name: "typescript", ext: ".ts", color: "#3178C6", symbol: "🔷" },
      { name: "shell", ext: ".sh", color: "#4EAA25", symbol: "·" },
    ],
  },
  {
    name: "backend-and-apis",
    files: [
      { name: "fastapi", ext: ".py", color: "#009688", symbol: "🔷" },
      { name: "rest-apis", ext: ".ts", color: "#61DAFB", symbol: "🔷" },
      { name: "openai-compatible", ext: ".py", color: "#412991", symbol: "🔷" },
      { name: "postgresql", ext: ".sql", color: "#336791", symbol: "○" },
      { name: "supabase", ext: ".ts", color: "#3ECF8E", symbol: "○" },
    ],
  },
  {
    name: "infrastructure",
    files: [
      { name: "docker", ext: ".sh", color: "#2496ED", symbol: "🔷" },
      { name: "linux", ext: ".sh", color: "#FCC624", symbol: "·" },
      { name: "git", ext: ".sh", color: "#F05032", symbol: "·" },
      { name: "cuda", ext: ".cu", color: "#76b900", symbol: "Σ" },
      { name: "openblas", ext: ".c", color: "#F44336", symbol: "Σ" },
      { name: "raspberry-pi", ext: ".py", color: "#C51A4A", symbol: "·" },
      { name: "vercel", ext: ".json", color: "#cdd6f4", symbol: "○" },
    ],
  },
  {
    name: "research",
    files: [
      { name: "experiment-design", ext: ".md", color: "#89dceb", symbol: "○" },
      { name: "paper-reimpl", ext: ".py", color: "#ba68c8", symbol: "🔷" },
      { name: "cross-lingual-transfer", ext: ".py", color: "#4caf50", symbol: "🔷" },
      { name: "model-eval", ext: ".ipynb", color: "#FFA726", symbol: "○" },
      { name: "tech-docs", ext: ".md", color: "#cdd6f4", symbol: "○" },
    ],
  },
];
