'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiMail } from 'react-icons/hi';

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
    name: 'Yggdrasil Service', 
    logo: '/sonny/image.png', 
    url: 'https://yggdrasilservice.nl/',
  },
  { 
    name: 'Autogarage Neels', 
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function SponsorsPage() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight font-phosphate mb-6">
              ONZE SPONSORS
            </h1>
          </motion.div>

          {/* Appreciation Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-outfit leading-relaxed mb-6">
              Axelfest is mede mogelijk gemaakt door de fantastische steun van onze sponsors. 
              Zonder hen zou dit geweldige festival niet bestaan!
            </p>
            <p className="text-base sm:text-lg text-white/70 font-outfit">
              Wij zijn ontzettend dankbaar voor hun vertrouwen en bijdrage aan Axelfest. 
              Samen maken we er een onvergetelijk feest van!
            </p>
          </motion.div>

          {/* Sponsors Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20"
          >
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                variants={itemVariants}
              >
                <Link
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="relative h-28 sm:h-32 md:h-36 w-full mb-4">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <p className="text-center text-white font-outfit text-lg font-medium group-hover:text-white/90 transition-colors">
                    {sponsor.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Become a Sponsor Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-linear-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/30">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-phosphate mb-6">
                  WIL JIJ OOK SPONSOR WORDEN?
                </h2>
                <p className="text-lg sm:text-xl text-white/80 font-outfit mb-8 max-w-2xl mx-auto">
                  Wil jij ook bijdragen aan het succes van Axelfest en je bedrijf onder de aandacht brengen 
                  bij duizenden festivalgangers? Neem dan contact met ons op!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <a
                    href="mailto:info@axelfest.nl"
                    className="group inline-flex items-center gap-3 bg-white text-black font-outfit font-medium text-lg px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
                  >
                    <HiMail className="w-6 h-6" />
                    <span>info@axelfest.nl</span>
                  </a>
                </div>
                <p className="mt-6 text-white/60 font-outfit text-sm">
                  Stuur ons een mail en we nemen zo snel mogelijk contact met je op!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
