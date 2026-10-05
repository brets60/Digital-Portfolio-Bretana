import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "John Michael D. Bretaña | Software Engineer & Creative Developer (BSIT 4th Year)",
  description: "BSIT 4th Year student & Software Engineer crafting high-performance full-stack architectures, interactive WebGL 3D environments, and cutting-edge digital experiences.",
  keywords: [
    "John Michael D. Bretaña",
    "John Michael Bretaña",
    "BSIT 4th Year",
    "Software Engineer",
    "Creative Developer",
    "WebGL",
    "Three.js",
    "Next.js",
    "Full Stack",
    "TypeScript",
  ],
  authors: [{ name: "John Michael D. Bretaña" }],
  openGraph: {
    title: "John Michael D. Bretaña | Software Engineer & Creative Developer",
    description: "Cutting-edge interactive digital portfolio with WebGL 3D, physics simulation, and high-performance systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-950 text-slate-100 antialiased min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-300">
        <SmoothScrollProvider>
          {/* Hardware Accelerated Custom Cursor */}
          <CustomCursor />

          {/* Fixed Top Navigation Bar */}
          <Navbar />

          {/* Main App Content */}
          <main className="relative z-10">{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
