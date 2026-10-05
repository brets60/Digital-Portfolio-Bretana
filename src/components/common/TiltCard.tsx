"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  maxTilt = 6,
  glowColor = "cyan",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Mouse coords normalized (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fast, responsive spring for 3D tilt without lag
  const springConfig = { damping: 25, stiffness: 300, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mousePxX = e.clientX - rect.left;
    const mousePxY = e.clientY - rect.top;

    // Direct DOM style update — ZERO React re-renders!
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--spotlight-x", `${mousePxX}px`);
      spotlightRef.current.style.setProperty("--spotlight-y", `${mousePxY}px`);
    }

    const normX = mousePxX / rect.width - 0.5;
    const normY = mousePxY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);
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
    x.set(0);
    y.set(0);
  };

  const glowColorMap = {
    cyan: "rgba(0, 240, 255, 0.15)",
    violet: "rgba(157, 78, 221, 0.15)",
    amber: "rgba(255, 183, 3, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`relative overflow-hidden transition-shadow duration-200 ${className}`}
      >
        {/* Dynamic Spotlight Glow with Zero React Re-render */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-10 opacity-0"
          style={{
            background: `radial-gradient(480px circle at var(--spotlight-x, -500px) var(--spotlight-y, -500px), ${glowColorMap[glowColor]}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 h-full w-full">{children}</div>
      </motion.div>
    </div>
  );
}
