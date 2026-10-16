"use client";

import {
  Monitor,
  Globe,
  Database,
  Settings,
  Layout,
  Cpu,
  FileText,
  Wrench,
} from "lucide-react";
import { SERVICES } from "@/lib/data";

export function ServicesSection() {
  const iconMap: Record<string, any> = {
    Monitor,
    Globe,
    Database,
    Settings,
    Layout,
    Cpu,
    FileText,
    Wrench,
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          CAPABILITIES & SERVICES
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          What I Can Do
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Core IT services and developer capabilities.
        </p>
      </div>

      {/* Services 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.iconName] || Monitor;

          return (
            <div
              key={service.id}
              className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                {service.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
