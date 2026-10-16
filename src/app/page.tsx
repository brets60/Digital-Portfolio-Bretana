"use client";

import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { FeaturedProjectsSection } from "@/components/projects/FeaturedProjectsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ReferencesSection } from "@/components/references/ReferencesSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { DayNightSky } from "@/components/common/DayNightSky";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-blue-600/30 selection:text-blue-600 dark:selection:text-blue-300 transition-colors duration-200">
      {/* Dynamic Celestial Day & Night Sky Background */}
      <DayNightSky />
      {/* Subtle Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 dark:opacity-20 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(59, 130, 246, 0.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Me Section */}
      <AboutSection />

      {/* 3. Skills & Technologies */}
      <SkillsSection />

      {/* 4. Featured Projects (Portfolio Showcase & Capstone) */}
      <div id="capstone">
        <FeaturedProjectsSection />
      </div>

      {/* 5. Education Timeline */}
      <EducationSection />

      {/* 6. Experience & Activities */}
      <ExperienceSection />

      {/* 7. Achievements & Official Certifications */}
      <AchievementsSection />

      {/* 8. Capabilities & Services (What I Can Do) */}
      <ServicesSection />

      {/* 9. Character References */}
      <ReferencesSection />

      {/* 10. Contact Me */}
      <ContactSection />
    </div>
  );
}
