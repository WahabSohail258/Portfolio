export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  tech: string[];
  type: "work" | "education" | "leadership";
  /** 1–2 char monogram shown in the timeline avatar */
  monogram: string;
  /** Per-item accent hue (hex) used for avatar, dot and glow */
  accent: string;
  /** One-line summary shown under the role */
  highlight: string;
}

export const experiences: Experience[] = [
  {
    id: "blue",
    company: "Blue Group of Companies",
    role: "AI Engineer",
    startDate: "2025",
    endDate: "Present",
    location: "Rawalpindi, Pakistan",
    monogram: "AI",
    accent: "#4caf50",
    highlight: "Production Urdu voice agent — local LLMs, TTS & RAG",
    description: [
      "Building an Urdu conversational voice agent: local LLM generation, Coqui TTS, with STT in progress",
      "Fine-tuned domain LLMs with Hugging Face + PEFT/LoRA on English & Roman Urdu",
      "Shipped RAG pipelines that ground every Urdu response in knowledge-base context",
    ],
    tech: ["Coqui TTS", "Hugging Face", "PEFT/LoRA", "Ollama", "RAG", "FastAPI"],
    type: "work",
  },
  {
    id: "1",
    company: "RISETech Pvt. Ltd.",
    role: "Machine Learning Intern",
    startDate: "Jul 2025",
    endDate: "Aug 2025",
    location: "Pakistan",
    monogram: "ML",
    accent: "#3b82f6",
    highlight: "Deep learning research for healthcare AI",
    description: [
      "Trained and evaluated models on preprocessing → training → benchmarking pipelines",
      "Applied supervised/unsupervised learning and neural networks to biomedical data",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
    type: "work",
  },
  {
    id: "2",
    company: "NCRA — National Centre of Robotics & Automation",
    role: "Engineering Intern",
    startDate: "Aug 2024",
    endDate: "Sep 2024",
    location: "Pakistan",
    monogram: "R",
    accent: "#f59e0b",
    highlight: "Edge AI deployment on constrained hardware",
    description: [
      "Deployed and optimised CV apps on Raspberry Pi & Jetson Nano",
      "Worked with CUDA GPU systems, Linux environments and Docker",
    ],
    tech: ["Linux", "Raspberry Pi", "Jetson Nano", "CUDA", "Docker"],
    type: "work",
  },
  {
    id: "3",
    company: "COMPPEC, NUST",
    role: "President",
    startDate: "2025",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    monogram: "C",
    accent: "#8b5cf6",
    highlight: "Led a national computing event with 900+ participants",
    description: [
      "Led planning and delivery of a national-level computing event with 900+ participants",
      "Secured corporate sponsorships and managed cross-functional teams & budget",
    ],
    tech: ["Leadership", "Sponsorships", "Event Management"],
    type: "leadership",
  },
  {
    id: "6",
    company: "NUST",
    role: "B.E. Computer Engineering",
    startDate: "2022",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    monogram: "N",
    accent: "#06b6d4",
    highlight: "FYP: SpeakWell — Urdu phoneme ASR on Raspberry Pi 5",
    description: [
      "Coursework: LLMs, Deep Learning, Computer Vision, Deep Generative Models, DSP",
      "Final Year Project: phoneme-level Urdu speech recognition for speech rehabilitation",
    ],
    tech: ["LLMs", "Deep Learning", "Computer Vision", "DSP"],
    type: "education",
  },
];
