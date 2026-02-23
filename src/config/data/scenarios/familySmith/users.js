// Family Smith - Users (Parent & Athletes)

export const parent = {
  id: 'parent-1',
  firstName: 'Parent',
  lastName: 'Smith',
  initials: 'PS',
  avatar: '/content/images/parent-avatar.png',
  athletes: ['athlete-1', 'athlete-2', 'athlete-3']
}

export const athletes = {
  'athlete-1': {
    id: 'athlete-1',
    firstName: 'Jessica',
    lastName: 'Smith',
    initials: 'JD',
    avatar: '/content/images/athlete1-avatar.png',
    parentId: 'parent-1',
    teams: ['team-1'],
    graduationYear: 2027
  },
  'athlete-2': {
    id: 'athlete-2',
    firstName: 'Jaime',
    lastName: 'Smith',
    initials: 'JJ',
    //avatar: '/content/images/athlete1-avatar.png', // Using athlete1 avatar as placeholder
    parentId: 'parent-1',
    teams: ['team-1'],
    graduationYear: 2027
  },
  'athlete-3': {
    id: 'athlete-3',
    firstName: 'Tommy',
    lastName: 'Smith',
    initials: 'TJ',
    avatar: '/content/images/athlete3-avatar.png',
    parentId: 'parent-1',
    teams: ['team-2'],
    graduationYear: 2028
  }
}
