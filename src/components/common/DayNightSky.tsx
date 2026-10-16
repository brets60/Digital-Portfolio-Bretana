"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export function DayNightSky() {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const isMobile = width < 768;
    const particleCount = isMobile ? 30 : 60;
    const maxDistance = isMobile ? 90 : 130;

    // Palette per theme
    const nightColors = ["#38bdf8", "#60a5fa", "#818cf8", "#c084fc", "#ffffff"];
    const dayColors = ["#f59e0b", "#fbbf24", "#38bdf8", "#0284c7", "#60a5fa"];

    // Initialize particles
    const particles: Particle[] = [];
    const colors = isDark ? nightColors : dayColors;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isDark ? 0.45 : 0.35),
        vy: isDark ? (Math.random() - 0.5) * 0.45 : -Math.random() * 0.4 - 0.1, // Float upward in day mode
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.6 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Shooting stars system for night mode
    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      if (!isDark) return;
      if (shootingStars.length >= 2) return;

      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 12,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 degrees diagonal
        alpha: 1,
        active: true,
      });
    };

    let shootingStarInterval: NodeJS.Timeout | null = null;
    if (isDark) {
      shootingStarInterval = setInterval(createShootingStar, 3200);
    }

    // Mouse coordinates for gentle interactive repulsion
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connecting Constellation Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.2 : 0.12);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 0) {
            const force = (120 - mDist) / 120;
            p.x += (mdx / mDist) * force * 1.5;
            p.y += (mdy / mDist) * force * 1.5;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 3. Draw & Update Shooting Stars (Night Mode only)
      if (isDark && shootingStars.length > 0) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(0.7, `rgba(56, 189, 248, ${s.alpha * 0.5})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.stroke();

          // Move
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha -= 0.016;

          if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
            shootingStars.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (shootingStarInterval) clearInterval(shootingStarInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Interactive Live Canvas Particles & Shooting Stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85 dark:opacity-90"
      />

      {/* 2. Celestial Atmosphere Layers */}
      <AnimatePresence>
        {isDark ? (
          <motion.div
            key="night-sky-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Deep Lunar & Galactic Nebula Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/8 rounded-full blur-[110px]" />
          </motion.div>
        ) : (
          <motion.div
            key="day-sky-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Warm Golden Sun Aura (Top Right Corner) */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-amber-300/30 via-yellow-200/20 to-sky-300/10 rounded-full blur-[90px]"
            />

            {/* Azure Daytime Horizon Warmth */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[110px]" />

            {/* Drifting Daytime Cloud Shapes */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute top-20 left-[15%] w-72 h-20 bg-white/40 dark:bg-white/0 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ x: [30, -30, 30] }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
              className="absolute top-48 right-[10%] w-80 h-24 bg-white/35 dark:bg-white/0 rounded-full blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
