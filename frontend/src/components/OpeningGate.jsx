import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flag, Gauge, RadioTower, Timer } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const RADIO_CALLS = [
  '[PIT] warm tires and lock telemetry lanes',
  '[RACE ENG] cloud readiness at 100%',
  '[STRATEGY] deploy window open, push now',
  '[CONTROL] stability green across all providers',
  '[FINAL] go go go, launch portfolio runtime',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const OpeningGate = ({ onComplete, exiting = false }) => {
  const [radioIndex, setRadioIndex] = useState(0);
  const [launchPhase, setLaunchPhase] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [telemetry, setTelemetry] = useState({
    speed: randomInt(286, 336),
    ers: randomInt(66, 97),
    delta: randomFloat(0.11, 0.76),
  });
  const finishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const launchTimer = window.setTimeout(() => setLaunchPhase(true), 1500);
    const autoExitTimer = window.setTimeout(() => finishIntro(), 7600);

    return () => {
      window.clearTimeout(launchTimer);
      window.clearTimeout(autoExitTimer);
    };
  }, [finishIntro]);

  useEffect(() => {
    const countdownInterval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const radioInterval = window.setInterval(() => {
      setRadioIndex((prev) => (prev + 1) % RADIO_CALLS.length);
    }, 1100);

    return () => window.clearInterval(radioInterval);
  }, []);

  useEffect(() => {
    const telemetryInterval = window.setInterval(() => {
      setTelemetry({
        speed: randomInt(286, 336),
        ers: randomInt(66, 97),
        delta: randomFloat(0.11, 0.76),
      });
    }, 760);

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

  const firstName = portfolioData.personal.name.split(' ')[0];
  const restName = portfolioData.personal.name.split(' ').slice(1).join(' ');

  return (
    <section className={`opening-gate opening-dts ${launchPhase ? 'launch' : ''} ${exiting ? 'is-exiting' : ''}`}>
      <div className="opening-noise" />
      <div className="opening-vignette" />

      <div className="opening-hud-row">
        <div className="opening-hud-pill">
          <Flag size={14} />
          <span>Drive Runtime Sequence</span>
        </div>

        <div className="opening-hud-stats">
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
      </div>

      <div className="opening-title-wrap">
        <p className="opening-kicker">Cloud DevOps x F1 Precision</p>
        <h1>
          {firstName}
          <span>{restName}</span>
        </h1>
        <p className="opening-role">{portfolioData.personal.title}</p>
        <p className="opening-tagline">{portfolioData.personal.tagline}</p>

        <div className="opening-command-line">
          <span className="prompt">$</span>{' '}
          <TypingEffect
            text="./launch --profile nitin --mode race-ops --handoff portfolio"
            speed={24}
            cursorChar="_"
            persistCursor
          />
        </div>

        <div className="opening-action-row">
          <button type="button" className="opening-enter-btn" onClick={finishIntro}>
            Enter Portfolio
          </button>
          <div className="opening-countdown">auto transition in {countdown}s</div>
        </div>
      </div>

      <div className="opening-pit-stage" aria-hidden="true">
        <div className="pit-lane-grid" />
        <div className="pit-wall" />
        <div className="pit-sparks" />

        <div className="race-car-shell">
          <div className="car-wing front" />
          <div className="car-body" />
          <div className="car-wing rear" />
          <span className="wheel front" />
          <span className="wheel rear" />
          <div className="car-glow" />
        </div>

        <div className="speed-streaks">
          {Array.from({ length: 11 }).map((_, idx) => (
            <span key={`streak-${idx}`} style={{ animationDelay: `${idx * 110}ms` }} />
          ))}
        </div>
      </div>

      <div className="opening-radio-feed">
        <span className="label">team radio</span>
        <div>{RADIO_CALLS[radioIndex]}</div>
      </div>
    </section>
  );
};

export default OpeningGate;
