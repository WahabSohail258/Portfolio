export interface Project {
  id: string;
  title: string;
  description: string;
  cardTitle: string;
  longDescription: string;
  image: string;
  imageAlt?: string;
  imageSource?: string;
  tags: string[];
  category: "frontend" | "backend" | "fullstack" | "aiml";
  github: string;
  live: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "8",
    title: "Urdu Conversational Voice Agent",
    description:
      "Local language models and natural Urdu speech, grounded in company knowledge.",
    cardTitle: "Urdu Voice Agent",
    longDescription:
      "Developing components for an Urdu conversational voice agent in production at Blue Group of Companies. The pipeline spans local LLM response generation (Ollama-hosted models via OpenAI-comp[...]",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70db4397?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Advanced voice waveform visualization with neural network patterns",
    imageSource: "https://unsplash.com/photos/voice-waveform",
    tags: ["Python", "Coqui TTS", "PEFT/LoRA", "Ollama", "Hugging Face", "RAG", "FastAPI"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: true,
  },
  {
    id: "1",
    title: "SpeakWell — Urdu Phoneme Recognition",
    description:
      "Urdu pronunciation feedback for speech rehabilitation, running on Raspberry Pi.",
    cardTitle: "SpeakWell",
    longDescription:
      "Final Year Project: Built a phoneme-level Urdu ASR pipeline from raw pediatric speech recordings to labelled datasets, addressing the shortage of annotated data for low-resource speech reco[...]",
    image: "https://images.unsplash.com/photo-1558478551046-4ffa5d1f3e74?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Colorful audio waveform and speech recognition visualization",
    imageSource: "https://unsplash.com/photos/audio-waveform",
    tags: ["Python", "C++", "Kaldi", "HMM", "OpenBLAS", "Kivy", "Raspberry Pi 5"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: true,
  },
  {
    id: "7",
    title: "OrgMind — Multi-Agent Research & QA",
    description:
      "Research agents that turn web sources into grounded answers.",
    cardTitle: "OrgMind",
    longDescription:
      "Orchestrated LangGraph agent workflows for structured question answering over heterogeneous web data, grounding LLM responses in retrieved source context through a complete RAG pipeline. Im[...]",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Multi-agent AI system with interconnected neural network nodes",
    imageSource: "https://unsplash.com/photos/ai-network",
    tags: ["LangGraph", "Groq", "SentenceTransformers", "pgvector", "FastAPI", "Next.js"],
    category: "fullstack",
    github: "https://github.com/WahabSohail258/OrgMind",
    live: "https://companies-researcher.vercel.app/",
    featured: true,
  },
  {
    id: "9",
    title: "Customer Support Ticket Resolution Agent",
    description:
      "Ticket triage and response drafting grounded in support documentation.",
    cardTitle: "Support Agent",
    longDescription:
      "Built a LangGraph ticket-resolution workflow combining ticket triage, FAISS knowledge retrieval, and LLM-generated responses grounded in relevant support documentation. The agent classifies[...]",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Customer support AI dashboard with ticket automation",
    imageSource: "https://unsplash.com/photos/support-ai",
    tags: ["LangGraph", "FAISS", "RAG", "Docker", "Python"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: false,
  },
  {
    id: "2",
    title: "ORBI — Tool Insights Agent",
    description:
      "One AI assistant for Gmail, Slack, Jira, and GitHub.",
    cardTitle: "ORBI",
    longDescription:
      "ORBI brings connected workspace tools into a single conversational interface. Built with Next.js, TypeScript, the Vercel AI SDK, and Composio for dynamic tool calling. Convex maintains reac[...]",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Modern workspace AI assistant interface with multiple tool integrations",
    imageSource: "https://unsplash.com/photos/workspace-tech",
    tags: ["Next.js", "TypeScript", "Convex", "Vercel AI SDK", "Composio", "Clerk", "Langfuse"],
    category: "fullstack",
    github: "https://github.com/Orbi-7/orbi",
    live: "https://orbi-xi.vercel.app/",
    featured: true,
  },
  {
    id: "3",
    title: "Sign Language Recognition",
    description:
      "Real-time recognition of hand signs and gestures.",
    cardTitle: "Sign Recognition",
    longDescription:
      "Built a real-time system for detecting and translating hand gestures using webcam input and MediaPipe hand tracking (21 keypoints). Combined CNN (for alphabet A–Z) and LSTM (for dynamic [...]",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Hand gesture recognition with AI pose estimation overlay",
    imageSource: "https://unsplash.com/photos/hand-gesture",
    tags: ["Python", "OpenCV", "MediaPipe", "CNN", "LSTM", "Streamlit"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: false,
  },
  {
    id: "4",
    title: "Santander Transaction Prediction",
    description:
      "Comparing interpretable models for customer transaction prediction.",
    cardTitle: "Transaction Prediction",
    longDescription:
      "Built and compared multiple models (Residual MLP, LightGBM, Naive Bayes) on large tabular data for the Santander customer transaction prediction challenge. Selected Naive Bayes based on da[...]",
    image: "https://images.unsplash.com/photo-1526628652108-92a30a20e6ba?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Financial analytics dashboard with predictive models and data visualization",
    imageSource: "https://unsplash.com/photos/analytics-data",
    tags: ["Python", "LightGBM", "Naive Bayes", "PyTorch", "SHAP", "Scikit-learn"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: false,
  },
  {
    id: "5",
    title: "Autonomous Navigation System",
    description:
      "Vision-based lane detection for an embedded driving prototype.",
    cardTitle: "Autonomous Navigation",
    longDescription:
      "Built a self-driving car prototype using image processing for real-time navigation. Implemented lane detection using edge detection, colour masking, and perspective transformation. Enabled[...]",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Autonomous vehicle computer vision system with lane detection",
    imageSource: "https://unsplash.com/photos/self-driving-car",
    tags: ["Python", "OpenCV", "Edge Detection", "Embedded Systems"],
    category: "aiml",
    github: "https://github.com/WahabSohail258/Self-Driving-Car",
    live: "",
    featured: false,
  },
  {
    id: "6",
    title: "Blood Management System",
    description:
      "Donor records, blood requests, and compatibility matching in one dashboard.",
    cardTitle: "Blood Management",
    longDescription:
      "Built a full stack Blood Management System with a Node.js + Express backend and a frontend dashboard for hospital staff. The system handles donor registration, recipient requests, blood ty[...]",
    image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1000&h=600&fit=crop&q=80",
    imageAlt: "Healthcare blood bank management system dashboard",
    imageSource: "https://unsplash.com/photos/healthcare-blood",
    tags: ["Node.js", "Express.js", "MySQL", "REST API", "Full Stack"],
    category: "fullstack",
    github: "https://github.com/WahabSohail258/Blood-Managment-System",
    live: "",
    featured: false,
  },
];
