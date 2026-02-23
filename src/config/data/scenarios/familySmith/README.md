# Family Smith Scenario

This directory contains the test data for the Family Smith scenario - a parent with 3 athletes across multiple sports.

## File Structure

The scenario data is split into separate files for easier maintenance:

### `users.js`
Contains parent and athlete data:
- **parent**: Parent profile (Parent Smith)
- **athletes**: All athlete profiles (Jessica, Jaime, Tommy)

### `teams.js`
Contains all team data including:
- Family teams (teams the athletes play for)
- Opponent teams
- Event profile teams

### `events.js`
Contains all event/game data including:
- Past events (`event-1`, `event-r1`, `event-r2`)
- Live events (`event-2`, `event-live-1`, `event-live-2`)
- Upcoming events (`event-3`)
- Event profile examples (`event-profile-1`, `event-profile-2`, `event-profile-3`)

### `highlights.js`
Contains highlight video data:
- Individual highlight clips
- Links to athletes and events
- Video metadata (views, date, duration)

### `livestreams.js`
Contains livestream data:
- Active livestreams
- Links to events
- Livestream metadata (status, paid access)

### `index.js`
Combines all the separate files and exports the complete scenario object.

## How to Update Data

### Adding a New Athlete
Edit `users.js`:
1. Add athlete object to the `athletes` export
2. Add athlete ID to parent's `athletes` array
3. Reference team IDs in athlete's `teams` array

### Adding a New Team
Edit `teams.js`:
1. Add team object with unique ID
2. Include team colors, sport info, location, record
3. Reference athlete IDs in team's `athletes` array
4. Add event IDs to team's `schedule` array

### Adding a New Event
Edit `events.js`:
1. Add event object with unique ID
2. Set status: `'past'`, `'live'`, or `'upcoming'`
3. Reference team IDs in `homeTeam.teamId` and `awayTeam.teamId`
4. Add athlete IDs to `athletes` array
5. Include appropriate data based on status:
   - **Past**: `recap`, `highlights`, `stats`
   - **Live**: `quarter`, `timeRemaining`, `recentPlays`, `stats`
   - **Upcoming**: `preview`, `keyMatchups`, `seasonStats`

### Adding a New Highlight
Edit `highlights.js`:
1. Add highlight object with unique ID
2. Reference video key from videoConfig
3. Link to athletes via `athleteIds`
4. Optionally link to event via `eventId`

### Adding a New Livestream
Edit `livestreams.js`:
1. Add livestream object with unique ID
2. Link to event via `eventId`
3. Reference video key from videoConfig
4. Set `isPaidAccess` flag as needed

## Data Relationships

```
Parent
  └─ Athletes
      └─ Teams
          └─ Schedule (Events)
              ├─ Videos (Livestreams)
              └─ Videos (Highlights)
```

## Tips

- Always use consistent ID formats (e.g., `athlete-1`, `team-cv`, `event-live-2`)
- Maintain referential integrity (IDs must exist in their respective files)
- Update team schedules when adding events
- Link athletes to events for proper filtering
- Test changes by viewing the app to ensure data displays correctly
