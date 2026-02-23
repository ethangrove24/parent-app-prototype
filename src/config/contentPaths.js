/**
 * Content Paths Configuration
 *
 * Centralized configuration for all content assets that can be swapped
 * without rebuilding the application.
 *
 * All paths point to the public/ directory which contains:
 * - icons: Sport and team icons (in /sportsicons)
 * - videos: Live feeds, highlights, full games, and thumbnails
 * - images: Logos, avatars, and other images
 * - data: Scenario JSON files (future)
 */

export const CONTENT_PATHS = {
  // Content asset directories
  icons: '/sportsicons',
  videos: '/content/videos',
  images: '/content/images',
  data: '/content/data',

  // Specific asset paths
  scenarios: '/content/data/scenarios'
}

/**
 * Get the full URL for an icon
 * @param {string} iconName - Icon filename (e.g., 'Basketball.png')
 * @returns {string} Full URL path to the icon
 */
export const getIconUrl = (iconName) => {
  return `${CONTENT_PATHS.icons}/${iconName}`
}

/**
 * Get the full URL for a video
 * @param {string} videoName - Video filename
 * @returns {string} Full URL path to the video
 */
export const getVideoUrl = (videoName) => {
  return `${CONTENT_PATHS.videos}/${videoName}`
}

/**
 * Get the full URL for an image
 * @param {string} imageName - Image filename
 * @returns {string} Full URL path to the image
 */
export const getImageUrl = (imageName) => {
  return `${CONTENT_PATHS.images}/${imageName}`
}

/**
 * Get the full URL for an athlete avatar
 * @param {string} athleteNumber - Athlete number (e.g., '1', '2', '3')
 * @returns {string} Full URL path to the athlete avatar
 */
export const getAthleteAvatarUrl = (athleteNumber) => {
  return `${CONTENT_PATHS.images}/athlete${athleteNumber}-avatar.png`
}

/**
 * Get the full URL for a team avatar
 * @param {string} teamNumber - Team number (e.g., '1', '2')
 * @returns {string} Full URL path to the team avatar
 */
export const getTeamAvatarUrl = (teamNumber) => {
  return `${CONTENT_PATHS.images}/team-${teamNumber}-avatar.png`
}

/**
 * Get the full URL for an opponent avatar
 * @param {string} opponentNumber - Opponent number (e.g., '1', '2', '3')
 * @returns {string} Full URL path to the opponent avatar
 */
export const getOpponentAvatarUrl = (opponentNumber) => {
  return `${CONTENT_PATHS.images}/Opponent-${opponentNumber}-avatar.png`
}

/**
 * Get the full URL for a scenario data file
 * @param {string} scenarioName - Scenario filename (e.g., 'familySmith.json')
 * @returns {string} Full URL path to the scenario data
 */
export const getScenarioUrl = (scenarioName) => {
  return `${CONTENT_PATHS.scenarios}/${scenarioName}`
}

export default CONTENT_PATHS
