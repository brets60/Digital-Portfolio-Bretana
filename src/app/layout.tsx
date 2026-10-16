import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { DayNightSky } from "@/components/common/DayNightSky";

export const metadata: Metadata = {
  title: "John Michael D. Bretaña | Software Engineer & Creative Developer",
  description: "Software Engineer & Creative Developer crafting high-performance full-stack architectures, intelligent AI systems, interactive WebGL 3D environments, and cutting-edge digital experiences.",
  keywords: [
    "John Michael D. Bretaña",
    "John Michael Bretaña",
    "Software Engineer",
    "Creative Developer",
    "Full Stack Developer",
    "AI Systems Builder",
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 antialiased min-h-screen relative selection:bg-blue-600/30 selection:text-blue-600 dark:selection:text-blue-300 transition-colors duration-200">
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Dynamic Celestial Day & Night Live Background */}
            <DayNightSky />

            {/* Hardware Accelerated Custom Cursor */}
            <CustomCursor />

            {/* Fixed Top Navigation Bar */}
            <Navbar />

            {/* Main App Content */}
            <main className="relative z-10">{children}</main>

            {/* Footer */}
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
