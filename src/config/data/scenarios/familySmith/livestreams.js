// Family Smith - Livestreams

export const livestreams = {
  'livestream-1': {
    id: 'livestream-1',
    eventId: 'event-live-1',
    videoKey: 'heroLiveFeed1',
    title: 'Lincoln North Star High School vs Bellevue West High School Mens Varsity Basketball',
    sport: {
      name: 'Mens Varsity Basketball',
      icon: 'Basketball'
    },
    status: {
      isLive: true,
      time: '02:25:53',
      score: 'W 65 - 32'
    },
    isPaidAccess: true,
    athleteAvatar: {
      athleteId: 'athlete-2',
      initials: 'ME'
    }
  },
  'livestream-2': {
    id: 'livestream-2',
    eventId: 'event-live-2',
    videoKey: 'heroLiveFeed2',
    title: 'Lincoln North Star High School vs Bellevue West High School Womens Varsity Basketball',
    sport: {
      name: 'Womens Varsity Basketball',
      icon: 'Basketball'
    },
    status: {
      isLive: true,
      time: '02:25:53',
      score: 'W 65 - 32'
    },
    isPaidAccess: false,
    athleteAvatar: {
      athleteId: 'athlete-1',
      initials: 'ME'
    }
  }
}
