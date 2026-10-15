import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { HeroSection } from './sections/HeroSection';
import { WorkSection } from './sections/WorkSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { ProcessSection } from './sections/ProcessSection';
import { ContactSection } from './sections/ContactSection';

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

function App() {
  return (
    <div className="bg-charcoal-950 text-warm-white min-h-screen selection:bg-lime selection:text-charcoal-950 font-sans">
      {/* Precision custom cursor for fine desktop pointers */}
      <CustomCursor />

      {/* Primary Sticky Navigation */}
      <Navigation />

      {/* Full-page guided experience */}
      <main>
        {/* CHAPTER 01 — THE OPENING (Hero) */}
        <HeroSection />

        {/* Studio Disciplines Kinetic Transition */}
        <Marquee items={showreelTicker} speed={24} />

        {/* CHAPTER 02 — THE WORK (Selected Portfolio) */}
        <WorkSection />

        {/* CHAPTER 03 — WHAT WE CREATE (Services) */}
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
    </div>
  );
}

export default App;
