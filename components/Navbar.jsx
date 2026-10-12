'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, Heart } from 'lucide-react';

export default function Navbar({ onReopenEnvelope }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Invitation", href: "#invitation" },
    { label: "Our Story", href: "#story" },
    { label: "Celebrations", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Destination", href: "#venues" },
    { label: "Blessings", href: "#wishes" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold/20'
            : 'bg-gradient-to-b from-[#1C1816]/60 via-[#1C1816]/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aria and Kabir Wedding Home"
          >
            <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-serif italic text-base transition-colors ${
              isScrolled
                ? 'border-gold text-gold-dark bg-ivory-100'
                : 'border-white/50 text-white bg-black/20 backdrop-blur-sm'
            }`}>
              A&amp;K
            </div>
            <div className="flex flex-col">
              <span className={`font-serif tracking-widest text-sm uppercase font-normal transition-colors ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}>
                Aria &amp; Kabir
              </span>
              <span className={`text-[10px] tracking-mega-lux uppercase font-sans transition-colors ${
                isScrolled ? 'text-gold-dark' : 'text-ivory-200/90'
              }`}>
                Udaipur 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-sans font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-all duration-200 relative py-1 hover:text-gold ${
                  isScrolled ? 'text-taupe-700' : 'text-ivory-100 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Envelope Reopen & RSVP */}
          <div className="hidden sm:flex items-center gap-3">
            {onReopenEnvelope && (
              <button
                onClick={onReopenEnvelope}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider border transition-colors ${
                  isScrolled
                    ? 'border-taupe-300 text-taupe-600 hover:border-gold hover:text-charcoal'
                    : 'border-white/30 text-white/90 hover:bg-white/10'
                }`}
                title="View wax sealed envelope"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Envelope</span>
              </button>
            )}

            <a
              href="#rsvp"
              className="px-5 py-2 rounded-full text-xs font-sans uppercase tracking-widest font-medium bg-gradient-to-r from-gold via-gold-dark to-gold text-white shadow-sm hover:shadow-soft-glow transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              RSVP Now
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#rsvp"
              className="px-3.5 py-1.5 rounded-full text-[11px] font-sans uppercase tracking-widest font-medium bg-gold text-white"
            >
              RSVP
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#1E1917]/95 backdrop-blur-xl flex flex-col justify-center items-center px-8 lg:hidden animate-fadeIn">
          <div className="font-serif text-3xl text-ivory-100 tracking-wider mb-2">
            Aria &amp; Kabir
          </div>
          <p className="text-xs uppercase tracking-mega-lux text-gold mb-10 font-sans">
            18 – 20 December 2026 • Udaipur
          </p>

          <nav className="flex flex-col items-center gap-6 text-sm uppercase tracking-widest-lux font-sans text-ivory-100 font-light">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-4 w-full max-w-xs">
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-xs font-sans uppercase tracking-widest font-medium bg-gold text-white shadow-soft-glow"
            >
              Confirm Attendance (RSVP)
            </a>

            {onReopenEnvelope && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenEnvelope();
                }}
                className="w-full text-center py-3 rounded-full text-xs font-sans uppercase tracking-widest border border-white/20 text-white/80"
              >
                View Envelope
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
