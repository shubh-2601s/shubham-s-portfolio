import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { patents } from '../data/resumeData';
import {
  FileText,
  CheckCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Building2,
  Sparkles,
  Info,
  X,
} from 'lucide-react';
import { soundFX } from '../utils/soundFx';

type PatentType = (typeof patents)[number];

export default function Patents() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeModalPatent, setActiveModalPatent] = useState<PatentType | null>(null);

  const handleCopyAppNo = (patent: PatentType, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(patent.applicationNumber);
    setCopiedId(patent.id);
    soundFX.playSuccess();
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const toggleExpand = (id: number) => {
    soundFX.playClick();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openModal = (patent: PatentType, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playClick();
    setActiveModalPatent(patent);
  };

  const closeModal = () => {
    soundFX.playClick();
    setActiveModalPatent(null);
  };

  return (
    <section
      id="patents"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #06d6a0, transparent)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', filter: 'blur(60px)' }}
        />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-tag inline-flex items-center gap-1.5 mx-auto">
            <Sparkles size={13} className="text-emerald-400" /> Intellectual Property &amp; Research
          </div>

          <h2 className="section-title mt-2">
            Patents &amp; <span className="text-gradient">Innovation</span>
          </h2>
          <div className="section-laser-divider" />
          <p className="section-subtitle mx-auto text-center max-w-2xl">
            Four published Indian patent applications spanning AI, precision agriculture, biomedical engineering, and cybersecurity.
          </p>

          {/* Official Indian Patent Office status badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full text-xs font-mono border"
            style={{
              background: 'rgba(6, 214, 160, 0.08)',
              borderColor: 'rgba(6, 214, 160, 0.25)',
              color: 'var(--text-secondary)',
            }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Indian Patent Office (IPO) Filings</span>
            <span className="text-gray-500">•</span>
            <span className="text-emerald-400 font-semibold">Co-Inventor</span>
          </div>
        </motion.div>

        {/* Patents Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {patents.map((patent, idx) => {
            const isExpanded = expandedId === patent.id;
            const isCopied = copiedId === patent.id;
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={patent.id}
                initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                className="relative rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${patent.color}12 0%, transparent 70%)`,
                  }}
                />

                {/* Top Electric Laser Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${patent.color}, #ffffff, ${patent.color}, transparent)`,
                    boxShadow: `0 0 12px ${patent.color}`,
                  }}
                />

                {/* Header Row */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-lg relative"
                    style={{
                      background: `${patent.color}15`,
                      border: `1px solid ${patent.color}40`,
                      boxShadow: `0 0 18px ${patent.color}25`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full absolute -top-1 -right-1 animate-ping pointer-events-none"
                      style={{ background: patent.color }}
                    />
                    {patent.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                        style={{
                          background: `${patent.color}18`,
                          color: patent.color,
                          border: `1px solid ${patent.color}35`,
                        }}
                      >
                        {patent.domain}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/25">
                        <CheckCircle size={10} /> Published
                      </span>
                    </div>

                    <h3
                      className="text-base sm:text-lg font-bold leading-snug group-hover:text-white transition-colors"
                      style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}
                    >
                      {patent.shortTitle}
                    </h3>
                  </div>
                </div>

                {/* Application Metadata Pill Strip */}
                <div
                  className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border text-xs font-mono"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-sans font-semibold">
                      App No:
                    </span>
                    <span className="font-bold text-xs" style={{ color: patent.color }}>
                      {patent.applicationNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyAppNo(patent, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-all"
                      style={{
                        background: isCopied ? 'rgba(6, 214, 160, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${isCopied ? 'rgba(6, 214, 160, 0.5)' : 'var(--border-subtle)'}`,
                        color: isCopied ? '#06d6a0' : 'var(--text-secondary)',
                      }}
                      title="Copy application number to search on IPO portal"
                    >
                      {isCopied ? (
                        <>
                          <Check size={11} className="text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy App No.
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-gray-500 font-sans hidden sm:inline">
                      • {patent.publicationDate}
                    </span>
                  </div>
                </div>

                {/* Concise Summary */}
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {patent.summary}
                </p>

                {/* Applicant info */}
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  <Building2 size={12} className="shrink-0 text-gray-400" />
                  <span className="truncate">
                    Applicant: <span style={{ color: 'var(--text-secondary)' }}>{patent.applicant}</span>
                  </span>
                </div>

                {/* Expandable Technical Highlights & Full Abstract */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden space-y-3 pt-3"
                      style={{ borderTop: '1px dashed var(--border-subtle)' }}
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                          style={{ color: patent.color }}>
                          <Sparkles size={12} /> Key Technical Highlights
                        </h4>
                        <ul className="space-y-1.5">
                          {patent.highlights.map((h, i) => (
                            <li key={i} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ background: patent.color }}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg text-xs leading-relaxed"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        <span className="font-semibold text-gray-300 block mb-1">Full Patent Title:</span>
                        <p className="italic text-[11px] mb-2">{patent.title}</p>
                        <span className="font-semibold text-gray-300 block mb-1">Technical Abstract:</span>
                        <p className="text-[11px] leading-relaxed">{patent.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Actions */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-auto"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(patent.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: patent.color }}
                  >
                    {isExpanded ? (
                      <>
                        Hide Highlights <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        View Technical Highlights <ChevronDown size={14} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => openModal(patent, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-white/10"
                      style={{
                        background: `${patent.color}18`,
                        border: `1px solid ${patent.color}45`,
                        color: patent.color,
                      }}
                      title="View full patent disclosure summary"
                    >
                      <Info size={13} /> Full Disclosure
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
          {[
            { icon: '📜', label: 'Published Patent Applications', value: '4' },
            { icon: '🦴', label: 'Biomedical & Biomaterials', value: '1' },
            { icon: '🌾', label: 'Precision Ag & UAV Imaging', value: '1' },
            { icon: '🚦', label: 'Edge AI & Incident Detection', value: '1' },
            { icon: '🔐', label: 'Thermal Entropy Cybersecurity', value: '1' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-xl font-black text-gradient">{value}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Patent Detail Modal */}
      <AnimatePresence>
        {activeModalPatent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 flex flex-col gap-5 border shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: activeModalPatent.color }}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 pr-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{
                    background: `${activeModalPatent.color}20`,
                    border: `1px solid ${activeModalPatent.color}50`,
                  }}
                >
                  {activeModalPatent.icon}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${activeModalPatent.color}20`,
                        color: activeModalPatent.color,
                      }}
                    >
                      {activeModalPatent.domain}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/25">
                      Published Application
                    </span>
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold leading-snug"
                    style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}
                  >
                    {activeModalPatent.title}
                  </h3>
                </div>
              </div>

              {/* Filing Info Card */}
              <div
                className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-xl text-xs font-mono border"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div>
                  <span className="text-gray-400 block text-[10px] font-sans">APPLICATION NUMBER</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-white text-sm">{activeModalPatent.applicationNumber}</span>
                    <button
                      type="button"
                      onClick={(e) => handleCopyAppNo(activeModalPatent, e)}
                      className="px-2 py-0.5 rounded text-[10px] font-sans bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {copiedId === activeModalPatent.id ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] font-sans">PUBLICATION DATE</span>
                  <span className="font-semibold text-white mt-0.5 block">{activeModalPatent.publicationDate}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-[10px] font-sans">APPLICANT INSTITUTION</span>
                  <span className="text-gray-300 mt-0.5 block font-sans text-xs">{activeModalPatent.applicant}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-[10px] font-sans">INVENTOR STATUS</span>
                  <span className="text-emerald-400 font-bold font-sans text-xs">
                    Co-Inventor · Contributed to Research &amp; Methodology
                  </span>
                </div>
              </div>

              {/* Technical Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                  <FileText size={14} className="text-cyan-400" /> Full Abstract
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {activeModalPatent.description}
                </p>
              </div>

              {/* Key Technical Highlights */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
                  style={{ color: activeModalPatent.color }}
                >
                  <Sparkles size={14} /> Key Technical Highlights
                </h4>
                <ul className="space-y-2">
                  {activeModalPatent.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm flex items-start gap-2.5 p-2 rounded-lg"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                    >
                      <CheckCircle
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: activeModalPatent.color }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* IPO Verification note & Self-contained Verification */}
              <div
                className="p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3"
                style={{
                  background: 'rgba(6, 214, 160, 0.05)',
                  borderColor: 'rgba(6, 214, 160, 0.2)',
                }}
              >
                <div className="text-xs text-gray-300">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle size={14} /> Official Indian Patent Office (IPO) Publication
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Filed under Application No: <code className="text-emerald-300 bg-black/40 px-1.5 py-0.5 rounded font-mono font-bold">{activeModalPatent.applicationNumber}</code>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleCopyAppNo(activeModalPatent, e)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-transform hover:scale-105"
                  style={{
                    background: activeModalPatent.color,
                    color: '#000000',
                  }}
                >
                  {copiedId === activeModalPatent.id ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy App No.
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}