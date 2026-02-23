import * as scenarios from './scenarios'
import { getSportIcon } from './helpers/sportIcons'
import { resolveEventColors } from './helpers/teamColors'
import CircleIcon from '../../assets/ui-icons/Circle.svg'
import TicketIcon from '../../assets/ui-icons/Ticket.svg'

// Active scenario selection - change this to swap scenarios
export const ACTIVE_SCENARIO = 'FAMILY_SMITH'

// Scenario mapping
export const SCENARIOS = {
  FAMILY_SMITH: scenarios.familySmith
  // Add more scenarios here as they're created
}

// Get the active scenario data
const getActiveScenario = () => {
  const scenario = SCENARIOS[ACTIVE_SCENARIO]
  if (!scenario) {
    console.error(`Scenario "${ACTIVE_SCENARIO}" not found. Using default.`)
    return SCENARIOS.FAMILY_SMITH
  }
  return scenario
}

// ============================================================================
// Primary Getter Functions
// ============================================================================

export const getParent = () => {
  return getActiveScenario().parent
}

export const getAthletes = () => {
  return getActiveScenario().athletes
}

export const getTeams = () => {
  return getActiveScenario().teams
}

export const getEvents = () => {
  return getActiveScenario().events
}

export const getHighlights = () => {
  return getActiveScenario().highlights
}

export const getLivestreams = () => {
  return getActiveScenario().livestreams
}

// ============================================================================
// Helper Functions - Common Queries
// ============================================================================

/**
 * Get events filtered by status and sorted by date
 * @param {string} status - 'past', 'live', or 'upcoming'
 * @returns {Array} Sorted array of events
 */
export const getEventsByStatus = (status) => {
  const events = getEvents()
  return Object.values(events)
    .filter(event => event.status === status)
    .sort((a, b) => {
      const dateA = new Date(a.date.iso)
      const dateB = new Date(b.date.iso)
      // Sort upcoming events ascending, past events descending
      return status === 'upcoming' ? dateA - dateB : dateB - dateA
    })
}

/**
 * Get a single event with team details resolved
 * @param {string} eventId - The event ID
 * @returns {Object|null} Event with team details or null if not found
 */
export const getEventWithTeamDetails = (eventId) => {
  const events = getEvents()
  const teams = getTeams()
  const athletes = getAthletes()
  const event = events[eventId]

  if (!event) return null

  // Resolve team details
  const homeTeam = teams[event.homeTeam.teamId]
  const awayTeam = teams[event.awayTeam.teamId]

  // Resolve athlete details (if any)
  let featuredAthletes = []
  if (event.athletes && event.athletes.length > 0) {
    featuredAthletes = event.athletes
      .map(athleteId => {
        const athlete = athletes[athleteId]
        if (athlete) {
          return {
            id: athleteId,
            name: `${athlete.firstName} ${athlete.lastName}`,
            initials: athlete.initials,
            avatar: athlete.avatar,
            number: athlete.jerseyNumber || '0',
            position: athlete.position || 'Player'
          }
        }
        return null
      })
      .filter(Boolean)
  }

  // Resolve team colors with edge case handling
  const { homeColor, awayColor } = resolveEventColors(homeTeam, awayTeam)

  return {
    ...event,
    featuredAthletes,
    homeTeam: {
      ...event.homeTeam,
      name: homeTeam?.name || 'Unknown',
      initials: homeTeam?.initials || 'UK',
      location: homeTeam?.location || 'Unknown',
      record: homeTeam?.record || '0 - 0',
      color: homeColor,
      avatar: homeTeam?.avatar || null,
      stats: event.homeTeam.stats || homeTeam?.stats,
      seasonStats: homeTeam?.seasonStats || event.seasonStats?.homeTeam
    },
    awayTeam: {
      ...event.awayTeam,
      name: awayTeam?.name || 'Unknown',
      initials: awayTeam?.initials || 'UK',
      location: awayTeam?.location || 'Unknown',
      record: awayTeam?.record || '0 - 0',
      color: awayColor,
      avatar: awayTeam?.avatar || null,
      stats: event.awayTeam.stats || awayTeam?.stats,
      seasonStats: awayTeam?.seasonStats || event.seasonStats?.awayTeam
    }
  }
}

