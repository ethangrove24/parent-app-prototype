/**
 * Video Configuration
 *
 * Central configuration for all video assets including:
 * - Live feed videos (hero carousel livestreams)
 * - Highlight videos (playlist and highlight reels)
 * - Full game videos (event detail pages)
 * - Poster images/thumbnails for all videos
 *
 * All videos are stored in: public/content/videos/
 *
 * NEW: Videos are now automatically detected and configured!
 * To add a new video:
 * 1. Place video file in public/content/videos/ (follow naming convention)
 * 2. Add poster image (e.g., highlight-reel-5-poster.jpg)
 * 3. Restart dev server (or run npm run refresh-videos)
 * 4. Done! Video will automatically appear in the UI
 *
 * Naming Convention:
 * - Highlights: highlight-reel-{N}.mov + highlight-reel-{N}-poster.jpg
 * - Past games: past-game-{N}.mov
 * - Full games: full-game-{N}.mov + full-game-{N}-poster.jpg
 * - Live feeds: live-feed-{N}.mov + live-feed-{N}-poster.jpg
 */

import { CONTENT_PATHS } from './contentPaths.js'

const BASE_VIDEO_URL = CONTENT_PATHS.videos

// Import auto-generated video sources
// If the file doesn't exist yet, it will be created on first build
let GENERATED_VIDEO_SOURCES = {}
try {
  // Use dynamic import with error handling for optional generated config
  const { GENERATED_VIDEO_SOURCES: generated } = await import('./videoConfig.generated.js')
  GENERATED_VIDEO_SOURCES = generated || {}
} catch (error) {
  // File doesn't exist yet - will be created on first build
  console.warn('Generated video config not found. It will be created automatically on next build.')
}

// Manual video sources (for special cases or overrides)
const MANUAL_VIDEO_SOURCES = {
  // Keep backward compatibility with existing keys
  heroLiveFeed1: {
    src: `${BASE_VIDEO_URL}/live-feed-1.mov`,
    poster: `${BASE_VIDEO_URL}/live-feed-1-poster.jpg`,
    type: 'video/quicktime',
    label: 'Soccer Game - Lincoln vs Bellevue'
  },
  heroLiveFeed2: {
    src: `${BASE_VIDEO_URL}/live-feed-2.mov`,
    poster: `${BASE_VIDEO_URL}/live-feed-2-poster.jpg`,
    type: 'video/quicktime',
    label: 'Basketball Game'
  },

  // Legacy keys - will be overridden by generated sources if they exist
  playlistHighlight1: {
    src: `${BASE_VIDEO_URL}/highlight-reel-1.mov`,
    poster: `${BASE_VIDEO_URL}/highlight-reel-1-poster.jpg`,
    type: 'video/quicktime'
  },
  eventFullGame: {
    src: `${BASE_VIDEO_URL}/full-game-1.mov`,
    poster: `${BASE_VIDEO_URL}/full-game-1-poster.jpg`,
    type: 'video/quicktime'
  }
}

// Merge: generated sources first, manual sources can override
export const VIDEO_SOURCES = {
  ...GENERATED_VIDEO_SOURCES,
  ...MANUAL_VIDEO_SOURCES
}

// Optional: Test scenario presets
// Example: Create alternate video sets for different testing scenarios
export const TEST_SCENARIOS = {
  SCENARIO_A: {
    heroLiveFeed1: '/content/videos/scenario-a-live-1.mov',
    heroLiveFeed2: '/content/videos/scenario-a-live-2.mov',
    playlistHighlight1: '/content/videos/scenario-a-highlight-1.mov',
    eventFullGame: '/content/videos/scenario-a-full-game.mov'
  }
  // Add more scenarios as needed
}

export const ACTIVE_SCENARIO = 'DEFAULT' // Change to 'SCENARIO_A' to swap all videos

export const getVideoSource = (key) => {
  if (ACTIVE_SCENARIO !== 'DEFAULT' && TEST_SCENARIOS[ACTIVE_SCENARIO]?.[key]) {
    return { ...VIDEO_SOURCES[key], src: TEST_SCENARIOS[ACTIVE_SCENARIO][key] }
  }
  return VIDEO_SOURCES[key]
}
