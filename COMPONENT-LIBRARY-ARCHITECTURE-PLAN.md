# Gorombo Components Library - Complete Architecture Plan

## Executive Summary

This document defines how to build a React component library that works correctly with Astro (and other frameworks). The core problem we encountered was designing components that require ReactNode props (like `logo={<svg>...}`), which breaks when used with Astro's hydration system.

---

## Part 1: Understanding the Problem

### 1.1 What Went Wrong

The original Header component was designed like this:

```tsx
interface HeaderProps {
  logo: ReactNode;        // PROBLEM: Not serializable
  logoText?: string;
  links?: NavLink[];
  actions?: ReactNode;    // PROBLEM: Not serializable
  iconButtons?: ReactNode; // PROBLEM: Not serializable
}
```

When used in Astro with `client:load`:

```astro
<Header
  client:load
  logo={<svg>...</svg>}   <!-- FAILS: JSX can't be serialized -->
  actions={<Button>Login</Button>}  <!-- FAILS -->
/>
```

### 1.2 Why It Fails

Astro's hydration process:
1. Server renders the component to HTML
2. Serializes props to JSON for client hydration
3. Client receives JSON and rehydrates

**ReactNode/JSX elements contain:**
- Functions (event handlers, render functions)
- Circular references (parent/child relationships)
- Symbol keys (React internal markers)

**None of these can be JSON.stringify()'d.**

### 1.3 What CAN Be Serialized

Per Astro documentation, these prop types work with `client:*` directives:
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `Array` (of serializable values)
- `Object` (with serializable values)
- `Map`
- `Set`
- `BigInt`
- `Date`
- `RegExp`
- `URL`
- Typed arrays (Uint8Array, etc.)

**NOT serializable:**
- Functions
- Symbols
- ReactNode / JSX elements
- Class instances
- DOM nodes

---

## Part 2: The Solution - Slot-Based Architecture

### 2.1 How Astro Slots Work with React

Astro converts named slots to React props:

```astro
<!-- Astro usage -->
<MyComponent client:load>
  <svg slot="logo">...</svg>
  <nav slot="navigation">...</nav>
  <p>Default children content</p>
</MyComponent>
```

```tsx
// React component receives:
function MyComponent(props) {
  props.logo        // Contains the SVG
  props.navigation  // Contains the nav
  props.children    // Contains the <p>
}
```

**Slot name conversion:**
- `slot="my-slot"` → `props.mySlot` (kebab to camelCase)
- `slot="logo"` → `props.logo`
- No slot attribute → `props.children`

### 2.2 The Key Insight

**Design components to accept slots/children instead of ReactNode props.**

Instead of:
```tsx
interface BadHeaderProps {
  logo: ReactNode;  // Requires JSX prop
}
```

Do:
```tsx
interface GoodHeaderProps {
  // Serializable props only
  logoText?: string;
  logoHref?: string;
  sticky?: boolean;
  // Content comes via children/slots
  children?: ReactNode;
  logo?: ReactNode;      // Populated by slot="logo"
  navigation?: ReactNode; // Populated by slot="navigation"
  actions?: ReactNode;    // Populated by slot="actions"
}
```

### 2.3 Usage Pattern

```astro
---
import { Header, Button, Navigation } from 'gorombo-components';
---

<Header client:load logoText="Gorombo" sticky>
  <!-- Named slots become props -->
  <svg slot="logo" viewBox="0 0 48 48">...</svg>

  <nav slot="navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>

  <div slot="actions">
    <Button client:load>Login</Button>
  </div>

  <!-- Default children -->
  <button slot="mobileMenuButton" class="lg:hidden">
    Menu
  </button>
</Header>
```

---

## Part 3: Component Design Principles

### Principle 0: SELF-CONTAINED COMPONENTS (MOST IMPORTANT)

**If the user needs to write JavaScript outside your component to make it work, YOU FAILED.**

A React component used in Astro must:
- Manage its own state internally
- Handle all its own interactions
- NOT require external script tags
- NOT require manual event wiring
- NOT require IDs for external access

