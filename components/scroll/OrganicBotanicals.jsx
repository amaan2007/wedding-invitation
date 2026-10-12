'use client';

// Rich organic botanical illustrations and architectural motifs for continuous edge-to-edge composition
export function HangingFloralGarland({ className = "w-full text-gold" }) {
  return (
    <svg
      viewBox="0 0 1200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Curved vine lines */}
      <path
        d="M0 30 Q300 110 600 40 Q900 110 1200 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <path
        d="M0 45 Q300 135 600 55 Q900 135 1200 45"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3 4"
        strokeOpacity="0.3"
      />

      {/* Hanging marigold and jasmine clusters */}
      {[
        { x: 120, y: 70, r: 8 },
        { x: 220, y: 92, r: 10 },
        { x: 300, y: 100, r: 12 },
        { x: 380, y: 94, r: 10 },
        { x: 480, y: 72, r: 8 },
        { x: 600, y: 44, r: 7 },
        { x: 720, y: 72, r: 8 },
        { x: 820, y: 94, r: 10 },
        { x: 900, y: 100, r: 12 },
        { x: 980, y: 92, r: 10 },
        { x: 1080, y: 70, r: 8 },
      ].map((flower, i) => (
        <g key={i} transform={`translate(${flower.x}, ${flower.y})`}>
          {/* Stem */}
          <line x1="0" y1="-18" x2="0" y2="0" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Flower petals */}
          <circle cx="0" cy="0" r={flower.r} fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="-3" cy="-2" r={flower.r * 0.6} fill="currentColor" fillOpacity="0.35" />
          <circle cx="3" cy="-2" r={flower.r * 0.6} fill="currentColor" fillOpacity="0.35" />
          <circle cx="0" cy="3" r={flower.r * 0.5} fill="currentColor" fillOpacity="0.3" />
          <circle cx="0" cy="0" r={flower.r * 0.3} fill="currentColor" fillOpacity="0.8" />
          {/* Hanging bud */}
          <circle cx="0" cy={flower.r + 5} r="2" fill="currentColor" fillOpacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function FloatingPetalsOverlay({ count = 8 }) {
  const petals = [
    { top: '15%', left: '8%', size: 'w-4 h-4', rotate: 'rotate-45', opacity: 'opacity-30' },
    { top: '28%', right: '10%', size: 'w-5 h-5', rotate: '-rotate-12', opacity: 'opacity-25' },
    { top: '45%', left: '5%', size: 'w-3 h-3', rotate: 'rotate-90', opacity: 'opacity-20' },
    { top: '62%', right: '7%', size: 'w-4 h-4', rotate: 'rotate-30', opacity: 'opacity-30' },
    { top: '78%', left: '12%', size: 'w-5 h-5', rotate: '-rotate-45', opacity: 'opacity-25' },
    { top: '90%', right: '15%', size: 'w-3 h-3', rotate: 'rotate-12', opacity: 'opacity-20' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {petals.slice(0, count).map((p, idx) => (
        <div
          key={idx}
          className={`absolute text-gold-dark ${p.size} ${p.rotate} ${p.opacity} transition-transform duration-1000`}
          style={{ top: p.top, left: p.left, right: p.right }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0 C6 6 4 12 10 20 C16 12 14 6 10 0 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function GrandPalaceArch({ className = "w-full text-gold" }) {
  return (
    <svg
      viewBox="0 0 800 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Majestic scalloped multi-foil Mughal arch */}
      <path
        d="M20 235 L20 120 Q20 30 180 30 Q270 30 330 65 Q400 15 470 65 Q530 30 620 30 Q780 30 780 120 L780 235"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Inner delicate scalloped cusps */}
      <path
        d="M50 235 L50 130 C50 60 150 50 240 70 C300 85 360 45 400 30 C440 45 500 85 560 70 C650 50 750 60 750 130 L750 235"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeOpacity="0.7"
      />
      {/* Central finial / kalash */}
      <circle cx="400" cy="15" r="6" fill="currentColor" fillOpacity="0.7" />
      <path d="M400 9 L400 -2" stroke="currentColor" strokeWidth="2" />
      <circle cx="400" cy="-5" r="3" fill="currentColor" />
      {/* Scallop details */}
      <circle cx="200" cy="38" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="300" cy="55" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="500" cy="55" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="600" cy="38" r="2.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function DetailedGaneshaEmblem({ className = "w-16 h-16 text-gold" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto select-none ${className}`}
    >
      {/* Sacred Ganesha Calligraphic Outline */}
      <path
        d="M50 16 Q58 10 68 12 Q78 14 78 24 Q78 35 70 40 Q64 44 61 50 Q56 62 58 74 Q60 84 50 84 Q42 84 42 75 Q42 67 48 65 Q54 63 54 55 Q54 44 44 44 Q35 44 34 33 Q33 22 45 16 Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Sacred Tilak */}
      <path d="M46 22 L54 22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 18 L50 30" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="34" r="2" fill="currentColor" />
      {/* Modak prasad symbol */}
      <circle cx="70" cy="56" r="3" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

export function LakePicholaPanorama({ className = "w-full text-gold" }) {
  return (
    <svg
      viewBox="0 0 1200 240"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Aravalli hills range in distance */}
      <path
        d="M0 160 Q180 90 380 140 Q550 80 750 150 Q920 70 1200 140 L1200 240 L0 240 Z"
        fillOpacity="0.08"
      />
      {/* Udaipur palace domes, chhatris & arches */}
      <path
        d="M100 240 L100 200 L140 200 L140 170 Q160 135 180 170 L180 200 L240 200 L240 150 Q280 90 320 150 L320 200 L380 200 L380 160 Q400 130 420 160 L420 200 L550 200 L550 140 Q600 70 650 140 L650 200 L760 200 L760 160 Q785 130 810 160 L810 200 L950 200 L950 150 Q990 90 1030 150 L1030 200 L1100 200 L1100 240 Z"
        fillOpacity="0.18"
      />
      {/* Lake Pichola water reflection ripples */}
      <path
        d="M0 215 Q150 210 300 215 Q450 220 600 215 Q750 210 900 215 Q1050 220 1200 215"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.3"
      />
      <path
        d="M40 228 Q200 224 400 228 Q600 232 800 228 Q1000 224 1160 228"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.2"
      />
    </svg>
  );
}
