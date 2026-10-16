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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    const resize = () => {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Particle count: vibrant, active, yet butter-smooth
    const isMobile = displayWidth < 768;
    const particleCount = isMobile ? 38 : 75;
    const maxDistance = isMobile ? 100 : 145;

    // Rich distinct colors for Night & Day
    const nightColors = [
      "#38bdf8", // Sky Cyan
      "#60a5fa", // Bright Blue
      "#818cf8", // Indigo
      "#c084fc", // Purple/Violet
      "#3b82f6", // Royal Blue
      "#ffffff", // Star White
    ];

    const dayColors = [
      "#f59e0b", // Amber Sun
      "#fbbf24", // Golden Light
      "#0284c7", // Deep Sky Blue
      "#38bdf8", // Cyan Azure
      "#2563eb", // Vibrant Blue
    ];

    const colors = isDark ? nightColors : dayColors;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        vx: (Math.random() - 0.5) * (isDark ? 0.6 : 0.45),
        vy: isDark ? (Math.random() - 0.5) * 0.6 : -Math.random() * 0.5 - 0.15, // Upward floating dust in day
        radius: Math.random() * 2 + (isDark ? 1.4 : 1.8),
        baseAlpha: Math.random() * 0.5 + 0.45, // High contrast visibility
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Shooting stars system
    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      if (!isDark) return;
      if (shootingStars.length >= 2) return;

      shootingStars.push({
        x: Math.random() * displayWidth * 0.85,
        y: Math.random() * (displayHeight * 0.45),
        length: Math.random() * 90 + 60,
        speed: Math.random() * 8 + 14,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        alpha: 1,
        active: true,
      });
    };

    let shootingStarInterval: NodeJS.Timeout | null = null;
    if (isDark) {
      shootingStarInterval = setInterval(createShootingStar, 2600);
      // Spawn one immediately on load
      setTimeout(createShootingStar, 800);
    }

    // Interactive mouse interaction
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize);

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Render Loop
    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // 1. Draw Connecting Constellation Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.35 : 0.22);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // 2. Draw & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Screen Wrap
        if (p.x < 0) p.x = displayWidth;
        if (p.x > displayWidth) p.x = 0;
        if (p.y < 0) p.y = displayHeight;
        if (p.y > displayHeight) p.y = 0;

        // Subtle mouse repulsion
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 130 && mDist > 0) {
            const force = (130 - mDist) / 130;
            p.x += (mdx / mDist) * force * 2;
            p.y += (mdy / mDist) * force * 2;
          }
        }

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowBlur = isDark ? 10 : 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 3. Draw Shooting Stars (Night Mode)
      if (isDark && shootingStars.length > 0) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(0.6, `rgba(56, 189, 248, ${s.alpha * 0.6})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.2;
          ctx.lineCap = "round";
          ctx.stroke();

          // Star head glow
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#38bdf8";
          ctx.fill();
          ctx.shadowBlur = 0;

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha -= 0.018;

          if (s.alpha <= 0 || s.x > displayWidth + 100 || s.y > displayHeight + 100) {
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. High-Performance Interactive Live Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* 2. Celestial Ambient Atmosphere */}
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
            {/* Deep Space Glowing Nebulas */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 left-10 w-[420px] h-[420px] bg-indigo-600/12 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[110px]" />
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
            {/* Warm Golden Sun Aura */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-amber-300/35 via-yellow-200/25 to-sky-300/15 rounded-full blur-[90px]"
            />

            {/* Azure Horizon Warmth */}
            <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-sky-400/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-400/15 rounded-full blur-[110px]" />

            {/* Drifting Daytime Cloud Accents */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute top-20 left-[15%] w-72 h-20 bg-white/50 dark:bg-white/0 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ x: [30, -30, 30] }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
              className="absolute top-48 right-[10%] w-80 h-24 bg-white/40 dark:bg-white/0 rounded-full blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