**BAD - Requires external JavaScript:**
```astro
<Header client:load />
<Drawer client:load id="drawer" />

<script>
  // THIS IS WRONG - component is broken
  document.getElementById('menu-btn').onclick = () => {
    document.getElementById('drawer').open();
  };
</script>
```

**GOOD - Self-contained:**
```astro
<HeaderWithDrawer client:load links={navLinks}>
  <svg slot="logo">...</svg>
</HeaderWithDrawer>

<!-- No script needed. Component handles everything. -->
```

**If two components need to communicate, they should be ONE component, or use a shared context provider that's also a component.**

### Principle 1: Serializable Props Only (for hydrated components)

**Every prop that could be passed to a `client:*` component MUST be serializable.**

```tsx
// GOOD - All serializable
interface CardProps {
  title: string;
  description?: string;
  variant?: 'filled' | 'outlined';
  interactive?: boolean;
  className?: string;
  children?: ReactNode;  // Comes from Astro children, not prop
}

// BAD - Non-serializable props
interface CardProps {
  icon: ReactNode;        // Can't serialize JSX
  onClick: () => void;    // Can't serialize functions
  renderHeader: () => JSX.Element;  // Can't serialize
}
```

### Principle 2: Use Slots for Complex Content

When you need to accept complex/custom content:

```tsx
interface SectionProps {
  // Serializable configuration
  background?: 'light' | 'dark' | 'primary';
  spacing?: 'compact' | 'normal' | 'wide';

  // Content via slots (named) or children (default)
  title?: ReactNode;      // slot="title"
  subtitle?: ReactNode;   // slot="subtitle"
  actions?: ReactNode;    // slot="actions"
  children?: ReactNode;   // default slot
}

function Section({ background, spacing, title, subtitle, actions, children }: SectionProps) {
  return (
    <section className={...}>
      {(title || subtitle) && (
        <header>
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </header>
      )}
      {children}
      {actions && <footer>{actions}</footer>}
    </section>
  );
}
```

### Principle 3: String-Based Alternatives for Common Cases

For frequently-used patterns, provide string-based props as alternatives:

```tsx
interface ButtonProps {
  children: ReactNode;

  // String-based icon (uses Icon component internally)
  iconName?: string;      // e.g., "arrow_forward"
  iconPosition?: 'left' | 'right';

  // OR slot-based custom icon
  icon?: ReactNode;       // slot="icon" for custom icons
}

function Button({ children, iconName, iconPosition, icon }: ButtonProps) {
  const iconElement = icon || (iconName && <Icon name={iconName} />);

  return (
    <button>
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </button>
  );
}
```

Usage:
```astro
<!-- Simple: string-based icon -->
<Button client:load iconName="arrow_forward" iconPosition="right">
  Next
</Button>

<!-- Custom: slot-based icon -->
<Button client:load>
  <CustomSvg slot="icon" />
  Next
</Button>
```

### Principle 4: Separate Interactive from Static

Not every component needs hydration. Design components that can work statically:

```tsx
// This component has NO interactivity - no need for client:load
function Badge({ variant, children }: BadgeProps) {
  return <span className={...}>{children}</span>;
}

// Usage in Astro - NO client directive needed
<Badge variant="success">Active</Badge>  // Static HTML only
```

**When to use `client:*`:**
- Component has useState, useEffect, event handlers
- Component uses browser APIs
- Component needs to respond to user interaction

**When to skip `client:*`:**
- Pure presentational component
- No React hooks
- No event handlers
- Just renders HTML with styles

### Principle 5: Composition Over Configuration

Instead of one mega-component with many props:

```tsx
// BAD: Mega component
<Header
  logo={<Logo />}
  logoText="Brand"
  links={navLinks}
  actions={<Button>Login</Button>}
  mobileDrawerContent={<MobileNav />}
  showCart={true}
  cartCount={3}
  onCartClick={() => {}}
  showSearch={true}
  onSearch={() => {}}
  // ... 50 more props
/>
```

Do composable pieces:

```tsx
// GOOD: Composable
<Header logoText="Brand" sticky>
  <Logo slot="logo" />
  <Navigation slot="navigation" links={navLinks} />
  <HeaderActions slot="actions">
    <CartButton count={3} />
    <SearchButton />
    <Button>Login</Button>
  </HeaderActions>
  <MobileMenuButton slot="mobileMenu" />
</Header>

<MobileDrawer>
  <Navigation orientation="vertical" links={navLinks} />
  <Button fullWidth>Login</Button>
</MobileDrawer>
```

