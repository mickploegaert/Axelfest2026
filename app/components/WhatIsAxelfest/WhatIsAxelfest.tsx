'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const photos = [
  { src: '/fotos/boss.jpg', alt: 'Axelfest moment 1' },
  { src: '/fotos/gaylords.jpg', alt: 'Axelfest moment 2' },
  { src: '/fotos/homos.jpg', alt: 'Axelfest moment 3' },
  { src: '/fotos/nogmeertweakers.jpg', alt: 'Axelfest moment 4' },
];

export default function WhatIsAxelfest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [phase, setPhase] = useState(0);
  
  // Scroll progress voor video circle expand op dezelfde sectie
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Loading bar progress (0 to 1) - hide after video phase
  const loadingProgress = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const loadingBarOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0]);
  
  // Circle scale (start klein, groeit tot vol scherm)
  const circleScale = useTransform(scrollYProgress, [0.35, 0.65], [0.5, 1]);
  
  // Video opacity
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'De ultieme festival ervaring in het hart van Zeeland. Waar muziek, cultuur en vriendschap samenkomen op het iconische Hofplein in Axel. Twee dagen vol onvergetelijke momenten, legendarische artiesten en een sfeer die je nergens anders vindt. Dit is meer dan een festival dit is AXELFEST.';

  useEffect(() => {
    if (isInView && phase === 0) {
      const timer1 = setTimeout(() => setPhase(1), 600);
      return () => clearTimeout(timer1);
    }
  }, [isInView, phase]);

  useEffect(() => {
    if (phase === 1) {
      const timer2 = setTimeout(() => setPhase(2), 1800);
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 2) {
      const timer3 = setTimeout(() => setPhase(3), 1000);
      return () => clearTimeout(timer3);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 3) {
      const timer4 = setTimeout(() => setPhase(4), 800);
      return () => clearTimeout(timer4);
    }
  }, [phase]);

  // Typewriter effect
  useEffect(() => {
    if (phase >= 4 && displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [phase, displayedText, fullText]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] sm:h-[350vh] md:h-[400vh] lg:h-[450vh]"
    >
      {/* Loading Bar - bovenaan */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-100 h-1.5 bg-white"
        style={{
          scaleX: loadingProgress,
          transformOrigin: 'left',
          opacity: loadingBarOpacity,
        }}
      />

      {/* Main Content - sticky */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Image - Full screen, always visible */}
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        {/* Photo Grid Container - with cyan border/gap effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10 p-3 bg-cyan-500"
        >
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.25,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    phase >= 2 ? 'grayscale-0' : 'grayscale'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Left Overlay - bounces from left */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={phase >= 2 ? { x: 0 } : { x: '-100%' }}
          transition={{ 
            type: 'spring',
            stiffness: 80,
            damping: 12,
            mass: 1
          }}
          className="absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,120,200,0.75) 0%, rgba(80,0,180,0.6) 100%)',
          }}
        />

        {/* Right Overlay - bounces from right */}
        <motion.div
          initial={{ x: '100%' }}
          animate={phase >= 2 ? { x: 0 } : { x: '100%' }}
          transition={{ 
            type: 'spring',
            stiffness: 80,
            damping: 12,
            mass: 1,
            delay: 0.08
          }}
          className="absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, rgba(0,120,200,0.75) 0%, rgba(120,0,200,0.6) 100%)',
          }}
        />

        {/* Center Content */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={phase >= 3 ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="text-center mb-4 sm:mb-6 md:mb-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white uppercase tracking-tight font-phosphate leading-none drop-shadow-2xl">
              WAT IS
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white uppercase tracking-tight font-phosphate leading-none drop-shadow-2xl">
              AXELFEST?
            </h2>
          </motion.div>

          {/* Typewriter Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6"
          >
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white leading-relaxed font-outfit drop-shadow-lg">
              {displayedText}
              {phase >= 4 && displayedText.length < fullText.length && (
                <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse" />
              )}
            </p>
          </motion.div>
        </div>

        {/* Subtle vignette for depth */}
        <div 
          className="absolute inset-0 z-25 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
          }}
        />

        {/* Video Circle Overlay - komt over alles heen tijdens scrollen */}
        <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.div
            style={{
              scale: circleScale,
              opacity: videoOpacity,
            }}
            className="relative w-full h-full pointer-events-auto"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              src="/Videos/aftermoviecut.mp4"
              loop
              playsInline
              controls
              controlsList="nodownload"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
