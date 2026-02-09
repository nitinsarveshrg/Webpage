import React, { useEffect, useRef, useState } from 'react';
import TypingEffect from './TypingEffect';

const TerminalCommand = ({
  prompt = 'root@cloud-devops:~$',
  command,
  speed = 18,
  className = '',
  outputClassName = 'ml-4 text-zinc-400 text-sm',
  once = true,
  children,
}) => {
  const blockRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
    if (!once && !isInView) {
      setIsComplete(false);
    }
  }, [once, isInView]);

  const shouldRun = once ? isVisible : isInView;

  return (
    <div ref={blockRef} className={className}>
      <div>
        <span className="text-cyan-400">{prompt}</span>{' '}
        {shouldRun ? (
          <TypingEffect
            text={command}
            speed={speed}
            cursorChar="_"
            persistCursor
            onComplete={() => setIsComplete(true)}
          />
        ) : (
          <span className="opacity-0">{command}</span>
        )}
      </div>

      {isComplete && children && <div className={outputClassName}>{children}</div>}
    </div>
  );
};

export default TerminalCommand;
