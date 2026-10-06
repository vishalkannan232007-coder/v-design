import { FadeIn, StaggerReveal } from '../components/AnimationComponents';

export function IntroSection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          {/* Number */}
          <FadeIn className="lg:col-span-2" delay={0}>
            <span className="label-xs">02</span>
          </FadeIn>

          {/* Main statement */}
          <div className="lg:col-span-7">
            <StaggerReveal staggerDelay={0.1}>
              <h2 className="display-md text-cream">ONE STUDIO.</h2>
              <h2 className="display-md text-cream">THREE CREATIVE</h2>
              <h2 className="display-md text-gold">DISCIPLINES.</h2>
              <h2 className="display-md text-cream">COUNTLESS WAYS</h2>
              <h2 className="display-md text-cream">TO MAKE AN IDEA</h2>
              <h2 className="display-md text-cream">VISIBLE.</h2>
            </StaggerReveal>
          </div>

          {/* Body copy */}
          <div className="lg:col-span-3 lg:pt-4">
            <FadeIn delay={0.3} direction="up">
              <p className="text-ash leading-relaxed text-sm md:text-base">
                V DESIGN combines branding, digital design and motion to create visual
                experiences that are distinctive, useful and memorable.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { num: '01', label: 'Branding' },
                  { num: '02', label: 'Digital' },
                  { num: '03', label: 'Motion' },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-4 border-b border-ink-border pb-3">
                    <span className="label-xs text-ash/50">{item.num}</span>
                    <span className="text-cream text-sm font-medium tracking-widest uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
