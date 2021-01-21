import soccerApiAxios from '../../axiosInstances/soccerApiAxios'

export default {
  namespaced: true,
  actions: {
    fetchLeagueFixtures (context, payload) {
      return soccerApiAxios({
        url: `/fixtures?league=${payload.leagueId}&from=${payload.from}&to=${payload.to}&season=2020`
      })
    },
    fetchGames (context, payload) {
      return soccerApiAxios({
        url: `/fixtures?team=${payload.teamId}&${payload.type}=${payload.numOfGames}&season=2020`
      })
    },
    fetchOdds (context, fixtureId) {
      return soccerApiAxios({
        url: `/odds?fixture=${fixtureId}&bookmaker=6`
      })
    },
    fetchPlayers (context, payload) {
      return soccerApiAxios({
        url: `/players?team=${payload.teamId}&page=${payload.pageNumber}&season=2020`
      })
    },
    fetchStandings (context, leagueId) {
      return soccerApiAxios({
        url: `/standings?league=${leagueId}&season=2020`
      })
    },
    fetchFixtureDetails (context, fixtureId) {
      return soccerApiAxios({
        url: `/fixtures?id=${fixtureId}`
      })
    }
  }
}
