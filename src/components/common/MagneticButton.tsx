"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { playClickSound, playHoverSound } from "@/lib/audio";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  radius?: number;
  dataCursor?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  strength = 0.35,
  radius = 60,
  dataCursor = "pointer",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 220, damping: 15, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius + Math.max(rect.width, rect.height) / 2) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none ${className}`}
      data-cursor={dataCursor}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={handleClick}
          className="w-full h-full block"
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="w-full h-full block text-left"
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
