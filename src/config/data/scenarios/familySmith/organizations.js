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
  'org-whs': {
    id: 'org-whs',
    name: 'Wayne High School',
    shortName: 'Wayne High',
    initials: 'WHS',
    avatar: '/content/images/team-2-avatar.png',
    type: 'High School',

    location: {
      city: 'Wayne',
      state: 'NE',
      address: '611 West 7th St',
      zipCode: '68787'
    },

    details: {
      athleticDirector: 'Mike Johnson',
      principal: 'Mark Lenihan',
      established: 1891,
      mascot: 'Blue Devils',
      colors: {
        primary: '#ff7020',
        secondary: '#ffa500'
      },
      website: 'https://www.wayneschools.org',
      phone: '(402) 375-3150'
    },

    teams: ['team-2'],
    athletes: ['athlete-3'],

    stats: {
      totalTeams: 1,
      totalAthletes: 1,
      activeSports: ['Soccer']
    },

    social: {
      twitter: '@WayneBlueDevils',
      facebook: 'WayneHighSchool',
      instagram: '@waynehigh'
    },

    metadata: {
      enrollment: 450,
      classification: 'Class C1',
      conference: 'Mid State Conference'
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
