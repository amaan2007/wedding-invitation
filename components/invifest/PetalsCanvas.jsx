'use client';

import { useEffect, useRef } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const colors = ['#f7c6c7', '#eac9c7', '#f0d0c0', '#e8c8b8', '#f5d5c5', '#d4af37'];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnPetal = () => {
      if (petalsRef.current.length > 40) return;
      petalsRef.current.push({
        x: Math.random() * canvas.width,
        y: -20,
        r: Math.random() * Math.PI * 2,
        rot: (Math.random() - 0.5) * 0.03,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.6 + Math.random() * 1.2,
        vr: (Math.random() - 0.5) * 0.02,
        size: 7 + Math.random() * 11,
        opacity: 0.35 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalsRef.current.forEach((p, idx) => {
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.35;
        p.y += p.vy;
        p.r += p.vr;

        if (p.y > canvas.height + 20) {
          petalsRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (Math.random() < 0.07) {
        spawnPetal();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petals-canvas"
      className="active"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
