'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VenueSection() {
  const sectionRef = useRef(null);

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
        start: 'top 85%',
      },
    });
  }, []);

  return (
    <section
      id="venue-section"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem',
        background: 'var(--cream)',
        textAlign: 'center',
      }}
    >
      <span className="sec-label">Where</span>
      <h2 className="sec-heading" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}>
        The Venue
      </h2>

      {/* Expanded Venue Card */}
      <div className="venue-card">
        <div className="venue-img-wrap">
          <img
            src="https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Balapriya%20%26%5C/ChatGPT%20Image%20May%2030%2C%202026%2C%2009_57_15%20AM.png"
            alt="Venue"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(138, 79, 76, 0.4), transparent)',
            }}
          />
        </div>

        <div className="venue-info">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--sage-deep)',
              marginBottom: '0.8rem',
              lineHeight: 1.3,
              fontWeight: 600,
            }}
          >
            Rajalakshmi Kalyana Mandapam
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: '#a08070',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            No. 205/1, Velachery Main Road,
            <br />
            Dhandeeswaram, Velachery,
            <br />
            Chennai, Tamil Nadu — 600042
          </p>

          <button
            className="venue-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            onClick={() =>
              window.open(
                'https://maps.google.com/?q=Rajalakshmi+Kalyana+Mandapam+Velachery+Chennai',
                '_blank'
              )
            }
          >
            <Navigation className="w-4 h-4" />
            <span>VIEW ON MAPS</span>
          </button>
        </div>
      </div>
    </section>
  );
}
