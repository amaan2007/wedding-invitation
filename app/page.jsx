'use client';

import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PetalsCanvas from '@/components/invifest/PetalsCanvas';
import IntroGate from '@/components/invifest/IntroGate';
import AudioController from '@/components/invifest/AudioController';
import HeroCard from '@/components/invifest/HeroCard';
import ScratchSection from '@/components/invifest/ScratchSection';
import CountdownTimer from '@/components/invifest/CountdownTimer';
import StoryStack from '@/components/invifest/StoryStack';
import EventsSection from '@/components/invifest/EventsSection';
import RsvpSection from '@/components/invifest/RsvpSection';
import VenueSection from '@/components/invifest/VenueSection';
import FooterSection from '@/components/invifest/FooterSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initial load check
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpened]);

  // Handle Opening Intro Gate
  const handleOpen = useCallback(() => {
    setIsOpened(true);
    document.body.classList.remove('no-scroll');

    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.classList.add('visible');
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 200);
  }, []);

  // Handle Scratch Card Unlock
  const handleScratchComplete = useCallback(() => {
    setIsUnlocked(true);

    setTimeout(() => {
      ScrollTrigger.refresh();
      window.scrollBy({
        top: window.innerHeight * 0.35,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  return (
    <>
      {/* Background Music Audio Controller */}
      <AudioController />

      {/* Floating Canvas Rose & Gold Petals Simulation */}
      <PetalsCanvas />

      {/* Intro Cover / Portal Video Gate */}
      {!isOpened && <IntroGate onOpen={handleOpen} />}

      {/* Main Wedding Invitation Content */}
      <div id="main-content" className={isOpened ? 'visible' : ''}>
        {/* Expanded Hero Card */}
        <HeroCard />

        {/* Interactive Scratch-to-Reveal Card (Save the Date) */}
        <ScratchSection onComplete={handleScratchComplete} />

        {/* Unlocked Wedding World */}
        {isUnlocked && (
          <div className="locked-content unlocked">
            {/* Countdown Timer */}
            <CountdownTimer />

            {/* Polaroid Story Stack ("Forever Us") */}
            <StoryStack />

            {/* Expanded Multi-Day Event Cards with Dresscodes & Directions */}
            <EventsSection />

            {/* Interactive RSVP Form with Live iTunes Song Request */}
            <RsvpSection />

            {/* Venue Guide & Directions */}
            <VenueSection />

            {/* Emotional Closing Footer */}
            <FooterSection />
          </div>
        )}
      </div>
    </>
  );
}
