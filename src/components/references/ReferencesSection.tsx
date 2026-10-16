"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Phone, Mail, Check, Copy, Building2 } from "lucide-react";
import { REFERENCES, ReferenceItem } from "@/lib/data";

export function ReferencesSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((n) => n.length > 0)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  return (
    <section id="references" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-16 space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Vouched & Verified</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Character References
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed transition-colors">
          Distinguished academic leaders, mentors, and professional colleagues who can attest to my technical competence, integrity, and dedication.
        </p>
      </motion.div>

      {/* Grid of References */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REFERENCES.map((ref, idx) => {
          const isPhone = ref.type === "phone";
          const href = isPhone ? `tel:${ref.contact}` : `mailto:${ref.contact}`;
          const isCopied = copiedId === ref.id;

          return (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-blue-900/15 group relative overflow-hidden"
            >
              {/* Subtle Ambient Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

              <div>
                {/* Avatar / Badge Top Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px] shadow-md shadow-blue-500/20">
                    <div className="w-full h-full bg-white dark:bg-[#0a1122] rounded-[14px] flex items-center justify-center text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      {getInitials(ref.name)}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-slate-100 dark:bg-[#131d36] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#203056]">
                    <UserCheck className="w-3 h-3 text-blue-500" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-snug">
                  {ref.name}
                </h3>

                {/* Role Pill */}
                <div className="mt-1.5 inline-block">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    {ref.role}
                  </span>
                </div>

                {/* Institution / Relationship */}
                {ref.institution && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ref.institution}</span>
                  </div>
                )}
                {ref.relationship && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-snug">
                    {ref.relationship}
                  </p>
                )}
              </div>

              {/* Contact Button & Quick Copy Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#172340] space-y-2">
                <div className="flex items-center gap-2">
                  <a
                    href={href}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#131d36] hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 group/btn"
                    title={isPhone ? `Call ${ref.contact}` : `Email ${ref.contact}`}
                  >
                    {isPhone ? (
                      <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/btn:text-white" />
                    ) : (
                      <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/btn:text-white" />
                    )}
                    <span className="truncate">{ref.contact}</span>
                  </a>

                  <button
                    onClick={() => handleCopy(ref.id, ref.contact)}
                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#131d36] hover:bg-slate-200 dark:hover:bg-[#1c2b4c] text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors"
                    title="Copy Contact"
                    aria-label="Copy Contact"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
