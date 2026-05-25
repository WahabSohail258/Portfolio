"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { experiences } from "@/data/experience";

const typeStyle: Record<string, string> = {
  work: "border-electric-500/50 bg-electric-500/10 text-electric-400",
  education: "border-purple-500/50 bg-purple-500/10 text-purple-400",
  leadership: "border-amber-500/50 bg-amber-500/10 text-amber-400",
};

const typeLabel: Record<string, string> = {
  work: "Work",
  education: "Education",
  leadership: "Leadership",
};

function TimelineItem({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 md:gap-8">
      {/* Left content (desktop) */}
      <div className={`hidden md:block w-[calc(50%-2rem)] ${isLeft ? "" : "invisible"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-electric-500/20 transition-all duration-300 hover:shadow-card group"
          >
            <TimelineCard exp={exp} />
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center flex-shrink-0 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${typeStyle[exp.type]}`}
        >
          {exp.type === "education" ? (
            <GraduationCap className="w-4 h-4" />
          ) : exp.type === "leadership" ? (
            <span className="text-sm">⭐</span>
          ) : (
            <Briefcase className="w-4 h-4" />
          )}
        </motion.div>
      </div>

      {/* Right content (desktop) / Mobile full-width */}
      <div className={`flex-1 md:w-[calc(50%-2rem)] md:flex-none pb-8 ${isLeft ? "md:invisible md:hidden" : ""}`}>
        {/* Mobile: always show, Desktop: only show if right-aligned */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-electric-500/20 transition-all duration-300 hover:shadow-card group ml-4 md:ml-0"
        >
          {/* Show on mobile always, show on desktop only if right-aligned */}
          <div className={!isLeft ? "" : "md:hidden"}>
            <TimelineCard exp={exp} />
          </div>
        </motion.div>
      </div>

      {/* Right desktop */}
      {isLeft && (
        <div className="hidden md:block w-[calc(50%-2rem)]" />
      )}
    </div>
  );
}

function TimelineCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display font-bold text-white text-base leading-tight">{exp.role}</h3>
          <p className="text-electric-400 text-sm font-medium mt-0.5">{exp.company}</p>
        </div>
        <span className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-medium ${
          exp.type === "education"
            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
            : exp.type === "leadership"
            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            : "bg-electric-500/10 text-electric-400 border border-electric-500/20"
        }`}>
          {typeLabel[exp.type]}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mb-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {exp.startDate} – {exp.endDate}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {exp.location}
        </span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {exp.description.map((item, i) => (
          <li key={i} className="text-white/50 text-sm flex items-start gap-2">
            <span className="text-electric-500 mt-1.5 flex-shrink-0 text-[6px]">●</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {exp.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium glass-electric text-electric-400 border border-electric-500/20">
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

export function Timeline() {
  return (
    <section id="experience" className="section-padding bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionWrapper className="text-center mb-16">
          <p className="text-electric-400 text-sm font-medium tracking-widest uppercase mb-3">My journey</p>
          <h2 className="section-heading">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-electric mx-auto mt-4" />
        </SectionWrapper>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] timeline-line md:-translate-x-px" />

          <div className="space-y-6 md:space-y-0">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
