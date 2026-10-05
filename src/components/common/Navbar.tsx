"use client";

import { useState, useEffect } from "react";
import { SoundToggle } from "@/components/common/SoundToggle";
import { MagneticButton } from "@/components/common/MagneticButton";
import { personalInfo } from "@/lib/data";
import { Code2, Menu, X, Terminal } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Arsenal", href: "#skills" },
    { label: "Trajectory", href: "#experience" },
    { label: "Certificates", href: "#certificates" },
    { label: "Uplink", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-panel px-5 py-3 border border-white/15 shadow-2xl backdrop-blur-xl"
            : "px-2 py-2 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <MagneticButton href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Code2 className="w-4 h-4 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-white">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                JB // BSIT-4
              </span>
            </div>
          </MagneticButton>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <MagneticButton
                key={link.label}
                href={link.href}
                className="px-3.5 py-1 text-xs font-mono text-slate-300 hover:text-cyan-300 rounded-full transition-colors"
                dataCursor="pointer"
              >
                <span>{link.label}</span>
              </MagneticButton>
            ))}
          </nav>

          {/* Right Controls: Sound Toggle + Contact Button */}
          <div className="flex items-center gap-3">
            <SoundToggle />

            <MagneticButton
              href="#contact"
              className="hidden sm:inline-block rounded-xl overflow-hidden"
              dataCursor="contact"
            >
              <div className="px-4 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-1.5 transition-colors">
                <Terminal className="w-3.5 h-3.5" />
                <span>Uplink CLI</span>
              </div>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