---

## Part 4: Component Categories and Patterns

### 4.1 Category A: Pure Static Components (No Hydration)

These NEVER need `client:*`:

```
- Badge
- Icon (when using CSS/font icons)
- Container
- Section (layout wrapper)
- Card (basic)
- Footer (basic)
- Divider
- Spacer
- Typography components (Heading, Text, etc.)
```

Design pattern:
```tsx
interface StaticComponentProps {
  // Any props are fine - no serialization needed
  variant?: string;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;  // OK because no hydration
}
```

### 4.2 Category B: Optionally Interactive Components

These work static OR hydrated:

```
- Button (static unless onClick needed)
- Link (static unless client-side routing)
- Card (static unless onClick/hover effects)
- Input (static for display, hydrated for forms)
```

Design pattern:
```tsx
interface OptionallyInteractiveProps {
  // Serializable props for when hydrated
  variant?: 'primary' | 'secondary';
  disabled?: boolean;

  // Children via slots
  children?: ReactNode;

  // Event handlers only work when hydrated
  // Document this clearly
  onClick?: () => void;  // Only works with client:*
}
```

### 4.3 Category C: Always Interactive Components

These ALWAYS need `client:*`:

```
- Dropdown/Select
- Modal/Dialog
- Drawer/Sidebar (with open/close)
- Accordion
- Tabs
- Tooltip (hover-triggered)
- Form components with validation
- Carousel/Slider
```

Design pattern:
```tsx
interface InteractiveComponentProps {
  // ONLY serializable configuration props
  isOpen?: boolean;
  defaultOpen?: boolean;
  side?: 'left' | 'right';

  // Callbacks - must be defined in Astro's client script or passed via islands
  onOpenChange?: (open: boolean) => void;

  // All content via children/slots
  children?: ReactNode;
  trigger?: ReactNode;  // slot="trigger"
  content?: ReactNode;  // slot="content"
}
```

### 4.4 Category D: Layout Orchestrators

Components that coordinate other components:

```
- Header (orchestrates logo, nav, actions, mobile menu)
- Sidebar (orchestrates header, content, footer)
- Page (orchestrates header, main, footer)
```

Design pattern:
```tsx
interface LayoutOrchestratorProps {
  // Configuration only - serializable
  sticky?: boolean;
  variant?: string;

  // Named slots for each section
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  mobileMenu?: ReactNode;
  children?: ReactNode;
}
```

---

## Part 5: Modular Component Architecture

### 5.1 Current Problems

1. `logo` prop requires ReactNode - not serializable
2. `actions` prop requires ReactNode - not serializable
3. Built-in drawer couples mobile behavior to header
4. Hard to customize individual pieces

### 5.2 New Architecture: Nano Stores Pattern

**THE KEY INSIGHT: Components communicate via shared stores, NOT props or context.**

Astro creates separate "islands" for each `client:*` component. React Context CANNOT pass between islands. The solution is **Nano Stores** - a lightweight state management library that works outside React.

Reference: https://docs.astro.build/en/recipes/sharing-state-islands/

**ARCHITECTURE:**
```
┌─────────────────────────────────────────────────────────────┐
│                    drawerStore.ts                           │
│                   (shared store file)                       │
│                                                             │
│   export const isDrawerOpen = atom(false);                  │
│   export const openDrawer = () => isDrawerOpen.set(true);   │
│   export const closeDrawer = () => isDrawerOpen.set(false); │
└─────────────────────────────────────────────────────────────┘
              ↑                           ↑
              │ imports                   │ imports
              │                           │
┌─────────────┴───────────┐   ┌──────────┴────────────┐
│      Header.tsx         │   │      Drawer.tsx       │
│                         │   │                       │
│  - Has hamburger button │   │  - useStore(isOpen)   │
│  - onClick: openDrawer()│   │  - Shows when open    │
│  - Standalone component │   │  - Standalone component│
│  - client:load          │   │  - client:load        │
└─────────────────────────┘   └───────────────────────┘
```

