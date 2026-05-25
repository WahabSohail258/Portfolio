export interface Skill {
  name: string;
  level: number; // 0–100
  icon: string;
  category: "languages" | "aiml" | "tools";
}

export const skills: Skill[] = [
  // Languages & Programming
  { name: "Python", level: 92, icon: "🐍", category: "languages" },
  { name: "C++", level: 85, icon: "⚡", category: "languages" },
  { name: "Java", level: 72, icon: "☕", category: "languages" },
  { name: "SQL", level: 78, icon: "🗃️", category: "languages" },
  { name: "JavaScript / TypeScript", level: 80, icon: "🔷", category: "languages" },
  { name: "Verilog / MATLAB", level: 65, icon: "🔬", category: "languages" },

  // AI & ML
  { name: "PyTorch / TensorFlow", level: 88, icon: "🔥", category: "aiml" },
  { name: "OpenCV / MediaPipe", level: 90, icon: "👁️", category: "aiml" },
  { name: "LLMs / RAG / Fine-Tuning", level: 82, icon: "🤖", category: "aiml" },
  { name: "Scikit-learn / LightGBM", level: 85, icon: "📊", category: "aiml" },
  { name: "Deep Learning (CNN/LSTM)", level: 87, icon: "🧠", category: "aiml" },
  { name: "Computer Vision", level: 88, icon: "📷", category: "aiml" },

  // Tools & Systems
  { name: "Linux (Ubuntu / RPi OS)", level: 88, icon: "🐧", category: "tools" },
  { name: "Git / GitHub", level: 90, icon: "🐙", category: "tools" },
  { name: "Docker / CUDA", level: 78, icon: "🐳", category: "tools" },
  { name: "Raspberry Pi / Jetson Nano", level: 85, icon: "🔌", category: "tools" },
  { name: "AWS S3 / Vercel", level: 72, icon: "☁️", category: "tools" },
  { name: "MySQL / PostgreSQL / MongoDB", level: 80, icon: "💾", category: "tools" },
];

export const techIcons = [
  { name: "Python", color: "#3776AB" },
  { name: "C++", color: "#00599C" },
  { name: "PyTorch", color: "#EE4C2C" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "OpenCV", color: "#5C3EE8" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#339933" },
  { name: "Docker", color: "#2496ED" },
  { name: "Linux", color: "#FCC624" },
  { name: "Raspberry Pi", color: "#A22846" },
  { name: "AWS", color: "#FF9900" },
  { name: "MongoDB", color: "#47A248" },
];
