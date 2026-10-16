"use client";

import { useState } from "react";
import { Mail, Facebook, Github, Linkedin, Send, Phone, Copy, Check } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    {
      label: "PHONE (TM)",
      value: DEVELOPER_PROFILE.contact.phoneTm || "09061888611",
      href: `tel:${DEVELOPER_PROFILE.contact.phoneTm || "09061888611"}`,
      icon: Phone,
      badge: "TM",
      isPhone: true,
    },
    {
      label: "PHONE (TNT)",
      value: DEVELOPER_PROFILE.contact.phoneTnt || "09815936360",
      href: `tel:${DEVELOPER_PROFILE.contact.phoneTnt || "09815936360"}`,
      icon: Phone,
      badge: "TNT",
      isPhone: true,
    },
    {
      label: "EMAIL",
      value: DEVELOPER_PROFILE.contact.email,
      href: `mailto:${DEVELOPER_PROFILE.contact.email}`,
      icon: Mail,
      isPhone: false,
    },
    {
      label: "FACEBOOK",
      value: DEVELOPER_PROFILE.contact.facebook,
      href: "https://facebook.com",
      icon: Facebook,
      isPhone: false,
    },
    {
      label: "GITHUB",
      value: DEVELOPER_PROFILE.contact.github,
      href: `https://${DEVELOPER_PROFILE.contact.github}`,
      icon: Github,
      isPhone: false,
    },
    {
      label: "LINKEDIN",
      value: DEVELOPER_PROFILE.contact.linkedin,
      href: "#",
      icon: Linkedin,
      isPhone: false,
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          GET IN TOUCH
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
          Contact Me
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
          Feel free to call, message, or email me directly for project inquiries, technical roles, or academic collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Channels */}
        <div className="lg:col-span-5 space-y-3.5">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedText === item.value;

            return (
              <div
                key={item.label}
                className="bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] hover:border-blue-500/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 min-w-0 flex-1"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase transition-colors">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors truncate mt-0.5">
                      {item.value}
                    </span>
                  </div>
                </a>

                {/* 1-Click Copy Button */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(item.value, e)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#131d36] dark:hover:bg-[#1c2b4c] text-slate-500 dark:text-slate-300 transition-colors shrink-0 ml-2"
                  title={`Copy ${item.value}`}
                  aria-label={`Copy ${item.value}`}
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0e1629] border border-slate-200 dark:border-[#1b2746] rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-xl transition-colors">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-slate-50 dark:bg-[#0a1020] border border-slate-200 dark:border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors shadow-sm dark:shadow-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full bg-slate-50 dark:bg-[#0a1020] border border-slate-200 dark:border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors shadow-sm dark:shadow-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Enter message subject"
                className="w-full bg-slate-50 dark:bg-[#0a1020] border border-slate-200 dark:border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors shadow-sm dark:shadow-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                className="w-full bg-slate-50 dark:bg-[#0a1020] border border-slate-200 dark:border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors resize-none shadow-sm dark:shadow-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>{submitted ? "Message Sent!" : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
