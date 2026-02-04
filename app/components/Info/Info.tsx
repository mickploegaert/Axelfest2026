'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  HiPlus,
  HiMinus,
  HiLocationMarker, 
  HiClock, 
  HiTicket, 
  HiCash,
  HiShieldCheck,
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiTruck,
  HiHome,
  HiKey,
  HiSearch,
  HiUsers,
  HiExclamation,
  HiBan
} from 'react-icons/hi';
import { MdLocalParking, MdDirectionsBike, MdEventSeat, MdRestaurant, MdLocalBar } from 'react-icons/md';

interface ContentBlock {
  type: 'text' | 'title' | 'list' | 'warning' | 'tip';
  content: string | string[];
}

interface InfoSectionData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: ContentBlock[];
}

const infoSections: InfoSectionData[] = [
  {
    id: 'locatie',
    icon: HiLocationMarker,
    title: 'Locatie',
    content: [
      { type: 'text', content: 'Axelfest wordt gehouden op het Hofplein in Axel.' },
    ],
  },
  {
    id: 'tickets',
    icon: HiTicket,
    title: 'Tickets',
    content: [
      { type: 'text', content: 'Tickets zijn online te koop via onze ticketpartner. Zorg ervoor dat je tickets koopt via officiële kanalen om teleurstellingen te voorkomen.' },
    ],
  },
  {
    id: 'openingstijden',
    icon: HiClock,
    title: 'Openingstijden',
    content: [
      { type: 'text', content: 'De precieze openingstijden worden later bekend gemaakt. Houd onze social media kanalen in de gaten voor updates.' },
    ],
  },
  {
    id: 'consumpties',
    icon: HiCash,
    title: 'Consumpties',
    content: [
      { type: 'text', content: 'Op het festival kun je betalen met zowel pin als contant geld bij alle bars en foodtrucks.' },
    ],
  },
  {
    id: 'eten-drinken',
    icon: MdRestaurant,
    title: 'Eten en Drinken',
    content: [
      { type: 'text', content: 'Er zijn verschillende foodtrucks en bars aanwezig op het terrein waar je terecht kunt voor eten en drinken.' },
      { type: 'warning', content: 'Het is niet toegestaan om eigen eten en drinken mee te nemen naar het festival.' },
    ],
  },
  {
    id: 'crowdsurfen',
    icon: HiUsers,
    title: 'Crowdsurfen',
    content: [
      { type: 'text', content: 'Crowdsurfen is toegestaan op het festival, maar gebeurt volledig op eigen risico.' },
      { type: 'warning', content: 'De organisatie is niet aansprakelijk voor eventuele blessures die hieruit voortkomen.' },
    ],
  },
  {
    id: 'alcohol',
    icon: MdLocalBar,
    title: 'Alcohol',
    content: [
      { type: 'text', content: 'Alcohol is te verkrijgen op het festival voor bezoekers van 18 jaar en ouder.' },
      { type: 'warning', content: 'Er wordt bij twijfel om legitimatie gevraagd.' },
    ],
  },
  {
    id: 'parkeren',
    icon: MdLocalParking,
    title: 'Parkeren',
    content: [
      { type: 'text', content: 'Er zijn voldoende parkeermogelijkheden rondom het festivalterrein. Volg de bewegwijzering ter plaatse.' },
    ],
  },
  {
    id: 'fietsenstalling',
    icon: MdDirectionsBike,
    title: 'Fietsenstalling',
    content: [
      { type: 'text', content: 'Er is een bewaakte fietsenstalling aanwezig bij het festival.' },
      { type: 'tip', content: 'Gebruik altijd een goed slot voor extra zekerheid.' },
    ],
  },
  {
    id: 'zitmateriaal',
    icon: MdEventSeat,
    title: 'Zitmateriaal',
    content: [
      { type: 'text', content: 'Je mag eigen zitmateriaal zoals campingstoelen en picknickkleden meenemen naar het festival.' },
      { type: 'tip', content: 'Let erop dat je andere bezoekers niet hindert met je opstelling.' },
    ],
  },
  {
    id: 'camping',
    icon: HiHome,
    title: 'Camping',
    content: [
      { type: 'text', content: 'Er is geen camping beschikbaar op of bij het festivalterrein.' },
      { type: 'tip', content: 'Check de beschikbare hotels en accommodaties in de omgeving.' },
    ],
  },
  {
    id: 'hotels',
    icon: HiHome,
    title: 'Hotels',
    content: [
      { type: 'text', content: 'In de regio zijn verschillende hotels en accommodaties beschikbaar voor overnachting.' },
      { type: 'tip', content: 'Reserveer op tijd, want tijdens het festival is het druk in de omgeving!' },
    ],
  },
  {
    id: 'gevonden-voorwerpen',
    icon: HiSearch,
    title: 'Gevonden Voorwerpen',
    content: [
      { type: 'text', content: 'Verloren voorwerpen kunnen tijdens het festival gemeld worden bij de informatiestand op het terrein.' },
      { type: 'text', content: 'Na afloop van het festival kun je contact opnemen via onze contactpagina of social media.' },
    ],
  },
  {
    id: 'kluisjes',
    icon: HiKey,
    title: 'Kluisjes',
    content: [
      { type: 'warning', content: 'Er zijn geen kluisjes beschikbaar op het festivalterrein.' },
      { type: 'tip', content: 'Neem alleen de meest noodzakelijke spullen mee en houd je waardevolle bezittingen goed bij je.' },
    ],
  },
  {
    id: 'huisregels',
    icon: HiShieldCheck,
    title: 'Huisregels (Algemene Voorwaarden)',
    content: [
      { type: 'text', content: 'Door het kopen van een ticket ga je automatisch akkoord met de volgende huisregels:' },
      { type: 'list', content: [
        'De minimumleeftijd voor toegang is 16 jaar',
        'Drugs zijn ten strengste verboden',
        'Wapens, vuurwerk en gevaarlijke voorwerpen zijn niet toegestaan',
        'Agressief gedrag wordt niet getolereerd',
        'Eigen eten en drinken meenemen is niet toegestaan',
        'Professionele camera\'s en video-apparatuur zijn alleen toegestaan met voorafgaande toestemming',
        'Volg te allen tijde de aanwijzingen van security en organisatie op',
        'Crowdsurfen is toegestaan maar op eigen risico',
        'De organisatie behoudt zich het recht voor om personen de toegang te weigeren of te verwijderen',
        'Het festival gaat door bij alle weersomstandigheden - tickets zijn niet terugbetaalbaar'
      ]},
      { type: 'warning', content: 'Het niet naleven van de huisregels kan leiden tot verwijdering van het terrein zonder restitutie.' },
    ],
  },
];

