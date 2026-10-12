'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Check, Sparkles, Search, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RsvpSection() {
  const [attending, setAttending] = useState('yes');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [partySize, setPartySize] = useState('2 guests');
  const [eventsSelected, setEventsSelected] = useState(
    new Set(['Sangeet Night', 'After Party', 'Carnival', 'Phere', 'Reception'])
  );
  const [dietary, setDietary] = useState('No specific preferences');
  const [songQuery, setSongQuery] = useState('');
  const [songResults, setSongResults] = useState([]);
  const [isSearchingSong, setIsSearchingSong] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSong, setSelectedSong] = useState('');
  const [advice, setAdvice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef(null);

  // Live iTunes Search integration
  useEffect(() => {
    if (!songQuery || songQuery.length < 2) {
      setSongResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearchingSong(true);
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songQuery)}&entity=song&limit=6`)
        .then((res) => res.json())
        .then((data) => {
          setSongResults(data.results || []);
          setShowDropdown(true);
          setIsSearchingSong(false);
        })
        .catch((err) => {
          console.error('iTunes search error:', err);
          setIsSearchingSong(false);
        });
    }, 450);

    return () => clearTimeout(timer);
  }, [songQuery]);

  const toggleEvent = (evt) => {
    const updated = new Set(eventsSelected);
    if (updated.has(evt)) updated.delete(evt);
    else updated.add(evt);
    setEventsSelected(updated);
  };

  const handleSelectSong = (track) => {
    setSelectedSong(`${track.trackName} - ${track.artistName}`);
    setSongQuery(`${track.trackName} - ${track.artistName}`);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Gold confetti explosion
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#8a4f4c', '#ffffff'],
      });
    }, 600);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  if (isSubmitted) {
    return (
      <section
        id="rsvp-section"
        style={{
          padding: '8rem 1.5rem',
          background: 'var(--cream)',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#8a4f4c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <svg width="40" height="30" viewBox="0 0 14 10" fill="none">
            <path
              d="M1 5L4.5 8.5L13 1"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 20, strokeDashoffset: 0, animation: 'drawCheck 0.5s ease 0.3s backwards' }}
            />
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: '#8a4f4c', marginBottom: '1rem' }}>
          Thank You!
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', color: '#4a3d36', fontSize: '1.2rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
          Your RSVP has been beautifully received. We cannot wait to dance, celebrate, and create unforgettable memories with you!
        </p>
      </section>
    );
  }

  return (
    <section
      id="rsvp-section"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem 7rem',
        background: 'var(--cream)',
        textAlign: 'center',
      }}
    >
      <span className="sec-label">Join the Celebration</span>
      <h2 className="sec-heading" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', color: 'var(--sage-deep)' }}>
        RSVP
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto 3.5rem' }}>
        Kindly let us know if you can make it — your presence will make this celebration whole.
      </p>

      {/* Expanded RSVP Form Container */}
      <form onSubmit={handleSubmit} className="rsvp-form" style={{ textAlign: 'left' }}>
        {/* Guest Details */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--sage-deep)', marginBottom: '1rem' }}>
            Your details
          </h4>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.4rem' }}>
              Your name *
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Priyanshu Sharma"
              style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--cream-2)',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.4rem' }}>
              Phone number *
            </label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{
                  padding: '0.9rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--cream-2)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+65">🇸🇬 +65</option>
              </select>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                style={{
                  flex: 1,
                  padding: '0.9rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--cream-2)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Attendance Selection */}
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
            Will you join us?
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <button
              type="button"
              onClick={() => setAttending('yes')}
              style={{
                padding: '0.9rem',
                borderRadius: '8px',
                border: attending === 'yes' ? '2px solid var(--sage-deep)' : '1px solid var(--border)',
                background: attending === 'yes' ? 'var(--cream-2)' : '#fff',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: attending === 'yes' ? 'var(--sage-deep)' : 'var(--text-mid)',
                fontWeight: attending === 'yes' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Yes, can't wait! 🎉
            </button>
            <button
              type="button"
              onClick={() => setAttending('no')}
              style={{
                padding: '0.9rem',
                borderRadius: '8px',
                border: attending === 'no' ? '2px solid var(--sage-deep)' : '1px solid var(--border)',
                background: attending === 'no' ? 'var(--cream-2)' : '#fff',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: attending === 'no' ? 'var(--sage-deep)' : 'var(--text-mid)',
                fontWeight: attending === 'no' ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Regretfully decline
            </button>
          </div>
        </div>

        {attending === 'yes' && (
          <>
            {/* Party Size */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
                Party size
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['1 (Just me)', '2 guests', '3 guests', '4 guests', '5 guests'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPartySize(size)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      borderRadius: '50px',
                      border: partySize === size ? '1.5px solid var(--sage-deep)' : '1px solid var(--border)',
                      background: partySize === size ? 'var(--sage-deep)' : '#fff',
                      color: partySize === size ? '#fff' : 'var(--text-mid)',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Attending Checkboxes */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
                Events you'll attend
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                {['Sangeet Night', 'After Party', 'Carnival', 'Phere', 'Reception'].map((evt) => {
                  const isChecked = eventsSelected.has(evt);
                  return (
                    <div
                      key={evt}
                      onClick={() => toggleEvent(evt)}
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: '8px',
                        border: isChecked ? '1.5px solid var(--sage-deep)' : '1px solid var(--border)',
                        background: isChecked ? 'var(--cream-2)' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-dark)' }}>
                        {evt}
                      </span>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: isChecked ? 'none' : '1.5px solid #bbb',
                          background: isChecked ? 'var(--sage-deep)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live iTunes Song Request for Sangeet */}
            <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
                <Music className="w-4 h-4 text-gold" />
                <span>A song for the dance floor</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={songQuery}
                  onChange={(e) => {
                    setSongQuery(e.target.value);
                    setSelectedSong('');
                  }}
                  placeholder="Type any Bollywood, Punjabi, or Pop track..."
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--cream-2)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    outline: 'none',
                  }}
                />
                {isSearchingSong && (
                  <span style={{ position: 'absolute', right: '1rem', top: '1rem', fontSize: '0.8rem', color: '#888' }}>
                    Searching iTunes...
                  </span>
                )}
              </div>

              {/* iTunes Live Results Dropdown */}
              {showDropdown && songResults.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    border: '1px solid var(--border)',
                    marginTop: '4px',
                    maxHeight: '260px',
                    overflowY: 'auto',
                  }}
                >
                  {songResults.map((track) => (
                    <div
                      key={track.trackId}
                      onClick={() => handleSelectSong(track)}
                      style={{
                        padding: '0.7rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f5f0ea',
                      }}
                    >
                      <img
                        src={track.artworkUrl60}
                        alt={track.trackName}
                        style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                      />
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#2c2a29', fontWeight: 600, margin: 0 }}>
                          {track.trackName}
                        </p>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#8c8480', margin: 0 }}>
                          {track.artistName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dietary Preferences */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
                🍽️ Dietary preferences
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['No specific preferences', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Jain Food', 'Other'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDietary(d)}
                    style={{
                      padding: '0.6rem 1.1rem',
                      borderRadius: '50px',
                      border: dietary === d ? '1.5px solid var(--sage-deep)' : '1px solid var(--border)',
                      background: dietary === d ? 'var(--sage-deep)' : '#fff',
                      color: dietary === d ? '#fff' : 'var(--text-mid)',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Advice / Note */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '0.8rem' }}>
                Marriage advice for us (Optional)
              </label>
              <textarea
                rows={3}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="Share your golden secret to a lifelong happy marriage..."
                style={{
                  width: '100%',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--cream-2)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="intro-btn"
            style={{
              padding: '1.1rem 3rem',
              fontSize: '0.95rem',
              width: '100%',
              maxWidth: '340px',
              margin: '0 auto',
              background: 'var(--sage-deep)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(138, 79, 76, 0.3)',
            }}
          >
            {isSubmitting ? 'Sending...' : 'SEND RSVP'}
          </button>
        </div>
      </form>
    </section>
  );
}
