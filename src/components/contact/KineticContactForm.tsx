"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle, AlertCircle, Sparkles, User, Mail, MessageSquare } from "lucide-react";
import { playClickSound, playSuccessChime } from "@/lib/audio";
import { MagneticButton } from "@/components/common/MagneticButton";

export function KineticContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation rules
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) return;

    setIsSubmitting(true);
    playClickSound();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccessChime();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00F0FF", "#9D4EDD", "#FFB703"],
      });
    }, 1200);
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden h-[520px] flex flex-col justify-between">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {isSubmitted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-heading font-bold text-white">
            Transmission Received!
          </h3>

          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            Thank you for reaching out. Your message has been routed to my direct inbox. I will reply within 24 hours.
          </p>

          <MagneticButton
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", email: "", message: "" });
              setTouched({ name: false, email: false, message: false });
            }}
            className="rounded-xl overflow-hidden mt-4"
          >
            <div className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/15">
              Send Another Transmission
            </div>
          </MagneticButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                DIRECT CHANNEL // KINETIC DISPATCH
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                SSL 256-BIT ENCRYPTED
              </span>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  placeholder="e.g. Alex Jensen"
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/60 border text-sm text-white placeholder:text-slate-600 outline-none transition-all ${
                    touched.name && !isNameValid
                      ? "border-rose-500/60 focus:border-rose-500"
                      : isNameValid
                      ? "border-emerald-500/40 focus:border-emerald-400"
                      : "border-white/10 focus:border-cyan-400"
                  }`}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  placeholder="alex@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/60 border text-sm text-white placeholder:text-slate-600 outline-none transition-all ${
                    touched.email && !isEmailValid
                      ? "border-rose-500/60 focus:border-rose-500"
                      : isEmailValid
                      ? "border-emerald-500/40 focus:border-emerald-400"
                      : "border-white/10 focus:border-cyan-400"
                  }`}
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  Project Scope or Inquiries
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onBlur={() => setTouched({ ...touched, message: true })}
                  placeholder="Describe your vision, timeline, or engineering opportunity..."
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/60 border text-sm text-white placeholder:text-slate-600 outline-none transition-all resize-none ${
                    touched.message && !isMessageValid
                      ? "border-rose-500/60 focus:border-rose-500"
                      : isMessageValid
                      ? "border-emerald-500/40 focus:border-emerald-400"
                      : "border-white/10 focus:border-cyan-400"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="text-[11px] font-mono text-slate-500">
              {isFormValid ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Ready for dispatch
                </span>
              ) : (
                "Fill all required fields"
              )}
            </div>

            <MagneticButton
              onClick={() => {}}
              className="rounded-xl overflow-hidden"
              dataCursor="send"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </MagneticButton>
          </div>
        </form>
      )}
    </div>
  );
}
