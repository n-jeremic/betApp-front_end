export const filterPlayersData = playersArr => {
  const filteredData = [[], [], [], []]
  playersArr.forEach(originalPlayerObject => {
    const filteredObj = { ...originalPlayerObject.player }
    filteredObj.totalAssists = 0
    filteredObj.totalGoals = 0
    filteredObj.position = null
    filteredObj.games = {
      appearences: 0,
      lineups: 0
    }
    let ratingSum = 0
    let ratingSumCount = 0

    originalPlayerObject.statistics.forEach(statsObj => {
      if (statsObj.goals.total) filteredObj.totalGoals += statsObj.goals.total
      if (statsObj.goals.assists) filteredObj.totalAssists += statsObj.goals.assists
      if (!statsObj.position) filteredObj.position = statsObj.games.position
      if (statsObj.games.appearences) filteredObj.games.appearences += statsObj.games.appearences
      if (statsObj.games.lineups) filteredObj.games.lineups += statsObj.games.lineups
      if (statsObj.games.rating) {
        ratingSum += parseFloat(statsObj.games.rating)
        ratingSumCount += 1
      }
    })

    if (ratingSum) filteredObj.games.rating = (ratingSum / ratingSumCount).toFixed(2)
    else filteredObj.games.rating = 0

    let index
    const playerPosition = filteredObj.position
    if (playerPosition === 'Goalkeeper') index = 0
    else if (playerPosition === 'Defender') index = 1
    else if (playerPosition === 'Midfielder') index = 2
    else index = 3

    filteredData[index].push(filteredObj)
  })

  filteredData.forEach(playerGroup => {
    playerGroup.sort((a, b) => b.games.rating - a.games.rating)
  })

  return filteredData
}

export const filterOdds = oddsArray => {
  const filtered = [
    { matchWinner: [] },
    { goals: [] }
  ]

  oddsArray.forEach(oddObject => {
    const oddValues = oddObject.values
    const bet = oddObject.name
    if (bet === 'Goals Over/Under') {
      oddValues.forEach(oddElement => {
        if (oddElement.value === 'Under 2.5') {
          const filteredObj = {
            '0-2': oddElement.odd
          }
          filtered[1].goals[0] = filteredObj
        } else if (oddElement.value === 'Over 2.5') {
          const filteredObj = {
            '3+': oddElement.odd
          }
          filtered[1].goals[1] = filteredObj
        }
      })
    } else if (bet === 'Match Winner') {
      oddValues.forEach(oddElement => {
        const bet = oddElement.value
        const odd = oddElement.odd
        const filteredObj = {}
        filteredObj[bet] = odd
        if (bet === 'Home') {
          filtered[0].matchWinner[0] = filteredObj
        } else if (bet === 'Draw') {
          filtered[0].matchWinner[1] = filteredObj
        } else {
          filtered[0].matchWinner[2] = filteredObj
        }
      })
    } else if (bet === 'Both Teams Score') {
      const ggOddObject = oddValues.find(oddElement => oddElement.value === 'Yes')
      const filteredObj = {
        GG: ggOddObject.odd
      }
      filtered[1].goals[2] = filteredObj
    }
  })

  return filtered
}

export const saveResponseInLocalStorage = (responses, fixtureId) => {
  const ls = localStorage.getItem('availableFixtures')
  if (!ls) {
    const object = {}
    object[fixtureId] = responses
    localStorage.setItem('availableFixtures', JSON.stringify(object))
  } else {
    const parsedObject = JSON.parse(ls)
    parsedObject[fixtureId] = responses
    localStorage.setItem('availableFixtures', JSON.stringify(parsedObject))
  }
}

export const checkFixtureInLocalStorage = fixtureId => {
  const ls = localStorage.getItem('availableFixtures')
  if (!ls) return false
  const parsed = JSON.parse(ls)
  if (parsed[fixtureId]) return true
  else return false
}

export const getFixtureFromLocalStorage = fixtureId => {
  const parsed = JSON.parse(localStorage.getItem('availableFixtures'))
  return parsed[fixtureId]
}
