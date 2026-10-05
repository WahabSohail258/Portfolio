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
      "Developing components for an Urdu conversational voice agent in production at Blue Group of Companies. The pipeline spans local LLM response generation (Ollama-hosted models via OpenAI-compatible interfaces), Urdu text-to-speech with Coqui TTS fine-tuned on ElevenLabs audio data, and speech-to-text integration in progress for a complete end-to-end voice loop. Fine-tuned domain-specific LLMs with Hugging Face Transformers and PEFT/LoRA on English and Roman Urdu conversations, evaluating outputs for factual consistency, directness, and domain adherence. Built and tested RAG pipelines that retrieve knowledge-base context for grounded Urdu responses.",
    image: "/projects/voice-minimal.jpg",
    imageAlt: "A studio microphone against a plain black background",
    imageSource: "https://unsplash.com/photos/black-and-gray-microphone-quvUXEIlE3U",
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
      "Final Year Project: Built a phoneme-level Urdu ASR pipeline from raw pediatric speech recordings to labelled datasets, addressing the shortage of annotated data for low-resource speech recognition. Reimplemented cross-lingual transfer learning using English and Persian acoustic models and designed controlled experiments to compare recognition performance across different training-data regimes. Deployed the recognizer on Raspberry Pi 5 using OpenBLAS and hardware-specific build configurations; developed a Kivy interface for live phoneme feedback and rehabilitation progress tracking.",
    image: "/projects/speech-minimal.jpg",
    imageAlt: "Headphones on a plain yellow background",
    imageSource: "https://unsplash.com/photos/PDX_a_82obo",
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
      "Orchestrated LangGraph agent workflows for structured question answering over heterogeneous web data, grounding LLM responses in retrieved source context through a complete RAG pipeline. Implemented sentence-transformer embeddings, document chunking, and pgvector retrieval behind a FastAPI backend; refined retrieval strategies to improve context relevance. Delivered the end-to-end application with a Next.js interface, deployed through Vercel and cloud infrastructure.",
    image: "/projects/research-minimal.jpg",
    imageAlt: "An open book against a dark background",
    imageSource: "https://unsplash.com/photos/jLZyur5-7D0",
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
      "Built a LangGraph ticket-resolution workflow combining ticket triage, FAISS knowledge retrieval, and LLM-generated responses grounded in relevant support documentation. The agent classifies incoming tickets, retrieves the most relevant knowledge-base articles via embeddings, and drafts responses that cite the underlying documentation. Containerized the application with Docker to make the agent runtime and its dependencies reproducible across development and deployment environments.",
    image: "/projects/support-minimal.jpg",
    imageAlt: "Headphones on a plain white background",
    imageSource: "https://unsplash.com/photos/KjU3hZ84T3M",
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
      "ORBI brings connected workspace tools into a single conversational interface. Built with Next.js, TypeScript, the Vercel AI SDK, and Composio for dynamic tool calling. Convex maintains reactive chat history, Clerk handles authentication, and OAuth connects external services. The repository includes Langfuse observability for model latency, token usage, and tool-call traces.",
    image: "/projects/orbi-minimal.jpg",
    imageAlt: "A single illuminated laptop against a dark background",
    imageSource: "https://unsplash.com/s/photos/aesthetic-wallpaper-laptop",
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
      "Built a real-time system for detecting and translating hand gestures using webcam input and MediaPipe hand tracking (21 keypoints). Combined CNN (for alphabet A–Z) and LSTM (for dynamic gestures) for dual-mode recognition. Applied smoothing techniques to improve prediction stability during live inference. Developed an interactive Streamlit app with text-to-speech output for real-time usability.",
    image: "/projects/sign-minimal.jpg",
    imageAlt: "A hand forming a sign against a plain blue background",
    imageSource: "https://www.pexels.com/photo/person-doing-sign-language-9017435/",
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
      "Built and compared multiple models (Residual MLP, LightGBM, Naive Bayes) on large tabular data for the Santander customer transaction prediction challenge. Selected Naive Bayes based on data analysis, focusing on efficiency and interpretability. Used SHAP to analyze feature importance and identify key predictors. Implemented a complete ML pipeline with preprocessing, cross-validation, and full reproducibility.",
    image: "/projects/analytics-minimal.jpg",
    imageAlt: "A white calculator on a clean surface",
    imageSource: "https://unsplash.com/photos/GlavtG-umzE",
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
      "Built a self-driving car prototype using image processing for real-time navigation. Implemented lane detection using edge detection, colour masking, and perspective transformation. Enabled basic autonomous path following using vision-based decision-making with real-time OpenCV pipelines on embedded hardware.",
    image: "/projects/navigation-minimal.jpg",
    imageAlt: "An empty road leading into a misty horizon",
    imageSource: "https://unsplash.com/photos/a8cRyMSuwek",
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
      "Built a full stack Blood Management System with a Node.js + Express backend and a frontend dashboard for hospital staff. The system handles donor registration, recipient requests, blood type compatibility matching, and inventory tracking. Implemented RESTful APIs with proper validation and error handling, connected to a MySQL database with a normalised relational schema. The UI allows hospital staff to search, filter and manage donor records in real time.",
    image: "/projects/blood-minimal.jpg",
    imageAlt: "Blood sample tubes arranged in a laboratory rack",
    imageSource: "https://www.pexels.com/photo/close-up-shot-of-test-tubes-8442557/",
    tags: ["Node.js", "Express.js", "MySQL", "REST API", "Full Stack"],
    category: "fullstack",
    github: "https://github.com/WahabSohail258/Blood-Managment-System",
    live: "",
    featured: false,
  },
];
