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

// ── Skill definitions with react-icons ──────────────────────────────────────
const skillCategories = [
  {
    label: 'Programming Languages',
    icon: Cpu,
    color: '#2563eb',
    bg: '#eff6ff',
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
    bg: '#f5f3ff',
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
    bg: '#ecfdf5',
    skills: [
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6db33f' },
      { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress, color: '#000000' },
      { name: 'REST APIs', Icon: FaDatabase, color: '#2563eb' },
    ],
  },
  {
    label: 'Databases',
    icon: FaDatabase,
    color: '#0891b2',
    bg: '#ecfeff',
    skills: [
      { name: 'MySQL', Icon: SiMysql, color: '#4479a1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47a248' },
    ],
  },
  {
    label: 'AI / Machine Learning',
    icon: Brain,
    color: '#dc2626',
    bg: '#fef2f2',
    skills: [
      { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#f7931e' },
      { name: 'Pandas', Icon: SiPandas, color: '#150458' },
      { name: 'NumPy', Icon: SiNumpy, color: '#013243' },
      { name: 'OpenCV', Icon: SiOpencv, color: '#5c3ee8' },
    ],
  },
  {
    label: 'Developer Tools',
    icon: Wrench,
    color: '#374151',
    bg: '#f9fafb',
    skills: [
      { name: 'Git', Icon: FaGitAlt, color: '#f05032' },
      { name: 'GitHub', Icon: FaGithub, color: '#0f172a' },
      { name: 'VS Code', Icon: Code2, color: '#007acc' },
      { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
    ],
  },
];

// Soft Skills
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
        boxShadow: `0 12px 32px ${color}30`,
        borderColor: `${color}50`,
      }}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm cursor-default group transition-all duration-200"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-110"
        style={{ background: `${color}12` }}
      >
        <Icon
          style={{ color, fontSize: '1.6rem' }}
          size={26}
        />
      </div>
      {/* Name */}
      <span className="text-xs font-semibold text-slate-700 text-center leading-tight group-hover:text-slate-900 transition-colors">
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
      style={{ background: '#F8FAFC' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)', transform: 'translate(-30%, -30%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
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
          <p className="section-subtitle mx-auto text-center">
            A comprehensive toolkit spanning languages, frameworks, databases, and AI — built through hands-on projects and continuous learning.
          </p>
        </motion.div>

        {/* ── Skill Category Cards ── */}
        <div className="space-y-10">
          {skillCategories.map((category, catIdx) => {
            const CatIcon = category.icon;
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.09 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-blue transition-all duration-300"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: category.bg }}
                  >
                    <CatIcon size={20} style={{ color: category.color }} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{category.label}</h3>
                  <span
                    className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: category.bg, color: category.color }}
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

        {/* ── Soft Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-10 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-pink-50">
              <Star size={20} className="text-pink-500" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.07, y: -3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/70 bg-white shadow-sm cursor-default text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-blue transition-all duration-200"
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── All Technologies Pill Cloud ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 p-8 rounded-2xl text-white text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)' }}
        >
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)' }} />
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              20+ Technologies Mastered
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skillCategories.flatMap(c => c.skills).map(s => (
                <motion.span
                  key={s.name}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 border border-white/20 cursor-default transition-all"
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
