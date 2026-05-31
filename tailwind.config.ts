import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#06b6d4",
        electric: "#3b82f6",
        "warm-bg": "#f8f5f0",
        "warm-card": "#f5f1eb",
        "warm-border": "#e5dfd6",
        charcoal: "#2d2a26",
        "charcoal-light": "#5c564e",
        "dark-bg": "#0c0c0c",
        "dark-card": "#111111",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["Fira Code", "Fira Mono", "monospace"],
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.4)" },
        },
      },
      maxWidth: {
        "7xl": "80rem",
        container: "1100px",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(37,99,235,0.2)",
        glow: "0 0 20px rgba(37,99,235,0.3)",
        "glow-lg": "0 0 40px rgba(37,99,235,0.25)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 10px 40px rgba(0,0,0,0.12)",
        "card-hover-dark": "0 10px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
