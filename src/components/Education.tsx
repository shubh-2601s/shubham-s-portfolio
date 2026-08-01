import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data/resumeData';

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

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
          <p className="section-subtitle mx-auto text-center">
            A strong academic foundation built on excellence, curiosity, and consistent performance.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 sm:left-12 top-4 bottom-4 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #2563eb, #60a5fa, #2563eb)' }}
          />

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-20 sm:pl-28"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: idx * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
                  className={`absolute left-5 sm:left-9 top-6 w-6 h-6 rounded-full border-4 border-white shadow-blue flex items-center justify-center ${
                    edu.current ? 'pulse-glow' : ''
                  }`}
                  style={{ background: edu.current ? '#2563eb' : '#60a5fa' }}
                />

                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(37,99,235,0.12)' }}
                  className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{edu.icon}</span>
                        <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {edu.degree}
                        </h3>
                        {edu.current && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-blue-600 font-semibold text-sm">{edu.institution}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{edu.location}</p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-sm font-bold px-3 py-1.5 rounded-xl"
                        style={{ background: 'rgba(37,99,235,0.08)', color: '#2563eb' }}
                      >
                        {edu.score}
                      </div>
                      <div className="text-slate-400 text-xs mt-1">{edu.year}</div>
                    </div>
                  </div>

                  {edu.coursework && (
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Relevant Coursework
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map(course => (
                          <span
                            key={course}
                            className="text-xs px-2.5 py-1 rounded-lg font-medium"
                            style={{ background: 'rgba(37,99,235,0.07)', color: '#2563eb', border: '1px solid rgba(37,99,235,0.15)' }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
