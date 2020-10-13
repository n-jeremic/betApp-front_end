<template>
  <b-tr :variant="teamRankingVariant ? '' : currentTeamVariant">
    <b-td
      :class="['text-center','border-right', { 'pointer' : teamRankingVariant }]"
      :variant="teamRankingVariant"
      :id="`${iterationIndex}-tooltip-standings`"
    >{{ teamRanking }}</b-td>
    <b-td :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''">
      <img :src="tableRowData.team.logo" :alt="`${tableRowData.team.logo}-logo`">
      <span>{{ tableRowData.team.name }}</span>
    </b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ tableRowData.games.played }}</b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ tableRowData.games.win }}</b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ tableRowData.games.draw }}</b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ tableRowData.games.lose }}</b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ `${tableRowData.games.goals.for}:${tableRowData.games.goals.against}` }}</b-td>
    <b-td
      class="text-center"
      :variant="teamRankingVariant && currentTeamVariant ? 'warning' : ''"
    >{{ tableRowData.games.points }}</b-td>
    <b-tooltip
      v-if="teamRankingVariant"
      :target="`${iterationIndex}-tooltip-standings`"
      noninteractive
    >{{ tableRowData.description }}</b-tooltip>
  </b-tr>
</template>

<script>
export default {
  props: {
    tableRowData: Object,
    iterationIndex: Number,
    fixtureTeamsIds: Array
  },
  computed: {
    teamRanking () {
      if (this.tableRowData.rank) return `${this.tableRowData.rank}.`
      else return `${this.iterationIndex + 1}.`
    },
    teamRankingVariant () {
      const description = this.tableRowData.description
      if (description) {
        if (description.includes('Champions League')) {
          return 'success'
        } else if (description.includes('Europa')) {
          return 'primary'
        } else if (description.includes('Relegation')) {
          return 'danger'
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    currentTeamVariant () {
      if (this.fixtureTeamsIds.includes(this.tableRowData.team.id)) return 'warning'
      else return ''
    }
  }
}
</script>

<style scoped>
img {
  width: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
}

.pointer {
  cursor: pointer;
}

.right-border {
  border-right: 1px solid #dee2e6;
}
</style>
