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
    id: "1",
    title: "Phoneme Level Speech Recognition",
    description:
      "Real-time Urdu phoneme recognizer deployed on Raspberry Pi 5 for speech rehabilitation — edge AI on constrained hardware.",
    longDescription:
      "Final Year Project: A real-time Urdu phoneme recognition system deployed on Raspberry Pi 5 for speech rehabilitation. Designed an acoustic modelling pipeline with Kaldi, optimized inference latency using OpenBLAS and hardware-specific build configs. Used a cross-language learning approach (English & Persian) to overcome the lack of Urdu data. Built a cross-platform mobile UI with Kivy providing live visual feedback and progress tracking for end-users.",
    image: "/projects/speech.jpg",
    tags: ["Python", "C++", "Raspberry Pi", "Kaldi", "Linux", "Docker", "Kivy"],
    category: "aiml",
    github: "https://github.com/WahabSohail258",
    live: "https://github.com/WahabSohail258",
    featured: true,
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
    live: "https://github.com/WahabSohail258",
    featured: true,
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
    live: "https://github.com/WahabSohail258",
    featured: true,
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
    live: "https://github.com/WahabSohail258",
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
    github: "https://github.com/WahabSohail258",
    live: "https://github.com/WahabSohail258",
    featured: false,
  },
  {
    id: "6",
    title: "Blood Management System",
    description:
      "Database-driven system for managing donor and recipient records with relational schemas and full CRUD operations.",
    longDescription:
      "Developed a database-driven blood management system to manage donor and recipient records. Designed relational database schemas and implemented SQL queries for efficient data retrieval. Built backend logic with Node.js and handled CRUD operations with proper data validation and error handling.",
    image: "/projects/bloodmgmt.jpg",
    tags: ["Node.js", "MySQL", "SQL", "CRUD", "REST API"],
    category: "backend",
    github: "https://github.com/WahabSohail258",
    live: "https://github.com/WahabSohail258",
    featured: false,
  },
];
