"use client";

import {
  Radio,
  Laptop,
  Cpu,
  Database,
  Code,
  Layers,
  Hammer,
} from "lucide-react";
import { EXPERIENCES } from "@/lib/data";

export function ExperienceSection() {
  const iconMap: Record<string, any> = {
    Radio,
    Laptop,
    Cpu,
    Database,
    Code,
    Layers,
    Hammer,
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          ACADEMIC & PROJECT WORK
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Experience & Activities
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Hands-on project development and academic experiences.
        </p>
      </div>

      {/* Grid of Experience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIENCES.map((exp) => {
          const Icon = iconMap[exp.iconName] || Code;

          return (
            <div
              key={exp.id}
              className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                {exp.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
