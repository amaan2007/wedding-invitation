'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LakePicholaPanorama, GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollPalaceWorld() {
  const containerRef = useRef(null);
  const panoramaRef = useRef(null);
  const textRef = useRef(null);
  const archRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background palace panorama slow parallax
      gsap.fromTo(panoramaRef.current, {
        y: 40,
        scale: 0.98,
      }, {
        y: -40,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Foreground text reveal
      gsap.fromTo(textRef.current, {
        y: 50,
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

      // Arch depth
      gsap.fromTo(archRef.current, {
        y: -30,
        opacity: 0.3,
      }, {
        y: 30,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] sm:min-h-screen py-24 sm:py-36 px-6 sm:px-12 flex flex-col items-center justify-between overflow-hidden bg-[#FAF4EA]"
    >
      {/* Background Soft Sunset Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EA] via-[#F7EEE0] to-[#FAF6EE] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Top Edge Garland */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* Grand Arch Frame in the upper atmosphere */}
      <div
        ref={archRef}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-none opacity-40 z-0"
      >
        <GrandPalaceArch className="w-full h-44 sm:h-60 text-gold-dark" />
      </div>

      {/* Center Poetic Inscription — Positioned Directly into the Artwork (NO Boxy Cards!) */}
      <div ref={textRef} className="relative z-10 max-w-3xl mx-auto text-center my-auto py-12 space-y-6">
        <span className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
          The Palace Realm • Lake Pichola
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light tracking-wide leading-tight">
          "Where Sacred Traditions &amp; Timeless Romance Converge"
        </h3>

        <p className="font-serif italic text-base sm:text-xl text-taupe-700 font-light leading-relaxed max-w-2xl mx-auto">
          Amidst shimmering waters and century-old marble pavilions, our two souls unite under the golden skies of Mewar.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <span className="h-[0.5px] w-16 bg-gold/50" />
          <span className="font-serif italic text-xs tracking-mega-lux uppercase text-gold-dark font-light">
            Udaipur, Rajasthan
          </span>
          <span className="h-[0.5px] w-16 bg-gold/50" />
        </div>
      </div>

      {/* Full-Bleed Edge-to-Edge Lake Pichola Illustrated Panorama with Water Reflections */}
      <div ref={panoramaRef} className="relative w-full z-10 mt-auto pt-6 pointer-events-none">
        <LakePicholaPanorama className="w-full h-36 sm:h-56 md:h-64 text-gold-dark" />
      </div>
    </section>
  );
}
