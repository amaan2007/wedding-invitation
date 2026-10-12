'use client';

import { motion } from 'framer-motion';
import { HeritagePalaceSilhouette, PalaceArchMotif, MarigoldGarlandBorder, OrnateCornerFlourish } from './ArtworkIllustrations';

export default function ScenePalaceWorld() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Lake Sunset Horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(247,236,220,0.95)_0%,rgba(235,216,195,0.95)_100%)] pointer-events-none" />

      {/* Main Artwork Card */}
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

        {/* Top Architectural Jharokha Arch */}
        <div className="pt-2">
          <PalaceArchMotif className="w-48 sm:w-56 h-12 text-gold/80" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mt-1"
          >
            A Royal Soirée • Udaipur
          </motion.p>
        </div>

        {/* Center Illustrated Palace Scene with Water Reflections */}
        <div className="my-auto py-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-gold/40 shadow-inner bg-[#FBF8F1] p-3 flex flex-col justify-end"
          >
            {/* Palace Backdrop Silhouette */}
            <HeritagePalaceSilhouette className="w-full h-24 text-gold-dark" />

            {/* Garland hanging from top of illustration */}
            <div className="absolute top-0 left-0 right-0">
              <MarigoldGarlandBorder className="w-full h-5 text-gold" />
            </div>

            {/* Inset Title on illustrated painting */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-[8px] font-sans tracking-mega-lux uppercase text-taupe-600 bg-[#FFFDF9]/90 px-3 py-0.5 rounded-full border border-gold/30">
                Lake Pichola, Mewar
              </span>
            </div>
          </motion.div>

          {/* Poetic Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="space-y-2 px-2"
          >
            <p className="font-serif italic text-sm sm:text-base text-charcoal font-light leading-relaxed">
              "Amidst shimmering waters and century-old marble pavilions, two wandering hearts unite under the starry Mewar skies."
            </p>
            <p className="font-serif text-xs text-taupe-500 font-light">
              Where heritage, sacred traditions, and timeless love converge.
            </p>
          </motion.div>
        </div>

        {/* Bottom Floral Blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pb-2 border-t border-gold/25 pt-2"
        >
          <p className="font-script text-2xl text-gold-dark">
            Forever &amp; Always
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
