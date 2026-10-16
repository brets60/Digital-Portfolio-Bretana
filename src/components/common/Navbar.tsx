"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";
import { DayNightToggle } from "@/components/common/DayNightToggle";
import { isAudioEnabled, toggleAudio } from "@/lib/audio";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Capstone", href: "#capstone" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Services", href: "#services" },
    { label: "References", href: "#references" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    setSoundEnabled(isAudioEnabled());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        "home",
        "about",
        "skills",
        "projects",
        "capstone",
        "education",
        "experience",
        "achievements",
        "services",
        "references",
        "contact",
      ];
      const scrollPos = window.scrollY + 180;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleAudio();
    setSoundEnabled(nextState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#17223b] py-3.5 shadow-sm dark:shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1 group">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans transition-colors">
            BRETS
          </span>
          <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Sound + Theme + Mobile Menu Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleSoundToggle}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#11192e] border border-slate-200 dark:border-[#1e2d4f] hover:border-blue-500/50 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Toggle Sound"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Day & Night Animated Toggle Switch */}
          <DayNightToggle />

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#11192e] border border-slate-200 dark:border-[#1e2d4f] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-[#0a1020]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#1b2848] px-6 py-4 space-y-2 mt-2 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border-b border-slate-100 dark:border-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
