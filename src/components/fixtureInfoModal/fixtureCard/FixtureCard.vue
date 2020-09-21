<template>
  <b-card no-body class="full-height" border-variant="secondary">
    <app-card-header :fixture="fixtureBasicInfo" />
    <b-card-body class="card-body-padding full-height">
      <app-teams-output :teams="fixtureBasicInfo.teams" />
      <app-tabs v-if="responseData" :tabsData="responseData" />
    </b-card-body>
  </b-card>
</template>

<script>
import CardHeader from './CardHeader.vue'
import Tabs from './Tabs.vue'
import TeamsOutput from './TeamsOutput.vue'
import {
  fetchLastGames,
  fetchOdds,
  fetchPlayers,
  fetchStandings,
  filterResolvedPromises
} from '../../../helpers/api'

export default {
  components: {
    appCardHeader: CardHeader,
    appTeamsOutput: TeamsOutput,
    appTabs: Tabs
  },
  props: {
    fixtureBasicInfo: Object
  },
  data () {
    return {
      responseData: null
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
      this.responseData = {}
      this.responseData.previousGames = {}
      this.responseData.previousGames.homeTeam = {}
      this.responseData.previousGames.homeTeam.id = this.fixtureBasicInfo.teams.home.id
      this.responseData.previousGames.homeTeam.name = this.fixtureBasicInfo.teams.home.name
      this.responseData.previousGames.awayTeam = {}
      this.responseData.previousGames.awayTeam.id = this.fixtureBasicInfo.teams.away.id
      this.responseData.previousGames.awayTeam.name = this.fixtureBasicInfo.teams.away.name
      this.responseData.players = {}

      this.responseData.previousGames.homeTeam.fixtures = responses[0]
      this.responseData.previousGames.awayTeam.fixtures = responses[1]
      this.responseData.players.homeTeam = responses[2]
      this.responseData.players.awayTeam = responses[3]
      this.responseData.odds = responses[4][0].bookmakers[0].bets
      this.responseData.standings = responses[5][0].league
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

.card-body-padding {
  padding: 1rem;
}
</style>
