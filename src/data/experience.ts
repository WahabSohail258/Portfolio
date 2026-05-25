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
      "Supported data handling, storage management, and experiment tracking.",
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
      "Led end-to-end planning and execution of a large-scale computing event.",
      "Managed cross-functional teams and coordinated with sponsors, universities, and stakeholders.",
      "Oversaw budgeting, logistics, and promotional campaigns to ensure successful delivery.",
    ],
    tech: ["Leadership", "Event Management", "Team Coordination"],
    type: "leadership",
  },
  {
    id: "4",
    company: "NUST Volunteer Club (NVC)",
    role: "Fund Manager",
    startDate: "2025",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    description: [
      "Supervised transparent allocation and management of club funds to support charitable initiatives and individuals in need.",
    ],
    tech: ["Finance Management", "Non-Profit", "Leadership"],
    type: "leadership",
  },
  {
    id: "5",
    company: "P@SHA",
    role: "Volunteer",
    startDate: "2024",
    endDate: "2024",
    location: "Pakistan",
    description: [
      "Coordinated end-to-end event operations from the evaluation phase to the closing ceremony, ensuring seamless workflow and effective team collaboration.",
    ],
    tech: ["Event Operations", "Team Collaboration"],
    type: "leadership",
  },
  {
    id: "6",
    company: "National University of Science and Technology (NUST)",
    role: "B.Sc. Computer Engineering",
    startDate: "2022",
    endDate: "2026",
    location: "Islamabad, Pakistan",
    description: [
      "Graduated with a B.Sc. in Computer Engineering — Class of 2026.",
      "Final Year Project: Phoneme Level Speech Recognition with Error Analysis — real-time Urdu speech rehab system on Raspberry Pi 5.",
      "President of COMPPEC, the university's flagship computing society.",
    ],
    tech: ["Computer Engineering", "Embedded Systems", "Algorithms", "Digital Design"],
    type: "education",
  },
];
