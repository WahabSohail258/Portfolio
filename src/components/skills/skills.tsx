"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { skills, techIcons } from "@/data/skills";

type Category = "languages" | "aiml" | "tools";
const categories: { key: Category; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "aiml", label: "AI & ML" },
  { key: "tools", label: "Tools & Systems" },
];

function SkillBar({ name, level, icon, delay }: { name: string; level: number; icon: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-white/80">{name}</span>
        </div>
        <span className="text-xs text-electric-400 font-mono">{level}%</span>
      </div>
      <div className="h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="skill-bar-fill h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("languages");
  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-[#111111] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/3 -translate-y-1/3 bg-electric-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="text-center mb-16">
          <p className="text-electric-400 text-sm font-medium tracking-widest uppercase mb-3">What I work with</p>
          <h2 className="section-heading">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-electric mx-auto mt-4" />
        </SectionWrapper>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div>
            {/* Category tabs */}
            <div className="flex gap-2 mb-8 p-1 glass rounded-xl border border-white/[0.06] w-fit">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  id={`skill-tab-${cat.key}`}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-electric-600 text-white shadow-glow-sm"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {filtered.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tech Icons Grid */}
          <SectionWrapper direction="right" delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-white/70 mb-6">Technologies I love</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="glass rounded-xl p-3 border border-white/[0.06] flex flex-col items-center gap-2 cursor-default group transition-all duration-300 hover:border-electric-500/30"
                    style={{
                      "--glow-color": tech.color,
                    } as React.CSSProperties}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: `${tech.color}15`,
                        color: tech.color,
                        border: `1px solid ${tech.color}25`,
                      }}
                    >
                      {tech.name.slice(0, 2)}
                    </div>
                    <span className="text-white/50 text-[10px] font-medium text-center leading-tight group-hover:text-white/80 transition-colors duration-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
