# Header Component Refactor Plan

**Problem:** The current Header component bundles everything together (header bar, navigation, mobile drawer, backdrop) making it inflexible and hard to customize.

**Goal:** Split into composable pieces that can be used independently or together.

---

## Current Structure (Bad)

```
Header (monolithic)
├── Header bar
├── Desktop navigation + dropdowns
├── Mobile hamburger button
├── Mobile drawer (built-in)
└── Backdrop overlay
```

---

## Proposed Structure (Composable)

```
Layout Components:
├── Header - Just the bar container with slots
├── Navigation - Nav links (desktop/mobile agnostic)
├── NavDropdown - Single dropdown menu item
├── MobileDrawer - Standalone slide-out drawer
├── DrawerOverlay - Backdrop component
└── HeaderActions - Right-side action buttons area
```

---

## Component Specifications

### 1. Header (Refactored)

**Purpose:** Container for the header bar only. No drawer logic.

**Props:**
```typescript
interface HeaderProps {
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  sticky?: boolean;
  hideOnScroll?: boolean;
  className?: string;
  children?: ReactNode; // For custom content
}
```

**Slots/Children Pattern:**
```tsx
<Header logo={<Logo />} logoText="Brand">
  <Navigation links={navLinks} /> {/* Desktop nav */}
  <HeaderActions>
    <IconButton icon="cart" />
    <Button>Login</Button>
  </HeaderActions>
  <MobileMenuButton onClick={openDrawer} /> {/* Mobile only */}
</Header>
```

### 2. Navigation

**Purpose:** Render nav links with optional dropdowns. Works in header or drawer.

**Props:**
```typescript
interface NavigationProps {
  links: NavLink[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
```

**Usage:**
```tsx
// In desktop header
<Navigation links={navLinks} orientation="horizontal" />

// In mobile drawer
<Navigation links={navLinks} orientation="vertical" />
```

### 3. NavDropdown

**Purpose:** Single dropdown menu item with hover (desktop) or click (mobile) behavior.

**Props:**
```typescript
interface NavDropdownProps {
  label: string;
  items: NavLink[];
  trigger?: 'hover' | 'click';
  className?: string;
}
```

### 4. MobileDrawer

**Purpose:** Standalone slide-out drawer. Can contain anything.

**Props:**
```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: string;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<MobileDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  header={<DrawerHeader logo={<Logo />} onClose={close} />}
  footer={<Button fullWidth>Login</Button>}
>
  <Navigation links={navLinks} orientation="vertical" />
</MobileDrawer>
```

### 5. DrawerOverlay

**Purpose:** Backdrop that closes drawer on click.

**Props:**
```typescript
interface DrawerOverlayProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}
```

### 6. HeaderActions

**Purpose:** Container for right-side action buttons with responsive visibility.

**Props:**
```typescript
interface HeaderActionsProps {
  children: ReactNode;
  hideOnMobile?: boolean;
  className?: string;
}
```

---

## Migration Path

### Phase 1: Create New Components
1. Create `Navigation` component
2. Create `NavDropdown` component
3. Create `MobileDrawer` component
4. Create `DrawerOverlay` component
5. Create `HeaderActions` component

### Phase 2: Refactor Header
1. Strip drawer logic from Header
2. Make Header accept children for composition
3. Update Header types

### Phase 3: Backwards Compatibility
1. Create `HeaderWithDrawer` composite component for easy migration
2. Export both old pattern and new composable pattern
3. Update documentation

### Phase 4: Update Exports
1. Update `src/components/layout/index.ts`
2. Update main `src/index.ts`

---

## File Structure After Refactor

```
src/components/layout/
├── Header/
│   ├── Header.tsx
│   ├── Header.types.ts
│   ├── HeaderActions.tsx
│   └── index.ts
├── Navigation/
│   ├── Navigation.tsx
│   ├── Navigation.types.ts
│   ├── NavDropdown.tsx
│   ├── NavLink.tsx
│   └── index.ts
├── MobileDrawer/
│   ├── MobileDrawer.tsx
│   ├── MobileDrawer.types.ts
│   ├── DrawerOverlay.tsx
│   ├── DrawerHeader.tsx
│   └── index.ts
├── Footer/
│   └── (unchanged)
└── index.ts
```

---

## Usage Example (After Refactor)

```tsx
// Full composable usage
import {
  Header,
  Navigation,
  MobileDrawer,
  DrawerOverlay,
  HeaderActions
} from 'gorombo-components';

function MyHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header logo={<Logo />} logoText="Gorombo" sticky hideOnScroll>
        <Navigation links={navLinks} orientation="horizontal" className="hidden lg:flex" />
        <HeaderActions hideOnMobile>
          <IconButton icon="cart" />
          <Button>Login</Button>
        </HeaderActions>
        <button className="lg:hidden" onClick={() => setDrawerOpen(true)}>
          <Icon name="menu" />
        </button>
      </Header>

      <DrawerOverlay isOpen={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        footer={<Button fullWidth>Login</Button>}
      >
        <Navigation links={navLinks} orientation="vertical" />
      </MobileDrawer>
    </>
  );
}
```

---

## Acceptance Criteria

- [ ] Each component works independently
- [ ] Components compose together cleanly
- [ ] TypeScript types are correct
- [ ] Existing Header functionality can be replicated
- [ ] Mobile drawer works standalone
- [ ] Navigation works in both orientations
- [ ] Backwards compatible export available
- [ ] Build passes
- [ ] Storybook stories for each component
