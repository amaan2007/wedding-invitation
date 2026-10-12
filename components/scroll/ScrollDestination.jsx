'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, Compass, ExternalLink, Sun, Plane } from 'lucide-react';
import { GrandPalaceArch, HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollDestination() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-40 px-6 sm:px-12 bg-[#FAF6EE] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,253,248,0.9)_0%,rgba(247,240,226,0.9)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={5} />

      {/* Top Garland */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* Content Composition (NO Boxy Cards!) */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            The Royal Destination
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-light tracking-wide">
            Udaipur, Rajasthan
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light max-w-lg mx-auto">
            The Historic City of Lakes, Marble Palaces &amp; Starry Mewar Skies
          </p>
        </div>

        {/* Venues Showcase Columns — Open Editorial Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 text-left pt-4">
          {/* Udaivilas */}
          <div className="space-y-3 border-l-2 border-gold/40 pl-6">
            <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
              Primary Venue &amp; Hospitality
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              The Oberoi Udaivilas
            </h3>
            <p className="font-serif text-sm sm:text-base text-taupe-700 leading-relaxed font-light">
              Sprawled across 50 acres on the banks of Lake Pichola. Host to our Sundowner Mehendi, Royal Sangeet, and 24x7 guest hospitality hub.
            </p>
            <p className="text-xs font-sans text-taupe-500">
              Haridas Ji Ki Magri, Lake Pichola, Udaipur
            </p>
          </div>

          {/* Jagmandir */}
          <div className="space-y-3 border-l-2 border-gold/40 pl-6">
            <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
              Island Palace &amp; Sacred Pheras
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Jagmandir Island Palace
            </h3>
            <p className="font-serif text-sm sm:text-base text-taupe-700 leading-relaxed font-light">
              A 17th-century marble palace rising from the waters of Lake Pichola. Accessible via complimentary private royal solar boat transfers from Udaivilas Jetty.
            </p>
            <p className="text-xs font-sans text-taupe-500">
              Pichola, Udaipur (Boats depart every 15 mins)
            </p>
          </div>
        </div>

        {/* Guest Travel & Weather Notes */}
        <div className="pt-6 border-t border-gold/30 max-w-2xl mx-auto space-y-4 text-xs sm:text-sm font-sans text-taupe-700">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-gold-dark" />
              <span>Chauffeur transfers arranged from Maharana Pratap Airport (UDR)</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-gold-dark" />
              <span>Crisp sunny afternoons (24°C) &amp; cool starry evenings (10°C)</span>
            </div>
          </div>

          {/* Direct Google Maps Action that belongs to the artwork */}
          <div className="pt-4 text-center">
            <a
              href="https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/60 bg-gold/10 hover:bg-gold hover:text-white transition-all text-xs font-sans uppercase tracking-widest text-charcoal font-medium shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-dark" />
              <span>Open Lake Pichola on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
