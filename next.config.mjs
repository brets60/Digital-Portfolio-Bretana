/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double-mounting canvas and WebGL contexts during dev
  images: {
    unoptimized: true
  }
};

export default nextConfig;
