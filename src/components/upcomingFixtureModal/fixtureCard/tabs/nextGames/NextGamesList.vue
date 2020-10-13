<template>
  <b-card
    :header="teamData.name"
    class="shadow-sm"
    header-tag="h6"
    header-class="text-center"
    header-border-variant="secondary"
    body-class="no-padding"
  >
    <b-table-simple small hover>
      <b-tbody>
        <app-games-list-item
          v-for="fixture in tableData"
          :key="fixture.fixture.id"
          :currentTeamId="teamData.id"
          :fixtureObj="fixture"
        />
      </b-tbody>
    </b-table-simple>
  </b-card>
</template>

<script>
import GamesListItem from './GameListItem.vue'

export default {
  components: {
    appGamesListItem: GamesListItem
  },
  props: {
    currentFixtureId: Number,
    teamData: Object
  },
  computed: {
    tableData () {
      const map = []
      this.teamData.fixtures.forEach(fixtureObj => {
        if (fixtureObj.fixture.id !== this.currentFixtureId) {
          map.push(fixtureObj)
        }
      })

      return map
    }
  }
}
</script>

<style scoped>
.no-padding {
  padding: 0;
}

.table {
  margin: 0;
}

.card-header {
  color: var(--title-color);
}
</style>
