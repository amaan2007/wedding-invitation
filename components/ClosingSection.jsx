'use client';

import { motion } from 'framer-motion';
import { ChevronUp, Heart } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { JharokhaArch, FloralDivider, RoyalMonogram } from './Ornaments';

export default function ClosingSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1A1614] text-white pt-24 pb-16 overflow-hidden">
      {/* Background Starry Palace Glow */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/85 to-[#1A1614]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Arch */}
        <div className="opacity-70 mb-4">
          <JharokhaArch className="w-56 h-16 mx-auto text-[#DFC49B]" />
        </div>

        {/* Closing Royal Verse */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-mega-lux font-sans text-[#DFC49B] mb-3"
        >
          Two Souls • One Sacred Promise
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7EE] tracking-wide mb-6"
        >
          We Eagerly Await Welcoming You In Udaipur
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-base sm:text-lg text-[#E8DDD0] max-w-xl mx-auto font-light leading-relaxed mb-8"
        >
          "With gratitude in our hearts and love in our eyes, your presence and cherished blessings will make our special days truly complete."
        </motion.p>

        {/* Monogram Seal */}
        <div className="flex justify-center my-8">
          <RoyalMonogram size="lg" className="border-gold/30 text-gold" />
        </div>

        {/* Hashtag */}
        <p className="font-serif text-lg tracking-widest text-[#DFC49B] mb-8 font-light">
          {WEDDING_DATA.couple.hashtag}
        </p>

        <FloralDivider className="w-48 h-4 mx-auto mb-10 text-gold/70" />

        {/* Family Blessings */}
        <div className="text-xs font-sans tracking-mega-lux uppercase text-taupe-300 space-y-1 mb-12">
          <p>With Warm Regards &amp; Affection</p>
          <p className="text-white font-medium">The Singhania &amp; Mehra Families</p>
        </div>

        {/* Back to top button */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-1 text-[10px] uppercase font-sans tracking-mega-lux text-taupe-400 hover:text-gold transition-colors"
            aria-label="Scroll back to top"
          >
            <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
              <ChevronUp className="w-4 h-4 text-gold group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span>Return to Top</span>
          </button>
        </div>

        {/* Fine print */}
        <div className="mt-16 pt-8 border-t border-white/10 text-[11px] font-sans text-taupe-400 font-light">
          <p>Aria &amp; Kabir Wedding Celebrations • December 18–20, 2026 • Udaipur, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
