import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats } from '../data/resumeData';

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">👤 About Me</div>
          <h2 className="section-title mt-2">Who I <span className="text-gradient">Am</span></h2>
          <p className="section-subtitle mx-auto text-center">
            A passionate Software Engineer from Chennai with a love for building scalable systems and intelligent applications.
          </p>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 text-slate-600 text-base leading-relaxed mb-8">
              <p>
                I'm <strong className="text-slate-900">Shubham S</strong>, a B.Tech Computer Science Engineering student at{' '}
                <strong className="text-blue-600">Vel Tech R&D Institute of Science and Technology</strong>, Chennai (Class of 2027),
                maintaining a stellar CGPA of <strong className="text-blue-600">9.79</strong>.
              </p>
              <p>
                With a strong foundation in <strong className="text-slate-900">Java, Data Structures & Algorithms, OOP, DBMS, and Operating Systems</strong>,
                I specialize in Full Stack Web Development using the MERN stack and Spring Boot. I've gained hands-on experience as an{' '}
                <strong className="text-slate-900">AI Engineer Intern at Siter Academy, Norway</strong>, building production-ready AI solutions.
              </p>
              <p>
                I'm deeply passionate about <strong className="text-slate-900">Artificial Intelligence and Machine Learning</strong>, having built intelligent
                applications that won national-level hackathons. My work spans static code security analyzers to smart agriculture AI agents.
              </p>
              <p>
                Beyond code, I'm an active <strong className="text-blue-600">IEEE member</strong>, a patent holder with{' '}
                <strong className="text-slate-900">4 published patents</strong>, and a consistent hackathon achiever with multiple national wins.
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
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-default">
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.label}</div>
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Illustration + Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* About illustration */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-100 shadow-blue" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}>
              <img
                src="/images/about_illustration.png"
                alt="Software Engineer Illustration"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 to-transparent pointer-events-none" />
            </div>

            {/* Career objective card */}
            <div className="p-7 rounded-2xl glass-blue border border-blue-100 shadow-blue relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black opacity-5 text-blue-600 select-none leading-none">"</div>
              <p className="text-slate-700 italic text-base leading-relaxed relative z-10">
                "Passionate about solving complex problems, building efficient applications, and continuously learning modern technologies — with a growing interest in AI and scalable software engineering."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}>S</div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Shubham S</div>
                  <div className="text-xs text-blue-600">Software Engineer</div>
                </div>
              </div>
            </div>

            {/* Languages & Interests row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass border border-slate-200/60 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">🌍 Languages</h4>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.languages.map(lang => (
                    <span key={lang} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">{lang}</span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl glass border border-slate-200/60 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">💡 Interests</h4>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.interests.slice(0, 3).map(interest => (
                    <span key={interest} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'rgba(37,99,235,0.07)', color: '#2563eb' }}>{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Animated Stats Row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-5 rounded-2xl glass border border-slate-200/60 shadow-sm text-center card-hover"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
