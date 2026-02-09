import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const chars = '01<>[]{}$#@/\\+-=;:|';
    const fontSize = 14;
    let drops = [];
    let columns = 0;
    let rafId;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -120);
    };

    setup();
    window.addEventListener('resize', setup);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const y = drops[i] * fontSize;
        const x = i * fontSize;
        const text = chars[Math.floor(Math.random() * chars.length)];

        ctx.fillStyle = '#9ff9ff';
        ctx.fillText(text, x, y);
        ctx.fillStyle = '#06b6d4';
        ctx.fillText(text, x, y + fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -25;
        } else {
          drops[i] += 1;
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.22, zIndex: 0 }}
    />
  );
};

export default MatrixRain;
