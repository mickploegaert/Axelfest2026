"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldSlideUp, setShouldSlideUp] = useState(false);

  useEffect(() => {
    // Start slide-up animation after 2.5 seconds
    const slideTimer = setTimeout(() => {
      setShouldSlideUp(true);
    }, 2500);

    // Remove from DOM after animation completes (2.5s + 1s animation)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-transform duration-1000 ease-in-out ${
        shouldSlideUp ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundImage: "url('/BackgroundMain/Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="animate-pulse">
        <Image
          src="/AxelfestLogos/axelfest.png"
          alt="Axelfest Logo"
          width={400}
          height={400}
          className="w-64 h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
