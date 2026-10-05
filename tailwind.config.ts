import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        obsidian: {
          950: "#090A0F",
          900: "#0D111A",
          850: "#101622",
          800: "#151C2A",
          700: "#1E273A",
          600: "#2B364E",
        },
        neon: {
          cyan: "#00F0FF",
          violet: "#9D4EDD",
          purple: "#7928CA",
          amber: "#FFB703",
          emerald: "#10B981",
          rose: "#FF007F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 30px -5px rgba(0, 240, 255, 0.35)",
        "glow-violet": "0 0 30px -5px rgba(157, 78, 221, 0.35)",
        "glow-amber": "0 0 30px -5px rgba(255, 183, 3, 0.35)",
        "glow-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "border-glow": "borderGlow 3s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        borderGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
