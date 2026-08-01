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
    <footer className="relative overflow-hidden pt-16 pb-8" style={{ background: '#0f172a' }}>
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2563eb, #60a5fa, #2563eb, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}>S</div>
              <span className="text-white font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {personalInfo.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
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
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-blue-500 hover:bg-blue-600/20"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Resume */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Get in Touch</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail size={14} />
                {personalInfo.email}
              </a>
              <div className="pt-2">
                <a
                  href="/Shubham_S_Resume.pdf"
                  download="Shubham_S_Resume.pdf"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Download size={13} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-500 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} {personalInfo.name}. Made with
            <Heart size={12} className="text-red-500 fill-red-500" />
            in Chennai.
          </p>
          <p className="text-slate-600 text-xs">
            Built with React + TypeScript + Vite + Tailwind CSS + Framer Motion
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25 transition-all"
        style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
