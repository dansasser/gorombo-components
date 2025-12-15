# Gorombo Components

A reusable React component library with Tailwind CSS, extracted from the Gorombo homepage designs.

## Installation

```bash
npm install gorombo-components
```

## Setup

### 1. Configure Tailwind

Add the Gorombo preset to your `tailwind.config.js`:

```javascript
import { goromboPreset } from 'gorombo-components/tailwind';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/gorombo-components/dist/**/*.js"
  ],
  presets: [goromboPreset]
};
```

### 2. Add Fonts

Include the required fonts in your HTML or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

## Usage

```tsx
import { Button, Card } from 'gorombo-components';
import { useMediaQuery } from 'gorombo-components/hooks';

function App() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      <Button variant="accent">
        Learn More
      </Button>
    </div>
  );
}
```

## Components

### Primitives
- `Button` - Primary, secondary, accent, ghost, outlined variants
- `Input` - Text input with label and error states
- `Textarea` - Multi-line text input
- `Badge` - Labels and status indicators
- `Icon` - Material Symbols wrapper
- `Container` - Max-width wrapper

### Composed
- `Card` - Service, pricing, feature, info variants
- `Hero` - Page header sections
- `Section` - Content sections
- `PricingCard` - Pricing tier cards

### Layout
- `Header` - Sticky navigation header
- `Navigation` - Nav links with dropdowns
- `MobileDrawer` - Slide-out mobile menu
- `Footer` - Page footer

## Hooks

- `useMediaQuery(query)` - Track media query matches
- `useMobileMenu()` - Mobile menu state management
- `useClickOutside(ref, handler)` - Detect outside clicks
- `useScrollDirection()` - Track scroll direction

## Theme

Access design tokens directly:

```tsx
import { colors, fontFamily, spacing } from 'gorombo-components/theme';
```

## License

MIT
