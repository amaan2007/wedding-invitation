'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Individual Expanded Scratch Card Item
function ScratchItem({ label, value, onComplete }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Expanded dimensions (140px x 180px)
    canvas.width = 140;
    canvas.height = 180;

    // Rich metallic rose-gold & burgundy scratch gradient
    const grad = ctx.createLinearGradient(0, 0, 140, 180);
    grad.addColorStop(0, '#d8a7a9');
    grad.addColorStop(0.3, '#c58b90');
    grad.addColorStop(0.7, '#b97a7e');
    grad.addColorStop(1, '#9b5358');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 140, 180);

    // Delicate decorative gold flecks on scratch foil
    ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 140, Math.random() * 180, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const scratchArc = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleStart = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      scratchArc(pos.x, pos.y);
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 72;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      lastX = pos.x;
      lastY = pos.y;
    };

    const handleEnd = () => {
      isDrawing = false;
      checkPercentage();
    };

    const checkPercentage = () => {
      if (isScratched) return;
      const imgData = ctx.getImageData(0, 0, 140, 180).data;
      let cleared = 0;
      for (let i = 3; i < imgData.length; i += 4) {
        if (imgData[i] < 128) cleared++;
      }
      const totalPixels = imgData.length / 4;
      if (cleared / totalPixels > 0.45) {
        setIsScratched(true);
        gsap.to(canvas, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            canvas.style.display = 'none';
            onComplete();
          },
        });
      }
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isScratched, onComplete]);

  return (
    <div className="scratch-item" style={{ textAlign: 'center' }}>
      <span className="scratch-label">{label}</span>
      <div
        className={`scratch-card-wrapper ${isScratched ? '' : 'wiggling'}`}
        ref={cardRef}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Hidden Value underneath */}
        <div className="scratch-value">{value}</div>

        {/* Scratchable Canvas */}
        <canvas className="scratch-canvas" ref={canvasRef} />

        {/* Scratch Prompt Badge */}
        {!isScratched && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'rgba(255, 255, 255, 0.95)',
                textTransform: 'uppercase',
                fontWeight: 700,
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              SCRATCH
            </span>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>🪙</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Master Scratch Card Section
export default function ScratchSection({ onComplete }) {
  const [isCheering, setIsCheering] = useState(false);
  const completedCountRef = useRef(0);
  const sectionRef = useRef(null);

  const handleCardComplete = useCallback(() => {
    completedCountRef.current += 1;
    if (completedCountRef.current === 3) {
      setIsCheering(true);

      // Play cheering sound
      try {
        const yayAudio = new Audio('/assets/kids-saying-yay-sound-effect.mp3');
        yayAudio.play().catch(() => {});
      } catch (e) {}

      // Fire festive confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#8a4f4c', '#ffffff', '#e8ce73'],
      });

      setTimeout(() => {
        onComplete();
      }, 1500);

      setTimeout(() => {
        setIsCheering(false);
      }, 2500);
    }
  }, [onComplete]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.children, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <section
      id="countdown-section"
      className="scratch-section"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem',
        textAlign: 'center',
        background: 'var(--cream)',
      }}
    >
      <span className="scratch-title-sub">The Date</span>
      <h2 className="scratch-title" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}>
        Save the Date
      </h2>
      <div className="scratch-desc" style={{ marginBottom: '2.5rem' }}>
        Scratch below to reveal our wedding date
      </div>

      {/* Expanded Scratch Grid with Month, Day, Year */}
      <div className="scratch-grid">
        <ScratchItem label="MONTH" value="JULY" onComplete={handleCardComplete} />
        <ScratchItem label="DAY" value="01" onComplete={handleCardComplete} />
        <ScratchItem label="YEAR" value="2026" onComplete={handleCardComplete} />
      </div>
    </section>
  );
}
