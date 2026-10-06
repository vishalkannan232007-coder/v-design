import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { HeroSection } from './sections/HeroSection';
import { IntroSection } from './sections/IntroSection';
import { WorkSection } from './sections/WorkSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { ProcessSection } from './sections/ProcessSection';
import { CapabilitiesSection } from './sections/CapabilitiesSection';
import { CtaSection } from './sections/CtaSection';
import { ContactSection } from './sections/ContactSection';

const marqueeItems = [
  'Logo Design',
  'Brand Identity',
  'Web Design',
  'UI/UX',
  'Video Editing',
  'Motion Design',
  'Art Direction',
  'Visual Identity',
  'Colour Systems',
  'Typography',
];

function App() {
  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />

        {/* Marquee strip between Hero and Intro */}
        <div className="border-t border-b border-ink-border py-4 overflow-hidden bg-[#0d0d0d]">
          <Marquee items={marqueeItems} speed={45} />
        </div>

        <IntroSection />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <CapabilitiesSection />
        <CtaSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
