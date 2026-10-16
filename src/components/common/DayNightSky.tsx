"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function DayNightSky() {
  const { isDark } = useTheme();

  // Generate deterministic stars so they don't cause hydration mismatch
  const stars = useMemo(() => {
    const starList = [];
    const seedValues = [
      { x: 5, y: 12, size: 2, delay: 0.2, duration: 2.5 },
      { x: 12, y: 35, size: 1.5, delay: 0.8, duration: 3.2 },
      { x: 18, y: 8, size: 2.5, delay: 1.2, duration: 2.8 },
      { x: 25, y: 45, size: 1, delay: 0.4, duration: 2.1 },
      { x: 32, y: 20, size: 2, delay: 1.6, duration: 3.5 },
      { x: 40, y: 15, size: 1.5, delay: 0.1, duration: 2.9 },
      { x: 48, y: 60, size: 2.5, delay: 1.9, duration: 3.1 },
      { x: 55, y: 25, size: 1, delay: 0.7, duration: 2.4 },
      { x: 62, y: 10, size: 2, delay: 1.4, duration: 3.8 },
      { x: 70, y: 40, size: 1.5, delay: 0.3, duration: 2.7 },
      { x: 78, y: 18, size: 2, delay: 1.1, duration: 3.3 },
      { x: 85, y: 50, size: 1, delay: 0.9, duration: 2.2 },
      { x: 92, y: 22, size: 2.5, delay: 1.5, duration: 3.6 },
      { x: 96, y: 70, size: 1.5, delay: 0.5, duration: 2.6 },
      { x: 15, y: 80, size: 2, delay: 1.7, duration: 3.0 },
      { x: 38, y: 85, size: 1.5, delay: 0.6, duration: 2.3 },
      { x: 65, y: 75, size: 2, delay: 1.3, duration: 3.4 },
      { x: 82, y: 90, size: 1, delay: 0.2, duration: 2.8 },
    ];
    return seedValues;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. NIGHT SKY (STARS & LUNAR GLOW) */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            key="night-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Deep Lunar & Galactic Nebula Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/8 rounded-full blur-[110px] pointer-events-none" />

            {/* Starfield */}
            {stars.map((star, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: star.duration,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DAY SKY (SUNSHINE, GOLDEN RAYS & AMBIENT CLOUDS) */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            key="day-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Warm Golden Sun Aura (Top Right Corner) */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-amber-300/30 via-yellow-200/20 to-sky-300/10 rounded-full blur-[90px] pointer-events-none"
            />

            {/* Azure Daytime Horizon Warmth */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />

            {/* Drifting Daytime Cloud Shapes */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute top-20 left-[15%] w-72 h-20 bg-white/40 dark:bg-white/0 rounded-full blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{ x: [30, -30, 30] }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
              className="absolute top-48 right-[10%] w-80 h-24 bg-white/35 dark:bg-white/0 rounded-full blur-3xl pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
