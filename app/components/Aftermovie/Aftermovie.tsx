'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function Aftermovie() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight font-phosphate leading-none drop-shadow-2xl text-center mb-8 sm:mb-10 md:mb-14"
        >
          AFTERMOVIE 2025
        </motion.h2>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
            <video
              className="w-full h-full object-cover"
              src="/Videos/2025aftermovie.mp4"
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
              poster="/BackgroundMain/Background.jpg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
