"use client";

import { HeroParticleField } from "@/components/canvas/HeroParticleField";
import { HeroSection } from "@/components/hero/HeroSection";
import { BentoProjects } from "@/components/projects/BentoProjects";
import { HorizontalShowcase } from "@/components/projects/HorizontalShowcase";
import { PhysicsTechStack } from "@/components/skills/PhysicsTechStack";
import { MilestonesTimeline } from "@/components/experience/MilestonesTimeline";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Interactive 3D WebGL Particle Constellation (Optimized 100% GPU) */}
      <HeroParticleField />

      {/* Subtle Dot Matrix Cyber Grid Overlay */}
      <div className="fixed inset-0 cyber-dots opacity-25 pointer-events-none z-0" />

      {/* Hardware-Accelerated Ambient Radial Gradients (No heavy CSS blur filters) */}
      <div
        className="fixed top-0 left-1/4 w-[500px] h-[500px] pointer-events-none -z-10 opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed top-1/2 right-10 w-[450px] h-[450px] pointer-events-none -z-10 opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(157, 78, 221, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-10 left-1/3 w-[500px] h-[500px] pointer-events-none -z-10 opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(255, 183, 3, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* Decorative Section Divider Wire */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 my-8 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* 2. Featured Projects (Asymmetric Bento Grid) */}
      <BentoProjects />

      {/* 3. Pinned Horizontal-Scroll Landmark Showcase */}
      <HorizontalShowcase />

      {/* 4. Interactive Tech Stack (Matter.js 2D Physics Arena) */}
      <PhysicsTechStack />

      {/* Decorative Section Divider Wire */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 my-8 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      {/* 5. Experience & Milestones Timeline */}
      <MilestonesTimeline />

      {/* Decorative Section Divider Wire */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 my-8 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* 6. Contact Terminal & Kinetic Form */}
      <ContactSection />
    </div>
  );
}
