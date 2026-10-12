'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Download, Navigation } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function EventCard({ event }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      },
    });
  }, []);

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invifest Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Meenal & Avinash: ${event.title}`,
      `DESCRIPTION:${event.tagline}. Dress code: ${event.dresscode?.names || 'Festive Indian'}`,
      `LOCATION:${event.venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="event-block" ref={cardRef} style={{ marginBottom: '5rem' }}>
      {/* Expanded Luxury Event Card Frame */}
      <div className="event-invite-frame">
        <img className="event-invite-bg" src={event.bg} alt={event.title} loading="lazy" />
        <div className="event-invite-overlay">
          <div className="event-invite-stack">
            <h3 className={`event-invite-title ${event.dark ? 'dark-text' : ''}`}>
              {event.title}
            </h3>
            <div className={`event-date-row ${event.dark ? 'dark-text' : ''}`}>
              <span>{event.date.day}</span>
              <span className="event-date-bar">|</span>
              <span className="event-date-num">{event.date.num}</span>
              <span className="event-date-bar">|</span>
              <span>{event.date.monthYear}</span>
            </div>
            <div className={`event-invite-time ${event.dark ? 'dark-text' : ''}`}>
              {event.time}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Beneath Frame */}
      <div className="evt-details" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
        <p className="evt-tagline">"{event.tagline}"</p>

        {event.dresscode && (
          <div className="evt-dresscode" style={{ marginTop: '1.2rem', marginBottom: '1.2rem' }}>
            <span className="evt-dresscode-lbl">Dress code</span>
            <div className="evt-dresscode-dots" style={{ justifyContent: 'center' }}>
              {event.dresscode.colors.map((col, idx) => (
                <span key={idx} className="evt-dresscode-dot" style={{ background: col }} />
              ))}
            </div>
            <span className="evt-dresscode-names">{event.dresscode.names}</span>
            <span className="evt-dresscode-note">{event.dresscode.note}</span>
          </div>
        )}

        <div className="evt-venue" style={{ marginTop: '1rem' }}>
          <span className="evt-venue-name">{event.venue}</span>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginTop: '1rem' }}>
            {/* Directions Button */}
            {event.mapQuery && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="evt-dir-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>
            )}

            {/* Creative Calendar Button */}
            <button
              onClick={downloadIcs}
              className="evt-dir-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--cream-2)',
                color: 'var(--sage-deep)',
                border: '1px solid var(--border)',
              }}
            >
              <Download className="w-4 h-4 text-gold" />
              <span>CALENDAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const events = [
    {
      title: 'Sangeet Night',
      bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/sangeet/22.png',
      date: { day: 'Tuesday', num: '30', monthYear: 'Jun 2026' },
      time: '7:00 PM',
      dark: true,
      tagline: 'An evening of music, dance, and endless celebration.',
      dresscode: {
        colors: ['rgb(138, 79, 76)', 'rgb(212, 175, 55)', 'rgb(245, 236, 212)'],
        names: 'Maroon · Gold · Cream',
        note: 'Traditional Indian/Indo-Western',
      },
      venue: 'Accord Wildlife Pench Resort · Grand Courtyard',
      mapQuery: 'Accord Wildlife Pench Resort',
    },
    {
      title: 'Carnival',
      bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/carnival/37.png',
      date: { day: 'Wednesday', num: '1', monthYear: 'Jul 2026' },
      time: '11:00 AM',
      dark: false,
      tagline: 'A vibrant celebration of colours, laughter, and joy.',
      dresscode: {
        colors: ['rgb(245, 190, 75)', 'rgb(235, 120, 110)', 'rgb(255, 255, 255)'],
        names: 'Yellow · Coral · White',
        note: 'Sundowner Chic / Summer Linens',
      },
      venue: 'Accord Wildlife Pench Resort · Poolside Lawns',
      mapQuery: 'Accord Wildlife Pench Resort',
    },
    {
      title: 'Phere',
      bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/phere/44.png',
      date: { day: 'Wednesday', num: '1', monthYear: 'Jul 2026' },
      time: '9:00 PM',
      dark: false,
      tagline: 'The sacred vows to begin our forever.',
      dresscode: {
        colors: ['rgb(138, 32, 48)', 'rgb(212, 175, 55)', 'rgb(242, 234, 225)'],
        names: 'Maroon · Gold · Ivory',
        note: 'Traditional Indian — sarees, lehengas, sherwanis',
      },
      venue: 'Accord Wildlife Pench Resort · Royal Mandap',
      mapQuery: 'Accord Wildlife Pench Resort',
    },
    {
      title: 'Reception',
      bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/reception/29.png',
      date: { day: 'Wednesday', num: '1', monthYear: 'Jul 2026' },
      time: '7:00 PM',
      dark: true,
      tagline: 'Family, love, and shaadi — full filmy package!',
      dresscode: {
        colors: ['rgb(26, 42, 74)', 'rgb(212, 175, 55)'],
        names: 'Navy · Gold',
        note: 'Cocktail formal',
      },
      venue: 'Accord Wildlife Pench Resort · Grand Banquet',
      mapQuery: 'Accord Wildlife Pench Resort',
    },
    {
      title: 'After Party',
      bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/afterparty/65.png',
      date: { day: 'Tuesday', num: '30', monthYear: 'Jun 2026' },
      time: '11:30 PM',
      dark: true,
      tagline: 'Let your hair down and party till the stars fade.',
      dresscode: {
        colors: ['rgb(30, 20, 25)', 'rgb(212, 175, 55)'],
        names: 'Glam · Shimmer',
        note: 'Cocktail chic',
      },
      venue: 'Accord Wildlife Pench Resort · The Lounge',
      mapQuery: 'Accord Wildlife Pench Resort',
    },
  ];

  return (
    <section id="events-section" style={{ textAlign: 'center', padding: '5rem 1.5rem', background: 'var(--cream)' }}>
      <span className="scratch-title-sub" style={{ color: '#c9a270', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        The Celebrations Unfold
      </span>
      <h2 className="scratch-title" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', marginBottom: 0 }}>
        Festivities
      </h2>

      <div className="events-stack" style={{ marginTop: '3.5rem' }}>
        {events.map((evt, idx) => (
          <EventCard key={idx} event={evt} />
        ))}
      </div>
    </section>
  );
}
