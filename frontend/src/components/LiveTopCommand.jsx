import React, { useEffect, useState } from 'react';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const processTemplates = ['node', 'kubelet', 'docker', 'terraform', 'argocd', 'prometheus', 'grafana', 'nginx'];

const createSnapshot = () => {
  const cpuUser = Number(randomFloat(12, 30));
  const cpuSystem = Number(randomFloat(6, 16));
  const cpuIdle = Math.max(0, 100 - cpuUser - cpuSystem).toFixed(2);

  const totalMem = 16384;
  const usedMem = randomInt(8200, 13200);
  const freeMem = totalMem - usedMem;
  const processes = [0, 1, 2].map((index) => ({
    pid: randomInt(100 + index * 60, 999 + index * 60),
    command: processTemplates[randomInt(0, processTemplates.length - 1)],
    cpu: randomFloat(2.1, 22.8),
    mem: randomFloat(1.2, 12.5),
  }));

  return {
    tick: Date.now(),
    time: new Date().toLocaleTimeString(),
    uptimeHours: randomInt(18, 124),
    uptimeMinutes: randomInt(0, 59),
    users: randomInt(1, 3),
    load1: randomFloat(0.55, 1.65),
    load5: randomFloat(0.45, 1.4),
    load15: randomFloat(0.35, 1.15),
    tasksTotal: randomInt(176, 214),
    tasksRunning: randomInt(1, 4),
    tasksSleeping: randomInt(152, 198),
    cpuUser: cpuUser.toFixed(2),
    cpuSystem: cpuSystem.toFixed(2),
    cpuIdle,
    usedMem,
    freeMem,
    cpuUsed: Math.round(cpuUser + cpuSystem),
    memUsed: Math.round((usedMem / totalMem) * 100),
    processes,
  };
};

const LiveTopCommand = ({
  className = '',
  compact = false,
  command = 'top -l 1 | head -n 7',
  intervalMs = 1900,
}) => {
  const [snapshot, setSnapshot] = useState(createSnapshot);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSnapshot(createSnapshot());
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs]);

  const lines = [
    `top - ${snapshot.time} up ${snapshot.uptimeHours}h ${snapshot.uptimeMinutes}m, ${snapshot.users} users, load average: ${snapshot.load1}, ${snapshot.load5}, ${snapshot.load15}`,
    `Tasks: ${snapshot.tasksTotal} total, ${snapshot.tasksRunning} running, ${snapshot.tasksSleeping} sleeping`,
    `%Cpu(s): ${snapshot.cpuUser} us, ${snapshot.cpuSystem} sy, 0.00 ni, ${snapshot.cpuIdle} id`,
    `MiB Mem : 16384 total, ${snapshot.usedMem} used, ${snapshot.freeMem} free`,
  ];
  const visibleLines = compact ? lines.slice(0, 3) : lines;
  const visibleProcesses = compact ? snapshot.processes.slice(0, 2) : snapshot.processes;

  return (
    <div className={`terminal-panel live-top-panel ${compact ? 'live-top-panel-compact' : ''} ${className}`}>
      <div className="live-top-heading">
        <span className="text-cyan-400">$</span>
        <span className="text-green-400"> {command}</span>
        <span className="live-top-live-chip">LIVE</span>
      </div>

      <div className="live-top-screen">
        {visibleLines.map((line, index) => (
          <div
            key={`${snapshot.tick}-${index}`}
            className="live-top-line terminal-line-enter"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {line}
          </div>
        ))}
      </div>

      <div className="live-top-processes">
        <div className="live-top-process-title">pid   command       cpu%   mem%</div>
        {visibleProcesses.map((proc, index) => (
          <div key={`${snapshot.tick}-${proc.pid}-${index}`} className="live-top-process-row terminal-line-enter">
            {String(proc.pid).padEnd(5, ' ')} {proc.command.padEnd(12, ' ')} {proc.cpu.padStart(5, ' ')} {proc.mem.padStart(6, ' ')}
          </div>
        ))}
      </div>

      <div className="live-top-meters">
        <div>
          <div className="live-top-meter-label">
            <span>cpu usage</span>
            <span>{snapshot.cpuUsed}%</span>
          </div>
          <div className="live-top-meter-track">
            <div className="live-top-meter-fill" style={{ '--meter-width': `${snapshot.cpuUsed}%` }}></div>
          </div>
        </div>

        <div>
          <div className="live-top-meter-label">
            <span>memory usage</span>
            <span>{snapshot.memUsed}%</span>
          </div>
          <div className="live-top-meter-track">
            <div className="live-top-meter-fill" style={{ '--meter-width': `${snapshot.memUsed}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTopCommand;
