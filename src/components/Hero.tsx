import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, ExternalLink, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { personalInfo } from '../data/resumeData';

const ROLES = personalInfo.roles;

// ── Typing Animation ─────────────────────────────────────────────────────────
function TypingText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    const fullText = ROLES[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < fullText.length) {
          setDisplayed(fullText.slice(0, displayed.length + 1));
          setSpeed(70);
        } else {
          setSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(fullText.slice(0, displayed.length - 1));
          setSpeed(35);
        } else {
          setIsDeleting(false);
          setCurrentRole((c) => (c + 1) % ROLES.length);
          setSpeed(300);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole, speed]);

  return (
    <span className="text-gradient text-3xl sm:text-4xl lg:text-5xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

// ── Particle Canvas ───────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; opacity: number; }> = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1, opacity: Math.random() * 0.45 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />;
}

// ── Social Links ─────────────────────────────────────────────────────────────
const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub', color: '#0f172a' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#2563eb' },
  { icon: SiLeetcode, href: personalInfo.leetcode, label: 'LeetCode', color: '#f89f1b' },
];

// ── Profile Photo Placeholder ─────────────────────────────────────────────────
function ProfilePhoto() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: 'calc(100% + 20px)', height: 'calc(100% + 20px)',
          background: 'conic-gradient(from 0deg, transparent 40%, #2563eb 60%, #60a5fa 80%, transparent 90%)',
        }}
      />
      {/* Pulse glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)' }}
      />
      {/* Main circle */}
      <div
        className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] rounded-full border-4 border-white shadow-blue-lg overflow-hidden flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)' }}
      >
        {/* Photo placeholder — replace src with actual photo */}
        <img
          src="/profile-photo.jpg"
          alt="Shubham S"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 flex-col items-center justify-center"
          style={{ display: 'flex' }}
          id="photo-fallback"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-xl mb-3"
            style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}
          >
            S
          </motion.div>
          <span className="text-slate-600 text-sm font-semibold">Your Photo</span>
          <span className="text-blue-400 text-xs mt-1 text-center px-4">Replace with → public/profile-photo.jpg</span>
        </div>

        {/* Overlay shimmer at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(219,234,254,0.5), transparent)' }}
        />
      </div>

      {/* Floating Skill Badges around the photo */}
      {[
        { label: '☕ Java', top: '2%', left: '-14%', delay: 0 },
        { label: '🍃 Spring Boot', top: '22%', right: '-20%', delay: 0.2 },
        { label: '🤖 AI / ML', bottom: '22%', right: '-18%', delay: 0.4 },
        { label: '⚛️ React', bottom: '2%', left: '-12%', delay: 0.6 },
      ].map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + badge.delay, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          className="absolute glass rounded-xl px-3 py-2 shadow-blue text-xs font-semibold text-blue-700 border border-blue-100 cursor-default"
          style={{ top: (badge as any).top, left: (badge as any).left, right: (badge as any).right, bottom: (badge as any).bottom }}
        >
          {badge.label}
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      <ParticleField />

      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 right-10 w-72 h-72 rounded-full float opacity-15"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full float-delay opacity-10"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-2xl float opacity-8"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', transform: 'rotate(15deg)' }} />
        <div className="absolute inset-0 dot-pattern opacity-25"
          style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-tag mb-6"
          >
            <span>✨</span>
            Open to Internships & Full-Time Roles
          </motion.div>

          <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl text-slate-900 leading-tight mb-3"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Hi, I'm{' '}
            <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>Shubham S</span>
          </h1>

          <div className="mb-6 min-h-[60px] flex items-center">
            <TypingText />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Projects <ExternalLink size={16} />
            </motion.button>
            <motion.a
              href="/Shubham_S_Resume.pdf"
              download="Shubham_S_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              <Download size={16} /> Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="text-slate-400 text-sm font-medium">Find me on</span>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center shadow-sm transition-shadow hover:shadow-blue border border-slate-200/60"
                  style={{ color }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Profile Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <ProfilePhoto />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={18} className="text-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