**MODULAR COMPONENTS (all standalone):**
```
├── Header (header bar with hamburger - calls store to open drawer)
├── Navigation (horizontal/vertical nav links - pure, no state)
├── NavDropdown (single dropdown - manages own open/close)
├── Drawer (subscribes to store - shows/hides based on store)
├── DrawerOverlay (subscribes to store - shows/hides)
├── HeaderActions (layout container - pure, no state)
```

**Each component works independently. They communicate via the shared store.**

### 5.2.1 Why This Works

1. **No External JS in .astro** - Store logic is INSIDE the React components
2. **Truly Modular** - Header doesn't import Drawer, Drawer doesn't import Header
3. **Swappable** - Use ANY drawer component that subscribes to the store
4. **Self-Contained** - Each component handles its own behavior

### 5.2.2 Astro Usage

```astro
---
import { Header, Navigation, Drawer } from 'gorombo-components';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];
---

<!-- Each is a separate island, but they share state via nanostores -->
<Header client:load logoText="Brand">
  <svg slot="logo">...</svg>
  <Navigation slot="nav" links={navLinks} />
  <div slot="actions">
    <button>Login</button>
  </div>
</Header>

<!-- Drawer is completely separate - communicates via store -->
<Drawer client:load side="left">
  <Navigation links={navLinks} orientation="vertical" />
</Drawer>

<!-- NO SCRIPT TAG NEEDED - components handle everything internally -->
```

### 5.2.3 Swappable Drawer Pattern

To use a CUSTOM drawer instead of the default:

```astro
---
import { Header, Navigation } from 'gorombo-components';
import { MyCustomDrawer } from './MyCustomDrawer';
---

<Header client:load logoText="Brand">
  <!-- ... -->
</Header>

<!-- Your custom drawer - just needs to use the store -->
<MyCustomDrawer client:load>
  <Navigation links={navLinks} orientation="vertical" />
</MyCustomDrawer>
```

**Your custom drawer must:**
```tsx
// MyCustomDrawer.tsx
import { useStore } from '@nanostores/react';
import { isDrawerOpen, closeDrawer } from 'gorombo-components/stores';

export function MyCustomDrawer({ children }) {
  const $isOpen = useStore(isDrawerOpen);

  if (!$isOpen) return null;

  return (
    <aside className="my-fancy-drawer">
      <button onClick={closeDrawer}>Close</button>
      {children}
    </aside>
  );
}
```

**That's it.** As long as your drawer:
1. Imports `isDrawerOpen` from the store
2. Uses `useStore(isDrawerOpen)` to read state
3. Calls `closeDrawer()` to close

It will work with the Header's hamburger button automatically.

### 5.3 Header Component Specification (PRIMARY)

The Header is a **standalone component**. It renders the header bar and hamburger button. When the hamburger is clicked, it calls `openDrawer()` from the store.

```tsx
interface HeaderProps {
  // === ALL SERIALIZABLE ===
  logoText?: string;
  logoHref?: string;
  sticky?: boolean;
  hideOnScroll?: boolean;
  className?: string;

  // === Slots (from Astro named slots) ===
  logo?: ReactNode;       // slot="logo"
  nav?: ReactNode;        // slot="nav" - desktop navigation
  actions?: ReactNode;    // slot="actions" - right side buttons
  children?: ReactNode;
}

// Implementation
import { openDrawer } from '../stores/drawerStore';

function Header({ logoText, logoHref, sticky, logo, nav, actions, children }: HeaderProps) {
  return (
    <header className={cn('header', sticky && 'sticky')}>
      {/* Logo */}
      <a href={logoHref || '/'} className="flex items-center gap-2">
        {logo}
        {logoText && <span className="font-bold">{logoText}</span>}
      </a>

      {/* Desktop Navigation (slot) */}
      <div className="hidden lg:flex">{nav}</div>

      {/* Desktop Actions (slot) */}
      <div className="hidden lg:flex">{actions}</div>

      {/* Mobile Hamburger - calls store */}
      <button
        onClick={openDrawer}
        className="lg:hidden"
        aria-label="Open menu"
      >
        <Icon name="menu" />
      </button>

      {children}
    </header>
  );
}
```

