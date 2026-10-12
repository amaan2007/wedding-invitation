'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Music, Sparkles, Send, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HangingFloralGarland, FloatingPetalsOverlay } from './OrganicBotanicals';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRsvp() {
  const containerRef = useRef(null);
  const formBoxRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    attending: 'yes',
    guestCount: '2',
    dietary: 'Pure Vegetarian',
    songRequest: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRsvp, setSubmittedRsvp] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aria_kabir_scroll_rsvp');
      if (saved) setSubmittedRsvp(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    if (!formData.phone.trim()) errs.phone = 'Please provide contact number.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const record = {
        ...formData,
        confirmationId: `AK-UDR-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      };

      try {
        localStorage.setItem('aria_kabir_scroll_rsvp', JSON.stringify(record));
      } catch (e) {}

      setSubmittedRsvp(record);
      setIsSubmitting(false);

      // Gold & Champagne confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DFC49B', '#C5A880', '#9E7D4E', '#FAF7EE', '#6B202D'],
      });
    }, 600);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formBoxRef.current, {
        y: 40,
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
      className="relative w-full py-28 sm:py-40 px-6 sm:px-12 bg-[#F8F4EA] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,253,248,0.9)_0%,rgba(245,237,222,0.9)_100%)] pointer-events-none" />

      {/* Floating Petals */}
      <FloatingPetalsOverlay count={6} />

      {/* Top Garland */}
      <div className="absolute top-0 left-0 right-0 z-20 opacity-50">
        <HangingFloralGarland className="w-full h-20 sm:h-28 text-gold" />
      </div>

      {/* RSVP Content Area — Organic & Understated (NO Heavy Boxy Cards!) */}
      <div ref={formBoxRef} className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-10">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Répondez S'il Vous Plaît
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-light tracking-wide">
            Confirm Your Presence
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light max-w-md mx-auto">
            Kindly respond by 15 November 2026 to help us prepare your royal welcome.
          </p>
        </div>

        {submittedRsvp ? (
          <div className="py-8 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-3xl text-charcoal font-normal">
              Thank You, {submittedRsvp.fullName}
            </h3>
            <p className="font-serif italic text-sm text-taupe-600">
              {submittedRsvp.attending === 'yes'
                ? "We look forward with immense joy to celebrating our vows with you in Udaipur!"
                : "We will miss your presence in Udaipur, but carry your blessings in our hearts."}
            </p>
            <div className="pt-2 text-xs font-sans text-taupe-500">
              Confirmation ID: <span className="font-mono text-charcoal font-medium">{submittedRsvp.confirmationId}</span>
            </div>
            <button
              onClick={() => setSubmittedRsvp(null)}
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-gold-dark hover:text-charcoal pt-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Response</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-xl mx-auto">
            {/* Attendance Choice */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`py-3 px-4 text-xs font-sans uppercase tracking-widest rounded-full border transition-all ${
                  formData.attending === 'yes'
                    ? 'border-gold bg-gold/15 text-charcoal font-medium'
                    : 'border-taupe-300 text-taupe-500 hover:border-gold'
                }`}
              >
                Joyfully Accepts
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'no' })}
                className={`py-3 px-4 text-xs font-sans uppercase tracking-widest rounded-full border transition-all ${
                  formData.attending === 'no'
                    ? 'border-gold bg-gold/15 text-charcoal font-medium'
                    : 'border-taupe-300 text-taupe-500 hover:border-gold'
                }`}
              >
                Regretfully Declines
              </button>
            </div>

            {/* Inputs styled with elegant underline borders directly on paper texture */}
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-sans tracking-widest uppercase text-taupe-600 mb-1">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Raghav &amp; Gayatri Singhania"
                  className="w-full py-2.5 bg-transparent border-b border-gold/50 focus:border-gold focus:outline-none text-base font-serif text-charcoal placeholder:text-taupe-400 placeholder:font-serif placeholder:italic"
                />
                {errors.fullName && <p className="text-xs text-maroon mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-widest uppercase text-taupe-600 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full py-2.5 bg-transparent border-b border-gold/50 focus:border-gold focus:outline-none text-base font-serif text-charcoal placeholder:text-taupe-400 placeholder:font-serif placeholder:italic"
                />
                {errors.phone && <p className="text-xs text-maroon mt-1">{errors.phone}</p>}
              </div>

              {formData.attending === 'yes' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-sans tracking-widest uppercase text-taupe-600 mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full py-2.5 bg-transparent border-b border-gold/50 focus:border-gold focus:outline-none text-sm font-sans text-charcoal"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4+">4+ Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans tracking-widest uppercase text-taupe-600 mb-1">
                        Dietary Preference
                      </label>
                      <select
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        className="w-full py-2.5 bg-transparent border-b border-gold/50 focus:border-gold focus:outline-none text-sm font-sans text-charcoal"
                      >
                        <option value="Pure Vegetarian">Pure Vegetarian</option>
                        <option value="Jain Vegetarian">Jain Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-widest uppercase text-taupe-600 mb-1">
                      Song for Sangeet (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.songRequest}
                      onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                      placeholder="What Bollywood melody will bring you to the dance floor?"
                      className="w-full py-2.5 bg-transparent border-b border-gold/50 focus:border-gold focus:outline-none text-sm font-serif text-charcoal placeholder:text-taupe-400 placeholder:italic"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3 rounded-full bg-gold text-white text-xs font-sans uppercase tracking-widest font-medium hover:bg-gold-dark transition-all duration-300 shadow-md hover:shadow-soft-glow disabled:opacity-50"
              >
                {isSubmitting ? "Recording Response..." : "Send Formal RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
