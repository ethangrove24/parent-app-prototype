# Team Colors Implementation Summary

## Overview
Implemented a standardized team color system based on Figma design specifications, including automatic handling of edge cases.

## What Was Implemented

### 1. Color System Helper (`src/config/data/helpers/teamColors.js`)
Created a comprehensive helper module that:

- **Defines Allowed Colors**: 17 approved team colors matching Figma specs
  - Reds: Maroon, Red, Bright Red
  - Oranges/Yellows: Orange, Gold, Yellow
  - Greens: Dark Green, Green
  - Blues: Light Blue, Blue, Navy
  - Purples/Pinks: Purple, Pink
  - Neutrals: White, Silver, Dark Gray, Black

- **Edge Case Resolution**: Automatic handling of three edge cases:
  1. **Same Primary Color**: When both teams have the same primary, uses secondary colors
  2. **White/Silver/Black**: Replaces problematic colors with dark gray for visibility
  3. **No Colors Chosen**: Defaults to dark gray (#646566)

- **Utility Functions**:
  - `resolveEventColors()` - Main function that resolves team colors with edge case handling
  - `isProblematicColor()` - Checks if a color is white/silver/black
  - `isSameColor()` - Compares two colors
  - `isAllowedColor()` - Validates if a color is in the approved palette
  - `getClosestAllowedColor()` - Finds closest match for non-approved colors

### 2. Data Config Integration (`src/config/data/dataConfig.js`)
Updated the event enrichment process:

- Imported `resolveEventColors` helper
- Modified `enrichEventForDisplay()` function to use color resolution
- Automatically applies edge case handling to all events

**Before:**
```javascript
color: homeTeam?.colors.primary || '#646566'
```

**After:**
```javascript
const { homeColor, awayColor } = resolveEventColors(homeTeam, awayTeam)
// ...
color: homeColor
```

### 3. Updated Team Data (`src/config/data/scenarios/familySmith/teams.js`)
Updated all 14 teams to use only colors from the approved palette:

| Team | Old Primary | New Primary | Old Secondary | New Secondary |
|------|-------------|-------------|---------------|---------------|
| Lincoln North Star | #0273e3 ✓ | #0273e3 (Blue) | #96ccf3 | #00bfff (Light Blue) |
| Wayne | #e65100 | #ff7020 (Orange) | #ff9800 | #ffa500 (Gold) |
| Centerville | #9c27b0 | #5a189a (Purple) | #ce93d8 | #ff006e (Pink) |
| Brownell Talbot | #2e7d32 | #2b7d44 (Green) | #81c784 | #355e3b (Dark Green) |
| College View | #f57c00 | #ff7020 (Orange) | #ffb74d | #ffd400 (Yellow) |
| Conestoga | #c62828 | #dc0000 (Red) | #ef5350 | #ff0000 (Bright Red) |
| Bellevue West (Soccer) | #00897b | #2b7d44 (Green) | #4db6ac | #00bfff (Light Blue) |
| Bellevue West (Basketball) | #1976d2 | #0273e3 (Blue) | #64b5f6 | #00bfff (Light Blue) |
| Omaha Central | #7b1fa2 | #5a189a (Purple) | #ba68c8 | #ff006e (Pink) |
| Elkhorn South | #388e3c | #2b7d44 (Green) | #81c784 | #355e3b (Dark Green) |
| Northwestern | #dc3748 | #dc0000 (Red) | #ef8892 | #ff0000 (Bright Red) |
| Wayne (Football) | #d32f2f | #dc0000 (Red) | #ef5350 | #730d26 (Maroon) |

### 4. Documentation (`src/config/data/helpers/TEAM_COLORS.md`)
Created comprehensive documentation covering:
- Complete color palette reference
- Edge case explanations with examples
- Code usage examples
- Links to Figma design specs
- Most common color pairings

## Edge Case Examples

### Edge Case 1: Same Primary Color
```javascript
// Both teams have Blue (#0273e3)
Team A: Primary = Blue → Uses Secondary = Light Blue
Team B: Primary = Blue → Uses Secondary = Navy
Result: Good contrast maintained
```

### Edge Case 2: White/Silver/Black
```javascript
// Team has problematic color
Team A: Primary = White (#ffffff) → Replaced with Dark Gray (#646566)
Team B: Primary = Red (#dc0000) → Remains Red
Result: Both colors visible on all backgrounds
```

### Edge Case 3: No Colors
```javascript
// Team hasn't set colors
Team A: No colors → Defaults to Dark Gray (#646566)
Team B: Primary = Green (#2b7d44) → Remains Green
Result: Graceful fallback
```

## Files Changed

1. **Created**:
   - `/src/config/data/helpers/teamColors.js` - Color system helper
   - `/src/config/data/helpers/TEAM_COLORS.md` - Documentation
   - `/TEAM_COLORS_IMPLEMENTATION.md` - This summary

2. **Modified**:
   - `/src/config/data/dataConfig.js` - Integrated color resolution
   - `/src/config/data/scenarios/familySmith/teams.js` - Updated all team colors

## Benefits

1. **Design Consistency**: All colors match approved Figma palette
2. **Automatic Edge Case Handling**: No manual intervention needed for color conflicts
3. **Better Visibility**: Problematic colors automatically replaced
4. **Maintainability**: Centralized color management
5. **Documentation**: Clear guidelines for adding new teams

## Testing Recommendations

1. **Verify Color Display**:
   - Check event cards show correct team colors
   - Verify event profile pages show team color gradients
   - Test with teams that have same primary colors

2. **Edge Case Testing**:
   - Create events with teams having identical primary colors
   - Test with teams using white/silver/black
   - Verify default gray shows for teams without colors

3. **Visual Verification**:
   - Ensure text remains readable on all color backgrounds
   - Check color contrast meets accessibility standards
   - Verify gradients display smoothly on event profiles

## Design References

- **Color Palette**: [Figma - Team Colors](https://www.figma.com/design/GTE7pla6S4liwcAfUdugUi/Event-Module?node-id=4463-7101)
- **Edge Cases**: [Figma - Edge Cases](https://www.figma.com/design/GTE7pla6S4liwcAfUdugUi/Event-Module?node-id=1801-5390)

## Future Enhancements

1. **Color Distance Algorithm**: Implement proper color distance calculation for `getClosestAllowedColor()`
2. **Validation Tool**: Create a script to validate all team colors in the system
3. **Color Contrast Checker**: Add accessibility checks for color combinations
4. **Admin UI**: Add color picker with only allowed colors for team management
