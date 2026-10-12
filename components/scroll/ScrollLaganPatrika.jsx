'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DetailedGaneshaEmblem, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollLaganPatrika() {
  const containerRef = useRef(null);
  const emblemRef = useRef(null);
  const textRef = useRef(null);
  const leftFoliageRef = useRef(null);
  const rightFoliageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle parallax as user scrolls through this act
      gsap.fromTo(emblemRef.current, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo(textRef.current, {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      // Parallax movement for edge foliage
      gsap.to(leftFoliageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(rightFoliageRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-36 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden bg-[#FAF6EE]"
    >
      {/* Background Texture & Soft Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,253,248,0.8)_0%,rgba(247,242,230,0.8)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={5} />

      {/* Edge-Bleed Botanical Vines (Left) */}
      <div
        ref={leftFoliageRef}
        className="absolute left-[-40px] sm:left-[-20px] top-1/4 w-36 sm:w-48 h-96 pointer-events-none opacity-40 text-gold-dark"
      >
        <svg viewBox="0 0 100 300" fill="currentColor">
          <path d="M10 0 Q60 80 20 160 Q80 240 10 300" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="20" cy="50" r="14" fillOpacity="0.25" />
          <circle cx="45" cy="110" r="16" fillOpacity="0.3" />
          <circle cx="30" cy="180" r="18" fillOpacity="0.25" />
          <circle cx="55" cy="240" r="14" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Edge-Bleed Botanical Vines (Right) */}
      <div
        ref={rightFoliageRef}
        className="absolute right-[-40px] sm:right-[-20px] top-1/3 w-36 sm:w-48 h-96 pointer-events-none opacity-40 text-gold-dark rotate-180"
      >
        <svg viewBox="0 0 100 300" fill="currentColor">
          <path d="M10 0 Q60 80 20 160 Q80 240 10 300" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="20" cy="50" r="14" fillOpacity="0.25" />
          <circle cx="45" cy="110" r="16" fillOpacity="0.3" />
          <circle cx="30" cy="180" r="18" fillOpacity="0.25" />
          <circle cx="55" cy="240" r="14" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Center Narrative Composition — Organic & Edge-Bleed Typography (No Boxy Card!) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Sacred Ganesha Emblem */}
        <div ref={emblemRef} className="space-y-3">
          <DetailedGaneshaEmblem className="w-16 h-16 sm:w-20 sm:h-20 text-gold-dark" />
          <p className="text-xs sm:text-sm font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="font-serif italic text-sm sm:text-base text-taupe-600 max-w-md mx-auto font-light leading-relaxed">
            {WEDDING_DATA.blessings.sanskrit}
          </p>
        </div>

        {/* Formal Lagan Patrika Inscription */}
        <div ref={textRef} className="space-y-6 pt-4">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[0.5px] w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-serif italic text-xs tracking-mega-lux uppercase text-gold-dark font-light">
              Lagan Patrika
            </span>
            <span className="h-[0.5px] w-24 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light tracking-wide leading-tight max-w-2xl mx-auto">
            A Royal Invitation to Celebrate Holy Matrimony
          </h2>

          <p className="font-serif text-base sm:text-lg text-taupe-700 leading-relaxed font-light max-w-xl mx-auto">
            "With the divine grace of the Almighty and the cherished blessings of our revered ancestors, we cordially invite you to join us under the royal skies of Mewar as our beloved children embark on their sacred journey."
          </p>

          {/* Families Inscription */}
          <div className="pt-6 border-t border-gold/30 max-w-md mx-auto space-y-2">
            <p className="font-serif text-sm sm:text-base tracking-widest uppercase text-charcoal font-normal">
              The Singhania Family &amp; The Mehra Family
            </p>
            <p className="font-serif italic text-xs text-taupe-500">
              Udaipur, Rajasthan • December 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
