import React, { useEffect, useRef } from 'react';

const CloudParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animId = 0;

    const STAR_COUNT = 160;
    const stars = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.2,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          baseAlpha: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003,
        });
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      // Nebula blobs
      const nebulae = [
        { x: width * 0.15, y: height * 0.25, r: 320, color: 'rgba(14,165,233,0.045)' },
        { x: width * 0.80, y: height * 0.15, r: 260, color: 'rgba(139,92,246,0.040)' },
        { x: width * 0.55, y: height * 0.75, r: 290, color: 'rgba(14,165,233,0.035)' },
        { x: width * 0.88, y: height * 0.70, r: 200, color: 'rgba(16,185,129,0.030)' },
      ];

      nebulae.forEach(({ x, y, r, color }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const twinkle = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.12;
        const alpha = Math.max(0.05, Math.min(0.75, twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186,230,253,${alpha})`;
        ctx.fill();
      });

      // Thin connection lines between nearby stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const a = (1 - dist / 90) * 0.10;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${a})`;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    animId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="nx-bg-canvas"
      aria-hidden="true"
    />
  );
};

export default CloudParticles;
