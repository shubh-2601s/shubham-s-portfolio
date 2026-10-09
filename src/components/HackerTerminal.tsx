import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, patents, projects, stats } from '../data/resumeData';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const COMMAND_HINTS = ['help', 'skills', 'patents', 'projects', 'sudo hire', 'clear'];

export default function HackerTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">✨ Shubham OS v2.5.0 (interactive-terminal)</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Type <span className="text-cyan-400 font-mono font-bold">help</span> or click the suggestion chips below to explore.
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06d6a0', '#38bdf8', '#7c3aed', '#f59e0b'],
    });
  };

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div><span className="text-cyan-400 font-semibold">bio</span> : Summary &amp; education</div>
              <div><span className="text-cyan-400 font-semibold">skills</span> : Tech stack &amp; tools</div>
              <div><span className="text-cyan-400 font-semibold">patents</span> : 4 published patents</div>
              <div><span className="text-cyan-400 font-semibold">projects</span> : Flagship engineering work</div>
              <div><span className="text-cyan-400 font-semibold">achievements</span> : Hackathons &amp; awards</div>
              <div><span className="text-cyan-400 font-semibold">contact</span> : Email, phone, socials</div>
              <div><span className="text-cyan-400 font-semibold">sudo hire</span> : 🎉 Initiate hire sequence</div>
              <div><span className="text-cyan-400 font-semibold">matrix</span> : Toggle digital rain mode</div>
              <div><span className="text-cyan-400 font-semibold">clear</span> : Clear screen</div>
            </div>
          </div>
        );
        break;

      case 'bio':
      case 'about':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">👤 {personalInfo.name} — {personalInfo.title}</p>
            <p style={{ color: 'var(--text-secondary)' }}>
              🎓 B.Tech Computer Science @ Vel Tech, Chennai (Class of 2027) • <span className="text-amber-400 font-bold">CGPA: 9.79</span>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              💼 AI Engineer Intern @ Siter Academy, Norway. Active IEEE Member &amp; NEP Saarthi Ambassador.
            </p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">🛠️ Core Engineering Stack:</p>
            <div className="space-y-1 pl-2">
              <p><span className="text-cyan-400 font-bold">Languages:</span> Java (Core + Adv), Python, JavaScript, TypeScript, C, SQL</p>
              <p><span className="text-cyan-400 font-bold">Web &amp; Backend:</span> React, Node.js, Express, Spring Boot, Tailwind CSS, REST APIs</p>
              <p><span className="text-cyan-400 font-bold">AI / ML:</span> TensorFlow, PyTorch, Scikit-learn, OpenCV, HuggingFace, RAG, Ollama</p>
              <p><span className="text-cyan-400 font-bold">Database &amp; Tools:</span> MongoDB, PostgreSQL, MySQL, Git, Docker, Linux, Postman</p>
            </div>
          </div>
        );
        break;

      case 'patents':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-semibold">📜 4 Published Patent Applications (Indian Patent Office · Co-Inventor):</p>
            <div className="space-y-2 pl-2">
              {patents.map((p, i) => (
                <div key={p.id} className="border-l-2 border-emerald-500/40 pl-2 py-0.5">
                  <div className="text-amber-300 font-bold">[{i + 1}] {p.title}</div>
                  <div className="text-[11px] text-gray-300 flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                    <span className="text-cyan-400 font-mono">App No: {p.applicationNumber}</span>
                    <span className="text-purple-300">• {p.shortDomain}</span>
                    <span className="text-emerald-300">• {p.status}</span>
                    <span className="text-gray-400">• Published: {p.publicationDate}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 italic mt-0.5">{p.summary}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-semibold">🚀 Flagship Featured Projects:</p>
            <div className="space-y-1.5 pl-2">
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="border-l-2 border-cyan-500/40 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{proj.title}</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 rounded">{proj.category}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{proj.description}</p>
                  <p className="text-[10px] text-emerald-400/80">Tech: {proj.technologies.slice(0, 4).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'achievements':
      case 'awards':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">🏆 Key Honors &amp; Metrics:</p>
            <div className="space-y-1 pl-2">
              {stats.map((s) => (
                <p key={s.label}>
                  <span>{s.icon} </span>
                  <span className="text-amber-300 font-bold">{s.value}{s.suffix}</span>
                  <span className="text-gray-300"> — {s.label}</span>
                </p>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">📬 Contact Shubham:</p>
            <p>📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline">{personalInfo.email}</a></p>
            <p>📱 Phone: <span className="text-gray-300">{personalInfo.phone}</span></p>
            <p>📍 Location: <span className="text-gray-300">{personalInfo.location}</span></p>
            <p>🐙 GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{personalInfo.github}</a></p>
            <p>💼 LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{personalInfo.linkedin}</a></p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
      case 'sudo hire shubham':
        triggerCelebration();
        outputNode = (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-2">
            <p className="text-emerald-300 font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> Hire Sequence Initiated! 🎉
            </p>
            <p className="text-gray-300">
              Outstanding decision. Shubham is available for Software Engineering Internships and Full-Time roles.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={`mailto:${personalInfo.email}?subject=Interview%20Opportunity%20-%20Software%20Engineer`}
                className="px-3 py-1 bg-emerald-500 text-gray-950 font-bold rounded hover:bg-emerald-400 transition-colors inline-block"
              >
                Send Email Offer ✉️
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(personalInfo.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1 bg-gray-800 text-gray-200 border border-gray-700 rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>
        );
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        outputNode = (
          <p className="text-xs text-emerald-400 font-mono">
            {isMatrixActive ? '⛔ Matrix Digital Rain deactivated.' : '🟢 Matrix Digital Rain activated. Welcome to the construct.'}
          </p>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      default:
        outputNode = (
          <p className="text-xs text-rose-400 font-mono">
            Command not found: <span className="text-white font-bold">{raw}</span>. Type <span className="text-cyan-400 font-bold cursor-pointer underline" onClick={() => handleCommand('help')}>help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: raw, output: outputNode }]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx < commandHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-glow-lg flex flex-col font-mono text-xs border"
      style={{
        background: 'rgba(10, 10, 18, 0.95)',
        borderColor: 'rgba(6, 214, 160, 0.25)',
        minHeight: '380px',
        maxHeight: '440px',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix digital rain effect overlay if active */}
      {isMatrixActive && (
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden font-mono text-[10px] text-emerald-400 select-none flex justify-around">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-1" style={{ animationDuration: `${(i % 3) + 1.2}s` }}>
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j}>{String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Terminal Header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between border-b select-none shrink-0"
        style={{
          background: 'rgba(18, 18, 30, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
          <span className="text-[11px] font-mono text-gray-400 ml-2 flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-emerald-400" />
            shubham@portfolio:~ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
        <AnimatePresence>
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-cyan-400 font-bold">~</span>
                <span className="text-gray-200">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Prompt Input Line */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-cyan-400 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs focus:ring-0 p-0"
            placeholder="type 'help' or command..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div
        className="px-4 py-2 border-t flex flex-wrap items-center gap-1.5 shrink-0"
        style={{
          background: 'rgba(15, 15, 26, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
        }}
      >
        <span className="text-[10px] text-gray-400 font-mono mr-1">Quick Run:</span>
        {COMMAND_HINTS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 rounded text-[10px] font-mono transition-all hover:scale-105 active:scale-95"
            style={{
              background: cmd === 'sudo hire' ? 'rgba(6, 214, 160, 0.18)' : 'rgba(255, 255, 255, 0.05)',
              color: cmd === 'sudo hire' ? '#06d6a0' : '#94a3b8',
              border: `1px solid ${cmd === 'sudo hire' ? 'rgba(6, 214, 160, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
