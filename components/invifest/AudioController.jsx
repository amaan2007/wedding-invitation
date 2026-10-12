'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  };

  return (
    <>
      <audio
        id="bg-music"
        ref={audioRef}
        src="/assets/bg-music.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={toggleAudio}
        className="btn-micro"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--cream)',
          border: '1px solid #dcd1c4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          color: '#8a4f4c',
          transition: 'all 0.3s ease',
        }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#8a4f4c]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#8a4f4c] opacity-60" />
        )}
      </button>
    </>
  );
}
