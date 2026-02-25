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

export const getOrganizations = () => {
  return getActiveScenario().organizations
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
// Athlete Profile Functions
// ============================================================================

/**
 * Get athlete by ID with full enriched data
 * Maps to structure similar to AthleteDetails.cs from Hudl reference
 * @param {string} athleteId - The athlete ID
 * @returns {Object|null} Enriched athlete object or null if not found
 */
export const getAthleteById = (athleteId) => {
  const athletes = getAthletes()
  const athlete = athletes[athleteId]
  if (!athlete) return null

  const teams = getAthleteTeams(athleteId)
  const primaryTeam = teams[0] || null

  return {
    // Basic info (available now)
    id: athlete.id,
    firstName: athlete.firstName,
    lastName: athlete.lastName,
    fullName: `${athlete.firstName} ${athlete.lastName}`,
    initials: athlete.initials,
    avatar: athlete.avatar,
    graduationYear: athlete.graduationYear,

    // Teams (available now - enriched)
    teams: teams,
    primaryTeam: primaryTeam,

    // Placeholders (future data from scenario files)
    location: { city: null, state: null },
    physical: { height: null, weight: null },
    social: { twitterHandle: null, images: [] },
    performance: { metrics: [], achievements: [] },
    career: { history: [] },
    content: { featuredReelId: null }
  }
}

/**
 * Get all events featuring specific athlete
 * Filters events by athlete ID in event.athletes array
 * @param {string} athleteId - The athlete ID
 * @param {string} status - 'upcoming', 'past', or 'live'
 * @returns {Array} Array of enriched event objects
 */
export const getAthleteEvents = (athleteId, status = 'upcoming') => {
  const events = getEventsByStatus(status)
  return events
    .filter(event => event.athletes && event.athletes.includes(athleteId))
    .map(enrichEventForDisplay)
}

/**
 * Get all highlights featuring specific athlete
 * Filters highlights by athlete ID in highlight.athleteIds array
 * @param {string} athleteId - The athlete ID
 * @returns {Array} Array of enriched highlight objects
 */
export const getAthleteHighlights = (athleteId) => {
  const highlights = Object.values(getHighlights())
  return highlights
    .filter(h => h.athleteIds && h.athleteIds.includes(athleteId))
    .map(enrichHighlightForDisplay)
}

/**
 * Map athlete data to profile section props
 * Similar to mapAthleteDetailsDataToProfileSectionProps from Hudl reference
 * @param {Object} athlete - The athlete object from getAthleteById
 * @param {Object} handlers - Optional handlers {actions, onTeamClick, onEventClick, onHighlightClick}
 * @returns {Object} Mapped section props for profile page
 */
export const mapAthleteToProfileSections = (athlete, handlers = {}) => {
  return {
    header: {
      avatar: athlete.avatar,
      initials: athlete.initials,
      name: athlete.fullName,
      subtitle: athlete.graduationYear ? `Class of ${athlete.graduationYear}` : null,
      actions: handlers.actions || []
    },
    teams: {
      teams: athlete.teams,
      onTeamClick: handlers.onTeamClick
    },
    events: {
      upcomingEvents: getAthleteEvents(athlete.id, 'upcoming'),
      pastEvents: getAthleteEvents(athlete.id, 'past'),
      onEventClick: handlers.onEventClick
    },
    highlights: {
      highlights: getAthleteHighlights(athlete.id),
      onHighlightClick: handlers.onHighlightClick
    },
    stats: {
      hasData: false,
      placeholder: true
    },
    about: {
      location: athlete.location,
      physical: athlete.physical,
      social: athlete.social,
      hasData: false,
      placeholder: true
    }
  }
}

// ============================================================================
// Team Profile Functions
// ============================================================================

/**
 * Get team by ID with full enriched data
 * Maps to structure similar to TeamDetails from Hudl reference
 * @param {string} teamId - The team ID
 * @returns {Object|null} Enriched team object or null if not found
 */
export const getTeamById = (teamId) => {
  const teams = getTeams()
  const team = teams[teamId]
  if (!team) return null

  const athletes = getAthletes()
  const organizations = getOrganizations()
  const organization = organizations[team.organizationId]

  // Get roster with enriched athlete data
  const roster = team.athletes
    .map(athleteId => {
      const athlete = athletes[athleteId]
      return athlete ? {
        id: athlete.id,
        firstName: athlete.firstName,
        lastName: athlete.lastName,
        fullName: `${athlete.firstName} ${athlete.lastName}`,
        initials: athlete.initials,
        avatar: athlete.avatar,
        graduationYear: athlete.graduationYear
      } : null
    })
    .filter(Boolean)

  return {
    // Basic info (available now)
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    initials: team.initials,
    avatar: team.avatar,
    sport: team.sport,
    colors: team.colors,
    location: team.location,
    record: team.record,

    // Organization relationship
    organization: organization ? {
      id: organization.id,
      name: organization.name,
      shortName: organization.shortName,
      initials: organization.initials,
      avatar: organization.avatar,
      location: organization.location
    } : null,

    // Roster and coaches
    roster: roster,
    coaches: team.coaches || [],

    // Schedule
    schedule: team.schedule || [],

    // Performance data
    seasonStats: team.seasonStats || null,
    achievements: team.achievements || [],
    season: team.season || null
  }
}

/**
 * Get all athletes for a specific team
 * @param {string} teamId - The team ID
 * @returns {Array} Array of athlete objects
 */
export const getTeamAthletes = (teamId) => {
  const teams = getTeams()
  const athletes = getAthletes()
  const team = teams[teamId]

  if (!team) return []

  return team.athletes
    .map(athleteId => athletes[athleteId])
    .filter(Boolean)
}

/**
 * Get all highlights featuring specific team
 * Filters highlights by team events
 * @param {string} teamId - The team ID
 * @returns {Array} Array of enriched highlight objects
 */
export const getTeamHighlights = (teamId) => {
  const team = getTeamById(teamId)
  if (!team) return []

  const highlights = Object.values(getHighlights())
  const teamEvents = team.schedule

  // Get highlights from events that this team participated in
  return highlights
    .filter(h => h.eventId && teamEvents.includes(h.eventId))
    .map(enrichHighlightForDisplay)
}

/**
 * Map team data to profile section props
 * Similar to mapTeamDetailsDataToProfileSectionProps from Hudl reference
 * @param {Object} team - The team object from getTeamById
 * @param {Object} handlers - Optional handlers {actions, onAthleteClick, onEventClick, onOrgClick}
 * @returns {Object} Mapped section props for profile page
 */
export const mapTeamToProfileSections = (team, handlers = {}) => {
  const events = getEvents()

  // Get team events with enrichment
  const teamEvents = team.schedule
    .map(eventId => {
      const event = events[eventId]
      return event ? enrichEventForDisplay(event) : null
    })
    .filter(Boolean)

  const upcomingEvents = teamEvents.filter(e => e.status === 'upcoming')
  const pastEvents = teamEvents.filter(e => e.status === 'past')

  return {
    header: {
      avatar: team.avatar,
      initials: team.initials,
      name: team.name,
      subtitle: `${team.sport.name} · ${team.record}`,
      actions: handlers.actions || []
    },
    organization: {
      organization: team.organization,
      onOrgClick: handlers.onOrgClick
    },
    roster: {
      athletes: team.roster,
      coaches: team.coaches,
      onAthleteClick: handlers.onAthleteClick
    },
    stats: {
      seasonStats: team.seasonStats,
      achievements: team.achievements,
      season: team.season,
      hasData: !!team.seasonStats
    },
    events: {
      upcomingEvents,
      pastEvents,
      onEventClick: handlers.onEventClick
    },
    highlights: {
      highlights: getTeamHighlights(team.id),
      onHighlightClick: handlers.onHighlightClick
    }
  }
}

// ============================================================================
// Organization Profile Functions
// ============================================================================

/**
 * Get organization by ID with full enriched data
 * Maps to structure similar to OrgDetails from Hudl reference
 * @param {string} orgId - The organization ID
 * @returns {Object|null} Enriched organization object or null if not found
 */
export const getOrganizationById = (orgId) => {
  const organizations = getOrganizations()
  const org = organizations[orgId]
  if (!org) return null

  const teams = getTeams()
  const athletes = getAthletes()

  // Get teams with enriched data
  const orgTeams = org.teams
    .map(teamId => {
      const team = teams[teamId]
      return team ? {
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        initials: team.initials,
        avatar: team.avatar,
        sport: team.sport,
        record: team.record
      } : null
    })
    .filter(Boolean)

  // Get athletes with enriched data
  const orgAthletes = org.athletes
    .map(athleteId => {
      const athlete = athletes[athleteId]
      return athlete ? {
        id: athlete.id,
        firstName: athlete.firstName,
        lastName: athlete.lastName,
        fullName: `${athlete.firstName} ${athlete.lastName}`,
        initials: athlete.initials,
        avatar: athlete.avatar,
        graduationYear: athlete.graduationYear
      } : null
    })
    .filter(Boolean)

  return {
    // Basic info
    id: org.id,
    name: org.name,
    shortName: org.shortName,
    initials: org.initials,
    avatar: org.avatar,
    type: org.type,

    // Location
    location: org.location,

    // Details
    details: org.details,

    // Relationships
    teams: orgTeams,
    athletes: orgAthletes,

    // Stats
    stats: org.stats,

    // Social
    social: org.social,

    // Metadata
    metadata: org.metadata
  }
}

/**
 * Get all events for a specific organization
 * @param {string} orgId - The organization ID
 * @returns {Array} Array of event objects
 */
export const getOrganizationEvents = (orgId) => {
  const org = getOrganizationById(orgId)
  if (!org) return []

  const events = Object.values(getEvents())
  const teamIds = org.teams.map(t => t.id)

  // Get all events where any of the org's teams participated
  return events.filter(event =>
    teamIds.includes(event.homeTeam?.teamId) ||
    teamIds.includes(event.awayTeam?.teamId)
  )
}

/**
 * Map organization data to profile section props
 * Similar to mapOrgDetailsDataToProfileSectionProps from Hudl reference
 * @param {Object} org - The organization object from getOrganizationById
 * @param {Object} handlers - Optional handlers {actions, onTeamClick, onAthleteClick, onEventClick}
 * @returns {Object} Mapped section props for profile page
 */
export const mapOrganizationToProfileSections = (org, handlers = {}) => {
  const orgEvents = getOrganizationEvents(org.id)
  const upcomingEvents = orgEvents
    .filter(e => e.status === 'upcoming')
    .map(enrichEventForDisplay)
  const pastEvents = orgEvents
    .filter(e => e.status === 'past')
    .map(enrichEventForDisplay)

  return {
    header: {
      avatar: org.avatar,
      initials: org.initials,
      name: org.name,
      subtitle: `${org.location.city}, ${org.location.state}`,
      actions: handlers.actions || []
    },
    details: {
      details: org.details,
      location: org.location,
      metadata: org.metadata,
      social: org.social
    },
    teams: {
      teams: org.teams,
      onTeamClick: handlers.onTeamClick
    },
    athletes: {
      athletes: org.athletes,
      onAthleteClick: handlers.onAthleteClick
    },
    stats: {
      stats: org.stats,
      hasData: true
    },
    events: {
      upcomingEvents,
      pastEvents,
      onEventClick: handlers.onEventClick
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
  getOrganizations,
  getEvents,
  getHighlights,
  getLivestreams,
  getEventsByStatus,
  getEventWithTeamDetails,
  getAthleteTeams,
  getTeamEvents,
  getHighlightById,
  getAthleteById,
  getAthleteEvents,
  getAthleteHighlights,
  mapAthleteToProfileSections,
  getTeamById,
  getTeamAthletes,
  getTeamHighlights,
  mapTeamToProfileSections,
  getOrganizationById,
  getOrganizationEvents,
  mapOrganizationToProfileSections,
  enrichEventForDisplay,
  enrichHighlightForDisplay,
  enrichLivestreamForDisplay
}
