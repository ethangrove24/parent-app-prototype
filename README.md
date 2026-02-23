# Template Hudl Navigation

A navigation component project built with React and the shared Uniform design system styles.

## Setup

This project uses the [shared-uniform-styles](https://github.com/adam-porter/shared-uniform-styles) package for consistent design tokens and styling.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
template-hudl-navigation/
├── docs/                           # 📚 Documentation
│   ├── DATA_UPDATE_TEMPLATE.md
│   ├── QUICK_REFERENCE.md
│   └── REORGANIZATION_SUMMARY.md  # Detailed structure guide
│
├── public/
│   ├── sportsicons/               # 🎨 Sport and team icons (swappable)
│   └── content/                   # 🎨 Swappable content (no rebuild needed)
│       ├── images/                # Logos, avatars
│       └── videos/                # Test videos
│
├── src/
│   ├── assets/                    # Build-optimized assets
│   │   └── ui-icons/             # UI icons (hamburger, close, etc.)
│   │
│   ├── components/                # Organized by function
│   │   ├── cards/                # EventCard, HighlightCard, LivestreamCard
│   │   ├── common/               # Avatar, Badge, Button, Tag
│   │   ├── navigation/           # Navigation, SubnavItem
│   │   └── video/                # VideoPlayer
│   │
│   ├── config/
│   │   ├── contentPaths.js       # Content URL paths
│   │   ├── videoConfig.js
│   │   └── data/                 # Data configuration
│   │       ├── dataConfig.js
│   │       ├── scenarios/        # Test data scenarios
│   │       └── helpers/
│   │
│   ├── context/                  # React contexts
│   ├── pages/                    # Page components
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── vite.config.js
└── package.json
```

**Key Principles:**
- **`public/sportsicons/`** = Sport icons (swappable without rebuild)
- **`public/content/`** = Other content assets (swappable without rebuild)
- **`src/`** = Developers work here (requires rebuild)
- **`docs/`** = All project documentation

See [`docs/REORGANIZATION_SUMMARY.md`](./docs/REORGANIZATION_SUMMARY.md) for detailed structure information.

## Navigation Component

The Navigation component implements a responsive sidebar navigation with three states:

### Features

1. **Expanded State** (200px width)
   - Full logo with "Hudl" text
   - Workspace switcher with organization info
   - Navigation items with icons and labels
   - User settings with name and avatar
   - Expand/collapse toggle button

2. **Collapsed State** (56px width)
   - Icon-only logo
   - Icon-only navigation items
   - Compact workspace switcher and user settings
   - Expand/collapse toggle button

3. **Mobile State**
   - Horizontal scrolling navigation bar
   - Icon-only items
   - Responsive layout for small screens

### Navigation Items

**Top Navigation (workspace-scoped):**
- Items are defined via shared nav config objects in `Navigation.jsx`:
  - `directorNavItems` (org workspace)
  - `teamNavItems` (team workspaces)
  - a simplified config for the personal workspace
- Parent items can declare `children` arrays; these sub-nav children are rendered with the shared `SubnavItem` component on **both desktop and mobile**.
- Child items support `hasPill` and `pillText` so new badges can be added in one place and appear consistently across layouts.

**Bottom Navigation:**
- `bottomNavItems` defines common items such as Calendar, Messages, and Notifications, and is reused for both desktop and mobile bottom sections.

### Interactive Features

- Click navigation items to set active state
- Toggle between expanded/collapsed states
- Responsive design adapts to mobile screens
- Smooth transitions and animations

## Using Uniform Styles

The project imports Uniform styles in the correct order in `src/main.jsx`:

1. `uniform-design-tokens.css` - CSS custom properties (design tokens)
2. `index.css` - Global reset and utility classes
3. `uniform-design-system.css` - Uniform Web Storybook component styles

Components use CSS-in-JS with design tokens:

```jsx
const MyComponent = () => {
  return (
    <>
      <style>
        {`
          .my-component {
            padding: var(--u-space-one, 16px);
            color: var(--u-color-base-foreground, #36485c);
          }
        `}
      </style>
      <div className="my-component">Content</div>
    </>
  )
}
```

## Design Tokens

Access Uniform design tokens via CSS custom properties:

- **Colors**: `--u-color-primary`, `--u-color-base-foreground`, etc.
- **Spacing**: `--u-space-one`, `--u-space-two`, etc.
- **Typography**: `--u-font-body`, `--u-font-size-default`, etc.
- **Border Radius**: `--u-border-radius-small`, `--u-border-radius-medium`, etc.

See the [shared-uniform-styles README](https://github.com/adam-porter/shared-uniform-styles) for a complete list of available tokens.

## License

ISC

