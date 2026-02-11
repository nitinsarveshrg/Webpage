export const scrollToSectionById = (sectionId, options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const { behavior = 'smooth' } = options;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const header = document.querySelector('header');
  const contentTarget = section.querySelector('.content-wrap') || section.querySelector('.hero-shell');
  const anchor = section.querySelector('.section-anchor');
  const target = contentTarget || anchor || section;

  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const targetTop = target.getBoundingClientRect().top;
  const offset = headerBottom + 10;
  const y = Math.max(0, Math.round(window.scrollY + targetTop - offset));

  window.scrollTo({ top: y, behavior });
  return true;
};
