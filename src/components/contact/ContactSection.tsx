"use client";

import { useState } from "react";
import { Mail, Facebook, Github, Linkedin, Send } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/data";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    {
      label: "EMAIL",
      value: DEVELOPER_PROFILE.contact.email,
      href: `mailto:${DEVELOPER_PROFILE.contact.email}`,
      icon: Mail,
    },
    {
      label: "FACEBOOK",
      value: DEVELOPER_PROFILE.contact.facebook,
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      label: "GITHUB",
      value: DEVELOPER_PROFILE.contact.github,
      href: `https://${DEVELOPER_PROFILE.contact.github}`,
      icon: Github,
    },
    {
      label: "LINKEDIN",
      value: DEVELOPER_PROFILE.contact.linkedin,
      href: "#",
      icon: Linkedin,
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          GET IN TOUCH
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact Me
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
          Feel free to reach out for inquiries, project discussions, or academic collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="bg-[#0e1629] border border-[#1b2746] hover:border-blue-500/50 rounded-2xl p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:shadow-lg group block"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate mt-0.5">
                    {item.value}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#0e1629] border border-[#1b2746] rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-[#0a1020] border border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full bg-[#0a1020] border border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Enter message subject"
                className="w-full bg-[#0a1020] border border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                className="w-full bg-[#0a1020] border border-[#1c2948] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors resize-none"
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
