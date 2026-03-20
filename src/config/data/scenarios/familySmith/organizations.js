// Family Smith - Organizations (Schools/Clubs)
// Follows similar structure to AthleteDetails.cs for easy adjustment

export const organizations = {
  'org-lnhs': {
    id: 'org-lnhs',
    name: 'Lincoln North Star High School',
    shortName: 'Lincoln North Star',
    initials: 'LNS',
    avatar: '/content/images/team-1-avatar.png',
    type: 'High School', // High School, Club, College, etc.

    // Location info (like City/State in AthleteDetails.cs)
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
      website: 'https://nstar.lps.org',
      phone: '(402) 436-1301'
    },

    // Relationships (like CurrentTeams in AthleteDetails.cs)
    teams: ['team-1', 'team-3'], // Team IDs that belong to this org
    athletes: ['athlete-1', 'athlete-2'], // Athlete IDs from this org

    // Performance/Stats (similar to Metrics in AthleteDetails.cs)
    stats: {
      totalTeams: 2,
      totalAthletes: 2,
      activeSports: ['Basketball', 'Soccer']
    },

    // Social/Media (like TwitterHandle/UserImages in AthleteDetails.cs)
    social: {
      twitter: '@LNSNavigators',
      facebook: 'LincolnNorthStar',
      instagram: '@lnshigh'
    },

    // Additional metadata
    metadata: {
      enrollment: 1850,
      classification: 'Class A',
      conference: 'Lincoln Public Schools Athletic Conference'
    }
  },
  'org-stcroix': {
    id: 'org-stcroix',
    name: 'St. Croix Soccer Club',
    shortName: 'St. Croix SC',
    initials: 'SCSC',
    avatar: 'https://static.hudl.com/users/temp/8221754_378d1dfcce07443da16755ba89c7288b.png',
    type: 'Club',

    location: {
      city: 'Stillwater',
      state: 'MN',
      address: null,
      zipCode: null
    },

    details: {
      established: null,
      colors: {
        primary: '#003087',
        secondary: '#c9a84c'
      },
      website: null,
      phone: null
    },

    teams: ['team-2'],
    athletes: ['athlete-3'],

    stats: {
      totalTeams: 1,
      totalAthletes: 1,
      activeSports: ['Soccer']
    },

    social: {
      twitter: null,
      facebook: null,
      instagram: null
    },

    metadata: {
      classification: 'ECNL',
      conference: 'ECNL Boys'
    }
  },
  'org-bt': {
    id: 'org-bt',
    name: 'Brownell Talbot High School',
    shortName: 'Brownell Talbot',
    initials: 'BT',
    avatar: '/content/images/Opponent-2-avatar.png',
    type: 'High School',

    location: {
      city: 'Omaha',
      state: 'NE',
      address: '400 N Happy Hollow Blvd',
      zipCode: '68132'
    },

    details: {
      athleticDirector: 'David Martinez',
      principal: 'Linda Thompson',
      established: 1863,
      mascot: 'Raiders',
      colors: {
        primary: '#2b7d44',
        secondary: '#355e3b'
      },
      website: 'https://www.brownell.edu',
      phone: '(402) 556-3772'
    },

    teams: ['team-bt'],
    athletes: [],

    stats: {
      totalTeams: 1,
      totalAthletes: 0,
      activeSports: ['Basketball']
    },

    social: {
      twitter: '@BTRaiders',
      facebook: 'BrownellTalbot',
      instagram: '@btraiders'
    },

    metadata: {
      enrollment: 380,
      classification: 'Class C1',
      conference: 'Metro Conference'
    }
  }
}
