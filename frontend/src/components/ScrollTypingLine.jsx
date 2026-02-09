import React, { useEffect, useRef, useState } from 'react';
import TypingEffect from './TypingEffect';

const ScrollTypingLine = ({
  prompt = 'root@cloud-devops:~$',
  text,
  speed = 40,
  className = '',
  once = true,
  cursorChar = '_',
}) => {
  const lineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = lineRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible && !isVisible) {
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
  }, [isVisible]);

  const shouldType = once ? isVisible : isInView;

  return (
    <div ref={lineRef} className={className}>
      <span className="text-cyan-400">{prompt}</span>{' '}
      {shouldType ? (
        <TypingEffect text={text} speed={speed} cursorChar={cursorChar} persistCursor />
      ) : (
        <span className="opacity-0">{text}</span>
      )}
    </div>
  );
};

export default ScrollTypingLine;
