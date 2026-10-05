"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function RoleSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 md:h-12 flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-heading font-semibold text-gradient-cyan tracking-tight flex items-center gap-2"
        >
          <span className="text-cyan-400 font-mono text-sm md:text-base font-normal">
            &gt;
          </span>
          <span>{personalInfo.roles[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
