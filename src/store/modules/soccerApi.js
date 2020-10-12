import soccerApiAxios from '../../axiosInstances/soccerApiAxios'

const apiKeys = [
  'f71bb08779b83d2e9e48e438fc3b3b82',
  'e6b9e9b1bb5d5ce7ed09896e06b9112c',
  '876304be924da31e2c47a53933c372cb'
]

soccerApiAxios.defaults.headers['x-rapidapi-key'] = apiKeys[0]

export default {
  namespaced: true,
  state: () => ({
    activeApiKeyIndex: 0
  }),
  mutations: {
    changeActiveApiKeyIndex (state) {
      state.activeApiKeyIndex++
    }
  },
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
    },
    refreshApiKey ({ state, commit }) {
      if (state.activeApiKeyIndex === apiKeys.length - 1) return 'failed'
      commit('changeActiveApiKeyIndex')
      soccerApiAxios.defaults.headers['x-rapidapi-key'] = apiKeys[state.activeApiKeyIndex]
      return 'success'
    }
  }
}
