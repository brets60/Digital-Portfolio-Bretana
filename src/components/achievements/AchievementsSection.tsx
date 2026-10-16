"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  Trophy,
  Medal,
  Presentation,
  BookOpen,
  ShieldCheck,
  Building,
  Calendar,
  Maximize2,
  X,
  ExternalLink,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { ACHIEVEMENTS, CERTIFICATES, CertificateItem } from "@/lib/data";

export function AchievementsSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | "academic" | "seminar">("all");

  const iconMap: Record<string, any> = {
    Award,
    Trophy,
    Medal,
    Presentation,
    BookOpen,
  };

  const filteredCertificates = CERTIFICATES.filter((cert) => {
    if (filterCategory === "all") return true;
    return cert.category === filterCategory;
  });

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>RECOGNITIONS & MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Achievements
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Academic accomplishments, Dean&apos;s List honors, capstone milestones, and professional development.
        </p>
      </div>

      {/* Recognition Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {ACHIEVEMENTS.map((item) => {
          const Icon = iconMap[item.iconName] || Award;
          const isAcademic = item.id === "academic";

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-[#0e1629] border rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group relative overflow-hidden ${
                isAcademic
                  ? "border-amber-400/50 dark:border-amber-500/40 ring-1 ring-amber-400/30 dark:ring-amber-500/20 cursor-pointer"
                  : item.isCert
                  ? "border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40 cursor-pointer"
                  : "border-slate-200 dark:border-[#1b2746] hover:border-blue-500/40"
              }`}
              onClick={() => {
                if (isAcademic) {
                  setFilterCategory("academic");
                  setSelectedCert(CERTIFICATES[0]);
                } else if (item.isCert) {
                  setFilterCategory("all");
                  setSelectedCert(CERTIFICATES[2]);
                }
              }}
            >
              {isAcademic && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>HONOR ROLL</span>
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                  isAcademic
                    ? "bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 shadow-md shadow-amber-500/10"
                    : "bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
                {item.subtitle}
              </p>

              {isAcademic ? (
                <span className="mt-4 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:underline">
                  View Dean&apos;s List Certificates (2) →
                </span>
              ) : item.isCert ? (
                <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                  View Official Credentials →
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Embedded Official Credentials Showcase */}
      <div className="bg-slate-50/60 dark:bg-[#0b1224] border border-slate-200 dark:border-[#192748] rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-2xl transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 dark:border-[#182647] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                Official Institutional Credentials & Dean&apos;s Honors
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
              Academic & Professional Credentials
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-[#121c33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2e52] hover:border-blue-400/50"
              }`}
            >
              All Documents ({CERTIFICATES.length})
            </button>
            <button
              onClick={() => setFilterCategory("academic")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                filterCategory === "academic"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                  : "bg-white dark:bg-[#121c33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2e52] hover:border-amber-400/50"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Dean&apos;s List (2)</span>
            </button>
            <button
              onClick={() => setFilterCategory("seminar")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                filterCategory === "seminar"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-[#121c33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2e52] hover:border-blue-400/50"
              }`}
            >
              <Medal className="w-3.5 h-3.5" />
              <span>Seminars & ICT (3)</span>
            </button>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => {
            const isAcademic = cert.category === "academic";

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`bg-white dark:bg-[#0e1629] border rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-2xl relative ${
                  isAcademic
                    ? "border-amber-400/40 dark:border-amber-500/30 hover:border-amber-500"
                    : "border-slate-200 dark:border-[#1b2746] hover:border-blue-500/50"
                }`}
              >
                <div>
                  {/* Certificate Preview Image */}
                  <div className="relative aspect-[16/11] w-full bg-slate-900 border-b border-slate-200 dark:border-[#182647] overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Badge Overlay */}
                    {cert.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shadow-md flex items-center gap-1 ${
                            isAcademic
                              ? "bg-amber-500 text-slate-950 shadow-amber-500/30"
                              : "bg-blue-600 text-white shadow-blue-600/30"
                          }`}
                        >
                          {isAcademic ? <GraduationCap className="w-3 h-3" /> : <Medal className="w-3 h-3" />}
                          <span>{cert.badge}</span>
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Full Certificate</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <span className="truncate max-w-[170px] text-slate-700 dark:text-slate-300">
                        {cert.issuer}
                      </span>
                      <span>{cert.date.split(" (")[0]}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-snug">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                      &ldquo;{cert.theme}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50/80 dark:bg-[#0a1122]/60 border-t border-slate-200 dark:border-[#172340] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    {cert.recipient}
                  </span>
                  <span
                    className={`font-semibold group-hover:translate-x-1 transition-transform ${
                      isAcademic
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    View Document ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-[#1e2f56] rounded-2xl p-6 sm:p-8 z-10 shadow-2xl">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-[#121c33] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#203056] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="pr-12">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {selectedCert.category === "academic" ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Dean&apos;s List Honor Roll — {selectedCert.grade}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Certificate of Participation
                    </span>
                  )}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {selectedCert.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">
                  {selectedCert.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  {selectedCert.issuer} // {selectedCert.subIssuer}
                </p>
              </div>

              {/* Certificate Image */}
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-[#1b2b4e] bg-black shadow-2xl">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1000px"
                />
              </div>

              {/* Signatories & Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-[#182647]">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Awarded To</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedCert.recipient}</p>
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 pt-2">Honor / Theme</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">&ldquo;{selectedCert.theme}&rdquo;</p>
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 pt-2">Venue</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{selectedCert.location}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-2">Official Signatories</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedCert.signatories.map((sig, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5">Certified Competencies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-[#131e38] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-[#20325c]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-[#182647]">
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen Asset ↗</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#141f38] dark:hover:bg-[#1a294b] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
