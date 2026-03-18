"use client";

import { useEffect, useRef } from "react";

interface Props {
  color?: string;
  glowColor?: string;
  hideCursor?: boolean;
}

export default function ElectricCursor({
  color = "#ff2200",
  glowColor = "#ff6600",
  hideCursor = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let mouseX = -999, mouseY = -999;
    let prevX = -999, prevY = -999;
    let animId: number;

    interface Bolt {
      x1: number; y1: number;
      x2: number; y2: number;
      life: number;
      maxLife: number;
      seed: number;
    }
    let bolts: Bolt[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      prevX = mouseX;
      prevY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (prevX < -900 || dist < 2) return;

      // Spawn 1-2 bolts along the movement
      const count = Math.min(2, Math.max(1, Math.floor(dist / 16)));
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const nx = -dy / (dist || 1);
        const ny =  dx / (dist || 1);
        const spread = (Math.random() - 0.5) * 18;

        const x1 = prevX + dx * t + nx * spread;
        const y1 = prevY + dy * t + ny * spread;
        const x2 = mouseX + (Math.random() - 0.5) * 22;
        const y2 = mouseY + (Math.random() - 0.5) * 22;

        const lifespan = 0.16 + Math.random() * 0.10;
        bolts.push({ x1, y1, x2, y2, life: lifespan, maxLife: lifespan, seed: Math.random() * 1000 });
      }

      // Occasional longer spanning arc
      if (dist > 14 && Math.random() < 0.4) {
        const lifespan = 0.13 + Math.random() * 0.08;
        bolts.push({
          x1: prevX, y1: prevY,
          x2: mouseX + (Math.random() - 0.5) * 35,
          y2: mouseY + (Math.random() - 0.5) * 35,
          life: lifespan, maxLife: lifespan, seed: Math.random() * 1000,
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    if (hideCursor) document.documentElement.style.cursor = "none";

    // Stable per-frame seeded random (no flicker between frames)
    const sr = (seed: number, i: number) => {
      const x = Math.sin(seed + i * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    type Pt = { x: number; y: number };

    function buildBolt(
      x1: number, y1: number, x2: number, y2: number,
      depth: number, jitter: number, seed: number, idx: number
    ): Pt[] {
      if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const offset = (sr(seed, idx) - 0.5) * 2 * jitter;
      const px = mx + (-dy / len) * offset;
      const py = my + ( dx / len) * offset;
      return [
        ...buildBolt(x1, y1, px, py, depth - 1, jitter * 0.6, seed, idx + 1).slice(0, -1),
        ...buildBolt(px, py, x2, y2, depth - 1, jitter * 0.6, seed, idx + 10),
      ];
    }

    function strokeBolt(pts: Pt[], alpha: number, coreW: number) {
      if (pts.length < 2 || alpha < 0.01) return;

      const pass = (w: number, style: string, blur: number, a: number) => {
        ctx.save();
        ctx.globalAlpha = a;
        ctx.strokeStyle = style;
        ctx.lineWidth = w;
        ctx.shadowColor = style;
        ctx.shadowBlur = blur;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
        ctx.restore();
      };

      // Reduced passes and blur for 60fps performance
      pass(coreW * 6,   glowColor, 20,  alpha * 0.2);   // outer glow
      pass(coreW * 2,   color,     0,   alpha * 0.7);   // core color
      pass(coreW * 0.5, "#ffffff", 0,   alpha * 0.95);  // white-hot
    }

    function drawCursor(x: number, y: number) {
      if (x < -900) return;
      ctx.save();
      ctx.translate(x, y);

      // glow ring
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;

      // cursor arrow fill (dark so it reads on any bg)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 15);
      ctx.lineTo(3.8, 11);
      ctx.lineTo(7, 17);
      ctx.lineTo(9.2, 16);
      ctx.lineTo(6, 10);
      ctx.lineTo(11, 10);
      ctx.closePath();
      ctx.fillStyle = "#111111";
      ctx.globalAlpha = 1;
      ctx.fill();

      // neon red outline
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 1;
      ctx.stroke();

      // hot tip dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.restore();
    }

    const DT = 1 / 60;

    const frame = () => {
      animId = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bolts = bolts.filter(bolt => {
        bolt.life -= DT;
        if (bolt.life <= 0) return false;

        const alpha = bolt.life / bolt.maxLife;
        const jitter = 12;

        const pts = buildBolt(bolt.x1, bolt.y1, bolt.x2, bolt.y2, 3, jitter, bolt.seed, 0);
        strokeBolt(pts, alpha, 1.8);

        // 30% chance of a branch off the midpoint
        if (alpha > 0.5 && Math.random() < 0.3) {
          const mid = pts[Math.floor(pts.length / 2)];
          const ang = Math.random() * Math.PI * 2;
          const len = 12 + Math.random() * 22;
          const bPts = buildBolt(
            mid.x, mid.y,
            mid.x + Math.cos(ang) * len,
            mid.y + Math.sin(ang) * len,
            2, jitter * 0.55, bolt.seed + 77, 0
          );
          strokeBolt(bPts, alpha * 0.5, 1.0);
        }

        return true;
      });

      drawCursor(mouseX, mouseY);
    };

    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, [color, glowColor, hideCursor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2147483647,
      }}
    />
  );
}
