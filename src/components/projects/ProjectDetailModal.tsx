"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { Project } from "@/types";
import { playModalCloseSound, playModalOpenSound } from "@/lib/audio";
import { MagneticButton } from "@/components/common/MagneticButton";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (project) {
      playModalOpenSound();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project]);

  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-obsidian-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-auto overflow-hidden"
        >
          {/* Top ambient color bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400" />

          {/* Close Button */}
          <div className="absolute top-5 right-5 z-20">
            <MagneticButton
              onClick={handleClose}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors"
              dataCursor="close"
            >
              <X className="w-5 h-5" />
            </MagneticButton>
          </div>

          {/* Modal Header */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                System Specification
              </span>
              <span className="text-xs font-mono text-slate-500">
                ID: {project.id.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
              {project.title}
            </h2>

            <p className="text-base text-cyan-300 font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="py-6 space-y-8 max-h-[65vh] overflow-y-auto pr-2">
            {/* System Overview */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Architecture Overview
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Performance Benchmarks */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Performance Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl glass-panel border-white/10 flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-slate-400">
                      {metric.label}
                    </span>
                    <span className="text-lg font-heading font-bold text-white mt-1">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Highlights & Architecture Stack */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-400" /> Engineering Innovations
              </h3>
              <ul className="space-y-2.5">
                {project.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                Technologies & Standards
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MagneticButton
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl overflow-hidden"
              >
                <div className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </MagneticButton>

              <MagneticButton
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl overflow-hidden"
              >
                <div className="px-4 py-2.5 rounded-xl glass-panel text-slate-200 text-xs font-mono flex items-center gap-2 border border-white/15 hover:border-white/30">
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </div>
              </MagneticButton>
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              [Press ESC to close]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
