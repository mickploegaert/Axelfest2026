'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function Location() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-24 lg:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-phosphate">
            LOCATIE
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.123!2d3.9076!3d51.2677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c38c0e9c51f8a1%3A0x4b8ec0c35a9f1d6a!2sHofplein%2C%20Axel!5e0!3m2!1snl!2snl!4v1707152400000!5m2!1snl!2snl"
            width="100%"
            className="h-64 sm:h-80 md:h-96 lg:h-125 xl:h-150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Axelfest Locatie - Hofplein, Axel"
          />
        </motion.div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 inline-block">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white font-outfit">
                Hofplein, Axel
              </h3>
            </div>
            <p className="text-white/80 font-outfit text-sm sm:text-base md:text-lg">
              Het hart van Zeeland, de perfecte festivallocatie
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50 z-20" />
    </section>
  );
}
