import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillTree } from "@/data/skills";

/**
 * Portfolio Q&A agent — retrieval over a curated knowledge base built from
 * the portfolio data files. Runs fully client-side: keyword-scored retrieval
 * with synonym expansion, composed into short conversational answers.
 * No API keys needed, works on a static deploy.
 */

interface Entry {
  /** keywords/synonyms that trigger this entry (lowercase) */
  keys: string[];
  /** short answer shown in the chat */
  answer: string;
  /** optional follow-up chips rendered under the answer */
  suggestions?: string[];
}

/* ── Compose facts from the data files ───────────────────── */
const work = experiences.filter((e) => e.type === "work");
const current = experiences.find((e) => e.endDate === "Present");
const education = experiences.find((e) => e.type === "education");
const leadership = experiences.find((e) => e.type === "leadership");
const allTech = Array.from(new Set(experiences.flatMap((e) => e.tech)));
const projectTitles = projects.map((p) => p.title);

const CONTACT = {
  email: "sohailwahab27@gmail.com",
  github: "github.com/WahabSohail258",
  linkedin: "linkedin.com/in/wahab-sohail",
};

/* ── Hand-tuned Q&A entries ──────────────────────────────── */
const ENTRIES: Entry[] = [
  {
    keys: ["who", "about", "yourself", "your self", "wahab", "sohail", "bio", "intro", "introduce", "tell me about"],
    answer:
      "Wahab Sohail — AI Engineer at Blue Group of Companies and Computer Engineering student at NUST (Class of 2026). He builds conversational AI: Urdu voice agents, LLM fine-tuning, and RAG systems — grounded, evaluated, and shipped to real users.",
    suggestions: ["What is he working on now?", "Show me his projects", "How can I contact him?"],
  },
  {
    keys: ["current", "now", "working on", "present", "these days", "currently", "job", "role now"],
    answer: current
      ? `Right now he's an ${current.role} at ${current.company}, where ${current.highlight.toLowerCase()}. Recently: fine-tuned domain LLMs with PEFT/LoRA on English & Roman Urdu, and shipped RAG pipelines for grounded Urdu responses.`
      : "",
    suggestions: ["What tech does he use?", "Tell me about his projects"],
  },
  {
    keys: ["experience", "work", "career", "jobs", "internship", "internships", "employment", "history"],
    answer: work
      .map((w) => `• ${w.role} @ ${w.company} (${w.startDate} – ${w.endDate}): ${w.highlight}`)
      .join("\n"),
    suggestions: ["Where does he work now?", "What are his skills?"],
  },
  {
    keys: ["education", "study", "studied", "university", "college", "nust", "degree", "school", "cgpa", "gpa"],
    answer: education
      ? `${education.role} at ${education.company} (${education.startDate} – ${education.endDate}), Islamabad. Coursework focused on LLMs, Deep Learning, Computer Vision and DSP. His final year project is SpeakWell — phoneme-level Urdu speech recognition running on a Raspberry Pi 5.`
      : "",
    suggestions: ["What is SpeakWell?", "What skills did he learn?"],
  },
  {
    keys: ["skill", "skills", "stack", "tech", "technologies", "tools", "languages", "programming", "knows", "proficient"],
    answer:
      `Core stack: ${allTech.slice(0, 8).join(", ")}. Deeper toolkit: LangGraph, LangChain, FAISS, pgvector, sentence-transformers, FastAPI, Docker, CUDA — plus Python, C++, TypeScript and SQL. ${skillTree.length} domains in total, from LLM fine-tuning to edge deployment.`,
    suggestions: ["What is his strongest area?", "Show me his projects"],
  },
  {
    keys: ["project", "projects", "built", "portfolio work", "showcase"],
    answer:
      `He's built ${projects.length} featured projects — highlights: ${projectTitles.slice(0, 3).join(", ")}. Each card in the Projects section opens a full breakdown with problem, solution and impact.`,
    suggestions: ["What is the Urdu voice agent?", "What is OrgMind?", "What is SpeakWell?"],
  },
  {
    keys: ["urdu", "voice", "agent", "tts", "speech", "asr", "blue group", "voice agent"],
    answer:
      "The Urdu Conversational Voice Agent is his production work at Blue Group: local LLM response generation (Ollama), Urdu TTS with Coqui adapted on ElevenLabs audio, and STT integration in progress — all grounded through RAG pipelines. It's one of the few production Urdu voice systems out there.",
    suggestions: ["What is SpeakWell?", "What about RAG?"],
  },
  {
    keys: ["speakwell", "fyp", "final year", "thesis", "phoneme"],
    answer:
      "SpeakWell is his final year project: phoneme-level Urdu ASR for speech rehabilitation, built with Kaldi and cross-lingual transfer learning (English + Persian acoustic models), deployed real-time on Raspberry Pi 5 with a Kivy feedback UI. The full thesis PDF is linked on the project card.",
    suggestions: ["Show me his projects", "What about the voice agent?"],
  },
  {
    keys: ["orgmind", "agent research", "multi-agent", "multi agent", "research agent"],
    answer:
      "OrgMind is a multi-agent research & QA system: LangGraph workflows plan research over web data, sentence-transformer embeddings + pgvector retrieve context, and every answer is grounded via a complete RAG pipeline. FastAPI backend, Next.js frontend, live on Vercel.",
    suggestions: ["What other agents has he built?", "Show me his projects"],
  },
  {
    keys: ["contact", "email", "reach", "hire", "available", "availability", "freelance", "message", "touch"],
    answer: `He's available for work. Email: ${CONTACT.email} · GitHub: ${CONTACT.github} · LinkedIn: ${CONTACT.linkedin}. Or use the contact form at the bottom of the page — it opens straight in your mail client.`,
    suggestions: ["What is his experience?", "What are his skills?"],
  },
  {
    keys: ["rag", "retrieval", "embeddings", "vector", "grounded"],
    answer:
      "RAG is his daily driver: he's built pipelines with FAISS, pgvector and sentence-transformers behind FastAPI — chunking, embedding, retrieval and reranking — used to ground Urdu responses at Blue Group and in the OrgMind and ticket-resolution agents.",
    suggestions: ["Tell me about his agents", "What is his experience?"],
  },
  {
    keys: ["llm", "llms", "fine-tuning", "finetune", "fine tune", "lora", "peft", "hugging face", "transformers"],
    answer:
      "He fine-tunes domain LLMs with Hugging Face Transformers + PEFT/LoRA on English and Roman Urdu conversations, evaluates outputs for factual consistency and domain adherence, and serves models locally through Ollama's OpenAI-compatible API.",
    suggestions: ["What is he working on now?", "What about RAG?"],
  },
  {
    keys: ["leadership", "comppec", "president", "lead", "leading", "team", "management", "event"],
    answer: leadership
      ? `${leadership.role} of ${leadership.company} (${leadership.startDate} – ${leadership.endDate}): ${leadership.highlight.toLowerCase()} — coordinating teams, sponsorships and budget.`
      : "",
    suggestions: ["What is his education?", "How can I contact him?"],
  },
  {
    keys: ["where", "location", "based", "live", "from", "country", "pakistan"],
    answer: "He's based in Islamabad, Pakistan (currently working in Rawalpindi) — open to remote work and collaborations worldwide.",
    suggestions: ["How can I contact him?", "Is he available for work?"],
  },
  {
    keys: ["resume", "cv", "download"],
    answer: "His resume is available for download — hit the Resume button in the navbar or the hero section.",
    suggestions: ["How can I contact him?", "What is his experience?"],
  },
  {
    keys: ["strength", "strong", "best", "expertise", "specialist", "specialize", "focus"],
    answer:
      "His strongest area is the intersection of voice + LLMs: production Urdu conversational AI, speech pipeline engineering (TTS/ASR), and retrieval-grounded agent systems. Comfortable anywhere from fine-tuning to edge deployment on Raspberry Pi.",
    suggestions: ["Show me his projects", "What tech does he use?"],
  },
  {
    keys: ["hello", "hi", "hey", "yo", "salam", "assalam", "greetings"],
    answer:
      "Hey! I'm Wahab's portfolio assistant. Ask me about his experience, projects, skills, or how to get in touch.",
    suggestions: ["What is he working on now?", "Show me his projects", "How can I contact him?"],
  },
  {
    keys: ["thank", "thanks", "cool", "awesome", "nice", "great"],
    answer: "Glad it helps! If you'd like to work with Wahab, the contact form below is the fastest way to reach him.",
    suggestions: ["How can I contact him?"],
  },
];

