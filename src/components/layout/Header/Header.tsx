import { cn } from '../../../utils/cn';
import { useMobileMenu } from '../../../hooks/useMobileMenu';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import { Icon } from '../../primitives/Icon';
import { Container } from '../../primitives/Container';
import { Navigation } from '../Navigation';
import { MobileDrawer } from '../MobileDrawer';
import type { HeaderProps } from './Header.types';

export function Header({
  logo,
  logoHref = '/',
  links = [],
  cta,
  sticky = true,
  hideOnScroll = false,
  className,
}: HeaderProps) {
  const { isOpen, open, close } = useMobileMenu();
  const scrollDirection = useScrollDirection();

  const isHidden = hideOnScroll && scrollDirection === 'down';

  return (
    <>
      <header
        className={cn(
          'w-full bg-background-light/95 backdrop-blur border-b border-gray-100',
          'transition-transform duration-300',
          sticky && 'sticky top-0 z-50',
          isHidden && '-translate-y-full',
          className
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href={logoHref} className="flex-shrink-0">
              {logo}
            </a>

            {/* Desktop Navigation */}
            {links.length > 0 && (
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <Navigation links={links} />
              </div>
            )}

            {/* Desktop CTA */}
            {cta && (
              <div className="hidden lg:flex items-center gap-4">
                {cta}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={open}
              className={cn(
                'lg:hidden p-2 rounded-lg text-text-main',
                'hover:bg-background-off transition-colors'
              )}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <Icon name="menu" size="md" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isOpen} onClose={close} title="Menu">
        {links.length > 0 && (
          <Navigation links={links} orientation="vertical" className="mb-6" />
        )}
        {cta && (
          <div className="flex flex-col gap-3">
            {cta}
          </div>
        )}
      </MobileDrawer>
    </>
  );
}

Header.displayName = 'Header';
