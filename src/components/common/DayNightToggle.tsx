"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playClickSound } from "@/lib/audio";

export function DayNightToggle() {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    try {
      playClickSound();
    } catch {
      // Audio fallback
    }
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`relative w-[68px] h-[32px] sm:w-[74px] sm:h-[34px] rounded-full p-1 cursor-pointer transition-colors duration-500 select-none overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-inner ${
        isDark
          ? "bg-gradient-to-r from-[#0b1021] via-[#101833] to-[#162244] border border-[#22355e] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 border border-sky-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
      }`}
      title={isDark ? "Switch to Day Mode (Light Theme)" : "Switch to Night Mode (Dark Theme)"}
      aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
    >
      {/* DAY SKY ELEMENTS (Clouds & Daylight Sparkles) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          y: isDark ? 10 : 0,
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Soft Fluffy Clouds */}
        <div className="absolute right-2 top-2.5 flex items-center">
          <div className="w-4 h-2.5 bg-white/90 rounded-full" />
          <div className="w-3 h-3 bg-white/95 rounded-full -ml-1.5 -mt-1" />
          <div className="w-2.5 h-2 bg-white/80 rounded-full -ml-1" />
        </div>
        <div className="absolute right-7 bottom-1.5 flex items-center opacity-70">
          <div className="w-3 h-1.5 bg-white/80 rounded-full" />
          <div className="w-2 h-2 bg-white/90 rounded-full -ml-1 -mt-0.5" />
        </div>
      </motion.div>

      {/* NIGHT SKY ELEMENTS (Twinkling Stars) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          y: isDark ? 0 : -10,
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Star 1 */}
        <motion.div
          animate={isDark ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute left-3 top-2 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
        />
        {/* Star 2 */}
        <motion.div
          animate={isDark ? { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: "easeInOut" }}
          className="absolute left-6 bottom-2 w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_4px_#38bdf8]"
        />
        {/* Star 3 (tiny) */}
        <motion.div
          animate={isDark ? { opacity: [0.4, 0.9, 0.4] } : {}}
          transition={{ repeat: Infinity, duration: 2.6, delay: 0.8, ease: "easeInOut" }}
          className="absolute left-8 top-2.5 w-0.5 h-0.5 bg-blue-200 rounded-full"
        />
      </motion.div>

      {/* SLIDING THUMB (SUN OR MOON) */}
      <motion.div
        className="relative z-10 w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] rounded-full flex items-center justify-center pointer-events-none"
        animate={{
          x: isDark ? (typeof window !== "undefined" && window.innerWidth < 640 ? 36 : 40) : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 480,
          damping: 28,
        }}
      >
        {isDark ? (
          /* GLOWING CRESCENT MOON */
          <motion.div
            key="moon"
            initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 45, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-white shadow-[0_0_10px_rgba(255,255,255,0.7)] flex items-center justify-center overflow-hidden"
          >
            {/* Moon Craters */}
            <div className="absolute top-1 left-2.5 w-1.5 h-1.5 rounded-full bg-slate-300/70" />
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-slate-300/60" />
            <div className="absolute top-2.5 right-1.5 w-1 h-1 rounded-full bg-slate-300/50" />
          </motion.div>
        ) : (
          /* RADIANT ROTATING SUN */
          <motion.div
            key="sun"
            initial={{ rotate: 45, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -45, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-yellow-300 shadow-[0_0_14px_rgba(251,191,36,0.9)] flex items-center justify-center"
          >
            {/* Rotating Sun Rays */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-0.5 h-[3px] bg-amber-400 rounded-full"
                  style={{
                    transform: `rotate(${deg}deg) translateY(-14px)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </button>
  );
}
