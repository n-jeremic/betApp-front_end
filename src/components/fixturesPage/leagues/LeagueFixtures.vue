<template>
  <b-card
    no-body
    class="container-margin shadow-sm"
    :border-variant="`${ headerHovered && !isListOpen ? 'secondary' : '' }`"
  >
    <app-league-header
      :leagueInfo="leagueInfo"
      :listOpen="isListOpen"
      @togglelist="isListOpen = !isListOpen"
      @mouseover="headerHovered = true"
      @mouseout="headerHovered = false"
    />
    <b-card-body v-show="isListOpen" class="padding">
      <b-container fluid>
        <b-row>
          <app-fixture-item
            v-for="fixture in fixtures"
            :key="fixture.fixture.id"
            :fixture="fixture"
          />
        </b-row>
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
import FixtureItem from './fixtureListItem/FixtureItem.vue'
import LeagueHeader from './LeagueHeader.vue'

export default {
  props: {
    fixtures: Array,
    listInitiallyOpen: Boolean
  },
  components: {
    appFixtureItem: FixtureItem,
    appLeagueHeader: LeagueHeader
  },
  data () {
    return {
      leagueInfo: this.fixtures[0].league,
      isListOpen: this.listInitiallyOpen,
      headerHovered: false
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 0;
}

.container-margin {
  margin-bottom: 2rem;
}

.container-margin:last-child {
  margin-bottom: 0.3rem;
}
</style>
