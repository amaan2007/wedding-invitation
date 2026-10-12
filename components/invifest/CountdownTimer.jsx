'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const target = new Date(2026, 6, 1, 10, 0, 0); // 1 July 2026
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;

      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        secs: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: '3rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        background: 'var(--cream)',
      }}
    >
      {/* Expanded Countdown Card */}
      <div
        className="cd-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '2.5rem 2rem',
          borderRadius: '1.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow)',
          background: '#fff',
          border: '1px solid var(--border)',
        }}
      >
        <p className="cd-quote" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
          "Every second brings us closer to forever."
        </p>
        <h3 className="cd-script" style={{ fontFamily: 'var(--font-display)', color: 'var(--sage-dark)', fontSize: '2.4rem', marginBottom: '1.5rem' }}>
          Counting Down the Moments
        </h3>

        {/* Ticking Digits Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { val: timeLeft.days, label: 'DAYS' },
            { val: timeLeft.hours, label: 'HOURS' },
            { val: timeLeft.mins, label: 'MINS' },
            { val: timeLeft.secs, label: 'SECS' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'var(--cream-2)',
                padding: '1.2rem 0.5rem',
                borderRadius: '1rem',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  color: 'var(--sage-deep)',
                  fontWeight: 600,
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {item.val}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
