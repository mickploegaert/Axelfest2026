import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimalisatie voor betere laadtijden
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compressie en caching
  compress: true,
  poweredByHeader: false,
  // Experimentele features voor betere performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
