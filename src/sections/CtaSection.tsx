import { motion } from 'framer-motion';
import { FadeIn } from '../components/AnimationComponents';
import { ArrowUpRight } from 'lucide-react';

const WHATSAPP_URL = `https://wa.me/919585057340?text=Hi%20V%20DESIGN%2C%20I%20have%20a%20project%20in%20mind.`;
const EMAIL = 'vishalkannan232007@gmail.com';

export function CtaSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border bg-ink-soft overflow-hidden relative">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span
          className="font-black tracking-tighter text-ink-mid leading-none select-none opacity-60"
          style={{ fontSize: 'clamp(5rem, 18vw, 20rem)', letterSpacing: '-0.06em' }}
        >
          V DESIGN
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="label-xs mb-8">08 — Start a Project</p>
          </FadeIn>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="display-xl text-cream leading-none mb-3"
          >
            HAVE AN IDEA?
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="display-xl leading-none mb-16"
            style={{ WebkitTextStroke: '1px #c9a96e', color: 'transparent' }}
          >
            LET'S MAKE IT VISIBLE.
          </motion.h2>

          <FadeIn delay={0.3} direction="up">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary"
                data-cursor="open"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                data-cursor="open"
              >
                <span>WhatsApp ↗</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-outline"
                data-cursor="open"
              >
                <span>Email ↗</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
