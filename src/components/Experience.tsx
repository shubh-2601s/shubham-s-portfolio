import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience } from '../data/resumeData';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Electric Laser Scroll tracking
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
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', filter: 'blur(60px)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">💼 Experience &amp; Leadership</div>
          <h2 className="section-title mt-2">
            My <span className="text-gradient">Journey</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            Professional experience, technical leadership, and community contributions that shaped my growth as an engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Center Track */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-white/5 pointer-events-none" />
          
          {/* Desktop Electric Laser Beam */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-1 rounded-full pointer-events-none z-10"
            style={{
              height: laserHeight,
              background: 'linear-gradient(to bottom, #06d6a0, #38bdf8, #818cf8)',
              boxShadow: '0 0 15px rgba(6, 214, 160, 0.9), 0 0 30px rgba(56, 189, 248, 0.6)',
            }}
          >
            {/* Leading photon electric head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_20px_#38bdf8,0_0_35px_#06d6a0] animate-ping" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#06d6a0]" />
          </motion.div>

          {/* Mobile Left Track & Laser */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-1 rounded-full bg-white/5 pointer-events-none" />
          <motion.div
            className="md:hidden absolute left-4 top-0 w-1 rounded-full pointer-events-none z-10"
            style={{
              height: laserHeight,
              background: 'linear-gradient(to bottom, #06d6a0, #38bdf8, #818cf8)',
              boxShadow: '0 0 15px rgba(6, 214, 160, 0.9)',
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#38bdf8] animate-ping" />
          </motion.div>

          {experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: idx * 0.15, ease: 'easeOut' }}
                className={`relative flex md:items-center mb-12 last:mb-0 pl-10 md:pl-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Mobile timeline node */}
                <div className="md:hidden absolute left-2.5 top-6 z-10 -translate-x-1/2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2"
                    style={{
                      background: exp.color,
                      borderColor: 'var(--bg-secondary)',
                      boxShadow: `0 0 10px ${exp.color}`,
                    }}
                  />
                </div>

                {/* Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
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
                        <h3 className="font-black text-base leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                          {exp.role}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                      <span className="font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                      <span style={{ color: 'var(--border-subtle)' }}>•</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{exp.location}</span>
                    </div>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mb-4"
                      style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}25` }}
                    >
                      📅 {exp.period}
                    </div>

                    <ul className="space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Desktop Center Node with Pulsing Halo */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: idx * 0.15 + 0.3, type: 'spring' }}
                    className="relative w-6 h-6 flex items-center justify-center"
                  >
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
                      style={{ background: exp.color }}
                    />
                    <span
                      className="relative w-4 h-4 rounded-full border-2"
                      style={{
                        background: exp.color,
                        borderColor: 'var(--bg-secondary)',
                        boxShadow: `0 0 14px ${exp.color}`,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
