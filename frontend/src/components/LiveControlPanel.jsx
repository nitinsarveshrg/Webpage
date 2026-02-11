import React, { useEffect, useMemo, useState } from 'react';
import { TerminalSquare, Gauge, Palette, Zap, MoveRight, Activity, Cpu, Network } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const routeByCommand = (rawCommand) => {
  const cmd = rawCommand
    .toLowerCase()
    .replace(/^\$\s*/, '')
    .replace(/^\.\//, '')
    .trim();

  const map = {
    hero: 'hero',
    top: 'hero',
    profile: 'about',
    about: 'about',
    stack: 'skills',
    skills: 'skills',
    builds: 'projects',
    projects: 'projects',
    timeline: 'experience',
    experience: 'experience',
    certs: 'certifications',
    certifications: 'certifications',
    contact: 'contact',
  };

  return map[cmd] || null;
};

const LOG_POOL = [
  'watchdog: health checks passed',
  'autoscaler: worker pool rebalanced',
  'ingress: tls handshake stable',
  'observability: traces sampled clean',
  'deploy-lane: canary within threshold',
  'vault-agent: token renewed',
  'backup: last snapshot verified',
];

const PROCESS_NAMES = ['kubelet', 'argocd', 'prometheus', 'nginx', 'fluent-bit'];

const initialTelemetry = {
  fps: randomInt(53, 60),
  net: randomInt(280, 860),
  workers: randomInt(9, 22),
  cpu: randomInt(34, 66),
  mem: randomInt(42, 73),
  load: randomInt(58, 92),
};

const initialProcesses = PROCESS_NAMES.slice(0, 3).map((name) => ({
  name,
  cpu: randomInt(4, 28),
  mem: randomInt(90, 420),
}));

const LiveControlPanel = () => {
  const [open, setOpen] = useState(true);
  const [command, setCommand] = useState('');
  const [theme, setTheme] = useState('race');
  const [motion, setMotion] = useState('balanced');
  const [telemetry, setTelemetry] = useState(initialTelemetry);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [clock, setClock] = useState(() => new Date());
  const [spectrum, setSpectrum] = useState(() => Array.from({ length: 26 }, () => randomInt(22, 88)));
  const [processes, setProcesses] = useState(initialProcesses);
  const [events, setEvents] = useState(() => ['runtime initialized']);
  const [log, setLog] = useState('ready');

  useEffect(() => {
    const id = window.setInterval(() => {
      setTelemetry((prev) => ({
        fps: clamp(prev.fps + randomInt(-2, 2), 48, 61),
        net: clamp(prev.net + randomInt(-85, 85), 140, 980),
        workers: clamp(prev.workers + randomInt(-1, 1), 6, 26),
        cpu: clamp(prev.cpu + randomInt(-4, 4), 18, 88),
        mem: clamp(prev.mem + randomInt(-3, 3), 30, 90),
        load: clamp(prev.load + randomInt(-5, 5), 36, 99),
      }));
      setUptimeSeconds((prev) => prev + 1);
      setClock(new Date());
    }, 950);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.liveTheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  useEffect(() => {
    setSpectrum((prev) => {
      const nextPoint = clamp(Math.round(telemetry.load + Math.sin(Date.now() / 500) * 8), 8, 98);
      return [...prev.slice(1), nextPoint];
    });

    setProcesses((prev) => {
      return prev.map((proc, index) => ({
        ...proc,
        cpu: clamp(proc.cpu + randomInt(-2, 3) + (index === 0 ? 1 : 0), 2, 58),
        mem: clamp(proc.mem + randomInt(-20, 24), 70, 620),
      }));
    });

    if (Math.random() > 0.66) {
      const message = LOG_POOL[randomInt(0, LOG_POOL.length - 1)];
      setEvents((prev) => [message, ...prev].slice(0, 5));
      setLog(message);
    }
  }, [telemetry]);

  const timeString = clock.toLocaleTimeString();

  const uptimeDisplay = useMemo(() => {
    const mins = Math.floor(uptimeSeconds / 60);
    const secs = uptimeSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [uptimeSeconds]);

  const runCommand = (event) => {
    event.preventDefault();
    const normalized = command.trim();

    if (!normalized) return;

    if (normalized === 'clear' || normalized === 'reset') {
      setEvents(['console cleared']);
      setLog('console cleared');
      setCommand('');
      return;
    }

    const target = routeByCommand(normalized);

    if (target) {
      scrollToSectionById(target);
      setEvents((prev) => [`jump -> ${target}`, ...prev].slice(0, 5));
      setLog(`navigated -> ${target}`);
      setCommand('');
      return;
    }

    setEvents((prev) => [`unknown: ${normalized}`, ...prev].slice(0, 5));
    setLog('unknown command');
  };

  return (
    <aside className={`live-dock ${open ? 'live-dock-open' : 'live-dock-collapsed'}`}>
      <button className="live-dock-toggle" onClick={() => setOpen((prev) => !prev)}>
        <TerminalSquare size={14} />
        <span>{open ? 'live panel' : 'open panel'}</span>
      </button>

      {open && (
        <div className="live-dock-body">
          <div className="live-dock-row">
            <span><Gauge size={13} /> fps {telemetry.fps}</span>
            <span><Activity size={13} /> cpu {telemetry.cpu}%</span>
            <span><Cpu size={13} /> mem {telemetry.mem}%</span>
            <span><Network size={13} /> net {telemetry.net}mb</span>
            <span>workers {telemetry.workers}</span>
            <span>uptime {uptimeDisplay}</span>
          </div>

          <div className="live-spectrum" aria-hidden="true">
            {spectrum.map((value, index) => (
              <span key={`${value}-${index}`} style={{ height: `${value}%` }} />
            ))}
          </div>

          <div className="live-process-board">
            <div className="live-process-head">
              <span>PID</span>
              <span>PROC</span>
              <span>CPU</span>
              <span>MEM</span>
            </div>
            {processes.map((proc, index) => (
              <div key={proc.name} className="live-process-row">
                <span>{1200 + index * 17}</span>
                <span>{proc.name}</span>
                <span>{proc.cpu}%</span>
                <span>{proc.mem}MB</span>
              </div>
            ))}
          </div>

          <form onSubmit={runCommand} className="live-command-form">
            <label>$ run</label>
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="about | skills | projects | contact | clear"
            />
            <button type="submit">
              <MoveRight size={13} />
            </button>
          </form>

          <div className="live-event-feed">
            {events.map((item, index) => (
              <div key={`${item}-${index}`} className="live-event-line">
                <span className="dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="live-pill-row">
            <span className="live-pill-label"><Palette size={12} /> theme</span>
            {['race', 'aqua', 'sunset', 'neon'].map((item) => (
              <button
                key={item}
                className={`live-pill-btn ${theme === item ? 'active' : ''}`}
                onClick={() => setTheme(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="live-pill-row">
            <span className="live-pill-label"><Zap size={12} /> motion</span>
            {['calm', 'balanced', 'turbo'].map((item) => (
              <button
                key={item}
                className={`live-pill-btn ${motion === item ? 'active' : ''}`}
                onClick={() => setMotion(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="live-dock-log">{timeString} · {log}</div>
        </div>
      )}
    </aside>
  );
};

export default LiveControlPanel;
