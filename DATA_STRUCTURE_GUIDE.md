# Data Structure Guide

This guide explains how the data is structured in the Parent App prototype, following patterns from the Hudl reference code (AthleteDetails.cs) for easy adjustment and scalability.

## Overview

All data lives in **scenario files** located in `src/config/data/scenarios/`. This allows for:
- Easy data switching by changing the `ACTIVE_SCENARIO` in `dataConfig.js`
- Simple data updates without touching UI code
- Consistent patterns across all entity types

## Core Principles (from AthleteDetails.cs)

1. **Separation of Data and UI**: Data structures are independent of components
2. **Enrichment Pattern**: Raw data is enriched with relationships before display
3. **Getter Functions**: Centralized data access through `dataConfig.js`
4. **Mapper Functions**: Transform data to UI-ready props
5. **Type Consistency**: Similar fields across all entity types

## Entity Types

### 1. Athletes (`users.js`)

**Based on**: `AthleteDetails.cs` from Hudl reference

```javascript
{
  id: 'athlete-1',
  firstName: 'Jessica',
  lastName: 'Smith',
  initials: 'JD',
  avatar: '/path/to/image.png',

  // Relationships
  parentId: 'parent-1',
  teams: ['team-1', 'team-2'],

  // Education
  graduationYear: 2027,

  // Future expandable fields (from AthleteDetails.cs):
  // location: { city: '', state: '' }
  // physical: { height: '', weight: '' }
  // social: { twitterHandle: '', images: [] }
  // performance: { metrics: [], achievements: [] }
  // career: { history: [] }
  // content: { featuredReelId: '' }
}
```

### 2. Teams (`teams.js`)

**Based on**: Team/Organization patterns from Hudl reference

```javascript
{
  id: 'team-1',
  name: 'Lincoln North Star High School',
  shortName: 'Lincoln North Star',
  initials: 'LNS',
  avatar: '/path/to/logo.png',

  // Organization relationship
  organizationId: 'org-lnhs',

  // Sport details
  sport: {
    name: 'Girls Varsity Basketball',
    type: 'Basketball',
    level: 'Varsity',
    gender: 'Girls',
    icon: 'Basketball'
  },

  // Visual identity
  colors: {
    primary: '#0273e3',
    secondary: '#00bfff'
  },

  location: 'Lincoln, NE',
  record: '12 - 3',

  // Relationships (following AthleteDetails.cs pattern)
  athletes: ['athlete-1', 'athlete-2'],
  coaches: [
    {
      id: 'coach-1',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      role: 'Head Coach',
      initials: 'MR',
      avatar: null,
      yearsWithTeam: 5
    }
  ],

  schedule: ['event-1', 'event-2'],

  // Performance metrics (like Metrics in AthleteDetails.cs)
  seasonStats: {
    wins: 12,
    losses: 3,
    winPercentage: 0.800,
    pointsPerGame: 68.5,
    pointsAllowedPerGame: 58.2,
    streak: 'W3',
    conferenceRecord: '8 - 1',
    homeRecord: '7 - 1',
    awayRecord: '5 - 2'
  },

  // Achievements (like Achievements in AthleteDetails.cs)
  achievements: [
    'District Champions 2024',
    'Conference Runner-up 2023'
  ],

  // Season info
  season: {
    year: 2025,
    startDate: '2024-11-15',
    endDate: '2025-03-10',
    status: 'in_progress'
  }
}
```

### 3. Organizations (`organizations.js`)

**Based on**: School/Organization structure from Hudl

```javascript
{
  id: 'org-lnhs',
  name: 'Lincoln North Star High School',
  shortName: 'Lincoln North Star',
  initials: 'LNS',
  avatar: '/path/to/logo.png',
  type: 'High School', // High School, Club, College, etc.

  // Location (like City/State in AthleteDetails.cs)
  location: {
    city: 'Lincoln',
    state: 'NE',
    address: '5801 N 33rd St',
    zipCode: '68504'
  },

  // Organization details
  details: {
    athleticDirector: 'John Anderson',
    principal: 'Sarah Johnson',
    established: 1971,
    mascot: 'Navigators',
    colors: {
      primary: '#0273e3',
      secondary: '#00bfff'
    },
    website: 'https://example.com',
    phone: '(402) 436-1301'
  },

  // Relationships (like CurrentTeams in AthleteDetails.cs)
  teams: ['team-1', 'team-3'],
  athletes: ['athlete-1', 'athlete-2'],

  // Stats (similar to Metrics in AthleteDetails.cs)
  stats: {
    totalTeams: 2,
    totalAthletes: 2,
    activeSports: ['Basketball', 'Soccer']
  },

  // Social (like TwitterHandle/UserImages in AthleteDetails.cs)
  social: {
    twitter: '@LNSNavigators',
    facebook: 'LincolnNorthStar',
    instagram: '@lnshigh'
  },

  // Metadata
  metadata: {
    enrollment: 1850,
    classification: 'Class A',
    conference: 'Lincoln Public Schools Athletic Conference'
  }
}
```

### 4. Events (`events.js`)

Events remain as defined in the existing structure.

### 5. Highlights (`highlights.js`)

Highlights remain as defined in the existing structure.

## Data Access Pattern

### 1. Getter Functions (`dataConfig.js`)

