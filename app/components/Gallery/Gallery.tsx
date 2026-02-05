'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const photos = [
  // Alle unieke foto's uit fotos mapje
  { src: '/fotos/2025-09-26 Axelfest 2025 Vrijdag-38.jpg' },
  { src: '/fotos/2025-09-26 Axelfest 2025 Vrijdag-52.jpg' },
  { src: '/fotos/2025-09-27 Axelfest 2025 Zaterdag-29.jpg' },
  { src: '/fotos/2025-09-27 Axelfest 2025 Zaterdag-55.jpg' },
  { src: '/fotos/2025-09-27 Axelfest 2025 Zaterdag-86.jpg' },
  { src: '/fotos/2025-09-27 Axelfest 2025 Zaterdag-89.jpg' },
  { src: '/fotos/2025-09-27 Axelfest 2025 Zaterdag-91.jpg' },
  { src: '/fotos/boss.jpg' },
  { src: '/fotos/homos.jpg' },
  // Slideshow mapje (unieke, geen dubbele gaylords)
  { src: '/Slideshow/lieszhara.jpg' },
  { src: '/Slideshow/julius.jpg' },
  { src: '/Slideshow/guus.jpg' },
  { src: '/Slideshow/gitaruist.jpg' },
  { src: '/Slideshow/ginandjuice.jpg' },
  { src: '/Slideshow/fire.jpg' },
  { src: '/Slideshow/crew.jpg' },
  { src: '/Slideshow/noa.jpg' },
];

// Ken Burns animation variants - subtiel voor betere zichtbaarheid
const kenBurnsVariants = [
  { scale: 1.02, x: 0, y: 0, endX: 8, endY: 5 },
  { scale: 1.03, x: -5, y: -3, endX: 5, endY: 3 },
  { scale: 1.02, x: 5, y: -2, endX: -5, endY: 2 },
  { scale: 1.03, x: -3, y: 4, endX: 3, endY: -4 },
  { scale: 1.02, x: 4, y: 3, endX: -4, endY: -3 },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload next images
  useEffect(() => {
    const preloadImages = () => {
      const indicesToPreload = [
        (currentIndex + 1) % photos.length,
        (currentIndex + 2) % photos.length,
      ];
      
      indicesToPreload.forEach((index) => {
        const img = new window.Image();
        img.src = photos[index].src;
      });
    };
    
    preloadImages();
  }, [currentIndex]);

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Get Ken Burns variant for current index - vloeiende beweging
  const getKenBurnsAnimation = (index: number) => {
    const variant = kenBurnsVariants[index % kenBurnsVariants.length];
    return {
      initial: { scale: 1, x: variant.x, y: variant.y },
      animate: { 
        scale: variant.scale, 
        x: variant.endX, 
        y: variant.endY,
        transition: { 
          duration: 6, 
          ease: [0.25, 0.1, 0.25, 1] as const // custom cubic-bezier voor vloeiendheid
        }
      },
    };
  };

  return (
    <section 
      ref={containerRef}
      className="relative"
    >
      {/* Header met Background */}
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

      {/* Slideshow container met waves er overheen */}
      <div className="relative">
        {/* Fullscreen Slideshow - grotere sectie voor betere foto zichtbaarheid */}
        <div className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
          {/* Photos with Ken Burns Effect - crossfade */}
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
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
                  className="object-cover object-center"
                  style={{ objectPosition: '50% 35%' }}
                  priority={currentIndex === 0}
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top Wave - ligt OVER de foto met Background.jpg */}
        <div className="absolute top-0 left-0 right-0 w-full h-24 sm:h-32 md:h-40 lg:h-48 z-10 pointer-events-none overflow-hidden">
          {/* Vaste rechthoek bovenaan om gap te voorkomen */}
          <div className="absolute top-0 left-0 right-0 h-4 z-20">
            <Image
              src="/BackgroundMain/Background.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="bgPatternTop" patternUnits="objectBoundingBox" width="1" height="1">
                <image 
                  href="/BackgroundMain/Background.jpg" 
                  width="1440" 
                  height="320"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            {/* Top wave - morphing animation via d attribute */}
            <motion.path
              fill="url(#bgPatternTop)"
              initial={{ d: "M0,0L0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,213.3C672,245,768,267,864,229.3C960,192,1056,96,1152,53.3C1248,11,1344,21,1392,26.7L1440,32L1440,0Z" }}
              animate={{ 
                d: [
                  "M0,0L0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,213.3C672,245,768,267,864,229.3C960,192,1056,96,1152,53.3C1248,11,1344,21,1392,26.7L1440,32L1440,0Z",
                  "M0,0L0,200L48,220.7C96,200,192,160,288,170.7C384,181,480,160,576,190.3C672,220,768,240,864,210.3C960,180,1056,120,1152,80.3C1248,40,1344,50,1392,55.7L1440,60L1440,0Z",
                  "M0,0L0,240L48,190.7C96,170,192,150,288,160.7C384,170,480,200,576,230.3C672,260,768,250,864,220.3C960,190,1056,110,1152,70.3C1248,30,1344,40,1392,45.7L1440,50L1440,0Z",
                  "M0,0L0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,213.3C672,245,768,267,864,229.3C960,192,1056,96,1152,53.3C1248,11,1344,21,1392,26.7L1440,32L1440,0Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Bottom Wave - ligt OVER de foto met Background.jpg */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32 md:h-40 lg:h-48 z-10 pointer-events-none overflow-hidden">
          {/* Vaste rechthoek onderaan om gap te voorkomen */}
          <div className="absolute bottom-0 left-0 right-0 h-4 z-20">
            <Image
              src="/BackgroundMain/Background.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: 'center bottom' }}
            />
          </div>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="bgPatternBottom" patternUnits="objectBoundingBox" width="1" height="1">
                <image 
                  href="/BackgroundMain/Background.jpg" 
                  width="1440" 
                  height="320"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            {/* Bottom wave - morphing animation via d attribute */}
            <motion.path
              fill="url(#bgPatternBottom)"
              initial={{ d: "M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,106.7C672,75,768,53,864,90.7C960,128,1056,224,1152,266.7C1248,309,1344,299,1392,293.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,106.7C672,75,768,53,864,90.7C960,128,1056,224,1152,266.7C1248,309,1344,299,1392,293.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,120L48,100.3C96,80,192,140,288,160.3C384,181,480,160,576,130.7C672,100,768,80,864,110.7C960,140,1056,200,1152,240.7C1248,280,1344,280,1392,275.3L1440,270L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,80L48,130.3C96,150,192,170,288,170.3C384,170,480,130,576,100.7C672,70,768,60,864,80.7C960,100,1056,200,1152,250.7C1248,300,1344,290,1392,285.3L1440,280L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,106.7C672,75,768,53,864,90.7C960,128,1056,224,1152,266.7C1248,309,1344,299,1392,293.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
