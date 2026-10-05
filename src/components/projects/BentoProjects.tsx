"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Cpu, Eye, Sparkles, Camera, ShieldAlert, Activity } from "lucide-react";
import { projects } from "@/lib/data";
import { Project } from "@/types";
import { TiltCard } from "@/components/common/TiltCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { playClickSound } from "@/lib/audio";

export function BentoProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Selected Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-cyan">Engineering Projects</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed font-light">
          An asymmetric bento collection of intelligent traffic computer vision, logistics scheduling engines, and academic event management systems.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {projects.map((project) => {
          const isLarge = project.id === "speed-detection-system";

          return (
            <div
              key={project.id}
              className={`${project.bentoSpan} flex`}
            >
              <TiltCard
                maxTilt={isLarge ? 5 : 8}
                glowColor={
                  project.accentColor === "cyan"
                    ? "cyan"
                    : project.accentColor === "violet"
                    ? "violet"
                    : project.accentColor === "amber"
                    ? "amber"
                    : "emerald"
                }
                className="w-full h-full rounded-3xl"
              >
                <div
                  onClick={() => handleOpenProject(project)}
                  className="glass-panel-interactive h-full w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                  data-cursor-text="VIEW"
                >
                  {/* Subtle Corner Tech Notches */}
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <polygon points="0,0 100,0 100,100" fill="currentColor" className="text-cyan-500/20" />
                      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(0,240,255,0.4)" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Header: Identifier & Action Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          PROJ // {project.id.slice(0, 8)}
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1">
                      {project.subtitle}
                    </p>

                    <p className="text-slate-300 text-sm mt-3.5 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Interactive Visual Graphic Area for Large Card */}
                  {isLarge && (
                    <div className="my-6 relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-obsidian-950/90 border border-cyan-500/30 flex flex-col justify-between p-4 group/canvas">
                      {/* Decorative Grid & Radar Crosshairs */}
                      <div className="absolute inset-0 cyber-dots opacity-40 pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline pointer-events-none" />
                      
                      {/* Top CCTV HUD status */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
                          <span className="text-rose-400 font-bold tracking-wider">REC ● RTSP://CCTV-CAM-01</span>
                        </div>
                        <span className="text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          AI YOLOv8 ENGINE
                        </span>
                      </div>

                      {/* Center Graphical HUD & Speed Radar */}
                      <div className="relative z-10 flex flex-col items-center justify-center my-auto gap-2 text-center">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover/canvas:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                            <Camera className="w-6 h-6" />
                          </div>
                          <div className="text-left font-mono">
                            <div className="text-xs text-slate-400 uppercase tracking-widest">VEHICLE VELOCITY</div>
                            <div className="text-xl sm:text-2xl font-heading font-extrabold text-white flex items-center gap-2">
                              <span className="text-cyan-300">62.4 KM/H</span>
                              <span className="text-[10px] text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/30 uppercase">
                                SPEED ALERT
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pedestrian Warning Alarm Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>PEDESTRIAN ZONE ACTIVE // AUDIO-VISUAL STROBE ARMED</span>
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                        <span className="text-cyan-400">FPS: 60 // PING: 18MS</span>
                        <span className="text-slate-500">[CLICK CARD FOR SYSTEM ARCHITECTURE]</span>
                      </div>
                    </div>
                  )}

                  {/* Metrics Badges */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {project.metrics.slice(0, isLarge ? 3 : 2).map((m, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {m.label}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-200">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
