'use client';

// Bespoke, intricately illustrated vector assets for traditional Indian wedding stationery
export function PalaceArchMotif({ className = "w-full h-32 text-gold" }) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      stroke="currentColor"
      className={`mx-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer scalloped multi-foil arch */}
      <path
        d="M20 115 L20 60 Q20 15 100 15 Q140 15 170 30 Q200 8 230 30 Q260 15 300 15 Q380 15 380 60 L380 115"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Delicate inner scalloped cusps */}
      <path
        d="M40 115 L40 68 C40 32 90 28 130 38 C160 46 185 28 200 20 C215 28 240 46 270 38 C310 28 360 32 360 68 L360 115"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.75"
      />
      {/* Central kalash finial */}
      <circle cx="200" cy="8" r="4" fill="currentColor" />
      <path d="M200 4 L200 -2" strokeWidth="1.5" />
      <circle cx="200" cy="-4" r="2" fill="currentColor" />
      {/* Delicate hanging pearls / beads */}
      <circle cx="100" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="150" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="250" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="300" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function LotusBotanicalIllustration({ className = "w-20 h-16 text-gold" }) {
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      stroke="currentColor"
      className={`mx-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central bud petal */}
      <path
        d="M50 10 C46 25 45 42 50 55 C55 42 54 25 50 10 Z"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Inner left & right petals */}
      <path
        d="M50 55 C42 42 35 24 40 16 C48 24 49 42 50 55 Z"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M50 55 C58 42 65 24 60 16 C52 24 51 42 50 55 Z"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Flared outer petals */}
      <path
        d="M50 55 C34 48 22 36 28 26 C38 34 44 48 50 55 Z"
        strokeWidth="1.2"
      />
      <path
        d="M50 55 C66 48 78 36 72 26 C62 34 56 48 50 55 Z"
        strokeWidth="1.2"
      />
      {/* Base water ripple / pedestal */}
      <path
        d="M26 58 Q50 64 74 58"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M34 63 Q50 68 66 63"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function MarigoldGarlandBorder({ className = "w-full h-8 text-gold/70" }) {
  return (
    <svg
      viewBox="0 0 400 30"
      fill="currentColor"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Continuous string */}
      <path
        d="M0 15 Q25 22 50 15 Q75 22 100 15 Q125 22 150 15 Q175 22 200 15 Q225 22 250 15 Q275 22 300 15 Q325 22 350 15 Q375 22 400 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Hanging blossoms */}
      {[25, 75, 125, 175, 225, 275, 325, 375].map((x, i) => (
        <g key={i} transform={`translate(${x}, 18)`}>
          <circle cx="0" cy="0" r="3.5" opacity="0.85" />
          <circle cx="-2.5" cy="-1.5" r="2" opacity="0.7" />
          <circle cx="2.5" cy="-1.5" r="2" opacity="0.7" />
          <circle cx="0" cy="3" r="1.8" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function HeritagePalaceSilhouette({ className = "w-full h-24 text-gold/40" }) {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="currentColor"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Udaipur Lake Palace / Jagmandir domes & jharokhas silhouette */}
      <path
        d="M0 100 L0 85 L30 85 L30 65 Q45 40 60 65 L60 85 L90 85 L90 55 Q110 30 130 55 L130 85 L180 85 L180 45 Q210 10 240 45 L240 85 L260 85 L260 45 Q290 10 320 45 L320 85 L370 85 L370 55 Q390 30 410 55 L410 85 L440 85 L440 65 Q455 40 470 65 L470 85 L500 85 L500 100 Z"
        opacity="0.35"
      />
      {/* Central Grand Chhatri Finial */}
      <path d="M250 15 L250 5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="250" cy="4" r="2" />
      {/* Lake water ripples below */}
      <path
        d="M20 95 Q60 92 100 95 Q140 98 180 95 Q220 92 260 95 Q300 98 340 95 Q380 92 420 95 Q460 98 490 95"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

export function GaneshaEmblem({ className = "w-14 h-14 text-gold" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      className={`mx-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Traditional artistic line art of Lord Ganesha */}
      {/* Trunk and head gesture */}
      <path
        d="M50 18 Q55 12 65 14 Q74 16 75 25 Q76 34 70 38 Q65 42 62 48 Q58 58 60 70 Q62 82 50 82 Q42 82 42 74 Q42 66 48 64 Q54 62 54 55 Q54 45 44 45 Q36 45 35 35 Q34 25 44 18 Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Sacred Tilak / Trishul mark */}
      <path d="M48 24 L52 24" strokeWidth="1.2" />
      <path d="M50 20 L50 32" strokeWidth="1.2" />
      <circle cx="50" cy="35" r="1.5" fill="currentColor" />
      {/* Modak prasad symbol */}
      <circle cx="68" cy="55" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function OrnateCornerFlourish({ position = "tl", className = "w-10 h-10 text-gold/60" }) {
  const transform = {
    tl: "",
    tr: "scale-x-[-1]",
    br: "scale-[-1]",
    bl: "scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      className={`pointer-events-none select-none ${transform} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 47 L3 12 Q3 3 12 3 L47 3" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9 47 L9 16 Q9 9 16 9 L47 9" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="9" cy="9" r="2.5" fill="currentColor" opacity="0.8" />
      <path d="M16 16 Q24 16 24 24 Q24 16 32 16" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}
