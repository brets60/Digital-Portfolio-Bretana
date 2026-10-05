"use client";

import { ArrowUp, Github, Mail, Facebook } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[#172340] bg-[#070b14] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Logo & Attribution */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-white text-lg tracking-tight font-sans">
              BRETS
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-xs text-slate-400 ml-2">
              — {DEVELOPER_PROFILE.fullName}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} John Michael Bretaña. Built with Next.js & Tailwind CSS.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={`https://${DEVELOPER_PROFILE.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#0f172a] border border-[#1e2a4a] hover:border-blue-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#0f172a] border border-[#1e2a4a] hover:border-blue-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Facebook Profile"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${DEVELOPER_PROFILE.contact.email}`}
            className="w-10 h-10 rounded-xl bg-[#0f172a] border border-[#1e2a4a] hover:border-blue-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors"
        >
          <span>Back to Top</span>
          <div className="w-8 h-8 rounded-lg bg-[#0e1629] border border-[#1e2d50] flex items-center justify-center text-blue-400">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
}
