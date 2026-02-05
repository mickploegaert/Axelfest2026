import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Anton } from "next/font/google";
import "./globals.css";
import { Navbar, LoadingScreen, CookieConsent, JsonLd } from "./components";
import ScrollManager from "./components/ScrollManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anta",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basis SEO
  title: {
    default: "Axelfest 2026 | Festival Hofplein Axel",
    template: "%s | Axelfest 2026",
  },
  description: "Axelfest 2026 - De ultieme festival ervaring in het hart van Zeeland. 25 & 26 september op het Hofplein in Axel. Koop nu je tickets voor twee dagen vol muziek, feest en onvergetelijke momenten!",
  keywords: ["Axelfest", "festival", "Axel", "Zeeland", "Hofplein", "2026", "muziek", "feest", "tickets", "september"],
  authors: [{ name: "Axelfest" }],
  creator: "Axelfest",
  publisher: "Axelfest",
  
  // Canonical URL
  metadataBase: new URL("https://axelfest.nl"),
  alternates: {
    canonical: "/",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://axelfest.nl",
    siteName: "Axelfest",
    title: "Axelfest 2026 | 25 & 26 September - Hofplein Axel",
    description: "De ultieme festival ervaring in het hart van Zeeland. Twee dagen vol muziek, feest en onvergetelijke momenten op het Hofplein in Axel!",
    images: [
      {
        url: "/BackgroundMain/Background.jpg",
        width: 1200,
        height: 630,
        alt: "Axelfest 2026 - Festival op het Hofplein in Axel",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Axelfest 2026 | 25 & 26 September",
    description: "De ultieme festival ervaring in Zeeland! Koop nu je tickets voor Axelfest 2026.",
    images: ["/BackgroundMain/Background.jpg"],
    creator: "@axelfest",
  },
  
  // Icons
  icons: {
    icon: "/favico.png",
    shortcut: "/favico.png",
    apple: "/favico.png",
  },
  
  // Verificatie (voeg je eigen codes toe indien nodig)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        {/* Force no-cache op iOS Safari */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        {/* DNS prefetch en preconnect voor snellere externe resources */}
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload kritieke video */}
        <link rel="preload" href="/Videos/2025aftermovie.mp4" as="video" type="video/mp4" />
        {/* Preload kritieke achtergrond */}
        <link rel="preload" href="/BackgroundMain/Background.jpg" as="image" />
        {/* Mobile viewport height fix - calculates real viewport height excluding address bar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setVH() {
                  var vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                }
                setVH();
                window.addEventListener('resize', setVH);
                window.addEventListener('orientationchange', function() {
                  setTimeout(setVH, 100);
                });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${anton.variable} antialiased`}
      >
        {/* JSON-LD Structured Data voor SEO */}
        <JsonLd />
        
        {/* Skip to content link voor toegankelijkheid */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-outfit focus:font-semibold"
        >
          Ga naar hoofdinhoud
        </a>
        
        <ScrollManager />
        <LoadingScreen />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <CookieConsent />
      </body>
    </html>
  );
}
