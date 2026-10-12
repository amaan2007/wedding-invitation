'use client';

import { motion } from 'framer-motion';
import { GaneshaEmblem, PalaceArchMotif, OrnateCornerFlourish, LotusBotanicalIllustration } from './ArtworkIllustrations';
import { WEDDING_DATA } from '@/data/weddingData';

export default function ScenePatrika() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Warm Ambient Backdrop */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Parchment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -20 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[3/4.4] rounded-sm bg-[#FFFDF9] border border-[#DFC49B]/70 shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-center overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(60, 48, 38, 0.18), inset 0 0 40px rgba(223, 196, 155, 0.1)',
        }}
      >
        {/* Intricate Gold Border Frames */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/40 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold/25 pointer-events-none" />

        {/* Ornate Corners */}
        <OrnateCornerFlourish position="tl" className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="tr" className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="bl" className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-7 h-7 text-gold/70" />
        <OrnateCornerFlourish position="br" className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-7 h-7 text-gold/70" />

        {/* Sacred Ganesha Motif */}
        <div className="pt-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <GaneshaEmblem className="w-12 h-12 text-gold-dark" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[10px] sm:text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mt-1"
          >
            ॥ ॐ श्री गणेशाय नमः ॥
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif italic text-xs text-taupe-600 max-w-xs mx-auto mt-1"
          >
            {WEDDING_DATA.blessings.sanskrit}
          </motion.p>
        </div>

        {/* Lagan Patrika Invitation Decree */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="my-auto py-2 space-y-3"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="h-[0.5px] w-12 bg-gold/50" />
            <span className="font-serif italic text-xs tracking-widest text-gold-dark uppercase font-light">
              Lagan Patrika
            </span>
            <span className="h-[0.5px] w-12 bg-gold/50" />
          </div>

          <p className="font-serif text-sm sm:text-base text-taupe-700 leading-relaxed font-light px-2">
            "With hearts filled with joy and the cherished blessings of our elders, we cordially invite you to share in the auspicious wedding celebrations of our beloved children"
          </p>

          {/* Families Inscription */}
          <div className="pt-2 border-t border-gold/20 flex flex-col items-center justify-center gap-1">
            <p className="font-serif text-xs tracking-widest uppercase text-charcoal font-medium">
              The Singhania Family
            </p>
            <span className="font-script text-base text-gold-dark">&amp;</span>
            <p className="font-serif text-xs tracking-widest uppercase text-charcoal font-medium">
              The Mehra Family
            </p>
          </div>
        </motion.div>

        {/* Bottom Floral Blessing */}
        <div className="pb-1">
          <LotusBotanicalIllustration className="w-16 h-10 text-gold/70" />
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-taupe-500 mt-1">
            Mewar Royal Heritage • Udaipur
          </p>
        </div>
      </motion.div>
    </div>
  );
}
