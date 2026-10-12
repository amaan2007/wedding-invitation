'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollCoupleReveal() {
  const containerRef = useRef(null);
  const brideRef = useRef(null);
  const ampersandRef = useRef(null);
  const groomRef = useRef(null);
  const archRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll animation for the couple typography
      gsap.fromTo(brideRef.current, {
        x: -50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1,
        },
      });

      gsap.fromTo(ampersandRef.current, {
        scale: 0.6,
        opacity: 0,
        rotate: -15,
      }, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo(groomRef.current, {
        x: 50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1,
        },
      });

      // Arch parallax depth
      gsap.fromTo(archRef.current, {
        y: -30,
        opacity: 0.3,
      }, {
        y: 20,
        opacity: 0.75,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.fromTo(dateRef.current, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-36 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden bg-[#F8F4EA]"
    >
      {/* Background Soft Palace Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,253,248,0.9)_0%,rgba(245,237,222,0.9)_100%)] pointer-events-none" />

      {/* Floating Organic Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Arch Motif in Background with Parallax */}
      <div
        ref={archRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-none opacity-40 z-0"
      >
        <GrandPalaceArch className="w-full h-44 sm:h-64 text-gold-dark" />
      </div>

      {/* Edge Garland at Top */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* Main Couple Composition — Editorial & Full Bleed (NO Boxy Cards!) */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-10 sm:space-y-14">
        {/* Subtitle */}
        <p className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
          The Royal Matrimony
        </p>

        {/* The Couple Names — Grand Editorial Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-6 sm:gap-8">
          {/* Bride Column */}
          <div ref={brideRef} className="md:col-span-3 text-center md:text-right space-y-2">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-light tracking-wide leading-none">
              Aria
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-gold-dark">
              Singhania
            </p>
            <p className="text-xs font-sans tracking-wider uppercase text-taupe-500 font-light max-w-xs md:ml-auto">
              {WEDDING_DATA.couple.bride.parents}
            </p>
          </div>

          {/* Central Calligraphic Ampersand */}
          <div ref={ampersandRef} className="md:col-span-1 flex flex-col items-center justify-center my-[-10px] md:my-0">
            <span className="font-script text-5xl sm:text-6xl md:text-7xl text-gold-dark font-normal">
              &amp;
            </span>
          </div>

          {/* Groom Column */}
          <div ref={groomRef} className="md:col-span-3 text-center md:text-left space-y-2">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-light tracking-wide leading-none">
              Kabir
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-gold-dark">
              Mehra
            </p>
            <p className="text-xs font-sans tracking-wider uppercase text-taupe-500 font-light max-w-xs md:mr-auto">
              {WEDDING_DATA.couple.groom.parents}
            </p>
          </div>
        </div>

        {/* Wedding Date, Time & Auspicious Location Inscription */}
        <div ref={dateRef} className="pt-8 border-t border-gold/30 max-w-xl mx-auto space-y-3">
          <p className="text-sm sm:text-base font-sans tracking-widest-lux uppercase text-charcoal font-medium">
            18 — 20 December 2026
          </p>
          <p className="font-serif italic text-lg sm:text-xl text-taupe-700 font-light">
            The Oberoi Udaivilas &amp; Jagmandir Island Palace
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-sans tracking-mega-lux uppercase text-gold-dark">
            <span>Udaipur</span>
            <span>•</span>
            <span>Rajasthan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
