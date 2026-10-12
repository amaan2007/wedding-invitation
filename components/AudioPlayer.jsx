'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorNodesRef = useRef([]);
  const gainNodeRef = useRef(null);
  const melodyIntervalRef = useRef(null);

  // Initialize Web Audio API synthesizer for ambient Indian wedding melody
  const initAmbientAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Raag Yaman notes (frequencies in Hz): Sa, Re, Ga, Ma(tivra), Pa, Dha, Ni, Sa'
      const scale = [
        220.00, // A3 (Sa)
        247.50, // B3 (Re)
        275.00, // C#4 (Ga)
        311.13, // D#4 (Tivra Ma)
        330.00, // E4 (Pa)
        370.00, // F#4 (Dha)
        415.30, // G#4 (Ni)
        440.00, // A4 (Sa)
        495.00, // B4 (Re')
        550.00, // C#5 (Ga')
      ];

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

      oscillatorNodesRef.current.push(droneOsc1, droneOsc2);

      // Gentle melodic pluck simulator (Santoor / Sitar harmonic plucks)
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

        pluckGain.gain.setValueAtTime(0.07, ctx.currentTime);
        pluckGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        pluckOsc.connect(filter);
        filter.connect(pluckGain);
        pluckGain.connect(masterGain);

        pluckOsc.start();
        pluckOsc.stop(ctx.currentTime + 1.9);
      }, 1600);

    } catch (e) {
      console.warn("Ambient audio initialization note:", e);
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioContextRef.current) {
      initAmbientAudio();
      setIsPlaying(true);
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
      if (melodyIntervalRef.current) {
        clearInterval(melodyIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-luxury ${
          isPlaying
            ? 'bg-ivory-100/95 border-gold text-charcoal shadow-soft-glow'
            : 'bg-ivory-50/90 border-taupe-300 text-taupe-600 hover:border-gold hover:text-charcoal'
        } backdrop-blur-md`}
        title={isPlaying ? "Mute ambient wedding music" : "Play ambient wedding music"}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1 h-3.5">
            <span className="w-0.5 h-3 bg-gold animate-pulse" />
            <span className="w-0.5 h-4 bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-gold animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-0.5 h-3.5 bg-gold animate-bounce" style={{ animationDelay: '450ms' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
        )}

        <span className="text-xs uppercase tracking-widest font-sans font-medium">
          {isPlaying ? "Sitar & Tanpura" : "Ambiance"}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-gold" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>
    </div>
  );
}
