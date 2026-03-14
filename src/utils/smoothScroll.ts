import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id.replace('#', ''));
  if (!el) return;
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: el, offsetY: 72 },
    ease: 'power3.inOut',
  });
};
