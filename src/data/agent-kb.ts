import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillTree } from "@/data/skills";

/**
 * Portfolio Q&A agent — a lightweight reasoning layer over the portfolio data.
 * Runs fully client-side. Capabilities beyond naive keyword matching:
 *
 *  1. Conversation memory — follow-ups ("tell me more", "what else") resolve
 *     against the previous topic and return a deeper answer.
 *  2. Question intents — counts ("how many projects"), durations ("how long"),
 *     yes/no skill probes ("does he know docker?"), tech lookups ("what does
 *     orgmind use"), and projects-by-tech ("which projects use RAG").
 *  3. Typo-tolerant fuzzy matching (Levenshtein) as a second scoring pass.
 *  4. Answer blending — multi-topic questions ("skills and projects") compose
 *     both answers instead of picking one.
 *  5. Smart fallback — offers the closest matching topics as chips.
 *
 * No API keys needed; works on a static deploy.
 */

/* ── Facts from the data files ───────────────────────────── */
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

/* ── Topics ──────────────────────────────────────────────── */
interface Topic {
  id: string;
  /** phrases/keywords that trigger this topic (lowercase; multiword = stronger) */
  keys: string[];
  /** chips rendered under the answer, phrased as questions */
  prompt: string;
  /** primary answer */
  answer: string;
  /** deeper answer for follow-ups ("tell me more") */
  followUp: string;
  /** cross-link chips shown under the answer */
  suggestions?: string[];
}