**Primary Getters** (retrieve raw data):
```javascript
getAthletes()       // Returns all athletes
getTeams()          // Returns all teams
getOrganizations()  // Returns all organizations
getEvents()         // Returns all events
getHighlights()     // Returns all highlights
```

**Enriched Getters** (retrieve with relationships resolved):
```javascript
getAthleteById(id)        // Returns athlete with teams resolved
getTeamById(id)           // Returns team with athletes, org, schedule resolved
getOrganizationById(id)   // Returns org with teams, athletes resolved
```

**Filtered Getters**:
```javascript
getAthleteEvents(athleteId, status)  // Returns athlete's events
getAthleteHighlights(athleteId)      // Returns athlete's highlights
getTeamEvents(teamId)                // Returns team's events
getTeamHighlights(teamId)            // Returns team's highlights
getOrganizationEvents(orgId)         // Returns org's events
```

### 2. Mapper Functions

Transform enriched data to UI-ready section props:

```javascript
mapAthleteToProfileSections(athlete, handlers)
mapTeamToProfileSections(team, handlers)
mapOrganizationToProfileSections(org, handlers)
```

These return objects with sections like:
```javascript
{
  header: { avatar, name, subtitle, actions },
  roster: { athletes, coaches },
  events: { upcomingEvents, pastEvents },
  highlights: { highlights },
  stats: { seasonStats, achievements }
}
```

## How to Add/Modify Data

### Adding a New Athlete

1. Edit `src/config/data/scenarios/familySmith/users.js`
2. Add new athlete object to `athletes`:
```javascript
'athlete-4': {
  id: 'athlete-4',
  firstName: 'New',
  lastName: 'Athlete',
  initials: 'NA',
  avatar: '/path/to/avatar.png',
  parentId: 'parent-1',
  teams: ['team-1'],
  graduationYear: 2026
}
```
3. Add athlete ID to parent's `athletes` array
4. Add athlete ID to team's `athletes` array in `teams.js`

### Adding a New Team

1. Edit `src/config/data/scenarios/familySmith/teams.js`
2. Add new team object following the structure above
3. Link to organization via `organizationId`
4. Add team ID to organization's `teams` array in `organizations.js`
5. Add athletes via `athletes` array

### Adding a New Organization

1. Edit `src/config/data/scenarios/familySmith/organizations.js`
2. Add new organization object following the structure above
3. Reference in teams via `organizationId`

### Expanding Data Fields

To add new data fields (e.g., athlete height/weight):

1. **Add to scenario file**:
```javascript
// In users.js
'athlete-1': {
  // ... existing fields
  physical: {
    height: '6\'2"',
    weight: '185 lbs'
  }
}
```

2. **Update getter function** (if needed):
```javascript
// In dataConfig.js - getAthleteById
return {
  // ... existing fields
  physical: athlete.physical || { height: null, weight: null }
}
```

3. **Update mapper function** (if needed):
```javascript
// In dataConfig.js - mapAthleteToProfileSections
return {
  // ... existing sections
  about: {
    physical: athlete.physical,
    hasData: !!athlete.physical
  }
}
```

4. **Update UI** (if needed):
```javascript
// In AthleteProfilePage.jsx
{sectionProps.about.hasData && (
  <ProfileSection title="Physical Stats">
    <p>Height: {sectionProps.about.physical.height}</p>
    <p>Weight: {sectionProps.about.physical.weight}</p>
  </ProfileSection>
)}
```

## Creating New Scenarios

To create a new scenario (e.g., "Family Johnson"):

1. Create new directory: `src/config/data/scenarios/familyJohnson/`
2. Create files:
   - `index.js` (exports all data)
   - `users.js` (parent + athletes)
   - `teams.js`
   - `organizations.js`
   - `events.js`
   - `highlights.js`
   - `livestreams.js`

3. Add to `scenarios/index.js`:
```javascript
import familySmith from './familySmith'
import familyJohnson from './familyJohnson'

export { familySmith, familyJohnson }
```

4. Update `dataConfig.js`:
```javascript
export const SCENARIOS = {
  FAMILY_SMITH: scenarios.familySmith,
  FAMILY_JOHNSON: scenarios.familyJohnson
}

// Change active scenario
export const ACTIVE_SCENARIO = 'FAMILY_JOHNSON'
```

## Profile Pages

Each entity type has a dedicated profile page:

- **AthleteProfilePage.jsx** (`/athlete/:id`)
- **TeamProfilePage.jsx** (`/team/:id`)
- **OrgProfilePage.jsx** (`/org/:id`)

All follow the same pattern:
1. Get ID from URL params
2. Fetch enriched data via getter function
3. Map to section props via mapper function
4. Render using shared profile components
5. Handle navigation via handlers

## Shared Profile Components

Located in `src/components/profile/`:

- **ProfileHeader** - Hero section with avatar, title, actions
- **ProfileSection** - Content section with title
- **ProfileListItem** - List item with avatar, title, subtitle
- **ProfilePlaceholder** - Placeholder for future sections

## Summary

This data architecture follows Hudl's pattern from `AthleteDetails.cs`:

1. **Centralized data** in scenario files
2. **Enrichment** via getter functions
3. **Transformation** via mapper functions
4. **Consistent patterns** across all entity types
5. **Easy expansion** by adding fields to scenario files

All data modifications happen in the scenario files, keeping the UI code clean and maintainable.
