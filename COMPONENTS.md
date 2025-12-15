# Gorombo Components Reference

Complete API reference for all components in the library.

---

## Table of Contents

- [Primitives](#primitives)
  - [Button](#button)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Badge](#badge)
  - [Icon](#icon)
  - [Container](#container)
- [Composed](#composed)
  - [Card](#card)
  - [Hero](#hero)
  - [Section](#section)
  - [PricingCard](#pricingcard)
- [Layout](#layout)
  - [Header](#header)
  - [Navigation](#navigation)
  - [MobileDrawer](#mobiledrawer)
  - [Footer](#footer)
- [Hooks](#hooks)
  - [useMediaQuery](#usemediaquery)
  - [useMobileMenu](#usemobilemenu)
  - [useClickOutside](#useclickoutside)
  - [useScrollDirection](#usescrolldirection)

---

## Primitives

### Button

Multi-variant button component with loading state support.

```tsx
import { Button } from 'gorombo-components';

<Button variant="primary" size="lg">Get Started</Button>
<Button variant="accent" loading>Submitting...</Button>
<Button variant="ghost" icon={<Icon name="arrow_forward" />} iconPosition="right">
  Learn More
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outlined'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show spinner, disable interaction |
| `fullWidth` | `boolean` | `false` | Expand to container width |
| `icon` | `ReactNode` | - | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `disabled` | `boolean` | `false` | Disable the button |

---

### Input

Text input with label, error, and helper text support.

```tsx
import { Input } from 'gorombo-components';

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Password" type="password" error="Password is required" />
<Input icon={<Icon name="search" />} placeholder="Search..." />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text above input |
| `error` | `string` | - | Error message (shows red border) |
| `helperText` | `string` | - | Helper text below input |
| `icon` | `ReactNode` | - | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `fullWidth` | `boolean` | `false` | Expand to container width |

Also accepts all standard `<input>` props.

---

### Textarea

Multi-line text input with optional auto-resize.

```tsx
import { Textarea } from 'gorombo-components';

<Textarea label="Message" rows={4} placeholder="Your message..." />
<Textarea label="Bio" autoResize helperText="Max 500 characters" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text above textarea |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below |
| `rows` | `number` | `4` | Initial row count |
| `autoResize` | `boolean` | `false` | Auto-expand with content |
| `fullWidth` | `boolean` | `false` | Expand to container width |

---

### Badge

Labels, tags, and status indicators.

```tsx
import { Badge } from 'gorombo-components';

<Badge variant="primary">New</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="error" size="sm">3 errors</Badge>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `icon` | `ReactNode` | - | Icon before text |
| `dot` | `boolean` | `false` | Show dot indicator instead of icon |

---

### Icon

Material Symbols icon wrapper with size and weight control.

```tsx
import { Icon } from 'gorombo-components';

<Icon name="home" />
<Icon name="settings" size="lg" weight={600} />
<Icon name="favorite" fill aria-label="Favorite" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Material Symbols icon name |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Icon size (16/20/24/30px) |
| `weight` | `100-700` | `400` | Font weight |
| `fill` | `boolean` | `false` | Filled vs outlined |
| `aria-label` | `string` | - | Accessible label |

**Note:** Requires Material Symbols font. Add to your HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

---

### Container

Max-width wrapper for consistent page layouts.

```tsx
import { Container } from 'gorombo-components';

<Container maxWidth="7xl" padding="md">
  <h1>Page Content</h1>
</Container>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '7xl' \| 'full'` | `'7xl'` | Maximum width |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Horizontal padding |
| `centered` | `boolean` | `true` | Center with mx-auto |
| `as` | `'div' \| 'section' \| 'article' \| 'main' \| 'aside'` | `'div'` | HTML element |

---

## Composed

### Card

Flexible card container with header, body, and footer slots.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from 'gorombo-components';

<Card variant="elevated" interactive>
  <CardHeader
    icon={<Icon name="rocket" />}
    title="Service Name"
    subtitle="Short description"
  />
  <CardBody>
    <p>Card content goes here...</p>
  </CardBody>
  <CardFooter>
    <Button variant="ghost">Learn More</Button>
  </CardFooter>
</Card>
```

**Card Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Visual style |
| `interactive` | `boolean` | `false` | Add hover effects |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |

**CardHeader Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Icon or image |
| `title` | `string` | required | Card title |
| `subtitle` | `string` | - | Description text |

---

### Hero

Page header section with multiple layout options.

```tsx
import { Hero } from 'gorombo-components';

<Hero
  layout="twoColumn"
  subtitle="WELCOME"
  title="Build Something Amazing"
  description="Start your journey with our platform."
  actions={
    <>
      <Button variant="accent">Get Started</Button>
      <Button variant="secondary">Learn More</Button>
    </>
  }
  media={<img src="/hero-image.png" alt="Hero" />}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'centered' \| 'twoColumn' \| 'dark'` | `'centered'` | Layout variant |
| `title` | `string` | required | Main heading |
| `subtitle` | `string` | - | Tagline above title |
| `description` | `string` | - | Body text |
| `actions` | `ReactNode` | - | CTA buttons |
| `media` | `ReactNode` | - | Image/video (twoColumn only) |
| `decorative` | `boolean` | `true` | Show background blobs |

---

### Section

Content section wrapper with title and background options.

```tsx
import { Section } from 'gorombo-components';

<Section
  title="Our Services"
  subtitle="What we offer"
  background="off"
  spacing="spacious"
>
  <div className="grid grid-cols-3 gap-6">
    {/* Cards go here */}
  </div>
</Section>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Section heading |
| `subtitle` | `string` | - | Description below title |
| `background` | `'light' \| 'off' \| 'dark'` | `'light'` | Background color |
| `spacing` | `'compact' \| 'normal' \| 'spacious'` | `'normal'` | Vertical padding |
| `centered` | `boolean` | `true` | Center header text |
| `as` | `'section' \| 'div' \| 'article'` | `'section'` | HTML element |

---

### PricingCard

Pricing tier card with features list.

```tsx
import { PricingCard } from 'gorombo-components';

<PricingCard
  name="Pro Plan"
  price="$49"
  period="/month"
  description="For growing teams"
  featured
  badge="Most Popular"
  features={[
    { text: 'Unlimited projects', included: true },
    { text: 'Priority support', included: true },
    { text: 'Custom domain', included: true },
    { text: 'White labeling', included: false },
  ]}
  cta={<Button variant="accent" fullWidth>Get Started</Button>}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Plan name |
| `price` | `string` | required | Price display |
| `period` | `string` | - | Billing period |
| `description` | `string` | - | Short description |
| `features` | `PricingFeature[]` | required | Features list |
| `cta` | `ReactNode` | - | Action button |
| `featured` | `boolean` | `false` | Highlight card |
| `badge` | `string` | - | Badge text |

**PricingFeature:**
```ts
{ text: string; included?: boolean }
```

---

## Layout

### Header

Sticky navigation header with mobile drawer.

```tsx
import { Header } from 'gorombo-components';

<Header
  logo={<img src="/logo.svg" alt="Logo" />}
  logoHref="/"
  links={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'Development', href: '/services/development' },
      ]
    },
  ]}
  cta={<Button variant="primary">Contact</Button>}
  sticky
  hideOnScroll
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | required | Logo element |
| `logoHref` | `string` | `'/'` | Logo link |
| `links` | `NavLink[]` | `[]` | Navigation links |
| `cta` | `ReactNode` | - | CTA button(s) |
| `sticky` | `boolean` | `true` | Stick to top |
| `hideOnScroll` | `boolean` | `false` | Hide on scroll down |

---

### Navigation

Standalone navigation component.

```tsx
import { Navigation } from 'gorombo-components';

<Navigation
  links={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  orientation="horizontal"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `NavLink[]` | required | Navigation links |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |

**NavLink:**
```ts
{
  label: string;
  href: string;
  children?: NavLink[];  // For dropdowns
}
```

---

### MobileDrawer

Slide-in mobile menu with backdrop.

```tsx
import { MobileDrawer } from 'gorombo-components';
import { useMobileMenu } from 'gorombo-components/hooks';

function App() {
  const { isOpen, open, close } = useMobileMenu();

  return (
    <>
      <button onClick={open}>Open Menu</button>
      <MobileDrawer isOpen={isOpen} onClose={close} title="Menu">
        <Navigation links={links} orientation="vertical" />
      </MobileDrawer>
    </>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Open state |
| `onClose` | `() => void` | required | Close callback |
| `side` | `'left' \| 'right'` | `'left'` | Slide direction |
| `width` | `'sm' \| 'md' \| 'lg'` | `'md'` | Drawer width |
| `title` | `string` | - | Header title |
| `showClose` | `boolean` | `true` | Show close button |

---

### Footer

Page footer with link sections and social icons.

```tsx
import { Footer } from 'gorombo-components';

<Footer
  logo={<img src="/logo.svg" alt="Logo" />}
  sections={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]
    },
  ]}
  social={[
    { platform: 'Twitter', href: 'https://twitter.com/...', icon: <Icon name="..." /> },
    { platform: 'GitHub', href: 'https://github.com/...', icon: <Icon name="..." /> },
  ]}
  copyright="© 2024 Gorombo. All rights reserved."
  background="light"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | - | Logo element |
| `sections` | `FooterSection[]` | `[]` | Link sections |
| `social` | `SocialLink[]` | `[]` | Social media links |
| `copyright` | `string` | - | Copyright text |
| `background` | `'light' \| 'dark'` | `'light'` | Background color |

---

## Hooks

### useMediaQuery

Track CSS media query matches.

```tsx
import { useMediaQuery } from 'gorombo-components/hooks';

function Component() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

| Param | Type | Description |
|-------|------|-------------|
| `query` | `string` | CSS media query |

**Returns:** `boolean`

---

### useMobileMenu

Manage mobile menu open/close state.

```tsx
import { useMobileMenu } from 'gorombo-components/hooks';

function Component() {
  const { isOpen, open, close, toggle } = useMobileMenu(1024);

  return (
    <button onClick={toggle}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  );
}
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `breakpoint` | `number` | `1024` | Auto-close width |

**Returns:**
```ts
{
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
```

**Features:**
- Auto-closes when window resizes above breakpoint
- Prevents body scroll when open

---

### useClickOutside

Detect clicks outside an element.

```tsx
import { useRef } from 'react';
import { useClickOutside } from 'gorombo-components/hooks';

function Dropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <div ref={ref}>
      {isOpen && <DropdownMenu />}
    </div>
  );
}
```

| Param | Type | Description |
|-------|------|-------------|
| `ref` | `RefObject<HTMLElement>` | Element ref |
| `handler` | `(event) => void` | Callback |
| `enabled` | `boolean` | Active state (default: true) |

---

### useScrollDirection

Track scroll direction for hide-on-scroll headers.

```tsx
import { useScrollDirection } from 'gorombo-components/hooks';

function Header() {
  const direction = useScrollDirection({ threshold: 10 });

  return (
    <header className={direction === 'down' ? 'hidden' : 'visible'}>
      ...
    </header>
  );
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `10` | Min scroll delta |
| `initialDirection` | `'up' \| 'down' \| null` | `null` | Initial value |

**Returns:** `'up' | 'down' | null`

---

## Design Tokens

Access theme values directly:

```tsx
import { colors, fontFamily, fontSize, spacing } from 'gorombo-components/theme';

// colors.primary.DEFAULT = '#2e6b8a'
// fontFamily.display = ['Space Grotesk', 'sans-serif']
```

### Colors
| Token | Value |
|-------|-------|
| `primary.DEFAULT` | `#2e6b8a` |
| `primary.dark` | `#1f4b63` |
| `secondary.DEFAULT` | `#7BCFE8` |
| `accent.DEFAULT` | `#E8734A` |
| `accent.hover` | `#d65f36` |
| `background.light` | `#FFFFFF` |
| `background.off` | `#F5F7FA` |
| `background.dark` | `#141b1e` |
| `text.main` | `#1A2E3D` |
| `text.sub` | `#5c7a8a` |

### Breakpoints
| Token | Value |
|-------|-------|
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |
