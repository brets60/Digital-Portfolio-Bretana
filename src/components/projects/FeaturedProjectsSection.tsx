"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Github, ExternalLink, Code2, Layers } from "lucide-react";
import { PROJECTS, ProjectItem } from "@/lib/data";

export function FeaturedProjectsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "capstone" | "desktop" | "concepts"
  >("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "capstone", label: "Capstone & IoT" },
    { id: "desktop", label: "Desktop Applications" },
    { id: "concepts", label: "Concepts & Proposals" },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          PORTFOLIO SHOWCASE
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
          Practical applications and software systems developed during my IT studies.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, description, or tech stack (e.g. Python, Arduino, SQLite)"
            className="w-full bg-[#0c1324] border border-[#1b2848] focus:border-blue-500 text-slate-100 text-xs sm:text-sm rounded-full pl-11 pr-5 py-3 outline-none transition-colors placeholder:text-slate-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-[#0c1426] text-slate-300 border border-[#1c2b4c] hover:border-blue-500/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0e1629] border border-[#1b2746] hover:border-blue-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 group"
          >
            <div>
              {/* Image Preview Banner */}
              <div className="relative aspect-[16/10] w-full bg-[#070b16] border-b border-[#1b2746] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                  {project.categoryLabel}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#131d36] text-[10px] font-mono text-slate-300 border border-[#203056]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-[#0a1122]/60 border-t border-[#172340] flex items-center justify-between">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository ↗</span>
                </a>
              ) : (
                <span className="text-xs text-slate-500 font-mono">Academic Project</span>
              )}

              <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-[#0c1426] border border-[#1c2b4c] rounded-2xl max-w-lg mx-auto">
          <p className="text-slate-400 text-sm">No projects matched your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
