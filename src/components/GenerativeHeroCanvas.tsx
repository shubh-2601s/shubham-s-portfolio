import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Grid, Disc3, MousePointerClick } from 'lucide-react';

type CanvasMode = 'constellation' | 'grid' | 'vortex';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
  angle?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  alpha: number;
}

const NEON_COLORS = [
  '#06d6a0', // emerald/mint
  '#38bdf8', // sky cyan
  '#818cf8', // electric indigo
  '#a78bfa', // soft purple
  '#2dd4bf', // teal
];

export default function GenerativeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<CanvasMode>('constellation');
  const [fps, setFps] = useState<number>(60);
  const [clickHint, setClickHint] = useState<boolean>(true);

  const modeRef = useRef<CanvasMode>(mode);
  modeRef.current = mode;

  const mouseRef = useRef<{
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    active: boolean;
  }>({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    active: false,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);

  // Trigger shockwave on user click/tap
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    shockwavesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 220,
      strength: 14,
      alpha: 1,
    });

    if (clickHint) setClickHint(false);
  }, [clickHint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let isVisible = true;
    let frameCount = 0;
    let fpsTimer = performance.now();

    // Resize handler with DevicePixelRatio for razor-sharp rendering
    const initSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    // Initialize particles based on canvas dimensions
    const initParticles = (width: number, height: number) => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 11000), 100);

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const distFromCenter = Math.random() * Math.min(width, height) * 0.45;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2.2 + 1.2,
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          alpha: Math.random() * 0.5 + 0.35,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseAngle: Math.random() * Math.PI * 2,
          angle,
          orbitRadius: distFromCenter,
          orbitSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    initSize();
    window.addEventListener('resize', initSize);

    // Track visibility to conserve battery when hero is out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouseRef.current.vx = currentX - mouseRef.current.prevX;
      mouseRef.current.vy = currentY - mouseRef.current.prevY;
      mouseRef.current.prevX = currentX;
      mouseRef.current.prevY = currentY;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.active = (
        currentX >= 0 &&
        currentX <= rect.width &&
        currentY >= 0 &&
        currentY <= rect.height
      );
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const currentMode = modeRef.current;
      const mouse = mouseRef.current;

      // FPS tracking
      frameCount++;
      if (time - fpsTimer > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)));
        frameCount = 0;
        fpsTimer = time;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Render shockwaves
      for (let sIdx = shockwavesRef.current.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwavesRef.current[sIdx];
        sw.radius += 4.5;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        // Draw glowing shockwave ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 214, 160, ${sw.alpha * 0.6})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#06d6a0';
        ctx.shadowBlur = 15;
        ctx.stroke();

        // Secondary ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Displace particles hit by shockwave
        particles.forEach((p) => {
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - sw.radius);
          if (diff < 35 && dist > 1) {
            const force = (1 - diff / 35) * sw.strength * sw.alpha;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        });

        if (sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(sIdx, 1);
        }
      }

      // Draw Cursor Ambient Aura
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          130
        );
        cursorGlow.addColorStop(0, 'rgba(6, 214, 160, 0.12)');
        cursorGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 130, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mode-specific physics & rendering
      if (currentMode === 'constellation') {
        // ── CONSTELLATION MODE ──
        particles.forEach((p) => {
          // Pulse size
          p.pulseAngle += p.pulseSpeed;
          const currentRadius = p.radius + Math.sin(p.pulseAngle) * 0.6;

          // Natural movement
          p.x += p.vx;
          p.y += p.vy;

          // Drag / damping
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Gentle re-centering if too slow
          if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.1;
          if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.1;

          // Boundary bounce with padding
          if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx); }
          if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx); }
          if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy); }
          if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy); }

          // Mouse physics: Repulsion + interactive laser beam
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 160;

            if (dist < maxDist && dist > 1) {
              const force = (1 - dist / maxDist) * 1.8;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;

              // Laser beam to cursor
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(6, 214, 160, ${0.4 * (1 - dist / maxDist)})`;
              ctx.lineWidth = 1.2 * (1 - dist / maxDist);
              ctx.stroke();
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        });

        // Inter-particle connection mesh
        const maxConnDist = 115;
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxConnDist) {
              const alpha = (1 - dist / maxConnDist) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
      } else if (currentMode === 'grid') {
        // ── CYBER DIGITAL GRID MODE ──
        const cols = 22;
        const rows = 14;
        const spacingX = width / cols;
        const spacingY = height / rows;

        ctx.strokeStyle = 'rgba(6, 214, 160, 0.08)';
        ctx.lineWidth = 1;

        // Draw warped grid lines & nodes
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          for (let c = 0; c <= cols; c++) {
            let gx = c * spacingX;
            let gy = r * spacingY;

            // Warp toward mouse or shockwave
            if (mouse.active) {
              const dx = gx - mouse.x;
              const dy = gy - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 180 && dist > 1) {
                const warp = Math.sin((dist / 180) * Math.PI) * 22;
                gx += (dx / dist) * warp;
                gy += (dy / dist) * warp;
              }
            }

            if (c === 0) ctx.moveTo(gx, gy);
            else ctx.lineTo(gx, gy);

            // Point dot
            if (c % 2 === 0 && r % 2 === 0) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = (r + c) % 4 === 0 ? '#38bdf8' : '#06d6a0';
              ctx.shadowColor = '#06d6a0';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.restore();
            }
          }
          ctx.stroke();
        }

        // Animated particles drifting along grid
        particles.slice(0, 30).forEach((p) => {
          p.x += p.vx * 1.5;
          p.y += p.vy * 1.5;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#06d6a0';
          ctx.shadowColor = '#06d6a0';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (currentMode === 'vortex') {
        // ── GRAVITY WELL / VORTEX MODE ──
        const centerX = mouse.active ? mouse.x : width / 2;
        const centerY = mouse.active ? mouse.y : height / 2;

        particles.forEach((p) => {
          if (p.angle === undefined) p.angle = Math.random() * Math.PI * 2;
          if (p.orbitRadius === undefined) p.orbitRadius = Math.random() * 260 + 40;
          if (p.orbitSpeed === undefined) p.orbitSpeed = 0.01;

          p.angle += p.orbitSpeed;
          const targetX = centerX + Math.cos(p.angle) * p.orbitRadius;
          const targetY = centerY + Math.sin(p.angle) * p.orbitRadius;

          p.x += (targetX - p.x) * 0.08;
          p.y += (targetY - p.y) * 0.08;

          // Draw orbital particle with comet tail
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Tail
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(
            p.x - Math.cos(p.angle + Math.PI / 2) * 14,
            p.y - Math.sin(p.angle + Math.PI / 2) * 14
          );
          ctx.strokeStyle = `${p.color}50`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', initSize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-crosshair select-none"
      style={{ zIndex: 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Interactive Controls HUD */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Mode Switcher Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-1 p-1 rounded-full glass shadow-glow"
          style={{
            background: 'rgba(15, 15, 26, 0.75)',
            border: '1px solid rgba(6, 214, 160, 0.25)',
          }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMode('constellation'); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              mode === 'constellation'
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
            title="Constellation Neural Mesh"
          >
            <Sparkles size={12} />
            <span className="hidden sm:inline">Constellation</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMode('grid'); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              mode === 'grid'
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
            title="Cyber Matrix Grid"
          >
            <Grid size={12} />
            <span className="hidden sm:inline">Cyber Grid</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMode('vortex'); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              mode === 'vortex'
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 font-bold shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
            title="Gravitational Vortex"
          >
            <Disc3 size={12} />
            <span className="hidden sm:inline">Vortex</span>
          </button>
        </motion.div>

        {/* Stats & Click Hint */}
        <AnimatePresence>
          {clickHint && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
              style={{
                background: 'rgba(6, 214, 160, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(6, 214, 160, 0.2)',
              }}
            >
              <MousePointerClick size={12} className="animate-bounce" />
              <span>Click anywhere to shockwave</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom FPS/Telemetry Badge */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider glass pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span style={{ color: 'var(--text-muted)' }}>GPU CANVAS:</span>
        <span style={{ color: 'var(--accent-primary)' }}>{fps} FPS</span>
        <span style={{ color: 'var(--text-muted)' }}>•</span>
        <span style={{ color: 'var(--accent-secondary)' }}>MODE: {mode.toUpperCase()}</span>
      </div>
    </div>
  );
}
