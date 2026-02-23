/**
 * Team Colors Helper
 *
 * Defines allowed team colors and handles edge cases for event displays.
 * Based on Figma specs: https://www.figma.com/design/GTE7pla6S4liwcAfUdugUi/Event-Module
 */

/**
 * Allowed team colors palette
 * Teams should only use colors from this palette
 */
export const ALLOWED_COLORS = {
  // Reds
  maroon: '#730d26',
  red: '#dc0000',
  brightRed: '#ff0000',

  // Oranges/Yellows
  orange: '#ff7020',
  gold: '#ffa500',
  yellow: '#ffd400',

  // Greens
  darkGreen: '#355e3b',
  green: '#2b7d44',

  // Blues
  lightBlue: '#00bfff',
  blue: '#0273e3',
  navy: '#002f6c',

  // Purples/Pinks
  purple: '#5a189a',
  pink: '#ff006e',

  // Neutrals
  white: '#ffffff',
  silver: '#c0c0c0',
  darkGray: '#646566',
  black: '#000000'
}

/**
 * Default color when no color is specified
 */
export const DEFAULT_COLOR = ALLOWED_COLORS.darkGray

/**
 * Problematic colors that need special handling
 */
const PROBLEMATIC_COLORS = [
  ALLOWED_COLORS.white.toLowerCase(),
  ALLOWED_COLORS.silver.toLowerCase(),
  ALLOWED_COLORS.black.toLowerCase()
]

/**
 * Checks if a color is problematic (white, silver, or black)
 * @param {string} color - Hex color code
 * @returns {boolean}
 */
export function isProblematicColor(color) {
  if (!color) return false
  return PROBLEMATIC_COLORS.includes(color.toLowerCase())
}

/**
 * Checks if two colors are the same or very similar
 * @param {string} color1 - First hex color code
 * @param {string} color2 - Second hex color code
 * @returns {boolean}
 */
export function isSameColor(color1, color2) {
  if (!color1 || !color2) return false
  return color1.toLowerCase() === color2.toLowerCase()
}

/**
 * Resolves team colors for event display, handling edge cases
 *
 * Edge cases handled:
 * 1. Same Primary: When both teams have the same primary color, use secondary colors
 * 2. White/Silver/Black: Replace problematic colors with gray
 * 3. No Colors: Default to gray
 *
 * @param {Object} homeTeam - Home team object with colors.primary and colors.secondary
 * @param {Object} awayTeam - Away team object with colors.primary and colors.secondary
 * @returns {Object} - { homeColor, awayColor }
 */
export function resolveEventColors(homeTeam, awayTeam) {
  // Get team colors or defaults
  const homePrimary = homeTeam?.colors?.primary || DEFAULT_COLOR
  const homeSecondary = homeTeam?.colors?.secondary || DEFAULT_COLOR
  const awayPrimary = awayTeam?.colors?.primary || DEFAULT_COLOR
  const awaySecondary = awayTeam?.colors?.secondary || DEFAULT_COLOR

  let homeColor = homePrimary
  let awayColor = awayPrimary

  // Edge Case 1: Same Primary Color
  // If both teams have the same primary color, use secondary colors instead
  if (isSameColor(homePrimary, awayPrimary)) {
    homeColor = homeSecondary
    awayColor = awaySecondary
  }

  // Edge Case 2: White/Silver/Black Colors
  // Replace problematic colors with gray for better visibility
  if (isProblematicColor(homeColor)) {
    homeColor = DEFAULT_COLOR
  }
  if (isProblematicColor(awayColor)) {
    awayColor = DEFAULT_COLOR
  }

  // Edge Case 3: Still the same after using secondary (both teams have same secondary too)
  // In this rare case, slightly adjust one team's color
  if (isSameColor(homeColor, awayColor) && homeColor === DEFAULT_COLOR) {
    // If both are gray, keep them both gray (no colors chosen)
    // This is acceptable per the Figma specs
  } else if (isSameColor(homeColor, awayColor)) {
    // If they're the same but not gray, use the default for away team
    awayColor = DEFAULT_COLOR
  }

  return {
    homeColor,
    awayColor
  }
}

/**
 * Validates if a color is in the allowed palette
 * @param {string} color - Hex color code to validate
 * @returns {boolean}
 */
export function isAllowedColor(color) {
  if (!color) return false
  const normalizedColor = color.toLowerCase()
  return Object.values(ALLOWED_COLORS).some(
    allowedColor => allowedColor.toLowerCase() === normalizedColor
  )
}

/**
 * Finds the closest allowed color to a given color
 * Note: This is a simple implementation. For production, consider using a proper color distance algorithm.
 * @param {string} color - Hex color code
 * @returns {string} - Closest allowed color
 */
export function getClosestAllowedColor(color) {
  if (!color || isAllowedColor(color)) {
    return color || DEFAULT_COLOR
  }

  // If not in allowed palette, return default
  // In a production app, you might want to calculate color distance here
  return DEFAULT_COLOR
}
