'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, Download, ExternalLink } from 'lucide-react';
import { HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';
import { WEDDING_DATA } from '@/data/weddingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollCelebrations() {
  const containerRef = useRef(null);
  const eventsListRef = useRef([]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      eventsListRef.current.forEach((el, index) => {
        if (!el) return;
        const isEven = index % 2 === 0;

        gsap.fromTo(el, {
          y: 60,
          opacity: 0,
          x: isEven ? -20 : 20,
        }, {
          y: 0,
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-40 px-6 sm:px-12 bg-[#FAF6EE] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,253,248,0.9)_0%,rgba(247,240,226,0.9)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={8} />

      {/* Top Garland */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* Section Header — Organic & Editorial (NO Boxy Containers!) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-20 sm:mb-28 space-y-4">
        <span className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
          The Sacred Festivities
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-light tracking-wide">
          Wedding Celebrations
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light max-w-lg mx-auto">
          Three days of cherished rites, music, and royal banquets across Lake Pichola.
        </p>
      </div>

      {/* Asymmetrical Flowing Ribbon Timeline — (NO Boxy Cards!) */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Continuous Central Delicate Gold Thread Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent pointer-events-none -translate-x-1/2" />

        <div className="space-y-24 sm:space-y-36">
          {WEDDING_DATA.events.map((evt, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={evt.id}
                ref={(el) => (eventsListRef.current[idx] = el)}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 ${
                  isEven ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
                }`}
              >
                {/* Milestone Node on the Gold Line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full border border-gold bg-[#FAF6EE] flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
                </div>

                {/* Event Narrative Column (Occupies half width with generous whitespace) */}
                <div className={`w-full md:w-1/2 pl-10 md:pl-0 space-y-3 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                  {/* Date & Ceremony Number */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium block">
                      {evt.dateFormatted}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal tracking-wide">
                      {evt.name}
                    </h3>
                    <p className="font-serif italic text-sm sm:text-base text-gold-dark">
                      {evt.subTitle}
                    </p>
                  </div>

                  {/* Timing & Venue */}
                  <div className={`space-y-1 text-xs font-sans text-taupe-700 pt-1 ${isEven ? 'md:items-end' : ''}`}>
                    <p className="font-medium text-charcoal flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}">
                      <Clock className="w-3.5 h-3.5 text-gold-dark inline shrink-0" />
                      <span>{evt.time}</span>
                    </p>
                    <p className="text-taupe-600 flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}">
                      <MapPin className="w-3.5 h-3.5 text-gold-dark inline shrink-0" />
                      <span>{evt.venueName}</span>
                    </p>
                  </div>

                  {/* Poetic Description */}
                  <p className="font-serif text-sm sm:text-base text-taupe-700 leading-relaxed font-light pt-2 max-w-md">
                    "{evt.description}"
                  </p>

                  {/* Attire Guidance with Color Swatches */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-taupe-500 block">
                      Attire: {evt.dressCode}
                    </span>
                    <div className={`flex items-center gap-1.5 ${isEven ? 'md:justify-end' : ''}`}>
                      {evt.paletteColors.map((col, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-gold/40 shadow-xs"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Discrete Actions */}
                  <div className={`pt-3 flex items-center gap-4 text-[11px] font-sans uppercase tracking-wider ${isEven ? 'md:justify-end' : ''}`}>
                    <button
                      onClick={() => downloadIcs(evt)}
                      className="inline-flex items-center gap-1.5 text-gold-dark hover:text-charcoal transition-colors font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Add to Calendar</span>
                    </button>
                    <a
                      href={evt.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-taupe-500 hover:text-gold-dark transition-colors font-medium"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Empty Balancing Column for Asymmetry */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
