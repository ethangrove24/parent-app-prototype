// Family Smith - Teams

export const teams = {
  'team-1': {
    id: 'team-1',
    name: 'Lincoln North Star High School',
    shortName: 'Lincoln North Star',
    initials: 'LNS',
    avatar: '/content/images/team-1-avatar.png',
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
    athletes: ['athlete-1', 'athlete-2'],
    schedule: ['event-r1', 'event-r2', 'event-live-2']
  },
  'team-2': {
    id: 'team-2',
    name: 'Wayne High School',
    shortName: 'Wayne',
    initials: 'WH',
    avatar: '/content/images/team-2-avatar.png',
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
    schedule: ['event-1', 'event-2', 'event-3']
  },
  'team-3': {
    id: 'team-3',
    name: 'Lincoln North Star High School',
    shortName: 'Lincoln North Star',
    initials: 'LNS',
    avatar: '/content/images/team-1-avatar.png', // Same as team-1
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
    schedule: ['event-live-1']
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
