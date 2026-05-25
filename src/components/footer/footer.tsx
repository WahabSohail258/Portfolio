"use client";

import { motion } from "framer-motion";
import { Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#0a0a0a] py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-electric flex items-center justify-center shadow-glow-sm">
            <Code2 className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-bold gradient-text text-sm">WahabSohail</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/25 text-xs flex items-center gap-1.5"
        >
          Built with <Heart className="w-3 h-3 text-electric-500 fill-electric-500" /> using Next.js, Tailwind & Framer Motion
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/25 text-xs"
        >
          © {new Date().getFullYear()} Wahab Sohail. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
