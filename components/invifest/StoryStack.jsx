'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function StoryStack() {
  const containerRef = useRef(null);
  const rotations = [-2.5, 1.8, -1.5, 2.2];
  const [activePhoto, setActivePhoto] = useState(null);

  const stories = [
    { src: '/assets/Kohli-Anushka-2ITG-1748983672590-scaled.avif', cap: 'Memories together' },
    { src: '/assets/Virat-Kohli-and-Anushka-Sharma-2.webp', cap: 'Written in the stars' },
    { src: '/assets/virat-kohli--anushka-sharma-100712365-3x4.webp', cap: 'Joy and laughter' },
    { src: '/assets/cropped-Virat-Kohli-and-Anushka-Sharma-220820241724319474.avif', cap: 'Forever Us' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.story-card-wrapper');

    const handleScroll = () => {
      cards.forEach((card, idx) => {
        const rot = rotations[idx] || 0;
        if (idx < cards.length - 1) {
          const nextTop = cards[idx + 1].getBoundingClientRect().top;
          const threshold = window.innerHeight * 0.22;

          if (nextTop <= threshold) {
            card.style.transform = `scale(0.92) rotate(${rot}deg)`;
            card.style.filter = 'brightness(0.5)';
            card.style.opacity = '1';
          } else if (nextTop < window.innerHeight) {
            const diff = nextTop - threshold;
            const span = window.innerHeight - threshold;
            const factor = Math.max(0, Math.min(1, 1 - diff / span));
            const scale = 1 - 0.08 * factor;
            const bright = 1 - 0.5 * factor;
            card.style.transform = `scale(${scale}) rotate(${rot}deg)`;
            card.style.filter = `brightness(${bright})`;
            card.style.opacity = '1';
          } else {
            card.style.transform = `scale(1) rotate(${rot}deg)`;
            card.style.filter = 'brightness(1)';
            card.style.opacity = '1';
          }
        } else {
          card.style.transform = `scale(1) rotate(${rot}deg)`;
          card.style.filter = 'brightness(1)';
        }
      });
    };

    cards.forEach((card, idx) => {
      card.style.transform = `scale(1) rotate(${rotations[idx] || 0}deg)`;
      card.style.filter = 'brightness(1)';
      card.style.opacity = '1';
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="story-section" style={{ background: 'var(--cream)', padding: '4rem 1rem 6rem' }}>
      {/* Sticky Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '2vh 1rem 2vh',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(var(--cream) 80%, transparent)',
        }}
      >
        <span className="scratch-title-sub" style={{ color: '#c9a270', display: 'block' }}>
          Our Story
        </span>
        <h2 className="scratch-title" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: 0 }}>
          Forever Us
        </h2>
      </div>

      {/* Stacking Polaroid Cards */}
      <div className="story-stack-container" ref={containerRef} style={{ paddingBottom: '5vh' }}>
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="story-card-wrapper"
            onClick={() => setActivePhoto(story)}
            style={{ cursor: 'pointer' }}
          >
            <div className="story-polaroid">
              <img src={story.src} alt={story.cap} loading="lazy" decoding="async" />
              <div className="story-polaroid-caption">{story.cap}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Creative Touch: Tap to View Full High-Res Lightbox */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 5, 6, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              padding: '0.6rem',
              cursor: 'pointer',
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            style={{
              background: '#fff',
              padding: '1.2rem 1.2rem 2rem',
              borderRadius: '8px',
              maxWidth: '90vw',
              maxHeight: '85vh',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.cap}
              style={{ maxHeight: '68vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '2rem',
                color: 'var(--sage-deep)',
                marginTop: '1rem',
              }}
            >
              {activePhoto.cap}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
