# Team Color System

This document describes the team color system used in event displays, based on the Figma design specifications.

## Allowed Colors

Teams should only use colors from this approved palette:

### Reds
- **Maroon**: `#730d26`
- **Red**: `#dc0000`
- **Bright Red**: `#ff0000`

### Oranges/Yellows
- **Orange**: `#ff7020`
- **Gold**: `#ffa500`
- **Yellow**: `#ffd400`

### Greens
- **Dark Green**: `#355e3b`
- **Green**: `#2b7d44`

### Blues
- **Light Blue**: `#00bfff`
- **Blue**: `#0273e3`
- **Navy**: `#002f6c`

### Purples/Pinks
- **Purple**: `#5a189a`
- **Pink**: `#ff006e`

### Neutrals
- **White**: `#ffffff`
- **Silver**: `#c0c0c0`
- **Dark Gray**: `#646566`
- **Black**: `#000000`

## Edge Cases

The system automatically handles three edge cases:

### 1. Same Primary Color
When both teams have the same primary color, the system uses their secondary colors instead.

**Example:**
- Team A: Primary = Blue, Secondary = Light Blue
- Team B: Primary = Blue, Secondary = Navy
- **Result**: Team A displays Light Blue, Team B displays Navy

### 2. White/Silver/Black Colors
When a team's color is white, silver, or black (which don't display well), the system replaces it with dark gray (`#646566`).

**Example:**
- Team A: Primary = White
- Team B: Primary = Red
- **Result**: Team A displays Dark Gray, Team B displays Red

### 3. No Colors Chosen
When a team doesn't have colors set, the system defaults to dark gray (`#646566`).

**Example:**
- Team A: No colors specified
- Team B: Primary = Green
- **Result**: Team A displays Dark Gray, Team B displays Green

## Usage in Code

### Defining Team Colors

```javascript
// In teams.js
colors: {
  primary: '#0273e3',    // Blue (from allowed palette)
  secondary: '#00bfff'   // Light Blue (from allowed palette)
}
```

### Automatic Resolution

The `resolveEventColors()` function automatically handles edge cases:

```javascript
import { resolveEventColors } from './helpers/teamColors'

const { homeColor, awayColor } = resolveEventColors(homeTeam, awayTeam)
// Returns resolved colors with edge cases handled
```

### Validating Colors

```javascript
import { isAllowedColor, ALLOWED_COLORS } from './helpers/teamColors'

// Check if a color is in the allowed palette
if (isAllowedColor('#0273e3')) {
  // Color is allowed
}

// Access specific colors
const blueColor = ALLOWED_COLORS.blue // '#0273e3'
```

## Design Reference

- **Color Palette**: [Figma - Team Colors](https://www.figma.com/design/GTE7pla6S4liwcAfUdugUi/Event-Module?node-id=4463-7101)
- **Edge Cases**: [Figma - Edge Cases](https://www.figma.com/design/GTE7pla6S4liwcAfUdugUi/Event-Module?node-id=1801-5390)

## Most Common Color Pairings

Based on usage data, these are the most common color pairings for team matchups:

1. Red + White
2. Blue + Gold
3. Blue + Yellow
4. Purple + Yellow
5. Green + Gold
6. Green + White
7. Red + Gold
8. Orange + Blue
9. And more...

These pairings work well together and provide good contrast for event displays.
