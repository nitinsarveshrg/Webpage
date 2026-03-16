import React, { useEffect, useRef } from 'react';

const CloudParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frameId;
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    /* ── Large glowing orbs (background depth layer) ─────────────── */
    class Orb {
      constructor(initial = false) {
        this.r = 100 + Math.random() * 240;
        this.x = initial ? Math.random() * canvas.width : -this.r;
        this.y = Math.random() * canvas.height;
        this.vx = 0.035 + Math.random() * 0.055;
        this.vy = (Math.random() - 0.5) * 0.035;
        this.hue = [205, 190, 225, 215][Math.floor(Math.random() * 4)];
        this.sat = 80 + Math.random() * 20;
        this.light = 58 + Math.random() * 22;
        this.alpha = 0.022 + Math.random() * 0.044;
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = 0.003 + Math.random() * 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.phase += this.phaseSpeed;
        if (this.x > canvas.width + this.r * 2) {
          this.x = -this.r * 2;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        const a = this.alpha * (1 + Math.sin(this.phase) * 0.28);
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, `hsla(${this.hue},${this.sat}%,${this.light}%,${a})`);
        g.addColorStop(0.45, `hsla(${this.hue},${this.sat}%,${this.light}%,${a * 0.35})`);
        g.addColorStop(1, `hsla(${this.hue},${this.sat}%,${this.light}%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Small twinkling stars ────────────────────────────────────── */
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.45 + 0.35;
        this.vx = (Math.random() - 0.5) * 0.13;
        this.vy = (Math.random() - 0.5) * 0.13;
        this.alpha = Math.random() * 0.52 + 0.08;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.008 + Math.random() * 0.018;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.twinkle += this.twinkleSpeed;

        /* soft mouse repulsion */
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 7200 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          const force = (85 - dist) / 85 * 0.22;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.x > canvas.width + 12) this.x = -12;
        if (this.x < -12) this.x = canvas.width + 12;
        if (this.y > canvas.height + 12) this.y = -12;
        if (this.y < -12) this.y = canvas.height + 12;
      }

      draw() {
        const a = this.alpha * (0.65 + Math.sin(this.twinkle) * 0.35);
        ctx.fillStyle = `rgba(190, 225, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const NUM_ORBS = 7;
    const starDensity = Math.floor((canvas.width * canvas.height) / 22000);
    const NUM_STARS = Math.max(55, Math.min(starDensity, 120));
    const CONNECT_DIST = 115;

    const orbs = Array.from({ length: NUM_ORBS }, (_, i) => new Orb(i > 0));
    const stars = Array.from({ length: NUM_STARS }, () => new Star());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* orbs – background depth */
      orbs.forEach((o) => { o.update(); o.draw(); });

      /* constellation lines */
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < CONNECT_DIST * CONNECT_DIST) {
            const dist = Math.sqrt(dist2);
            const a = (1 - dist / CONNECT_DIST) * 0.088;
            ctx.strokeStyle = `rgba(140, 200, 255, ${a})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      /* stars – foreground */
      stars.forEach((s) => { s.update(); s.draw(); });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="nx-bg-canvas" aria-hidden="true" />;
};

export default CloudParticles;
