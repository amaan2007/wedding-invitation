'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Plane, Train, Sun, PhoneCall, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider } from './Ornaments';

export default function VenueSection() {
  return (
    <section id="venues" className="py-24 md:py-32 bg-[#FDFBF7] paper-texture relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            The Royal Destination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Venues &amp; Guest Travel Guide
          </h2>
          <FloralDivider className="w-40 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            Lake Pichola, Udaipur — where historic royal architecture meets timeless romance.
          </p>
        </div>

        {/* Venues Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {WEDDING_DATA.venues.map((venue, idx) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-[#FFFDF9] border border-[#DFC49B]/50 rounded-sm shadow-luxury overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Venue Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1816]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[10px] font-sans tracking-mega-lux uppercase text-[#E8DCB8]">
                      {venue.role}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-normal mt-0.5">
                      {venue.name}
                    </h3>
                  </div>
                </div>

                {/* Venue Info */}
                <div className="p-6 sm:p-8">
                  <p className="font-serif text-base text-taupe-700 font-light leading-relaxed mb-6">
                    {venue.description}
                  </p>

                  <div className="space-y-3 pb-6 border-b border-gold/20 text-xs sm:text-sm font-sans text-taupe-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-charcoal">Location:</span>
                        <p className="text-xs text-taupe-500 mt-0.5">{venue.location}</p>
                      </div>
                    </div>

                    {venue.checkInTime && (
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <span className="font-medium text-charcoal">Guest Check-In:</span>
                          <span className="text-xs text-taupe-600 ml-2">{venue.checkInTime}</span>
                        </div>
                      </div>
                    )}

                    {venue.boatTransferNote && (
                      <div className="bg-[#FAF6F0] border border-gold/30 p-3 rounded-sm text-xs font-sans text-taupe-700">
                        <span className="font-medium text-gold-dark block mb-0.5">Boat Transfers:</span>
                        {venue.boatTransferNote}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <a
                  href={venue.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-sm text-xs font-sans uppercase tracking-widest bg-gold/15 hover:bg-gold text-charcoal hover:text-white transition-all duration-300 font-medium"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Travel, Weather & Concierge Hospitality Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFFDF9] border border-gold/40 rounded-sm shadow-luxury p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-normal">
              Guest Hospitality &amp; Travel Assistance
            </h3>
            <p className="font-serif italic text-sm text-gold-dark mt-1">
              Ensuring your journey to Udaipur is smooth and comfortable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Airport Transfer */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-dark">
                <Plane className="w-4 h-4" />
                <h4 className="font-serif text-lg font-normal text-charcoal">By Flight</h4>
              </div>
              <p className="text-xs font-sans text-charcoal font-medium">
                {WEDDING_DATA.travelGuide.airport.name}
              </p>
              <p className="text-xs text-taupe-500 font-sans">
                {WEDDING_DATA.travelGuide.airport.distance}
              </p>
              <p className="text-xs font-serif text-taupe-700 font-light leading-relaxed">
                {WEDDING_DATA.travelGuide.airport.details}
              </p>
            </div>

            {/* Railway Station */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-dark">
                <Train className="w-4 h-4" />
                <h4 className="font-serif text-lg font-normal text-charcoal">By Train</h4>
              </div>
              <p className="text-xs font-sans text-charcoal font-medium">
                {WEDDING_DATA.travelGuide.railway.name}
              </p>
              <p className="text-xs text-taupe-500 font-sans">
                {WEDDING_DATA.travelGuide.railway.distance}
              </p>
              <p className="text-xs font-serif text-taupe-700 font-light leading-relaxed">
                {WEDDING_DATA.travelGuide.railway.details}
              </p>
            </div>

            {/* Weather Forecast Advisory */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-dark">
                <Sun className="w-4 h-4" />
                <h4 className="font-serif text-lg font-normal text-charcoal">December Weather</h4>
              </div>
              <p className="text-xs font-sans text-charcoal font-medium">
                {WEDDING_DATA.travelGuide.weather.temperature}
              </p>
              <p className="text-xs font-serif text-taupe-700 font-light leading-relaxed">
                {WEDDING_DATA.travelGuide.weather.advisory}
              </p>
            </div>

            {/* Concierge Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-dark">
                <PhoneCall className="w-4 h-4" />
                <h4 className="font-serif text-lg font-normal text-charcoal">Concierge Desk</h4>
              </div>
              <p className="text-xs font-sans text-charcoal font-medium">
                {WEDDING_DATA.travelGuide.concierge.name}
              </p>
              <p className="text-xs font-sans text-gold-dark font-medium">
                {WEDDING_DATA.travelGuide.concierge.phone}
              </p>
              <p className="text-xs text-taupe-500 font-sans">
                {WEDDING_DATA.travelGuide.concierge.email}
              </p>
              <p className="text-[11px] font-sans text-taupe-400 italic">
                {WEDDING_DATA.travelGuide.concierge.availability}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
