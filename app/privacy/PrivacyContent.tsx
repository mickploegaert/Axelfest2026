'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiMail, HiShieldCheck, HiUserGroup, HiClock, HiGlobe, HiLockClosed, HiDatabase, HiDocumentText } from 'react-icons/hi';

export default function PrivacyContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const sections = [
    {
      id: 'intro',
      title: 'Inleiding',
      icon: HiShieldCheck,
      content: `Axelfest ("wij", "ons" of "onze") respecteert je privacy en is toegewijd aan het beschermen van je persoonlijke gegevens. Deze privacyverklaring legt uit hoe wij je gegevens verzamelen, gebruiken en beschermen wanneer je onze website bezoekt.

Deze privacyverklaring is van toepassing op alle bezoekers van onze website (www.axelfest.nl) en deelnemers aan het festival dat plaatsvindt op 25 en 26 september 2026 op het Hofplein in Axel.`,
    },
    {
      id: 'data-collection',
      title: 'Welke gegevens verzamelen wij?',
      icon: HiDatabase,
      content: `Wij verzamelen de volgende gegevens:

**Via het contactformulier:**
• Naam
• E-mailadres
• Berichtinhoud

**Automatisch bij websitebezoek:**
• IP-adres (geanonimiseerd via Cloudflare)
• Browsertype en -versie
• Apparaatinformatie
• Bezochte pagina's en tijdstip van bezoek

**Via cookies:**
• Sessie-informatie
• Cookie-voorkeuren
• Cloudflare Turnstile verificatiegegevens`,
    },
    {
      id: 'purpose',
      title: 'Waarvoor gebruiken wij je gegevens?',
      icon: HiGlobe,
      content: `Wij gebruiken je gegevens voor de volgende doeleinden:

**Communicatie:**
• Beantwoorden van vragen via het contactformulier
• Versturen van relevante informatie over het festival

**Websitebeheer:**
• Bescherming tegen spam en misbruik (Cloudflare Turnstile)
• Verbetering van websiteprestaties en -beveiliging
• Onthouden van je voorkeuren (zoals cookie-instellingen)

**Analyse (indien toestemming):**
• Inzicht krijgen in hoe bezoekers de website gebruiken
• Verbeteren van de gebruikerservaring`,
    },
    {
      id: 'cookies',
      title: 'Cookies & Technologieën',
      icon: HiDocumentText,
      content: `Onze website maakt gebruik van cookies en vergelijkbare technologieën:

**Noodzakelijke cookies (altijd actief):**
• Sessiecookies voor websitewerking
• Cookie-voorkeurencookie (axelfest-cookie-consent)
• Cloudflare Turnstile beveiligingscookie

**Functionele cookies (met toestemming):**
• Onthouden van formuliergegevens
• Voorkeursinstellingen

**Analytische cookies (met toestemming):**
• Anonieme bezoekersstatistieken
• Paginaweergaven en sessieduur

**Marketing cookies (met toestemming):**
• Worden momenteel niet actief gebruikt

**Cloudflare Turnstile:**
Wij gebruiken Cloudflare Turnstile om ons contactformulier te beschermen tegen spam en geautomatiseerde misbruik. Dit privacyvriendelijke alternatief voor CAPTCHA verifieert dat je een echte bezoeker bent zonder puzzels te hoeven oplossen.`,
    },
    {
      id: 'third-parties',
      title: 'Diensten van derden',
      icon: HiUserGroup,
      content: `Wij maken gebruik van de volgende diensten:

**Cloudflare:**
• Websitebeveiliging en prestatie-optimalisatie
• Cloudflare Turnstile voor spambescherming
• DDoS-bescherming
Privacy: https://www.cloudflare.com/privacypolicy/

**Vercel:**
• Hosting van onze website
• Next.js applicatie-infrastructuur
Privacy: https://vercel.com/legal/privacy-policy

**Google Fonts:**
• Laden van lettertypen (Outfit, Anton)
Privacy: https://policies.google.com/privacy

Wij verkopen je persoonlijke gegevens nooit aan derden. Alle externe diensten zijn GDPR-compliant.`,
    },
    {
      id: 'retention',
      title: 'Bewaartermijnen',
      icon: HiClock,
      content: `Wij bewaren je gegevens niet langer dan noodzakelijk:

• **Contactformulierberichten:** Maximaal 2 jaar
• **Cookie-voorkeuren:** 1 jaar
• **Sessiegegevens:** Tot einde browsersessie
• **Cloudflare logs:** Maximaal 4 dagen (door Cloudflare beheerd)

Na afloop van deze termijnen worden je gegevens automatisch verwijderd.`,
    },
    {
      id: 'rights',
      title: 'Jouw rechten (AVG)',
      icon: HiLockClosed,
      content: `Onder de Algemene Verordening Gegevensbescherming (AVG/GDPR) heb je de volgende rechten:

**Recht op inzage:**
Vraag op welke gegevens wij van je hebben.

**Recht op rectificatie:**
Laat onjuiste gegevens corrigeren.

**Recht op verwijdering:**
Vraag om verwijdering van je gegevens.

**Recht op beperking:**
Beperk de verwerking van je gegevens.

**Recht op bezwaar:**
Maak bezwaar tegen gegevensverwerking.

**Recht om toestemming in te trekken:**
Trek je cookietoestemming op elk moment in via de cookie-instellingen.

Neem contact op via info@axelfest.nl om je rechten uit te oefenen. Wij reageren binnen 30 dagen.

**Klacht indienen:**
Je kunt een klacht indienen bij de Autoriteit Persoonsgegevens via www.autoriteitpersoonsgegevens.nl`,
    },
    {
      id: 'security',
      title: 'Beveiliging',
      icon: HiShieldCheck,
      content: `Wij nemen beveiliging serieus:

• **SSL/TLS-encryptie:** Alle communicatie is versleuteld
• **Cloudflare bescherming:** DDoS-bescherming en Web Application Firewall
• **Turnstile verificatie:** Bescherming tegen bots en spam
• **Moderne hosting:** Beveiligde Vercel-infrastructuur
• **Minimale dataverzameling:** We verzamelen alleen wat nodig is

Hoewel we ons best doen, kan geen enkele online dienst 100% veiligheid garanderen. Bij vragen over beveiliging, neem contact met ons op.`,
    },
    {
      id: 'changes',
      title: 'Wijzigingen',
      icon: HiClock,
      content: `Wij kunnen deze privacyverklaring bijwerken wanneer nodig. Bij belangrijke wijzigingen informeren wij je via onze website.

Controleer deze pagina regelmatig voor de meest actuele informatie.

**Laatst bijgewerkt:** 5 februari 2026
**Versie:** 1.0`,
    },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 sm:py-32">
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
            Terug naar home
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
              Privacy & Gegevensbescherming
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-phosphate mb-4">
            Privacyverklaring
          </h1>
          <p className="text-lg sm:text-xl text-white/60 font-outfit">
            Axelfest 2026 · Hofplein, Axel
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
            Technologieën op deze website
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Next.js</div>
              <div className="text-white/50 font-outfit text-xs">Framework</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Cloudflare</div>
              <div className="text-white/50 font-outfit text-xs">Beveiliging</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Vercel</div>
              <div className="text-white/50 font-outfit text-xs">Hosting</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/>
                </svg>
              </div>
              <div className="text-white font-outfit text-sm font-medium">Google Fonts</div>
              <div className="text-white/50 font-outfit text-xs">Lettertypen</div>
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
            Vragen over privacy?
          </h2>
          <p className="text-white/70 font-outfit mb-6">
            Heb je vragen over deze privacyverklaring of wil je gebruik maken van je rechten? 
            Neem gerust contact met ons op.
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
            Cookie-instellingen wijzigen
          </button>
        </motion.div>
      </div>
    </section>
  );
}
