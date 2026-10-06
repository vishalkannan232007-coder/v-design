import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeIn, RevealText } from '../components/AnimationComponents';

// Case study panels for A² — with real design rationale, no invented info
const caseStudyPanels = [
  {
    num: '01',
    label: 'Logo',
    desc: 'A clean, geometric wordmark built on the concept of duality and return. The A² mark balances structure with warmth — designed to feel refined and memorable for a premium gift brand.',
    aspect: 'aspect-square',
    bg: '#1a1208',
    accent: '#c9a96e',
    type: 'logo',
  },
  {
    num: '02',
    label: 'Typography',
    desc: 'A curated type system pairing a refined display face with a clean sans-serif — versatile brand communication across print, packaging and digital.',
    aspect: 'aspect-[4/3]',
    bg: '#0f0d09',
    accent: '#e5c99a',
    type: 'typography',
  },
  {
    num: '03',
    label: 'Colour System',
    desc: 'Warm gold and deep charcoal — a palette that feels premium, inviting and timeless. Designed to stand out on packaging while remaining versatile across brand applications.',
    aspect: 'aspect-[3/2]',
    bg: '#16120a',
    accent: '#c9a96e',
    type: 'colour',
  },
  {
    num: '04',
    label: 'Applications',
    desc: 'The identity applied across packaging, gift tags, stationery and digital touchpoints — cohesive and refined at every scale.',
    aspect: 'aspect-[16/9]',
    bg: '#12100a',
    accent: '#d4b27a',
    type: 'applications',
  },
];

function LogoPanel({ accent, bg }: { accent: string; bg: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: bg }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="logo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accent} strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#logo-grid)" />
      </svg>
      <div className="text-center select-none relative z-10">
        <div
          className="font-black leading-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', color: accent, letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          A<sup className="text-[0.38em] align-super leading-none">2</sup>
        </div>
        <div className="mt-4 tracking-[0.35em] text-xs font-semibold" style={{ color: accent + '60' }}>
          RETURN GIFT SHOP
        </div>
      </div>
      <div className="absolute top-6 left-6 w-14 h-14 border-t border-l opacity-15" style={{ borderColor: accent }} />
      <div className="absolute bottom-6 right-6 w-14 h-14 border-b border-r opacity-15" style={{ borderColor: accent }} />
    </div>
  );
}

function TypographyPanel({ accent, bg }: { accent: string; bg: string }) {
  return (
    <div className="absolute inset-0 flex items-start justify-start p-10 md:p-14" style={{ backgroundColor: bg }}>
      <div className="select-none w-full">
        <div className="mb-8">
          <div className="label-xs mb-3" style={{ color: accent + '50' }}>DISPLAY — HEADINGS</div>
          <div
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: accent }}
          >
            Aa Bb Cc
          </div>
        </div>
        <div className="h-px w-full opacity-15 mb-8" style={{ backgroundColor: accent }} />
        <div>
          <div className="label-xs mb-3" style={{ color: accent + '50' }}>BODY — COPY</div>
          <div
            className="font-light leading-relaxed tracking-wide"
            style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', color: accent + 'aa' }}
          >
            The quick brown fox jumps over<br />the lazy dog. Return gifts crafted<br />with care and intention.
          </div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <div
            className="font-black"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', color: accent, letterSpacing: '-0.06em', lineHeight: 1 }}
          >
            Aa
          </div>
        </div>
      </div>
    </div>
  );
}

