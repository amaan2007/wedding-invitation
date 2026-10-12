'use client';

import { motion } from 'framer-motion';
import { PalaceArchMotif, OrnateCornerFlourish, LotusBotanicalIllustration } from './ArtworkIllustrations';

export default function ScenePortrait() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Card */}
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
        {/* Borders */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/40 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold/25 pointer-events-none" />

        {/* Ornate Corners */}
        <OrnateCornerFlourish position="tl" className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="tr" className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="bl" className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="br" className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-7 h-7 text-gold/70" />

        {/* Top Arch Motif */}
        <div className="pt-2">
          <PalaceArchMotif className="w-48 sm:w-56 h-12 text-gold/80" />
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mt-1">
            The Sacred Vows • Saptapadi
          </p>
        </div>

        {/* Center Framed Portrait Artwork */}
        <div className="my-auto py-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative w-44 sm:w-52 aspect-[3/4] mx-auto rounded-full overflow-hidden p-1.5 border-2 border-gold/60 shadow-xl bg-[#FAF7EE]"
          >
            {/* Inner dashed ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-gold/40 pointer-events-none z-10" />

            {/* Editorial Wedding Portrait Artwork */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Aria and Kabir Portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Poetic Inscription */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-1.5 px-3"
          >
            <p className="font-serif italic text-sm sm:text-base text-charcoal font-light leading-relaxed">
              "Two lives, two souls, joined by destiny and blessed by the divine light of love."
            </p>
            <p className="font-serif text-xs text-taupe-500 font-light">
              Walking the seven sacred steps towards an eternal tomorrow.
            </p>
          </motion.div>
        </div>

        {/* Bottom Motif */}
        <div className="pb-2 border-t border-gold/25 pt-2">
          <LotusBotanicalIllustration className="w-16 h-8 text-gold/70" />
        </div>
      </motion.div>
    </div>
  );
}
