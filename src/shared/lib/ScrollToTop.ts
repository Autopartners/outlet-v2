import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    topScroll();
  }, [pathname]);

  return null;
};

export const topScroll = (behavior:ScrollBehavior = 'auto') => {
  window.scrollTo({
    top: 0,
    behavior,
  });

  return null;
};
