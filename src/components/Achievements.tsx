import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/resumeData';

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">🏆 Achievements</div>
          <h2 className="section-title mt-2">
            Awards & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Hackathon victories, academic milestones, and competition wins that reflect consistent excellence and innovation.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden group cursor-default transition-all duration-300 hover:shadow-lg"
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${achievement.color}06, ${achievement.color}12)` }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${achievement.color}, ${achievement.color}50)` }}
              />

              <div className="relative z-10">
                {/* Icon & Year */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                    style={{ background: `${achievement.color}15` }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${achievement.color}15`, color: achievement.color }}
                  >
                    {achievement.year}
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-sm leading-tight mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {achievement.title}
                </h3>
                <p className="text-xs font-semibold mb-3" style={{ color: achievement.color }}>
                  {achievement.org}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 p-8 rounded-2xl text-white text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)' }}
        >
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              9+ National-Level Achievements
            </h3>
            <p className="text-blue-100 text-sm max-w-xl mx-auto">
              Including 5 hackathon wins, AIR 37 at BITS Pilani, Top 20 at IIT Bhubaneswar, Top 50 at Smart India Hackathon, and 4 published patents.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
