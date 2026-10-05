"use client";

import { useState } from "react";
import { Terminal, Send, Mail, MapPin, Copy, Check, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { InteractiveTerminal } from "@/components/contact/InteractiveTerminal";
import { KineticContactForm } from "@/components/contact/KineticContactForm";
import { playClickSound } from "@/lib/audio";

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<"terminal" | "form">("terminal");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Direct Uplink
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Initiate <span className="text-gradient-cyan">Communications</span>
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 self-start md:self-auto border border-white/10">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab("terminal");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              activeTab === "terminal"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            data-cursor="pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Terminal</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab("form");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
              activeTab === "form"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            data-cursor="pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kinetic Form</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Coordinates Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                DISPATCH COORDINATES
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-500 block mb-1">
                  DIRECT EMAIL
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950/60 border border-white/10">
                  <span className="text-xs sm:text-sm font-mono text-cyan-300 truncate">
                    {personalInfo.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                    data-cursor="pointer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 block mb-1">
                  HEADQUARTERS & TIMEZONE
                </label>
                <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/10 flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 block mb-1">
                  AVAILABILITY STATUS
                </label>
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 font-mono flex items-center gap-2">
                  <span>{personalInfo.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed View (Terminal or Kinetic Form) */}
        <div className="lg:col-span-8">
          {activeTab === "terminal" ? (
            <InteractiveTerminal />
          ) : (
            <KineticContactForm />
          )}
        </div>
      </div>
    </section>
  );
}
