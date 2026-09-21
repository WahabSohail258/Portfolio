export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
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
      "Production Urdu voice agent at Blue Group of Companies — local LLM response generation, Urdu TTS with Coqui, and STT integration for an end-to-end voice pipeline.",
    longDescription:
      "Developing components for an Urdu conversational voice agent in production at Blue Group of Companies. The pipeline spans local LLM response generation (Ollama-hosted models via OpenAI-compatible interfaces), Urdu text-to-speech with Coqui TTS fine-tuned on ElevenLabs audio data, and speech-to-text integration in progress for a complete end-to-end voice loop. Fine-tuned domain-specific LLMs with Hugging Face Transformers and PEFT/LoRA on English and Roman Urdu conversations, evaluating outputs for factual consistency, directness, and domain adherence. Built and tested RAG pipelines that retrieve knowledge-base context for grounded Urdu responses.",
    image: "/projects/voice-agent.jpg",
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
      "Real-time Urdu phoneme recognizer deployed on Raspberry Pi 5 for speech rehabilitation — edge AI on constrained hardware.",
    longDescription:
      "Final Year Project: Built a phoneme-level Urdu ASR pipeline from raw pediatric speech recordings to labelled datasets, addressing the shortage of annotated data for low-resource speech recognition. Reimplemented cross-lingual transfer learning using English and Persian acoustic models and designed controlled experiments to compare recognition performance across different training-data regimes. Deployed the recognizer on Raspberry Pi 5 using OpenBLAS and hardware-specific build configurations; developed a Kivy interface for live phoneme feedback and rehabilitation progress tracking.",
    image: "/projects/speech.jpg",
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
      "LangGraph agent workflows for structured question answering over heterogeneous web data, grounded through a complete RAG pipeline with pgvector retrieval.",
    longDescription:
      "Orchestrated LangGraph agent workflows for structured question answering over heterogeneous web data, grounding LLM responses in retrieved source context through a complete RAG pipeline. Implemented sentence-transformer embeddings, document chunking, and pgvector retrieval behind a FastAPI backend; refined retrieval strategies to improve context relevance. Delivered the end-to-end application with a Next.js interface, deployed through Vercel and cloud infrastructure.",
    image: "/projects/orgmind.jpg",
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
      "LangGraph ticket-resolution workflow combining ticket triage, FAISS knowledge retrieval, and grounded LLM responses — containerized with Docker.",
    longDescription:
      "Built a LangGraph ticket-resolution workflow combining ticket triage, FAISS knowledge retrieval, and LLM-generated responses grounded in relevant support documentation. The agent classifies incoming tickets, retrieves the most relevant knowledge-base articles via embeddings, and drafts responses that cite the underlying documentation. Containerized the application with Docker to make the agent runtime and its dependencies reproducible across development and deployment environments.",
    image: "/projects/ticket-agent.jpg",
    tags: ["LangGraph", "FAISS", "RAG", "Docker", "Python"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: false,
  },
  {
    id: "2",
    title: "Tool Insights Chat",
    description:
      "AI chatbot integrating Gmail, Slack, and Jira to deliver real-time project insights using a full-stack streaming architecture.",
    longDescription:
      "Built an AI chatbot integrating tools like Gmail, Slack, and Jira to deliver real-time project insights using the Vercel AI SDK and Composio. Applied Agile workflows using Jira with sprint-based task management and collaboration. Developed a scalable full-stack system with real-time data handling and streaming responses using Next.js, TypeScript, and Convex.",
    image: "/projects/toolchat.jpg",
    tags: ["Next.js", "TypeScript", "Convex", "Vercel AI SDK", "Composio", "Jira"],
    category: "fullstack",
    github: "https://github.com/WahabSohail258",
    live: "",
    featured: false,
  },
  {
    id: "3",
    title: "Sign Language Recognition",
    description:
      "Real-time hand gesture detection & translation system combining CNN + LSTM with MediaPipe and a live Streamlit interface.",
    longDescription:
      "Built a real-time system for detecting and translating hand gestures using webcam input and MediaPipe hand tracking (21 keypoints). Combined CNN (for alphabet A–Z) and LSTM (for dynamic gestures) for dual-mode recognition. Applied smoothing techniques to improve prediction stability during live inference. Developed an interactive Streamlit app with text-to-speech output for real-time usability.",
    image: "/projects/signlang.jpg",
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
      "ML pipeline comparing Residual MLP, LightGBM, and Naive Bayes on large tabular data with SHAP feature importance analysis.",
    longDescription:
      "Built and compared multiple models (Residual MLP, LightGBM, Naive Bayes) on large tabular data for the Santander customer transaction prediction challenge. Selected Naive Bayes based on data analysis, focusing on efficiency and interpretability. Used SHAP to analyze feature importance and identify key predictors. Implemented a complete ML pipeline with preprocessing, cross-validation, and full reproducibility.",
    image: "/projects/santander.jpg",
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
      "Self-driving car prototype using image processing — lane detection via edge detection, colour masking, and perspective transformation.",
    longDescription:
      "Built a self-driving car prototype using image processing for real-time navigation. Implemented lane detection using edge detection, colour masking, and perspective transformation. Enabled basic autonomous path following using vision-based decision-making with real-time OpenCV pipelines on embedded hardware.",
    image: "/projects/autonav.jpg",
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
      "A full stack web application for managing blood donor and recipient records with real-time compatibility matching and a complete management dashboard.",
    longDescription:
      "Built a full stack Blood Management System with a Node.js + Express backend and a frontend dashboard for hospital staff. The system handles donor registration, recipient requests, blood type compatibility matching, and inventory tracking. Implemented RESTful APIs with proper validation and error handling, connected to a MySQL database with a normalised relational schema. The UI allows hospital staff to search, filter and manage donor records in real time.",
    image: "/projects/bloodmgmt.jpg",
    tags: ["Node.js", "Express.js", "MySQL", "REST API", "Full Stack"],
    category: "fullstack",
    github: "https://github.com/WahabSohail258/Blood-Managment-System",
    live: "",
    featured: false,
  },
];
