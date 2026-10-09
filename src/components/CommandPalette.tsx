import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  Mail,
  ExternalLink,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  X,
  Code2,
  Briefcase,
  Award,
  BookOpen,
  FileText,
  User,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/resumeData';
import { soundFX } from '../utils/soundFx';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  color?: string;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      soundFX.playLaser();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToast(msg);
    soundFX.playSuccess();
    setTimeout(() => setToast(null), 2500);
  };

  const scrollTo = (id: string) => {
    onClose();
    soundFX.playClick();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    showToast('Copied email to clipboard! 🎉');
  };

  const launchConfetti = () => {
    showToast('Confetti triggered! 🚀');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#06d6a0', '#38bdf8', '#7c3aed', '#f59e0b'],
    });
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-about', title: 'About Shubham', category: 'Navigation', icon: User, action: () => scrollTo('about') },
    { id: 'nav-skills', title: 'Technical Skills', category: 'Navigation', icon: Code2, action: () => scrollTo('skills') },
    { id: 'nav-projects', title: 'Featured Projects (AegisIQ & more)', category: 'Navigation', icon: Briefcase, action: () => scrollTo('projects') },
    { id: 'nav-experience', title: 'Experience & Career Timeline', category: 'Navigation', icon: Briefcase, action: () => scrollTo('experience') },
    { id: 'nav-achievements', title: 'Awards & Hackathon Wins', category: 'Navigation', icon: Award, action: () => scrollTo('achievements') },
    { id: 'nav-education', title: 'Education & Degree', category: 'Navigation', icon: BookOpen, action: () => scrollTo('education') },
    { id: 'nav-patents', title: 'Patents & Innovation (4 Published Applications)', category: 'Navigation', icon: FileText, action: () => scrollTo('patents') },
    { id: 'nav-contact', title: 'Contact Shubham', category: 'Navigation', icon: Mail, action: () => scrollTo('contact') },

    // Actions
    {
      id: 'act-resume',
      title: 'Download Resume (PDF)',
      category: 'Actions',
      icon: Download,
      color: '#06d6a0',
      action: () => {
        const link = document.createElement('a');
        link.href = '/Shubham_S_Resume.pdf';
        link.download = 'Shubham_S_Resume.pdf';
        link.click();
        showToast('Downloading resume...');
      },
    },
    { id: 'act-email', title: 'Copy Email Address', category: 'Actions', icon: Mail, color: '#38bdf8', action: copyEmail },
    { id: 'act-confetti', title: 'Celebrate with Confetti', category: 'Actions', icon: Sparkles, color: '#f59e0b', action: launchConfetti },
    { id: 'act-terminal', title: 'Open Hacker CLI Terminal', category: 'Actions', icon: Terminal, color: '#06d6a0', action: () => scrollTo('about') },
    {
      id: 'act-sound',
      title: `Toggle UI Sound Effects (${soundFX.enabled ? 'Enabled' : 'Disabled'})`,
      category: 'Actions',
      icon: soundFX.enabled ? Volume2 : VolumeX,
      color: '#7c3aed',
      action: () => {
        const state = soundFX.toggle();
        showToast(`Sound FX ${state ? 'Turned ON 🔊' : 'Muted 🔇'}`);
      },
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(personalInfo.github, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      soundFX.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      soundFX.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed top-8 z-[100000] px-4 py-2 rounded-xl glass shadow-glow text-xs font-semibold text-emerald-300 flex items-center gap-2 border border-emerald-500/30"
                style={{ background: 'rgba(10, 15, 25, 0.95)' }}
              >
                <Check size={14} className="text-emerald-400" />
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-2xl overflow-hidden glass shadow-glow-lg border"
            style={{
              background: 'rgba(13, 14, 24, 0.94)',
              borderColor: 'rgba(6, 214, 160, 0.3)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 40px rgba(6, 214, 160, 0.15)',
            }}
          >
            {/* Top Electric Laser Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, transparent, #06d6a0, #38bdf8, #ffffff, #06d6a0, transparent)',
                boxShadow: '0 0 14px rgba(6, 214, 160, 0.9)',
              }}
            />

            {/* Search Input Bar */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <Search size={18} className="text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search anything... (e.g. 'resume', 'skills', 'patents')"
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 focus:ring-0 p-0 font-sans"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Command Palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* List of Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  No matching commands found for <span className="text-gray-300">"{query}"</span>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-white font-semibold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={
                        isSelected
                          ? { border: '1px solid rgba(6, 214, 160, 0.35)', boxShadow: '0 0 15px rgba(6, 214, 160, 0.1)' }
                          : { border: '1px solid transparent' }
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: item.color ? `${item.color}15` : 'rgba(255, 255, 255, 0.06)',
                            color: item.color || '#06d6a0',
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <span className="text-sm">{item.title}</span>
                      </div>
                      <span
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div
              className="px-4 py-2.5 border-t flex items-center justify-between text-[11px] font-mono text-gray-400 select-none"
              style={{
                background: 'rgba(10, 10, 18, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">ESC</kbd>
                  Close
                </span>
              </div>
              <span className="text-emerald-400 font-bold">⚡ Spotlight</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
