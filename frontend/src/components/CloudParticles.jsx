import React, { useEffect, useRef } from 'react';

const CloudParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.8 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.16;
        this.vy = (Math.random() - 0.5) * 0.16;
        this.alpha = Math.random() * 0.45 + 0.08;
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width + 20) this.x = -20;
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.y > canvas.height + 20) this.y = -20;
        if (this.y < -20) this.y = canvas.height + 20;
      }

      draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const dots = Array.from({ length: Math.max(45, Math.floor((canvas.width * canvas.height) / 36000)) }).map(() => new Dot());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.move();
        dot.draw();
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mk-bg-canvas" aria-hidden="true" />;
};

export default CloudParticles;
