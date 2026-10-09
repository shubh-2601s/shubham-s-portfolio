import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Search } from 'lucide-react';
import { personalInfo } from '../data/resumeData';
import { soundFX } from '../utils/soundFx';

interface NavbarProps {
  onOpenPalette?: () => void;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Patents', href: '#patents' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map(l => l.href.slice(1));
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-glow py-3'
            : 'bg-transparent py-5'
        }`}
        style={scrolled ? { borderBottom: '1px solid var(--border-subtle)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-glow"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: '#0a0a0f' }}
            >
              S
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
              {personalInfo.name}
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative py-1 text-xs font-semibold transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLaser"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, #06d6a0, #38bdf8)',
                        boxShadow: '0 0 10px #06d6a0, 0 0 18px #38bdf8',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenPalette && (
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onOpenPalette();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs font-semibold text-gray-300 hover:text-white transition-all hover:scale-105"
                style={{ border: '1px solid var(--border-subtle)' }}
                title="Search Commands (Ctrl+K)"
              >
                <Search size={14} className="text-emerald-400" />
                <span className="text-gray-300">Search</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-400 border border-emerald-500/30">
                  Ctrl+K
                </kbd>
              </button>
            )}

            <motion.a
              href="/Shubham_S_Resume.pdf"
              download="Shubham_S_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-xl overflow-hidden transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                color: '#0a0a0f',
                boxShadow: '0 0 20px rgba(6, 214, 160, 0.4), 0 0 35px rgba(56, 189, 248, 0.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-950 animate-ping" />
              <Download size={14} />
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass shadow-glow-lg flex flex-col pt-20 pb-8 px-6 lg:hidden"
            style={{ borderLeft: '1px solid var(--border-subtle)' }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-xl font-medium text-sm transition-all border-none cursor-pointer"
                  style={{
                    background: activeSection === link.href.slice(1)
                      ? 'rgba(6, 214, 160, 0.08)'
                      : 'transparent',
                    color: activeSection === link.href.slice(1)
                      ? 'var(--accent-primary)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/Shubham_S_Resume.pdf"
                download="Shubham_S_Resume.pdf"
                className="btn-primary mt-4 justify-center"
              >
                <Download size={15} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