/**
 * Get all teams for a specific athlete
 * @param {string} athleteId - The athlete ID
 * @returns {Array} Array of team objects
 */
export const getAthleteTeams = (athleteId) => {
  const athletes = getAthletes()
  const teams = getTeams()
  const athlete = athletes[athleteId]

  if (!athlete) return []

  return athlete.teams
    .map(teamId => teams[teamId])
    .filter(Boolean)
}

/**
 * Get all events for a specific team
 * @param {string} teamId - The team ID
 * @returns {Array} Array of event objects
 */
export const getTeamEvents = (teamId) => {
  const teams = getTeams()
  const events = getEvents()
  const team = teams[teamId]

  if (!team) return []

  return team.schedule
    .map(eventId => events[eventId])
    .filter(Boolean)
}

/**
 * Get highlight by ID
 * @param {string} highlightId - The highlight ID
 * @returns {Object|null} Highlight object or null if not found
 */
export const getHighlightById = (highlightId) => {
  const highlights = getHighlights()
  return highlights[highlightId] || null
}

// ============================================================================
// Enrich Functions - Add Display Details
// ============================================================================

/**
 * Enrich event data with sport icons and team details for display
 * @param {Object} event - The event object
 * @returns {Object} Enriched event object
 */
export const enrichEventForDisplay = (event) => {
  const teams = getTeams()
  const homeTeam = teams[event.homeTeam.teamId]
  const awayTeam = teams[event.awayTeam.teamId]
  const athletes = getAthletes()

  return {
    ...event,
    sportIcon: getSportIcon(event.sport),
    athletes: event.athletes.map(athleteId => {
      const athlete = athletes[athleteId]
      return {
        initials: athlete?.initials || 'UK',
        avatar: athlete?.avatar || null
      }
    }),
    homeTeam: {
      ...event.homeTeam,
      name: homeTeam?.shortName || 'Unknown',
      avatar: homeTeam?.avatar || null,
      initials: homeTeam?.initials || 'UK'
    },
    awayTeam: {
      ...event.awayTeam,
      name: awayTeam?.shortName || 'Unknown',
      avatar: awayTeam?.avatar || null,
      initials: awayTeam?.initials || 'UK'
    }
  }
}

/**
 * Enrich highlight data with sport icons and athlete details for display
 * @param {Object} highlight - The highlight object
 * @returns {Object} Enriched highlight object
 */
export const enrichHighlightForDisplay = (highlight) => {
  const athletes = getAthletes()

  // Get the first athlete's details (highlights typically feature one primary athlete)
  const primaryAthleteId = highlight.athleteIds?.[0]
  const athlete = primaryAthleteId ? athletes[primaryAthleteId] : null

  return {
    ...highlight,
    tags: highlight.tags.map(tag => ({
      ...tag,
      icon: getSportIcon(tag.icon)
    })),
    athlete: athlete ? {
      avatar: athlete.avatar,
      initials: athlete.initials
    } : null
  }
}

/**
 * Enrich livestream data with sport icons and athlete details for display
 * @param {Object} livestream - The livestream object
 * @returns {Object} Enriched livestream object
 */
export const enrichLivestreamForDisplay = (livestream) => {
  const athletes = getAthletes()
  const athlete = livestream.athleteAvatar?.athleteId
    ? athletes[livestream.athleteAvatar.athleteId]
    : null

  return {
    ...livestream,
    sport: {
      ...livestream.sport,
      icon: getSportIcon(livestream.sport.icon)
    },
    athleteAvatar: livestream.athleteAvatar ? {
      initials: athlete?.initials || livestream.athleteAvatar.initials || 'UK',
      avatar: athlete?.avatar || null
    } : null,
    icons: {
      circle: CircleIcon,
      ticket: TicketIcon
    }
  }
}

// ============================================================================
// Exports for backward compatibility and convenience
// ============================================================================

export default {
  getParent,
  getAthletes,
  getTeams,
  getEvents,
  getHighlights,
  getLivestreams,
  getEventsByStatus,
  getEventWithTeamDetails,
  getAthleteTeams,
  getTeamEvents,
  getHighlightById,
  enrichEventForDisplay,
  enrichHighlightForDisplay,
  enrichLivestreamForDisplay
}
