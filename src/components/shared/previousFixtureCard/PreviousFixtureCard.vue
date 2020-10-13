<template>
  <b-col cols="6" class="card-container" ref="cardContainer" :style="{ height: cardHeight }">
    <b-card v-if="responseData" class="full-height" no-body>
      <app-card-header :teams="responseData.teams" :goals="responseData.goals" :closeCardFn="closeCard" />
      <b-card-body class="card-body-style">
        <app-tabs :tabsData="responseData" :teams="responseData.teams" :score="responseData.score" />
      </b-card-body>
    </b-card>
    <app-loader v-if="loadingData" :marginTop="'5rem'" :spinnerType="'border'" />
    <app-error-output
      v-if="errorMessage && !loadingData"
      :errorMessage="errorMessage"
      :fontSize="'18px'"
      :noMargin="true"
    />
  </b-col>
</template>

<script>
import CardHeader from './CardHeader.vue'
import Tabs from './Tabs.vue'
import EventBus from '../../../eventBus'
import Loader from '../../shared/Loader.vue'
import ErrorOutput from '../../shared/ErrorOutput.vue'
import { filterResolvedPromise, globalErrorHandler } from '../../../helpers/soccerApi'

export default {
  props: {
    selectedFixtureId: Number,
    cardHeight: String
  },
  components: {
    appLoader: Loader,
    appErrorOutput: ErrorOutput,
    appCardHeader: CardHeader,
    appTabs: Tabs
  },
  data () {
    return {
      loadingData: true,
      errorMessage: null,
      responseData: null
    }
  },
  methods: {
    closeCard () {
      EventBus.$emit('closePreviousGame', this.selectedFixtureId)
    },
    async getFixtureDetails () {
      try {
        const response = await this.$store.dispatch('soccerApi/fetchFixtureDetails', this.selectedFixtureId)
        this.responseData = filterResolvedPromise(response, 'object')
      } catch (err) {
        await globalErrorHandler(err, { callback: this.handlePromiseRejection }, this.getFixtureDetails)
      }
    },
    handlePromiseRejection () {
      this.errorMessage = 'Sorry, we could not load the data. Try again later.'
      window.setTimeout(() => this.closeCard(), 1500)
    }
  },
  async created () {
    await this.getFixtureDetails()
    this.loadingData = false
    await this.$nextTick()
    this.$refs.cardContainer.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.card-container {
  margin-bottom: 1rem;
}

.card-container:last-child {
  margin-bottom: 0;
}

.card-container:nth-last-child(-n+2) {
  margin-bottom: 0;
}

.full-height {
  height: 100%;
}

.card-body-style {
  padding: 0.5rem;
  height: 90%;
}

span {
  cursor: pointer;
}
</style>
