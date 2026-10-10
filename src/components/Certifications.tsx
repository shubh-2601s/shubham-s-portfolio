import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certifications } from '../data/resumeData';

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">📜 Certifications</div>
          <h2 className="section-title mt-2">
            Licenses &amp; <span className="text-gradient">Certifications</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            Professional certifications from industry-leading organizations — validating skills in AI, Data Analytics, and Software Development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.96 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className="relative p-6 rounded-2xl overflow-hidden group card-hover"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
              {/* Top Electric Laser Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cert.color}, #ffffff, ${cert.color}, transparent)`,
                  boxShadow: `0 0 12px ${cert.color}`,
                }}
              />

              {/* Left Electric Laser Strip */}
              <div
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full overflow-hidden"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${cert.color}, #ffffff, ${cert.color}, transparent)`,
                  boxShadow: `0 0 14px ${cert.color}`,
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 10% 50%, ${cert.color}10 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 relative"
                style={{
                  background: `${cert.color}15`,
                  border: `1px solid ${cert.color}35`,
                  boxShadow: `0 0 16px ${cert.color}25`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full absolute -top-1 -right-1 animate-ping pointer-events-none"
                  style={{ background: cert.color }}
                />
                {cert.icon}
              </div>

              <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: 'var(--text-primary)' }}>
                {cert.name}
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold" style={{ color: cert.color }}>{cert.org}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{cert.date}</p>
                </div>
                {cert.credentialLink ? (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold transition-colors px-3 py-1.5 rounded-lg"
                    style={{ color: cert.color, background: `${cert.color}10` }}
                  >
                    <ExternalLink size={11} /> View
                  </a>
                ) : (
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ color: cert.color, background: `${cert.color}10` }}
                  >
                    Verified ✓
                  </span>
                )}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
