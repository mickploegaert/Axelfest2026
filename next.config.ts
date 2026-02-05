import type { NextConfig } from "next";

// Security Headers
const securityHeaders = [
  {
    // Voorkomt clickjacking - site mag niet in iframe geladen worden
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    // Voorkomt MIME type sniffing
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    // Voorkomt XSS aanvallen (legacy, maar goed om te hebben)
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    // Controleert welke referrer info wordt meegestuurd
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    // HSTS - forceert HTTPS (1 jaar)
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    // Beperkt browser features/APIs die de site kan gebruiken
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    // Content Security Policy - voorkomt XSS en data injectie
    key: 'Content-Security-Policy',
    value: [
      // Standaard: alleen eigen domein
      "default-src 'self'",
      // Scripts: eigen domein + Cloudflare Turnstile + inline voor Next.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      // Styles: eigen domein + inline + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: eigen domein + Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Afbeeldingen: eigen domein + data URLs + blob
      "img-src 'self' data: blob: https:",
      // Media (video): eigen domein
      "media-src 'self'",
      // Frames: Cloudflare Turnstile + Google Maps
      "frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com",
      // Verbindingen: eigen domein + Cloudflare
      "connect-src 'self' https://challenges.cloudflare.com",
      // Formulier acties
      "form-action 'self'",
      // Base URI
      "base-uri 'self'",
      // Object bronnen (plugins)
      "object-src 'none'",
      // Frame ancestors (wie mag deze site embedden)
      "frame-ancestors 'none'",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
    ].join('; ')
  },
];

const nextConfig: NextConfig = {
  // Optimalisatie voor betere laadtijden
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compressie en caching
  compress: true,
  // Verberg X-Powered-By header (verbergt dat we Next.js gebruiken)
  poweredByHeader: false,
  // Experimentele features voor betere performance
  experimental: {
    optimizeCss: true,
  },
  // Security headers toevoegen aan alle routes
  async headers() {
    return [
      {
        // Pas toe op alle routes
        source: '/:path*',
        headers: [
          ...securityHeaders,
          // Force no-cache voor HTML om altijd nieuwste versie te krijgen
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
        ],
      },
      {
        // Static assets (JS, CSS) mogen wel gecached worden met versioning
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
