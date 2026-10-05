"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { certificates } from "@/lib/data";
import { Certificate } from "@/types";
import { TiltCard } from "@/components/common/TiltCard";
import {
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Maximize2,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
} from "lucide-react";
import { playClickSound } from "@/lib/audio";

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const openCertModal = (cert: Certificate) => {
    playClickSound();
    setSelectedCert(cert);
  };

  const closeCertModal = () => {
    playClickSound();
    setSelectedCert(null);
  };

  const colorStyles = {
    cyan: {
      accent: "text-cyan-400",
      border: "border-cyan-500/30",
      glow: "from-cyan-500/20 via-blue-500/10 to-transparent",
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
    },
    violet: {
      accent: "text-purple-400",
      border: "border-purple-500/30",
      glow: "from-purple-500/20 via-violet-500/10 to-transparent",
      badge: "bg-purple-500/10 text-purple-300 border-purple-400/30",
    },
    amber: {
      accent: "text-amber-400",
      border: "border-amber-500/30",
      glow: "from-amber-500/20 via-orange-500/10 to-transparent",
      badge: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    },
    emerald: {
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      glow: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    },
  };

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Academic & Industry Credentials
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Certifications & <span className="text-gradient-cyan">Participation</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed font-light">
          Official institutional recognitions, DICT seminars, and BSIT technical workshops awarded to John Michael D. Bretaña.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => {
          const style = colorStyles[cert.color] || colorStyles.cyan;

          return (
            <TiltCard
              key={cert.id}
              glowColor={cert.color}
              className="glass-panel rounded-2xl border border-white/10 hover:border-white/20 flex flex-col justify-between overflow-hidden group cursor-pointer"
              onClick={() => openCertModal(cert)}
            >
              <div>
                {/* Certificate Preview Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950/80 border-b border-white/10">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Verified Ribbon */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-mono shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Credential</span>
                  </div>

                  {/* Zoom Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-mono border border-cyan-400/40 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Info Body */}
                <div className="p-6">
                  {/* Issuer & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{cert.issuer}</span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{cert.date.split(" (")[0]}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Theme / Description */}
                  {cert.theme && (
                    <p className="text-xs text-slate-400 italic mb-4 leading-relaxed line-clamp-2">
                      &ldquo;{cert.theme}&rdquo;
                    </p>
                  )}

                  {/* Location if present */}
                  {cert.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mb-4">
                      <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                      <span className="truncate">{cert.location}</span>
                    </div>
                  )}

                  {/* Competency Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${style.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-6 py-3.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px]">Recipient: {cert.recipient}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View ↗
                </span>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Lightbox / Certificate Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCertModal}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-white/20 p-6 sm:p-8 z-10 shadow-2xl bg-[#090D14]"
            >
              {/* Close Button */}
              <button
                onClick={closeCertModal}
                className="absolute top-5 right-5 p-2 rounded-xl glass-panel text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors z-20"
                aria-label="Close Certificate Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header Info */}
                <div className="pr-12">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Official Certificate of Participation
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedCert.date}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
                    {selectedCert.title}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm">
                    {selectedCert.issuer} {selectedCert.subIssuer && `// ${selectedCert.subIssuer}`}
                  </p>
                </div>

                {/* High-Resolution Certificate Image */}
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1200px) 100vw, 1000px"
                  />
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Awarded To
                      </h4>
                      <p className="text-sm font-semibold text-white">
                        {selectedCert.recipient}
                      </p>
                    </div>

                    {selectedCert.theme && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                          Conference / Workshop Theme
                        </h4>
                        <p className="text-xs text-slate-300 italic leading-relaxed">
                          &ldquo;{selectedCert.theme}&rdquo;
                        </p>
                      </div>
                    )}

                    {selectedCert.location && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                          Location Venue
                        </h4>
                        <p className="text-xs text-slate-300">
                          {selectedCert.location}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Official Signatories
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {selectedCert.signatories.map((sig, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{sig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Competencies Certified
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Fullscreen Asset ↗</span>
                  </a>
                  <button
                    onClick={closeCertModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
