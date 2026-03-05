'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiMail, HiShieldCheck, HiUserGroup, HiClock, HiGlobe, HiLockClosed, HiDatabase, HiDocumentText } from 'react-icons/hi';
import { useTranslation, type TranslationKey } from '../i18n';

const sectionIcons = [
  HiShieldCheck,   // s1 intro
  HiDatabase,      // s2 data collection
  HiGlobe,         // s3 purpose
  HiDocumentText,  // s4 cookies
  HiUserGroup,     // s5 third parties
  HiClock,         // s6 retention
  HiLockClosed,    // s7 rights
  HiShieldCheck,   // s8 security
  HiClock,         // s9 changes
];

export default function PrivacyContent() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const sections = Array.from({ length: 9 }, (_, i) => ({
    id: `s${i + 1}`,
    title: t(`privacy.s${i + 1}.title` as TranslationKey),
    icon: sectionIcons[i],
    content: t(`privacy.s${i + 1}.content` as TranslationKey),
  }));

  return (
    <section ref={containerRef} className="relative min-h-screen min-h-[100dvh] py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-outfit transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            {t('privacy.back')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <HiShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-white font-outfit text-sm font-medium tracking-wider uppercase">
              {t('privacy.badge')}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-phosphate mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/60 font-outfit">
            {t('privacy.subtitle')}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-outfit">
                    {section.title}
                  </h2>
                </div>
                <div className="text-white/70 font-outfit text-sm sm:text-base leading-relaxed whitespace-pre-line pl-0 sm:pl-16">
                  {section.content.split('**').map((part, i) => 
                    i % 2 === 1 ? (
                      <strong key={i} className="text-white font-semibold">{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <h3 className="text-lg font-bold text-white font-outfit mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <HiShieldCheck className="w-5 h-5 text-white" />
            </div>
            {t('privacy.techTitle')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Next.js</div>
              <div className="text-white/50 font-outfit text-xs">{t('privacy.techFramework')}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Cloudflare</div>
              <div className="text-white/50 font-outfit text-xs">{t('privacy.techCloudflare')}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Vercel</div>
              <div className="text-white/50 font-outfit text-xs">{t('privacy.techVercel')}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Google Fonts</div>
              <div className="text-white/50 font-outfit text-xs">{t('privacy.techFonts')}</div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-outfit mb-4">
            {t('privacy.contactTitle')}
          </h2>
          <p className="text-white/70 font-outfit mb-6">
            {t('privacy.contactDesc')}
          </p>
          <a
            href="mailto:info@axelfest.nl"
            className="inline-flex items-center gap-3 bg-white text-black font-outfit font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200"
          >
            <HiMail className="w-5 h-5" />
            info@axelfest.nl
          </a>
        </motion.div>

        {/* Cookie Settings Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => {
              localStorage.removeItem('axelfest-cookie-consent');
              sessionStorage.removeItem('axelfest-cookie-seen');
              window.location.reload();
            }}
            className="text-white/50 hover:text-white font-outfit text-sm underline transition-colors"
          >
            {t('privacy.cookieSettings')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
