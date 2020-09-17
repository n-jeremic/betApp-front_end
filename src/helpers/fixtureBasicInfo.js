const possibleStatuses = {
  onGoingFixtureStatuses: [
    'First Half, Kick Off',
    'Halftime',
    'Second Half',
    'Extra Time',
    'Penalty In Progress',
    'Break Time'
  ],
  warningFixtureStatuses: [
    'Match Suspended',
    'Match Interrupted',
    'Match Postponed',
    'WalkOver',
    'Match Cancelled',
    'Match Abandoned',
    'Technical Loss'
  ],
  finishedFixtureStatuses: [
    'Match Finished',
    'Match Finished After Extra Time',
    'Match Finished After Penalty'
  ]
}

export const generateFixtureTimeString = fixtureObj => {
  const fixtureDate = new Date(fixtureObj.fixture.date)

  const dateString = fixtureDate.toDateString()
  const dateArray = dateString.split(' ')
  const dateOutput = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]}`

  const timeString = fixtureDate.toTimeString()
  const timeArray = timeString.split(':')
  const timeOutput = `${timeArray[0]}:${timeArray[1]}`

  return `${dateOutput} at ${timeOutput}`
}

export const generateFixtureRoundString = fixtureObj => {
  const roundString = fixtureObj.league.round
  return `Round ${roundString[roundString.length - 1]}`
}

export const generateFixtureTitle = fixtureObj => {
  const originalStatus = fixtureObj.fixture.status.long
  if (originalStatus !== 'Not Started') {
    if (generateFixtureStatus(fixtureObj) === 'onGoing') {
      return 'Playing Now'
    } else {
      return originalStatus
    }
  } else {
    return ''
  }
}

export const generateFixtureStatus = fixtureObj => {
  const originalStatus = fixtureObj.fixture.status.long

  if (possibleStatuses.warningFixtureStatuses.includes(originalStatus)) return 'warning'
  else if (possibleStatuses.onGoingFixtureStatuses.includes(originalStatus)) return 'onGoing'
  else if (possibleStatuses.finishedFixtureStatuses.includes(originalStatus)) return 'finished'
  else return originalStatus
}
