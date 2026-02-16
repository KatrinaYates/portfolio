import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Image optimization - must be unoptimized for static export
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },

  // Improve build performance
  reactStrictMode: true,

  // Turbopack config
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
