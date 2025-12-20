import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../Icon';
import type { SelectProps } from './Select.types';

export function Select({
  options,
  placeholder = 'Select an option',
  defaultValue,
  name,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selected);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const hasError = !!error;

  return (
    <div
      ref={containerRef}
      className={cn('relative', fullWidth && 'w-full', className)}
    >
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected} />

      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-main mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-4 py-3 rounded-lg border bg-white text-left',
          'transition-colors',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-200 focus:border-primary focus:ring-primary',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          !disabled && 'hover:border-gray-300'
        )}
      >
        <span className={cn(!selectedOption && 'text-text-sub')}>
          {selectedOption?.label || placeholder}
        </span>
        <Icon
          name="expand_more"
          size="sm"
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute z-50 w-full mt-1',
            'bg-white border border-gray-200 rounded-lg shadow-lg',
            'max-h-60 overflow-auto',
            'py-1'
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected === option.value}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={cn(
                'px-4 py-2 cursor-pointer',
                'transition-colors',
                selected === option.value
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-main hover:bg-background-off',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Helper text / Error */}
      {(helperText || error) && (
        <p
          className={cn(
            'mt-1.5 text-sm',
            hasError ? 'text-red-500' : 'text-text-sub'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

Select.displayName = 'Select';
