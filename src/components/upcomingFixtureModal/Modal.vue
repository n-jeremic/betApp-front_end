<template>
  <div class="modal-style">
    <b-container class="full-height" fluid>
      <b-row class="full-height">
        <b-col cols="5" class="full-height">
          <app-fixture-card :fixtureBasicInfo="selectedFixture" :closeModalFn="closeModalFn"/>
        </b-col>
        <b-col cols="7" class="full-height">
          <b-row v-if="openedPreviousGames.length" class="full-height previous-fixtures-container">
            <app-previous-fixture-card
              v-for="fixtureId in openedPreviousGames"
              :key="fixtureId"
              :selectedFixtureId="fixtureId"
              :cardHeight="'55%'"
            />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FixtureCard from './fixtureCard/FixtureCard.vue'
import PreviousFixtureCard from '../shared/previousFixtureCard/PreviousFixtureCard.vue'
import EventBus from '../../eventBus'

export default {
  props: {
    selectedFixture: Object,
    closeModalFn: Function
  },
  components: {
    appFixtureCard: FixtureCard,
    appPreviousFixtureCard: PreviousFixtureCard
  },
  data () {
    return {
      openedPreviousGames: []
    }
  },
  created () {
    EventBus.$on('openPreviousGame', fixtureId => {
      if (!this.openedPreviousGames.includes(fixtureId)) {
        this.openedPreviousGames.push(fixtureId)
      }
    })
    EventBus.$on('closePreviousGame', fixtureId => {
      const index = this.openedPreviousGames.findIndex(openedFixtureId => openedFixtureId === fixtureId)
      if (index !== -1) {
        this.openedPreviousGames.splice(index, 1)
      }
    })
  },
  beforeDestroy () {
    EventBus.$off('openPreviousGame')
    EventBus.$off('closePreviousGame')
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}

.previous-fixtures-container {
  overflow-y: auto;
}
</style>
