<template>
  <div class="table-container shadow-sm">
    <b-table-simple small hover>
      <b-tbody>
        <app-games-table-row
          v-for="game in filteredFixtures"
          :key="game.id"
          :teamId="team.id"
          :fixture="game"
         />
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import GamesTableRow from './GamesTableRow.vue'

export default {
  components: {
    appGamesTableRow: GamesTableRow
  },
  props: {
    team: Object
  },
  computed: {
    filteredFixtures () {
      const map = []
      this.team.fixtures.forEach(fixture => {
        const goals = fixture.goals
        if (goals.home !== null && goals.away !== null) {
          map.push(fixture)
        }
      })

      return map
    }
  }
}
</script>

<style scoped>
.table-container {
  border: 1px solid #dee2e6;
  border-top: 0;
}

.table {
  margin-bottom: 0 !important;
}

tr:hover {
  cursor: pointer;
}
</style>