**Key points:**
- Header does NOT contain the Drawer
- Header does NOT import the Drawer component
- Header only imports the STORE and calls `openDrawer()`
- Completely standalone

### 5.4 Drawer Component Specification (PRIMARY)

The Drawer is a **standalone component**. It subscribes to the store and shows/hides based on `isDrawerOpen`.

```tsx
interface DrawerProps {
  // === ALL SERIALIZABLE ===
  side?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg' | string;
  className?: string;

  // === Slots ===
  header?: ReactNode;    // slot="header"
  footer?: ReactNode;    // slot="footer"
  children?: ReactNode;  // Main content
}

// Implementation
import { useStore } from '@nanostores/react';
import { isDrawerOpen, closeDrawer } from '../stores/drawerStore';

function Drawer({ side = 'left', width = 'md', header, footer, children }: DrawerProps) {
  const $isOpen = useStore(isDrawerOpen);

  return (
    <>
      {/* Overlay */}
      {$isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={cn(
          'fixed top-0 h-full z-50 bg-white transform transition-transform',
          side === 'left' ? 'left-0' : 'right-0',
          $isOpen ? 'translate-x-0' : (side === 'left' ? '-translate-x-full' : 'translate-x-full'),
          widthClasses[width]
        )}
      >
        {/* Close button */}
        <button onClick={closeDrawer} aria-label="Close menu">
          <Icon name="close" />
        </button>

        {header}
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer}
      </aside>
    </>
  );
}
```

**Key points:**
- Drawer does NOT receive state from props
- Drawer SUBSCRIBES to the store using `useStore(isDrawerOpen)`
- Drawer calls `closeDrawer()` when close button clicked
- Completely standalone - works with ANY Header that uses the same store

### 5.5 Navigation Component Specification

Navigation is a **pure component** - no state management, just renders links.

```tsx
interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];  // For dropdowns
}

interface NavigationProps {
  // === ALL SERIALIZABLE ===
  links: NavLink[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

function Navigation({ links, orientation = 'horizontal', className }: NavigationProps) {
  return (
    <nav className={cn(
      orientation === 'horizontal' ? 'flex gap-6' : 'flex flex-col gap-2',
      className
    )}>
      {links.map(link =>
        link.children ? (
          <NavDropdown key={link.label} label={link.label} items={link.children} />
        ) : (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        )
      )}
    </nav>
  );
}
```

**Key points:**
- Pure presentational - no state
- Can be used anywhere: in Header, in Drawer, standalone
- NavDropdown handles its own open/close state internally

### 5.6 Store Specification

The store is the communication layer between components. Export from `gorombo-components/stores`.

```tsx
// stores/drawerStore.ts
import { atom } from 'nanostores';

// State atom
export const isDrawerOpen = atom<boolean>(false);

// Actions
export const openDrawer = () => isDrawerOpen.set(true);
export const closeDrawer = () => isDrawerOpen.set(false);
export const toggleDrawer = () => isDrawerOpen.set(!isDrawerOpen.get());
```

**Package exports:**
```tsx
// In package.json or index.ts
export { isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } from './stores/drawerStore';
```

**Users can import the store to build custom components:**
```tsx
import { isDrawerOpen, closeDrawer } from 'gorombo-components/stores';
```

### 5.7 Usage Examples

#### Example 1: Full Modular Astro Usage

**CRITICAL RULE: No JavaScript outside components in Astro files.**

```astro
---
import { Header, Navigation, Drawer } from 'gorombo-components';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '#', children: [
    { label: 'Web Design', href: '/services/design' },
    { label: 'Development', href: '/services/dev' },
  ]},
];
---

<!-- Header is its own island -->
<Header client:load logoText="Gorombo" logoHref="/" sticky>
  <!-- Logo via slot -->
  <svg slot="logo" viewBox="0 0 48 48" class="w-8 h-8 text-primary">
    <path d="..." fill="currentColor"/>
  </svg>

  <!-- Desktop navigation via slot -->
  <Navigation slot="nav" links={navLinks} />

  <!-- Desktop actions via slot -->
  <div slot="actions">
    <button class="p-2 hover:bg-gray-100 rounded-full">
      <span class="material-symbols-outlined">shopping_cart</span>
    </button>
    <button class="bg-primary text-white px-4 py-2 rounded-lg">Login</button>
  </div>
</Header>

<!-- Drawer is a SEPARATE island - communicates via nanostores -->
<Drawer client:load side="left">
  <Navigation links={navLinks} orientation="vertical" />
  <div slot="footer">
    <button class="w-full bg-primary text-white py-3 rounded-lg">Login</button>
  </div>
</Drawer>

<!-- NO <script> TAG NEEDED -->
<!-- Header calls openDrawer() when hamburger clicked -->
<!-- Drawer subscribes to isDrawerOpen store -->
<!-- They communicate via nanostores, not props -->
```

