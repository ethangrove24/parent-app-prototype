/**
 * Video Configuration Generator
 *
 * Scans the /public/content/videos/ directory for video files and automatically
 * generates video configuration files that React components can consume.
 *
 * Naming Convention:
 * - Highlights: highlight-reel-{N}.mov + highlight-reel-{N}-poster.jpg
 * - Past games: past-game-{N}.mov (+ optional poster)
 * - Full games: full-game-{N}.mov + full-game-{N}-poster.jpg
 * - Live feeds: live-feed-{N}.mov + live-feed-{N}-poster.jpg
 *
 * Output:
 * - /src/config/videoConfig.generated.js - Video source objects
 * - /src/config/videoMappings.generated.js - Categorized video arrays
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const VIDEO_DIR = path.join(__dirname, '../public/content/videos')
const OUTPUT_CONFIG = path.join(__dirname, '../src/config/videoConfig.generated.js')
const OUTPUT_MAPPINGS = path.join(__dirname, '../src/config/videoMappings.generated.js')
const BASE_VIDEO_URL = '/content/videos'

// Video file patterns
const VIDEO_PATTERNS = {
  highlight: /^highlight-reel-(\d+)\.mov$/,
  pastGame: /^past-game-(\d+)\.mov$/,
  fullGame: /^full-game-(\d+)\.mov$/,
  liveFeed: /^live-feed-(\d+)\.mov$/
}

/**
 * Converts a filename to camelCase key
 * @param {string} type - Video type (highlight, pastGame, fullGame, liveFeed)
 * @param {number} num - Video number
 * @returns {string} camelCase key (e.g., 'highlightReel1', 'pastGame1')
 */
function generateKey(type, num) {
  const keyMap = {
    highlight: 'highlightReel',
    pastGame: 'pastGame',
    fullGame: 'fullGame',
    liveFeed: 'liveFeed'
  }
  return `${keyMap[type]}${num}`
}

/**
 * Check if a poster image exists for a video
 * @param {string} videoFilename - Video filename without extension
 * @param {string[]} files - All files in directory
 * @returns {string|null} Poster filename or null
 */
function findPoster(videoFilename, files) {
  const posterName = `${videoFilename}-poster.jpg`
  return files.includes(posterName) ? posterName : null
}

/**
 * Scan video directory and categorize videos
 * @returns {Object} Categorized video objects
 */
function scanVideos() {
  console.log('📹 Scanning video directory:', VIDEO_DIR)

  // Check if directory exists
  if (!fs.existsSync(VIDEO_DIR)) {
    console.warn('⚠️  Video directory does not exist:', VIDEO_DIR)
    return { videos: {}, mappings: { highlights: [], pastGames: [], fullGames: [], liveFeeds: [] } }
  }

  // Read all files
  const files = fs.readdirSync(VIDEO_DIR)
  const videoFiles = files.filter(f => f.endsWith('.mov'))

  console.log(`Found ${videoFiles.length} .mov files`)

  const videos = {}
  const mappings = {
    highlights: [],
    pastGames: [],
    fullGames: [],
    liveFeeds: []
  }

  const warnings = []
  const foundNumbers = {
    highlight: [],
    pastGame: [],
    fullGame: [],
    liveFeed: []
  }

  // Process each video file
  videoFiles.forEach(filename => {
    let matched = false

    // Try to match against each pattern
    for (const [type, pattern] of Object.entries(VIDEO_PATTERNS)) {
      const match = filename.match(pattern)
      if (match) {
        matched = true
        const num = parseInt(match[1], 10)
        const videoName = filename.replace('.mov', '')
        const key = generateKey(type, num)
        const poster = findPoster(videoName, files)

        // Store video configuration
        videos[key] = {
          src: `${BASE_VIDEO_URL}/${filename}`,
          poster: poster ? `${BASE_VIDEO_URL}/${poster}` : null,
          type: 'video/quicktime',
          category: type
        }

        // Add to appropriate mapping array
        const mappingKey = type === 'highlight' ? 'highlights'
                         : type === 'pastGame' ? 'pastGames'
                         : type === 'fullGame' ? 'fullGames'
                         : 'liveFeeds'
        mappings[mappingKey].push(key)

        // Track found numbers for gap detection
        foundNumbers[type].push(num)

        // Warn if poster is missing
        if (!poster) {
          warnings.push(`⚠️  No poster found for ${filename}`)
        }

        break
      }
    }

    if (!matched) {
      warnings.push(`⚠️  Skipped ${filename} - doesn't match naming convention`)
    }
  })

  // Sort mapping arrays by number (extract number from key)
  Object.keys(mappings).forEach(key => {
    mappings[key].sort((a, b) => {
      const numA = parseInt(a.match(/\d+$/)[0], 10)
      const numB = parseInt(b.match(/\d+$/)[0], 10)
      return numA - numB
    })
  })

  // Check for gaps in numbering
  Object.entries(foundNumbers).forEach(([type, numbers]) => {
    if (numbers.length === 0) return

    numbers.sort((a, b) => a - b)
    const min = numbers[0]
    const max = numbers[numbers.length - 1]

    for (let i = min; i <= max; i++) {
      if (!numbers.includes(i)) {
        warnings.push(`⚠️  Gap detected in ${type} numbering: missing ${i}`)
      }
    }
  })

  // Print warnings
  if (warnings.length > 0) {
    console.log('\nWarnings:')
    warnings.forEach(w => console.log(w))
  }

  // Print summary
  console.log('\n📊 Summary:')
  console.log(`   Highlights: ${mappings.highlights.length}`)
  console.log(`   Past Games: ${mappings.pastGames.length}`)
  console.log(`   Full Games: ${mappings.fullGames.length}`)
  console.log(`   Live Feeds: ${mappings.liveFeeds.length}`)

  return { videos, mappings }
}

