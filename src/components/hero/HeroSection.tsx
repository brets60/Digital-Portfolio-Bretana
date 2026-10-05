"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, Terminal, Sparkles, Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "@/components/common/MagneticButton";
import { TiltCard } from "@/components/common/TiltCard";
import { RoleSwitcher } from "@/components/hero/RoleSwitcher";
import { LiveStatusPill } from "@/components/common/LiveStatusPill";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <LiveStatusPill />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30">
                System Initialized
              </span>
              <span className="text-xs font-mono text-slate-500">v3.8.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.08]">
              Hi, I&apos;m <span className="text-gradient-cyan">{personalInfo.name}</span>
            </h1>

            <RoleSwitcher />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed font-light"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Interactive Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton
              href="#projects"
              className="rounded-xl overflow-hidden"
              dataCursor="scroll"
            >
              <div className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all">
                <span>Explore Featured Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="rounded-xl overflow-hidden"
              dataCursor="cli"
            >
              <div className="px-5 py-3.5 rounded-xl glass-panel-interactive text-slate-200 text-sm font-medium flex items-center gap-2 border border-white/10 hover:border-cyan-500/40">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs">Launch Terminal CLI</span>
              </div>
            </MagneticButton>

            <div className="flex items-center gap-2 pl-2">
              <MagneticButton
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                dataCursor="link"
              >
                <Github className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                dataCursor="link"
              >
                <Linkedin className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                dataCursor="mail"
              >
                <Mail className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 mt-6"
          >
            {personalInfo.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Holographic 3D Tilt Card with Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md"
          >
            {/* Ambient Backlight Aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-purple-600/25 to-amber-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

            <TiltCard maxTilt={10} glowColor="cyan" className="rounded-3xl">
              <div className="relative glass-panel rounded-3xl p-4 sm:p-5 border border-white/15 overflow-hidden shadow-2xl group">
                {/* Tech Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />

                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      IDENT // 0xJB-24
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    CREATIVE DEV
                  </span>
                </div>

                {/* Portrait Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10 shadow-inner">
                  <Image
                    src="/profile.jpg"
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Gradient vignettes to blend portrait into dark glass canvas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-purple-950/30 mix-blend-color" />

                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                  {/* Floating Overlay Badge on Portrait */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-heading font-semibold text-sm">
                          {personalInfo.name}
                        </p>
                        <p className="text-cyan-400 font-mono text-[11px]">
                          BSIT 4th Year // Software Engineer
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                        <Code2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> WebGL & Full Stack
                  </span>
                  <span className="text-slate-500">60 FPS Ready</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
