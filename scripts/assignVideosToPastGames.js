/**
 * Past Game Video Assignment Script
 *
 * Assigns past-game and full-game videos to events with status: 'past'.
 * This enables the "Recent Results" cards to navigate to event profile pages
 * with playable video content.
 *
 * This script:
 * 1. Reads the generated video mappings
 * 2. Reads the existing events.js file
 * 3. Filters events with status: 'past'
 * 4. Assigns videos to events that don't already have them
 * 5. Writes the updated events.js back to disk
 *
 * Priority: past-game videos first, then full-game videos
 *
 * Run manually: npm run assign-videos
 * Auto-runs: On dev server start and production builds
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const MAPPINGS_FILE = path.join(__dirname, '../src/config/videoMappings.generated.js')
const EVENTS_FILE = path.join(__dirname, '../src/config/data/scenarios/familySmith/events.js')

/**
 * Read and parse the video mappings file
 * @returns {Object} Video mappings
 */
async function readVideoMappings() {
  if (!fs.existsSync(MAPPINGS_FILE)) {
    console.error('❌ videoMappings.generated.js not found. Run npm run scan-videos first.')
    process.exit(1)
  }

  // Import the generated mappings
  const mappingsModule = await import(`file://${MAPPINGS_FILE}`)
  return mappingsModule.VIDEO_MAPPINGS
}

/**
 * Read the events.js file content
 * @returns {string} File content
 */
function readEventsFile() {
  if (!fs.existsSync(EVENTS_FILE)) {
    console.error('❌ events.js not found:', EVENTS_FILE)
    process.exit(1)
  }

  return fs.readFileSync(EVENTS_FILE, 'utf-8')
}

/**
 * Extract event IDs with status 'past' from the file content
 * @param {string} content - File content
 * @returns {string[]} Array of past event IDs
 */
function extractPastEventIds(content) {
  const pastEventIds = []

  // Match event entries with status: 'past'
  const eventPattern = /'([^']+)':\s*{[^}]*status:\s*'past'[^}]*}/g
  let match

  while ((match = eventPattern.exec(content)) !== null) {
    pastEventIds.push(match[1])
  }

  return pastEventIds
}

/**
 * Update fullGame video assignments in the file content
 * Uses regex to find and replace fullGame values while preserving formatting
 * @param {string} content - File content
 * @param {string[]} pastEventIds - IDs of past events
 * @param {string[]} availableVideos - Available video keys
 * @returns {string} Updated file content
 */
function updateEventVideos(content, pastEventIds, availableVideos) {
  if (availableVideos.length === 0) {
    console.warn('⚠️  No past-game or full-game videos available. Events will keep existing videos.')
    return content
  }

  console.log(`\n📝 Found ${pastEventIds.length} past events`)

  if (pastEventIds.length === 0) {
    console.log('   No past events to process')
    return content
  }

  let videoIndex = 0
  let updatedContent = content
  let assignedCount = 0

  // Process each past event
  pastEventIds.forEach(eventId => {
    // Check if event already has a fullGame video (not null and not empty string)
    const eventBlockMatch = updatedContent.match(
      new RegExp(`'${eventId}':\\s*{[\\s\\S]*?videos:\\s*{[\\s\\S]*?fullGame:\\s*([^,\\n}]+)[\\s\\S]*?}[\\s\\S]*?}`, 'm')
    )

    if (eventBlockMatch) {
      const currentFullGame = eventBlockMatch[1].trim().replace(/['"]/g, '')

      // Skip if already has a non-null video
      if (currentFullGame !== 'null' && currentFullGame !== '') {
        console.log(`   ${eventId}: Already has video (${currentFullGame})`)
        return
      }

      // Assign next available video
      if (videoIndex < availableVideos.length) {
        const videoKey = availableVideos[videoIndex]

        // Replace fullGame: null with fullGame: 'videoKey'
        updatedContent = updatedContent.replace(
          new RegExp(`('${eventId}':[\\s\\S]*?videos:\\s*{[\\s\\S]*?fullGame:\\s*)null`),
          `$1'${videoKey}'`
        )

        console.log(`   ${eventId}: Assigned ${videoKey}`)
        assignedCount++
        videoIndex++
      } else {
        console.log(`   ${eventId}: No more videos available`)
      }
    }
  })

  console.log(`\n✅ Assigned videos to ${assignedCount} past events`)

  if (pastEventIds.length > availableVideos.length) {
    console.warn(`⚠️  More past events (${pastEventIds.length}) than videos (${availableVideos.length})`)
    console.warn('   Some events will not have videos')
  }

  return updatedContent
}

/**
 * Write the updated events.js file
 * @param {string} content - File content
 */
function writeEventsFile(content) {
  fs.writeFileSync(EVENTS_FILE, content, 'utf-8')
  console.log(`\n✅ Updated: ${EVENTS_FILE}`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🎮 Starting past game video assignment...\n')

  try {
    // Read video mappings
    const mappings = await readVideoMappings()
    const pastGameVideos = mappings.pastGames || []
    const fullGameVideos = mappings.fullGames || []

    // Combine past-game and full-game videos (prioritize past-game)
    const availableVideos = [...pastGameVideos, ...fullGameVideos]

    console.log(`Found ${pastGameVideos.length} past-game videos:`, pastGameVideos)
    console.log(`Found ${fullGameVideos.length} full-game videos:`, fullGameVideos)

    // Read events file
    const fileContent = readEventsFile()

    // Extract past event IDs
    const pastEventIds = extractPastEventIds(fileContent)

    // Update event videos
    const updatedContent = updateEventVideos(fileContent, pastEventIds, availableVideos)

    // Write updated file
    writeEventsFile(updatedContent)

    console.log('\n✨ Past game video assignment complete!\n')
  } catch (error) {
    console.error('❌ Error assigning past game videos:', error)
    process.exit(1)
  }
}

main()
