import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Anton } from "next/font/google";
import "./globals.css";
import { Navbar, LoadingScreen, CookieConsent } from "./components";
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
  title: "Axelfest",
  description: "De ultieme festival ervaring in het hart van Zeeland",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        {/* DNS prefetch en preconnect voor snellere externe resources */}
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload kritieke video */}
        <link rel="preload" href="/Videos/aftermoviecut.mp4" as="video" type="video/mp4" />
        {/* Preload kritieke achtergrond */}
        <link rel="preload" href="/BackgroundMain/Background.jpg" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${anton.variable} antialiased`}
      >
        <ScrollManager />
        <LoadingScreen />
        <Navbar />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
