"use client";

import { ArrowUp, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "@/components/common/MagneticButton";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-obsidian-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Name and Attribution */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-white text-base">
              {personalInfo.name}
            </span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
              PORTFOLIO 2026
            </span>
          </div>

          <p className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Designed & Engineered with Next.js, Three.js, Matter.js & Web Audio API
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            dataCursor="link"
          >
            <Github className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            dataCursor="link"
          >
            <Linkedin className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            dataCursor="mail"
          >
            <Mail className="w-4 h-4" />
          </MagneticButton>
        </div>

        {/* Right: Back to Top Button */}
        <div>
          <MagneticButton
            onClick={scrollToTop}
            className="rounded-xl overflow-hidden"
            dataCursor="top"
          >
            <div className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-slate-300 flex items-center gap-2 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