const faqSections = [
  {
    id: 'faq-1',
    question: 'Wat is de minimumleeftijd voor Axelfest?',
    answer: 'De minimumleeftijd voor toegang tot Axelfest is 16 jaar. Bij twijfel wordt om legitimatie gevraagd.'
  },
  {
    id: 'faq-2',
    question: 'Kan ik mijn ticket terugbetaald krijgen?',
    answer: 'Nee, tickets zijn niet terugbetaalbaar. Het festival gaat door bij alle weersomstandigheden.'
  },
  {
    id: 'faq-3',
    question: 'Wat moet ik meenemen naar het festival?',
    answer: 'Zorg voor je ticket (digitaal of print), legitimatie, geld/pinpas, en eventueel een campingstoel. Geen eigen eten of drinken.'
  },
  {
    id: 'faq-4',
    question: 'Is er medische hulp beschikbaar?',
    answer: 'Ja, er is EHBO aanwezig op het festivalterrein. Meld je bij de informatiestand als je hulp nodig hebt.'
  },
  {
    id: 'faq-5',
    question: 'Kan ik mijn fiets veilig parkeren?',
    answer: 'Ja, er is een bewaakte fietsenstalling bij het terrein. Gebruik wel altijd een goed slot.'
  },
  {
    id: 'faq-6',
    question: 'Mag ik foto\'s en video\'s maken?',
    answer: 'Ja, met je telefoon mag je foto\'s en video\'s maken voor eigen gebruik. Professionele apparatuur alleen met toestemming.'
  },
];