**Why this works:**
- Header and Drawer are separate islands
- Both import the same `drawerStore`
- Header calls `openDrawer()` on hamburger click
- Drawer uses `useStore(isDrawerOpen)` to show/hide
- No external coordination needed - it's all internal to the components

#### Example 2: Swappable Custom Drawer

Use ANY drawer component - just subscribe to the store:

```astro
---
import { Header, Navigation } from 'gorombo-components';
import { MyBottomSheetDrawer } from '../components/MyBottomSheetDrawer';

const navLinks = [...];
---

<Header client:load logoText="MyBrand" sticky>
  <svg slot="logo">...</svg>
  <Navigation slot="nav" links={navLinks} />
</Header>

<!-- Your custom drawer - subscribes to the same store -->
<MyBottomSheetDrawer client:load>
  <Navigation links={navLinks} orientation="vertical" />
</MyBottomSheetDrawer>
```

**Your custom drawer:**
```tsx
// MyBottomSheetDrawer.tsx
import { useStore } from '@nanostores/react';
import { isDrawerOpen, closeDrawer } from 'gorombo-components/stores';

export function MyBottomSheetDrawer({ children }) {
  const $isOpen = useStore(isDrawerOpen);

  return (
    <div className={cn('bottom-sheet', $isOpen && 'open')}>
      <button onClick={closeDrawer}>Close</button>
      {children}
    </div>
  );
}
```

**That's all it takes.** Subscribe to the store, render based on state.

#### Example 3: Static Header (No Hydration)

For pages that don't need interactive header features:

```astro
---
import { Header } from 'gorombo-components';
---

<!-- No client:load = pure static HTML -->
<Header logoText="Gorombo" logoHref="/" sticky>
  <svg slot="logo" viewBox="0 0 48 48" class="w-8 h-8 text-primary">
    <path d="..." fill="currentColor"/>
  </svg>

  <nav slot="nav" class="hidden lg:flex gap-8">
    <a href="/" class="text-text-main hover:text-primary">Home</a>
    <a href="/about" class="text-text-main hover:text-primary">About</a>
    <a href="/contact" class="text-text-main hover:text-primary">Contact</a>
  </nav>

  <div slot="actions" class="hidden lg:flex gap-4">
    <a href="/login" class="btn btn-primary">Login</a>
  </div>
</Header>
```

#### Example 4: React-Only Usage

```tsx
import { Header, Navigation, HeaderActions, Button, MobileDrawer, DrawerOverlay } from 'gorombo-components';
import { useState } from 'react';

function MyHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header
        logo={<Logo />}  // Direct JSX works in React
        logoText="Gorombo"
        sticky
      >
        <Navigation links={navLinks} orientation="horizontal" className="hidden lg:flex" />
        <HeaderActions className="hidden lg:flex">
          <CartButton />
          <Button>Login</Button>
        </HeaderActions>
        <button className="lg:hidden" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </button>
      </Header>

      <DrawerOverlay isOpen={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Navigation links={navLinks} orientation="vertical" />
        <Button fullWidth>Login</Button>
      </MobileDrawer>
    </>
  );
}
```

---

## Part 6: Implementation Checklist

### Phase 1: Setup Nano Stores

- [ ] Add `nanostores` and `@nanostores/react` to dependencies
- [ ] Create `src/stores/drawerStore.ts` with:
  - [ ] `isDrawerOpen` atom
  - [ ] `openDrawer()` action
  - [ ] `closeDrawer()` action
  - [ ] `toggleDrawer()` action
