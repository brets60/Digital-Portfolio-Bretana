"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy, instantaneous spring values for zero perceived mouse latency
  const springConfig = { damping: 30, stiffness: 800, mass: 0.08 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailingConfig = { damping: 32, stiffness: 600, mass: 0.12 };
  const trailX = useSpring(mouseX, trailingConfig);
  const trailY = useSpring(mouseY, trailingConfig);

  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Only re-inspect DOM if the target element actually changed
      if (e.target !== lastTargetRef.current) {
        lastTargetRef.current = e.target;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest(
          'button, a, input, textarea, [data-cursor], [role="button"]'
        );
        const customText = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

        if (customText) {
          setCursorText(customText);
          setIsPointer(true);
        } else if (interactive) {
          setIsPointer(true);
          setCursorText("");
        } else {
          setIsPointer(false);
          setCursorText("");
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Magnetic Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? "rgba(0, 240, 255, 0.85)" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isPointer ? "rgba(0, 240, 255, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center pointer-events-none"
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          scale: isPointer ? 0.4 : 1,
          backgroundColor: isPointer ? "#00F0FF" : "#FFFFFF",
        }}
        transition={{ duration: 0.1 }}
        className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#00F0FF] pointer-events-none"
      />
    </div>
  );
}
