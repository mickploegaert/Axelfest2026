'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../i18n";

export default function TimetableContent() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundMain/Background.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full mb-6 sm:mb-8">
          <span className="text-white/80 font-outfit text-xs sm:text-sm tracking-[0.2em] uppercase">
            {t('timetable.badge')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase tracking-tight font-phosphate leading-none mb-4 sm:mb-6">
          {t('timetable.title')}
        </h1>

        {/* Coming Soon */}
        <div className="mb-6 sm:mb-8">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-outfit font-light text-white/60 tracking-wider">
            {t('timetable.coming')}
          </span>
        </div>

        {/* Divider */}
        <div className="w-16 sm:w-24 h-px bg-white/30 mb-6 sm:mb-8" />

        {/* Description */}
        <p className="text-white/70 font-outfit text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg leading-relaxed mb-8 sm:mb-10">
          {t('timetable.desc')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a
            href="https://weeztix.shop/rb45ueqd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill font-outfit font-light text-white text-sm sm:text-base md:text-lg tracking-widest uppercase px-6 py-3 sm:px-8 sm:py-3.5 border border-white/50 bg-transparent transition-all duration-300"
          >
            {t('timetable.tickets')}
          </a>
          <Link
            href="/"
            className="font-outfit text-white/70 hover:text-white text-sm sm:text-base md:text-lg transition-colors duration-200"
          >
            {t('timetable.back')}
          </Link>
        </div>
      </div>
    </section>
  );
}
