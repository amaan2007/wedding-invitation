'use client';

// Delicate vector ornaments for luxury wedding invitation
export function FloralDivider({ className = "w-48 h-6 text-gold" }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-gold/60" />
      <svg
        viewBox="0 0 40 20"
        fill="currentColor"
        className="w-8 h-4 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 3C17.5 7 13 9 9 9C13 11 17.5 13 20 17C22.5 13 27 11 31 9C27 9 22.5 7 20 3Z" />
        <circle cx="20" cy="10" r="2" fill="currentColor" />
        <circle cx="7" cy="9" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="33" cy="9" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
      <span className="h-[1px] w-16 bg-gradient-to-l from-transparent via-gold to-gold/60" />
    </div>
  );
}

export function JharokhaArch({ className = "w-64 h-24 text-gold/70" }) {
  return (
    <div className={`mx-auto flex justify-center ${className}`}>
      <svg
        viewBox="0 0 300 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer regal scalloped arch */}
        <path
          d="M10 95 L10 50 Q10 10 75 10 Q110 10 150 2 C190 10 225 10 225 10 Q290 10 290 50 L290 95"
          strokeLinecap="round"
        />
        {/* Inner delicate arch */}
        <path
          d="M25 95 L25 55 Q25 22 80 22 Q115 22 150 16 Q185 22 220 22 Q275 22 275 55 L275 95"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        {/* Central finial / kalash */}
        <circle cx="150" cy="2" r="3" fill="currentColor" />
        <path d="M150 2 L150 -5" strokeWidth="1.5" />
        <circle cx="150" cy="-6" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function CornerFlourish({ position = "top-left", className = "w-12 h-12 text-gold/40" }) {
  const rotationClass = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <div className={`pointer-events-none select-none ${rotationClass} ${className}`}>
      <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <path d="M4 56 L4 12 Q4 4 12 4 L56 4" strokeLinecap="round" />
        <path d="M12 56 L12 18 Q12 12 18 12 L56 12" strokeDasharray="1.5 2" opacity="0.6" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8" />
        <circle cx="4" cy="4" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function RoyalMonogram({ size = "md", className = "" }) {
  const dimensions = {
    sm: "w-12 h-12 text-sm",
    md: "w-20 h-20 text-xl",
    lg: "w-28 h-28 text-3xl",
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      <div className="absolute inset-0 rounded-full border border-gold/40" />
      <div className="absolute inset-1 rounded-full border border-dashed border-gold/30" />
      <span className="font-serif italic font-light tracking-widest text-gold text-center">
        A&thinsp;&amp;&thinsp;K
      </span>
    </div>
  );
}

export function WaxSealBadge({ onClick, isOpened = false }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
      aria-label="Open wedding invitation"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8C3542] via-[#6B202D] to-[#4E141E] p-1 shadow-envelope border border-[#DFC49B]/40 flex items-center justify-center relative overflow-hidden">
        {/* Subtle wax melted rim texture */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="w-20 h-20 rounded-full border border-dashed border-[#DFC49B]/50 flex flex-col items-center justify-center p-2 text-center bg-[#5E1B26]/80 backdrop-blur-sm shadow-inner">
          <span className="text-[10px] tracking-widest text-[#E8DCB8] uppercase font-sans font-medium">Udaipur</span>
          <span className="font-serif text-2xl font-normal text-[#FAF6F0] tracking-wider my-[-2px]">A &amp; K</span>
          <span className="text-[9px] tracking-widest text-[#E8DCB8]/90 font-sans">2026</span>
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-widest uppercase font-sans text-taupe-500 group-hover:text-gold transition-colors">
        {isOpened ? "View Seal" : "Touch to Open"}
      </div>
    </button>
  );
}
