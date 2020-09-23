<template>
  <div>
    <b-nav class="mb-3" small pills>
      <b-nav-item :active="standingsType === 'all'" @click="handleClick('all')">Overall</b-nav-item>
      <b-nav-item :active="standingsType === 'home'" @click="handleClick('home')">Home</b-nav-item>
      <b-nav-item :active="standingsType === 'away'" @click="handleClick('away')">Away</b-nav-item>
    </b-nav>
    <app-standings-table :tableData="tableData" :fixtureTeamsIds="tabData.teamIds" ref="table" />
  </div>
</template>

<script>
import StandingsTable from './StandingsTable.vue'

export default {
  components: {
    appStandingsTable: StandingsTable
  },
  props: {
    tabData: Object
  },
  data () {
    return {
      standingsType: 'all'
    }
  },
  computed: {
    tableData () {
      const standingsArr = this.tabData.standings[0]
      const filteredStandings = standingsArr.map(el => {
        const filteredObj = {}
        filteredObj.team = el.team
        if (this.standingsType === 'all') {
          filteredObj.description = el.description
          filteredObj.rank = el.rank
        }
        const games = el[this.standingsType]
        games.points = (games.win * 3) + games.draw
        filteredObj.games = games
        const goalsDiff = games.goals.for - games.goals.against
        filteredObj.goalsDiff = goalsDiff
        return filteredObj
      })

      if (this.standingsType === 'all') return filteredStandings
      else {
        return filteredStandings.sort((a, b) => {
          if (a.games.points !== b.games.points) {
            return b.games.points - a.games.points
          } else {
            return b.goalsDiff - a.goalsDiff
          }
        })
      }
    }
  },
  methods: {
    handleClick (standingsType) {
      if (this.standingsType !== standingsType) {
        this.standingsType = standingsType
        this.$refs.table.$el.scrollTo(0, 0)
      }
    }
  }
}
</script>
