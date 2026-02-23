/**
 * Highlight Video Assignment Script
 *
 * Assigns unique videos to each highlight in the highlights.js data file.
 * Uses a round-robin approach to ensure each highlight gets a different video
 * when possible.
 *
 * This script:
 * 1. Reads the generated video mappings
 * 2. Reads the existing highlights.js file
 * 3. Assigns unique highlight videos to each highlight (preserving other metadata)
 * 4. Writes the updated highlights.js back to disk
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
const HIGHLIGHTS_FILE = path.join(__dirname, '../src/config/data/scenarios/familySmith/highlights.js')

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
 * Read the highlights.js file content
 * @returns {string} File content
 */
function readHighlightsFile() {
  if (!fs.existsSync(HIGHLIGHTS_FILE)) {
    console.error('❌ highlights.js not found:', HIGHLIGHTS_FILE)
    process.exit(1)
  }

  return fs.readFileSync(HIGHLIGHTS_FILE, 'utf-8')
}

/**
 * Update videoKey assignments in the file content
 * Uses regex to find and replace videoKey values while preserving formatting
 * @param {string} content - File content
 * @param {string[]} videoKeys - Available highlight video keys
 * @returns {string} Updated file content
 */
function updateVideoKeys(content, videoKeys) {
  if (videoKeys.length === 0) {
    console.warn('⚠️  No highlight videos available. Highlights will keep existing videoKey.')
    return content
  }

  let videoIndex = 0
  let updatedContent = content
  let assignmentCount = 0

  console.log(`\n📝 Assigning ${videoKeys.length} unique videos to highlights...`)

  // Find all highlight entries and update their videoKey
  // Match pattern: 'highlight-X': { ... videoKey: 'something', ... }
  const highlightPattern = /'(highlight-[^']+)':\s*{[^}]*videoKey:\s*'([^']+)'[^}]*}/g

  updatedContent = content.replace(highlightPattern, (match, highlightId, oldVideoKey) => {
    const newVideoKey = videoKeys[videoIndex]
    console.log(`   ${highlightId}: ${oldVideoKey} → ${newVideoKey}`)

    // Replace the videoKey value in this match
    const updated = match.replace(
      /videoKey:\s*'[^']+'/,
      `videoKey: '${newVideoKey}'`
    )

    assignmentCount++
    videoIndex = (videoIndex + 1) % videoKeys.length
    return updated
  })

  if (assignmentCount === 0) {
    console.warn('⚠️  No highlights found to update')
  } else {
    console.log(`✅ Assigned videos to ${assignmentCount} highlights`)
  }

  // Warn if we're reusing videos
  if (assignmentCount > videoKeys.length) {
    console.warn(`\n⚠️  More highlights (${assignmentCount}) than videos (${videoKeys.length})`)
    console.warn('   Some videos will be reused')
  }

  return updatedContent
}

/**
 * Write the updated highlights.js file
 * @param {string} content - File content
 */
function writeHighlightsFile(content) {
  fs.writeFileSync(HIGHLIGHTS_FILE, content, 'utf-8')
  console.log(`\n✅ Updated: ${HIGHLIGHTS_FILE}`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🎬 Starting highlight video assignment...\n')

  try {
    // Read video mappings
    const mappings = await readVideoMappings()
    const highlightVideos = mappings.highlights || []

    console.log(`Found ${highlightVideos.length} highlight videos:`, highlightVideos)

    // Read highlights file
    const fileContent = readHighlightsFile()

    // Update videoKey assignments
    const updatedContent = updateVideoKeys(fileContent, highlightVideos)

    // Write updated file
    writeHighlightsFile(updatedContent)

    console.log('\n✨ Highlight video assignment complete!\n')
  } catch (error) {
    console.error('❌ Error assigning highlight videos:', error)
    process.exit(1)
  }
}

main()
