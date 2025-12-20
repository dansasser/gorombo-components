import { useState, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { SwitchProps } from './Switch.types';

const sizeStyles = {
  sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
};

export function Switch({
  name,
  label,
  defaultChecked = false,
  disabled = false,
  size = 'md',
  className,
}: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();
  const styles = sizeStyles[size];

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          className="sr-only peer"
        />
        <div
          className={cn(
            'rounded-full transition-colors',
            styles.track,
            checked ? 'bg-primary' : 'bg-gray-200',
            'peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2'
          )}
        />
        <div
          className={cn(
            'absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform',
            styles.thumb,
            checked && styles.translate
          )}
        />
      </div>
      {label && <span className="text-sm text-text-main">{label}</span>}
    </label>
  );
}

Switch.displayName = 'Switch';
