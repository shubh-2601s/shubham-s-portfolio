import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
import { codingProfiles } from '../data/resumeData';

const icons: Record<string, React.ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
};

export default function CodingProfiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="profiles"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(248,159,27,0.04), transparent)', filter: 'blur(60px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">💻 Coding Profiles</div>
          <h2 className="section-title mt-2">
            Find Me <span className="text-gradient">Online</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            My presence across the developer ecosystem — projects, contributions, problem-solving, and professional networking.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingProfiles.map((profile, idx) => {
            const Icon = icons[profile.icon];
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.96 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="electric-card-glow relative overflow-hidden p-6 rounded-2xl transition-all duration-300 group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                {/* Top Electric Laser Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${profile.color}, #ffffff, ${profile.color}, transparent)`,
                    boxShadow: `0 0 14px ${profile.color}`,
                  }}
                />

                {/* Profile header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm relative"
                      style={{
                        background: profile.color,
                        boxShadow: `0 0 16px ${profile.color}40`,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-black text-base" style={{ color: 'var(--text-primary)' }}>{profile.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-ping pointer-events-none" style={{ background: profile.color }} />
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>@{profile.username}</p>
                      </div>
                    </div>
                  </div>
                  <motion.a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: `${profile.color}15`, color: profile.color }}
                    aria-label={`Visit ${profile.name}`}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {profile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-xl"
                      style={{ background: `${profile.color}08` }}
                    >
                      <div className="font-black text-base" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                      <div className="text-xs leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: profile.color }}
                >
                  <Icon size={15} />
                  View Profile
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
