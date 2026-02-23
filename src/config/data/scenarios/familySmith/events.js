// Family Smith - Events

export const events = {
  'event-1': {
    id: 'event-1',
    status: 'past',
    date: {
      iso: '2026-01-30',
      weekday: 'Mon',
      day: '30',
      month: 'Jan',
      year: '2026'
    },
    time: null,
    type: 'Boys Varsity Soccer',
    sport: 'Soccer',
    homeTeam: {
      teamId: 'team-2',
      score: 0,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-cv',
      score: 7,
      isWinner: true
    },
    location: 'Wayne High School',
    hasTickets: false,
    athletes: ['athlete-3'],
    recap: 'Centerville dominated the match with a strong offensive performance, securing a 7-0 victory against Wayne. The away team controlled possession and created numerous scoring opportunities throughout the game.',
    highlights: [
      'Centerville scored 4 goals in the first half',
      'Wayne struggled to maintain possession',
      'Strong defensive performance from Centerville'
    ],
    stats: {
      homeTeam: {
        shots: 8,
        shotsOnGoal: 3,
        possession: '35%',
        corners: 4
      },
      awayTeam: {
        shots: 18,
        shotsOnGoal: 12,
        possession: '65%',
        corners: 9
      }
    },
    videos: {
      livestream: null,
      fullGame: 'eventFullGame',
      highlights: ['playlistHighlight1']
    }
  },
  'event-2': {
    id: 'event-2',
    status: 'live',
    date: {
      iso: '2026-01-31',
      weekday: 'Tue',
      day: '31',
      month: 'Jan',
      year: '2026'
    },
    time: '7:00 PM',
    type: 'Boys Varsity Soccer',
    sport: 'Soccer',
    homeTeam: {
      teamId: 'team-2',
      score: 2,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-cv',
      score: 3,
      isWinner: false
    },
    location: 'Wayne High School',
    hasTickets: true,
    athletes: ['athlete-3'],
    quarter: '2nd Half',
    timeRemaining: '12:34',
    recentPlays: [
      { time: '12:34', quarter: '2nd Half', description: 'CV - Goal from outside the box' },
      { time: '18:45', quarter: '2nd Half', description: 'WH - Corner kick saved by goalkeeper' },
      { time: '22:11', quarter: '2nd Half', description: 'WH - Goal on counter attack' }
    ],
    stats: {
      homeTeam: {
        shots: 11,
        shotsOnGoal: 6,
        possession: '48%',
        corners: 5
      },
      awayTeam: {
        shots: 14,
        shotsOnGoal: 9,
        possession: '52%',
        corners: 7
      }
    },
    videos: {
      livestream: 'heroLiveFeed1',
      fullGame: null,
      highlights: []
    }
  },
  'event-3': {
    id: 'event-3',
    status: 'upcoming',
    date: {
      iso: '2026-02-01',
      weekday: 'Wed',
      day: '1',
      month: 'Feb',
      year: '2026'
    },
    time: '12:59PM',
    type: 'Boys Varsity Soccer',
    sport: 'Soccer',
    homeTeam: {
      teamId: 'team-2',
      score: null,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-cv',
      score: null,
      isWinner: false
    },
    location: 'Wayne High School',
    hasTickets: false,
    athletes: ['athlete-3'],
    preview: 'Wayne looks to bounce back after recent losses against Centerville. This matchup will be crucial for Wayne\'s playoff positioning. Both teams feature strong attacking players and this should be an exciting game.',
    keyMatchups: [
      'Wayne midfield vs Centerville defense',
      'Battle for possession in the center',
      'Set piece opportunities'
    ],
    seasonStats: {
      homeTeam: {
        avgGoalsScored: 2.1,
        avgGoalsAllowed: 2.8,
        possession: '47%'
      },
      awayTeam: {
        avgGoalsScored: 3.2,
        avgGoalsAllowed: 1.5,
        possession: '58%'
      }
    },
    videos: {
      livestream: null,
      fullGame: null,
      highlights: []
    }
  },
  'event-r1': {
    id: 'event-r1',
    status: 'past',
    date: {
      iso: '2026-01-13',
      weekday: 'Tue',
      day: '13',
      month: 'Jan',
      year: '2026'
    },
    time: null,
    type: 'Girls Varsity Basketball',
    sport: 'Basketball',
    homeTeam: {
      teamId: 'team-bt',
      score: 0,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-cv2',
      score: 7,
      isWinner: true
    },
    location: 'Brownell Talbot High School',
    hasTickets: false,
    athletes: ['athlete-1', 'athlete-2'],
    recap: 'College View dominated with a strong defensive performance, holding Brownell Talbot scoreless in a decisive 7-0 victory. The away team controlled the tempo throughout the game.',
    highlights: [
      'College View: Shutout performance',
      'Brownell Talbot struggled on offense',
      'Dominant rebounding by College View'
    ],
    stats: {
      homeTeam: {
        fieldGoals: '12/45',
        threePointers: '0/12',
        freeThrows: '4/8',
        rebounds: 28
      },
      awayTeam: {
        fieldGoals: '28/58',
        threePointers: '8/18',
        freeThrows: '12/15',
        rebounds: 42
      }
    },
    videos: {
      livestream: null,
      fullGame: 'pastGame1',
      highlights: []
    }
  },
  'event-r2': {
    id: 'event-r2',
    status: 'past',
    date: {
      iso: '2026-01-13',
      weekday: 'Tue',
      day: '13',
      month: 'Jan',
      year: '2026'
    },
    time: null,
    type: 'Girls Varsity Basketball',
    sport: 'Basketball',
    homeTeam: {
      teamId: 'team-cn',
      score: 0,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-bt',
      score: 7,
      isWinner: true
    },
    location: 'Conestoga High School',
    hasTickets: false,
    athletes: ['athlete-1', 'athlete-2'],
    recap: 'Brownell Talbot secured a decisive 7-0 road victory over Conestoga with excellent team play and strong shooting performance.',
    highlights: [
      'Brownell Talbot: 7 three-pointers made',
      'Strong defensive pressure throughout',
      'Conestoga struggled with turnovers'
    ],
    stats: {
      homeTeam: {
        fieldGoals: '10/42',
        threePointers: '2/15',
        freeThrows: '6/10',
        rebounds: 25
      },
      awayTeam: {
        fieldGoals: '25/52',
        threePointers: '7/16',
        freeThrows: '10/12',
        rebounds: 38
      }
    },
    videos: {
      livestream: null,
      fullGame: 'pastGame2',
      highlights: []
    }
  },
  // Event profile page examples
  'event-profile-1': {
    id: 'event-profile-1',
    status: 'live',
    date: {
      iso: '2026-02-18',
      weekday: 'Wed',
      day: '18',
      month: 'Feb',
      year: '2026'
    },
    time: '7:00 PM',
    type: 'Boys Varsity Football',
    sport: 'Football',
    homeTeam: {
      teamId: 'team-lhs',
      score: 28,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-oc',
      score: 21,
      isWinner: false
    },
    location: 'Lincoln Stadium',
    hasTickets: false,
    athletes: ['athlete-1', 'athlete-2', 'athlete-3'],
    quarter: 'Q3',
    timeRemaining: '8:45',
    recentPlays: [
      { time: '8:45', quarter: 'Q3', description: 'LHS - Touchdown, 15-yard pass from Johnson to Williams' },
      { time: '10:22', quarter: 'Q3', description: 'OC - Field Goal, 32 yards' },
      { time: '2:13', quarter: 'Q2', description: 'LHS - Touchdown, 42-yard run by Davis' }
    ],
    stats: {
      homeTeam: {
        totalYards: 342,
        passingYards: 218,
        rushingYards: 124,
        turnovers: 1
      },
      awayTeam: {
        totalYards: 298,
        passingYards: 175,
        rushingYards: 123,
        turnovers: 2
      }
    },
    videos: {
      livestream: 'eventFullGame',
      fullGame: null,
      highlights: []
    }
  },
  'event-profile-2': {
    id: 'event-profile-2',
    status: 'upcoming',
    date: {
      iso: '2026-02-22',
      weekday: 'Sat',
      day: '22',
      month: 'Feb',
      year: '2026'
    },
    time: '6:30 PM',
    type: 'Boys Varsity Football',
    sport: 'Football',
    homeTeam: {
      teamId: 'team-mnhs',
      score: null,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-es',
      score: null,
      isWinner: false
    },
    location: 'Millard North Stadium',
    hasTickets: false,
    athletes: ['athlete-2', 'athlete-3'],
    preview: 'Top-ranked Millard North faces their toughest test yet against Elkhorn South in what promises to be a defensive battle. Both teams feature strong defensive lines and this matchup will likely come down to turnovers and special teams play.',
    keyMatchups: [
      'Millard North QB vs Elkhorn South Secondary',
      'Elkhorn South RB vs Millard North D-Line',
      'Battle of the Trenches - Offensive Lines'
    ],
    seasonStats: {
      homeTeam: {
        avgPointsScored: 35.8,
        avgPointsAllowed: 14.2,
        totalYardsPerGame: 412
      },
      awayTeam: {
        avgPointsScored: 28.5,
        avgPointsAllowed: 21.3,
        totalYardsPerGame: 368
      }
    },
    videos: {
      livestream: null,
      fullGame: null,
      highlights: []
    }
  },
  'event-profile-3': {
    id: 'event-profile-3',
    status: 'past',
    date: {
      iso: '2026-01-05',
      weekday: 'Mon',
      day: '5',
      month: 'Jan',
      year: '2026'
    },
    time: null,
    type: 'Boys Varsity Football',
    sport: 'Football',
    homeTeam: {
      teamId: 'team-nhs',
      score: 47,
      isWinner: true
    },
    awayTeam: {
      teamId: 'team-whs',
      score: 24,
      isWinner: false
    },
    location: 'Northwestern Stadium',
    hasTickets: false,
    athletes: ['athlete-1', 'athlete-2'],
    recap: 'Northwestern dominated in a high-scoring affair, putting up 47 points behind a stellar offensive performance. The defense forced 3 turnovers and never let Wayne get into a rhythm. QB Marcus Thompson threw for 324 yards and 4 touchdowns, while RB James Wilson added 188 yards on the ground with 2 rushing TDs.',
    highlights: [
      'Marcus Thompson: 324 passing yards, 4 TDs',
      'James Wilson: 188 rushing yards, 2 TDs',
      '3 forced turnovers by Northwestern defense',
      'Northwestern controlled time of possession 38:12 to 21:48'
    ],
    stats: {
      homeTeam: {
        totalYards: 512,
        passingYards: 324,
        rushingYards: 188,
        turnovers: 0
      },
      awayTeam: {
        totalYards: 356,
        passingYards: 198,
        rushingYards: 158,
        turnovers: 3
      }
    },
    videos: {
      livestream: null,
      fullGame: 'eventFullGame',
      highlights: ['playlistHighlight1']
    }
  },
  'event-live-1': {
    id: 'event-live-1',
    status: 'live',
    date: {
      iso: '2026-02-21',
      weekday: 'Fri',
      day: '21',
      month: 'Feb',
      year: '2026'
    },
    time: '7:00 PM',
    type: 'Womens Varsity Soccer',
    sport: 'Soccer',
    homeTeam: {
      teamId: 'team-3',
      score: 2,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-bw',
      score: 1,
      isWinner: false
    },
    location: 'Lincoln North Star High School',
    hasTickets: true,
    athletes: ['athlete-1'],
    quarter: '2nd Half',
    timeRemaining: '25:53',
    recentPlays: [
      {
        time: '65:07',
        quarter: '2nd Half',
        description: 'Goal - Lincoln North Star #12 (assist by #7)'
      },
      {
        time: '58:32',
        quarter: '2nd Half',
        description: 'Yellow card - Bellevue West #15'
      },
      {
        time: '52:18',
        quarter: '2nd Half',
        description: 'Corner kick - Lincoln North Star'
      },
      {
        time: '48:05',
        quarter: '2nd Half',
        description: 'Goal - Bellevue West #9'
      }
    ],
    stats: {
      homeTeam: {
        totalYards: 0,
        passingYards: 0,
        rushingYards: 0,
        turnovers: 0,
        shots: 12,
        shotsOnGoal: 7,
        cornerKicks: 5,
        fouls: 8
      },
      awayTeam: {
        totalYards: 0,
        passingYards: 0,
        rushingYards: 0,
        turnovers: 0,
        shots: 9,
        shotsOnGoal: 4,
        cornerKicks: 3,
        fouls: 11
      }
    },
    videos: {
      livestream: 'heroLiveFeed1',
      fullGame: null,
      highlights: []
    }
  },
  'event-live-2': {
    id: 'event-live-2',
    status: 'live',
    date: {
      iso: '2026-02-21',
      weekday: 'Fri',
      day: '21',
      month: 'Feb',
      year: '2026'
    },
    time: '7:30 PM',
    type: 'Girls Varsity Basketball',
    sport: 'Basketball',
    homeTeam: {
      teamId: 'team-1',
      score: 65,
      isWinner: false
    },
    awayTeam: {
      teamId: 'team-bw-basketball',
      score: 32,
      isWinner: false
    },
    location: 'Lincoln North Star High School',
    hasTickets: false,
    athletes: ['athlete-1', 'athlete-2'],
    quarter: 'Q3',
    timeRemaining: '4:32',
    recentPlays: [
      {
        time: '3:28',
        quarter: 'Q3',
        description: '3-pointer by Lincoln North Star #12'
      },
      {
        time: '4:15',
        quarter: 'Q3',
        description: 'Layup by Lincoln North Star #7'
      },
      {
        time: '5:02',
        quarter: 'Q3',
        description: 'Free throw made by Bellevue West #9'
      },
      {
        time: '5:45',
        quarter: 'Q3',
        description: 'Steal and fast break by Lincoln North Star #12'
      }
    ],
    stats: {
      homeTeam: {
        totalYards: 0,
        passingYards: 0,
        rushingYards: 0,
        turnovers: 0,
        fieldGoals: '24/48',
        threePointers: '9/22',
        freeThrows: '8/10',
        rebounds: 28
      },
      awayTeam: {
        totalYards: 0,
        passingYards: 0,
        rushingYards: 0,
        turnovers: 0,
        fieldGoals: '12/42',
        threePointers: '4/18',
        freeThrows: '4/8',
        rebounds: 21
      }
    },
    videos: {
      livestream: 'heroLiveFeed2',
      fullGame: null,
      highlights: []
    }
  }
}
