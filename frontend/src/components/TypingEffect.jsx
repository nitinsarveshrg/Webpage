import React, { useState, useEffect } from 'react';

const TypingEffect = ({
  text,
  speed = 40,
  className = '',
  onComplete,
  startDelay = 0,
  cursorChar = '_',
  persistCursor = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) {
      if (onComplete) onComplete();
      return undefined;
    }

    const delay = currentIndex === 0 ? startDelay + speed : speed;
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, onComplete, startDelay]);

  const showCursor = persistCursor || currentIndex < text.length;

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-pulse">{cursorChar}</span>}
    </span>
  );
};

export default TypingEffect;
