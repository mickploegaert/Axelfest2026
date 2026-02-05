"use client";

import { useEffect } from "react";
import { Hero, WhatIsAxelfest, Oktoberfest, Sponsors, Gallery, Location, Footer } from "./components";

export default function Home() {
  // Ensure page always starts at the top on load/reload
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Force scroll to top after a short delay to override any browser restoration
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero />
      <WhatIsAxelfest />
      <Oktoberfest />
      <Sponsors />
      <Gallery />
      <Location />
      <Footer />
    </>
  );
}

