<template>
  <b-col cols="6" class="item-container">
    <b-card
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      :class="['shadow-sm', { 'cursor' : isItemClickable }]"
      header-class="padding"
      body-class="padding"
      :header-border-variant="`${ fixtureStatus === 'warning' ?
        'info' : fixtureStatus === 'onGoing' ?
          'danger' : ''}`"
      :border-variant="`${ isItemClickable && hovered ? 'primary' : '' }`"
      @click="handleClick"
    >
      <template v-slot:header>
        <app-fixture-item-header
          :time="fixtureTime"
          :title="fixtureTitle"
          :round="fixtureRound"
          :status="fixtureStatus"
        />
      </template>
      <b-row>
        <b-col cols="5" class="text-right">
          <img :src="fixture.teams.home.logo" :alt="`${fixture.teams.home.name}-logo`" width="30px" class="mr-2">
          <span :class="[{ 'text-muted' : fixtureStatus === 'warning' }]">{{ fixture.teams.home.name }}</span>
        </b-col>
        <b-col cols="2" class="fixture-result-container">
          <app-fixture-result-output
            :fixtureStatus="fixtureStatus"
            :fixtureGoals="fixture.goals"
          />
        </b-col>
        <b-col cols="5">
          <span :class="[{ 'text-muted' : fixtureStatus === 'warning' }]">{{ fixture.teams.away.name }}</span>
          <img :src="fixture.teams.away.logo" :alt="`${fixture.teams.away.name}-logo`" width="30px" class="ml-2">
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import FixtureItemHeader from './FixtureItemHeader.vue'
import FixtureResultOutput from './FixtureResultOutput.vue'
import EventBus from '../../../../eventBus'
import {
  generateFixtureTimeString,
  generateFixtureTitle,
  generateFixtureRoundString,
  generateFixtureStatus
} from '../../../../helpers/fixtureBasicInfo'

export default {
  components: {
    appFixtureItemHeader: FixtureItemHeader,
    appFixtureResultOutput: FixtureResultOutput
  },
  props: {
    fixture: Object
  },
  data () {
    return {
      hovered: false,
      fixtureTime: generateFixtureTimeString(this.fixture),
      fixtureTitle: generateFixtureTitle(this.fixture),
      fixtureRound: generateFixtureRoundString(this.fixture),
      fixtureStatus: generateFixtureStatus(this.fixture)
    }
  },
  computed: {
    isItemClickable () {
      return this.fixtureStatus === 'Not Started' || this.fixtureStatus === 'finished'
    }
  },
  methods: {
    handleClick () {
      if (this.isItemClickable) {
        this.hovered = false
        if (this.fixtureStatus === 'Not Started') {
          EventBus.$emit('openUpcomingFixtureModal', this.fixture)
        } else if (this.fixtureStatus === 'finished') {
          EventBus.$emit('openPreviousFixtureModal', this.fixture.fixture.id)
        }
      }
    }
  }
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}

.item-container {
  margin-top: 1rem;
}

.item-container:last-child {
  margin-bottom: 1rem;
}

.padding {
  padding: 0.5rem;
}

span {
  vertical-align: middle;
}

.fixture-result-container {
  padding: 0;
}
</style>
