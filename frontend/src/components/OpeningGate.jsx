import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Gauge, RadioTower, Timer } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const RADIO_CALLS = [
  'STRAT: Grid clear. Push now.',
  'ENG: ERS full. Diff map set.',
  'PIT: Tyres in window. Track green.',
  'CTRL: Launching portfolio runtime...',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const RedBullCar = () => (
  <svg viewBox="0 0 760 220" className="rb-car-svg" aria-hidden="true" role="presentation">
    <defs>
      <linearGradient id="rbBody" x1="0" x2="1">
        <stop offset="0%" stopColor="#0b1a4d" />
        <stop offset="45%" stopColor="#1b2f92" />
        <stop offset="100%" stopColor="#10246d" />
      </linearGradient>
      <linearGradient id="rbAccent" x1="0" x2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="rbGold" x1="0" x2="1">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <radialGradient id="wheel" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="55%" stopColor="#020617" />
        <stop offset="100%" stopColor="#334155" />
      </radialGradient>
    </defs>

    <rect x="60" y="74" width="88" height="18" rx="4" fill="#94a3b8" opacity="0.88" />
    <rect x="640" y="74" width="66" height="18" rx="4" fill="#94a3b8" opacity="0.88" />

    <path d="M130 103 L220 103 L282 84 L470 84 L564 101 L692 101 L692 126 L550 126 L494 146 L292 146 L244 126 L130 126 Z" fill="url(#rbBody)" />

    <rect x="196" y="98" width="332" height="8" rx="4" fill="url(#rbAccent)" />
    <rect x="206" y="115" width="266" height="6" rx="3" fill="url(#rbGold)" opacity="0.9" />

    <path d="M314 84 L360 62 L412 62 L458 84 Z" fill="#1e3a8a" />
    <path d="M324 84 L368 70 L404 70 L448 84 Z" fill="#38bdf8" opacity="0.6" />

    <rect x="250" y="86" width="90" height="16" rx="3" fill="#1f2937" opacity="0.75" />
    <text x="295" y="98" textAnchor="middle" fill="#f8fafc" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="14">ORACLE</text>

    <circle cx="218" cy="154" r="38" fill="url(#wheel)" />
    <circle cx="586" cy="154" r="38" fill="url(#wheel)" />
    <circle cx="218" cy="154" r="16" fill="#475569" />
    <circle cx="586" cy="154" r="16" fill="#475569" />

    <path d="M558 112 L642 112 L650 120 L552 120 Z" fill="#0f172a" />
    <text x="603" y="120" textAnchor="middle" fill="#f8fafc" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="22">1</text>
  </svg>
);

const OpeningGate = ({ onComplete, exiting = false }) => {
  const [radioIndex, setRadioIndex] = useState(0);
  const [launchPhase, setLaunchPhase] = useState(false);
  const [telemetry, setTelemetry] = useState({
    speed: randomInt(296, 352),
    ers: randomInt(72, 100),
    delta: randomFloat(0.09, 0.58),
  });
  const finishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const launchTimer = window.setTimeout(() => setLaunchPhase(true), 220);
    const autoExitTimer = window.setTimeout(() => finishIntro(), 2600);

    return () => {
      window.clearTimeout(launchTimer);
      window.clearTimeout(autoExitTimer);
    };
  }, [finishIntro]);

  useEffect(() => {
    const radioInterval = window.setInterval(() => {
      setRadioIndex((prev) => (prev + 1) % RADIO_CALLS.length);
    }, 520);

    return () => window.clearInterval(radioInterval);
  }, []);

  useEffect(() => {
    const telemetryInterval = window.setInterval(() => {
      setTelemetry({
        speed: randomInt(296, 352),
        ers: randomInt(72, 100),
        delta: randomFloat(0.09, 0.58),
      });
    }, 380);

    return () => window.clearInterval(telemetryInterval);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
        finishIntro();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finishIntro]);

  return (
    <section className={`opening-gate ${launchPhase ? 'launch' : ''} ${exiting ? 'is-exiting' : ''}`}>
      <div className="opening-film-grain" />
      <div className="opening-top-hud">
        <span>RACE START</span>
        <span>LAP 01/58</span>
        <span>MAX #1 STYLE</span>
      </div>

      <div className="opening-title-wrap">
        <p className="opening-kicker">F1 Pace. DevOps Precision.</p>
        <h1>{portfolioData.personal.name}</h1>
        <p className="opening-role">{portfolioData.personal.title}</p>
        <div className="opening-command-line">
          <span className="prompt">$</span>{' '}
          <TypingEffect text="./race_launch --cloud --speed --reliability" speed={20} cursorChar="_" persistCursor />
        </div>
        <button type="button" className="opening-enter-btn" onClick={finishIntro}>
          Skip Intro
        </button>
      </div>

      <div className="opening-track-stage" aria-hidden="true">
        <div className="track-lane" />
        <div className="track-lines" />
        <div className="speed-streaks">
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={`streak-${idx}`} style={{ animationDelay: `${idx * 70}ms` }} />
          ))}
        </div>
        <div className="car-shell">
          <RedBullCar />
        </div>
      </div>

      <div className="opening-radio-box">
        <div className="opening-radio-row">
          <span>
            <Gauge size={12} /> {telemetry.speed} km/h
          </span>
          <span>
            <Timer size={12} /> +{telemetry.delta}s
          </span>
          <span>
            <RadioTower size={12} /> ERS {telemetry.ers}%
          </span>
        </div>
        <div className="opening-radio-feed">{RADIO_CALLS[radioIndex]}</div>
      </div>
    </section>
  );
};

export default OpeningGate;