function ColourPanel({ accent, bg }: { accent: string; bg: string }) {
  const swatches = [
    { color: '#c9a96e', name: 'Gold' },
    { color: '#e5c99a', name: 'Light Gold' },
    { color: '#1a1208', name: 'Deep Ink' },
    { color: '#f0ebe3', name: 'Cream' },
    { color: '#888888', name: 'Stone' },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: bg }}>
      <div className="flex flex-col gap-3 w-full px-8 md:px-12 select-none">
        {swatches.map((s) => (
          <div key={s.color} className="flex items-center gap-5">
            <div
              className="flex-shrink-0"
              style={{ width: 48, height: 48, backgroundColor: s.color, borderRadius: 2 }}
            />
            <div>
              <div className="text-xs font-semibold" style={{ color: accent }}>{s.name}</div>
              <div className="label-xs mt-0.5" style={{ color: accent + '50' }}>{s.color.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationsPanel({ accent, bg }: { accent: string; bg: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 md:gap-10 px-8" style={{ backgroundColor: bg }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="app-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={accent} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#app-dots)" />
      </svg>
      {/* Mocked packaging/tag items */}
      <div className="relative z-10 flex items-end gap-5 md:gap-10 select-none">
        {/* Tag */}
        <div
          className="flex flex-col items-center justify-center px-5 py-8 border"
          style={{ borderColor: accent + '30', minWidth: 80, backgroundColor: accent + '08' }}
        >
          <div className="font-black text-2xl leading-none" style={{ color: accent }}>A<sup className="text-[0.5em]">2</sup></div>
          <div className="h-px w-10 my-2 opacity-30" style={{ backgroundColor: accent }} />
          <div className="label-xs" style={{ color: accent + '60', fontSize: '0.45rem' }}>RETURN GIFT SHOP</div>
        </div>
        {/* Stationery */}
        <div
          className="flex flex-col justify-end px-6 py-6 border"
          style={{ borderColor: accent + '20', minWidth: 120, height: 160, backgroundColor: '#0a0a0a' }}
        >
          <div className="font-black text-base leading-none mb-1" style={{ color: accent }}>A<sup className="text-[0.5em]">2</sup></div>
          <div className="label-xs" style={{ color: accent + '50', fontSize: '0.4rem', letterSpacing: '0.2em' }}>RETURN GIFT SHOP</div>
          <div className="mt-4 space-y-1.5">
            {[1, 2].map(i => (
              <div key={i} className="h-px opacity-10 w-full" style={{ backgroundColor: accent }} />
            ))}
          </div>
        </div>
        {/* Box */}
        <div
          className="border flex items-center justify-center"
          style={{ width: 80, height: 80, borderColor: accent + '25', backgroundColor: accent + '12' }}
        >
          <div className="font-black text-lg" style={{ color: accent }}>A<sup className="text-[0.45em]">2</sup></div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyPanel({
  panel,
  index,
}: {
  panel: (typeof caseStudyPanels)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <FadeIn delay={index * 0.08} direction="up">
      <div ref={ref} className="group">
        {/* Panel header */}
        <div className="flex items-center gap-4 mb-5">
          <span className="label-xs text-ash/40">{panel.num}</span>
          <span className="label-xs text-cream">{panel.label.toUpperCase()}</span>
          <div className="h-px flex-1 bg-ink-border" />
        </div>

        {/* Visual area */}
        <div
          className={`relative overflow-hidden ${panel.aspect} w-full`}
          data-cursor="explore"
        >
          <motion.div style={{ y }} className="absolute inset-0">
            {panel.type === 'logo' && <LogoPanel accent={panel.accent} bg={panel.bg} />}
            {panel.type === 'typography' && <TypographyPanel accent={panel.accent} bg={panel.bg} />}
            {panel.type === 'colour' && <ColourPanel accent={panel.accent} bg={panel.bg} />}
            {panel.type === 'applications' && <ApplicationsPanel accent={panel.accent} bg={panel.bg} />}
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-ash text-sm leading-relaxed mt-5 max-w-xl">{panel.desc}</p>
      </div>
    </FadeIn>
  );
}

export function FeaturedProjectSection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border bg-ink-soft">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24">
          <div>
            <FadeIn>
              <p className="label-xs mb-4">Case Study — Branding</p>
            </FadeIn>
            <div>
              <RevealText tag="h2" className="display-lg text-cream">
                A²
              </RevealText>
              <RevealText tag="p" delay={0.15} className="display-sm text-ash mt-0">
                Return Gift Shop
              </RevealText>
            </div>
          </div>
          <FadeIn delay={0.3} direction="left" className="max-w-sm">
            <p className="text-ash text-sm leading-relaxed">
              A complete brand identity for A² — an elegant return gift shop.
              From the wordmark to the colour system, every detail crafted to feel
              premium and memorable.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Logo Design', 'Brand Identity', 'Typography', 'Colour System', 'Visual Identity'].map((tag) => (
                <span key={tag} className="label-xs border border-ink-border px-2 py-1 text-ash/50">{tag}</span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Case study panels — editorial layout */}
        <div className="space-y-24">
          {/* Full width logo */}
          <CaseStudyPanel panel={caseStudyPanels[0]} index={0} />

          {/* Two columns — typography + colour */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <CaseStudyPanel panel={caseStudyPanels[1]} index={1} />
            <CaseStudyPanel panel={caseStudyPanels[2]} index={2} />
          </div>

          {/* Full width applications */}
          <CaseStudyPanel panel={caseStudyPanels[3]} index={3} />
        </div>

        {/* Divider */}
        <FadeIn delay={0.2} className="mt-24">
          <div className="border-t border-ink-border pt-10">
            <p className="label-xs text-ash/40">A² — RETURN GIFT SHOP / BRANDING / 2024</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
