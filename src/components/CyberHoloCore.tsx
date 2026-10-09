import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/soundFx';
import {
  FileText,
  Award,
  Shield,
  Cpu,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { patents, achievements, marqueeProject } from '../data/resumeData';

type TabKey = 'patents' | 'awards' | 'aegis' | 'stack';

interface TabItem {
  key: TabKey;
  label: string;
  icon: typeof FileText;
  color: string;
  badge: string;
}

const TABS: TabItem[] = [
  { key: 'patents', label: '4 Patents', icon: FileText, color: '#06d6a0', badge: 'IPO FILED' },
  { key: 'awards', label: 'Awards', icon: Award, color: '#f59e0b', badge: '#1 HACKATHONS' },
  { key: 'aegis', label: 'AegisIQ', icon: Shield, color: '#38bdf8', badge: 'FLAGSHIP' },
  { key: 'stack', label: 'Stack', icon: Cpu, color: '#a855f7', badge: '9.79 CGPA' },
];

export default function CyberHoloCore() {
  const [activeTab, setActiveTab] = useState<TabKey>('patents');
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentTabConfig = TABS.find((t) => t.key === activeTab) || TABS[0];

  // 3D Wireframe Polyhedron & Particle Swarm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleX = 0;
    let angleY = 0;

    // Dual-Cube Tesseract Vertices
    const vertices = [
      // Outer Cube
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      // Inner Cube
      [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],
      [0, 8], [1, 9], [2, 10], [3, 11],
      [4, 12], [5, 13], [6, 14], [7, 15],
    ];

    // Orbital particles
    const particles = Array.from({ length: 36 }, (_, i) => ({
      angle: (i / 36) * Math.PI * 2,
      radius: 65 + Math.random() * 30,
      speed: (0.012 + Math.random() * 0.012) * (i % 2 === 0 ? 1 : -1),
      yOffset: (Math.random() - 0.5) * 35,
      size: 1 + Math.random() * 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = isOverclocked ? 48 : 42;
      const speed = isOverclocked ? 0.04 : 0.012;

      angleX += speed + mousePos.y * 0.0003;
      angleY += speed * 1.3 + mousePos.x * 0.0003;

      // Project vertices
      const projected = vertices.map(([vx, vy, vz]) => {
        let y1 = vy * Math.cos(angleX) - vz * Math.sin(angleX);
        let z1 = vy * Math.sin(angleX) + vz * Math.cos(angleX);
        let x2 = vx * Math.cos(angleY) + z1 * Math.sin(angleY);
        let z2 = -vx * Math.sin(angleY) + z1 * Math.cos(angleY);

        const fov = 3.5;
        const pz = z2 + fov;
        const px = cx + (x2 / pz) * scale * 2.8;
        const py = cy + (y1 / pz) * scale * 2.8;
        return [px, py];
      });

      // Draw Orbiting Particles
      particles.forEach((p) => {
        p.angle += p.speed * (isOverclocked ? 2.5 : 1);
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * (p.radius * 0.4) + p.yOffset;

        ctx.fillStyle = currentTabConfig.color;
        ctx.shadowColor = currentTabConfig.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw wireframe edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.strokeStyle = currentTabConfig.color;
        ctx.lineWidth = isOverclocked ? 1.6 : 1.1;
        ctx.shadowColor = currentTabConfig.color;
        ctx.shadowBlur = isOverclocked ? 12 : 6;
        ctx.stroke();
      });

      // Draw nodes
      projected.forEach(([px, py], idx) => {
        const isInner = idx >= 8;
        ctx.beginPath();
        ctx.arc(px, py, isInner ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isInner ? '#ffffff' : currentTabConfig.color;
        ctx.shadowColor = currentTabConfig.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Central glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, isOverclocked ? 40 : 25);
      glowGrad.addColorStop(0, '#ffffff');
      glowGrad.addColorStop(0.3, currentTabConfig.color);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, isOverclocked ? 40 : 25, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentTabConfig.color, isOverclocked, mousePos]);

  // Mouse Parallax on Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Overclock Trigger
  const triggerOverclock = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playLaser();
    setIsOverclocked(true);
    setTimeout(() => {
      setIsOverclocked(false);
    }, 2800);
  };

  const handleTabSwitch = (key: TabKey) => {
    soundFX.playClick();
    setActiveTab(key);
  };

  const scrollToSection = (id: string) => {
    soundFX.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax Tilt Values
  const tiltX = (mousePos.y / 200) * -6;
  const tiltY = (mousePos.x / 200) * 6;

  return (
    <div className="w-full max-w-[480px] mx-auto select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.15s ease-out',
          background: 'rgba(15, 16, 28, 0.92)',
          borderColor: isOverclocked ? currentTabConfig.color : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isOverclocked
            ? `0 20px 50px rgba(0,0,0,0.7), 0 0 35px ${currentTabConfig.color}40`
            : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(6, 214, 160, 0.1)',
        }}
        className="relative rounded-3xl border backdrop-blur-2xl p-5 sm:p-6 overflow-hidden transition-colors duration-500"
      >
        {/* Top Electric Laser Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
          style={{
            background: `linear-gradient(90deg, transparent, ${currentTabConfig.color}, #ffffff, ${currentTabConfig.color}, transparent)`,
            boxShadow: `0 0 15px ${currentTabConfig.color}`,
          }}
        />

        {/* ── Header Row: Title & Overclock button ── */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ background: currentTabConfig.color }}
            />
            <span
              className="text-xs font-mono font-bold tracking-wider uppercase"
              style={{ color: currentTabConfig.color }}
            >
              ENGINEERING RADAR
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
              {currentTabConfig.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={triggerOverclock}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: isOverclocked ? `${currentTabConfig.color}30` : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isOverclocked ? currentTabConfig.color : 'var(--border-subtle)'}`,
              color: isOverclocked ? currentTabConfig.color : 'var(--text-secondary)',
              boxShadow: isOverclocked ? `0 0 15px ${currentTabConfig.color}40` : 'none',
            }}
            title="Click to trigger overclock energy pulse"
          >
            <Zap size={11} className={isOverclocked ? 'animate-bounce' : ''} />
            <span>{isOverclocked ? 'OVERCLOCKED' : 'SURGE'}</span>
          </button>
        </div>

        {/* ── 4 Interactive Showcase Tabs ── */}
        <div
          className="grid grid-cols-4 gap-1 p-1 rounded-xl mb-4 border"
          style={{
            background: 'rgba(10, 11, 20, 0.75)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabSwitch(tab.key)}
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: isActive ? `${tab.color}20` : 'transparent',
                  color: isActive ? tab.color : 'var(--text-muted)',
                  border: isActive ? `1px solid ${tab.color}40` : '1px solid transparent',
                  boxShadow: isActive ? `0 0 15px ${tab.color}25` : 'none',
                }}
              >
                <Icon size={13} />
                <span className="text-[11px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Middle: 3D Holographic Core Canvas & Radar Graphic ── */}
        <div
          onClick={triggerOverclock}
          className="relative h-36 sm:h-40 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer group mb-4 border"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(20, 22, 38, 0.95) 0%, rgba(10, 11, 20, 0.98) 100%)',
            borderColor: 'var(--border-subtle)',
          }}
          title="Click to pulse energy core"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${currentTabConfig.color}15 0%, transparent 70%)`,
              opacity: isOverclocked ? 1 : 0.6,
            }}
          />

          {/* Radar Sweep Arc */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: isOverclocked ? 2 : 7, repeat: Infinity, ease: 'linear' }}
            className="absolute w-52 h-52 rounded-full pointer-events-none opacity-20"
            style={{
              background: `conic-gradient(from 0deg, transparent 75%, ${currentTabConfig.color} 100%)`,
            }}
          />

          {/* 3D Wireframe Canvas */}
          <canvas
            ref={canvasRef}
            width={320}
            height={200}
            className="w-full h-full relative z-10 pointer-events-none"
          />

          {/* Center Pill */}
          <div
            className="absolute bottom-2 z-20 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest border backdrop-blur-md"
            style={{
              background: 'rgba(10, 11, 20, 0.85)',
              borderColor: `${currentTabConfig.color}40`,
              color: currentTabConfig.color,
            }}
          >
            {isOverclocked ? '⚡ SURGE ACTIVE [999%]' : '● INTERACTIVE 3D HOLO-CORE'}
          </div>
        </div>

        {/* ── Tab Content: Useful, Catchy Real Details ── */}
        <div
          className="rounded-xl p-3.5 sm:p-4 border relative overflow-hidden"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'patents' && (
              <motion.div
                key="patents"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText size={14} className="text-emerald-400" />
                    4 Published Patent Applications (IPO)
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Co-Inventor</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {patents.map((p) => (
                    <div
                      key={p.id}
                      className="p-2 rounded-lg border border-white/5 bg-black/20 hover:border-emerald-400/30 transition-colors"
                    >
                      <div className="font-semibold text-gray-200 line-clamp-1">{p.shortTitle}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{p.applicationNumber}</div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('patents')}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(6, 214, 160, 0.15)',
                    color: '#06d6a0',
                    border: '1px solid rgba(6, 214, 160, 0.35)',
                  }}
                >
                  <span>Explore Full Patents &amp; Innovations</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <motion.div
                key="awards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award size={14} className="text-amber-400" />
                    National Hackathons &amp; Academic Honors
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">5+ WINS</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {achievements.slice(0, 3).map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-1.5 rounded-lg border border-white/5 bg-black/20"
                    >
                      <span className="font-medium text-gray-200 truncate pr-2">
                        {a.icon} {a.title}
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 shrink-0">{a.org}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('achievements')}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                  }}
                >
                  <span>View All 9+ Awards &amp; Wins</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}

            {activeTab === 'aegis' && (
              <motion.div
                key="aegis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Shield size={14} className="text-sky-400" />
                    {marqueeProject.title} — Static Code Security Analyzer
                  </h4>
                  <span className="text-[10px] font-mono text-sky-400 font-bold">7 ADRs</span>
                </div>

                <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">
                  {marqueeProject.tagline}
                </p>

                <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                  {marqueeProject.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                  }}
                >
                  <span>Inspect AegisIQ Architecture</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}

            {activeTab === 'stack' && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Cpu size={14} className="text-purple-400" />
                    Core Stack &amp; Academic Distinction
                  </h4>
                  <span className="text-[10px] font-mono text-purple-400 font-bold">9.79 CGPA</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-purple-300 font-semibold block">Backend Core</span>
                    <span className="text-gray-300 text-[10px]">Java 21 · Spring Boot · REST</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-emerald-300 font-semibold block">AI &amp; Vision</span>
                    <span className="text-gray-300 text-[10px]">Python · OpenCV · LLMs</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-sky-300 font-semibold block">Full Stack Web</span>
                    <span className="text-gray-300 text-[10px]">React · Angular · TypeScript</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-amber-300 font-semibold block">Data &amp; Infra</span>
                    <span className="text-gray-300 text-[10px]">MySQL · MongoDB · Docker</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('skills')}
                  className="w-full mt-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                  style={{
                    background: 'rgba(168, 85, 247, 0.15)',
                    color: '#c084fc',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                  }}
                >
                  <span>Explore Full 20+ Skills Matrix</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom Metric Pills Strip ── */}
        <div
          className="grid grid-cols-3 gap-2 mt-4 pt-3 text-center border-t text-xs font-mono"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-black text-emerald-400">4 Published</span>
            <span className="text-[10px] text-gray-400 font-sans">Patents Filed</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/5">
            <span className="text-xs sm:text-sm font-black text-amber-400">9.79</span>
            <span className="text-[10px] text-gray-400 font-sans">University CGPA</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-black text-sky-400">5+ Wins</span>
            <span className="text-[10px] text-gray-400 font-sans">Hackathons</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
