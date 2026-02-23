import { useRef, useEffect, useMemo } from 'react';
import GlassCard from './GlassCard';

const RadarSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const blips = useMemo(() =>
    Array.from({ length: 6 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: 0.2 + Math.random() * 0.7,
    })),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepAngle = 0;

    const draw = () => {
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) - 12;

      ctx.clearRect(0, 0, width, height);

      // Grid circles
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cross lines
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep trail
      for (let i = 0; i < 40; i++) {
        const angle = sweepAngle - i * 0.015;
        const alpha = (1 - i / 40) * 0.25;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Main sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center dot
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Blips
      blips.forEach(blip => {
        let diff = ((sweepAngle - blip.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff < 2) {
          const alpha = Math.max(0, 1 - diff / 2);
          const bx = cx + Math.cos(blip.angle) * blip.distance * radius;
          const by = cy + Math.sin(blip.angle) * blip.distance * radius;

          ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
          ctx.beginPath();
          ctx.arc(bx, by, 3 * alpha + 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      sweepAngle += 0.025;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [blips]);

  return (
    <GlassCard title="Radar System">
      <div className="flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={220}
          height={220}
          className="w-full max-w-[220px] aspect-square"
        />
      </div>
    </GlassCard>
  );
};

export default RadarSystem;
