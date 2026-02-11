export const scrollToSectionById = (sectionId, options = {}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const { behavior = 'smooth' } = options;
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const header = document.querySelector('header');
  const anchor = section.querySelector('.section-anchor');
  const target = anchor || section;

  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const targetTop = target.getBoundingClientRect().top;

  // If section defines its own anchor, avoid double-offsetting with header height.
  const offset = anchor ? 8 : (headerBottom + 8);
  const y = Math.max(0, Math.round(window.scrollY + targetTop - offset));

  window.scrollTo({ top: y, behavior });
  return true;
};
