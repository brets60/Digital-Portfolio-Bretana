"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowRight, ExternalLink, Github, Sparkles, Terminal } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { Project } from "@/types";
import { playClickSound } from "@/lib/audio";

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Track vertical scroll progress inside this 300vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform 0-1 vertical scroll into horizontal translation
  const showcaseProjects = projects.slice(0, 3);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(showcaseProjects.length - 1) * 75}%`]);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-obsidian-950">
      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Title & Progress Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-violet-400" />
              <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">
                Interactive Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Landmark <span className="text-gradient-violet">Architectures</span>
            </h2>
          </div>

          {/* Scroll Progress Bar */}
          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden self-start sm:self-auto">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
            />
          </div>
        </div>

        {/* Horizontal Moving Cards Track */}
        <div className="relative w-full overflow-visible">
          <motion.div
            style={{ x }}
            className="flex gap-8 items-stretch cursor-grab active:cursor-grabbing will-change-transform"
          >
            {showcaseProjects.map((project, index) => (
              <div
                key={project.id}
                className="w-[85vw] sm:w-[680px] lg:w-[780px] shrink-0 glass-panel-interactive rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden flex flex-col justify-between group shadow-2xl"
              >
                {/* Background Ambient Glow */}
                <div
                  className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
                    index === 0
                      ? "bg-cyan-500"
                      : index === 1
                      ? "bg-violet-600"
                      : "bg-amber-500"
                  }`}
                />

                {/* Top Info Bar */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">
                      CASE STUDY 0{index + 1} // {project.tags[0].toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      FLAGSHIP RELEASE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm font-mono text-cyan-400/90 mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Architecture Highlights & Metrics */}
                <div className="space-y-6 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[11px] font-mono text-slate-400">
                          {m.label}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <MagneticButton
                        onClick={() => {
                          playClickSound();
                          setSelectedProject(project);
                        }}
                        className="rounded-xl overflow-hidden"
                      >
                        <div className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs flex items-center gap-2 hover:bg-cyan-300 transition-colors">
                          <span>Inspect Deep Dive</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </MagneticButton>

                      <MagneticButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl overflow-hidden"
                      >
                        <div className="px-4 py-2.5 rounded-xl glass-panel text-slate-200 text-xs font-mono flex items-center gap-2 border border-white/15 hover:border-cyan-400/40">
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Live Site</span>
                        </div>
                      </MagneticButton>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Instruction Hint */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Scroll down to advance showcase horizontally
          </span>
          <span>[3 FLAGSHIP CASE STUDIES]</span>
        </div>
      </div>

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