/**
 * Generate videoConfig.generated.js file
 * @param {Object} videos - Video configuration objects
 */
function generateConfigFile(videos) {
  const timestamp = new Date().toISOString()
  const videoEntries = Object.entries(videos)
    .map(([key, config]) => {
      const posterLine = config.poster
        ? `    poster: '${config.poster}',`
        : '    poster: null,'

      return `  ${key}: {
    src: '${config.src}',
${posterLine}
    type: '${config.type}',
    category: '${config.category}'
  }`
    })
    .join(',\n')

  const content = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 *
 * This file is automatically generated by scripts/generateVideoConfig.js
 * Generated: ${timestamp}
 *
 * To regenerate: npm run scan-videos
 */

export const GENERATED_VIDEO_SOURCES = {
${videoEntries}
}
`

  fs.writeFileSync(OUTPUT_CONFIG, content, 'utf-8')
  console.log(`\n✅ Generated: ${OUTPUT_CONFIG}`)
}

/**
 * Generate videoMappings.generated.js file
 * @param {Object} mappings - Categorized video arrays
 */
function generateMappingsFile(mappings) {
  const timestamp = new Date().toISOString()

  const content = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 *
 * This file is automatically generated by scripts/generateVideoConfig.js
 * Generated: ${timestamp}
 *
 * Contains categorized arrays of video keys for easy access.
 * To regenerate: npm run scan-videos
 */

export const VIDEO_MAPPINGS = {
  highlights: ${JSON.stringify(mappings.highlights, null, 2).replace(/\n/g, '\n  ')},
  pastGames: ${JSON.stringify(mappings.pastGames, null, 2).replace(/\n/g, '\n  ')},
  fullGames: ${JSON.stringify(mappings.fullGames, null, 2).replace(/\n/g, '\n  ')},
  liveFeeds: ${JSON.stringify(mappings.liveFeeds, null, 2).replace(/\n/g, '\n  ')}
}
`

  fs.writeFileSync(OUTPUT_MAPPINGS, content, 'utf-8')
  console.log(`✅ Generated: ${OUTPUT_MAPPINGS}`)
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting video configuration generator...\n')

  try {
    const { videos, mappings } = scanVideos()

    if (Object.keys(videos).length === 0) {
      console.log('\n⚠️  No videos found. Creating empty configuration files.')
    }

    generateConfigFile(videos)
    generateMappingsFile(mappings)

    console.log('\n✨ Video configuration generation complete!\n')
  } catch (error) {
    console.error('❌ Error generating video configuration:', error)
    process.exit(1)
  }
}

main()
