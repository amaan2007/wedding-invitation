'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2, Heart, Music, Sparkles, Send, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '@/data/weddingData';
import { FloralDivider, JharokhaArch } from './Ornaments';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attending: 'yes',
    guestCount: '1',
    events: ['event-mehendi', 'event-sangeet', 'event-haldi', 'event-pheras', 'event-reception'],
    dietary: 'Pure Vegetarian',
    songRequest: '',
    blessing: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRsvp, setSubmittedRsvp] = useState(null);

  // Check existing RSVP in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aria_kabir_wedding_rsvp');
      if (saved) {
        setSubmittedRsvp(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone or WhatsApp number.';
    }
    if (formData.attending === 'yes' && formData.events.length === 0) {
      errs.events = 'Please select at least one celebration you plan to attend.';
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
      const rsvpRecord = {
        ...formData,
        confirmationId: `AK-UDR-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };

      try {
        localStorage.setItem('aria_kabir_wedding_rsvp', JSON.stringify(rsvpRecord));
      } catch (e) {}

      setSubmittedRsvp(rsvpRecord);
      setIsSubmitting(false);

      // Gold and Champagne confetti explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DFC49B', '#C5A880', '#9E7D4E', '#FAF7EE', '#6B202D'],
      });
    }, 800);
  };

  const handleEventToggle = (eventId) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventId);
      return {
        ...prev,
        events: exists
          ? prev.events.filter((id) => id !== eventId)
          : [...prev.events, eventId],
      };
    });
  };

  const handleEdit = () => {
    if (submittedRsvp) {
      setFormData(submittedRsvp);
    }
    setSubmittedRsvp(null);
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-[#F9F6F0] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
            Répondez S'il Vous Plaît
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-light mt-2 tracking-wide">
            Confirm Your Presence
          </h2>
          <FloralDivider className="w-40 h-4 mx-auto my-3 text-gold/80" />
          <p className="font-serif italic text-base sm:text-lg text-taupe-600 font-light mt-2">
            Kindly respond by 15 November 2026 to help us welcome you with royal warmth.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FFFDF9] border border-[#DFC49B]/50 rounded-sm shadow-luxury p-8 sm:p-12 md:p-14 relative">
          <div className="absolute inset-2 sm:inset-3 border border-gold/20 pointer-events-none" />

          {submittedRsvp ? (
            /* Confirmation Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium">
                  RSVP Confirmed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                  Thank You, {submittedRsvp.fullName}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-taupe-600 max-w-lg mx-auto font-light">
                  {submittedRsvp.attending === 'yes'
                    ? "We are delighted beyond words that you will be joining us in Udaipur! We eagerly await celebrating our union with you."
                    : "We will dearly miss your presence in Udaipur, but carry your blessings in our hearts."}
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-[#FAF7EE] border border-gold/30 p-6 rounded-sm max-w-md mx-auto text-left text-xs font-sans space-y-2.5">
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="text-taupe-500 uppercase tracking-wider">Confirmation ID:</span>
                  <span className="font-mono font-medium text-charcoal">{submittedRsvp.confirmationId}</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="text-taupe-500 uppercase tracking-wider">Attendance:</span>
                  <span className="font-medium text-charcoal capitalize">
                    {submittedRsvp.attending === 'yes' ? `Attending (${submittedRsvp.guestCount} Guests)` : 'Regretfully Declines'}
                  </span>
                </div>
                {submittedRsvp.attending === 'yes' && (
                  <div className="flex justify-between border-b border-gold/20 pb-2">
                    <span className="text-taupe-500 uppercase tracking-wider">Dietary:</span>
                    <span className="font-medium text-charcoal">{submittedRsvp.dietary}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-taupe-500 uppercase tracking-wider">Submitted On:</span>
                  <span className="text-taupe-600">{submittedRsvp.submittedAt}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest border border-gold text-charcoal hover:bg-gold/10 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Update RSVP</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-sans tracking-mega-lux uppercase text-gold-dark font-medium mb-3 text-center">
                  Will You Be Joining Us In Udaipur?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-3.5 px-4 rounded-sm border text-xs font-sans uppercase tracking-widest transition-all duration-200 text-center ${
                      formData.attending === 'yes'
                        ? 'border-gold bg-[#FAF7EE] text-charcoal font-medium shadow-xs'
                        : 'border-taupe-300 text-taupe-600 hover:border-gold'
                    }`}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`py-3.5 px-4 rounded-sm border text-xs font-sans uppercase tracking-widest transition-all duration-200 text-center ${
                      formData.attending === 'no'
                        ? 'border-gold bg-[#FAF7EE] text-charcoal font-medium shadow-xs'
                        : 'border-taupe-300 text-taupe-600 hover:border-gold'
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Full Name <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maharani Gayatri / Raghav Singhania"
                    className={`w-full px-4 py-3 bg-[#FAF8F3] border rounded-sm text-sm font-sans focus:outline-none focus:border-gold transition-colors ${
                      errors.fullName ? 'border-maroon' : 'border-taupe-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-maroon mt-1 font-sans">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Email Address <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@example.com"
                    className={`w-full px-4 py-3 bg-[#FAF8F3] border rounded-sm text-sm font-sans focus:outline-none focus:border-gold transition-colors ${
                      errors.email ? 'border-maroon' : 'border-taupe-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-maroon mt-1 font-sans">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Phone / WhatsApp <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 bg-[#FAF8F3] border rounded-sm text-sm font-sans focus:outline-none focus:border-gold transition-colors ${
                      errors.phone ? 'border-maroon' : 'border-taupe-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-maroon mt-1 font-sans">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-sm font-sans focus:outline-none focus:border-gold"
                  >
                    <option value="1">1 Guest (Only Myself)</option>
                    <option value="2">2 Guests (Myself &amp; Companion)</option>
                    <option value="3">3 Guests (With Family)</option>
                    <option value="4">4 Guests (Family Group)</option>
                    <option value="5+">5+ Guests (Please coordinate with Hospitality)</option>
                  </select>
                </div>
              </div>

              {formData.attending === 'yes' && (
                <>
                  {/* Events Attending Checkboxes */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-3">
                      Select Celebrations You Plan To Attend <span className="text-maroon">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {WEDDING_DATA.events.map((evt) => {
                        const isChecked = formData.events.includes(evt.id);
                        return (
                          <div
                            key={evt.id}
                            onClick={() => handleEventToggle(evt.id)}
                            className={`p-3.5 border rounded-sm cursor-pointer flex items-center justify-between transition-colors ${
                              isChecked
                                ? 'bg-[#FAF7EE] border-gold text-charcoal'
                                : 'bg-[#FAF8F3] border-taupe-200 text-taupe-600 hover:border-gold/50'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-sans font-medium">{evt.name}</p>
                              <p className="text-[10px] text-taupe-500 font-sans">{evt.dateFormatted} • {evt.time.split('–')[0]}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                              isChecked ? 'border-gold bg-gold text-white' : 'border-taupe-300'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.events && (
                      <p className="text-xs text-maroon mt-1.5 font-sans">{errors.events}</p>
                    )}
                  </div>

                  {/* Dietary Preference */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Dietary Preferences
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Pure Vegetarian', 'Jain Vegetarian', 'Non-Vegetarian', 'Vegan / Gluten-Free'].map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => setFormData({ ...formData, dietary: diet })}
                          className={`py-2.5 px-2 text-center rounded-sm border text-xs font-sans transition-colors ${
                            formData.dietary === diet
                              ? 'border-gold bg-[#FAF7EE] text-charcoal font-medium'
                              : 'border-taupe-200 text-taupe-600 hover:border-gold/60'
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Song Request for Sangeet */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-gold" />
                      <span>Sangeet Song Request (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.songRequest}
                      onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                      placeholder="Which Bollywood or fusion track will get you on the dance floor?"
                      className="w-full px-4 py-3 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-sm font-sans focus:outline-none focus:border-gold"
                    />
                  </div>
                </>
              )}

              {/* Note / Blessing for Couple */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-charcoal font-medium mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-gold" />
                  <span>Blessing / Message for Aria &amp; Kabir (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.blessing}
                  onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  placeholder="Share a heartfelt blessing or memory with the couple..."
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-taupe-300 rounded-sm text-sm font-sans focus:outline-none focus:border-gold"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-full text-xs font-sans uppercase tracking-widest font-medium bg-gradient-to-r from-gold via-gold-dark to-gold text-white shadow-md hover:shadow-soft-glow transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Your Response..." : "Send Formal RSVP"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
