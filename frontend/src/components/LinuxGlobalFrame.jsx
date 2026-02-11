import React, { useEffect, useState } from 'react';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const LinuxGlobalFrame = () => {
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString());
  const [uptimeMinutes, setUptimeMinutes] = useState(() => randomInt(320, 980));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(new Date().toLocaleTimeString());
      setUptimeMinutes((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const uptimeHours = Math.floor(uptimeMinutes / 60);
  const uptimeRemainder = uptimeMinutes % 60;

  return (
    <div className="linux-global-frame" aria-hidden="true">
      <div className="linux-frame-top">
        <span className="linux-frame-host">root@cloud-devops</span>
        <span className="linux-frame-sep">|</span>
        <span>kernel 6.8.4-lts</span>
        <span className="linux-frame-sep">|</span>
        <span>uptime {uptimeHours}h {uptimeRemainder}m</span>
        <span className="linux-frame-sep">|</span>
        <span>{clock}</span>
      </div>
      <div className="linux-frame-rail linux-frame-rail-left" />
      <div className="linux-frame-rail linux-frame-rail-right" />
      <div className="linux-frame-bottom">
        <span className="linux-frame-prompt">$</span>
        <span>linux-ops-portfolio --mode immersive --telemetry live</span>
      </div>
    </div>
  );
};

export default LinuxGlobalFrame;
