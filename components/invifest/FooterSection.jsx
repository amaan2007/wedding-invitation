'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ChevronUp, Share2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FooterSection() {
  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meenal & Avinash Wedding Invitation',
        text: 'Join us to celebrate our wedding festivities!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.from(footerRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
      },
    });
  }, []);

  return (
    <footer
      id="footer-section"
      ref={footerRef}
      style={{
        background: '#8a4f4c',
        padding: '6rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
        color: '#f5ecd4',
      }}
    >
      {/* Emotional Closing Note */}
      <div
        className="footer-msg"
        style={{
          color: '#f5ecd4',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '1.35rem',
          lineHeight: 1.7,
          maxWidth: '640px',
          margin: '0 auto',
        }}
      >
        <span>
          Your presence will turn this real-life romance into a blockbuster we'll never forget.
          <br />
          <br />
        </span>
        <span>Come, dance, laugh, and celebrate with us in true Bollywood style!</span>
      </div>

      {/* Family Regards */}
      <div style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <span
          style={{
            display: 'block',
            color: '#d4af37',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}
        >
          Warm regards,
        </span>
        <span
          style={{
            display: 'block',
            color: '#f5ecd4',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.45rem',
          }}
        >
          Mrs Anjana and Mr Santosh Sahu and family
        </span>
      </div>

      {/* Couple Name */}
      <span
        className="footer-name"
        style={{
          color: '#d4af37',
          display: 'block',
          marginBottom: '3.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 4.5rem)',
        }}
      >
        Meenal &amp; Avinash
      </span>

      {/* Actions: Return to Top & Share */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
        <button
          onClick={scrollToTop}
          className="intro-btn"
          style={{
            padding: '0.8rem 1.8rem',
            fontSize: '0.75rem',
            background: 'transparent',
            color: '#d4af37',
            border: '1px solid #d4af37',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <ChevronUp className="w-4 h-4" />
          <span>RETURN TO TOP</span>
        </button>

        <button
          onClick={handleShare}
          className="intro-btn"
          style={{
            padding: '0.8rem 1.8rem',
            fontSize: '0.75rem',
            background: '#d4af37',
            color: '#8a4f4c',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE INVITATION</span>
        </button>
      </div>

      {/* Footer Credit */}
      <div
        className="footer-credit"
        style={{
          borderTop: '1px solid rgba(245, 236, 212, 0.2)',
          paddingTop: '2rem',
          color: '#d4af37',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
        }}
      >
        CRAFTED WITH ❤️ FOR MEENAL &amp; AVINASH
      </div>
    </footer>
  );
}
