"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Code2, FileText, Mail } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = DEVELOPER_PROFILE.roles;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextChar = isDeleting
        ? currentRole.substring(0, displayedText.length - 1)
        : currentRole.substring(0, displayedText.length + 1);

      timeout = setTimeout(
        () => setDisplayedText(nextChar),
        isDeleting ? 40 : 90
      );
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide">
            <span>Welcome to my Portfolio</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Hi, I&apos;m {DEVELOPER_PROFILE.name}
            </h1>

            {/* Dynamic Typing Role */}
            <div className="text-xl sm:text-2xl font-semibold text-blue-400 flex items-center min-h-[36px]">
              <span>{displayedText}</span>
              <span className="w-0.5 h-6 bg-blue-400 ml-1 animate-pulse" />
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            {DEVELOPER_PROFILE.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Code2 className="w-4 h-4" />
              <span>View My Projects</span>
            </a>

            <a
              href="#about"
              className="px-5 py-2.5 rounded-xl bg-[#0f172a]/70 hover:bg-[#1e293b] text-slate-200 border border-[#2b3a5b] hover:border-blue-400/50 font-medium text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View Resume</span>
            </a>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-[#0f172a]/70 hover:bg-[#1e293b] text-slate-200 border border-[#2b3a5b] hover:border-blue-400/50 font-medium text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8">
            {DEVELOPER_PROFILE.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0e1629] border border-[#1b2746] rounded-2xl p-4 flex flex-col items-start transition-all hover:border-blue-500/40"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-medium mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Framed Portrait Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-[0_0_35px_rgba(37,99,235,0.22)] bg-[#0c1324] group">
            <Image
              src="/profile.jpg"
              alt={DEVELOPER_PROFILE.name}
              fill
              priority
              className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 340px"
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1b]/80 via-transparent to-transparent pointer-events-none" />

            {/* Available for Projects Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b1224]/90 border border-[#22355e] backdrop-blur-md shadow-lg whitespace-nowrap">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">
                {DEVELOPER_PROFILE.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
