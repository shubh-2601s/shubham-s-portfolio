import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, User } from 'lucide-react';
import { personalInfo, stats } from '../data/resumeData';
import HackerTerminal from './HackerTerminal';

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseFloat(value);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const isDecimal = value.includes('.');
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numericValue);
    };
    requestAnimationFrame(tick);
  }, [inView, numericValue, value]);

  const isDecimal = value.includes('.');
  return <span ref={ref}>{isDecimal ? count.toFixed(2) : count}{suffix}</span>;
}

export default function About() {
  const [viewMode, setViewMode] = useState<'terminal' | 'card'>('terminal');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', transform: 'translate(30%, -30%)', filter: 'blur(60px)' }} />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">👤 About Me</div>
          <h2 className="section-title mt-2">Who I <span className="text-gradient">Am</span></h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            A passionate Software Engineer from Chennai with a love for building scalable systems and intelligent applications.
          </p>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="space-y-5 text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm <strong style={{ color: 'var(--text-primary)' }}>Shubham S</strong>, a B.Tech Computer Science Engineering student at{' '}
                <strong style={{ color: 'var(--accent-primary)' }}>Vel Tech R&D Institute of Science and Technology</strong>, Chennai (Class of 2027),
                maintaining a stellar CGPA of <strong style={{ color: 'var(--accent-primary)' }}>9.79</strong>.
              </p>
              <p>
                With a strong foundation in <strong style={{ color: 'var(--text-primary)' }}>Java, Data Structures &amp; Algorithms, OOP, DBMS, and Operating Systems</strong>,
                I specialize in Full Stack Web Development using the MERN stack and Spring Boot. I've gained hands-on experience as an{' '}
                <strong style={{ color: 'var(--text-primary)' }}>AI Engineer Intern at Siter Academy, Norway</strong>, building production-ready AI solutions.
              </p>
              <p>
                I'm deeply passionate about <strong style={{ color: 'var(--text-primary)' }}>Artificial Intelligence and Machine Learning</strong>, having built intelligent
                applications that won national-level hackathons. My work spans static code security analyzers to smart agriculture AI agents.
              </p>
              <p>
                Beyond code, I'm an active <strong style={{ color: 'var(--accent-primary)' }}>IEEE member</strong>, a co-inventor on{' '}
                <strong style={{ color: 'var(--text-primary)' }}>4 published patent applications</strong>, and a consistent hackathon achiever with multiple national wins.
              </p>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Location', value: 'Chennai, Tamil Nadu', icon: '📍' },
                { label: 'Degree', value: 'B.Tech CSE (2027)', icon: '🎓' },
                { label: 'Internship', value: 'Siter Academy, Norway', icon: '💼' },
                { label: 'Membership', value: 'IEEE & NEP Saarthi', icon: '⚡' },
                { label: 'Interests', value: 'AI, Full Stack, DSA', icon: '🧠' },
                { label: 'Hobbies', value: 'Chess, Sports, Editing', icon: '♟️' },
              ].map((item) => (
                <div key={item.label}
                  className="electric-card-glow flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300 group cursor-default relative overflow-hidden"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  {/* Subtle hover laser line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, transparent)',
                      boxShadow: '0 0 10px #06d6a0',
                    }}
                  />
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                    <div className="text-sm font-semibold transition-colors group-hover:text-white" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Interactive Terminal or Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-emerald-400 font-bold">DEV CONSOLE</span>
              </div>
              <div
                className="p-1 rounded-xl glass flex items-center gap-1 shadow-glow"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'terminal'
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Terminal size={13} />
                  <span>Interactive Shell</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('card')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'card'
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User size={13} />
                  <span>Summary</span>
                </button>
              </div>
            </div>

            {/* Content Container */}
            {viewMode === 'terminal' ? (
              <HackerTerminal />
            ) : (
              <div className="space-y-5">
                {/* Career objective card */}
                <div className="p-7 rounded-2xl glass-accent relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-9xl font-black select-none leading-none" style={{ color: 'var(--accent-primary)', opacity: 0.05 }}>"</div>
                  <p className="italic text-base leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
                    "Passionate about solving complex problems, building efficient applications, and continuously learning modern technologies — with a growing interest in AI and scalable software engineering."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: '#0a0a0f' }}>S</div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Shubham S</div>
                      <div className="text-xs" style={{ color: 'var(--accent-primary)' }}>Software Engineer</div>
                    </div>
                  </div>
                </div>

                {/* Languages & Interests row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>🌍 Languages</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {personalInfo.languages.map(lang => (
                        <span key={lang} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(6,214,160,0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.15)' }}>{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>💡 Interests</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {personalInfo.interests.slice(0, 3).map(interest => (
                        <span key={interest} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ background: 'rgba(6,214,160,0.07)', color: 'var(--accent-primary)' }}>{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Animated Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.04, boxShadow: `0 0 20px ${stat.color}35` }}
                className="p-5 rounded-2xl text-center card-hover relative overflow-hidden group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                {/* Top Electric Laser Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}, #ffffff, ${stat.color}, transparent)`,
                    boxShadow: `0 0 10px ${stat.color}`,
                  }}
                />
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black" style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
