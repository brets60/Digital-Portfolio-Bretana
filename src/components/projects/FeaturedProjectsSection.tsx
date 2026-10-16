"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, ExternalLink, Code2 } from "lucide-react";
import { PROJECTS, ProjectItem } from "@/lib/data";

export function FeaturedProjectsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "ai" | "capstone" | "desktop" | "concepts"
  >("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & Smart Apps" },
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-12 space-y-3"
      >
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          PORTFOLIO SHOWCASE
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Featured Projects
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          AI applications, IoT systems, and software platforms developed during my studies.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, description, or tech stack (e.g. Flora, AgriMate, Python, Gemini)"
            className="w-full bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-[#1b2848] focus:border-blue-500 text-slate-900 dark:text-slate-100 text-xs sm:text-sm rounded-full pl-11 pr-5 py-3 outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2 py-1 rounded bg-slate-100 dark:bg-[#131d36] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-102"
                  : "bg-white dark:bg-[#0c1426] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1c2b4c] hover:border-blue-500/40 hover:text-slate-900 dark:hover:text-white shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      {/* Projects Grid with Animated Layout Transitions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors duration-300 shadow-sm hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-900/15 group"
            >
              <div>
                {/* Image Preview Banner with Zoom */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#070b16] border-b border-slate-200 dark:border-[#1b2746] overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors pointer-events-none" />
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {project.categoryLabel}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-[#131d36] text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#203056] group-hover:border-blue-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 bg-slate-50/80 dark:bg-[#0a1122]/60 border-t border-slate-200 dark:border-[#172340] flex items-center justify-between">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository ↗</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Academic Project</span>
                )}

                <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all">
                  Details →
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-[#0c1426] border border-slate-200 dark:border-[#1c2b4c] rounded-2xl max-w-lg mx-auto shadow-sm"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm">No projects matched your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </section>
  );
}