const TOPICS: Topic[] = [
  {
    id: "about",
    keys: ["who", "about", "yourself", "your self", "wahab", "sohail", "bio", "intro", "introduce", "summary"],
    prompt: "Tell me about Wahab",
    answer:
      "Wahab Sohail — AI Engineer at Blue Group of Companies and Computer Engineering student at NUST (Class of 2026). He builds conversational AI: Urdu voice agents, LLM fine-tuning, and RAG systems — grounded, evaluated, and shipped to real users.",
    followUp:
      "A bit more: he started with edge AI and computer vision (NCRA, Raspberry Pi & Jetson Nano), moved through deep-learning research for healthcare (RISETech), and now specializes in production conversational AI — the full stack from fine-tuning to TTS to retrieval. He also led COMPPEC, NUST's flagship computing society, as President.",
    suggestions: ["What is he working on now?", "Show me his projects", "How can I contact him?"],
  },
  {
    id: "current",
    keys: ["current", "now", "working on", "present", "these days", "currently", "job", "role", "blue group", "employer"],
    prompt: "What is he working on now?",
    answer: current
      ? `Right now he's an ${current.role} at ${current.company}, where ${current.highlight.toLowerCase()}. Recently: fine-tuned domain LLMs with PEFT/LoRA on English & Roman Urdu, and shipped RAG pipelines for grounded Urdu responses.`
      : "",
    followUp: current
      ? `Deeper on the current role at ${current.company}:\n${current.description.map((d) => `• ${d}`).join("\n")}`
      : "",
    suggestions: ["What tech does he use?", "Tell me about his projects"],
  },
  {
    id: "experience",
    keys: ["experience", "work", "career", "jobs", "internship", "internships", "employment", "history", "worked"],
    prompt: "What's his experience?",
    answer: work
      .map((w) => `• ${w.role} @ ${w.company} (${w.startDate} – ${w.endDate}): ${w.highlight}`)
      .join("\n"),
    followUp: work
      .map((w) => `${w.role} @ ${w.company}:\n${w.description.map((d) => `  • ${d}`).join("\n")}`)
      .join("\n\n"),
    suggestions: ["Where does he work now?", "What are his skills?"],
  },
  {
    id: "education",
    keys: ["education", "study", "studied", "university", "college", "nust", "degree", "school", "cgpa", "gpa", "graduate", "graduation", "bachelor", "b.e"],
    prompt: "What's his education?",
    answer: education
      ? `${education.role} at ${education.company} (${education.startDate} – ${education.endDate}), Islamabad. Coursework focused on LLMs, Deep Learning, Computer Vision and DSP. His final year project is SpeakWell — phoneme-level Urdu speech recognition running on a Raspberry Pi 5.`
      : "",
    followUp: education
      ? `More on the degree:\n${education.description.map((d) => `• ${d}`).join("\n")}`
      : "",
    suggestions: ["What is SpeakWell?", "What skills did he learn?"],
  },
  {
    id: "skills",
    keys: ["skill", "skills", "stack", "tech", "technologies", "tools", "languages", "programming", "proficient", "toolkit"],
    prompt: "What are his skills?",
    answer:
      `Core stack: ${allTech.slice(0, 8).join(", ")}. Deeper toolkit: LangGraph, LangChain, FAISS, pgvector, sentence-transformers, FastAPI, Docker, CUDA — plus Python, C++, TypeScript and SQL. ${skillTree.length} domains in total, from LLM fine-tuning to edge deployment.`,
    followUp:
      "Full toolbox by domain:\n" +
      skillTree
        .map((f) => `• ${f.name.replace(/-/g, " ")}: ${f.files.map((file) => file.name).slice(0, 4).join(", ")}${f.files.length > 4 ? "…" : ""}`)
        .join("\n"),
    suggestions: ["Does he know Docker?", "What is his strongest area?"],
  },
  {
    id: "projects",
    keys: ["project", "projects", "built", "portfolio work", "showcase", "repo", "repos"],
    prompt: "Show me his projects",
    answer:
      `He's built ${projects.length} featured projects — highlights: ${projectTitles.slice(0, 3).join(", ")}. Each card in the Projects section opens a full breakdown with problem, solution and impact.`,
    followUp:
      "All of them, in brief:\n" +
      projects.map((p) => `• ${p.title} — ${p.description.split("—")[0].trim()}`).join("\n"),
    suggestions: ["What is the Urdu voice agent?", "What is OrgMind?", "What is SpeakWell?"],
  },
  {
    id: "voice-agent",
    keys: ["urdu voice", "voice agent", "voice ai", "tts", "speech", "asr", "text to speech", "conversational agent", "coqui", "elevenlabs"],
    prompt: "What is the Urdu voice agent?",
    answer:
      "The Urdu Conversational Voice Agent is his production work at Blue Group: local LLM response generation (Ollama), Urdu TTS with Coqui adapted on ElevenLabs audio, and STT integration in progress — all grounded through RAG pipelines. It's one of the few production Urdu voice systems out there.",
    followUp: current
      ? `Under the hood:\n${current.description.map((d) => `• ${d}`).join("\n")}`
      : "",
    suggestions: ["What is SpeakWell?", "What about RAG?"],
  },
  {
    id: "speakwell",
    keys: ["speakwell", "fyp", "final year", "thesis", "phoneme", "kaldi", "speech rehabilitation"],
    prompt: "What is SpeakWell?",
    answer:
      "SpeakWell is his final year project: phoneme-level Urdu ASR for speech rehabilitation, built with Kaldi and cross-lingual transfer learning (English + Persian acoustic models), deployed real-time on Raspberry Pi 5 with a Kivy feedback UI. The full thesis PDF is linked on the project card.",
    followUp:
      "Why it's hard: standard ASR works at the word level, which is useless for pronunciation feedback — SpeakWell targets individual phonemes. Urdu has almost no annotated pediatric speech data, so he reimplemented cross-lingual transfer learning from English and Persian acoustic models, then ran controlled experiments across training-data regimes — all on a Raspberry Pi 5.",
    suggestions: ["Show me his projects", "What about the voice agent?"],
  },
  {
    id: "orgmind",
    keys: ["orgmind", "agent research", "multi-agent", "multi agent", "research agent", "company research"],
    prompt: "What is OrgMind?",
    answer:
      "OrgMind is a multi-agent research & QA system: LangGraph workflows plan research over web data, sentence-transformer embeddings + pgvector retrieve context, and every answer is grounded via a complete RAG pipeline. FastAPI backend, Next.js frontend, live on Vercel.",
    followUp:
      "The problem it solves: researching a company manually means hours across Google, news sites, LinkedIn and pricing pages — and single-shot LLM lookups hallucinate. OrgMind plans its own research strategy and grounds every claim in retrieved sources.",
    suggestions: ["What other agents has he built?", "Show me his projects"],
  },
  {
    id: "contact",
    keys: ["contact", "email", "reach", "hire", "available", "availability", "freelance", "message", "touch", "recruit"],
    prompt: "How can I contact him?",
    answer: `He's available for work. Email: ${CONTACT.email} · GitHub: ${CONTACT.github} · LinkedIn: ${CONTACT.linkedin}. Or use the contact form at the bottom of the page — it opens straight in your mail client.`,
    followUp:
      "Fastest routes: email for anything formal, LinkedIn for networking, GitHub to see his code. The contact form at the bottom of this page pre-fills a mailto for you.",
    suggestions: ["What is his experience?", "What are his skills?"],
  },
  {
    id: "rag",
    keys: ["rag", "retrieval", "embeddings", "vector", "grounded", "grounding", "faiss", "pgvector", "chroma"],
    prompt: "What about RAG?",
    answer:
      "RAG is his daily driver: he's built pipelines with FAISS, pgvector and sentence-transformers behind FastAPI — chunking, embedding, retrieval and reranking — used to ground Urdu responses at Blue Group and in the OrgMind and ticket-resolution agents.",
    followUp:
      "Where it's actually deployed: grounding the Urdu voice agent's responses at Blue Group, OrgMind's research QA over web data, and the support-ticket resolution agent's answers over documentation. Embeddings run locally through Ollama's OpenAI-compatible API.",
    suggestions: ["Tell me about his agents", "What is his experience?"],
  },
  {
    id: "llm",
    keys: ["llm", "llms", "fine-tuning", "finetune", "fine tune", "lora", "peft", "hugging face", "transformers", "ollama", "prompt engineering"],
    prompt: "What about his LLM work?",
    answer:
      "He fine-tunes domain LLMs with Hugging Face Transformers + PEFT/LoRA on English and Roman Urdu conversations, evaluates outputs for factual consistency and domain adherence, and serves models locally through Ollama's OpenAI-compatible API.",
    followUp:
      "The fine-tuning loop in practice: curate English + Roman Urdu conversation data, train with PEFT/LoRA adapters (cheap, local), then evaluate — not just loss curves, but factual consistency, directness and domain adherence of generated outputs. Serving is fully local via Ollama, no external API dependency.",
    suggestions: ["What is he working on now?", "What about RAG?"],
  },
  {
    id: "leadership",
    keys: ["leadership", "comppec", "president", "lead", "leading", "team", "management", "event", "society"],
    prompt: "Tell me about his leadership",
    answer: leadership
      ? `${leadership.role} of ${leadership.company} (${leadership.startDate} – ${leadership.endDate}): ${leadership.highlight.toLowerCase()} — coordinating teams, sponsorships and budget.`
      : "",
    followUp: leadership
      ? `As ${leadership.role}:\n${leadership.description.map((d) => `• ${d}`).join("\n")}`
      : "",
    suggestions: ["What is his education?", "How can I contact him?"],
  },
  {
    id: "location",
    keys: ["where", "location", "based", "live", "from", "country", "pakistan", "islamabad", "rawalpindi", "remote"],
    prompt: "Where is he based?",
    answer: "He's based in Islamabad, Pakistan (currently working in Rawalpindi) — open to remote work and collaborations worldwide.",
    followUp:
      "Timezone is PKT (UTC+5) — comfortable overlapping with EU mornings and US East evenings for remote collaboration.",
    suggestions: ["How can I contact him?", "Is he available for work?"],
  },
  {
    id: "resume",
    keys: ["resume", "cv", "download"],
    prompt: "Can I get his resume?",
    answer: "His resume is available for download — hit the Resume button in the navbar or the hero section.",
    followUp:
      "The resume covers all of this in one page: the Blue Group role, both internships, COMPPEC leadership, and the SpeakWell FYP.",
    suggestions: ["How can I contact him?", "What is his experience?"],
  },
  {
    id: "strength",
    keys: ["strength", "strong", "best", "expertise", "specialist", "specialize", "focus", "good at", "excel"],
    prompt: "What is his strongest area?",
    answer:
      "His strongest area is the intersection of voice + LLMs: production Urdu conversational AI, speech pipeline engineering (TTS/ASR), and retrieval-grounded agent systems. Comfortable anywhere from fine-tuning to edge deployment on Raspberry Pi.",
    followUp:
      "The rare combination: most engineers pick voice OR LLMs. He ships both ends — custom TTS data pipelines, Kaldi-level ASR internals, LoRA fine-tuning, RAG infrastructure, and the edge deployment story to run it all on constrained hardware.",
    suggestions: ["Show me his projects", "What tech does he use?"],
  },
  {
    id: "greeting",
    keys: ["hello", "hi", "hey", "yo", "salam", "assalam", "greetings", "sup"],
    prompt: "Hello!",
    answer:
      "Hey! I'm Wahab's portfolio assistant. Ask me about his experience, projects, skills, or how to get in touch.",
    followUp:
      "I can go deep too — try asking whether he knows a specific tech (\"does he know Docker?\"), which projects use RAG, or how long he's worked in AI.",
    suggestions: ["What is he working on now?", "Show me his projects", "How can I contact him?"],
  },
  {
    id: "thanks",
    keys: ["thank", "thanks", "cool", "awesome", "nice", "great", "impressive", "love it"],
    prompt: "Thanks!",
    answer: "Glad it helps! If you'd like to work with Wahab, the contact form below is the fastest way to reach him.",
    followUp: "Anything else you're curious about — projects, skills, availability?",
    suggestions: ["How can I contact him?", "Show me his projects"],
  },
];

