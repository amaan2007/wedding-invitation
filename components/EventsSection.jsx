'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, Download } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from './Ornaments';

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Celebrations" },
    { id: "day1", label: "Fri, 18 Dec" },
    { id: "day2", label: "Sat, 19 Dec" },
    { id: "day3", label: "Sun, 20 Dec" },
  ];

  const filteredEvents = WEDDING_DATA.events.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "day1") return event.dateFormatted.includes("18 December");
    if (activeFilter === "day2") return event.dateFormatted.includes("19 December");
    if (activeFilter === "day3") return event.dateFormatted.includes("20 December");
    return true;
  });

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`Aria & Kabir Wedding: ${event.name}`);
    const details = encodeURIComponent(`${event.subTitle}\n\nDress Code: ${event.dressCode}\n\n${event.description}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    const dates = `${event.calendarDate.start}/${event.calendarDate.end}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate & Download iCal / .ics file
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
    <section id="events" className="py-24 md:py-32 bg-[#FDFBF7] paper-texture relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Multi-Day Itinerary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Wedding Celebrations
          </h2>
          <FloralDivider className="w-40 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            Three days of joyous traditions, music, sacred rites, and festivity across Lake Pichola.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                activeFilter === opt.id
                  ? 'bg-gold text-white shadow-sm'
                  : 'bg-[#FAF7EE] border border-gold/30 text-taupe-700 hover:border-gold hover:text-charcoal'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#FFFDF9] border border-[#DFC49B]/50 rounded-sm shadow-luxury overflow-hidden flex flex-col group"
              >
                {/* Event Photo Banner */}
                <div className="relative h-60 w-full overflow-hidden bg-ivory-200">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816]/80 via-transparent to-transparent" />

                  {/* Date Badge on Image */}
                  <div className="absolute bottom-4 left-5 text-white">
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-[#E8DCB8] block">
                      {event.dateFormatted}
                    </span>
                    <span className="font-serif text-2xl tracking-wide font-normal">
                      {event.name}
                    </span>
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Subtitle */}
                    <p className="font-serif italic text-base text-gold-dark mb-4">
                      {event.subTitle}
                    </p>

                    {/* Time & Venue */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gold/20 text-xs sm:text-sm font-sans text-taupe-700">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gold shrink-0" />
                        <span className="font-medium text-charcoal">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-charcoal">{event.venueName}</p>
                          <p className="text-xs text-taupe-500 font-light mt-0.5">{event.venueAddress}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-serif text-base text-taupe-700 font-light leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Dress Code & Palette */}
                    <div className="bg-[#FAF6F0] border border-gold/30 p-4 rounded-sm mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
                          Attire &amp; Dress Code
                        </span>
                        <span className="text-[10px] font-sans text-taupe-500 italic">
                          {event.paletteLabel}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-charcoal font-medium mb-3">
                        {event.dressCode}
                      </p>
                      {/* Color Palette Chips */}
                      <div className="flex items-center gap-2">
                        {event.paletteColors.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            className="w-5 h-5 rounded-full border border-gold/40 shadow-xs"
                            style={{ backgroundColor: color }}
                            title={`Palette tone ${cIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to Calendar & Google Maps */}
                  <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <a
                        href={getGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 text-charcoal transition-colors font-medium tracking-wide"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Google Cal</span>
                      </a>
                      <button
                        onClick={() => downloadIcs(event)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-taupe-300 hover:border-gold text-taupe-700 hover:text-charcoal transition-colors font-medium tracking-wide"
                        title="Download .ics calendar event"
                      >
                        <Download className="w-3.5 h-3.5 text-gold" />
                        <span>.ICS</span>
                      </button>
                    </div>

                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gold-dark hover:text-charcoal transition-colors font-medium uppercase tracking-wider text-[11px]"
                    >
                      <span>Venue Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
