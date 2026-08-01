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
      style={{ background: '#F8FAFC' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="section-subtitle mx-auto text-center">
            My presence across the developer ecosystem — projects, contributions, problem-solving, and professional networking.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingProfiles.map((profile, idx) => {
            const Icon = icons[profile.icon];
            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-blue-lg transition-all duration-300 group"
              >
                {/* Profile header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ background: profile.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{profile.name}</h3>
                      <p className="text-slate-400 text-xs">@{profile.username}</p>
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
                      <div className="font-black text-slate-900 text-base">{stat.value}</div>
                      <div className="text-xs text-slate-500 leading-tight mt-0.5">{stat.label}</div>
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
