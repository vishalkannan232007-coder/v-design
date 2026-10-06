import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { FadeIn, RevealText } from '../components/AnimationComponents';
import { ArrowUpRight } from 'lucide-react';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function WorkSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="py-28 md:py-40 px-6 md:px-12 lg:px-16 border-t border-ink-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28 border-b border-ink-border pb-12">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <p className="label-xs text-gold tracking-[0.3em]">02 — SELECTED CLIENT WORK</p>
              </div>
            </FadeIn>
            <div className="overflow-hidden">
              <RevealText tag="h2" className="display-lg text-cream tracking-tight">
                REAL PROJECTS
              </RevealText>
            </div>
          </div>

          <FadeIn delay={0.2} direction="left" className="max-w-md">
            <p className="text-ash text-sm md:text-base leading-relaxed">
              Four real brand identities crafted with precision — complete visual marks, custom typography, and bespoke identity systems.
            </p>
          </FadeIn>
        </div>

        {/* Editorial Project Showcase */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="view"
              >
                {/* Editorial Top Line */}
                <div className="flex items-center justify-between border-b border-ink-border pb-4 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-gold font-mono text-sm tracking-widest">
                      {project.number}
                    </span>
                    <span className="h-px w-8 bg-ink-border" />
                    <span className="label-xs text-cream/70 tracking-[0.25em]">
                      {project.subtitle}
                    </span>
                  </div>
                  <span className="label-xs text-ash/50 tracking-[0.2em] uppercase hidden sm:inline">
                    {project.category} · {project.year}
                  </span>
                </div>

                {/* Main Content Grid: Image + Editorial Details */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Real Project Image Gallery Matte */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:col-start-1' : 'lg:col-start-6'
                    }`}
                  >
                    <div className="relative overflow-hidden bg-[#121212] border border-ink-border transition-colors duration-500 group-hover:border-gold/40">
                      {/* Subtle ambient backing for dark-room studio presentation */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-700 group-hover:opacity-35"
                        style={{
                          background: `radial-gradient(circle at center, ${project.accentColor} 0%, transparent 70%)`,
                        }}
                      />

                      {/* Real artwork presentation: crisp, natural aspect ratio, no distortion */}
                      <div className="relative z-10 flex items-center justify-center p-6 sm:p-10 md:p-14 min-h-[320px] sm:min-h-[400px] md:min-h-[480px]">
                        <motion.img
                          src={project.image}
                          alt={`${project.title} — ${project.subtitle}`}
                          className="max-h-[280px] sm:max-h-[360px] md:max-h-[440px] w-auto max-w-full object-contain rounded-none drop-shadow-xl"
                          animate={{
                            scale: hoveredId === project.id ? 1.03 : 1,
                          }}
                          transition={{ duration: 0.6, ease: EASE_OUT }}
                        />
                      </div>

                      {/* Editorial corner coordinates */}
                      <div className="absolute top-4 left-4 text-[0.55rem] text-ash/40 font-mono tracking-widest uppercase">
                        FIG. {project.number}
                      </div>
                      <div className="absolute bottom-4 right-4 text-[0.55rem] text-ash/40 font-mono tracking-widest uppercase">
                        V DESIGN STUDIO
                      </div>
                    </div>
                  </div>

                  {/* Editorial Typography & Information */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center ${
                      isEven ? 'lg:col-start-8' : 'lg:col-start-1'
                    }`}
                  >
                    {/* Big Project Title */}
                    <div className="mb-4">
                      <span className="label-xs text-ash/60 tracking-[0.3em] block mb-2">
                        {project.number}
                      </span>
                      <h3 className="text-cream font-black tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl leading-none group-hover:text-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gold/90 text-sm md:text-base font-semibold tracking-[0.25em] uppercase mt-2">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Project Description */}
                    <p className="text-ash text-sm md:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="label-xs border border-ink-border px-3 py-1.5 text-ash/70 bg-[#0e0e0e]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Action Link */}
                    <div className="flex items-center gap-3 text-cream text-xs font-semibold tracking-[0.2em] uppercase group-hover:text-gold transition-colors">
                      <span>VIEW IDENTITY</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-gold"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
