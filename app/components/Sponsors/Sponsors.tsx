'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const sponsors = [
  { 
    name: 'Amstelhoekje', 
    logo: '/Sponsors/amstelhoekje/Amstelhoekje.png', 
    url: 'https://www.amstelhoekje.nl/',
  },
  { 
    name: 'Yara', 
    logo: '/Sponsors/yara/yara.png', 
    url: 'https://www.yara.nl/',
  },
  { 
    name: 'Sonny', 
    logo: '/sonny/image.png', 
    url: 'https://yggdrasilservice.nl/',
  },
  { 
    name: 'Neels', 
    logo: '/Sponsors/neels/autogarageneels.png', 
    url: 'https://www.facebook.com/autogarage.neels?locale=nl_NL',
  },
  { 
    name: 'Hamelink Elektro', 
    logo: '/Sponsors/hamelink/elektro.png', 
    url: 'https://hamelink-elektro.webnode.nl/',
  },
  { 
    name: 'Bouwbedrijf Neels', 
    logo: '/Sponsors/Bouwneels/Bouw.png', 
    url: 'https://www.facebook.com/BouwbedrijfNeels/?locale=nl_NL',
  },
  { 
    name: 'RHTS', 
    logo: '/Sponsors/Rick/rhts.png', 
    url: 'https://www.rhts-online.nl/',
  },
];

// Duplicate sponsors for seamless infinite scroll
const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors];

export default function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
    >
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

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-phosphate text-center mb-8 sm:mb-12 md:mb-16"
      >
        SPONSOREN
      </motion.h2>

      {/* Carousel Container */}
      <div className="relative z-10">
        {/* Scrolling Track */}
        <div className="overflow-hidden py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex"
          >
            {/* Logos */}
            <div 
              className="flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 animate-scroll"
            >
              {duplicatedSponsors.map((sponsor, index) => (
                <Link
                  key={`first-${index}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 transition-transform duration-300 hover:scale-110"
                  onMouseEnter={(e) => {
                    const track = e.currentTarget.parentElement;
                    if (track) track.style.animationPlayState = 'paused';
                  }}
                  onMouseLeave={(e) => {
                    const track = e.currentTarget.parentElement;
                    if (track) track.style.animationPlayState = 'running';
                  }}
                >
                  <div className={`relative ${
                    sponsor.name === 'Amstelhoekje' 
                      ? 'h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80' 
                      : 'h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 w-28 sm:w-32 md:w-40 lg:w-52 xl:w-64'
                  }`}>
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 208px, 320px"
                      className="object-contain"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 text-center mt-8 sm:mt-10 md:mt-12 px-4"
      >
        <p className="text-white/80 font-outfit text-sm md:text-base mb-2">
          Interesse om sponsor te worden?{' '}
          <Link 
            href="mailto:info@axelfest.nl"
            className="underline hover:text-white transition-colors"
          >
            Neem contact op
          </Link>
        </p>
        <p className="text-white/60 font-outfit text-xs md:text-sm italic">
          Bedankt aan al onze sponsoren voor hun steun aan Axelfest 2026
        </p>
      </motion.div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50 z-20" />
    </section>
  );
}