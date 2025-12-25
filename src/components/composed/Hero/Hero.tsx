import { cn } from '../../../utils/cn';
import { Container } from '../../primitives/Container';
import type { HeroProps, HeroLayout } from './Hero.types';

const layoutStyles: Record<HeroLayout, string> = {
  centered: 'text-center',
  twoColumn: 'grid lg:grid-cols-2 gap-12 items-center',
  dark: 'text-center text-white',
};

const backgroundStyles: Record<HeroLayout, string> = {
  centered: 'bg-background-light',
  twoColumn: 'bg-background-light',
  dark: 'bg-background-dark',
};

export function Hero({
  title,
  subtitle,
  description,
  layout = 'centered',
  media,
  actions,
  decorative = true,
  className,
  children,
}: HeroProps) {
  const isDark = layout === 'dark';
  const isTwoColumn = layout === 'twoColumn';

  return (
    <section
      className={cn(
        'relative py-16 sm:py-20 lg:py-24 overflow-hidden',
        backgroundStyles[layout],
        className
      )}
    >
      {/* Decorative blobs */}
      {decorative && (
        <>
          <div
            className={cn(
              'absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10',
              isDark ? 'bg-primary/10' : 'bg-secondary/10'
            )}
          />
          <div
            className={cn(
              'absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10',
              isDark ? 'bg-secondary/5' : 'bg-accent/5'
            )}
          />
        </>
      )}

      <Container>
        <div className={layoutStyles[layout]}>
          {/* Text content */}
          <div className={cn(isTwoColumn && 'order-1')}>
            {subtitle && (
              <p
                className={cn(
                  'text-sm font-medium uppercase tracking-wider mb-4',
                  isDark ? 'text-secondary' : 'text-primary'
                )}
              >
                {subtitle}
              </p>
            )}
            <h1
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl font-bold font-display',
                isDark ? 'text-white' : 'text-text-main',
                !isTwoColumn && 'max-w-4xl mx-auto'
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  'mt-6 text-lg sm:text-xl',
                  isDark ? 'text-gray-300' : 'text-text-sub',
                  !isTwoColumn && 'max-w-2xl mx-auto'
                )}
              >
                {description}
              </p>
            )}
            {actions && (
              <div className={cn('mt-8 flex flex-wrap gap-4', !isTwoColumn && 'justify-center')}>
                {actions}
              </div>
            )}
            {children}
          </div>

          {/* Media content (twoColumn only) */}
          {isTwoColumn && media && <div className="order-2">{media}</div>}
        </div>
      </Container>
    </section>
  );
}

Hero.displayName = 'Hero';
