export const scrollToSectionById = (sectionId, options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const { behavior = 'smooth' } = options;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const header = document.querySelector('header');
  const anchor = section.querySelector('.section-anchor') || section;

  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const anchorTop = anchor.getBoundingClientRect().top;
  const y = Math.max(0, Math.round(window.scrollY + anchorTop - headerBottom - 8));

  window.scrollTo({ top: y, behavior });
  return true;
};
