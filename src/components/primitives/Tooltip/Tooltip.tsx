import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import type { TooltipProps, TooltipPosition } from './Tooltip.types';

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent',
};

export function Tooltip({
  content,
  position = 'top',
  delay = 0,
  className,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <div
        role="tooltip"
        className={cn(
          'absolute z-50 px-2 py-1',
          'bg-gray-900 text-white text-sm rounded',
          'whitespace-nowrap',
          'transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
          positionStyles[position],
          className
        )}
      >
        {content}
        <span
          className={cn(
            'absolute w-0 h-0 border-4',
            arrowStyles[position]
          )}
        />
      </div>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
