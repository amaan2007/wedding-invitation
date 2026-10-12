'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { JharokhaArch, FloralDivider } from './Ornaments';

export default function HeroSection({ isUnlocked }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.countdownTarget).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#1A1614] text-white">
      {/* Background Editorial Wedding Image with Cinematic Ken Burns & Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Refined Photographic Vignette Gradients: Warm Amber, Taupe & Deep Charcoal */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/60 to-[#1A1614]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(20,16,14,0.75)_100%)]" />
      </div>

      {/* Top Spacer for floating Navbar */}
      <div className="pt-24 md:pt-28 z-10 w-full" />

      {/* Center Cinematic Typography Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-10">
        {/* Subtle Architectural Jharokha motif */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="opacity-75 mb-3"
        >
          <JharokhaArch className="w-56 md:w-72 h-16 md:h-20 text-[#DFC49B]" />
        </motion.div>

        {/* Auspicious Inscription */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-xs md:text-sm font-sans tracking-mega-lux uppercase text-[#E8DCB8] mb-4 font-light"
        >
          {WEDDING_DATA.blessings.sanskrit}
        </motion.p>

        {/* Invitation Line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-script text-2xl md:text-3xl text-[#DFC49B] tracking-wide mb-3"
        >
          Together with their families
        </motion.p>

        {/* Couple Names - Main Cinematic Focal Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="my-4 md:my-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-wide text-[#FAF7EE] drop-shadow-md">
            ARIA
            <span className="inline-block font-script text-4xl sm:text-6xl md:text-7xl text-[#DFC49B] mx-2 md:mx-4 font-normal align-middle">
              &amp;
            </span>
            KABIR
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-serif italic text-base md:text-xl text-[#E8DDD0] max-w-xl mx-auto mb-6 font-light"
        >
          Request the honour of your gracious presence as they exchange their sacred wedding vows
        </motion.p>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs md:text-sm font-sans tracking-widest uppercase text-[#FAF6F0] mb-10"
        >
          <div className="flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-[#DFC49B]/40 pb-2 sm:pb-0 sm:pr-8">
            <Calendar className="w-4 h-4 text-[#DFC49B]" />
            <span>18 – 20 December 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#DFC49B]" />
            <span>Udaipur, Rajasthan</span>
          </div>
        </motion.div>

        {/* Countdown Timer Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="inline-flex items-center justify-center gap-3 sm:gap-6 bg-[#26201D]/70 backdrop-blur-md px-6 py-4 rounded-lg border border-[#DFC49B]/30 shadow-luxury"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={item.label} className="flex items-center">
              <div className="flex flex-col items-center min-w-[50px] sm:min-w-[65px]">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#FAF7EE] tracking-tight">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-mega-lux uppercase font-sans text-[#C5A880] mt-1 font-medium">
                  {item.label}
                </span>
              </div>
              {idx < 3 && (
                <span className="font-serif text-xl text-[#DFC49B]/40 mx-1 sm:mx-2 mb-3">:</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2 text-[#E8DCB8]/80 hover:text-[#DFC49B] transition-colors cursor-pointer"
        onClick={() => {
          document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-sans tracking-mega-lux uppercase">
          Scroll to Unfold Our Story
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#DFC49B]" />
      </motion.div>
    </section>
  );
}
