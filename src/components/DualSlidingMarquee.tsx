import {
  FaJava, FaPython, FaReact, FaNodeJs, FaGitAlt, FaDocker,
} from 'react-icons/fa';
import {
  SiSpringboot, SiExpress, SiMysql, SiMongodb, SiPostman,
  SiJavascript, SiTypescript, SiOpencv, SiTensorflow, SiScikitlearn,
  SiLinux, SiTailwindcss, SiC,
} from 'react-icons/si';
import { Sparkles, Award, Shield, Cpu, Code2, Brain, Zap, Layers } from 'lucide-react';

const TECH_TRACK = [
  { name: 'Java', icon: FaJava, color: '#f89820', category: 'Backend' },
  { name: 'Python', icon: FaPython, color: '#3776ab', category: 'AI & Data' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f', category: 'Backend' },
  { name: 'React.js', icon: FaReact, color: '#61dafb', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'Language' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'Web' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Runtime' },
  { name: 'Express.js', icon: SiExpress, color: '#e0e0e0', category: 'API' },
  { name: 'C Language', icon: SiC, color: '#a8b9cc', category: 'Systems' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00', category: 'Deep Learning' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8', category: 'Computer Vision' },
  { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#f7931e', category: 'Machine Learning' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', category: 'Database' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1', category: 'RDBMS' },
  { name: 'Docker', icon: FaDocker, color: '#2496ed', category: 'DevOps' },
  { name: 'Git & GitHub', icon: FaGitAlt, color: '#f05032', category: 'VCS' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37', category: 'Testing' },
  { name: 'Linux', icon: SiLinux, color: '#fcc624', category: 'OS' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', category: 'Styling' },
];

const HIGHLIGHT_TRACK = [
  { label: '4 Published Patent Applications', icon: Award, color: '#06d6a0', tag: 'Intellectual Property' },
  { label: 'CGPA: 9.79 @ Vel Tech Chennai', icon: Zap, color: '#f59e0b', tag: 'Academic Rank' },
  { label: 'AI Engineer Intern @ Siter Academy (Norway)', icon: Brain, color: '#38bdf8', tag: 'Industry' },
  { label: 'National Hackathon Winner', icon: Sparkles, color: '#e11d48', tag: 'Competitions' },
  { label: 'AegisIQ Static Security Analyzer', icon: Shield, color: '#818cf8', tag: 'Flagship Project' },
  { label: 'Active IEEE Member', icon: Layers, color: '#00b4d8', tag: 'Community' },
  { label: 'NEP Saarthi Ambassador', icon: Award, color: '#ec4899', tag: 'Leadership' },
  { label: 'Full Stack MERN & Spring Boot', icon: Code2, color: '#10b981', tag: 'Architecture' },
  { label: 'RAG & LLM Agents Builder', icon: Cpu, color: '#a855f7', tag: 'AI Systems' },
];

export default function DualSlidingMarquee() {
  // Duplicate arrays to create continuous infinite loops
  const doubleTech = [...TECH_TRACK, ...TECH_TRACK];
  const doubleHighlights = [...HIGHLIGHT_TRACK, ...HIGHLIGHT_TRACK];

  return (
    <div className="relative py-10 overflow-hidden border-y border-white/5 bg-gradient-to-b from-transparent via-[#06d6a0]/[0.02] to-transparent">
      {/* Background ambient glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Left and Right Edge Fade Gradients for Seamless Infinity Look */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-l from-[#0a0a0f] to-transparent" />

      <div className="marquee-wrapper flex flex-col gap-4">
        {/* ── TRACK 1: Right-to-Left Sliding ─────────────────────────────── */}
        <div className="flex items-center overflow-hidden">
          <div className="animate-slide-left flex items-center gap-3">
            {doubleTech.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`rtl-${item.name}-${idx}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium cursor-default shrink-0 group transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(18, 18, 28, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-gray-200 group-hover:text-white font-semibold transition-colors">
                    {item.name}
                  </span>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(255, 255, 255, 0.06)', color: item.color }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TRACK 2: Left-to-Right Sliding ─────────────────────────────── */}
        <div className="flex items-center overflow-hidden">
          <div className="animate-slide-right flex items-center gap-3">
            {doubleHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`ltr-${item.label}-${idx}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium cursor-default shrink-0 group transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(18, 18, 28, 0.85)',
                    border: `1px solid ${item.color}25`,
                    boxShadow: `0 4px 14px ${item.color}15`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" style={{ background: item.color }} />
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    <Icon size={13} />
                  </div>
                  <span className="text-white font-bold transition-colors">
                    {item.label}
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}35` }}
                  >
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
