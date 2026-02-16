import type { NextConfig } from "next";

// Set to your GitHub repo name for GitHub Pages deployment
// Use basePath in production builds, empty for local development
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/portfolio' : '';

const nextConfig: NextConfig = {
  // Expose basePath to client components
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Enable static export for GitHub Pages
  output: 'export',

  // Base path for GitHub Pages (repo name)
  basePath,
  assetPrefix: basePath,

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
