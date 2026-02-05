import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Anton } from "next/font/google";
import "./globals.css";
import { Navbar, LoadingScreen } from "./components";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${anton.variable} antialiased`}
      >
        <ScrollManager />
        <LoadingScreen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
