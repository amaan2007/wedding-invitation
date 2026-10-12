'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroCard() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const elements = heroRef.current.querySelectorAll('.reveal');

    gsap.from(elements, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '3rem 1.5rem',
        background: 'var(--cream)',
      }}
    >
      {/* Decorative Outer Corner Frame */}
      <div className="hero-corner">
        <span />
      </div>

      {/* Expanded Luxury Hero Card (Expanded width & creative gold filigree) */}
      <div className="hero-card" style={{ position: 'relative' }}>
        {/* Subtle Decorative Arch Motif at top */}
        <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="180" height="36" viewBox="0 0 180 36" fill="none">
            <path d="M0 36 C45 6, 135 6, 180 36" stroke="var(--gold)" strokeWidth="1.2" strokeOpacity="0.6" />
            <circle cx="90" cy="8" r="3" fill="var(--gold)" />
          </svg>
        </div>

        {/* Ganesha Sacred Icon */}
        <img
          className="hero-icon reveal"
          src="/assets/ganesha.png"
          alt="Lord Ganesha"
        />

        {/* Sacred Sanskrit Shloka */}
        <div className="god-quote reveal reveal-d1" style={{ whiteSpace: 'pre-line' }}>
          {`॥ श्री गणेशाय नमः ॥
वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥`}
        </div>

        {/* Intro Inscription */}
        <div className="intro-text reveal reveal-d2">
          With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of
        </div>

        {/* Shimmering Couple Names & Calligraphic Ampersand */}
        <div className="couple-name shimmer reveal reveal-d2">
          Meenal
        </div>

        <div className="amp-row reveal reveal-d3">
          <span className="amp-line" />
          <span className="amp">&amp;</span>
          <span className="amp-line" />
        </div>

        <div className="couple-name shimmer reveal reveal-d3">
          Avinash
        </div>

        {/* Parents' Subtitle */}
        <div className="parent-sub reveal reveal-d4" style={{ whiteSpace: 'pre-line' }}>
          {`Daughter of Mr. & Mrs. Sharma
Son of Mr. & Mrs. Patel`}
        </div>
      </div>

      {/* Scroll to see magic indicator */}
      <div
        className="scroll-indicator"
        style={{
          opacity: 1,
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--sage-dark)',
          }}
        >
          Scroll to see magic
        </span>
        <ChevronDown className="w-4 h-4 text-[var(--gold)] animate-bounce" />
      </div>
    </section>
  );
}
