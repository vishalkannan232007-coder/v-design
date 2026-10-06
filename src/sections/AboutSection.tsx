import { FadeIn, StaggerReveal } from '../components/AnimationComponents';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border bg-ink-soft"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left column */}
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="label-xs mb-8">04 — About</p>
            </FadeIn>
            <StaggerReveal staggerDelay={0.09}>
              <h2 className="display-md text-cream">DESIGN IS MORE</h2>
              <h2 className="display-md text-cream">THAN MAKING</h2>
              <h2 className="display-md text-gold">THINGS LOOK GOOD.</h2>
            </StaggerReveal>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 lg:pt-24">
            <FadeIn delay={0.3} direction="up">
              <p className="text-ash leading-relaxed text-base md:text-lg mb-10">
                V DESIGN is an independent creative design studio focused on visual
                identities, digital experiences and motion-driven content.
              </p>

              {/* Approach */}
              <div className="space-y-0">
                <p className="label-xs mb-5 text-cream/40">THE APPROACH</p>
                {[
                  'Understand the idea.',
                  'Build the visual language.',
                  'Create something people remember.',
                ].map((step, i) => (
                  <FadeIn key={i} delay={0.4 + i * 0.1} direction="up">
                    <div className="flex items-start gap-5 border-b border-ink-border py-5">
                      <span className="label-xs text-ash/35 mt-0.5 flex-shrink-0">
                        0{i + 1}
                      </span>
                      <p className="text-cream text-sm md:text-base font-medium">{step}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Decorative large text */}
        <div className="mt-20 overflow-hidden" aria-hidden="true">
          <p
            className="font-black tracking-tighter text-ink-mid leading-none select-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 12rem)' }}
          >
            V DESIGN
          </p>
        </div>
      </div>
    </section>
  );
}
