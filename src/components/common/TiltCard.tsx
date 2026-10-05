"use client";

import React, { useRef } from "react";
import { playHoverSound } from "@/lib/audio";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: "cyan" | "violet" | "amber" | "emerald";
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--spotlight-x", `${x}px`);
      spotlightRef.current.style.setProperty("--spotlight-y", `${y}px`);
    }
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "1";
    }
    playHoverSound();
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  };

  const glowColorMap = {
    cyan: "rgba(0, 240, 255, 0.18)",
    violet: "rgba(157, 78, 221, 0.18)",
    amber: "rgba(255, 183, 3, 0.18)",
    emerald: "rgba(16, 185, 129, 0.18)",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      {/* Hardware-Accelerated Spotlight Glow */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-10 opacity-0"
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x, -500px) var(--spotlight-y, -500px), ${glowColorMap[glowColor]}, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}
