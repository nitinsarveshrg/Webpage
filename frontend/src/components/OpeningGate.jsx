import React, { useCallback, useEffect, useRef, useState } from 'react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const VIDEO_SRC = '/media/f1-intro.mp4';

const RADIO_LINES = [
  'RACE CTRL: Lights out, launch sequence active.',
  'ENG: Reliability map green across all cloud lanes.',
  'STRAT: Precision mode locked. Handing off to portfolio.',
];

const OpeningGate = ({ onComplete, exiting = false }) => {
  const finishedRef = useRef(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const lineInterval = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % RADIO_LINES.length);
    }, 1100);

    return () => window.clearInterval(lineInterval);
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      finishIntro();
    }, 9000);

    return () => window.clearTimeout(fallbackTimer);
  }, [finishIntro]);

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
    <section className={`opening-gate opening-video ${exiting ? 'is-exiting' : ''}`}>
      <video
        className={`opening-video-bg ${videoReady ? 'ready' : ''}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finishIntro}
        onLoadedData={() => setVideoReady(true)}
        onError={finishIntro}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="opening-scrim" />
      <div className="opening-noise" />

      <div className="opening-topbar">
        <span>F1 OPENING SEQUENCE</span>
        <span>MAX #1 ERA</span>
      </div>

      <div className="opening-copy">
        <p className="opening-kicker">Cloud DevOps x Race Performance</p>
        <h1>{portfolioData.personal.name}</h1>
        <p className="opening-role">{portfolioData.personal.title}</p>

        <div className="opening-command">
          <span className="prompt">$</span>{' '}
          <TypingEffect text="./launch_portfolio --f1 --devops --live" speed={24} cursorChar="_" persistCursor />
        </div>

        <div className="opening-radio">{RADIO_LINES[lineIndex]}</div>

        <button type="button" className="opening-skip" onClick={finishIntro}>
          Skip Intro
        </button>
      </div>
    </section>
  );
};

export default OpeningGate;
