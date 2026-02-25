// Family Smith - Teams

export const teams = {
  'team-1': {
    id: 'team-1',
    name: 'Lincoln North Star High School',
    shortName: 'Lincoln North Star',
    initials: 'LNS',
    avatar: '/content/images/team-1-avatar.png',
    organizationId: 'org-lnhs', // Link to organization
    sport: {
      name: 'Girls Varsity Basketball',
      type: 'Basketball',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Basketball'
    },
    colors: {
      primary: '#0273e3', // Blue
      secondary: '#00bfff' // Light Blue
    },
    location: 'Lincoln, NE',
    record: '12 - 3',

    // Roster (following AthleteDetails.cs pattern for relationships)
    athletes: ['athlete-1', 'athlete-2'],

    // Coaching staff
    coaches: [
      {
        id: 'coach-1',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        role: 'Head Coach',
        initials: 'MR',
        avatar: null,
        yearsWithTeam: 5
      },
      {
        id: 'coach-2',
        firstName: 'Tom',
        lastName: 'Stevens',
        role: 'Assistant Coach',
        initials: 'TS',
        avatar: null,
        yearsWithTeam: 3
      }
    ],

    // Schedule/Events
    schedule: ['event-r1', 'event-r2', 'event-live-2'],

    // Season Stats (similar to Metrics in AthleteDetails.cs)
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
      'Conference Runner-up 2023',
      'State Tournament 2023'
    ],

    // Season info
    season: {
      year: 2025,
      startDate: '2024-11-15',
      endDate: '2025-03-10',
      status: 'in_progress'
    }
  },
  'team-2': {
    id: 'team-2',
    name: 'Wayne High School',
    shortName: 'Wayne',
    initials: 'WH',
    avatar: '/content/images/team-2-avatar.png',
    organizationId: 'org-whs',
    sport: {
      name: 'Boys Varsity Soccer',
      type: 'Soccer',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Soccer'
    },
    colors: {
      primary: '#ff7020', // Orange
      secondary: '#ffa500' // Gold
    },
    location: 'Wayne, NE',
    record: '8 - 5',

    athletes: ['athlete-3'],

    coaches: [
      {
        id: 'coach-3',
        firstName: 'David',
        lastName: 'Thompson',
        role: 'Head Coach',
        initials: 'DT',
        avatar: null,
        yearsWithTeam: 7
      }
    ],

    schedule: ['event-1', 'event-2', 'event-3'],

    seasonStats: {
      wins: 8,
      losses: 5,
      winPercentage: 0.615,
      goalsFor: 32,
      goalsAgainst: 21,
      shutouts: 4,
      streak: 'L1',
      conferenceRecord: '5 - 3',
      homeRecord: '5 - 2',
      awayRecord: '3 - 3'
    },

    achievements: [
      'Conference Champions 2024',
      'District Finalist 2023'
    ],

    season: {
      year: 2025,
      startDate: '2024-08-20',
      endDate: '2024-11-05',
      status: 'in_progress'
    }
  },
  'team-3': {
    id: 'team-3',
    name: 'Lincoln North Star High School',
    shortName: 'Lincoln North Star',
    initials: 'LNS',
    avatar: '/content/images/team-1-avatar.png', // Same as team-1
    organizationId: 'org-lnhs',
    sport: {
      name: 'Womens Varsity Soccer',
      type: 'Soccer',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Soccer'
    },
    colors: {
      primary: '#0273e3', // Blue
      secondary: '#00bfff' // Light Blue
    },
    location: 'Lincoln, NE',
    record: '10 - 2',

    athletes: ['athlete-1'],

    coaches: [
      {
        id: 'coach-4',
        firstName: 'Jennifer',
        lastName: 'Martinez',
        role: 'Head Coach',
        initials: 'JM',
        avatar: null,
        yearsWithTeam: 4
      }
    ],

    schedule: ['event-live-1'],

    seasonStats: {
      wins: 10,
      losses: 2,
      winPercentage: 0.833,
      goalsFor: 45,
      goalsAgainst: 15,
      shutouts: 7,
      streak: 'W5',
      conferenceRecord: '6 - 1',
      homeRecord: '6 - 0',
      awayRecord: '4 - 2'
    },

    achievements: [
      'Conference Champions 2024',
      'State Tournament Semifinalist 2023',
      'Undefeated Home Record 2024'
    ],

    season: {
      year: 2025,
      startDate: '2024-08-20',
      endDate: '2024-11-05',
      status: 'in_progress'
    }
  },
  // Opponent teams
  'team-cv': {
    id: 'team-cv',
    name: 'Centerville High School',
    shortName: 'Centerville',
    initials: 'CV',
    avatar: '/content/images/Opponent-1-avatar.png',
    sport: {
      name: 'Boys Varsity Soccer',
      type: 'Soccer',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Soccer'
    },
    colors: {
      primary: '#5a189a', // Purple
      secondary: '#ff006e' // Pink
    },
    location: 'Centerville, NE',
    record: '9 - 4',
    athletes: [],
    schedule: []
  },
  'team-bt': {
    id: 'team-bt',
    name: 'Brownell Talbot High School',
    shortName: 'Brownell Talbot',
    initials: 'BT',
    avatar: '/content/images/Opponent-2-avatar.png',
    sport: {
      name: 'Girls Varsity Basketball',
      type: 'Basketball',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Basketball'
    },
    colors: {
      primary: '#2b7d44', // Green
      secondary: '#355e3b' // Dark Green
    },
    location: 'Omaha, NE',
    record: '7 - 6',
    athletes: [],
    schedule: []
  },
  'team-cv2': {
    id: 'team-cv2',
    name: 'College View High School',
    shortName: 'College View',
    initials: 'CV',
    avatar: '/content/images/Opponent-3-avatar.png',
    sport: {
      name: 'Girls Varsity Basketball',
      type: 'Basketball',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Basketball'
    },
    colors: {
      primary: '#ff7020', // Orange
      secondary: '#ffd400' // Yellow
    },
    location: 'Lincoln, NE',
    record: '11 - 2',
    athletes: [],
    schedule: []
  },
  'team-cn': {
    id: 'team-cn',
    name: 'Conestoga High School',
    shortName: 'Conestoga',
    initials: 'CN',
    avatar: '/content/images/Opponent-4-avatar.png',
    sport: {
      name: 'Girls Varsity Basketball',
      type: 'Basketball',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Basketball'
    },
    colors: {
      primary: '#dc0000', // Red
      secondary: '#ff0000' // Bright Red
    },
    location: 'Conestoga, NE',
    record: '5 - 8',
    athletes: [],
    schedule: []
  },
  'team-bw': {
    id: 'team-bw',
    name: 'Bellevue West High School',
    shortName: 'Bellevue West',
    initials: 'BW',
    sport: {
      name: 'Womens Varsity Soccer',
      type: 'Soccer',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Soccer'
    },
    colors: {
      primary: '#2b7d44', // Green
      secondary: '#00bfff' // Light Blue
    },
    location: 'Bellevue, NE',
    record: '8 - 4',
    athletes: [],
    schedule: []
  },
  'team-bw-basketball': {
    id: 'team-bw-basketball',
    name: 'Bellevue West High School',
    shortName: 'Bellevue West',
    initials: 'BW',
    sport: {
      name: 'Womens Varsity Basketball',
      type: 'Basketball',
      level: 'Varsity',
      gender: 'Girls',
      icon: 'Basketball'
    },
    colors: {
      primary: '#0273e3', // Blue
      secondary: '#00bfff' // Light Blue
    },
    location: 'Bellevue, NE',
    record: '6 - 7',
    athletes: [],
    schedule: []
  },
  // Event profile teams
  'team-lhs': {
    id: 'team-lhs',
    name: 'Lincoln High School',
    shortName: 'Lincoln',
    initials: 'LHS',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#0273e3', // Blue
      secondary: '#00bfff' // Light Blue
    },
    location: 'Lincoln, NE',
    record: '3 - 1',
    athletes: [],
    schedule: []
  },
  'team-oc': {
    id: 'team-oc',
    name: 'Omaha Central High School',
    shortName: 'Omaha Central',
    initials: 'OC',
    avatar: '/content/images/Opponent-5-avatar.png',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#5a189a', // Purple
      secondary: '#ff006e' // Pink
    },
    location: 'Omaha, NE',
    record: '2 - 2',
    athletes: [],
    schedule: []
  },
  'team-mnhs': {
    id: 'team-mnhs',
    name: 'Millard North High School',
    shortName: 'Millard North',
    initials: 'MNHS',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#0273e3', // Blue
      secondary: '#00bfff' // Light Blue
    },
    location: 'Omaha, NE',
    record: '4 - 0',
    athletes: [],
    schedule: []
  },
  'team-es': {
    id: 'team-es',
    name: 'Elkhorn South High School',
    shortName: 'Elkhorn South',
    initials: 'ES',
    avatar: '/content/images/Opponent-6-avatar.png',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#2b7d44', // Green
      secondary: '#355e3b' // Dark Green
    },
    location: 'Omaha, NE',
    record: '3 - 1',
    athletes: [],
    schedule: []
  },
  'team-nhs': {
    id: 'team-nhs',
    name: 'Northwestern High School',
    shortName: 'Northwestern',
    initials: 'NHS',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#dc0000', // Red
      secondary: '#ff0000' // Bright Red
    },
    location: 'Lincoln, NE',
    record: '1 - 1',
    athletes: [],
    schedule: []
  },
  'team-whs': {
    id: 'team-whs',
    name: 'Wayne High School',
    shortName: 'Wayne',
    initials: 'WHS',
    sport: {
      name: 'Boys Varsity Football',
      type: 'Football',
      level: 'Varsity',
      gender: 'Boys',
      icon: 'Football'
    },
    colors: {
      primary: '#dc0000', // Red
      secondary: '#730d26' // Maroon
    },
    location: 'Lincoln, NE',
    record: '1 - 1',
    athletes: [],
    schedule: []
  }
}
