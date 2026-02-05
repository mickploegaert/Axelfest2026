"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Generate particles once outside component to avoid Math.random issues
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}));

// Sound wave bars for the traveling wave
const waveBars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  height: Math.sin(i * 0.5) * 30 + 40 + Math.random() * 20,
  delay: i * 0.02,
}));

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldSlideUp, setShouldSlideUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [wavePosition, setWavePosition] = useState(-100); // Start off screen left
  const [waveComplete, setWaveComplete] = useState(false);

  useEffect(() => {
    // Animate wave across screen
    const waveInterval = setInterval(() => {
      setWavePosition((prev) => {
        if (prev >= 200) {
          clearInterval(waveInterval);
          setWaveComplete(true);
          return 200;
        }
        return prev + 4;
      });
    }, 20);

    // When wave passes center (around 50%), trigger glitch
    const glitchTimer = setTimeout(() => {
      setGlitchActive(true);
    }, 600);

    // Show logo after glitch
    const showLogoTimer = setTimeout(() => {
      setGlitchActive(false);
      setShowLogo(true);
    }, 1000);

    // Animate progress bar (non-linear - fast start, slow end)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining * 0.08);
        return Math.min(100, prev + increment);
      });
    }, 50);

    // Start slide-up animation after 3 seconds
    const slideTimer = setTimeout(() => {
      setShouldSlideUp(true);
    }, 3000);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearInterval(waveInterval);
      clearTimeout(glitchTimer);
      clearTimeout(showLogoTimer);
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center transition-transform duration-1000 ease-in-out ${
        shouldSlideUp ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundImage: "url('/BackgroundMain/Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Traveling Sound Wave */}
      {!waveComplete && (
        <div 
          className="absolute top-0 bottom-0 flex items-center gap-0.5 pointer-events-none z-50"
          style={{
            left: `${wavePosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {waveBars.map((bar) => (
            <div
              key={bar.id}
              className="bg-white/80 rounded-full animate-wave-pulse"
              style={{
                width: '3px',
                height: `${bar.height}px`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        
        {/* Glitch Effect Container */}
        <div className="relative">
          {/* Glitch layers - appears when wave passes */}
          {glitchActive && (
            <>
              <div 
                className="absolute inset-0 opacity-70 animate-glitch-1"
                style={{
                  filter: 'hue-rotate(90deg)',
                }}
              >
                <Image
                  src="/AxelfestLogos/axelfest.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-80 sm:w-96 md:w-md lg:w-lg h-auto object-contain"
                  priority
                />
              </div>
              <div 
                className="absolute inset-0 opacity-70 animate-glitch-2"
                style={{
                  filter: 'hue-rotate(-90deg)',
                }}
              >
                <Image
                  src="/AxelfestLogos/axelfest.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-80 sm:w-96 md:w-md lg:w-lg h-auto object-contain"
                  priority
                />
              </div>
            </>
          )}
          
          {/* Main Logo - appears after glitch */}
          <div 
            className={`transition-all duration-300 ${
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${showLogo ? 'animate-pulse-subtle' : ''}`}
          >
            <Image
              src="/AxelfestLogos/axelfest.png"
              alt="Axelfest Logo"
              width={600}
              height={600}
              className="w-80 sm:w-96 md:w-md lg:w-lg h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Date Text */}
        <p 
          className={`text-white/90 font-outfit text-lg sm:text-xl md:text-2xl tracking-widest uppercase transition-all duration-700 delay-300 ${
            showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          25 & 26 September 2026
        </p>

        {/* Progress Bar Container */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-48 sm:w-56 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Progress Percentage */}
          <span 
            className={`text-white/60 font-outfit text-sm tracking-wider transition-opacity duration-500 ${
              showLogo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.02);
            filter: brightness(1.1);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        @keyframes wave-pulse {
          0%, 100% {
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-wave-pulse {
          animation: wave-pulse 0.4s ease-in-out infinite;
        }
        
        @keyframes glitch-1 {
          0%, 100% {
            transform: translate(-8px, 0);
          }
          25% {
            transform: translate(8px, -2px);
          }
          50% {
            transform: translate(-4px, 2px);
          }
          75% {
            transform: translate(4px, -1px);
          }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.2s linear infinite;
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            transform: translate(8px, 0);
          }
          25% {
            transform: translate(-8px, 2px);
          }
          50% {
            transform: translate(4px, -2px);
          }
          75% {
            transform: translate(-4px, 1px);
          }
        }
        .animate-glitch-2 {
          animation: glitch-2 0.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
