"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isAudioEnabled, toggleAudio } from "@/lib/audio";
import { motion } from "framer-motion";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isAudioEnabled());
  }, []);

  const handleToggle = () => {
    const newState = toggleAudio();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 hover:border-cyan-400/40 transition-all text-xs font-mono group"
      title={enabled ? "Mute audio effects" : "Unmute audio effects"}
      data-cursor="pointer"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {enabled ? (
          <Volume2 className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:scale-110 transition-transform" />
        )}
      </div>

      {enabled ? (
        <div className="flex items-center gap-0.5 h-3">
          <motion.span
            animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="w-0.5 bg-cyan-400 rounded-full"
          />
          <motion.span
            animate={{ height: ["10px", "4px", "14px", "6px", "10px"] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-0.5 bg-cyan-400 rounded-full"
          />
          <motion.span
            animate={{ height: ["6px", "12px", "4px", "12px", "6px"] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            className="w-0.5 bg-cyan-400 rounded-full"
          />
          <span className="text-[11px] text-slate-300 ml-1">AUDIO ON</span>
        </div>
      ) : (
        <span className="text-[11px] text-slate-500">MUTED</span>
      )}
    </button>
  );
}
