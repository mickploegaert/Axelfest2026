"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {
        console.log('Autoplay geblokkeerd, wacht op interactie');
      });
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      attemptPlay();
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      attemptPlay();
    };

    const handleError = () => {
      setVideoError(true);
    };

    // Als video al geladen is
    if (video.readyState >= 3) {
      setVideoLoaded(true);
      attemptPlay();
    }

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Probeer meerdere keren te spelen
    const intervals = [
      setTimeout(attemptPlay, 100),
      setTimeout(attemptPlay, 500),
      setTimeout(attemptPlay, 1000),
      setTimeout(attemptPlay, 2000),
      setTimeout(attemptPlay, 4000),
    ];

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      intervals.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Video - works on all devices */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          backgroundColor: '#000',
        }}
      >
        <source src="/Videos/2025aftermovie.mp4" type="video/mp4" />
      </video>

      {/* Background Image - fallback alleen bij error */}
      {videoError && (
        <div className="absolute inset-0">
          <Image
            src="/BackgroundMain/Background.jpg"
            alt="Axelfest achtergrond"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      {/* Social Icons - Rechts Midden in Hero */}
      <div className="hidden sm:flex absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4 sm:gap-6 bg-black/20 backdrop-blur-sm px-2 sm:px-3 py-4 sm:py-6 rounded-full border border-white/20">
        <a
          href="https://www.instagram.com/axelfest/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61564200064044&locale=nl_NL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@axelfesthofplein"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
          aria-label="TikTok"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
          </svg>
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Main Title */}
        <h1 className="font-phosphate text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider leading-tight drop-shadow-2xl">
          AXELFEST
        </h1>
        <h2 className="font-phosphate text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-tight mb-12 drop-shadow-2xl">
          2026
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
          <a
            href="https://weeztix.shop/rb45ueqd"
            target="_blank"
            rel="noopener noreferrer"
            className="font-outfit text-white text-lg sm:text-xl font-light tracking-wide border-b-2 border-white/60 pb-1 hover:border-white transition-colors duration-200"
          >
            Koop tickets
          </a>
          <Link
            href="/lineup"
            className="font-outfit text-white text-lg sm:text-xl font-light tracking-wide border-b-2 border-white/60 pb-1 hover:border-white transition-colors duration-200"
          >
            Line-up
          </Link>
        </div>

        {/* Date & Location */}
        <div className="flex flex-col items-center font-outfit text-white">
          <span className="text-xl sm:text-2xl font-semibold tracking-wide">
            25 & 26 September
          </span>
          <span className="text-lg sm:text-xl font-light text-white/80">
            Hofplein Axel
          </span>
        </div>
      </div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50" />
    </section>
  );
};

export default Hero;
