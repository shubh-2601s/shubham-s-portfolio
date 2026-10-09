import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { ArrowUp, Download, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/resumeData';

const quickLinks = [
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

const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: SiLeetcode, href: personalInfo.leetcode, label: 'LeetCode' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden pt-16 pb-8" style={{ background: 'var(--bg-secondary)' }}>
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      {/* Electric Laser Top Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, #ffffff, #06d6a0, transparent)',
          boxShadow: '0 0 15px rgba(6, 214, 160, 0.8), 0 0 30px rgba(56, 189, 248, 0.5)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-glow"
                style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: '#0a0a0f' }}>S</div>
              <span className="font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              B.Tech CSE Student | Software Engineer | Full Stack Developer | AI/ML Enthusiast.
              Building scalable solutions and winning hackathons from Chennai, Tamil Nadu.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                  }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2 group"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'var(--accent-primary)' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Resume */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>Get in Touch</h4>
            <div className="space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                <Mail size={14} />
                {personalInfo.email}
              </a>
              <div className="pt-2">
                <a
                  href="/Shubham_S_Resume.pdf"
                  download="Shubham_S_Resume.pdf"
                  className="btn-primary inline-flex text-xs py-2.5 px-4"
                >
                  <Download size={13} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'var(--border-subtle)' }} />

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {personalInfo.name}. Made with
            <Heart size={12} className="text-red-500 fill-red-500" />
            in Chennai.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            Built with React + TypeScript + Vite + Tailwind CSS + Framer Motion
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center shadow-glow-lg transition-all"
        style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: '#0a0a0f' }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
