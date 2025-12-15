import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  initialDirection?: ScrollDirection;
}

/**
 * Hook to track scroll direction
 * Useful for hide-on-scroll headers
 * @param options.threshold - Minimum scroll delta to trigger direction change (default: 10)
 * @param options.initialDirection - Initial direction value (default: null)
 */
export function useScrollDirection(
  options: UseScrollDirectionOptions = {}
): ScrollDirection {
  const { threshold = 10, initialDirection = null } = options;
  const [direction, setDirection] = useState<ScrollDirection>(initialDirection);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateDirection = () => {
      const scrollY = window.scrollY;
      const diff = scrollY - lastScrollY.current;

      if (Math.abs(diff) < threshold) {
        ticking.current = false;
        return;
      }

      setDirection(diff > 0 ? 'down' : 'up');
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}
