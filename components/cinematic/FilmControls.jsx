'use client';

import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

export default function FilmControls({
  currentScene,
  totalScenes,
  onNext,
  onPrev,
  onSelectScene,
  isPlaying,
  onTogglePlay,
  isAudioOn,
  onToggleAudio,
  sceneTitles,
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 p-3 sm:p-5 select-none pointer-events-none">
      {/* Top Segmented Story / Film Progress Bars */}
      <div className="max-w-md mx-auto flex items-center gap-1.5 mb-3 pointer-events-auto">
        {Array.from({ length: totalScenes }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectScene(idx)}
            className="flex-1 h-1 rounded-full overflow-hidden bg-black/15 transition-all focus:outline-none"
            aria-label={`Go to scene ${idx + 1}`}
          >
            <div
              className={`h-full transition-all duration-300 ${
                idx === currentScene
                  ? 'bg-gold w-full'
                  : idx < currentScene
                  ? 'bg-gold/60 w-full'
                  : 'w-0'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Top Sub-Bar: Scene Title, Auto-play toggle & Audio Toggle */}
      <div className="max-w-md mx-auto flex items-center justify-between pointer-events-auto px-1">
        {/* Current Scene Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-sans tracking-mega-lux uppercase text-gold-dark font-medium bg-[#FFFDF9]/85 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold/30 shadow-xs">
            {sceneTitles[currentScene] || `Scene ${currentScene + 1}`}
          </span>
        </div>

        {/* Action Controls: Auto-Play & Sound */}
        <div className="flex items-center gap-2">
          {/* Film Auto-Play / Pause Button */}
          <button
            onClick={onTogglePlay}
            className="p-1.5 rounded-full bg-[#FFFDF9]/85 backdrop-blur-sm border border-gold/30 text-charcoal hover:text-gold transition-colors shadow-xs"
            title={isPlaying ? "Pause automatic film reel" : "Play film automatically"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider backdrop-blur-sm border shadow-xs transition-colors ${
              isAudioOn
                ? 'bg-[#FFFDF9]/90 border-gold text-charcoal'
                : 'bg-[#FFFDF9]/75 border-taupe-300 text-taupe-500'
            }`}
            title={isAudioOn ? "Mute ambient music" : "Play ambient music"}
            aria-label={isAudioOn ? "Mute" : "Unmute"}
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-3 h-3 text-gold-dark" />
                <span className="hidden sm:inline">Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 opacity-60" />
                <span className="hidden sm:inline">Mute</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
