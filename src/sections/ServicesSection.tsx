import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, RevealText } from '../components/AnimationComponents';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'BRAND IDENTITY',
    subtitle: 'Logo Design & Visual Identity',
    description:
      'A great brand is more than a logo. We build complete visual identities that communicate who you are — clearly, distinctively and memorably.',
    items: [
      'Logo Design',
      'Brand Identity',
      'Visual Identity',
      'Typography',
      'Colour Systems',
      'Social Media Branding',
    ],
    accentColor: '#c9a96e',
  },
  {
    num: '02',
    title: 'WEB DESIGN & UI/UX',
    subtitle: 'Digital Interfaces & Experiences',
    description:
      'Digital experiences built with clarity and craft. From portfolio sites to landing pages — designed to engage, convert and impress.',
    items: [
      'Web Design',
      'UI/UX Design',
      'Landing Pages',
      'Business Websites',
      'Portfolio Websites',
      'Responsive Interfaces',
    ],
    accentColor: '#6e9bc9',
  },
  {
    num: '03',
    title: 'VIDEO EDITING & MOTION DESIGN',
    subtitle: 'Cinematic Motion & Visual Stories',
    description:
      'Moving images that hold attention. Cinematic reels, motion graphics and video content crafted for modern audiences.',
    items: [
      'Video Editing',
      'Cinematic Reels',
      'Social Media Videos',
      'Motion Graphics',
      'Typography Animation',
      'Transitions',
      'Colour Grading',
      'Visual Effects',
    ],
    accentColor: '#9b6ec9',
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <FadeIn>
              <p className="label-xs mb-4">03 — Services</p>
            </FadeIn>
            <RevealText tag="h2" className="display-lg text-cream">
              WHAT WE CREATE
            </RevealText>
          </div>
          <FadeIn delay={0.2} direction="left" className="max-w-xs">
            <p className="text-ash text-sm leading-relaxed">
              Three creative disciplines working together to make your idea visible.
            </p>
          </FadeIn>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <FadeIn key={service.num} delay={i * 0.1} direction="up">
              <div
                className="group border-t border-ink-border py-10 cursor-pointer"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                data-cursor="open"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                  {/* Number */}
                  <div className="lg:w-16 flex-shrink-0">
                    <span className="label-xs text-ash/40">{service.num}</span>
                  </div>

                  {/* Title block */}
                  <div className="lg:w-72 flex-shrink-0">
                    <motion.h3
                      animate={{ color: activeService === i ? service.accentColor : '#f0ebe3' }}
                      transition={{ duration: 0.3 }}
                      className="display-sm font-black"
                    >
                      {service.title}
                    </motion.h3>
                    <p className="text-ash text-xs mt-1.5 tracking-widest uppercase font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description + items */}
                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {activeService === i ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="text-ash text-sm leading-relaxed mb-6 max-w-lg">
                            {service.description}
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {service.items.map((item) => (
                              <li
                                key={item}
                                className="label-xs border px-3 py-1.5"
                                style={{
                                  borderColor: service.accentColor + '35',
                                  color: service.accentColor + 'aa',
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-ash text-sm leading-relaxed max-w-lg"
                        >
                          {service.items.join(' · ')}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={
                      activeService === i
                        ? { x: 5, y: -5, color: service.accentColor }
                        : { x: 0, y: 0, color: '#444' }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 self-start mt-1"
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-ink-border" />
        </div>
      </div>
    </section>
  );
}
