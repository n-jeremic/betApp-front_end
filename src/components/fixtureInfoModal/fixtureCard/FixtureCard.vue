<template>
  <b-card class="full-height">
    <template v-slot:header>
      <h5>test card</h5>
    </template>
  </b-card>
</template>

<script>
import {
  fetchLastGames,
  fetchOdds,
  fetchPlayers,
  fetchStandings,
  filterResolvedPromises
} from '../../../helpers/api'

export default {
  props: {
    fixtureBasicInfo: Object
  },
  data () {
    return {
      fixtureOdds: null,
      previousFixtures: {
        homeTeam: null,
        awayTeam: null
      },
      players: {
        homeTeam: null,
        awayTeam: null
      },
      leagueStandings: null
    }
  },
  methods: {
    async getAllData () {
      try {
        const homeTeam = this.fixtureBasicInfo.teams.home
        const awayTeam = this.fixtureBasicInfo.teams.away
        const responses = await Promise.all([
          fetchLastGames(homeTeam.id, 10),
          fetchLastGames(awayTeam.id, 10),
          fetchPlayers(homeTeam.id),
          fetchPlayers(awayTeam.id),
          fetchOdds(this.fixtureBasicInfo.fixture.id),
          fetchStandings(this.fixtureBasicInfo.league.id)
        ])

        const filteredResponses = filterResolvedPromises(responses)
        this.saveResponseInLocalStorage(filteredResponses)
        this.assignResponseData(filteredResponses)
      } catch (err) {
        console.log(err)
      }
    },
    assignResponseData (responses) {
      this.previousFixtures.homeTeam = responses[0]
      this.previousFixtures.awayTeam = responses[1]
      this.players.homeTeam = responses[2]
      this.players.awayTeam = responses[3]
      this.fixtureOdds = responses[4][0].bookmakers[0].bets
      this.leagueStandings = responses[5][0].league
    },
    saveResponseInLocalStorage (responses) {
      const ls = localStorage.getItem('availableFixtures')
      const fixtureId = this.fixtureBasicInfo.fixture.id
      if (!ls) {
        const object = {}
        object[fixtureId] = responses
        localStorage.setItem('availableFixtures', JSON.stringify(object))
      } else {
        const parsedObject = JSON.parse(ls)
        parsedObject[fixtureId] = responses
        localStorage.setItem('availableFixtures', JSON.stringify(parsedObject))
      }
    },
    checkFixtureInLocalStorage () {
      const ls = localStorage.getItem('availableFixtures')
      if (!ls) return false
      const parsed = JSON.parse(ls)
      if (parsed[this.fixtureBasicInfo.fixture.id]) return true
      else return false
    },
    getFixtureFromLocalStorage () {
      const parsed = JSON.parse(localStorage.getItem('availableFixtures'))
      return parsed[this.fixtureBasicInfo.fixture.id]
    }
  },
  async created () {
    if (!this.checkFixtureInLocalStorage()) await this.getAllData()
    else this.assignResponseData(this.getFixtureFromLocalStorage())
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
