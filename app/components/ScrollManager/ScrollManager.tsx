"use client";

import { useEffect, useLayoutEffect } from "react";

export default function ScrollManager() {
  // Use useLayoutEffect for immediate execution before paint
  useLayoutEffect(() => {
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Multiple scroll resets at different intervals to catch any delayed scroll
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate
    scrollToTop();
    
    // After short delays to override any component-triggered scrolls
    const timers = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
      setTimeout(scrollToTop, 500),
      setTimeout(scrollToTop, 1000),
      // After loading screen animation completes (3.5s)
      setTimeout(scrollToTop, 3600),
      setTimeout(scrollToTop, 4000),
    ];

    // Prevent scroll during loading phase
    const preventScroll = (e: Event) => {
      // Only prevent automatic scroll, not user scroll
      if (!e.isTrusted) {
        e.preventDefault();
      }
    };

    // Add listener to catch programmatic scrolls
    document.addEventListener('scroll', preventScroll, { passive: false });

    // Remove after loading is complete
    const removeListener = setTimeout(() => {
      document.removeEventListener('scroll', preventScroll);
    }, 4500);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearTimeout(removeListener);
      document.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return null;
}
