'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SceneEnvelope from './SceneEnvelope';
import ScenePatrika from './ScenePatrika';
import SceneCouple from './SceneCouple';
import ScenePalaceWorld from './ScenePalaceWorld';
import SceneCeremonies from './SceneCeremonies';
import ScenePortrait from './ScenePortrait';
import SceneDestination from './SceneDestination';
import SceneRsvp from './SceneRsvp';
import SceneClosing from './SceneClosing';
import FilmControls from './FilmControls';

export default function InvitationFilm() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  // Audio Context Ref for Web Audio API classical synthesizer
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const melodyIntervalRef = useRef(null);

  const sceneTitles = [
    "Royal Envelope",
    "Lagan Patrika",
    "The Couple",
    "Mewar Palace",
    "Ceremonies",
    "Sacred Vows",
    "Destination",
    "RSVP",
    "Final Blessing",
  ];

  const totalScenes = 9;

  // Initialize Web Audio API ambient classical sitar & tanpura synthesizer
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

      // Raag Yaman / Bhupali notes
      const scale = [220, 247.5, 275, 311.13, 330, 370, 415.3, 440, 495, 550];

      // Tanpura drone oscillators
      const drone1 = ctx.createOscillator();
      const drone2 = ctx.createOscillator();
      const droneGain = ctx.createGain();

      drone1.type = 'triangle';
      drone1.frequency.setValueAtTime(110, ctx.currentTime); // A2
      drone2.type = 'sine';
      drone2.frequency.setValueAtTime(165, ctx.currentTime); // E3
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);

      drone1.connect(droneGain);
      drone2.connect(droneGain);
      droneGain.connect(masterGain);

      drone1.start();
      drone2.start();

      // Plucked melody simulator (Santoor / Sitar arpeggio)
      let step = 0;
      const melodySequence = [0, 2, 4, 3, 2, 4, 6, 7, 6, 4, 2, 0, 4, 7, 9, 7];

      melodyIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;

        const freq = scale[melodySequence[step % melodySequence.length]];
        step++;

        const pluck = ctx.createOscillator();
        const pGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        pluck.type = 'triangle';
        pluck.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

        pGain.gain.setValueAtTime(0.06, ctx.currentTime);
        pGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        pluck.connect(filter);
        filter.connect(pGain);
        pGain.connect(masterGain);

        pluck.start();
        pluck.stop(ctx.currentTime + 1.9);
      }, 1800);

      setIsAudioOn(true);
    } catch (e) {
      console.warn("Ambient audio notice:", e);
    }
  };

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAmbientAudio();
      return;
    }

    if (isAudioOn) {
      if (audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      setIsAudioOn(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsAudioOn(true);
    }
  };

  // Start audio when envelope is unsealed
  const handleUnsealEnvelope = () => {
    initAmbientAudio();
    setCurrentScene(1);
    setIsPlaying(true);
  };

  // Scene navigation handlers
  const handleNext = () => {
    setCurrentScene((prev) => (prev < totalScenes - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentScene((prev) => (prev > 0 ? prev - 1 : totalScenes - 1));
  };

  // Auto-play timer (advances every 9 seconds when active)
  useEffect(() => {
    if (!isPlaying || currentScene === 0) return;

    const timer = setTimeout(() => {
      if (currentScene < totalScenes - 1) {
        setCurrentScene((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 9000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentScene]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#221C18] flex items-center justify-center">
      {/* Outer Luxury Ambience on Desktop: Warm Candlelight Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,128,0.12)_0%,rgba(20,16,14,0.95)_100%)] pointer-events-none" />

      {/* Main Portrait Card Canvas (Responsive: 100% on mobile, framed on desktop) */}
      <div className="relative w-full h-full max-w-lg max-h-[960px] overflow-hidden shadow-2xl bg-[#FBF8F1] flex flex-col justify-between">
        {/* Top Story Controls Header (visible after unsealing or when hovered) */}
        {currentScene > 0 && (
          <FilmControls
            currentScene={currentScene}
            totalScenes={totalScenes}
            onNext={handleNext}
            onPrev={handlePrev}
            onSelectScene={(idx) => setCurrentScene(idx)}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            isAudioOn={isAudioOn}
            onToggleAudio={toggleAudio}
            sceneTitles={sceneTitles}
          />
        )}

        {/* Central Animated Scene Theater */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScene === 0 && (
              <motion.div
                key="scene-0"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
              >
                <SceneEnvelope onUnseal={handleUnsealEnvelope} />
              </motion.div>
            )}

            {currentScene === 1 && (
              <motion.div
                key="scene-1"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <ScenePatrika />
              </motion.div>
            )}

            {currentScene === 2 && (
              <motion.div
                key="scene-2"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <SceneCouple />
              </motion.div>
            )}

            {currentScene === 3 && (
              <motion.div
                key="scene-3"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <ScenePalaceWorld />
              </motion.div>
            )}

            {currentScene === 4 && (
              <motion.div
                key="scene-4"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <SceneCeremonies />
              </motion.div>
            )}

            {currentScene === 5 && (
              <motion.div
                key="scene-5"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <ScenePortrait />
              </motion.div>
            )}

            {currentScene === 6 && (
              <motion.div
                key="scene-6"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <SceneDestination />
              </motion.div>
            )}

            {currentScene === 7 && (
              <motion.div
                key="scene-7"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <SceneRsvp />
              </motion.div>
            )}

            {currentScene === 8 && (
              <motion.div
                key="scene-8"
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8 }}
              >
                <SceneClosing onReplay={() => setCurrentScene(0)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Tap / Click Zones for Desktop & Mobile progression */}
        {currentScene > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-16 sm:w-10 sm:h-20 flex items-center justify-center text-gold/60 hover:text-gold transition-colors z-30 focus:outline-none"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-16 sm:w-10 sm:h-20 flex items-center justify-center text-gold/60 hover:text-gold transition-colors z-30 focus:outline-none"
              aria-label="Next scene"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