- [ ] Export stores from `gorombo-components/stores`
- [ ] Configure package.json exports field for `/stores` path

### Phase 2: Create Modular Header Components

**Header Component:**
- [ ] Standalone header bar component
- [ ] Imports `openDrawer` from store
- [ ] Hamburger button calls `openDrawer()` on click
- [ ] Accepts slots: `logo`, `nav`, `actions`
- [ ] Does NOT contain or import Drawer

**Drawer Component:**
- [ ] Standalone drawer component
- [ ] Uses `useStore(isDrawerOpen)` to subscribe to state
- [ ] Shows/hides based on store value
- [ ] Close button calls `closeDrawer()`
- [ ] Includes overlay with click-to-close
- [ ] Accepts slots: `header`, `footer`, `children`

**Navigation Component:**
- [ ] Pure presentational component
- [ ] Renders `links` array (serializable)
- [ ] Supports `horizontal` and `vertical` orientation
- [ ] No state management

**NavDropdown Component:**
- [ ] Manages own open/close state internally
- [ ] Hover or click trigger option
- [ ] Self-contained - no external JS needed

### Phase 3: Verify Other Interactive Components

For each interactive component, ensure it's self-contained:

- [ ] Modal/Dialog - opens via internal trigger, not external ID
- [ ] Accordion - manages own expand/collapse state
- [ ] Tabs - manages own tab state
- [ ] Dropdown/Select - manages own open state
- [ ] Tooltip - manages own hover state

If any require external JS to function, REDESIGN THEM.

### Phase 4: Fix Non-Serializable Props

For each component with ReactNode props that users pass:

| Component | Bad Prop | Fix |
|-----------|----------|-----|
| Button | icon: ReactNode | iconName: string OR slot |
| Card | icon: ReactNode | iconName: string OR slot |
| Hero | media: ReactNode | slot="media" |
| Hero | actions: ReactNode | slot="actions" |

- [ ] Button: Add iconName prop, keep icon slot for custom
- [ ] Card: Add iconName prop if applicable
- [ ] Hero: Convert media/actions to slots
- [ ] Section: Convert title/subtitle to slots OR string props
- [ ] Footer: Review and fix any ReactNode props

### Phase 5: Testing Protocol

**For EVERY component:**

Test 1: Static (no client directive)
```astro
<Component prop="value" />
<!-- Must render correct HTML, no errors -->
```

Test 2: Hydrated
```astro
<Component client:load prop="value" />
<!-- Must hydrate without serialization errors -->
```

Test 3: With Slots
```astro
<Component client:load>
  <div slot="header">Custom header</div>
  <p>Children content</p>
</Component>
<!-- Slots must map to props correctly -->
```

Test 4: Console Check
- Open browser console
- NO errors about serialization
- NO errors about props
- NO warnings about hydration mismatch

- [ ] Test Header + Drawer communication (critical)
- [ ] Test Navigation
- [ ] Test MobileDrawer
- [ ] Test Modal
- [ ] Test all other interactive components
- [ ] Test all static components

### Phase 6: Documentation

- [ ] README: "Using with Astro" section
- [ ] For each component, document:
  - [ ] Which props are serializable
  - [ ] Which slots are available
  - [ ] Whether client directive is needed
  - [ ] Copy-paste Astro example
- [ ] Create Astro example project in /examples
- [ ] Storybook: Add Astro usage notes to each story

### Phase 7: Final Verification

- [ ] Fresh Astro project, install gorombo-components
- [ ] Build a complete page using only gorombo-components
- [ ] NO <script> tags in .astro files
- [ ] NO console errors
- [ ] Page works on mobile and desktop
- [ ] All interactive features work (drawers open, dropdowns work, etc.)

---

## Part 7: Component Reference

### Components That Work Without Hydration

| Component | Props | Notes |
|-----------|-------|-------|
| Badge | variant, size, children | Pure CSS styling |
| Icon | name, size, className | Font-based icons |
| Container | maxWidth, className, children | Layout wrapper |
| Section | background, spacing, children | Layout wrapper |
| Divider | orientation, className | Pure CSS |
| Spacer | size | Pure CSS |

### Components That Need Hydration

