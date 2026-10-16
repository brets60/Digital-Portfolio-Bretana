"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FileText,
  Mail,
  Sparkles,
  Monitor,
  Cpu,
  Database,
  Layers,
  Terminal,
} from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function HeroSection() {
  const [careerIndex, setCareerIndex] = useState(0);

  const careerPositions = [
    {
      title: "Aspiring Software Developer",
      badge: "Target Position",
      icon: Code2,
      gradient: "from-blue-400 via-cyan-300 to-blue-500",
      accentBorder: "border-blue-500/40",
      accentBg: "bg-blue-500/10",
      accentText: "text-blue-400",
    },
    {
      title: "Desktop Application Developer",
      badge: "Core Expertise",
      icon: Monitor,
      gradient: "from-cyan-400 via-teal-300 to-blue-400",
      accentBorder: "border-cyan-500/40",
      accentBg: "bg-cyan-500/10",
      accentText: "text-cyan-400",
    },
    {
      title: "IoT & Hardware Integration Specialist",
      badge: "Capstone Lead",
      icon: Cpu,
      gradient: "from-emerald-400 via-cyan-300 to-teal-400",
      accentBorder: "border-emerald-500/40",
      accentBg: "bg-emerald-500/10",
      accentText: "text-emerald-400",
    },
    {
      title: "Database & Systems Developer",
      badge: "Technical Field",
      icon: Database,
      gradient: "from-indigo-400 via-blue-300 to-cyan-400",
      accentBorder: "border-indigo-500/40",
      accentBg: "bg-indigo-500/10",
      accentText: "text-indigo-400",
    },
    {
      title: "Full-Stack & AI Systems Developer",
      badge: "Core Specialization",
      icon: Sparkles,
      gradient: "from-amber-400 via-orange-300 to-yellow-400",
      accentBorder: "border-amber-500/40",
      accentBg: "bg-amber-500/10",
      accentText: "text-amber-400",
    },
  ];

  // Auto-cycle through positions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCareerIndex((prev) => (prev + 1) % careerPositions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [careerPositions.length]);

  const activePosition = careerPositions[careerIndex];
  const Icon = activePosition.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Hardware-Accelerated Ambient Glows */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Headlines & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start space-y-6"
        >
          {/* Welcome Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Welcome to my Portfolio</span>
          </motion.div>

          {/* Heading with Name & Animated Future Work / Position */}
          <motion.div variants={itemVariants} className="space-y-4 w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500">
                {DEVELOPER_PROFILE.name}
              </span>
            </h1>

            {/* ANIMATED POSITION & FUTURE WORK DISPLAY */}
            <div className="relative min-h-[58px] flex flex-col justify-center pt-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePosition.title}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 flex-wrap"
                >
                  {/* Position Tag / Capsule */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono font-medium shadow-sm transition-colors ${activePosition.accentBg} ${activePosition.accentBorder} ${activePosition.accentText}`}
                  >
                    <Icon className="w-3.5 h-3.5 animate-pulse" />
                    <span>{activePosition.badge}</span>
                  </span>

                  {/* High-Impact Gradient Title */}
                  <span
                    className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${activePosition.gradient}`}
                  >
                    {activePosition.title}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Animated Progress Indicator Bar Underneath */}
              <div className="w-44 h-1 bg-slate-200 dark:bg-[#14203d] rounded-full overflow-hidden mt-3 transition-colors">
                <motion.div
                  key={careerIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1 transition-colors"
          >
            {DEVELOPER_PROFILE.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative group px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <Code2 className="w-4 h-4" />
              <span>View My Projects</span>
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#0f172a]/70 hover:bg-slate-100 dark:hover:bg-[#1e293b] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3a5b] hover:border-blue-400/50 font-medium text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>View Resume</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#0f172a]/70 hover:bg-slate-100 dark:hover:bg-[#1e293b] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3a5b] hover:border-blue-400/50 font-medium text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Contact Me</span>
            </motion.a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8"
          >
            {DEVELOPER_PROFILE.stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3, borderColor: "rgba(59, 130, 246, 0.5)" }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] rounded-2xl p-4 flex flex-col items-start transition-colors shadow-sm dark:shadow-none"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Framed Portrait Photo with Floating Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-[0_0_35px_rgba(37,99,235,0.2)] dark:shadow-[0_0_40px_rgba(37,99,235,0.3)] bg-slate-100 dark:bg-[#0c1324] group transition-all duration-500 hover:shadow-[0_0_45px_rgba(37,99,235,0.35)] dark:hover:shadow-[0_0_55px_rgba(37,99,235,0.45)]">
            <Image
              src="/profile.jpg"
              alt={DEVELOPER_PROFILE.name}
              fill
              priority
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 340px"
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-[#090e1b]/85 via-transparent to-transparent pointer-events-none" />

            {/* Available for Projects Badge */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0b1224]/90 border border-slate-200 dark:border-[#22355e] backdrop-blur-md shadow-lg whitespace-nowrap"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {DEVELOPER_PROFILE.status}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
