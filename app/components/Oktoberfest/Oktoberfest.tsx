'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { HiCalendar, HiClock, HiLocationMarker, HiMusicNote } from 'react-icons/hi';

// Countdown Carousel Component
function CountdownCarousel({ position }: { position: 'top' | 'bottom' }) {
  const [isPaused, setIsPaused] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Oktoberfest datum: 25 September 2026, 18:00
      const festivalDate = new Date('2026-09-25T18:00:00');
      const now = new Date();
      const difference = festivalDate.getTime() - now.getTime();

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const getMessage = () => `${days} DAGEN ✦ ${hours} UUR ✦ ${minutes} MIN ✦ ${seconds} SEC ✦ `;

  return (
    <div 
      className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-20 overflow-hidden`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* White/Transparent Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-white/10 backdrop-blur-sm border-y border-white/20"
        />

        {/* Countdown carousel */}
        <div className="relative z-10">
          <div className="flex">
            <motion.div
              className="flex whitespace-nowrap py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-outfit font-semibold"
              animate={{
                x: isPaused ? '0%' : ["0%", "-50%"],
              }}
              transition={{
                duration: isPaused ? 0 : 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {Array(12).fill(null).map((_, i) => (
                <span key={i} className="inline-block px-4 sm:px-6 text-white/90 drop-shadow-sm">
                  {getMessage()}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Oktoberfest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Countdown Carousel - TOP */}
      <CountdownCarousel position="top" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white font-outfit text-sm sm:text-base font-medium tracking-wider uppercase">
              Thema Avond · Vrijdag 25 September
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-phosphate text-center mb-4"
        >
          OKTOBERFEST
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-outfit text-center mb-12 sm:mb-16"
        >
          De ultieme start van een onvergetelijk festivalweekend
        </motion.p>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Side - Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative group flex justify-center"
          >
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Poster Container - full visibility */}
            <div className="relative w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50 bg-black/20 backdrop-blur-sm">
                {/* Poster Image - using object-contain to show full poster */}
                <div className="relative w-full" style={{ paddingBottom: '141.4%' }}>
                  <Image
                    src="/Posters/oktoberfest.png"
                    alt="Oktoberfest Poster"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={isInView ? { scale: 1, rotate: -12 } : {}}
                transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20"
              >
                <div className="bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-outfit font-bold text-xs sm:text-sm shadow-lg">
                  SPECIAL EVENT
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Description Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
              <p className="text-base sm:text-lg md:text-xl text-white/90 font-outfit leading-relaxed">
                Op <span className="text-white font-semibold">vrijdagavond 25 september</span> trappen we Axelfest af in stijl met een heuse Oktoberfest editie! 
                Verwacht Beierse gezelligheid, lederhosen, dirndls en de beste feestmuziek.
              </p>
              <p className="mt-4 text-base sm:text-lg text-white/70 font-outfit leading-relaxed">
                Trek je mooiste Tiroler outfit aan en kom genieten van een avond vol plezier, 
                dans en de perfecte start van een legendarisch festivalweekend!
              </p>
            </div>

            {/* Info Items */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <HiCalendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 font-outfit text-sm">Datum</p>
                  <p className="text-white font-outfit font-semibold">Vrijdag 25 September</p>
                </div>
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <HiClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 font-outfit text-sm">Tijd</p>
                  <p className="text-white font-outfit font-semibold">Vanaf 18:00 uur</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <HiLocationMarker className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 font-outfit text-sm">Locatie</p>
                  <p className="text-white font-outfit font-semibold">Hofplein, Axel</p>
                </div>
              </motion.div>

              {/* Music */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
              >
                <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <HiMusicNote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 font-outfit text-sm">Muziek</p>
                  <p className="text-white font-outfit font-semibold">Feest & Schlager</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-2"
            >
              <a
                href="https://weeztix.shop/rb45ueqd"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-transparent border-2 border-white/50 hover:border-white hover:bg-white hover:text-black text-white font-outfit font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                <span>Koop Tickets</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown Carousel - BOTTOM */}
      <CountdownCarousel position="bottom" />
    </section>
  );
}
