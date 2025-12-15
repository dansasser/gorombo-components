import { useEffect, type RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Hook to detect clicks outside of a referenced element
 * Useful for closing dropdowns, modals, etc.
 * @param ref - React ref to the element
 * @param handler - Callback when click outside is detected
 * @param enabled - Whether the listener is active (default: true)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}
