"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "../../i18n";

const FlagNL = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 sm:w-6 sm:h-4">
    <rect width="640" height="160" fill="#AE1C28" />
    <rect y="160" width="640" height="160" fill="#FFF" />
    <rect y="320" width="640" height="160" fill="#21468B" />
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 sm:w-6 sm:h-4">
    <rect width="640" height="480" fill="#012169" />
    <path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" fill="#FFF" />
    <path d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" fill="#C8102E" />
    <path d="M241 0v480h160V0H241zM0 160v160h640V160H0z" fill="#FFF" />
    <path d="M273 0v480h96V0h-96zM0 192v96h640v-96H0z" fill="#C8102E" />
  </svg>
);

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const { t, locale, setLocale } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t('nav.lineup'), href: "/lineup" },
    { label: t('nav.timetable'), href: "/timetable" },
    { label: t('nav.info'), href: "/info" },
    { label: t('nav.sponsors'), href: "/sponsors" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 sm:h-24 md:h-28 relative">
            {/* Logo + Datum/Locatie - Links */}
            <div className="flex items-center gap-3 sm:gap-6 flex-1">
              {/* Logo Image */}
              <Link href="/" className="flex items-center group">
                <Image
                  src="/AxelfestLogos/axelfest.png"
                  alt="Axelfest Logo"
                  width={160}
                  height={80}
                  className="h-10 sm:h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>
              
              {/* Divider */}
              <div className="hidden sm:block w-px h-8 sm:h-10 md:h-12 bg-white/40" />
              
              {/* Datum & Locatie */}
              <div className="hidden sm:flex flex-col font-outfit text-white leading-snug">
                <span className="text-base sm:text-lg md:text-xl font-medium tracking-wide">{t('nav.date')}</span>
                <span className="text-sm sm:text-base md:text-lg font-light text-white/70">{t('nav.location')}</span>
              </div>
            </div>

            {/* Navigation Items - Midden (Absolute Centered) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-12 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group font-outfit text-white/85 hover:text-white font-normal text-lg xl:text-xl tracking-wide transition-all duration-200 whitespace-nowrap relative py-2"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-0 w-full h-[0.5px] bg-white/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Tickets Button + Language + Hamburger - Rechts */}
            <div className="flex items-center justify-end flex-1 gap-2 sm:gap-3">
              {/* Language Flags */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => setLocale('nl')}
                  className={`flex items-center justify-center w-8 h-6 sm:w-9 sm:h-7 rounded-full border transition-all duration-200 overflow-hidden ${
                    locale === 'nl'
                      ? 'border-white/70 bg-white/20 ring-1 ring-white/30'
                      : 'border-white/20 bg-black/30 hover:bg-white/10'
                  }`}
                  aria-label="Nederlands"
                  title="Nederlands"
                >
                  <FlagNL />
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`flex items-center justify-center w-8 h-6 sm:w-9 sm:h-7 rounded-full border transition-all duration-200 overflow-hidden ${
                    locale === 'en'
                      ? 'border-white/70 bg-white/20 ring-1 ring-white/30'
                      : 'border-white/20 bg-black/30 hover:bg-white/10'
                  }`}
                  aria-label="English"
                  title="English"
                >
                  <FlagEN />
                </button>
              </div>

              <a
                href="https://weeztix.shop/rb45ueqd"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill font-outfit font-light text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-widest uppercase px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 border border-white/50 bg-transparent transition-all duration-300"
              >
                {t('nav.tickets')}
              </a>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white hover:bg-white/10 rounded-lg transition-all duration-300 relative z-[60]"
                aria-label={t('nav.toggleMenu')}
              >
                {isMenuOpen ? (
                  <HiX className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <HiMenu className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 min-h-[100dvh] bg-black/98 z-[55] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Close button area at top */}
        <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 flex items-center justify-end px-4 sm:px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            aria-label={t('nav.closeMenu')}
          >
            <HiX className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Menu content - centered with proper spacing */}
        <div className="flex flex-col items-center justify-center h-full min-h-[100dvh] pt-20 pb-8 px-6 overflow-y-auto">
          <nav className="flex flex-col items-center gap-6 sm:gap-8">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-outfit text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide hover:text-white/70 transition-all duration-300 transform"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  animation: isMenuOpen ? 'fadeInUp 0.4s ease forwards' : 'none',
                  opacity: isMenuOpen ? 1 : 0
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Tickets Button */}
          <a
            href="https://weeztix.shop/rb45ueqd"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="btn-fill mt-8 sm:mt-10 font-outfit font-light text-white text-xl sm:text-2xl tracking-widest uppercase px-8 py-4 border border-white/50 bg-transparent transition-all duration-300"
            style={{ 
              animationDelay: `${navItems.length * 80}ms`,
              animation: isMenuOpen ? 'fadeInUp 0.4s ease forwards' : 'none',
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            {t('nav.tickets')}
          </a>
          
          {/* Mobile Date/Location */}
          <div 
            className="mt-10 sm:mt-12 flex flex-col items-center font-outfit text-white/50 text-center"
            style={{ 
              animationDelay: `${(navItems.length + 1) * 80}ms`,
              animation: isMenuOpen ? 'fadeInUp 0.4s ease forwards' : 'none',
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            <span className="text-base sm:text-lg">{t('nav.dateFull')}</span>
            <span className="text-sm sm:text-base mt-1">{t('nav.location')}</span>
          </div>

          {/* Mobile Language Flags */}
          <div 
            className="mt-6 flex items-center gap-3"
            style={{ 
              animationDelay: `${(navItems.length + 2) * 80}ms`,
              animation: isMenuOpen ? 'fadeInUp 0.4s ease forwards' : 'none',
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            <button
              onClick={() => setLocale('nl')}
              className={`flex items-center justify-center w-10 h-7 rounded-full border transition-all duration-200 overflow-hidden ${
                locale === 'nl'
                  ? 'border-white/70 bg-white/20 ring-1 ring-white/30 scale-110'
                  : 'border-white/20 bg-black/30 hover:bg-white/10'
              }`}
              aria-label="Nederlands"
              title="Nederlands"
            >
              <FlagNL />
            </button>
            <button
              onClick={() => setLocale('en')}
              className={`flex items-center justify-center w-10 h-7 rounded-full border transition-all duration-200 overflow-hidden ${
                locale === 'en'
                  ? 'border-white/70 bg-white/20 ring-1 ring-white/30 scale-110'
                  : 'border-white/20 bg-black/30 hover:bg-white/10'
              }`}
              aria-label="English"
              title="English"
            >
              <FlagEN />
            </button>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
