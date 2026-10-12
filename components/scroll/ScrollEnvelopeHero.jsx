'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollEnvelopeHero() {
  const sectionRef = useRef(null);
  const envelopeFlapRef = useRef(null);
  const waxSealRef = useRef(null);
  const innerCardRef = useRef(null);
  const heroTextRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const archRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll-driven unfolding timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Envelope Flap opens in 3D perspective
      tl.to(envelopeFlapRef.current, {
        rotateX: -140,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power1.inOut',
      }, 0);

      // 2. Wax Seal cracks, rotates and dissolves in golden shimmer
      tl.to(waxSealRef.current, {
        scale: 0.3,
        opacity: 0,
        rotate: 35,
        duration: 0.8,
        ease: 'power2.in',
      }, 0.2);

      // 3. Inner Card glides upward from within envelope and expands to full scale
      tl.to(innerCardRef.current, {
        y: -120,
        scale: 1.08,
        duration: 2,
        ease: 'power1.out',
      }, 0.5);

      // 4. Grand Palace Arch reveals and moves with gentle parallax
      tl.to(archRef.current, {
        y: -40,
        opacity: 0.85,
        duration: 2,
        ease: 'power1.out',
      }, 0.6);

      // 5. Hero Typography appears with elegant staggered reveal
      tl.fromTo(heroTextRef.current.children, {
        y: 35,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power2.out',
      }, 1);

      // 6. Scroll indicator fades out
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.4,
      }, 0.1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#FAF6EE] flex flex-col items-center justify-center select-none"
    >
      {/* Background Ambience: Warm Candlelight Vignette & Handcrafted Paper Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,253,248,0.95)_0%,rgba(240,230,215,0.95)_100%)] pointer-events-none" />

      {/* Floating Organic Flower Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Top Hanging Floral Garland extending edge-to-edge */}
      <div className="absolute top-0 left-0 right-0 z-30 opacity-60">
        <HangingFloralGarland className="w-full h-24 sm:h-32 text-gold-dark" />
      </div>

      {/* Grand Mughal Jharokha Arch in the background with parallax */}
      <div
        ref={archRef}
        className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl z-0 opacity-40 pointer-events-none"
      >
        <GrandPalaceArch className="w-full h-36 sm:h-52 text-gold" />
      </div>

      {/* Envelope Container with 3D Perspective */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg px-4 flex flex-col items-center perspective-[1200px]">
        {/* The Outer Tactile Envelope Body */}
        <div className="relative w-full aspect-[4/3] bg-[#F7F2E6] rounded-sm border border-gold/40 shadow-2xl flex flex-col items-center justify-center overflow-visible">
          {/* Subtle textured envelope fold lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#EFE6D4]/30 to-transparent pointer-events-none" />

          {/* Inner Golden Invitation Card (glides out as user scrolls) */}
          <div
            ref={innerCardRef}
            className="absolute top-4 w-[92%] sm:w-[94%] aspect-[4/4.8] bg-[#FFFDF9] rounded-sm border border-gold/60 shadow-xl p-6 sm:p-8 flex flex-col items-center justify-between text-center overflow-hidden"
            style={{
              boxShadow: '0 20px 50px -10px rgba(60, 48, 38, 0.25), 0 0 0 1px rgba(197, 168, 128, 0.3)',
            }}
          >
            {/* Inner Gold Foil Frame */}
            <div className="absolute inset-2 sm:inset-3 border border-gold/40 pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold/25 pointer-events-none" />

            {/* Sacred Inscription */}
            <p className="text-[10px] sm:text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium pt-2">
              ॥ श्री गणेशाय नमः ॥
            </p>

            {/* Couple Typography */}
            <div ref={heroTextRef} className="my-auto py-2 space-y-2">
              <span className="text-[9px] font-sans tracking-mega-lux uppercase text-taupe-500 block">
                The Wedding Union Of
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light tracking-wide">
                ARIA
              </h1>
              <span className="font-script text-3xl sm:text-5xl text-gold-dark font-normal my-[-6px] block">
                &amp;
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light tracking-wide">
                KABIR
              </h1>
              <p className="font-serif italic text-xs sm:text-sm text-taupe-600 mt-2">
                18 — 20 December 2026 • Udaipur, Rajasthan
              </p>
            </div>

            {/* Card Footer */}
            <p className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark pb-2 font-medium">
              Lake Pichola • Oberoi Udaivilas • Jagmandir
            </p>
          </div>

          {/* Envelope 3D Triangular Flap */}
          <div
            ref={envelopeFlapRef}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F3ECE0] border-b-2 border-gold/50 shadow-md flex items-center justify-center origin-top z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Flap Texture Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8DEC9]/20 to-[#DFC49B]/30 pointer-events-none" />
          </div>

          {/* Royal Wax Seal Monogram */}
          <div
            ref={waxSealRef}
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 cursor-pointer pointer-events-none"
          >
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8C3542] via-[#6B202D] to-[#4A121A] p-1 shadow-2xl border border-[#DFC49B]/60 flex items-center justify-center shadow-[#6B202D]/40">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#DFC49B]/60 flex flex-col items-center justify-center bg-[#541620]/90 text-center">
                <span className="text-[7px] tracking-mega-lux text-[#E8DCB8] uppercase font-sans">
                  Royal Seal
                </span>
                <span className="font-serif text-xl sm:text-2xl font-light text-[#FAF6F0] tracking-wider my-[-2px]">
                  A&thinsp;&amp;&thinsp;K
                </span>
                <span className="text-[7px] tracking-widest text-[#E8DCB8]/80 font-sans">
                  UDAIPUR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Prompt */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gold-dark pointer-events-none"
      >
        <span className="text-[10px] font-sans tracking-mega-lux uppercase font-medium">
          Scroll to Unfold
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-dark" />
      </div>
    </section>
  );
}
