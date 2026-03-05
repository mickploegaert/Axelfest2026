'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../i18n';

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
const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

export default function Sponsors() {
  const { t } = useTranslation();
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
        {t('sponsors.title')}
      </motion.h2>

      {/* Carousel Container */}
      <div className="relative z-10">
        {/* Scrolling Track */}
        <div className="overflow-hidden py-4 sm:py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Logos - uses CSS animation for reliable mobile scrolling */}
            <div 
              className="flex items-center gap-8 sm:gap-10 md:gap-14 lg:gap-16 xl:gap-20 sponsor-scroll"
              style={{ width: 'max-content' }}
            >
              {duplicatedSponsors.map((sponsor, index) => (
                <Link
                  key={`sponsor-${index}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 transition-transform duration-300 hover:scale-110"
                >
                  <div className={`relative ${
                    sponsor.name === 'Amstelhoekje' 
                      ? 'h-16 sm:h-20 md:h-28 lg:h-36 xl:h-44 w-28 sm:w-36 md:w-44 lg:w-56 xl:w-72' 
                      : 'h-12 sm:h-16 md:h-20 lg:h-28 xl:h-36 w-24 sm:w-28 md:w-36 lg:w-48 xl:w-56'
                  }`}>
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 192px, 280px"
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
          {t('sponsors.interest')}{' '}
          <Link 
            href="mailto:info@axelfest.nl"
            className="underline hover:text-white transition-colors"
          >
            {t('sponsors.cta')}
          </Link>
        </p>
        <p className="text-white/60 font-outfit text-xs md:text-sm italic">
          {t('sponsors.thanks')}
        </p>
      </motion.div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50 z-20" />
    </section>
  );
}