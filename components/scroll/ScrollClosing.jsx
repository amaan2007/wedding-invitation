'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp, Share2 } from 'lucide-react';
import { GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollClosing() {
  const containerRef = useRef(null);
  const sealRef = useRef(null);
  const textRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Aria & Kabir Wedding Invitation",
        text: "You are cordially invited to celebrate the royal wedding of Aria & Kabir in Udaipur.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied!");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sealRef.current, {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 1,
        },
      });

      gsap.fromTo(textRef.current, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full py-28 sm:py-40 px-6 sm:px-12 bg-[#201A17] text-white overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Background Starry Twilight Palace Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,168,128,0.15)_0%,rgba(20,16,14,0.95)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Arch Motif in Background */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none opacity-30 z-0">
        <GrandPalaceArch className="w-full h-44 sm:h-60 text-gold" />
      </div>

      {/* Content Composition */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
        {/* Royal Monogram Seal */}
        <div ref={sealRef} className="flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/60 p-1 bg-[#2C2420] shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-dashed border-gold/40 flex flex-col items-center justify-center text-center">
              <span className="font-serif italic text-2xl sm:text-3xl text-gold-light">
                A&thinsp;&amp;&thinsp;K
              </span>
              <span className="text-[7px] font-sans tracking-mega-lux uppercase text-gold/80 mt-[-2px]">
                UDAIPUR
              </span>
            </div>
          </div>
        </div>

        {/* Closing Narrative */}
        <div ref={textRef} className="space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] font-light tracking-wide">
            Aria &amp; Kabir
          </h3>

          <p className="font-serif italic text-base sm:text-xl text-[#E8DDD0] font-light leading-relaxed max-w-xl mx-auto">
            "With gratitude in our hearts and love in our eyes, we eagerly await your presence to bless our new beginning."
          </p>

          <p className="font-serif text-lg text-gold tracking-widest pt-2">
            {WEDDING_DATA.couple.hashtag}
          </p>

          <div className="pt-6 border-t border-gold/30 text-xs font-sans tracking-mega-lux uppercase text-taupe-300 space-y-1">
            <p>With Warmest Blessings &amp; Affection</p>
            <p className="text-white font-medium">The Singhania &amp; Mehra Families</p>
          </div>
        </div>

        {/* Return to Top Button & Share */}
        <div className="pt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold hover:text-white transition-all text-[11px] font-sans uppercase tracking-widest text-[#E8DDD0]"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-4 h-4 text-gold group-hover:-translate-y-0.5 transition-transform" />
            <span>Return to Beginning</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 hover:border-gold transition-all text-[11px] font-sans uppercase tracking-widest text-taupe-300 hover:text-white"
          >
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>Share</span>
          </button>
        </div>

        {/* Delicate copyright note */}
        <div className="pt-8 text-[10px] font-sans tracking-widest uppercase text-taupe-500">
          Udaipur, Rajasthan • 18—20 December 2026
        </div>
      </div>
    </footer>
  );
}
