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
import { useTranslation, type TranslationKey } from '../../i18n';

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

const getInfoSections = (t: (key: TranslationKey) => string): InfoSectionData[] => [
  {
    id: 'locatie',
    icon: HiLocationMarker,
    title: t('info.locatie.title'),
    content: [
      { type: 'text', content: t('info.locatie.text1') },
    ],
  },
  {
    id: 'tickets',
    icon: HiTicket,
    title: t('info.tickets.title'),
    content: [
      { type: 'text', content: t('info.tickets.text1') },
    ],
  },
  {
    id: 'openingstijden',
    icon: HiClock,
    title: t('info.openingstijden.title'),
    content: [
      { type: 'text', content: t('info.openingstijden.text1') },
    ],
  },
  {
    id: 'consumpties',
    icon: HiCash,
    title: t('info.consumpties.title'),
    content: [
      { type: 'text', content: t('info.consumpties.text1') },
    ],
  },
  {
    id: 'eten-drinken',
    icon: MdRestaurant,
    title: t('info.etenDrinken.title'),
    content: [
      { type: 'text', content: t('info.etenDrinken.text1') },
      { type: 'warning', content: t('info.etenDrinken.warning1') },
    ],
  },
  {
    id: 'crowdsurfen',
    icon: HiBan,
    title: t('info.crowdsurfen.title'),
    content: [
      { type: 'warning', content: t('info.crowdsurfen.warning1') },
      { type: 'text', content: t('info.crowdsurfen.text1') },
    ],
  },
  {
    id: 'alcohol',
    icon: MdLocalBar,
    title: t('info.alcohol.title'),
    content: [
      { type: 'text', content: t('info.alcohol.text1') },
      { type: 'warning', content: t('info.alcohol.warning1') },
    ],
  },
  {
    id: 'parkeren',
    icon: MdLocalParking,
    title: t('info.parkeren.title'),
    content: [
      { type: 'text', content: t('info.parkeren.text1') },
    ],
  },
  {
    id: 'fietsenstalling',
    icon: MdDirectionsBike,
    title: t('info.fietsenstalling.title'),
    content: [
      { type: 'text', content: t('info.fietsenstalling.text1') },
      { type: 'tip', content: t('info.fietsenstalling.tip1') },
    ],
  },
  {
    id: 'zitmateriaal',
    icon: MdEventSeat,
    title: t('info.zitmateriaal.title'),
    content: [
      { type: 'text', content: t('info.zitmateriaal.text1') },
      { type: 'tip', content: t('info.zitmateriaal.tip1') },
    ],
  },
  {
    id: 'camping',
    icon: HiHome,
    title: t('info.camping.title'),
    content: [
      { type: 'text', content: t('info.camping.text1') },
      { type: 'tip', content: t('info.camping.tip1') },
    ],
  },
  {
    id: 'hotels',
    icon: HiHome,
    title: t('info.hotels.title'),
    content: [
      { type: 'text', content: t('info.hotels.text1') },
      { type: 'tip', content: t('info.hotels.tip1') },
    ],
  },
  {
    id: 'gevonden-voorwerpen',
    icon: HiSearch,
    title: t('info.gevonden.title'),
    content: [
      { type: 'text', content: t('info.gevonden.text1') },
      { type: 'text', content: t('info.gevonden.text2') },
    ],
  },
  {
    id: 'kluisjes',
    icon: HiKey,
    title: t('info.kluisjes.title'),
    content: [
      { type: 'warning', content: t('info.kluisjes.warning1') },
      { type: 'tip', content: t('info.kluisjes.tip1') },
    ],
  },
  {
    id: 'huisregels',
    icon: HiShieldCheck,
    title: t('info.huisregels.title'),
    content: [
      { type: 'text', content: t('info.huisregels.text1') },
      { type: 'list', content: [
        t('info.huisregels.rule1'),
        t('info.huisregels.rule2'),
        t('info.huisregels.rule3'),
        t('info.huisregels.rule4'),
        t('info.huisregels.rule5'),
        t('info.huisregels.rule6'),
        t('info.huisregels.rule7'),
        t('info.huisregels.rule8'),
        t('info.huisregels.rule9'),
        t('info.huisregels.rule10'),
        t('info.huisregels.rule11'),
      ]},
      { type: 'warning', content: t('info.huisregels.warning1') },
    ],
  },
];

const getFaqSections = (t: (key: TranslationKey) => string) => [
  {
    id: 'faq-1',
    question: t('info.faq1.q'),
    answer: t('info.faq1.a')
  },
  {
    id: 'faq-2',
    question: t('info.faq2.q'),
    answer: t('info.faq2.a')
  },
  {
    id: 'faq-3',
    question: t('info.faq3.q'),
    answer: t('info.faq3.a')
  },
  {
    id: 'faq-4',
    question: t('info.faq4.q'),
    answer: t('info.faq4.a')
  },
  {
    id: 'faq-5',
    question: t('info.faq5.q'),
    answer: t('info.faq5.a')
  },
  {
    id: 'faq-6',
    question: t('info.faq6.q'),
    answer: t('info.faq6.a')
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
              <HiExclamation className="w-5 h-5 text-red-400 shrink-0" />
              {block.content as string}
            </p>
          </div>
        );
      case 'tip':
        return (
          <div key={idx} className="bg-green-500/10 border-l-4 border-green-400 p-4 mb-3 rounded-r-lg">
            <p className="text-white/90 font-outfit flex items-center gap-2">
              <HiInformationCircle className="w-5 h-5 text-green-400 shrink-0" />
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
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const infoSections = getInfoSections(t);
  const faqSections = getFaqSections(t);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section 
      ref={containerRef}
      className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32"
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
            {t('info.title')}
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
          {t('info.intro')}
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
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                    >
                      <section.icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-outfit uppercase tracking-wide text-left">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div 
                    className="text-white ml-2 sm:ml-3 shrink-0"
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
              {t('info.faqTitle')}
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
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-center justify-between group"
                    aria-expanded={openFaq === faq.id}
                  >
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white font-outfit text-left pr-3 sm:pr-4">
                      {faq.question}
                    </h3>
                    <motion.div 
                      className="text-white shrink-0"
                      animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === faq.id ? (
                        <HiMinus className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <HiPlus className="w-5 h-5 sm:w-6 sm:h-6" />
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
                        <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 md:px-6 md:pb-6 border-t border-white/10">
                          <p className="text-white/90 font-outfit leading-relaxed text-sm sm:text-base">
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
