<template>
  <b-card no-body class="full-height" border-variant="secondary">
    <app-card-header :fixture="fixtureBasicInfo" :closeModalFn="closeModalFn" />
    <b-card-body class="card-body-padding full-height">
      <app-teams-output :teams="fixtureBasicInfo.teams" />
      <app-tabs v-if="responseData" :tabsData="responseData" />
      <app-loader v-if="loadingData" :marginTop="'6rem'" :spinnerType="'border'" />
      <app-error-output
        v-if="errorMessage && !loadingData"
        :errorMessage="errorMessage"
        :fontSize="'18px'"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import CardHeader from './CardHeader.vue'
import Tabs from './Tabs.vue'
import TeamsOutput from './TeamsOutput.vue'
import Loader from '../../shared/Loader.vue'
import ErrorOutput from '../../shared/ErrorOutput.vue'
import { filterResolvedPromise, globalErrorHandler } from '../../../helpers/api'
import {
  filterPlayersData,
  filterOdds,
  saveResponseInLocalStorage,
  checkFixtureInLocalStorage,
  getFixtureFromLocalStorage
} from '../../../helpers/fixtureInfoModal'

export default {
  components: {
    appCardHeader: CardHeader,
    appTeamsOutput: TeamsOutput,
    appTabs: Tabs,
    appLoader: Loader,
    appErrorOutput: ErrorOutput
  },
  props: {
    fixtureBasicInfo: Object,
    closeModalFn: Function
  },
  data () {
    return {
      responseData: null,
      loadingData: false,
      errorMessage: null
    }
  },
  methods: {
    async getAllData () {
      try {
        const basicInfoObjRef = this.fixtureBasicInfo
        const homeTeam = basicInfoObjRef.teams.home
        const awayTeam = basicInfoObjRef.teams.away
        const responses = await Promise.all([
          this.$store.dispatch('soccerApi/fetchGames', { teamId: homeTeam.id, type: 'last', numOfGames: 10 }),
          this.$store.dispatch('soccerApi/fetchGames', { teamId: awayTeam.id, type: 'last', numOfGames: 10 }),
          this.$store.dispatch('soccerApi/fetchGames', { teamId: homeTeam.id, type: 'next', numOfGames: 10 }),
          this.$store.dispatch('soccerApi/fetchGames', { teamId: awayTeam.id, type: 'next', numOfGames: 10 }),
          this.$store.dispatch('soccerApi/fetchPlayers', { teamId: homeTeam.id, pageNumber: 1 }),
          this.$store.dispatch('soccerApi/fetchPlayers', { teamId: homeTeam.id, pageNumber: 2 }),
          this.$store.dispatch('soccerApi/fetchPlayers', { teamId: awayTeam.id, pageNumber: 1 }),
          this.$store.dispatch('soccerApi/fetchPlayers', { teamId: awayTeam.id, pageNumber: 2 }),
          this.$store.dispatch('soccerApi/fetchOdds', basicInfoObjRef.fixture.id),
          this.$store.dispatch('soccerApi/fetchStandings', basicInfoObjRef.league.id)
        ])
        const filteredResponses = filterResolvedPromise(responses, 'array')
        saveResponseInLocalStorage(filteredResponses, basicInfoObjRef.fixture.id)
        this.assignResponseData(filteredResponses)
      } catch (err) {
        await globalErrorHandler(err, { callback: this.handlePromiseRejection }, this.getAllData)
      }
    },
    handlePromiseRejection () {
      this.errorMessage = 'Sorry, we could not load the data. Try again later.'
    },
    assignResponseData (responses) {
      this.responseData = {}
      const responseDataObjRef = this.responseData
      const basicInfoObjRef = this.fixtureBasicInfo

      this.assignGamesToResponseData(
        'previousGames',
        { homeTeam: responses[0], awayTeam: responses[1] },
        responseDataObjRef,
        basicInfoObjRef
      )
      this.assignGamesToResponseData(
        'nextGames',
        { homeTeam: responses[2], awayTeam: responses[3] },
        responseDataObjRef,
        basicInfoObjRef
      )
      this.assignPlayersToResponseData(
        responses[4].concat(responses[5]),
        responses[6].concat(responses[7]),
        responseDataObjRef,
        basicInfoObjRef
      )
      this.assignStandingsToResponseData(responses[9][0].league, responseDataObjRef, basicInfoObjRef)
      responseDataObjRef.odds = filterOdds(responses[8][0].bookmakers[0].bets)
    },
    assignGamesToResponseData (gamesType, apiResponseObj, responseDataObjRef, basicInfoObjRef) {
      responseDataObjRef[gamesType] = {}
      const gamesObjRef = this.responseData[gamesType]

      gamesObjRef.currentFixtureId = basicInfoObjRef.fixture.id
      gamesObjRef.homeTeam = {}
      gamesObjRef.homeTeam.id = basicInfoObjRef.teams.home.id
      gamesObjRef.homeTeam.name = basicInfoObjRef.teams.home.name
      gamesObjRef.awayTeam = {}
      gamesObjRef.awayTeam.id = basicInfoObjRef.teams.away.id
      gamesObjRef.awayTeam.name = basicInfoObjRef.teams.away.name
      gamesObjRef.homeTeam.fixtures = apiResponseObj.homeTeam
      gamesObjRef.awayTeam.fixtures = apiResponseObj.awayTeam
    },
    assignPlayersToResponseData (homeTeamPlayersArr, awayTeamPlayersArr, responseDataObjRef, basicInfoObjRef) {
      responseDataObjRef.players = {}
      responseDataObjRef.players.teams = basicInfoObjRef.teams
      responseDataObjRef.players.homeTeam = filterPlayersData(homeTeamPlayersArr)
      responseDataObjRef.players.awayTeam = filterPlayersData(awayTeamPlayersArr)
    },
    assignStandingsToResponseData (standingsData, responseDataObjRef, basicInfoObjRef) {
      responseDataObjRef.standings = standingsData
      responseDataObjRef.standings.teamIds = [basicInfoObjRef.teams.home.id, basicInfoObjRef.teams.away.id]
    }
  },
  async created () {
    const fixtureId = this.fixtureBasicInfo.fixture.id
    if (!checkFixtureInLocalStorage(fixtureId)) {
      this.loadingData = true
      await this.getAllData()
      this.loadingData = false
    } else {
      this.assignResponseData(getFixtureFromLocalStorage(fixtureId))
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
