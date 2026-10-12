'use client';

import { motion } from 'framer-motion';
import { Calendar, Heart, Share2, Sparkles, Download } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { JharokhaArch, FloralDivider, CornerFlourish, RoyalMonogram } from './Ornaments';

export default function InvitationSection() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Aria & Kabir Wedding Invitation",
        text: "You are cordially invited to celebrate the wedding of Aria & Kabir in Udaipur, Rajasthan.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied to clipboard!");
    }
  };

  return (
    <section id="invitation" className="relative py-24 md:py-32 px-4 sm:px-6 bg-[#FDFBF7] paper-texture overflow-hidden">
      {/* Decorative background ambient floral touches */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-8 w-64 h-64 rounded-full bg-champagne-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-8 w-72 h-72 rounded-full bg-gold-light/20 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Subtle Section Tag */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            The Formal Invitation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mt-1">
            Lagan Patrika
          </h2>
          <FloralDivider className="w-40 h-5 mx-auto text-gold" />
        </div>

        {/* The Luxury Deckle-Edge Wedding Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FFFDF9] border border-[#DFC49B]/50 rounded-sm shadow-luxury p-8 sm:p-12 md:p-16 text-center"
        >
          {/* Inner Golden Border Frames */}
          <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-[#C5A880]/30 pointer-events-none" />
          <div className="absolute inset-4 sm:inset-5 md:inset-6 border border-dashed border-[#C5A880]/20 pointer-events-none" />

          {/* Corner Vintage Flourishes */}
          <CornerFlourish position="top-left" className="absolute top-2 left-2 sm:top-4 sm:left-4 w-10 h-10 text-gold/60" />
          <CornerFlourish position="top-right" className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 text-gold/60" />
          <CornerFlourish position="bottom-left" className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-10 h-10 text-gold/60" />
          <CornerFlourish position="bottom-right" className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-10 h-10 text-gold/60" />

          {/* Regal Jharokha Arch Header */}
          <div className="mb-4">
            <JharokhaArch className="w-56 md:w-64 h-16 text-gold/80" />
          </div>

          {/* Auspicious Invocation */}
          <div className="space-y-1 mb-8">
            <p className="text-xs uppercase tracking-mega-lux font-sans text-taupe-500 font-medium">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-serif italic text-sm text-gold-dark max-w-lg mx-auto">
              "{WEDDING_DATA.blessings.translation}"
            </p>
          </div>

          {/* The Couple Profile Presentation */}
          <div className="my-8 space-y-6">
            {/* The Bride */}
            <div className="space-y-1">
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-wide">
                {WEDDING_DATA.couple.bride.fullName}
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-taupe-600 uppercase font-light">
                {WEDDING_DATA.couple.bride.parents}
              </p>
            </div>

            {/* Ornamental Ampersand */}
            <div className="flex items-center justify-center gap-4 my-3">
              <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="font-script text-4xl sm:text-5xl text-gold-dark font-normal">
                &amp;
              </span>
              <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            {/* The Groom */}
            <div className="space-y-1">
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-wide">
                {WEDDING_DATA.couple.groom.fullName}
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-wider text-taupe-600 uppercase font-light">
                {WEDDING_DATA.couple.groom.parents}
              </p>
            </div>
          </div>

          <FloralDivider className="w-48 h-5 mx-auto my-8 text-gold/70" />

          {/* Heartfelt Letter Body */}
          <div className="max-w-2xl mx-auto space-y-4 text-taupe-700 font-serif text-base sm:text-lg leading-relaxed text-center font-light">
            {WEDDING_DATA.invitationLetter.bodyText.map((paragraph, i) => (
              <p key={i}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Auspicious Date & Place Box */}
          <div className="my-10 inline-block bg-[#FAF6F0] border border-[#DFC49B]/40 px-8 py-5 rounded-sm">
            <p className="text-xs font-sans tracking-mega-lux uppercase text-gold-dark mb-1">
              Wedding Dates
            </p>
            <p className="font-serif text-xl sm:text-2xl text-charcoal font-normal">
              18th, 19th &amp; 20th of December, 2026
            </p>
            <p className="font-serif italic text-sm text-taupe-600 mt-1">
              The Oberoi Udaivilas &amp; Jagmandir Island Palace • Udaipur, Rajasthan
            </p>
          </div>

          {/* Family Signatures */}
          <div className="pt-4 border-t border-gold/20 max-w-lg mx-auto">
            <p className="font-script text-2xl text-gold-dark mb-2">
              With warm blessings &amp; love
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-xs sm:text-sm font-sans tracking-widest uppercase text-charcoal font-medium">
              <span>The Singhania Family</span>
              <span className="hidden sm:inline text-gold">•</span>
              <span>The Mehra Family</span>
            </div>
          </div>

          {/* Sharing & Calendar triggers */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest border border-gold/40 text-charcoal hover:bg-gold/10 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-gold-dark" />
              <span>Share Invitation</span>
            </button>

            <a
              href="#events"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest bg-gold text-white hover:bg-gold-dark transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>View Multi-Day Schedule</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
