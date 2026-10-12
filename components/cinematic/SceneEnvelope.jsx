'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PalaceArchMotif, OrnateCornerFlourish } from './ArtworkIllustrations';

export default function SceneEnvelope({ onUnseal, isAudioPlaying, onToggleAudio }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onUnseal();
    }, 1100);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Ambience: Subtle Warm Candlelight & Parchment Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,243,234,0.95)_0%,rgba(235,224,208,0.95)_100%)] pointer-events-none" />

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* The Physical Invitation Envelope Object */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[3/4.2] rounded-md shadow-2xl flex flex-col justify-between p-6 sm:p-8 bg-[#FAF7EE] border border-[#DFC49B]/70 overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(60, 48, 38, 0.22), 0 0 0 1px rgba(197, 168, 128, 0.3)',
        }}
      >
        {/* Ornate Vintage Double Border */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/40 rounded-sm pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold/25 rounded-sm pointer-events-none" />

        {/* Corner Flourishes */}
        <OrnateCornerFlourish position="tl" className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 text-gold/70" />
        <OrnateCornerFlourish position="tr" className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 text-gold/70" />
        <OrnateCornerFlourish position="bl" className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 text-gold/70" />
        <OrnateCornerFlourish position="br" className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 text-gold/70" />

        {/* Top Header Section */}
        <div className="text-center pt-3 relative z-10">
          <PalaceArchMotif className="w-44 sm:w-56 h-14 text-gold/80" />
          <p className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mt-1">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="font-serif italic text-xs text-taupe-500 mt-0.5">
            With the divine blessings of our elders
          </p>
        </div>

        {/* Center Monogram & Title */}
        <div className="text-center my-auto py-2 relative z-10">
          <span className="text-[9px] font-sans tracking-mega-lux uppercase text-taupe-500 block mb-1">
            Royal Wedding Invitation
          </span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="my-3"
          >
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal tracking-wide">
              Aria
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-gold-dark font-normal my-[-6px] block">
              &amp;
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal tracking-wide">
              Kabir
            </h1>
          </motion.div>

          <p className="text-[11px] font-sans tracking-widest-lux uppercase text-gold-dark font-medium mt-2">
            18 — 20 December 2026
          </p>
          <p className="font-serif italic text-xs text-taupe-600 mt-0.5">
            Udaipur, Rajasthan
          </p>
        </div>

        {/* Bottom Interactive Wax Seal Action */}
        <div className="flex flex-col items-center justify-center pb-2 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative cursor-pointer focus:outline-none flex flex-col items-center"
            aria-label="Touch to unseal royal invitation"
          >
            {/* Wax Seal Disk with 3D Texture */}
            <motion.div
              animate={
                isOpening
                  ? { rotate: [0, -10, 15, -5, 0], scale: [1, 1.25, 0], opacity: [1, 1, 0] }
                  : {}
              }
              transition={{ duration: 0.8 }}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#8C3542] via-[#6B202D] to-[#4A121A] p-1 shadow-xl border-2 border-[#DFC49B]/60 flex items-center justify-center relative shadow-[#6B202D]/40"
            >
              {/* Melted wax rim highlight */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.3),transparent_60%)]" />

              {/* Inner embossed stamp */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-dashed border-[#DFC49B]/60 flex flex-col items-center justify-center bg-[#541620]/90 text-center">
                <span className="text-[8px] tracking-mega-lux text-[#E8DCB8] uppercase font-sans">
                  Seal
                </span>
                <span className="font-serif text-xl sm:text-2xl font-light text-[#FAF6F0] tracking-wider my-[-2px]">
                  A&thinsp;&amp;&thinsp;K
                </span>
                <span className="text-[7px] tracking-widest text-[#E8DCB8]/80 font-sans">
                  2026
                </span>
              </div>
            </motion.div>

            {/* Prompt label */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium group-hover:text-charcoal transition-colors">
              <span>{isOpening ? "Opening Invitation..." : "Touch to Open"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
