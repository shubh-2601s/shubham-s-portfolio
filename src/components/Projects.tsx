import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Code2, Sparkles, Shield, GitBranch, Cpu, Database, Zap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects, marqueeProject } from '../data/resumeData';

type Project = typeof projects[0] & {
  image?: string;
  category?: string;
  badge?: string;
};

// ── AegisIQ Marquee Section ─────────────────────────────────────────────────
function MarqueeProjectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredAdr, setHoveredAdr] = useState<number | null>(null);

  const archItems = [
    { icon: Cpu, label: 'Frontend', value: marqueeProject.architecture.frontend },
    { icon: Shield, label: 'Backend', value: marqueeProject.architecture.backend },
    { icon: Database, label: 'Database', value: marqueeProject.architecture.database },
    { icon: Zap, label: 'AI Service', value: marqueeProject.architecture.ai },
  ];

  return (
    <div ref={ref} className="mb-20">
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="flex items-center gap-3 mb-8"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black"
          style={{ background: 'linear-gradient(135deg, rgba(6,214,160,0.15), rgba(0,180,216,0.1))', border: '1px solid rgba(6,214,160,0.3)', color: 'var(--accent-primary)' }}>
          <Sparkles size={16} />
          <span className="badge-shine">⭐ MARQUEE PROJECT</span>
        </div>
        <div className="h-px flex-1 opacity-20" style={{ background: 'linear-gradient(90deg, var(--accent-primary), transparent)' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(6,214,160,0.2)',
          boxShadow: '0 0 80px rgba(6,214,160,0.05), 0 30px 60px rgba(0,0,0,0.3)'
        }}
      >
        {/* Electric Laser Top Beam */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-20 overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, #ffffff, #06d6a0, transparent)',
            boxShadow: '0 0 16px rgba(6, 214, 160, 0.9), 0 0 32px rgba(56, 189, 248, 0.6)',
          }}
        />

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(6,214,160,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 grid lg:grid-cols-12 gap-0">
          {/* Left Visual Panel */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between"
            style={{ borderRight: '1px solid var(--border-subtle)' }}>
            {/* Logo + Title */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-glow"
                  style={{ background: 'linear-gradient(135deg, #06d6a0, #00b4d8)', boxShadow: '0 0 30px rgba(6,214,160,0.3)' }}>
                  🛡️
                </div>
                <div>
                  <h3 className="text-3xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                    {marqueeProject.title}
                  </h3>
                  <p className="text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {marqueeProject.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5 italic"
                style={{ color: 'var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '12px' }}>
                "{marqueeProject.tagline}"
              </p>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {marqueeProject.description}
              </p>

              {/* Evolution Note */}
              <div className="rounded-xl p-4 mb-6 text-xs leading-relaxed"
                style={{ background: 'rgba(6,214,160,0.05)', border: '1px solid rgba(6,214,160,0.15)', color: 'var(--text-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>🔁 Evolution: </span>
                {marqueeProject.evolution}
              </div>

              {/* Milestone */}
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl"
                style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: 'var(--accent-secondary)' }}>
                <GitBranch size={12} />
                {marqueeProject.milestone}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mt-8">
              <motion.a
                href={marqueeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
              >
                <FaGithub size={16} /> GitHub Repo
              </motion.a>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col gap-8">
            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {marqueeProject.technologies.map(tech => (
                  <span key={tech}
                    className="text-xs font-semibold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(6,214,160,0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.2)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Architecture
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {archItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl p-3 flex items-start gap-3"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(6,214,160,0.1)' }}>
                      <Icon size={14} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                        {label}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Key Capabilities
              </h4>
              <div className="space-y-2">
                {marqueeProject.features.slice(0, 5).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-0.5 shrink-0 font-bold text-base leading-none" style={{ color: 'var(--accent-primary)' }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ADRs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Architecture Decision Records
              </h4>
              <div className="flex flex-wrap gap-2">
                {marqueeProject.adrs.map((adr, i) => (
                  <motion.span
                    key={i}
                    onHoverStart={() => setHoveredAdr(i)}
                    onHoverEnd={() => setHoveredAdr(null)}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg cursor-default transition-all"
                    style={{
                      background: hoveredAdr === i ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.06)',
                      color: hoveredAdr === i ? '#a78bfa' : 'var(--text-muted)',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}
                  >
                    {adr.split(':')[0]}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Interactive Tilt Card Component ──────────────────────────────────────────
function ProjectCard({ project, index, featured = false }: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [7, -7]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-7, 7]), { stiffness: 250, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  if (featured) {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
        className="relative rounded-3xl overflow-hidden group cursor-default"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sx={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="absolute rounded-3xl inset-0" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} />

        {/* Glow backdrop on hover */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${project.color}25 0%, transparent 70%)` }}
        />

        {/* Top Electric Laser Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, #ffffff, ${project.color}, transparent)`,
            boxShadow: `0 0 14px ${project.color}`,
          }}
        />

        {/* Featured Badge Header */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
            style={{ background: project.color }}>
            <Star size={12} fill="currentColor" /> {project.badge || 'Featured Project'}
          </span>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-0">
          {/* Visual Panel */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-[340px] overflow-hidden"
            style={{ background: 'var(--bg-elevated)' }}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl"
                style={{ background: `${project.color}08` }}>
                🚀
              </div>
            )}
            <div className="absolute inset-0 opacity-60"
              style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)' }} />

            {/* Floating Tech Badges */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-10">
              {project.technologies.slice(0, 4).map(tech => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-md font-semibold text-white"
                  style={{ background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-md font-medium"
                  style={{ background: 'rgba(10,10,15,0.8)', color: 'var(--text-muted)', backdropFilter: 'blur(4px)' }}>
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-7 p-7 lg:p-8 flex flex-col justify-between"
            style={{ background: 'var(--bg-card)' }}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: `${project.color}15`, color: project.color }}>
                  {project.category || 'Project'}
                </span>
                {project.live && (
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse"
                    style={{ background: 'rgba(6,214,160,0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(6,214,160,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-primary)' }} /> Live
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black transition-colors mb-1"
                style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-xs font-semibold mb-3" style={{ color: project.color }}>
                {project.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5 mb-5">
                {project.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: project.color }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
              >
                <FaGithub size={15} /> Source Code
              </motion.a>

              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-outline text-xs py-2.5 px-4 flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard Card
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden flex flex-col justify-between group cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl transition-colors duration-300"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1px solid ${project.color}40` }} />

      {/* Top Electric Laser Line */}
      <div
        className="relative h-[2px] w-full z-10 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, #ffffff, ${project.color}, transparent)`,
          boxShadow: `0 0 12px ${project.color}`,
        }}
      />

      <div className="relative">
        {/* Project Thumbnail */}
        <div className="relative h-44 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: `${project.color}08` }}>
              💡
            </div>
          )}
          <div className="absolute inset-0 opacity-60"
            style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />

          {/* Badge */}
          {project.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md"
                style={{ background: 'rgba(10,10,15,0.85)', color: 'var(--text-secondary)', backdropFilter: 'blur(4px)', border: '1px solid var(--border-subtle)' }}>
                {project.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: project.color }}>
              {project.category || 'Software'}
            </span>
          </div>

          <h3 className="text-base font-black leading-snug mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>{project.subtitle}</p>

          <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map(tech => (
              <span key={tech} className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                style={{ background: `${project.color}10`, color: project.color }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative p-6 pt-0">
        <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg transition-all"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            <FaGithub size={14} /> GitHub Repo
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 px-3 rounded-lg text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ background: project.color }}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Projects Section ───────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured' | 'web' | 'ai'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categories = [
    { id: 'all', label: `All Projects (${projects.length})` },
    { id: 'featured', label: '⭐ Top Featured' },
    { id: 'web', label: '🌐 Full Stack Web' },
    { id: 'ai', label: '🤖 AI & Data Science' },
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === 'featured') return p.featured;
    if (filter === 'web') return p.category?.includes('Full Stack') || p.category?.includes('Security');
    if (filter === 'ai') return p.category?.includes('AI') || p.category?.includes('IoT');
    return true;
  });

  const featuredList = filteredProjects.filter(p => p.featured);
  const otherList = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.05), transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex mx-auto">🚀 Engineering Showcase</div>
          <h2 className="section-title mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center">
            Production-grade systems, AI-powered applications, and full-stack software built for real-world impact.
          </p>
        </motion.div>

        {/* AegisIQ Marquee Section */}
        <MarqueeProjectSection />

        {/* Divider with electric laser touch */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6, 214, 160, 0.3))' }} />
          <span className="text-xs font-bold uppercase tracking-widest px-4 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            More Engineering Work
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(6, 214, 160, 0.3), transparent)' }} />
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-glow scale-105'
                  : 'glass text-gray-300 hover:text-white hover:border-emerald-500/30'
              }`}
              style={{
                border: filter === cat.id ? '1px solid rgba(6, 214, 160, 0.5)' : '1px solid var(--border-subtle)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects Grid */}
        {featuredList.length > 0 && (
          <div className="mb-14 space-y-8">
            <div className="flex items-center gap-2 font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              <Sparkles size={20} style={{ color: '#f59e0b' }} />
              <span>Top Highlighted Projects ({featuredList.length})</span>
            </div>
            <div className="grid gap-8">
              {featuredList.map((project, idx) => (
                <ProjectCard key={project.id} project={project as Project} index={idx} featured />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {otherList.length > 0 && (
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
              <Code2 size={20} style={{ color: 'var(--accent-secondary)' }} />
              <span>More Open-Source Projects ({otherList.length})</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {otherList.map((project, idx) => (
                  <ProjectCard key={project.id} project={project as Project} index={idx} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
