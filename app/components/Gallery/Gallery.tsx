'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { HiX, HiChevronLeft, HiChevronRight, HiZoomIn, HiZoomOut } from 'react-icons/hi';

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

// Ken Burns animation variants
const kenBurnsVariants = [
  { scale: 1, x: 0, y: 0 },
  { scale: 1.15, x: -20, y: -10 },
  { scale: 1.1, x: 20, y: -15 },
  { scale: 1.12, x: -15, y: 15 },
  { scale: 1.08, x: 10, y: 10 },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const hasUserInteracted = useRef(false);
  const previousIndex = useRef(0);

  // Preload next images
  useEffect(() => {
    const preloadImages = () => {
      const indicesToPreload = [
        (currentIndex + 1) % photos.length,
        (currentIndex + 2) % photos.length,
        (currentIndex - 1 + photos.length) % photos.length,
      ];
      
      indicesToPreload.forEach((index) => {
        const img = new window.Image();
        img.src = photos[index].src;
      });
    };
    
    preloadImages();
  }, [currentIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const timer = setInterval(() => {
      setSwipeDirection('left');
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
        }
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % photos.length);
        }
      } else {
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === ' ') {
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Scroll thumbnail into view (only after user has interacted)
  useEffect(() => {
    // Only scroll if index actually changed and user has interacted
    if (hasUserInteracted.current && previousIndex.current !== currentIndex && thumbnailRef.current) {
      const activeThumb = thumbnailRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        // Use scrollIntoView with block: 'nearest' to prevent page scrolling
        const container = thumbnailRef.current;
        const thumbRect = activeThumb.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Only scroll horizontally within the thumbnail container
        if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
          const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
    previousIndex.current = currentIndex;
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    hasUserInteracted.current = true;
    setSwipeDirection('left');
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const goToPrevious = useCallback(() => {
    hasUserInteracted.current = true;
    setSwipeDirection('right');
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  const goToSlide = (index: number) => {
    hasUserInteracted.current = true;
    setSwipeDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
  };

  // Swipe handlers
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrevious();
    }
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
  };

  // Get Ken Burns variant for current index
  const getKenBurnsAnimation = (index: number) => {
    const variant = kenBurnsVariants[index % kenBurnsVariants.length];
    return {
      initial: { scale: 1, x: 0, y: 0 },
      animate: { 
        scale: variant.scale, 
        x: variant.x, 
        y: variant.y,
        transition: { duration: 5, ease: 'linear' as const }
      },
    };
  };

  return (
    <>
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
              loading="lazy"
              sizes="100vw"
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
          className="relative h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {/* Photos with Ken Burns Effect */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: swipeDirection === 'left' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDirection === 'left' ? -100 : 100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => openLightbox(currentIndex)}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                initial={getKenBurnsAnimation(currentIndex).initial}
                animate={getKenBurnsAnimation(currentIndex).animate}
              >
                <Image
                  src={photos[currentIndex].src}
                  alt={`Festival foto ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Click to expand hint */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-outfit">
              <HiZoomIn className="w-4 h-4" />
              <span className="hidden sm:inline">Klik om te vergroten</span>
            </div>
          </div>

          {/* Arrow Navigation (Desktop) */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Vorige foto"
          >
            <HiChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Volgende foto"
          >
            <HiChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>

          {/* Swipe hint (Mobile) */}
          <div className="md:hidden absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-outfit flex items-center gap-2"
            >
              <HiChevronLeft className="w-4 h-4" />
              <span>Swipe om te navigeren</span>
              <HiChevronRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/60 via-black/30 to-transparent pt-20 pb-4 sm:pb-6 md:pb-8">
            {/* Thumbnail Strip */}
            <div className="mb-4 sm:mb-6 px-4">
              <div 
                ref={thumbnailRef}
                className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-2 px-2 max-w-4xl mx-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentIndex 
                        ? 'ring-2 ring-white scale-110 z-10' 
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                    aria-label={`Ga naar foto ${index + 1}`}
                  >
                    <Image
                      src={photo.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {/* Pause/Play Button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label={isPaused ? "Afspelen" : "Pauzeren"}
              >
                {isPaused ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>

              {/* Counter */}
              <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-2 rounded-full border border-white/30">
                <span className="font-outfit font-semibold text-white text-sm sm:text-base">
                  {currentIndex + 1} / {photos.length}
                </span>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => openLightbox(currentIndex)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Fullscreen"
              >
                <HiZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50" />
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              aria-label="Sluiten"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Zoom Toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              aria-label={isZoomed ? "Uitzoomen" : "Inzoomen"}
            >
              {isZoomed ? (
                <HiZoomOut className="w-6 h-6" />
              ) : (
                <HiZoomIn className="w-6 h-6" />
              )}
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              aria-label="Vorige"
            >
              <HiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % photos.length);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200"
              aria-label="Volgende"
            >
              <HiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Main Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`relative ${isZoomed ? 'w-full h-full' : 'w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[85vh]'} transition-all duration-300`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={`Festival foto ${lightboxIndex + 1}`}
                fill
                className={`${isZoomed ? 'object-contain' : 'object-contain'} transition-transform duration-300`}
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Lightbox Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-outfit font-semibold text-white">
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>

            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[90vw] overflow-x-auto py-2 px-4">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === lightboxIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
