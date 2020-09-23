<template>
  <b-card no-body class="full-height" border-variant="secondary">
    <app-card-header :fixture="fixtureBasicInfo" />
    <b-card-body class="card-body-padding full-height">
      <app-teams-output :teams="fixtureBasicInfo.teams" />
      <app-tabs v-if="responseData" :tabsData="responseData" />
      <app-loader v-if="loadingData" :marginTop="'6rem'" :spinnerType="'grow'" />
    </b-card-body>
  </b-card>
</template>

<script>
import CardHeader from './CardHeader.vue'
import Tabs from './Tabs.vue'
import TeamsOutput from './TeamsOutput.vue'
import Loader from '../../shared/Loader.vue'
import {
  fetchGames,
  fetchOdds,
  fetchPlayers,
  fetchStandings,
  filterResolvedPromises
} from '../../../helpers/api'

export default {
  components: {
    appCardHeader: CardHeader,
    appTeamsOutput: TeamsOutput,
    appTabs: Tabs,
    appLoader: Loader
  },
  props: {
    fixtureBasicInfo: Object
  },
  data () {
    return {
      responseData: null,
      loadingData: false
    }
  },
  methods: {
    async getAllData () {
      try {
        const homeTeam = this.fixtureBasicInfo.teams.home
        const awayTeam = this.fixtureBasicInfo.teams.away
        const responses = await Promise.all([
          fetchGames(homeTeam.id, 'last', 10),
          fetchGames(awayTeam.id, 'last', 10),
          fetchGames(homeTeam.id, 'next', 10),
          fetchGames(awayTeam.id, 'next', 10),
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
      this.assignGamesToResponseData('previousGames', { homeTeam: responses[0], awayTeam: responses[1] })
      this.assignGamesToResponseData('nextGames', { homeTeam: responses[2], awayTeam: responses[3] })

      this.responseData.players = {}
      this.responseData.players.homeTeam = responses[4]
      this.responseData.players.awayTeam = responses[5]
      this.responseData.odds = responses[6][0].bookmakers[0].bets
      this.responseData.standings = responses[7][0].league
      this.responseData.standings.teamIds = [this.fixtureBasicInfo.teams.home.id, this.fixtureBasicInfo.teams.away.id]
    },
    assignGamesToResponseData (type, responseObj) {
      this.responseData[type] = {}
      this.responseData[type].currentFixtureId = this.fixtureBasicInfo.fixture.id
      this.responseData[type].homeTeam = {}
      this.responseData[type].homeTeam.id = this.fixtureBasicInfo.teams.home.id
      this.responseData[type].homeTeam.name = this.fixtureBasicInfo.teams.home.name
      this.responseData[type].awayTeam = {}
      this.responseData[type].awayTeam.id = this.fixtureBasicInfo.teams.away.id
      this.responseData[type].awayTeam.name = this.fixtureBasicInfo.teams.away.name
      this.responseData[type].homeTeam.fixtures = responseObj.homeTeam
      this.responseData[type].awayTeam.fixtures = responseObj.awayTeam
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
    if (!this.checkFixtureInLocalStorage()) {
      this.loadingData = true
      await this.getAllData()
      this.loadingData = false
    } else {
      this.assignResponseData(this.getFixtureFromLocalStorage())
    }
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}

.card-body-padding {
  padding: 1rem 0.5rem;
}
</style>
