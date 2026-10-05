"use client";

import { motion } from "framer-motion";
import { User, Smile, GraduationCap, Calendar, Cpu, Briefcase } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function AboutSection() {
  const details = [
    {
      label: "FULL NAME",
      value: DEVELOPER_PROFILE.fullName,
      icon: User,
    },
    {
      label: "NICKNAME",
      value: DEVELOPER_PROFILE.nickname,
      icon: Smile,
    },
    {
      label: "COURSE",
      value: DEVELOPER_PROFILE.course,
      icon: GraduationCap,
    },
    {
      label: "YEAR LEVEL",
      value: DEVELOPER_PROFILE.yearLevel,
      icon: Calendar,
    },
    {
      label: "FIELD",
      value: DEVELOPER_PROFILE.field,
      icon: Cpu,
    },
    {
      label: "CAREER GOAL",
      value: DEVELOPER_PROFILE.careerGoal,
      icon: Briefcase,
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-16 space-y-3"
      >
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          GET TO KNOW ME
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About Me
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
          A glimpse into my background, academic focus, and career goals.
        </p>
      </motion.div>

      {/* Main Narrative Card with Left Accent Border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0e1629] border border-[#1b2746] border-l-4 border-l-blue-500 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl transition-all duration-300 hover:shadow-blue-900/10 hover:border-[#22355e]"
      >
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
          {DEVELOPER_PROFILE.aboutIntro}
        </p>
      </motion.div>

      {/* 6 Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {details.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-[#0e1629] border border-[#1b2746] hover:border-blue-500/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-950/20 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  {item.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5 group-hover:text-blue-300 transition-colors">
                  {item.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
