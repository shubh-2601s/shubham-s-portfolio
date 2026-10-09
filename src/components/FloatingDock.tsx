import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Volume2,
  VolumeX,
  ArrowUp,
  Terminal,
  Sparkles,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFx';
import { personalInfo } from '../data/resumeData';

export default function FloatingDock({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  const [soundActive, setSoundActive] = useState(soundFX.enabled);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = soundFX.toggle();
    setSoundActive(state);
  };

  const handleConfetti = () => {
    soundFX.playSuccess();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06d6a0', '#38bdf8', '#7c3aed', '#f59e0b'],
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-center gap-1.5 p-1.5 rounded-full glass shadow-glow-lg border"
        style={{
          background: 'rgba(15, 16, 28, 0.85)',
          borderColor: 'rgba(6, 214, 160, 0.3)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 25px rgba(6, 214, 160, 0.15)',
        }}
      >
        {/* Command Palette Button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onOpenPalette();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
          title="Open Command Palette (Ctrl+K)"
        >
          <Search size={14} className="text-emerald-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-400 border border-emerald-500/30">
            Ctrl+K
          </kbd>
        </button>

        <div className="h-4 w-px bg-white/10" />

        {/* Terminal Jump */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all hover:scale-110"
          title="Open Hacker Terminal"
        >
          <Terminal size={15} />
        </button>

        {/* Confetti Trigger */}
        <button
          type="button"
          onClick={handleConfetti}
          className="p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-white/10 transition-all hover:scale-110"
          title="Celebrate!"
        >
          <Sparkles size={15} />
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleSoundToggle}
          className={`p-2 rounded-full transition-all hover:scale-110 ${
            soundActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
          }`}
          title={soundActive ? 'Sound Effects Active' : 'Sound Effects Muted'}
        >
          {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        {/* Contact Email */}
        <a
          href={`mailto:${personalInfo.email}`}
          onClick={() => soundFX.playClick()}
          className="p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all hover:scale-110"
          title="Send Email"
        >
          <Mail size={15} />
        </a>

        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={() => {
                soundFX.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded-full text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all hover:scale-110 ml-0.5"
              title="Scroll to Top"
            >
              <ArrowUp size={15} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
