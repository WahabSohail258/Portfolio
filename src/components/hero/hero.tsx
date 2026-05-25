"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Eye } from "lucide-react";
import { useRef } from "react";

const ParticleCanvas = dynamic(
  () => import("./particle-canvas").then((m) => m.ParticleCanvas),
  { ssr: false }
);

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const firstName = "Wahab";
const lastName = "Sohail";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
        <ParticleCanvas />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-electric-500/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-electric text-electric-400 text-xs font-medium tracking-wider uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        {/* Name */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6 select-none">
          <div className="flex justify-center gap-[0.04em] overflow-hidden">
            {firstName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block gradient-text"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-center gap-[0.04em] overflow-hidden mt-1">
            {lastName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i + firstName.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block text-white"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/50 font-light mb-4 min-h-[36px]"
        >
          <TypeAnimation
            sequence={[
              "AI & ML Engineer",
              2000,
              "Computer Vision Engineer",
              2000,
              "Embedded Systems Developer",
              2000,
              "Full Stack Developer",
              2000,
              "Edge Computing Specialist",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-electric-400 font-medium"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Computer Engineering graduate from NUST — building AI-powered systems,
          real-time computer vision pipelines, and scalable full-stack applications.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            id="view-my-work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary text-white w-full sm:w-auto"
          >
            <Eye className="w-4 h-4" />
            View My Work
          </a>
          <a href="/Wahab_Resume.pdf" download id="download-cv" className="btn-secondary w-full sm:w-auto">
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex items-center justify-center gap-8 md:gap-12 text-center"
        >
          {[
            { value: "2+", label: "Internships" },
            { value: "6+", label: "Projects" },
            { value: "NUST", label: "Graduate" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-2xl font-bold gradient-text">{stat.value}</span>
              <span className="text-white/40 text-xs mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-electric-500/50"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
