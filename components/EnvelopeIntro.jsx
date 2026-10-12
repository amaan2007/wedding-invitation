'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { JharokhaArch, FloralDivider } from './Ornaments';

export default function EnvelopeIntro({ isOpen, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1917]/95 backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle warm palace candlelight vignette background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,168,128,0.12)_0%,rgba(20,16,14,0.95)_75%)] pointer-events-none" />

          {/* Floating delicate golden dust particles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* Envelope Card Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-auto"
          >
            {/* The Outer Luxury Envelope */}
            <div className="relative bg-[#FAF7EE] border border-[#DFC49B]/60 rounded-sm shadow-envelope p-8 md:p-12 overflow-hidden text-center">
              {/* Inner vintage gold border */}
              <div className="absolute inset-2 md:inset-3 border border-[#C5A880]/30 pointer-events-none" />
              <div className="absolute inset-3 md:inset-4 border border-dashed border-[#C5A880]/20 pointer-events-none" />

              {/* Top Arch Motif */}
              <div className="mb-2 opacity-80">
                <JharokhaArch className="w-48 h-16 text-gold" />
              </div>

              {/* Sanskrit Blessing Header */}
              <p className="text-xs uppercase tracking-mega-lux text-taupe-500 font-sans mb-3">
                ॥ श्री गणेशाय नमः ॥
              </p>

              <h2 className="font-serif text-xs md:text-sm tracking-widest-lux uppercase text-gold-dark font-medium mb-1">
                A Royal Destination Wedding
              </h2>

              {/* Couple Name Crest */}
              <div className="my-6">
                <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal tracking-wide">
                  Aria <span className="font-script text-4xl md:text-5xl text-gold mx-1 font-normal">&amp;</span> Kabir
                </h1>
                <p className="font-serif italic text-sm text-taupe-600 mt-2">
                  December 18 – 20, 2026 • Udaipur, Rajasthan
                </p>
              </div>

              <FloralDivider className="w-36 h-4 my-4 mx-auto text-gold/80" />

              <p className="text-xs md:text-sm font-sans text-taupe-600 leading-relaxed max-w-sm mx-auto mb-8 font-light">
                Together with their families, cordially invite you to celebrate the joyous union of their souls in the City of Lakes.
              </p>

              {/* The Wax Seal Button */}
              <div className="flex flex-col items-center justify-center pt-2 pb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative cursor-pointer focus:outline-none flex flex-col items-center"
                  aria-label="Unseal invitation"
                >
                  {/* Wax Seal Disk */}
                  <motion.div
                    animate={isOpening ? { rotate: [0, -10, 15, -5, 0], scale: [1, 1.15, 0] } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8C3542] via-[#6B202D] to-[#4E141E] p-1 shadow-2xl border-2 border-[#DFC49B]/50 flex items-center justify-center relative shadow-[#6B202D]/40"
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.3),transparent_60%)]" />
                    <div className="w-20 h-20 rounded-full border border-dashed border-[#DFC49B]/60 flex flex-col items-center justify-center bg-[#541620]/90 text-center">
                      <span className="text-[9px] tracking-widest text-[#E8DCB8] uppercase font-sans">Royal Seal</span>
                      <span className="font-serif text-2xl font-light text-[#FAF6F0] tracking-wider my-[-2px]">
                        A&thinsp;&amp;&thinsp;K
                      </span>
                      <span className="text-[8px] tracking-widest text-[#E8DCB8]/80 font-sans">UDAIPUR</span>
                    </div>
                  </motion.div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-taupe-600 group-hover:text-gold-dark transition-colors">
                    <span>{isOpening ? "Unfolding Ceremony..." : "Touch to Unseal"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </div>

              {/* Direct Skip text button */}
              <button
                onClick={handleOpen}
                className="mt-4 text-[11px] font-sans tracking-widest uppercase text-taupe-400 hover:text-gold underline underline-offset-4 transition-colors"
              >
                Skip intro to invitation
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
