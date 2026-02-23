# Video Assets

This folder contains all video assets and thumbnails for the Hudl navigation app. Videos are served directly from the public folder for optimal performance and easy testing.

## Purpose

This folder stores:
- **Live feed videos** - Livestream hero carousel videos
- **Highlight videos** - Playlist and highlight reel clips
- **Full game videos** - Complete game recordings
- **Poster images/thumbnails** - Preview thumbnails for all videos

## Directory Structure

```
public/content/videos/
├── live-feed-1.mov
├── live-feed-1-poster.jpg
├── live-feed-2.mov
├── live-feed-2-poster.jpg
├── highlight-reel-1.mov
├── highlight-reel-1-poster.jpg
├── full-game-1.mov
├── full-game-1-poster.jpg
└── README.md
```

## Usage

Videos are configured in `src/config/videoConfig.js`. To swap videos for testing:

### Quick Swap (Single Video)
1. Navigate to `public/content/videos/`
2. Replace the video file (keep the same name)
3. Optionally replace the poster image
4. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Add New Video
1. Place video file in `public/content/videos/`
2. Generate or add a poster image (e.g., `my-video-poster.jpg`)
3. Add entry to `VIDEO_SOURCES` in `src/config/videoConfig.js`:
```javascript
myVideo: {
  src: `${BASE_VIDEO_URL}/my-video.mov`,
  poster: `${BASE_VIDEO_URL}/my-video-poster.jpg`,
  type: 'video/quicktime',
  label: 'My Video Description'
}
```
4. Reference the video key in your scenario data

## Video Format Recommendations

**Current Format:** MOV/QuickTime
- Good quality preservation
- Commonly used for content creation
- Widely supported by modern browsers

**Alternative Format:** MP4 (H.264 video, AAC audio)
- Universal browser support
- Better compression/quality balance
- More streaming-friendly for web

**Encoding with FFmpeg:**
Convert MOV to MP4:
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**Size Guidelines:**
- Live feeds: 720p, 15-60 seconds, ~10-50MB
- Highlights: 480-720p, 10-30 seconds, ~5-20MB
- Full game: 1080p, accept larger size

**Generate poster/thumbnail images:**
```bash
# Extract frame at 3 seconds
ffmpeg -i video.mov -ss 00:00:03 -vframes 1 video-poster.jpg

# Extract frame and resize
ffmpeg -i video.mov -ss 00:00:03 -vframes 1 -vf scale=640:-1 video-poster.jpg
```

## Naming Convention

Follow this naming pattern for consistency:
- Videos: `[type]-[number].mov` (e.g., `live-feed-1.mov`, `highlight-1.mov`)
- Posters: `[type]-[number]-poster.jpg` (e.g., `live-feed-1-poster.jpg`)

## Git Handling

Large video files (.mp4, .webm, .mov) are excluded from git via `.gitignore`. Only poster images and documentation are tracked.

To share videos with the team:
- Use a shared drive or cloud storage
- Document video sources in this README
- Keep poster images in git for reference
