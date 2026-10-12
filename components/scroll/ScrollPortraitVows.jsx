'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollPortraitVows() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle scale and crop shift on portrait image as user scrolls
      gsap.fromTo(imageRef.current, {
        scale: 1.12,
        y: 20,
      }, {
        scale: 1,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Typography reveal
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
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-28 sm:py-40 px-6 sm:px-12 bg-[#F9F5EC] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,253,248,0.9)_0%,rgba(245,237,222,0.9)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Top Floral Garland */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* Main Composition: Layered Arch-Masked Portrait & Vows (NO Boxy Cards!) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-center gap-12 sm:gap-16">
        {/* Arch-Masked Heirloom Portrait (5 cols) */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-64 sm:w-80 aspect-[3/4.5] rounded-t-full rounded-b-md overflow-hidden shadow-2xl border-2 border-gold/50 p-2 bg-[#FAF6EE]">
            {/* Inner dashed arch ring */}
            <div className="absolute inset-1 rounded-t-full rounded-b-sm border border-dashed border-gold/40 pointer-events-none z-10" />

            {/* The Wedding Portrait with Parallax Scale */}
            <div className="w-full h-full rounded-t-full rounded-b-sm overflow-hidden relative">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85"
                alt="Aria and Kabir Portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Sacred Vows & Narrative (7 cols) */}
        <div ref={textRef} className="md:col-span-6 space-y-6 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
            The Seven Sacred Steps • Saptapadi
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light tracking-wide leading-tight">
            "With Every Sacred Step, An Eternal Vow"
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-taupe-700 leading-relaxed font-light">
            "We step forward together—bound by devotion, strengthened by friendship, and blessed by the eternal warmth of our loved ones."
          </p>

          <div className="pt-2 space-y-2 text-xs sm:text-sm font-serif text-taupe-600 font-light border-l-2 border-gold/40 pl-4">
            <p>I. For nourishment and mutual support in every season of life</p>
            <p>II. For mental and spiritual strength in all endeavours</p>
            <p>III. For prosperity and selfless sharing with the world</p>
            <p>IV. For eternal companionship, joy, and peace</p>
          </div>

          <p className="font-script text-3xl text-gold-dark pt-2">
            Aria &amp; Kabir
          </p>
        </div>
      </div>
    </section>
  );
}
