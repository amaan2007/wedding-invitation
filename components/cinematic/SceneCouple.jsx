'use client';

import { motion } from 'framer-motion';
import { PalaceArchMotif, OrnateCornerFlourish, MarigoldGarlandBorder } from './ArtworkIllustrations';
import { WEDDING_DATA } from '@/data/weddingData';

export default function SceneCouple() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Warm Ambient Texture */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Couple Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94, y: -20 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[3/4.4] rounded-sm bg-[#FFFDF9] border border-[#DFC49B]/70 shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-center overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(60, 48, 38, 0.18), inset 0 0 40px rgba(223, 196, 155, 0.12)',
        }}
      >
        {/* Double Gold Borders */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/40 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold/25 pointer-events-none" />

        {/* Ornate Corners */}
        <OrnateCornerFlourish position="tl" className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="tr" className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="bl" className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="br" className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-7 h-7 text-gold/70" />

        {/* Top Scalloped Arch */}
        <div className="pt-2">
          <PalaceArchMotif className="w-48 sm:w-56 h-12 text-gold/80" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mt-1"
          >
            Subh Vivah • Royal Union
          </motion.p>
        </div>

        {/* Center The Couple Names — Calligraphic Reveal */}
        <div className="my-auto py-2 space-y-4">
          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="space-y-0.5"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-wide">
              {WEDDING_DATA.couple.bride.fullName}
            </h2>
            <p className="text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-taupe-500 font-light">
              {WEDDING_DATA.couple.bride.parents}
            </p>
          </motion.div>

          {/* Calligraphic Ampersand with Marigold Blossoms */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-3 my-1"
          >
            <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-script text-4xl sm:text-5xl text-gold-dark font-normal">
              &amp;
            </span>
            <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="space-y-0.5"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-wide">
              {WEDDING_DATA.couple.groom.fullName}
            </h2>
            <p className="text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-taupe-500 font-light">
              {WEDDING_DATA.couple.groom.parents}
            </p>
          </motion.div>
        </div>

        {/* Wedding Date & Destination */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pb-2 border-t border-gold/25 pt-3"
        >
          <p className="text-[11px] sm:text-xs font-sans tracking-widest uppercase text-charcoal font-medium">
            Saturday, 19th December 2026
          </p>
          <p className="font-serif italic text-xs text-taupe-600 mt-0.5">
            The Oberoi Udaivilas &amp; Jagmandir Island Palace
          </p>
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark mt-1">
            Udaipur, Rajasthan
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
