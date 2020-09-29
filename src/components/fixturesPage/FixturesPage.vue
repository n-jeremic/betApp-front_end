<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="3">
          <app-current-date/>
        </b-col>
        <b-col cols="6" class="text-center">
          <app-periods-list
            v-if="activePeriodIndex !== null"
            :periods="$options.nrData.periods"
            :activePeriodIndex="activePeriodIndex"
            @selectedPeriodChanged="handleSelectedPeriodChange"
          />
        </b-col>
        <b-col cols="3">
          <app-calendar
            :selectedDate="selectedDate"
            @input="handleCalendarInputEvent"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container
      v-if="fixturesData"
      class="fixtures-output"
      fluid
    >
      <app-league-fixtures
        v-for="(leagueFixtures, index) in fixturesData"
        :key="index"
        :fixtures="leagueFixtures"
        :listInitiallyOpen="index === 0 ? true : false"
      />
    </b-container>
    <app-error-output
      v-if="errorMessage && !loadingData"
      :errorMessage="errorMessage"
      :fontSize="'20px'"
    />
    <app-loader v-if="loadingData" :marginTop="'3rem'" :spinnerType="'border'" />
  </div>
</template>

<script>
import LeagueFixtures from './leagues/LeagueFixtures.vue'
import CurrentDate from './pageHeader/CurrentDate.vue'
import Calendar from './pageHeader/Calendar.vue'
import PeriodsList from './pageHeader/PeriodsList.vue'
import ErrorOutput from '../shared/ErrorOutput.vue'
import Loader from '../shared/Loader.vue'
import { generateDateString, generatePeriods, sortFixturesByDate, filterMockedResponses } from '../../helpers/fixturesPage'
import { fetchLeagueFixtures, filterResolvedPromises } from '../../helpers/api'
import appLeagues from '../../appLeagues.json'
import mockData from '../../../mockdata/leagueFixturesMock.json'

export default {
  components: {
    appLeagueFixtures: LeagueFixtures,
    appCurrentDate: CurrentDate,
    appCalendar: Calendar,
    appPeriodsList: PeriodsList,
    appErrorOutput: ErrorOutput,
    appLoader: Loader
  },
  data () {
    return {
      selectedDate: null,
      activeDate: generateDateString(new Date()),
      activePeriodIndex: 0,
      fixturesData: null,
      errorMessage: null,
      loadingData: false,
      sidebarOpened: false
    }
  },
  nrData: {
    periodsCount: 3,
    periods: null,
    todayDate: generateDateString(new Date())
  },
  methods: {
    handleCalendarInputEvent (inputValue) {
      if (inputValue !== this.activeDate) {
        this.activeDate = inputValue
        this.selectedDate = inputValue
        if (inputValue !== this.$options.nrData.todayDate) {
          this.activePeriodIndex = null
        } else {
          this.activePeriodIndex = 0
        }
        this.getFixturesData()
      }
    },
    handleSelectedPeriodChange (selectedPeriodIndex) {
      this.activePeriodIndex = selectedPeriodIndex
      this.getFixturesData()
    },
    createPromisesArray () {
      let requiredPeriod
      if (this.activePeriodIndex !== null) {
        requiredPeriod = this.$options.nrData.periods[this.activePeriodIndex]
      }

      return appLeagues.map(league => {
        const from = requiredPeriod ? requiredPeriod.from : this.selectedDate
        const to = requiredPeriod ? requiredPeriod.to : this.selectedDate
        return fetchLeagueFixtures(league.id, from, to)
      })
    },
    async getFixturesData () {
      this.initRequest()
      try {
        const resolvedPromises = await Promise.all(this.createPromisesArray())
        const filteredResponses = filterResolvedPromises(resolvedPromises)
        if (filteredResponses.length) {
          this.fixturesData = sortFixturesByDate(filteredResponses)
          this.loadingData = false
        } else {
          this.handleError('No games found for this date.')
        }
      } catch (err) {
        this.handleError('Sorry, we could not load the data. Try again later.')
      }
    },
    getFixturesMockData () {
      const filteredResponses = filterMockedResponses(mockData)
      this.fixturesData = sortFixturesByDate(filteredResponses)
      this.loadingData = false
    },
    initRequest () {
      this.loadingData = true
      this.fixturesData = null
      if (this.errorMessage) this.errorMessage = null
    },
    handleError (message) {
      this.errorMessage = message
      this.loadingData = false
    }
  },
  async created () {
    const nrDataObject = this.$options.nrData
    nrDataObject.periods = generatePeriods(nrDataObject.periodsCount)
    // await this.getFixturesData()
    this.getFixturesMockData()
  }
}
</script>

<style scoped>
.col-3 {
  padding: 0
}

.fixtures-output {
  padding: 0;
  margin-top: 2rem;
  max-height: 85vh;
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.fixtures-output::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.fixtures-output {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
