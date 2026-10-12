'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { PalaceArchMotif, OrnateCornerFlourish, MarigoldGarlandBorder } from './ArtworkIllustrations';
import { WEDDING_DATA } from '@/data/weddingData';

export default function SceneCeremonies() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const events = WEDDING_DATA.events;
  const currentEvent = events[activeEventIndex];

  const handleNext = () => {
    setActiveEventIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActiveEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const downloadIcs = (event) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aria and Kabir Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Aria & Kabir Wedding: ${event.name}`,
      `DESCRIPTION:${event.subTitle} - ${event.description}. Dress Code: ${event.dressCode}`,
      `LOCATION:${event.venueName}, ${event.venueAddress}`,
      `DTSTART:${event.calendarDate.start}`,
      `DTEND:${event.calendarDate.end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#FBF8F1] paper-texture pointer-events-none" />

      {/* Main Stationery Card Folio */}
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

        {/* Top Header & Ceremony Leaf Tabs */}
        <div className="pt-2">
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium mb-1">
            Ceremony Schedule • Patrika {activeEventIndex + 1} of {events.length}
          </p>

          {/* Elegant Stationery Leaf Selectors */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {events.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setActiveEventIndex(idx)}
                className={`text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all ${
                  activeEventIndex === idx
                    ? 'border-gold bg-gold/15 text-charcoal font-medium'
                    : 'border-transparent text-taupe-400 hover:text-gold'
                }`}
              >
                {evt.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Ceremony Paper Panel with Page-Turn Animation */}
        <div className="my-auto py-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 25, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -25, rotateY: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-3 px-1"
            >
              {/* Event Title */}
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-wide">
                  {currentEvent.name}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-dark mt-0.5">
                  {currentEvent.subTitle}
                </p>
              </div>

              {/* Garland */}
              <div className="max-w-[180px] mx-auto opacity-70">
                <MarigoldGarlandBorder className="w-full h-3 text-gold" />
              </div>

              {/* Date, Time & Venue Block */}
              <div className="bg-[#FAF7EE] border border-gold/30 rounded-sm p-3.5 space-y-2 text-xs font-sans text-taupe-700">
                <div className="flex items-center justify-center gap-2 text-charcoal font-medium">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{currentEvent.dateFormatted}</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{currentEvent.time}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-charcoal font-medium pt-1 border-t border-gold/15">
                  <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span className="truncate">{currentEvent.venueName}</span>
                </div>
              </div>

              {/* Poetic Description */}
              <p className="font-serif text-xs sm:text-sm text-taupe-700 font-light leading-relaxed line-clamp-2">
                "{currentEvent.description}"
              </p>

              {/* Attire & Swatches */}
              <div className="pt-1">
                <span className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block mb-1">
                  Attire: {currentEvent.dressCode}
                </span>
                <div className="flex items-center justify-center gap-1.5">
                  {currentEvent.paletteColors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-gold/40"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Ceremony Leaf Flippers */}
          <button
            onClick={handlePrev}
            className="absolute left-[-10px] top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gold-dark hover:bg-gold/10 transition-colors"
            aria-label="Previous ceremony"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-10px] top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gold-dark hover:bg-gold/10 transition-colors"
            aria-label="Next ceremony"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Actions: Discreet Calendar Sync & Venue Map */}
        <div className="pb-2 border-t border-gold/25 pt-2 flex items-center justify-between text-[10px] font-sans">
          <button
            onClick={() => downloadIcs(currentEvent)}
            className="inline-flex items-center gap-1 text-gold-dark hover:text-charcoal uppercase tracking-wider font-medium"
          >
            <Download className="w-3 h-3" />
            <span>Add to Calendar</span>
          </button>

          <a
            href={currentEvent.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gold-dark hover:text-charcoal uppercase tracking-wider font-medium"
          >
            <span>Directions</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
