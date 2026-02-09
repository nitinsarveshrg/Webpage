let snapPauseTimer = null;

const pauseSnap = (durationMs = 850) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('snap-paused');

  if (snapPauseTimer) {
    window.clearTimeout(snapPauseTimer);
  }

  snapPauseTimer = window.setTimeout(() => {
    root.classList.remove('snap-paused');
    snapPauseTimer = null;
  }, durationMs);
};

export const scrollToSectionById = (sectionId, options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const { behavior = 'smooth' } = options;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const header = document.querySelector('header');
  const headerOffset = (header ? header.getBoundingClientRect().height : 80) + 8;
  const target = section.querySelector('.terminal-header') || section;
  const y = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerOffset));

  pauseSnap(900);
  window.scrollTo({ top: y, behavior });
  return true;
};

