// Family Smith - Users (Parent & Athletes)

export const parent = {
  id: 'parent-1',
  firstName: 'Kelly',
  lastName: 'Taylor',
  initials: 'KT',
  avatar: null,
  athletes: ['athlete-3']
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
    firstName: 'Arthur',
    lastName: 'Taylor',
    initials: 'AT',
    avatar: null,
    parentId: 'parent-1',
    teams: ['team-2'],
    graduationYear: 2031,
    jerseyNumber: '29',
    position: 'Midfielder'
  }
}
