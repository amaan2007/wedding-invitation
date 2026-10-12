'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Calendar, Share2, Heart } from 'lucide-react';
import { PalaceArchMotif, OrnateCornerFlourish, LotusBotanicalIllustration } from './ArtworkIllustrations';
import { WEDDING_DATA } from '@/data/weddingData';

export default function SceneClosing({ onReplay }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Aria & Kabir Wedding Invitation Film",
        text: "You are cordially invited to celebrate the royal wedding of Aria & Kabir in Udaipur.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied!");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Closing Card Frame */}
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
            With Love &amp; Gratitude
          </p>
        </div>

        {/* Center Closing Presentation */}
        <div className="my-auto py-2 space-y-4">
          {/* Monogram Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold/60 mx-auto flex flex-col items-center justify-center p-1 bg-[#FAF7EE] shadow-md">
            <div className="w-full h-full rounded-full border border-dashed border-gold/40 flex flex-col items-center justify-center">
              <span className="font-serif italic text-xl sm:text-2xl text-gold-dark">
                A&thinsp;&amp;&thinsp;K
              </span>
            </div>
          </div>

          {/* Heartfelt Note */}
          <div className="space-y-1.5 px-3">
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal tracking-wide">
              Aria &amp; Kabir
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-taupe-700 leading-relaxed font-light">
              "We cannot wait to celebrate our union, exchange our sacred vows, and begin our forever with your cherished presence and blessings."
            </p>
          </div>

          {/* Families Inscription */}
          <div className="pt-2 border-t border-gold/20 text-[10px] font-sans tracking-mega-lux uppercase text-taupe-600 space-y-0.5">
            <p className="text-charcoal font-medium">The Singhania &amp; Mehra Families</p>
            <p className="text-gold-dark">{WEDDING_DATA.couple.hashtag}</p>
          </div>
        </div>

        {/* Bottom Film Actions: Replay Film & Share */}
        <div className="pb-2 border-t border-gold/25 pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold hover:text-white transition-all text-[10px] font-sans uppercase tracking-widest text-charcoal font-medium"
          >
            <RotateCcw className="w-3 h-3 text-gold-dark" />
            <span>Replay Film</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-taupe-300 hover:border-gold transition-all text-[10px] font-sans uppercase tracking-widest text-taupe-600 hover:text-charcoal font-medium"
          >
            <Share2 className="w-3 h-3 text-gold-dark" />
            <span>Share</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
