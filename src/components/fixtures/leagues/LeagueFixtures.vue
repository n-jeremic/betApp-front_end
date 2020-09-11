<template>
  <b-card body-class="padding" class="container-margin shadow-sm">
    <template v-slot:header>
      <app-league-header :leagueInfo="leagueInfo"/>
    </template>
    <b-container fluid>
      <b-row>
        <app-fixture-item
          v-for="fixture in fixtures"
          :key="fixture.id"
          :fixture="fixture"
        />
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
import FixtureItem from './FixtureItem.vue'
import LeagueHeader from './LeagueHeader.vue'

export default {
  props: {
    fixtures: Array
  },
  components: {
    appFixtureItem: FixtureItem,
    appLeagueHeader: LeagueHeader
  },
  data () {
    return {
      leagueInfo: this.fixtures[0].league
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 0 0 1rem 0;
}

.container-margin {
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
}

.container-margin:last-child {
  margin-bottom: 0.3rem;
}
</style>