function renderContent(blocks: ContentBlock[]) {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'title':
        return (
          <h3 key={idx} className="text-lg font-bold text-white mt-4 mb-2 font-outfit">
            {block.content as string}
          </h3>
        );
      case 'text':
        return (
          <p key={idx} className="text-white/90 mb-3 leading-relaxed font-outfit">
            {block.content as string}
          </p>
        );
      case 'list':
        return (
          <ul key={idx} className="space-y-2 mb-4 ml-4">
            {Array.isArray(block.content) && block.content.map((item, i) => (
              <li key={i} className="text-white/90 leading-relaxed font-outfit flex items-start gap-2">
                <span className="text-white/60 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'warning':
        return (
          <div key={idx} className="bg-red-500/10 border-l-4 border-red-400 p-4 mb-3 rounded-r-lg">
            <p className="text-white/90 font-outfit flex items-center gap-2">
              <HiExclamation className="w-5 h-5 text-red-400 flex-shrink-0" />
              {block.content as string}
            </p>
          </div>
        );
      case 'tip':
        return (
          <div key={idx} className="bg-green-500/10 border-l-4 border-green-400 p-4 mb-3 rounded-r-lg">
            <p className="text-white/90 font-outfit flex items-center gap-2">
              <HiInformationCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              {block.content as string}
            </p>
          </div>
        );
      default:
        return null;
    }
  });
}

export default function Info() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-32"
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
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-phosphate">
            INFORMATIE
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 font-outfit text-center max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base md:text-lg"
        >
          Op deze pagina vind je tal van praktische informatie over Axelfest, onderaan vind je de huisregels. Het is belangrijk deze goed door te lezen zodat je weet waar je aan toe bent. We willen er graag een fantastisch evenement van maken. Heb je vragen, tips of andere dringende zaken die je wilt melden, neem dan zeker contact met ons op via onze contactpagina. We staan altijd open voor suggesties.
        </motion.p>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12"
        >
          {infoSections.slice(0, 6).map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setOpenSection(section.id);
                setTimeout(() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              className="text-[10px] sm:text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 font-outfit"
            >
              {section.title}
            </button>
          ))}
        </motion.div>

        {/* Accordion Sections */}
        <div className="space-y-2 sm:space-y-3 mb-12 sm:mb-16 md:mb-20">
          {infoSections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.03 }}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                {/* Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-center justify-between group"
                  aria-expanded={openSection === section.id}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={{ scale: openSection === section.id ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
                    >
                      <section.icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-outfit uppercase tracking-wide text-left">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div 
                    className="text-white ml-2 sm:ml-3 flex-shrink-0"
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openSection === section.id ? (
                      <HiMinus className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <HiPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {openSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 md:px-6 md:pb-6 border-t border-white/10">
                        {renderContent(section.content)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-phosphate flex items-center justify-center gap-3">
              <HiQuestionMarkCircle className="w-10 h-10" />
              Veelgestelde Vragen
            </h2>
          </div>

          <div className="space-y-3">
            {faqSections.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between group"
                    aria-expanded={openFaq === faq.id}
                  >
                    <h3 className="text-base md:text-lg font-semibold text-white font-outfit text-left pr-4">
                      {faq.question}
                    </h3>
                    <motion.div 
                      className="text-white flex-shrink-0"
                      animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === faq.id ? (
                        <HiMinus className="w-6 h-6" />
                      ) : (
                        <HiPlus className="w-6 h-6" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/10">
                          <p className="text-white/90 font-outfit leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/50 z-20" />
    </section>
  );
}
