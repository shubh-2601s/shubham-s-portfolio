import { useEffect, useState } from 'react';
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
    <span className="text-gradient text-2xl sm:text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

import GenerativeHeroCanvas from './GenerativeHeroCanvas';
import CyberHoloCore from './CyberHoloCore';

// ── Social Links ─────────────────────────────────────────────────────────────
const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub', color: 'var(--text-primary)' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', color: 'var(--accent-primary)' },
  { icon: SiLeetcode, href: personalInfo.leetcode, label: 'LeetCode', color: '#f89f1b' },
];

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      <GenerativeHeroCanvas />

      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 right-10 w-72 h-72 rounded-full float"
          style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.15) 0%, transparent 70%)', opacity: 0.5 }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full float-delay"
          style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)', opacity: 0.4 }} />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-2xl float"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,214,160,0.2))', transform: 'rotate(15deg)', opacity: 0.3 }} />
        <div className="absolute inset-0 dot-pattern"
          style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)', opacity: 0.4 }} />
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
            className="section-tag mb-6 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Open to Internships &amp; Full-Time Roles
          </motion.div>

          <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-3"
            style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
            Hi, I'm{' '}
            <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>Shubham S</span>
          </h1>

          <div className="mb-6 min-h-[50px] flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 tracking-wider shrink-0 shadow-sm">
              &gt;_ ROLE
            </span>
            <TypingText />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
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
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Find me on</span>
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
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all"
                  style={{ color, border: '1px solid var(--border-subtle)' }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Holographic Cyber Core (Badass Interactive Engine) ── */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center lg:justify-end w-full"
        >
          <CyberHoloCore />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={18} style={{ color: 'var(--accent-primary)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
