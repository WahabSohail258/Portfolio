"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { MapPin, GraduationCap } from "lucide-react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const startedRef = useRef(false);

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = (now - startTime) / (duration * 1000);
        const progress = Math.min(elapsed, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 2, suffix: "+", label: "Internships" },
  { value: 6, suffix: "+", label: "Projects Delivered" },
  { value: 7, suffix: "+", label: "Technologies" },
  { value: 2026, suffix: "", label: "NUST Graduate" },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 bg-electric-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="text-center mb-16">
          <p className="text-electric-400 text-sm font-medium tracking-widest uppercase mb-3">Get to know me</p>
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-electric mx-auto mt-4" />
        </SectionWrapper>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Bio */}
          <SectionWrapper direction="left">
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="font-display text-2xl font-bold mb-4 text-white">
                  Hi, I&apos;m Wahab 👋
                </h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  I&apos;m a <span className="text-electric-400 font-medium">Computer Engineering graduate from NUST</span>,
                  specializing in AI systems, computer vision, and real-time embedded applications —
                  based in <span className="text-white font-medium">Rawalpindi, Pakistan</span>.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  I design and build <span className="text-white font-medium">intelligent, production-grade software</span> —
                  from edge AI pipelines running on Raspberry Pi and Jetson Nano, to full-stack web
                  applications with real-time data streaming. My work spans the full spectrum from
                  low-level hardware integration to cloud-ready APIs.
                </p>
                <p className="text-white/60 leading-relaxed">
                  I bring hands-on experience from internships at <span className="text-white font-medium">RISETech</span> and
                  the <span className="text-white font-medium">National Centre of Robotics and Automation (NCRA)</span>,
                  where I contributed to AI research, biomedical solutions, and embedded system deployments.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Python", "C++", "PyTorch", "OpenCV", "Linux", "Raspberry Pi", "Next.js", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass-electric text-electric-400 border border-electric-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-primary text-white text-sm"
                >
                  Get in Touch
                </a>
                <a href="/resume.pdf" download className="btn-secondary text-sm">
                  Download Resume
                </a>
              </div>
            </div>
          </SectionWrapper>

          {/* Right — Stats */}
          <SectionWrapper direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-electric-500/30 transition-all duration-300 hover:shadow-glow-sm text-center"
                >
                  <div className="font-display text-3xl font-black gradient-text mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/50 text-sm leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-5 border border-white/[0.06] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-electric flex items-center justify-center shadow-glow flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">B.Sc. Computer Engineering</p>
                  <p className="text-electric-400 text-xs">NUST — Class of 2026</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="glass rounded-2xl p-5 border border-white/[0.06] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-electric-600/10 border border-electric-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-electric-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Based in</p>
                  <p className="text-white/50 text-xs">Rawalpindi, Pakistan — Open to remote & relocation</p>
                </div>
              </motion.div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
