import React, { useEffect, useMemo, useState } from 'react';
import { TerminalSquare, Gauge, Palette, Zap, MoveRight } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

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

const LiveControlPanel = () => {
  const [open, setOpen] = useState(true);
  const [command, setCommand] = useState('');
  const [theme, setTheme] = useState('aqua');
  const [motion, setMotion] = useState('balanced');
  const [telemetry, setTelemetry] = useState({
    fps: randomInt(52, 60),
    net: randomInt(240, 980),
    workers: randomInt(8, 24),
  });
  const [log, setLog] = useState('ready');

  useEffect(() => {
    const id = window.setInterval(() => {
      setTelemetry({
        fps: randomInt(52, 60),
        net: randomInt(240, 980),
        workers: randomInt(8, 24),
      });
    }, 1500);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.liveTheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  const timeString = useMemo(() => new Date().toLocaleTimeString(), [telemetry]);

  const runCommand = (event) => {
    event.preventDefault();
    const target = routeByCommand(command);

    if (target) {
      scrollToSectionById(target);
      setLog(`navigated -> ${target}`);
      setCommand('');
      return;
    }

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
            <span>net {telemetry.net}mb</span>
            <span>workers {telemetry.workers}</span>
          </div>

          <form onSubmit={runCommand} className="live-command-form">
            <label>$ run</label>
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="about | skills | projects | contact"
            />
            <button type="submit">
              <MoveRight size={13} />
            </button>
          </form>

          <div className="live-pill-row">
            <span className="live-pill-label"><Palette size={12} /> theme</span>
            {['aqua', 'sunset', 'neon'].map((item) => (
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
