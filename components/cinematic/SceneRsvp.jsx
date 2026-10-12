'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Music, Sparkles, Send, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PalaceArchMotif, OrnateCornerFlourish } from './ArtworkIllustrations';

export default function SceneRsvp() {
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
      const saved = localStorage.getItem('aria_kabir_film_rsvp');
      if (saved) {
        setSubmittedRsvp(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide contact number.';
    }
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
        localStorage.setItem('aria_kabir_film_rsvp', JSON.stringify(record));
      } catch (e) {}

      setSubmittedRsvp(record);
      setIsSubmitting(false);

      // Gold confetti explosion
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#DFC49B', '#C5A880', '#9E7D4E', '#FAF7EE', '#6B202D'],
      });
    }, 600);
  };

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
        className="relative w-full max-w-sm sm:max-w-md aspect-[3/4.4] rounded-sm bg-[#FFFDF9] border border-[#DFC49B]/70 shadow-2xl p-5 sm:p-7 flex flex-col justify-between text-center overflow-hidden"
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

        {/* Top Header */}
        <div className="pt-1">
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Répondez S'il Vous Plaît • Royal RSVP
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal tracking-wide mt-0.5">
            Confirm Attendance
          </h3>
          <p className="font-serif italic text-xs text-taupe-600">
            Kindly respond by 15 November 2026
          </p>
        </div>

        {/* Center Content */}
        <div className="my-auto py-1">
          {submittedRsvp ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-3 py-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <p className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
                  Response Recorded
                </p>
                <h4 className="font-serif text-2xl text-charcoal font-normal">
                  Thank You, {submittedRsvp.fullName}
                </h4>
                <p className="font-serif italic text-xs text-taupe-600 mt-1">
                  {submittedRsvp.attending === 'yes'
                    ? "We look forward with great excitement to welcoming you in Udaipur!"
                    : "We will miss you dearly, but carry your blessings in our hearts."}
                </p>
              </div>

              <div className="bg-[#FAF7EE] border border-gold/30 p-3 rounded-sm text-[11px] font-sans space-y-1 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-taupe-500 uppercase">Confirmation:</span>
                  <span className="font-mono font-medium text-charcoal">{submittedRsvp.confirmationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe-500 uppercase">Status:</span>
                  <span className="font-medium text-charcoal">
                    {submittedRsvp.attending === 'yes' ? `Attending (${submittedRsvp.guestCount} Guests)` : 'Declined'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSubmittedRsvp(null)}
                className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-gold-dark hover:text-charcoal"
              >
                <Edit3 className="w-3 h-3" />
                <span>Modify Response</span>
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {/* Attendance Choice */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-2 px-1 text-[10px] font-sans uppercase tracking-wider rounded-sm border transition-all ${
                    formData.attending === 'yes'
                      ? 'border-gold bg-[#FAF7EE] text-charcoal font-medium'
                      : 'border-taupe-200 text-taupe-500 hover:border-gold'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-2 px-1 text-[10px] font-sans uppercase tracking-wider rounded-sm border transition-all ${
                    formData.attending === 'no'
                      ? 'border-gold bg-[#FAF7EE] text-charcoal font-medium'
                      : 'border-taupe-200 text-taupe-500 hover:border-gold'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>

              {/* Name & Phone */}
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Guest Full Name *"
                    className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-sm text-xs font-sans focus:outline-none focus:border-gold ${
                      errors.fullName ? 'border-maroon' : 'border-taupe-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-maroon mt-0.5">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="WhatsApp / Phone Number *"
                    className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-sm text-xs font-sans focus:outline-none focus:border-gold ${
                      errors.phone ? 'border-maroon' : 'border-taupe-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-maroon mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              {formData.attending === 'yes' && (
                <>
                  {/* Guest Count & Diet */}
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-2 py-2 bg-[#FAF8F3] border border-taupe-200 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4+">4+ Guests</option>
                    </select>

                    <select
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      className="w-full px-2 py-2 bg-[#FAF8F3] border border-taupe-200 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                    >
                      <option value="Pure Vegetarian">Pure Veg</option>
                      <option value="Jain Vegetarian">Jain Veg</option>
                      <option value="Non-Vegetarian">Non-Veg</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>

                  {/* Song request */}
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="Song for Sangeet (Optional)"
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-taupe-200 rounded-sm text-xs font-sans focus:outline-none focus:border-gold"
                  />
                </>
              )}

              {/* Submit */}
              <div className="pt-1 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-sm bg-gold text-white text-[11px] font-sans uppercase tracking-widest font-medium hover:bg-gold-dark transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Recording Response..." : "Send Formal RSVP"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Motif */}
        <div className="pb-1 border-t border-gold/25 pt-1.5 text-center">
          <p className="text-[9px] font-sans tracking-mega-lux uppercase text-taupe-400">
            Singhania &amp; Mehra Wedding Registry
          </p>
        </div>
      </motion.div>
    </div>
  );
}
