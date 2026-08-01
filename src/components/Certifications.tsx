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
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">📜 Certifications</div>
          <h2 className="section-title mt-2">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Professional certifications from industry-leading organizations — validating skills in AI, Data Analytics, and Software Development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden group card-hover"
            >
              {/* Left colored border */}
              <div
                className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
                style={{ background: cert.color }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm"
                style={{ background: `${cert.color}15` }}
              >
                {cert.icon}
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                {cert.name}
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold" style={{ color: cert.color }}>{cert.org}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.date}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
