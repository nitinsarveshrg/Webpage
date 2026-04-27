const isLight = () =>
  typeof document !== 'undefined' &&
  document.documentElement.dataset.theme === 'light';

export const inView = (delay = 0) => {
  if (isLight()) {
    return {
      initial: { opacity: 0, x: -6 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: false, amount: 0.08 },
      transition: { duration: 0.12, ease: [0, 0, 1, 1], delay: delay * 0.5 },
    };
  }
  return {
    initial: { opacity: 0, y: 56, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: false, amount: 0.08 },
    transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
  };
};

export const fade = (delay = 0) => {
  if (isLight()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.10, ease: [0, 0, 1, 1], delay: delay * 0.4 },
    };
  }
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
  };
};
