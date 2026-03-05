'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { useTranslation } from '../../i18n';

// Declare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function Contact() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Turnstile widget
  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const initTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetIdRef.current) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAACYA3Hrl3kkAo2SM',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          'expired-callback': () => {
            setTurnstileToken(null);
          },
          'error-callback': () => {
            setTurnstileToken(null);
          },
          theme: 'dark',
          size: 'normal',
        });
        turnstileWidgetIdRef.current = widgetId;
        setTurnstileLoaded(true);
      }
    };

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      initTurnstile();
    } else {
      // Wait for Turnstile script to load
      checkInterval = setInterval(() => {
        if (window.turnstile) {
          if (checkInterval) clearInterval(checkInterval);
          initTurnstile();
        }
      }, 100);
    }

    // Cleanup: remove widget on unmount only
    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
          turnstileWidgetIdRef.current = null;
        } catch {
          // Widget may already be removed
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    if (!turnstileToken) {
      setError(t('contact.noToken'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er is een fout opgetreden');
      }
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTurnstileToken(null);
      
      // Reset Turnstile widget
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : t('contact.error'));
      
      // Reset Turnstile widget on error
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setTurnstileToken(null);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-dvh py-16 sm:py-24 md:py-32 lg:py-48"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start lg:items-end">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight font-phosphate mb-4 sm:mb-6 md:mb-10">
              {t('contact.title')}
            </h1>
            <div className="w-24 sm:w-32 md:w-40 h-1 sm:h-2 bg-white mb-8 sm:mb-12" />
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-outfit font-light mb-6 sm:mb-10">
              {t('contact.question')}
            </h2>
            
            <p className="text-white/80 font-outfit text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-14 leading-relaxed">
              {t('contact.intro')}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-14">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <HiMail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <p className="text-white/60 font-outfit text-sm sm:text-base md:text-lg">{t('contact.email')}</p>
                  <a href="mailto:info@axelfest.nl" className="text-white font-outfit text-base sm:text-lg md:text-xl hover:underline">
                    info@axelfest.nl
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <HiLocationMarker className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <p className="text-white/60 font-outfit text-sm sm:text-base md:text-lg">{t('contact.location')}</p>
                  <p className="text-white font-outfit text-base sm:text-lg md:text-xl">{t('contact.locationVal')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white/60 font-outfit text-sm sm:text-base md:text-lg mb-4 sm:mb-6">{t('contact.follow')}</p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="https://www.instagram.com/axelfest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61564200064044&locale=nl_NL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </a>
                <a
                  href="https://www.tiktok.com/@axelfesthofplein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-16 text-center border border-white/20">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-outfit mb-3 sm:mb-4 md:mb-6">
                  {t('contact.sent')}
                </h3>
                <p className="text-white/80 font-outfit text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8">
                  {t('contact.sentDesc')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-outfit font-semibold text-white hover:underline text-base sm:text-lg md:text-xl"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Name */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 bg-white/10 backdrop-blur-sm border-none rounded-lg sm:rounded-xl text-white placeholder-white/50 font-outfit text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  placeholder={t('contact.namePlaceholder')}
                />

                {/* Email */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 bg-white/10 backdrop-blur-sm border-none rounded-lg sm:rounded-xl text-white placeholder-white/50 font-outfit text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  placeholder={t('contact.emailPlaceholder')}
                />

                {/* Message */}
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 bg-white/10 backdrop-blur-sm border-none rounded-lg sm:rounded-xl text-white placeholder-white/50 font-outfit text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />

                {/* Cloudflare Turnstile Widget */}
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div 
                    ref={turnstileRef}
                    className="cf-turnstile max-w-full overflow-hidden [&>iframe]:max-w-full"
                  />
                  {!turnstileToken && !turnstileLoaded && (
                    <div className="flex items-center gap-2 text-white/50 font-outfit text-xs sm:text-sm">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                      {t('contact.loading')}
                    </div>
                  )}
                  {turnstileToken && (
                    <p className="text-green-400/80 font-outfit text-xs sm:text-sm flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('contact.verified')}
                    </p>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <p className="text-red-200 font-outfit text-sm sm:text-base md:text-lg flex items-center gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-fill w-full bg-white/20 backdrop-blur-sm text-white font-outfit font-semibold py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-8 lg:py-6 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-xl tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
