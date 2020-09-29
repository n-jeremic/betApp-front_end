<template>
  <b-col cols="6" class="card-container">
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
import { fetchFixtureDetails } from '../../../helpers/api'

export default {
  props: {
    selectedFixtureId: Number
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
        const axiosResponse = await fetchFixtureDetails(this.selectedFixtureId)
        const errors = axiosResponse.data.errors
        if (Array.isArray(errors) && errors.length === 0) {
          this.responseData = axiosResponse.data.response[0]
        } else {
          throw new Error()
        }
      } catch (err) {
        this.handlePromiseError()
      }
    },
    handlePromiseError () {
      this.errorMessage = 'Sorry, we could not load the data. Try again later.'
      window.setTimeout(() => this.closeCard(), 1500)
    }
  },
  async created () {
    await this.getFixtureDetails()
    this.loadingData = false
  }
}
</script>

<style scoped>
.card-container {
  height: 55%;
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
