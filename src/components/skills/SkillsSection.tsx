"use client";

import { Code2, Globe, Database, Cpu, Wrench } from "lucide-react";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "PHP"],
    },
    {
      title: "Web & Frontend",
      icon: Globe,
      skills: ["HTML5", "CSS3", "Tailwind CSS", "React", "Next.js", "Responsive UI"],
    },
    {
      title: "Backend & Databases",
      icon: Database,
      skills: ["SQLite", "MySQL", "PostgreSQL", "Node.js", "REST APIs"],
    },
    {
      title: "Hardware & IoT",
      icon: Cpu,
      skills: ["Arduino", "ESP32-CAM", "RF Modules", "CCTV Integration", "Microcontrollers", "Sensors"],
    },
    {
      title: "Frameworks & Developer Tools",
      icon: Wrench,
      skills: ["VS Code", "Git", "GitHub", "OpenCV", "YOLOv8", "CustomTkinter", "Tkinter"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          TECHNICAL ARSENAL
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Skills & Technologies
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Comprehensive toolkit across hardware, software, and systems development.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.title}
              className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-xl group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-[#121c33] border border-slate-200 dark:border-[#1e2f56] text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-400/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
