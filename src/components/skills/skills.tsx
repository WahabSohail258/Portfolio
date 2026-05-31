"use client";

import { motion } from "framer-motion";

// Tech items for the scrolling marquee rows
const row1 = [
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "C++", icon: "devicon-cplusplus-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "Bash", icon: "devicon-bash-plain" },
  { name: "SQL", icon: "devicon-postgresql-plain colored" },
  { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
  { name: "PyTorch", icon: "devicon-pytorch-original colored" },
  { name: "OpenCV", icon: "devicon-opencv-plain colored" },
  { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored" },
];

const row2 = [
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
  { name: "Flask", icon: "devicon-flask-original" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "Raspberry Pi", icon: "devicon-raspberrypi-plain colored" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
];

const categories = [
  {
    tag: "Languages",
    items: [
      { name: "Python", level: 95, color: "#3776AB" },
      { name: "C / C++", level: 80, color: "#00599C" },
      { name: "TypeScript", level: 75, color: "#3178C6" },
      { name: "JavaScript", level: 78, color: "#F7DF1E" },
      { name: "Bash / Shell", level: 70, color: "#4EAA25" },
      { name: "SQL", level: 72, color: "#336791" },
    ],
  },
  {
    tag: "AI & ML",
    items: [
      { name: "TensorFlow / Keras", level: 85, color: "#FF6F00" },
      { name: "PyTorch", level: 80, color: "#EE4C2C" },
      { name: "OpenCV", level: 88, color: "#5C3EE8" },
      { name: "Scikit-learn", level: 82, color: "#F7931E" },
      { name: "YOLOv8", level: 85, color: "#00FFFF" },
      { name: "MediaPipe", level: 80, color: "#0F9D58" },
    ],
  },
  {
    tag: "Tools & Systems",
    items: [
      { name: "Linux / Raspberry Pi", level: 85, color: "#FCC624" },
      { name: "Docker", level: 75, color: "#2496ED" },
      { name: "FastAPI / Flask", level: 82, color: "#009688" },
      { name: "React / Next.js", level: 75, color: "#61DAFB" },
      { name: "Git / GitHub", level: 88, color: "#F05032" },
      { name: "MongoDB / PostgreSQL", level: 72, color: "#47A248" },
    ],
  },
];

function MarqueeRow({ items, direction }: { items: typeof row1; direction: "left" | "right" }) {
  const doubled = [...items, ...items]; // duplicate for seamless loop
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to right, var(--background), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to left, var(--background), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        className={direction === "left" ? "marquee-track marquee-left" : "marquee-track marquee-right"}
        style={{ display: "flex", gap: "1.25rem", padding: "0.5rem 0" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.6rem 1rem",
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              borderRadius: 10,
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          >
            <i
              className={item.icon}
              style={{ fontSize: "1.3rem", width: "1.3rem", textAlign: "center" }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--foreground-muted)",
                fontFamily: "'Fira Code', monospace",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-tag">// tech stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: 500 }}>
            Technologies I use to build intelligent, real-time systems.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3.5rem" }}
        >
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </motion.div>

        {/* Skill bars by category */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="skills-grid"
        >
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="card"
              style={{ padding: "1.5rem" }}
            >
              <div
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.75rem",
                  color: "var(--primary)",
                  letterSpacing: "0.08em",
                  marginBottom: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                {cat.tag}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {cat.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--foreground)" }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.7rem",
                          color: "var(--foreground-muted)",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 5,
                        borderRadius: 999,
                        background: "var(--border)",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: si * 0.05, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{
                          height: "100%",
                          borderRadius: 999,
                          background: `linear-gradient(90deg, var(--primary), ${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
