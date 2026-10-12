'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AmbientAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const melodyIntervalRef = useRef(null);

  const initAmbientAudio = () => {
    try {
      if (audioContextRef.current) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Raag Yaman notes (frequencies in Hz): Sa, Re, Ga, Ma(tivra), Pa, Dha, Ni, Sa'
      const scale = [220, 247.5, 275, 311.13, 330, 370, 415.3, 440, 495, 550];

      // Tanpura drone base
      const droneOsc1 = ctx.createOscillator();
      const droneOsc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();

      droneOsc1.type = 'triangle';
      droneOsc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 drone
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(165, ctx.currentTime); // E3 Pa

      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
      droneOsc1.connect(droneGain);
      droneOsc2.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc1.start();
      droneOsc2.start();

      // Plucked Santoor / Sitar simulator
      let step = 0;
      const melodySequence = [0, 2, 4, 3, 2, 4, 6, 7, 6, 4, 2, 0, 4, 7, 9, 7];

      melodyIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;

        const noteFreq = scale[melodySequence[step % melodySequence.length]];
        step++;

        const pluckOsc = ctx.createOscillator();
        const pluckGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        pluckOsc.type = 'triangle';
        pluckOsc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

        pluckGain.gain.setValueAtTime(0.06, ctx.currentTime);
        pluckGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        pluckOsc.connect(filter);
        filter.connect(pluckGain);
        pluckGain.connect(masterGain);

        pluckOsc.start();
        pluckOsc.stop(ctx.currentTime + 1.9);
      }, 1700);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Ambient audio notice:", e);
    }
  };

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAmbientAudio();
      return;
    }

    if (isPlaying) {
      if (audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (melodyIntervalRef.current) clearInterval(melodyIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={toggleAudio}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-sm backdrop-blur-md ${
          isPlaying
            ? 'bg-[#FAF7EE]/90 border-gold text-charcoal shadow-soft-glow'
            : 'bg-[#FAF7EE]/70 border-taupe-300/80 text-taupe-600 hover:border-gold hover:text-charcoal'
        }`}
        title={isPlaying ? "Mute ambient music" : "Play ambient classical music"}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-2.5 bg-gold-dark animate-pulse" />
            <span className="w-0.5 h-3.5 bg-gold-dark animate-bounce" style={{ animationDelay: '120ms' }} />
            <span className="w-0.5 h-2 bg-gold-dark animate-pulse" style={{ animationDelay: '240ms' }} />
          </div>
        ) : (
          <Music className="w-3.5 h-3.5 text-gold-dark" />
        )}
        <span className="text-[10px] font-sans tracking-mega-lux uppercase font-medium">
          {isPlaying ? "Sitar Ambiance" : "Sound"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-3 h-3 text-gold-dark" />
        ) : (
          <VolumeX className="w-3 h-3 opacity-60" />
        )}
      </button>
    </div>
  );
}
