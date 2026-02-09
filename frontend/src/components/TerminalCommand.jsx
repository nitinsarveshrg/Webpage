import React, { useEffect, useRef, useState } from 'react';
import TypingEffect from './TypingEffect';

const TerminalCommand = ({
  prompt = 'root@cloud-devops:~$',
  command,
  speed = 32,
  className = '',
  outputClassName = 'ml-4 text-zinc-400 text-sm',
  outputLines = [],
  outputLineDelay = 420,
  once = true,
  onCompleteChange,
  children,
}) => {
  const blockRef = useRef(null);
  const wasInViewRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [runId, setRunId] = useState(0);
  const [commandDone, setCommandDone] = useState(false);
  const [visibleOutputCount, setVisibleOutputCount] = useState(0);

  useEffect(() => {
    const node = blockRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (once) {
      if (isInView && !isVisible) {
        setIsVisible(true);
      }
      return;
    }

    if (isInView && !wasInViewRef.current) {
      setIsVisible(true);
      setRunId((prev) => prev + 1);
      setCommandDone(false);
      setVisibleOutputCount(0);
    }

    if (!isInView && wasInViewRef.current) {
      setIsVisible(false);
      setCommandDone(false);
      setVisibleOutputCount(0);
    }

    wasInViewRef.current = isInView;
  }, [once, isInView, isVisible]);

  useEffect(() => {
    if (!commandDone || outputLines.length === 0) return undefined;
    if (visibleOutputCount >= outputLines.length) return undefined;

    const timer = setTimeout(() => {
      setVisibleOutputCount((prev) => prev + 1);
    }, outputLineDelay);

    return () => clearTimeout(timer);
  }, [commandDone, outputLines, visibleOutputCount, outputLineDelay]);

  const isComplete = commandDone && (outputLines.length === 0 || visibleOutputCount >= outputLines.length);

  useEffect(() => {
    if (onCompleteChange) {
      onCompleteChange(isComplete);
    }
  }, [isComplete, onCompleteChange]);

  const shouldRun = once ? isVisible : isInView;

  return (
    <div ref={blockRef} className={className}>
      <div>
        <span className="text-cyan-400">{prompt}</span>{' '}
        {shouldRun ? (
          <TypingEffect
            key={`command-${runId}`}
            text={command}
            speed={speed}
            cursorChar="_"
            persistCursor
            onComplete={() => setCommandDone(true)}
          />
        ) : (
          <span className="opacity-0">{command}</span>
        )}
      </div>

      {commandDone && outputLines.length > 0 && (
        <div className={outputClassName}>
          {outputLines.slice(0, visibleOutputCount).map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>
      )}

      {commandDone && outputLines.length === 0 && children && <div className={outputClassName}>{children}</div>}
    </div>
  );
};

export default TerminalCommand;
