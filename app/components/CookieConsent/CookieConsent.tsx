'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiX, HiCheck, HiShieldCheck, HiChartBar, HiSpeakerphone, HiCog, HiExternalLink } from 'react-icons/hi';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

// Get initial preferences from localStorage (lazy initializer for useState)
function getInitialPreferences(): CookiePreferences {
  if (typeof window === 'undefined') return defaultPreferences;
  try {
    const saved = localStorage.getItem('axelfest-cookie-consent');
    if (saved) {
      const parsed = JSON.parse(saved) as CookiePreferences;
      return parsed;
    }
  } catch {
    // Invalid data
  }
  return defaultPreferences;
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(getInitialPreferences);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Always show banner on new page load (use sessionStorage to track)
    const sessionSeen = sessionStorage.getItem('axelfest-cookie-seen');
    if (!sessionSeen) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('axelfest-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('axelfest-cookie-consent-date', new Date().toISOString());
    sessionStorage.setItem('axelfest-cookie-seen', 'true');
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    savePreferences(defaultPreferences);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  const cookieCategories = [
    {
      key: 'necessary' as const,
      title: 'Noodzakelijk',
      description: 'Essentieel voor websitewerking, beveiliging en Cloudflare Turnstile verificatie.',
      icon: HiShieldCheck,
      color: 'green',
      locked: true,
    },
    {
      key: 'functional' as const,
      title: 'Functioneel',
      description: 'Onthoudt je voorkeuren zoals formuliergegevens en instellingen.',
      icon: HiCog,
      color: 'blue',
      locked: false,
    },
    {
      key: 'analytics' as const,
      title: 'Analytisch',
      description: 'Helpt ons de website te verbeteren door anonieme statistieken.',
      icon: HiChartBar,
      color: 'purple',
      locked: false,
    },
    {
      key: 'marketing' as const,
      title: 'Marketing',
      description: 'Wordt momenteel niet actief gebruikt op deze website.',
      icon: HiSpeakerphone,
      color: 'orange',
      locked: false,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/BackgroundMain/Background.jpg"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            
            {/* Main Banner */}
            {!showSettings && (
              <div className="relative z-10 p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Cookie Icon & Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <HiShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-outfit">
                        Cookie-instellingen
                      </h3>
                    </div>
                    <p className="text-white/80 font-outfit text-sm leading-relaxed mb-3">
                      Wij gebruiken cookies om je de beste ervaring te bieden. Cloudflare Turnstile beschermt ons contactformulier.
                    </p>
                    <Link 
                      href="/privacy" 
                      className="inline-flex items-center gap-2 text-white font-outfit text-sm font-medium bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      Bekijk onze privacyverklaring
                    </Link>
                  </div>

                  {/* Quick Buttons - Desktop */}
                  <div className="hidden lg:flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="text-white/60 font-outfit font-medium px-4 py-2.5 rounded-xl hover:text-white hover:bg-white/10 transition-all text-sm"
                    >
                      Aanpassen
                    </button>
                    <button
                      onClick={acceptNecessary}
                      className="bg-white/10 text-white font-outfit font-medium px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all text-sm border border-white/20"
                    >
                      Alleen noodzakelijk
                    </button>
                    <button
                      onClick={acceptAll}
                      className="bg-white/90 text-black font-outfit font-semibold px-5 py-2.5 rounded-xl hover:bg-white transition-all text-sm"
                    >
                      Alles accepteren
                    </button>
                  </div>
                </div>

                {/* Quick Buttons - Mobile */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:hidden">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-white/90 text-black font-outfit font-semibold px-5 py-3 rounded-xl hover:bg-white transition-all text-sm"
                  >
                    Alles accepteren
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="flex-1 bg-white/10 text-white font-outfit font-medium px-5 py-3 rounded-xl hover:bg-white/20 transition-all text-sm border border-white/20"
                  >
                    Alleen noodzakelijk
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 sm:flex-none text-white/60 font-outfit font-medium px-5 py-3 rounded-xl hover:text-white hover:bg-white/10 transition-all text-sm"
                  >
                    Aanpassen
                  </button>
                </div>
              </div>
            )}

            {/* Settings Panel */}
            {showSettings && (
              <div className="relative z-10 p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <HiCog className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-outfit">
                      Cookie-voorkeuren
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <HiX className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-3 mb-5">
                  {cookieCategories.map((category) => {
                    const isEnabled = preferences[category.key];
                    const Icon = category.icon;
                    
                    return (
                      <div
                        key={category.key}
                        className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all ${
                          isEnabled ? 'border-white/30' : 'border-white/10'
                        } ${!category.locked ? 'hover:border-white/30 hover:bg-white/10 cursor-pointer' : ''}`}
                        onClick={() => !category.locked && togglePreference(category.key)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4">
                              <h4 className="text-white font-outfit font-semibold text-sm">
                                {category.title}
                                {category.locked && (
                                  <span className="ml-2 text-xs text-white/40 font-normal">(verplicht)</span>
                                )}
                              </h4>
                              <div className={`shrink-0 w-11 h-6 rounded-full flex items-center px-0.5 transition-all duration-200 ${
                                isEnabled ? 'bg-green-500 justify-end' : 'bg-white/20 justify-start'
                              } ${category.locked ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                <div className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${
                                  isEnabled ? 'bg-white' : 'bg-white/80'
                                }`}>
                                  {isEnabled && <HiCheck className="w-3 h-3 text-green-500" />}
                                </div>
                              </div>
                            </div>
                            <p className="text-white/50 font-outfit text-xs mt-1 leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saveCustomPreferences}
                    className="flex-1 bg-white/90 text-black font-outfit font-semibold px-6 py-3 rounded-xl hover:bg-white transition-all"
                  >
                    Voorkeuren opslaan
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-white/10 text-white font-outfit font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    Alles accepteren
                  </button>
                </div>

                <p className="text-white/40 font-outfit text-xs mt-4 text-center">
                  Je kunt je voorkeuren altijd wijzigen via &ldquo;Cookie-instellingen&rdquo; in de footer of op de{' '}
                  <Link href="/privacy" className="underline hover:text-white/60">privacypagina</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