| Component | Why | Slots |
|-----------|-----|-------|
| Navigation | Dropdown interactions | children |
| NavDropdown | Hover/click state | - |
| MobileDrawer | Open/close state | header, footer, children |
| Modal | Open/close state | trigger, content |
| Accordion | Expand/collapse | items |
| Tabs | Tab switching | tabs, panels |
| Tooltip | Hover detection | trigger, content |
| Select | Dropdown state | - |

### Components That Are Flexible

| Component | Static Use | Hydrated Use |
|-----------|------------|--------------|
| Button | Link styling | Click handlers |
| Card | Display only | Click interactions |
| Header | Static nav | Scroll hide, mobile menu |
| Input | Display value | Form interactions |

---

## Part 8: Astro Configuration Recommendations

### astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react({
      // Enable if you have issues with children parsing
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
});
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

### Package.json Dependencies

```json
{
  "dependencies": {
    "@astrojs/react": "^3.0.0",
    "gorombo-components": "^0.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## Part 9: Migration Guide

### For Existing Users

#### Before (Broken)

```astro
<Header
  client:load
  logo={<MySvg />}
  actions={<Button>Login</Button>}
/>
```

#### After (Working)

```astro
<Header client:load logoText="Brand">
  <MySvg slot="logo" />
  <div slot="actions">
    <Button client:load>Login</Button>
  </div>
</Header>
```

### Key Migration Steps

1. Move ReactNode props to slots
2. Add `slot="propName"` to moved content
3. Hydrate child components separately with their own `client:*`
4. For string-based alternatives, use the new props

---

## Part 10: Success Criteria

The component library is correctly designed when:

1. **Zero serialization errors** - No console errors about non-serializable props
2. **Works static** - Components render without any JavaScript when no `client:*` used
3. **Works hydrated** - Components become interactive with `client:load`
4. **Slots work** - Named slots correctly map to props
5. **Nested hydration works** - Can have hydrated components inside hydrated parents
6. **Documentation is clear** - Users know exactly how to use each component in Astro
7. **TypeScript is happy** - No type errors, good intellisense
8. **React-only still works** - Direct JSX props work in pure React apps

---

## Appendix A: Serialization Test

Use this to verify a prop is serializable:

```ts
function isSerializable(value: unknown): boolean {
  try {
    const serialized = JSON.stringify(value);
    const deserialized = JSON.parse(serialized);
    return JSON.stringify(deserialized) === serialized;
  } catch {
    return false;
  }
}

// Test your props
console.log(isSerializable("hello"));           // true
console.log(isSerializable(42));                // true
console.log(isSerializable({ a: 1, b: 2 }));    // true
console.log(isSerializable([1, 2, 3]));         // true
console.log(isSerializable(() => {}));          // false - FUNCTION
console.log(isSerializable(<div>hi</div>));     // false - JSX
console.log(isSerializable(Symbol('x')));       // false - SYMBOL
```

---

## Appendix B: Quick Reference Card

### Prop Types for Hydrated Components

| Type | Serializable? | Use For |
|------|---------------|---------|
| string | YES | Text, class names, IDs |
| number | YES | Counts, sizes, indices |
| boolean | YES | Flags, toggles |
| string[] | YES | Lists of options |
| object | YES* | Configuration objects |
| Date | YES | Timestamps |
| RegExp | YES | Patterns |
| function | NO | Use events/callbacks in client script |
| ReactNode | NO | Use slots instead |
| Symbol | NO | Avoid |

*Objects must contain only serializable values

### Slot Mapping

| Astro | React |
|-------|-------|
| `<div slot="header">` | `props.header` |
| `<div slot="my-content">` | `props.myContent` |
| `<div>` (no slot) | `props.children` |

### Client Directives

| Directive | When Hydrates | Use For |
|-----------|--------------|---------|
| (none) | Never | Static content |
| `client:load` | Page load | Critical interactivity |
| `client:idle` | Browser idle | Secondary features |
| `client:visible` | In viewport | Below-fold content |
| `client:media="()"` | Media match | Responsive features |
| `client:only="react"` | Client only | No SSR needed |

---

*Document Version: 1.0*
*Created: December 2024*
*For: gorombo-components library*