/* ── Retrieval ───────────────────────────────────────────── */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/** Expand common synonyms so phrasing variants still hit the right entry. */
const SYNONYMS: Record<string, string[]> = {
  cv: ["resume"],
  hire: ["contact", "available"],
  email: ["contact"],
  gpa: ["cgpa", "education"],
  uni: ["university", "education"],
  college: ["university", "education"],
  voicebot: ["voice", "agent"],
  chatbot: ["agent", "llm"],
  finetuning: ["fine-tuning", "lora"],
  finetune: ["fine-tuning", "lora"],
  "fine-tune": ["fine-tuning", "lora"],
  rag: ["retrieval"],
  talks: ["speech"],
  urdu: ["voice", "urdu"],
  "tell me about": ["about"],
  "what is he": ["about"],
  "who is": ["about"],
  "working on": ["current"],
};

export interface AgentReply {
  answer: string;
  suggestions: string[];
}

export function askAgent(question: string): AgentReply {
  const q = normalize(question);
  if (!q) {
    return { answer: "Ask me anything about Wahab — experience, projects, skills, or contact.", suggestions: ["What is he working on now?", "Show me his projects"] };
  }

  const tokens = q.split(" ");
  const expanded = new Set<string>([q, ...tokens]);
  for (const [from, tos] of Object.entries(SYNONYMS)) {
    if (q.includes(from)) tos.forEach((t) => expanded.add(t));
  }
  const variants = Array.from(expanded);

  // Score each entry: exact substring hits on the full query weigh most,
  // then individual token/synonym matches.
  let best: { entry: Entry; score: number } | null = null;
  for (const entry of ENTRIES) {
    let score = 0;
    for (const key of entry.keys) {
      if (q.includes(key)) score += key.includes(" ") ? 4 : 2;
      for (const t of variants) {
        if (t === key || (t.length > 3 && key.startsWith(t))) score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }

  if (best && best.score >= 2) {
    return {
      answer: best.entry.answer ||
        "That one's better answered by Wahab himself — reach him at " + CONTACT.email + ".",
      suggestions: best.entry.suggestions ?? ["Show me his projects", "How can I contact him?"],
    };
  }

  // Fallback: fuzzy project-title match
  const hit = projects.find((p) => {
    const words = normalize(p.title).split(" ").filter((w) => w.length > 3);
    return words.some((w) => q.includes(w));
  });
  if (hit) {
    return {
      answer: `${hit.title} — ${hit.description}`,
      suggestions: ["Show me his projects", "How can I contact him?"],
    };
  }

  return {
    answer: "I don't have a confident answer for that one — but Wahab would! Reach him at " + CONTACT.email + ", or try one of the suggestions below.",
    suggestions: ["What is he working on now?", "Show me his projects", "How can I contact him?"],
  };
}

/** Opening message shown when the chat is first opened. */
export const AGENT_GREETING: AgentReply = {
  answer:
    "Hi! I'm Wahab's portfolio assistant — ask me anything about his experience, projects, skills, or how to reach him.",
  suggestions: ["What is he working on now?", "Show me his projects", "What are his skills?", "How can I contact him?"],
};
