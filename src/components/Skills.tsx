import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact,
  FaNodeJs, FaGitAlt, FaGithub, FaDatabase,
} from 'react-icons/fa';
import {
  SiAngular, SiSpringboot, SiExpress, SiMysql, SiMongodb,
  SiScikitlearn, SiPandas, SiNumpy, SiOpencv, SiJavascript,
  SiPostman, SiC,
} from 'react-icons/si';
import { Brain, Server, Cpu, Wrench, Layers, Star, Code2 } from 'lucide-react';

// ── Skill definitions ──────────────────────────────────────────────────────
const skillCategories = [
  {
    label: 'Programming Languages',
    icon: Cpu,
    color: '#06d6a0',
    skills: [
      { name: 'Java', Icon: FaJava, color: '#e76f00' },
      { name: 'Python', Icon: FaPython, color: '#3776ab' },
      { name: 'C', Icon: SiC, color: '#a8b9cc' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
    ],
  },
  {
    label: 'Frontend',
    icon: Layers,
    color: '#7c3aed',
    skills: [
      { name: 'HTML5', Icon: FaHtml5, color: '#e34f26' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#1572b6' },
      { name: 'React.js', Icon: FaReact, color: '#61dafb' },
      { name: 'Angular', Icon: SiAngular, color: '#dd0031' },
    ],
  },
  {
    label: 'Backend',
    icon: Server,
    color: '#059669',
    skills: [
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6db33f' },
      { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress, color: '#e0e0e0' },
      { name: 'REST APIs', Icon: FaDatabase, color: '#06d6a0' },
    ],
  },
  {
    label: 'Databases',
    icon: FaDatabase,
    color: '#00b4d8',
    skills: [
      { name: 'MySQL', Icon: SiMysql, color: '#4479a1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47a248' },
    ],
  },
  {
    label: 'AI / Machine Learning',
    icon: Brain,
    color: '#ef4444',
    skills: [
      { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#f7931e' },
      { name: 'Pandas', Icon: SiPandas, color: '#a0a0d0' },
      { name: 'NumPy', Icon: SiNumpy, color: '#4dabcf' },
      { name: 'OpenCV', Icon: SiOpencv, color: '#5c3ee8' },
    ],
  },
  {
    label: 'Developer Tools',
    icon: Wrench,
    color: '#f59e0b',
    skills: [
      { name: 'Git', Icon: FaGitAlt, color: '#f05032' },
      { name: 'GitHub', Icon: FaGithub, color: '#e8e8f0' },
      { name: 'VS Code', Icon: Code2, color: '#007acc' },
      { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
    ],
  },
];

const softSkills = [
  { label: 'Problem Solving', icon: '🧩' },
  { label: 'Team Collaboration', icon: '🤝' },
  { label: 'Leadership', icon: '🌟' },
  { label: 'Communication', icon: '💬' },
  { label: 'Adaptability', icon: '🔄' },
  { label: 'Time Management', icon: '⏰' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

function SkillBadge({ name, Icon, color }: { name: string; Icon: React.ElementType; color: string }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.06,
        boxShadow: `0 0 16px ${color}60, 0 12px 28px ${color}25`,
        borderColor: `${color}60`,
      }}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default group transition-all duration-200 relative overflow-hidden"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon style={{ color, fontSize: '1.6rem' }} size={26} />
      </div>
      <span className="text-xs font-semibold text-center leading-tight transition-colors group-hover:text-white" style={{ color: 'var(--text-secondary)' }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', transform: 'translate(-30%, -30%)', filter: 'blur(60px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">⚙️ Technical Skills</div>
          <h2 className="section-title mt-2">
            My <span className="text-gradient">Expertise</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            A comprehensive toolkit spanning languages, frameworks, databases, and AI — built through hands-on projects and continuous learning.
          </p>
        </motion.div>

        {/* Skill Category Cards */}
        <div className="space-y-8">
          {skillCategories.map((category, catIdx) => {
            const CatIcon = category.icon;
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.09 }}
                className="electric-card-glow p-6 rounded-2xl transition-all duration-300 relative overflow-hidden group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                {/* Top Electric Laser Beam */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-75 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${category.color}, #ffffff, ${category.color}, transparent)`,
                    boxShadow: `0 0 10px ${category.color}, 0 0 20px ${category.color}80`,
                  }}
                />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                  >
                    <span className="w-2 h-2 rounded-full absolute -top-1 -right-1 animate-ping pointer-events-none" style={{ background: category.color }} />
                    <CatIcon size={20} style={{ color: category.color }} />
                  </div>
                  <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{category.label}</h3>
                  <span
                    className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: `${category.color}12`, color: category.color }}
                  >
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Skill badges grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
                >
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} {...skill} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-8 p-6 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(245,158,11,0.1)' }}>
              <Star size={20} style={{ color: '#f59e0b' }} />
            </div>
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.07, y: -3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-default text-sm font-semibold transition-all duration-200"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Technologies Pill Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-card))', border: '1px solid var(--border-accent)' }}
        >
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
              20+ Technologies Mastered
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Spanning languages, frameworks, databases, AI/ML, and dev tools</p>
            <div className="flex flex-wrap justify-center gap-2">
              {skillCategories.flatMap(c => c.skills).map(s => (
                <motion.span
                  key={s.name}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default transition-all"
                  style={{ background: 'rgba(6,214,160,0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.15)' }}
                >
                  {s.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
