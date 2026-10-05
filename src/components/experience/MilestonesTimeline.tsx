"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { milestones } from "@/lib/data";
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { TiltCard } from "@/components/common/TiltCard";

export function MilestonesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Career Trajectory
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Experience & <span className="text-gradient-multi">Milestones</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed font-light">
          A track record of engineering leadership, distributed platform scaling, and creative innovation across industry leaders.
        </p>
      </div>

      {/* Timeline Track Container */}
      <div ref={containerRef} className="relative">
        {/* Background Track Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        {/* Dynamic Scroll-Scrubbed Neon Wire */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-emerald-400 -translate-x-1/2 shadow-[0_0_12px_#00F0FF]"
        />

        {/* Milestone Entries */}
        <div className="space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8 md:gap-0`}
              >
                {/* Glowing Center Checkpoint Node */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="relative">
                    <span className="animate-ping absolute inset-0 rounded-full bg-cyan-400 opacity-60" />
                    <div className="w-7 h-7 rounded-full bg-obsidian-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00F0FF]">
                      <div className="w-2 h-2 rounded-full bg-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Milestone Content Card */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pl-12 text-left" : "md:pr-12 text-left"
                  }`}
                >
                  <TiltCard
                    maxTilt={6}
                    glowColor={
                      item.accent === "cyan"
                        ? "cyan"
                        : item.accent === "violet"
                        ? "violet"
                        : "amber"
                    }
                    className="rounded-3xl"
                  >
                    <div className="glass-panel-interactive p-6 sm:p-8 rounded-3xl border border-white/10 group">
                      {/* Meta info bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 mb-4">
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/20 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>

                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>

                      <div className="flex items-center gap-2 text-sm font-mono text-slate-400 mt-1 mb-4">
                        <Briefcase className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-violet-300 font-medium">{item.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">{item.period}</span>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed mb-5 font-light">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2.5 mb-6">
                        {item.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                        {item.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
