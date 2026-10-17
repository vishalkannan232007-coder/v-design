import { useCallback, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { IntroReveal } from './components/IntroReveal';
import { HeroSection } from './sections/HeroSection';
import { WorkSection } from './sections/WorkSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { ProcessSection } from './sections/ProcessSection';
import { ContactSection } from './sections/ContactSection';

const INTRO_SESSION_KEY = 'vdesign:intro-played';

const showreelTicker = [
  'BRAND IDENTITY',
  'WEBSITE & UI/UX',
  'CINEMATIC VIDEO',
  'MOTION GRAPHICS',
  'SOCIAL CREATIVES',
  'LOGO DESIGN',
  'INDEPENDENT BY DESIGN',
  'WE DESIGN IDENTITIES',
];

/** The intro plays once per browser session; never blocks on repeat visits. */
function hasIntroPlayed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function App() {
  const [introVisible, setIntroVisible] = useState(() => !hasIntroPlayed());
  const [revealed, setRevealed] = useState(() => hasIntroPlayed());

  const handleIntroReveal = useCallback(() => setRevealed(true), []);

  const handleIntroDone = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      /* sessionStorage unavailable — intro will simply replay next load */
    }
    setIntroVisible(false);
  }, []);

  return (
    <div className="bg-charcoal-950 text-warm-white min-h-screen selection:bg-lime selection:text-charcoal-950 font-sans">
      {/* Precision custom cursor for fine desktop pointers */}
      <CustomCursor />

      {/* Primary Sticky Navigation — reveals with the opening sequence */}
      <Navigation revealed={revealed} />

      {/* Full-page guided experience */}
      <main>
        {/* CHAPTER 01 — THE OPENING (Cinematic Hero) */}
        <HeroSection started={revealed} />

        {/* Studio Disciplines Kinetic Transition */}
        <Marquee items={showreelTicker} speed={24} />

        {/* CHAPTER 02 — THE WORK (Selected Portfolio) */}
        <WorkSection />

        {/* CHAPTER 03 — SERVICES */}
        <ServicesSection />

        {/* CHAPTER 04 — THE STUDIO (About) */}
        <AboutSection />

        {/* PHILOSOPHY — Great Design is Remembered */}
        <PhilosophySection />

        {/* PROCESS — Four Stages */}
        <ProcessSection />

        {/* CHAPTER 05 — LET'S BUILD SOMETHING DISTINCTIVE (Contact) */}
        <ContactSection />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Cinematic intro — logo reveal that hands off to the hero */}
      {introVisible && <IntroReveal onReveal={handleIntroReveal} onDone={handleIntroDone} />}
    </div>
  );
}

export default App;

