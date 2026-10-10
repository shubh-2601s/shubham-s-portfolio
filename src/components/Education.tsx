import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { education } from '../data/resumeData';

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Electric laser beam progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const laserHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.05), transparent)', filter: 'blur(60px)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">📚 Education</div>
          <h2 className="section-title mt-2">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            A strong academic foundation built on excellence, curiosity, and consistent performance.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Ambient background track */}
          <div
            className="absolute left-8 sm:left-12 top-4 bottom-4 w-1 rounded-full bg-white/5 pointer-events-none"
          />

          {/* Electric Laser Beam */}
          <motion.div
            className="absolute left-8 sm:left-12 top-4 w-1 rounded-full pointer-events-none z-10"
            style={{
              height: laserHeight,
              background: 'linear-gradient(to bottom, #06d6a0, #38bdf8, #818cf8)',
              boxShadow: '0 0 15px rgba(6, 214, 160, 0.9), 0 0 30px rgba(56, 189, 248, 0.6)',
            }}
          >
            {/* Leading photon electric head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38bdf8] animate-ping" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#06d6a0]" />
          </motion.div>

          <div className="space-y-8">
            {education.map((edu, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: 'easeOut' }}
                  className="relative pl-20 sm:pl-28"
                >
                {/* Timeline dot with pulsing photon halo */}
                <div className="absolute left-5 sm:left-9 top-6 flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: idx * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
                    className="relative w-6 h-6 flex items-center justify-center"
                  >
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                      style={{ background: edu.current ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}
                    />
                    <span
                      className="relative w-4 h-4 rounded-full border-2"
                      style={{
                        background: edu.current ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                        borderColor: 'var(--bg-secondary)',
                        boxShadow: `0 0 14px ${edu.current ? 'var(--accent-primary)' : 'var(--accent-secondary)'}`,
                      }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="electric-card-glow relative overflow-hidden p-6 rounded-2xl transition-all duration-300"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  {/* Top Electric Laser Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${edu.current ? '#06d6a0' : '#38bdf8'}, #ffffff, ${edu.current ? '#06d6a0' : '#38bdf8'}, transparent)`,
                      boxShadow: `0 0 12px ${edu.current ? '#06d6a0' : '#38bdf8'}`,
                    }}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{edu.icon}</span>
                        <h3 className="font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                          {edu.degree}
                        </h3>
                        {edu.current && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(6,214,160,0.12)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.2)' }}>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--accent-primary)' }}>{edu.institution}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{edu.location}</p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-sm font-bold px-3 py-1.5 rounded-xl"
                        style={{ background: 'rgba(6,214,160,0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.15)' }}
                      >
                        {edu.score}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{edu.year}</div>
                    </div>
                  </div>

                  {edu.coursework && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                        Relevant Coursework
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map(course => (
                          <span
                            key={course}
                            className="text-xs px-2.5 py-1 rounded-lg font-medium"
                            style={{ background: 'rgba(6,214,160,0.07)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.15)' }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
