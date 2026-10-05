"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

export function LiveStatusPill() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Manila",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel border-white/10 text-xs text-slate-300 font-mono select-none shadow-lg">
      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
      </div>

      <span className="font-medium text-slate-200 tracking-tight">
        {personalInfo.status}
      </span>

      <span className="text-slate-600 hidden sm:inline">|</span>

      <span className="text-emerald-400/90 font-mono hidden sm:inline">
        {time ? `${time} PHST (UTC+8)` : "ACTIVE"}
      </span>
    </div>
  );
}
