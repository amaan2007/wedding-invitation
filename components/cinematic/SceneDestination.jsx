'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, ExternalLink, Sun } from 'lucide-react';
import { PalaceArchMotif, OrnateCornerFlourish, HeritagePalaceSilhouette } from './ArtworkIllustrations';
import { WEDDING_DATA } from '@/data/weddingData';

export default function SceneDestination() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Card */}
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
            Destination &amp; Royal Hospitality
          </p>
        </div>

        {/* Center Venue & Travel Stationery Block */}
        <div className="my-auto py-2 space-y-3.5">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal tracking-wide">
              Udaipur, Rajasthan
            </h3>
            <p className="font-serif italic text-xs text-taupe-600 mt-0.5">
              The Historic City of Lakes &amp; Palaces
            </p>
          </div>

          {/* Venues Detail Cards */}
          <div className="space-y-2 text-left">
            {/* Udaivilas */}
            <div className="bg-[#FAF7EE] border border-gold/30 rounded-sm p-3">
              <span className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
                Primary Venue &amp; Guest Hub
              </span>
              <p className="font-serif text-base text-charcoal font-normal mt-0.5">
                The Oberoi Udaivilas
              </p>
              <p className="text-[11px] font-sans text-taupe-600 font-light mt-0.5">
                Mehendi, Sangeet &amp; Welcome Celebrations • Lake Pichola
              </p>
            </div>

            {/* Jagmandir */}
            <div className="bg-[#FAF7EE] border border-gold/30 rounded-sm p-3">
              <span className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
                Island Palace &amp; Sacred Pheras
              </span>
              <p className="font-serif text-base text-charcoal font-normal mt-0.5">
                Jagmandir Island Palace
              </p>
              <p className="text-[11px] font-sans text-taupe-600 font-light mt-0.5">
                Sunset Varmala &amp; Vedic Pheras • Private boat jetty transfers
              </p>
            </div>
          </div>

          {/* Weather & Hospitality Advisory */}
          <div className="bg-[#FFFDF9] border border-dashed border-gold/40 p-2.5 rounded-sm text-center">
            <p className="text-[10px] font-serif text-taupe-700 italic">
              "Crisp sunny afternoons (24°C) &amp; cool starry evenings (10°C). Royal shawls and pashminas are recommended for lake ceremonies."
            </p>
          </div>
        </div>

        {/* Bottom Google Maps Button */}
        <div className="pb-2 border-t border-gold/25 pt-2">
          <a
            href="https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-sm border border-gold/40 bg-gold/10 hover:bg-gold hover:text-white transition-all text-[11px] font-sans tracking-widest uppercase text-charcoal font-medium inline-flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5 text-gold-dark" />
            <span>Open Lake Pichola on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
