// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);
};

export default useSmoothScroll;