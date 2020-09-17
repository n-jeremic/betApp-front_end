import soccerApiAxios from '../axiosInstances/soccerApiAxios'

export const fetchLeagueFixtures = (leagueId, from, to) => {
  return soccerApiAxios({
    url: `/fixtures?league=${leagueId}&from=${from}&to=${to}`
  })
}

export const fetchLastGames = (teamId, numOfGames) => {
  return soccerApiAxios({
    url: `/fixtures?team=${teamId}&last=${numOfGames}`
  })
}

export const fetchOdds = fixtureId => {
  return soccerApiAxios({
    url: `/odds?fixture=${fixtureId}&bookmaker=6`
  })
}

export const fetchPlayers = teamId => {
  return soccerApiAxios({
    url: `/players?team=${teamId}`
  })
}

export const fetchStandings = leagueId => {
  return soccerApiAxios({
    url: `/standings?league=${leagueId}`
  })
}

export const filterResolvedPromises = responsesArray => {
  const map = []
  responsesArray.forEach(axiosObject => {
    const errors = axiosObject.data.errors
    if (Array.isArray(errors) && errors.length === 0) {
      if (axiosObject.data.response.length) {
        map.push(axiosObject.data.response)
      }
    } else {
      throw new Error()
    }
  })

  return map
}