/* ── Text utilities ──────────────────────────────────────── */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

const STOPWORDS = new Set([
  "what", "whats", "who", "whos", "when", "where", "which", "why", "how", "is", "are", "was", "were",
  "the", "a", "an", "of", "in", "on", "at", "to", "for", "with", "about", "tell", "me", "his", "he",
  "him", "does", "do", "did", "can", "could", "would", "will", "has", "have", "had", "and", "or",
  "you", "your", "it", "its", "that", "this", "there", "their", "from", "by", "as", "be", "been",
  "get", "got", "so", "if", "then", "they", "them", "we", "us", "our", "my", "am", "i",
]);

function stem(t: string): string {
  if (t.length > 5 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("ed")) return t.slice(0, -2);
  if (t.length > 4 && t.endsWith("es")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) return t.slice(0, -1);
  return t;
}

function levenshtein(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = new Array(b.length + 1).fill(0).map((_, i) => i);
  const curr = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

function contentTokens(q: string): string[] {
  return q
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

function fuzzyMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const maxDist = a.length >= 6 ? 2 : a.length >= 5 ? 1 : 0;
  return maxDist > 0 && Math.abs(a.length - b.length) <= maxDist && levenshtein(a, b) <= maxDist;
}

/* ── Vocabulary for skill/tech probes ────────────────────── */
const TECH_VOCAB: string[] = Array.from(
  new Set(
    [
      ...allTech,
      ...projects.flatMap((p) => p.tags),
      ...skillTree.flatMap((f) => f.files.map((file) => file.name)),
      "docker", "cuda", "kaldi", "langgraph", "langchain", "fastapi", "pytorch", "tensorflow",
      "hugging face", "ollama", "coqui", "raspberry pi", "jetson", "typescript", "python", "cpp", "c++", "sql", "mysql", "postgresql",
    ].map((t) => normalize(t))
  )
).filter((t) => t.length > 2);

/* ── Project identity: aliases per project for robust lookup ── */
const PROJECT_ALIASES: Record<string, string[]> = {
  "8": ["voice agent", "urdu voice", "conversational voice", "urdu agent"],
  "1": ["speakwell", "phoneme", "kaldi", "final year"],
  "7": ["orgmind", "org mind", "research agent", "company research"],
  "9": ["ticket", "support agent", "ticket resolution"],
  "2": ["tool insights", "toolchat", "gmail", "slack", "jira"],
  "3": ["sign language", "gesture", "hand gesture"],
  "4": ["santander", "transaction prediction", "tabular"],
  "5": ["self driving", "self-driving", "autonomous", "lane detection", "autonav"],
  "6": ["blood", "blood management", "donor"],
};

function findProject(q: string) {
  for (const p of projects) {
    const aliases = PROJECT_ALIASES[p.id] ?? [];
    const titleWords = normalize(p.title).split(" ").filter((w) => w.length > 3);
    if (aliases.some((a) => q.includes(a)) || titleWords.some((w) => q.includes(w))) {
      return p;
    }
  }
  return null;
}

/* ── Intent handlers ─────────────────────────────────────── */
function tenureAnswer(q: string): string | null {
  if (!/how long|tenure|duration|years?|months?/.test(q)) return null;
  const aboutBlue = /blue|current|ai engineer|present/.test(q);
  const aboutCareer = /career|experience|working|industry|field|ai/.test(q);

  if (aboutBlue && current) {
    const startYear = parseInt(current.startDate, 10);
    const nowYear = new Date().getFullYear();
    const years = Math.max(1, nowYear - startYear);
    return `He's been the ${current.role} at ${current.company} since ${current.startDate} — roughly ${years} year${years > 1 ? "s" : ""} in the role, and ${years + 1}+ years total in AI roles if you count his internships.`;
  }
  if (aboutCareer || /how long/.test(q)) {
    return "He's been shipping AI work since mid-2024: the NCRA edge-AI internship (Aug–Sep 2024), the RISETech ML internship (Jul–Aug 2025), and the Blue Group AI Engineer role since 2025 — so about 2 years of hands-on experience.";
  }
  return null;
}

function countAnswer(q: string): string | null {
  if (!/how many/.test(q)) return null;
  if (/project/.test(q)) {
    const aiml = projects.filter((p) => p.category === "aiml").length;
    return `${projects.length} featured projects on the site — ${aiml} in AI/ML, the rest full-stack. Highlights: ${projectTitles.slice(0, 3).join(", ")}.`;
  }
  if (/skill|tech|tool|language/.test(q)) {
    const files = skillTree.reduce((n, f) => n + f.files.length, 0);
    return `${skillTree.length} skill domains covering ${files} tools — the biggest are llms-and-agents, rag-and-retrieval and ml-and-deep-learning.`;
  }
  if (/year|experience/.test(q)) {
    return "About 2 years of hands-on AI experience: NCRA (2024), RISETech (2025), and Blue Group since 2025.";
  }
  return null;
}

function skillProbe(q: string): string | null {
  if (!/does he|do he|know|familiar|experienced|has he used|has he worked|can he/.test(q)) return null;
  // find a tech term in the query (fuzzy)
  const qTokens = q.split(" ").map(stem);
  const hit = TECH_VOCAB.find((tech) => {
    const techTokens = tech.split(" ");
    return techTokens.every((tt) =>
      q.includes(tt) || qTokens.some((qt) => fuzzyMatch(qt, stem(tt)))
    );
  });
  if (!hit) return null;

  const inSkills = skillTree.some((f) => f.files.some((file) => normalize(file.name).includes(hit)));
  const usingProjects = projects.filter((p) =>
    normalize(`${p.title} ${p.tags.join(" ")} ${p.longDescription}`).includes(hit)
  );
  const usingExp = experiences.filter((e) => normalize(e.tech.join(" ") + " " + e.description.join(" ")).includes(hit));

  let where = "";
  if (usingExp.length) where += ` Used at ${usingExp.map((e) => e.company).join(" & ")}.`;
  if (usingProjects.length) where += ` Projects: ${usingProjects.map((p) => p.title).slice(0, 3).join(", ")}.`;

  if (inSkills || usingExp.length || usingProjects.length) {
    return `Yes — ${hit} is in his toolkit.${where ? " " + where : ""}`;
  }
  // close-but-not-exact: suggest nearest
  const nearest = TECH_VOCAB.find((t) => levenshtein(t, hit) <= 2 && t !== hit);
  return nearest
    ? `Not exactly "${hit}" — but he does work with ${nearest}. Close enough?`
    : `"${hit}" doesn't show up in his public stack — his infra list is Docker, Linux, CUDA, Git and Vercel.`;
}

function projectTechLookup(q: string): string | null {
  if (!/tech|stack|built with|tools|framework|uses? what/.test(q)) return null;
  const p = findProject(q);
  if (!p) return null;
  return `${p.title} stack: ${p.tags.join(", ")}.${p.live ? ` Live demo: ${p.live}` : ""}${p.github ? ` · Code: ${p.github}` : ""}`;
}

function projectsByTech(q: string): string | null {
  if (!/(which|what).*(project|agent).*(use|using|with|built)|project.*with \w+/.test(q)) return null;
  const qTokens = q.split(" ").map(stem);
  const tech = TECH_VOCAB.find((t) =>
    t !== "project" && (q.includes(t) || qTokens.some((qt) => fuzzyMatch(qt, stem(t))))
  );
  if (!tech) return null;
  const hits = projects.filter((p) =>
    normalize(`${p.title} ${p.tags.join(" ")} ${p.longDescription}`).includes(tech)
  );
  if (!hits.length) return null;
  return `Projects using ${tech}:\n${hits.map((p) => `• ${p.title}`).join("\n")}`;
}

function projectDetail(q: string): { answer: string; topicId: string } | null {
  // Only when the query is mostly about a project (not e.g. "which projects use rag")
  if (/which projects|projects using|use rag|use docker/.test(q)) return null;
  const p = findProject(q);
  if (!p) return null;
  const aliases = (PROJECT_ALIASES[p.id] ?? []).find((a) => q.includes(a));
  const titleHit = normalize(p.title).split(" ").filter((w) => w.length > 3).some((w) => q.includes(w));
  if (!aliases && !titleHit) return null;
  return {
    answer: `${p.title} — ${p.description}${p.live ? `\nLive: ${p.live}` : ""}`,
    topicId: `project:${p.id}`,
  };
}

/* ── Follow-up memory ────────────────────────────────────── */
function isFollowUp(q: string): boolean {
  const contentWords = contentTokens(q).filter(
    (t) => !["more", "detail", "details", "else", "well", "okay", "ok", "yes", "yeah", "sure", "please", "deep", "deeper"].includes(t)
  );
  return (
    contentWords.length === 0 &&
    /(more|detail|details|else|go on|continue|elaborate|expand|deeper|deeper dive|and|what about that|why)/.test(q)
  );
}

/* ── Topic scoring ───────────────────────────────────────── */
function scoreTopics(q: string): Array<{ topic: Topic; score: number }> {
  const qTokens = contentTokens(q);
  const qStems = new Set(qTokens);
  const scored = TOPICS.map((topic) => {
    let score = 0;
    for (const key of topic.keys) {
      if (q.includes(key)) score += key.includes(" ") ? 5 : 3;
      const keyTokens = key.split(" ").map(stem);
      for (const kt of keyTokens) {
        if (qStems.has(kt)) score += 2;
        else if (qTokens.some((qt) => fuzzyMatch(qt, kt))) score += 1;
      }
    }
    // coverage bonus: how much of the query the topic explains
    if (qTokens.length > 0 && score > 0) {
      const matched = qTokens.filter(
        (qt) => topic.keys.some((k) => stem(k).includes(qt) || qt.includes(stem(k))) ||
          topic.keys.some((k) => k.split(" ").some((kw) => fuzzyMatch(qt, stem(kw))))
      ).length;
      score += (matched / qTokens.length) * 2;
    }
    return { topic, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
}

function blend(top1: string, top2: string): string {
  const short2 = top2.length > 220 ? top2.slice(0, 217) + "…" : top2;
  return `${top1}\n\n${short2}`;
}

/* ── Public API ──────────────────────────────────────────── */
export interface AgentReply {
  answer: string;
  suggestions: string[];
  /** id of the topic answered, kept in memory for follow-ups */
  topicId?: string;
}

export function askAgent(question: string, lastTopicId?: string): AgentReply {
  const q = normalize(question);

  if (!q) {
    return {
      answer: "Ask me anything about Wahab — experience, projects, skills, or contact.",
      suggestions: ["What is he working on now?", "Show me his projects"],
      topicId: lastTopicId,
    };
  }

  // 1. Follow-up continuation ("tell me more", "what else") → deeper answer
  if (lastTopicId && isFollowUp(q)) {
    const baseId = lastTopicId.startsWith("project:") ? "projects" : lastTopicId;
    const topic = TOPICS.find((t) => t.id === baseId);
    if (topic) {
      return { answer: topic.followUp, suggestions: topic.suggestions ?? ["Show me his projects", "How can I contact him?"], topicId: topic.id };
    }
  }

  // 2. Structured intents
  const intents: Array<{ answer: string; topicId: string }> = [];
  const t = tenureAnswer(q); if (t) intents.push({ answer: t, topicId: "experience" });
  const c = countAnswer(q); if (c) intents.push({ answer: c, topicId: "projects" });
  const s = skillProbe(q); if (s) intents.push({ answer: s, topicId: "skills" });
  const ptl = projectTechLookup(q); if (ptl) intents.push({ answer: ptl, topicId: `project:${findProject(q)?.id}` });
  const pbt = projectsByTech(q); if (pbt) intents.push({ answer: pbt, topicId: "projects" });
  if (intents.length > 0) {
    return {
      answer: intents[0].answer,
      suggestions: ["Tell me more", "Show me his projects", "How can I contact him?"],
      topicId: intents[0].topicId,
    };
  }

  // 3. Project detail (specific project named)
  const pd = projectDetail(q);
  if (pd) {
    return {
      answer: pd.answer,
      suggestions: ["Tell me more", "Show me his projects", "How can I contact him?"],
      topicId: pd.topicId,
    };
  }

  // 4. Topic scoring — exact pass
  const ranked = scoreTopics(q);
  const best = ranked[0];

  if (best && best.score >= 4) {
    const second = ranked[1];
    // Blend a strong second topic into the answer
    if (second && second.score >= best.score * 0.65 && best.score >= 6) {
      return {
        answer: blend(best.topic.answer, second.topic.answer),
        suggestions: second.topic.suggestions ?? best.topic.suggestions ?? ["Show me his projects", "How can I contact him?"],
        topicId: best.topic.id,
      };
    }
    return {
      answer: best.topic.answer,
      suggestions: best.topic.suggestions ?? ["Show me his projects", "How can I contact him?"],
      topicId: best.topic.id,
    };
  }

  // 5. Fuzzy second pass (typos): rescore with fuzzy-only token matching
  if (best && best.score >= 2) {
    return {
      answer: best.topic.answer,
      suggestions: best.topic.suggestions ?? ["Show me his projects", "How can I contact him?"],
      topicId: best.topic.id,
    };
  }

  // 6. Smart fallback: offer the closest topics as chips
  const near = ranked.slice(0, 3).map((r) => r.topic.prompt);
  const fallbackChips = near.length
    ? Array.from(new Set([...near, "How can I contact him?"])).slice(0, 4)
    : ["What is he working on now?", "Show me his projects", "What are his skills?", "How can I contact him?"];
  return {
    answer:
      (near.length
        ? "Not sure I caught that — but I can talk about any of these:"
        : "I don't have a confident answer for that one — but Wahab would! Reach him at " + CONTACT.email + "."),
    suggestions: fallbackChips,
  };
}

/** Opening message shown when the chat is first opened. */
export const AGENT_GREETING: AgentReply = {
  answer:
    "Hi! I'm Wahab's portfolio assistant — ask me anything about his experience, projects, skills, or how to reach him.",
  suggestions: ["What is he working on now?", "Show me his projects", "What are his skills?", "How can I contact him?"],
};
