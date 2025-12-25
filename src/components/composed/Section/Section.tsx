import { cn } from '../../../utils/cn';
import { Container } from '../../primitives/Container';
import type { SectionProps, SectionBackground, SectionSpacing } from './Section.types';

const backgroundStyles: Record<SectionBackground, string> = {
  light: 'bg-background-light',
  off: 'bg-background-off',
  dark: 'bg-background-dark text-white',
};

const spacingStyles: Record<SectionSpacing, string> = {
  compact: 'py-12',
  normal: 'py-16 sm:py-20',
  spacious: 'py-20 sm:py-24 lg:py-32',
};

export function Section({
  title,
  subtitle,
  background = 'light',
  spacing = 'normal',
  centered = true,
  as: Component = 'section',
  className,
  children,
}: SectionProps) {
  const isDark = background === 'dark';

  return (
    <Component className={cn(backgroundStyles[background], spacingStyles[spacing], className)}>
      <Container>
        {(title || subtitle) && (
          <div className={cn('mb-12', centered && 'text-center')}>
            {title && (
              <h2
                className={cn(
                  'text-3xl sm:text-4xl font-bold font-display',
                  isDark ? 'text-white' : 'text-text-main'
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  'mt-4 text-lg',
                  isDark ? 'text-gray-300' : 'text-text-sub',
                  centered && 'max-w-2xl mx-auto'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </Component>
  );
}

Section.displayName = 'Section';
