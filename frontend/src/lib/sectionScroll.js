export const scrollToSectionById = (sectionId, options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const { behavior = 'smooth' } = options;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const header = document.querySelector('header');
  const target =
    section.querySelector('.neo-shell-top') ||
    section.querySelector('.terminal-header') ||
    section;

  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const targetTop = target.getBoundingClientRect().top;
  const y = Math.max(0, Math.round(window.scrollY + targetTop - headerBottom - 2));

  window.scrollTo({ top: y, behavior });
  return true;
};
