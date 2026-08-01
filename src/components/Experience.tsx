import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/resumeData';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">💼 Experience & Leadership</div>
          <h2 className="section-title mt-2">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Professional experience, technical leadership, and community contributions that shaped my growth as an engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, #2563eb40, #2563eb, #2563eb40, transparent)' }} />

          {experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: idx * 0.15, ease: 'easeOut' }}
                className={`relative flex md:items-center mb-12 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Card (50% width on desktop) */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(37,99,235,0.12)' }}
                    className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300"
                  >
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                        style={{ background: `${exp.color}15` }}
                      >
                        {exp.icon}
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex mb-1"
                          style={{ background: `${exp.color}15`, color: exp.color }}
                        >
                          {exp.type}
                        </div>
                        <h3 className="font-black text-slate-900 text-base leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {exp.role}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                      <span className="font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-xs">{exp.location}</span>
                    </div>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mb-4"
                      style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}25` }}
                    >
                      📅 {exp.period}
                    </div>

                    <ul className="space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: idx * 0.15 + 0.3, type: 'spring' }}
                    className="w-5 h-5 rounded-full border-4 border-white shadow-blue"
                    style={{ background: exp.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
