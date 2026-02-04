'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const photos = [
  { src: '/Slideshow/lieszhara.jpg' },
  { src: '/Slideshow/julius.jpg' },
  { src: '/Slideshow/image.png' },
  { src: '/Slideshow/guus.jpg' },
  { src: '/Slideshow/gitaruist.jpg' },
  { src: '/Slideshow/ginandjuice.jpg' },
  { src: '/Slideshow/gaylords.jpg' },
  { src: '/Slideshow/fire.jpg' },
  { src: '/Slideshow/crew.jpg' },
  { src: '/Slideshow/camiel.jpg' },
  { src: '/Slideshow/noa.jpg' },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      ref={containerRef}
      className="relative"
    >
      {/* Header */}
      <div className="relative py-10 sm:py-12 md:py-16 lg:py-20 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BackgroundMain/Background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-phosphate text-center">
            SFEERIMPRESSIE
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mt-4 sm:mt-6" />
        </motion.div>
      </div>

      {/* Fullscreen Slideshow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative h-[70vh] sm:h-[80vh] md:h-screen"
      >
        {/* Photos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[currentIndex].src}
              alt={`Festival foto ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls Overlay */}
        <div className="absolute inset-0 z-10">
          {/* Bottom Controls */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 md:gap-6 w-full px-4">
            {/* Pause/Play Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              aria-label={isPaused ? "Afspelen" : "Pauzeren"}
            >
              {isPaused ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              )}
            </button>

            {/* Dots Navigation - with responsive sizing and overflow handling */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg max-w-[90vw] overflow-x-auto">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-black w-5 sm:w-6 md:w-8' 
                      : 'bg-black/30 hover:bg-black/50'
                  }`}
                  aria-label={`Ga naar foto ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="bg-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full shadow-lg">
              <span className="font-outfit font-bold text-black text-sm sm:text-base md:text-lg">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50" />
    </section>
  );
}
