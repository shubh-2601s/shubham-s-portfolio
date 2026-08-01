import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Code2, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/resumeData';

type Project = typeof projects[0] & {
  image?: string;
  category?: string;
  badge?: string;
};

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
        className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-default"
      >
        {/* Glow backdrop on hover */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${project.color}30 0%, transparent 70%)` }}
        />

        {/* Featured Badge Header */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
            style={{ background: project.color, backdropFilter: 'blur(8px)' }}>
            <Star size={12} fill="currentColor" /> {project.badge || 'Featured Project'}
          </span>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-0">
          {/* Visual Panel (Image) */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-[340px] overflow-hidden bg-slate-900">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-950 text-5xl">
                🚀
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/20" />

            {/* Floating Tech Badges over Image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-10">
              {project.technologies.slice(0, 4).map(tech => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-md font-semibold text-white bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-md font-medium text-slate-300 bg-slate-800/80 backdrop-blur-md">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-7 p-7 lg:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: `${project.color}15`, color: project.color }}>
                  {project.category || 'Project'}
                </span>
                {project.live && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Demo Available
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
                {project.title}
              </h3>
              <p className="text-xs font-semibold mb-3" style={{ color: project.color }}>
                {project.subtitle}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5 mb-5">
                {project.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: project.color }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
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
                  className="btn-outline text-xs py-2.5 px-4 flex items-center gap-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
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

  // Standard Project Card
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
      className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
    >
      {/* Top Accent Line */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />

      <div>
        {/* Project Thumbnail Image */}
        <div className="relative h-44 overflow-hidden bg-slate-100">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: `${project.color}10` }}>
              💡
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

          {/* Badge over thumbnail */}
          {project.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md text-slate-800 bg-white/90 shadow-sm border border-slate-200/80 backdrop-blur-sm">
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

          <h3 className="text-base font-black text-slate-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-3">{project.subtitle}</p>

          <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map(tech => (
              <span key={tech} className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                style={{ background: `${project.color}12`, color: project.color }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="p-6 pt-0">
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-all border border-slate-200/60"
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
              <ExternalLink size={13} /> Live Demo
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
    <section id="projects" ref={sectionRef} className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-tag inline-flex mx-auto">🚀 Software Engineering Showcase</div>
          <h2 className="section-title mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            7 end-to-end full-stack applications, security scanners, and AI hackathon winners built with modern tech stacks.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                filter === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-sm scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects Grid (Top Highlighted Showcase) */}
        {featuredList.length > 0 && (
          <div className="mb-14 space-y-8">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-4">
              <Sparkles size={20} className="text-amber-500" />
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
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-6">
              <Code2 size={20} className="text-blue-600" />
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
