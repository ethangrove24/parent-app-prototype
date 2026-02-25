# Team and Organization Profiles - Implementation Summary

## Overview

Successfully created team and organization profile pages following the same architecture as athlete profiles, with all data sourced from scenario files and structured per the Hudl reference code (AthleteDetails.cs).

## What Was Created

### 1. Data Structures

#### Organizations (`src/config/data/scenarios/familySmith/organizations.js`)
- Created comprehensive organization data structure
- Includes: location, details, leadership, teams, athletes, stats, social, metadata
- 3 organizations created: Lincoln North Star HS, Wayne HS, Brownell Talbot HS
- Follows AthleteDetails.cs pattern for consistent field naming

#### Enhanced Teams (`src/config/data/scenarios/familySmith/teams.js`)
- Added `organizationId` to link teams to organizations
- Added `coaches` array with full coach details
- Added `seasonStats` object with detailed performance metrics
- Added `achievements` array
- Added `season` object with timing and status
- Enhanced existing teams: team-1, team-2, team-3

### 2. Data Access Layer (`src/config/data/dataConfig.js`)

Added getter functions:
- `getOrganizations()` - Get all organizations
- `getTeamById(id)` - Get enriched team with roster, org, schedule, stats
- `getTeamAthletes(teamId)` - Get athletes for a team
- `getTeamHighlights(teamId)` - Get highlights for a team
- `getOrganizationById(id)` - Get enriched org with teams, athletes
- `getOrganizationEvents(orgId)` - Get events for an organization

Added mapper functions:
- `mapTeamToProfileSections(team, handlers)` - Transform team to UI props
- `mapOrganizationToProfileSections(org, handlers)` - Transform org to UI props

### 3. Profile Pages

#### TeamProfilePage (`src/pages/TeamProfilePage.jsx`)
Sections:
- Header with team avatar, name, sport, record
- Organization (linked)
- Season Stats (record, win %, streak, conference)
- Achievements
- Roster (athletes with graduation years)
- Coaching Staff
- Upcoming Events
- Recent Highlights
- Past Events

#### OrgProfilePage (`src/pages/OrgProfilePage.jsx`)
Sections:
- Header with org avatar, name, location
- About (type, location, established, mascot, enrollment, classification)
- Contact Information (address, phone, website)
- Overview Stats (teams, athletes, sports count)
- Teams (linked)
- Athletes (linked)
- Upcoming Events
- Past Events
- Leadership (principal, athletic director)

### 4. Routing

Updated `src/App.jsx`:
- Added `/team/:id` route → `TeamProfilePage`
- Added `/org/:id` route → `OrgProfilePage`
- Updated `AthleteProfilePage` to enable team navigation

### 5. Documentation

Created `DATA_STRUCTURE_GUIDE.md`:
- Comprehensive guide to data structure
- How to add/modify athletes, teams, organizations
- How to expand data fields
- How to create new scenarios
- Examples and patterns from AthleteDetails.cs

## Data Architecture

### Structure (Based on AthleteDetails.cs)

```
Athlete
├── Basic Info (firstName, lastName, initials, avatar)
├── Relationships (teams, parentId)
├── Education (graduationYear)
└── Expandable (location, physical, social, performance, career, content)

Team
├── Basic Info (name, shortName, initials, avatar, sport, colors)
├── Relationships (organizationId, athletes, coaches, schedule)
├── Performance (seasonStats, achievements)
└── Season (year, dates, status)

Organization
├── Basic Info (name, shortName, initials, avatar, type)
├── Location (city, state, address, zipCode)
├── Details (leadership, established, mascot, colors, website, phone)
├── Relationships (teams, athletes)
├── Stats (totalTeams, totalAthletes, activeSports)
├── Social (twitter, facebook, instagram)
└── Metadata (enrollment, classification, conference)
```

### Data Flow Pattern

1. **Scenario Files** → Raw data structures
2. **Getter Functions** → Fetch and enrich with relationships
3. **Mapper Functions** → Transform to UI-ready props
4. **Profile Pages** → Render using shared components
5. **Handlers** → Navigate between profiles

## How to Use

### View Team Profile
Navigate to: `/team/team-1`
- Shows team roster, stats, schedule, highlights
- Click athletes to view their profiles
- Click organization to view school profile

### View Organization Profile
Navigate to: `/org/org-lnhs`
- Shows all teams, athletes, events
- Click teams/athletes to view their profiles

### Add New Data

#### Add Team:
1. Edit `src/config/data/scenarios/familySmith/teams.js`
2. Add team object with all fields
3. Link to organization via `organizationId`
4. Update organization's `teams` array

#### Add Organization:
1. Edit `src/config/data/scenarios/familySmith/organizations.js`
2. Add organization object with all fields
3. Reference in teams via `organizationId`

## Key Features

✅ **Consistent Architecture**: All profiles follow the same pattern
✅ **Data Centralization**: All data in scenario files
✅ **Easy Expansion**: Add fields without changing UI code
✅ **Type Safety**: Consistent field naming across entities
✅ **Navigation**: Full linking between athletes, teams, organizations
✅ **Hudl Reference**: Follows AthleteDetails.cs patterns
✅ **Build Verified**: Successfully builds with no errors

## Testing

Build completed successfully:
```bash
npm run build
✓ built in 1.58s
```

All routes active:
- `/athlete/:id` ✅
- `/team/:id` ✅
- `/org/:id` ✅

## Next Steps (Optional Enhancements)

1. Add more detailed team stats (basketball-specific, soccer-specific)
2. Add org-level achievements and history
3. Add coach profiles
4. Add season comparison charts
5. Add recruiting/scouting info (if applicable)
6. Expand athlete physical stats (height, weight, position details)
7. Add social media integration for teams and orgs

## File Summary

**Created:**
- `src/config/data/scenarios/familySmith/organizations.js` (150 lines)
- `src/pages/TeamProfilePage.jsx` (322 lines)
- `src/pages/OrgProfilePage.jsx` (366 lines)
- `DATA_STRUCTURE_GUIDE.md` (450+ lines)
- `TEAM_ORG_PROFILES_SUMMARY.md` (this file)

**Modified:**
- `src/config/data/scenarios/familySmith/teams.js` (added detailed data)
- `src/config/data/scenarios/familySmith/index.js` (added organizations export)
- `src/config/data/dataConfig.js` (added getters and mappers)
- `src/pages/AthleteProfilePage.jsx` (enabled team navigation)
- `src/App.jsx` (added routes)

**Total Lines Added:** ~1,500+ lines of code and documentation
