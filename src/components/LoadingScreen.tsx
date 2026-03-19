import React, { useEffect, useRef } from 'react';
import dragonVideo from '../assets/Dragon_Animation_To_Black_Hole_Landing - Trim (1).mp4';

// ─── Pre-compute star positions at module level (never re-computed) ───────────
const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${(i * 17.3 + 11) % 100}%`,
  top:  `${(i * 13.7 + 7)  % 100}%`,
  size: 1 + (i % 3) * 0.6,
  dur:  2 + (i % 5) * 0.7,
  delay: `${(i % 30) * 0.1}s`,
}));

interface LoadingScreenProps { onComplete: () => void; }

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const circleRef   = useRef<HTMLDivElement>(null);
  const doneRef     = useRef(false);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Collapse: one-time canvas burst + overlay fade ────────────────────────
  const triggerCollapse = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (fallbackRef.current) clearTimeout(fallbackRef.current);

    const overlay = overlayRef.current!;
    const canvas  = canvasRef.current!;
    const ctx     = canvas.getContext('2d')!;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const W  = window.innerWidth;
    const H  = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;
    const circleSize = Math.min(W * 0.55, H * 0.55, 420);
    const r  = circleSize / 2;

    let start: number | null = null;
    const DURATION = 1600;

    const burstLoop = (ts: number) => {
      if (!start) start = ts;
      const t   = Math.min((ts - start) / DURATION, 1);
      const inv = 1 - t;

      ctx.clearRect(0, 0, W, H);

      // Expanding flash ring
      const flashR = r + Math.max(W, H) * 0.9 * t;
      const flash  = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, flashR);
      flash.addColorStop(0,    `rgba(255,42,42,${0.9 * inv})`);
      flash.addColorStop(0.1,  `rgba(255,100,60,${0.5 * inv})`);
      flash.addColorStop(0.35, `rgba(255,42,42,${0.1 * inv})`);
      flash.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, flashR, 0, Math.PI * 2);
      ctx.fillStyle = flash;
      ctx.fill();

      overlay.style.opacity = String(Math.max(inv, 0));

      if (t < 1) {
        requestAnimationFrame(burstLoop);
      } else {
        overlay.style.opacity        = '0';
        overlay.style.pointerEvents  = 'none';
        setTimeout(onComplete, 250);
      }
    };

    requestAnimationFrame(burstLoop);
  };

  // ── Entry animation + fallback ────────────────────────────────────────────
  useEffect(() => {
    const circle = circleRef.current!;
    const raf = requestAnimationFrame(() => {
      circle.style.opacity   = '1';
      circle.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Safety fallback if video never fires onEnded
    fallbackRef.current = setTimeout(triggerCollapse, 14000);

    return () => {
      cancelAnimationFrame(raf);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#050508',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Star field: pure CSS, zero JS per frame ──────────────────────── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {STARS.map(s => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              width:  `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.65)',
              left: s.left,
              top:  s.top,
              animation: `ls-twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* ── CSS-only accretion rings — no JS per frame ───────────────────── */}
      <div aria-hidden style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none' }}>
        {/* Ring 1 — tightest, brightest */}
        <div style={{
          position: 'absolute',
          width: 'clamp(244px, calc(min(55vw, 55vh) + 24px), 444px)',
          height: 'clamp(244px, calc(min(55vw, 55vh) + 24px), 444px)',
          borderRadius: '50%',
          border: '3px solid rgba(255,42,42,0.88)',
          boxShadow: '0 0 18px rgba(255,42,42,0.75), 0 0 40px rgba(255,42,42,0.4), inset 0 0 12px rgba(255,42,42,0.28)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'ls-ring1 2.2s ease-in-out infinite',
        }} />
        {/* Ring 2 — medium */}
        <div style={{
          position: 'absolute',
          width: 'clamp(270px, calc(min(55vw, 55vh) + 50px), 470px)',
          height: 'clamp(270px, calc(min(55vw, 55vh) + 50px), 470px)',
          borderRadius: '50%',
          border: '2px solid rgba(255,42,42,0.45)',
          boxShadow: '0 0 22px rgba(255,42,42,0.35), 0 0 55px rgba(255,42,42,0.15)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'ls-ring2 2.8s ease-in-out infinite',
          animationDelay: '0.4s',
        }} />
        {/* Ring 3 — outermost, faintest */}
        <div style={{
          position: 'absolute',
          width: 'clamp(300px, calc(min(55vw, 55vh) + 80px), 500px)',
          height: 'clamp(300px, calc(min(55vw, 55vh) + 80px), 500px)',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,42,42,0.22)',
          boxShadow: '0 0 32px rgba(255,42,42,0.18), 0 0 70px rgba(255,42,42,0.07)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'ls-ring3 3.6s ease-in-out infinite',
          animationDelay: '0.9s',
        }} />

        {/* Rotating conic sweep glow — GPU only, no paint ─────────────────── */}
        <div style={{
          position: 'absolute',
          width: 'clamp(252px, calc(min(55vw, 55vh) + 32px), 452px)',
          height: 'clamp(252px, calc(min(55vw, 55vh) + 32px), 452px)',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(255,42,42,0) 0%, rgba(255,60,40,0.55) 20%, rgba(255,120,70,0.8) 35%, rgba(255,42,42,0.45) 55%, rgba(255,42,42,0) 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'ls-sweep 3s linear infinite',
          WebkitMaskImage: 'radial-gradient(transparent 47%, black 51.5%, black 56%, transparent 60%)',
          maskImage: 'radial-gradient(transparent 47%, black 51.5%, black 56%, transparent 60%)',
        }} />
      </div>

      {/* ── Canvas — idle (0 pixels), only activated on collapse ─────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* ── Outer ambient halo (pure CSS radial, breathing) ──────────────── */}
      <div aria-hidden style={{
        position: 'absolute', zIndex: 0, pointerEvents: 'none',
        width:  'clamp(400px, 72vw, 700px)',
        height: 'clamp(400px, 72vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,42,42,0.1) 0%, rgba(120,0,0,0.07) 42%, transparent 72%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        animation: 'ls-halo 4s ease-in-out infinite',
      }} />

      {/* ── Circular video container ──────────────────────────────────────── */}
      <div
        ref={circleRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          zIndex: 2,
          width:  'clamp(220px, min(55vw, 55vh), 420px)',
          height: 'clamp(220px, min(55vw, 55vh), 420px)',
          borderRadius: '50%',
          overflow: 'hidden',
          // Entry: starts hidden, CSS transition reveals it
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.72)',
          transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform, opacity',
          boxShadow:
            '0 0 0 2px rgba(255,42,42,0.88), ' +
            '0 0 18px rgba(255,42,42,0.6), ' +
            '0 0 48px rgba(255,42,42,0.25)',
          // Own stacking context so browser can decode video independently
          isolation: 'isolate',
        }}
      >
        <video
          src={dragonVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={triggerCollapse}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            // Promote to own layer — keeps video decode off layout thread
            transform: 'translateZ(0)',
          }}
        />
        {/* Inner vignette edge softener */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Loading text ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% + clamp(120px, calc(min(55vw, 55vh) / 2 + 1.4rem), 230px))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 6,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(0.58rem, 1.6vw, 0.78rem)',
        letterSpacing: '4px',
        color: 'rgba(255,42,42,0.6)',
        animation: 'ls-blink 1.3s ease-in-out infinite',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}>
        INITIALIZING SYSTEM...
      </div>

      {/* ── All keyframes: only uses transform + opacity (compositor thread) */}
      <style>{`
        @keyframes ls-twinkle {
          0%,100% { opacity: 0.12; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.5); }
        }
        @keyframes ls-ring1 {
          0%,100% { opacity: 0.75; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 1;    transform: translate(-50%,-50%) scale(1.025); box-shadow: 0 0 28px rgba(255,42,42,0.9), 0 0 60px rgba(255,42,42,0.45); }
        }
        @keyframes ls-ring2 {
          0%,100% { opacity: 0.45; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.8;  transform: translate(-50%,-50%) scale(1.03); }
        }
        @keyframes ls-ring3 {
          0%,100% { opacity: 0.25; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.55; transform: translate(-50%,-50%) scale(1.04); }
        }
        @keyframes ls-sweep {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes ls-halo {
          0%,100% { opacity: 0.65; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.07); }
        }
        @keyframes ls-blink {
          0%,100% { opacity: 0.28; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
