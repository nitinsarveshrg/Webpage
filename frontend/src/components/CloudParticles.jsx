import React, { useEffect, useRef } from 'react';

// Cloud/DevOps service nodes — labeled topology graph background
const SERVICE_NODES = [
  { label: 'AWS',         color: '#FF9900', hue: 36  },
  { label: 'K8s',         color: '#326CE5', hue: 220 },
  { label: 'Terraform',   color: '#7B42BC', hue: 270 },
  { label: 'Docker',      color: '#2496ED', hue: 210 },
  { label: 'ArgoCD',      color: '#EF7B4D', hue: 20  },
  { label: 'Prometheus',  color: '#E6522C', hue: 15  },
  { label: 'Grafana',     color: '#F46800', hue: 30  },
  { label: 'GitHub',      color: '#E8E8E8', hue: 0   },
  { label: 'Helm',        color: '#0F1689', hue: 235 },
  { label: 'Jenkins',     color: '#D33833', hue: 5   },
  { label: 'Ansible',     color: '#EE0000', hue: 0   },
  { label: 'Datadog',     color: '#774AA4', hue: 280 },
];

const CloudParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Build node objects
    const nodes = SERVICE_NODES.map((svc, i) => {
      const angle = (i / SERVICE_NODES.length) * Math.PI * 2 + Math.random() * 0.5;
      const r = 0.20 + Math.random() * 0.28;
      return {
        ...svc,
        x: 0.5 + Math.cos(angle) * r,
        y: 0.48 + Math.sin(angle) * r * 0.65,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00009,
        radius: 3.2 + Math.random() * 1.8,
        alpha: 0.55 + Math.random() * 0.30,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.008,
      };
    });

    // Small ambient particles (grid dots)
    const DOTS = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.000045,
      vy: (Math.random() - 0.5) * 0.000035,
      r: 0.8 + Math.random() * 0.8,
      alpha: 0.08 + Math.random() * 0.12,
    }));

    const CONNECT_THRESH = 0.22; // fraction of screen diagonal
    const LINE_MAX_ALPHA = 0.12;

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Subtle radial glow at center
      const cx = W * 0.5;
      const cy = H * 0.44;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.55);
      grd.addColorStop(0, 'rgba(0,180,255,0.028)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Update + draw ambient dots
      DOTS.forEach((d) => {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
        ctx.fillStyle = `rgba(0,200,255,${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update nodes
      nodes.forEach((n) => {
        n.x = ((n.x + n.vx) + 1.5) % 1;
        n.y = ((n.y + n.vy) + 1.5) % 1;
        n.phase += n.phaseSpeed;
      });

      // Draw connection lines between close nodes
      const diag = Math.sqrt(W * W + H * H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * W;
          const dy = (nodes[i].y - nodes[j].y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const thresh = CONNECT_THRESH * diag;
          if (dist < thresh) {
            const a = LINE_MAX_ALPHA * (1 - dist / thresh);
            ctx.strokeStyle = `rgba(0,200,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
            ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
            ctx.stroke();
          }
        }
      }
      ctx.setLineDash([]);

      // Draw nodes
      nodes.forEach((n) => {
        const px = n.x * W;
        const py = n.y * H;
        const pulse = 1 + Math.sin(n.phase) * 0.18;
        const a = n.alpha * (0.8 + Math.sin(n.phase) * 0.20);

        // Outer glow ring
        const ringGrd = ctx.createRadialGradient(px, py, 0, px, py, n.radius * 3.5 * pulse);
        ringGrd.addColorStop(0, `hsla(${n.hue},80%,65%,${a * 0.25})`);
        ringGrd.addColorStop(1, `hsla(${n.hue},80%,65%,0)`);
        ctx.fillStyle = ringGrd;
        ctx.beginPath();
        ctx.arc(px, py, n.radius * 3.5 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(${n.hue},80%,70%,${a})`;
        ctx.beginPath();
        ctx.arc(px, py, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = `hsla(${n.hue},60%,80%,${a * 0.65})`;
        ctx.font = `500 ${9}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, px, py + n.radius + 14);
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="nx-bg-canvas"
      aria-hidden="true"
      style={{ opacity: 0.65 }}
    />
  );
};

export default CloudParticles;
