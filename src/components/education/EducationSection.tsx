"use client";

import { GraduationCap, Building } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          ACADEMIC BACKGROUND
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Education
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Academic journey and IT degree progression.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-3xl mx-auto relative pl-8 sm:pl-12 border-l-2 border-slate-200 dark:border-[#1c2c4f] space-y-12 transition-colors">
        {EDUCATION.map((edu, idx) => (
          <div key={edu.id} className="relative group">
            {/* Timeline Indicator Dot */}
            <div className="absolute -left-[41px] sm:-left-[57px] top-5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-[#070c18] shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-colors" />

            {/* Education Card */}
            <div className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl">
              {/* Period Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
                {edu.period}
              </div>

              {/* Title & Institution */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 leading-snug transition-colors">
                {edu.degree}
              </h3>

              <div className="text-sm font-medium text-blue-600 dark:text-blue-400/90 mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{edu.institution}</span>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal transition-colors">
                {edu.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2">
                {edu.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#121c33] text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1d2d52] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
