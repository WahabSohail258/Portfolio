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
}

export const experiences: Experience[] = [
  {
    id: "blue",
    company: "Blue Group of Companies",
    role: "AI Engineer",
    startDate: "2025",
    endDate: "Present",
    location: "Rawalpindi, Pakistan",
    description: [
      "Developing components for an Urdu conversational voice agent, spanning local LLM response generation and text-to-speech, with speech-to-text integration in progress for an end-to-end voice pipeline.",
      "Applying Coqui TTS with ElevenLabs audio data to Urdu speech synthesis and investigating natural, practical voice output for domain-specific conversational use cases.",
      "Fine-tuning domain-specific LLMs with Hugging Face Transformers and PEFT/LoRA on English and Roman Urdu conversations; testing generated outputs for factual consistency, directness, and domain adherence.",
      "Integrating Ollama-hosted LLMs and local embedding models through OpenAI-compatible interfaces, resolving backend, agent-configuration, and retrieval integration issues.",
      "Building and testing RAG pipelines that retrieve relevant knowledge-base context for grounded Urdu responses.",
    ],
    tech: ["Coqui TTS", "Hugging Face", "PEFT/LoRA", "Ollama", "RAG", "FastAPI"],
    type: "work",
  },
  {
    id: "1",
    company: "RISETech Pvt. Ltd.",
    role: "Machine Learning Intern",
    startDate: "July 2025",
    endDate: "Aug 2025",
    location: "Pakistan",
    description: [
      "Worked on AI and data-driven research projects involving data preprocessing, model training, and performance evaluation using ML and deep learning frameworks.",
      "Supported development of intelligent healthcare and biomedical solutions; gained hands-on experience with supervised/unsupervised learning, neural networks, and data visualization.",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning"],
    type: "work",
  },
  {
    id: "2",
    company: "National Centre of Robotics and Automation (NCRA)",
    role: "Intern",
    startDate: "Aug 2024",
    endDate: "Sept 2024",
    location: "Pakistan",
    description: [
      "Assisted in setting up and configuring development environments on Linux-based systems.",
      "Deployed applications on edge devices (Raspberry Pi, Jetson Nano) and optimized performance.",
      "Worked with GPU-based systems (CUDA) and managed system resources for compute-heavy tasks.",
      "Collaborated in testing, debugging, and improving system reliability across hardware setups.",
    ],
    tech: ["Linux", "Raspberry Pi", "Jetson Nano", "CUDA", "Python", "Docker"],
    type: "work",
  },
  {
    id: "3",
    company: "COMPPEC, NUST",
    role: "President",
    startDate: "2025",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    description: [
      "Led the planning and delivery of a national-level computing event with more than 900 participants.",
      "Coordinated cross-functional teams, secured corporate sponsorships, and managed budgeting and logistics.",
      "Oversaw promotional campaigns to ensure successful delivery.",
    ],
    tech: ["Leadership", "Event Management", "Sponsorships", "Team Coordination"],
    type: "leadership",
  },
  {
    id: "6",
    company: "National University of Sciences and Technology (NUST)",
    role: "B.E. Computer Engineering",
    startDate: "2022",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    description: [
      "Bachelor of Engineering in Computer Engineering — Class of 2026.",
      "Relevant coursework: Large Language Models, Deep Learning, Machine Learning, Deep Generative Models, Computer Vision, Digital Signal Processing.",
      "Final Year Project: SpeakWell — phoneme-level Urdu speech recognition with error analysis for speech rehabilitation on Raspberry Pi 5.",
      "President of COMPPEC, the university's flagship computing society.",
    ],
    tech: ["Large Language Models", "Deep Learning", "Computer Vision", "DSP"],
    type: "education",
  },
];
