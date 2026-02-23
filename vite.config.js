import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

/**
 * Video Scanner Plugin
 *
 * Automatically scans the video directory and generates configuration files
 * before each build (dev and production). This ensures video configuration
 * is always up-to-date without manual intervention.
 */
const videoScannerPlugin = () => ({
  name: 'video-scanner',
  buildStart() {
    // Run scanner before each build (dev and production)
    console.log('\n🔍 Scanning video directory...')
    try {
      execSync('node scripts/generateVideoConfig.js', { stdio: 'inherit' })
      execSync('node scripts/assignVideosToHighlights.js', { stdio: 'inherit' })
      execSync('node scripts/assignVideosToPastGames.js', { stdio: 'inherit' })
      console.log('✅ Video configuration updated!\n')
    } catch (error) {
      console.error('❌ Video scanner failed:', error.message)
      // Don't fail the build, just warn
    }
  },
  configureServer(server) {
    // Optional: Watch for video file changes in dev mode
    const videoDir = 'public/content/videos'
    server.watcher.add(videoDir)
    server.watcher.on('add', (filePath) => {
      if (filePath.includes(videoDir) && filePath.endsWith('.mov')) {
        console.log('\n📹 New video detected, rescanning...')
        try {
          execSync('node scripts/generateVideoConfig.js && node scripts/assignVideosToHighlights.js && node scripts/assignVideosToPastGames.js', { stdio: 'inherit' })
          // Trigger full reload to pick up new videos
          server.ws.send({ type: 'full-reload' })
        } catch (error) {
          console.error('❌ Video rescan failed:', error.message)
        }
      }
    })
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), videoScannerPlugin()],
  server: {
    port: 3000,
    open: true
  }
})

