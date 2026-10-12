'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';

export default function IntroGate({ onOpen }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const triggerOpen = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    onOpen();
    if (containerRef.current) {
      containerRef.current.style.display = 'none';
    }
  };

  const handleGateClick = () => {
    if (isPlayingVideo) return;
    setIsPlayingVideo(true);

    // Play background audio
    const bgAudio = document.getElementById('bg-music');
    if (bgAudio) {
      bgAudio.play().catch((err) => console.log('Audio autoplay prevented:', err));
    }

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video playback prevented, skipping straight to invitation:', err);
          triggerOpen();
        });
      }
    } else {
      triggerOpen();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasTriggeredRef.current) return;

    if (video.duration > 0 && video.duration - video.currentTime <= 1) {
      hasTriggeredRef.current = true;
      const flash = document.createElement('div');
      flash.className = 'bright-flash';
      flash.style.position = 'fixed';
      flash.style.inset = '0';
      flash.style.backgroundColor = '#ffffff';
      flash.style.zIndex = '99999';
      flash.style.pointerEvents = 'none';
      flash.style.opacity = '0';
      document.body.appendChild(flash);

      gsap.to(flash, {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.inOut',
        onComplete: () => {
          onOpen();
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          gsap.to(flash, {
            opacity: 0,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => flash.remove(),
          });
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="video-intro"
      onClick={handleGateClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0506',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Intro Portal Video */}
      <video
        ref={videoRef}
        src="/assets/create_a_portal_video_like_thi.mp4"
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isPlayingVideo ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Initial Cover Artwork & Tap Prompt */}
      {!isPlayingVideo && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <img
            src="/assets/frame-001.jpg"
            alt="Wedding Invitation Cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Golden Ambient Overlay & Tap to Open Prompt */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(10,5,6,0.3) 0%, rgba(10,5,6,0.75) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1.5px solid rgba(212, 175, 55, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                animation: 'ctaPulse 2.5s infinite ease-in-out',
              }}
            >
              <img
                src="/assets/ganesha.png"
                alt="Ganesha"
                style={{ width: '44px', height: '44px', objectFit: 'contain' }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                marginBottom: '0.8rem',
              }}
            >
              ॥ श्री गणेशाय नमः ॥
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 4.2rem)',
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Meenal &amp; Avinash
            </h1>

            <div
              style={{
                padding: '0.8rem 1.8rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(186,122,118,0.9))',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span>Tap to Open Invitation</span>
              <span>✦</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
