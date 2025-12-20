import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../primitives/Button';
import type { PopoverProps, PopoverPosition } from './Popover.types';

const positionStyles: Record<PopoverPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Popover({
  trigger,
  triggerLabel,
  position = 'bottom',
  closeOnOutsideClick = true,
  className,
  children,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const triggerElement = trigger || (triggerLabel ? (
    <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
      {triggerLabel}
    </Button>
  ) : null);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {triggerElement}
      </div>
      <div
        className={cn(
          'absolute z-50 min-w-[200px]',
          'bg-white rounded-lg shadow-lg border border-gray-200',
          'transition-all duration-200',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
          positionStyles[position],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

Popover.displayName = 'Popover';
