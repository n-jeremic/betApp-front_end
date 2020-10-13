<template>
  <div>
    <b-nav class="mb-3" pills justified small>
      <b-nav-item :active="activeTeam === 'homeTeam'" @click="handleClick('homeTeam')">
        {{ tabData.homeTeam.name }}
      </b-nav-item>
      <b-nav-item :active="activeTeam === 'awayTeam'" @click="handleClick('awayTeam')">
        {{ tabData.awayTeam.name }}
      </b-nav-item>
    </b-nav>
    <app-games-table :team="tabData[activeTeam]"/>
  </div>
</template>

<script>
import GamesTable from './GamesTable.vue'

export default {
  components: {
    appGamesTable: GamesTable
  },
  props: {
    tabData: Object
  },
  data () {
    return {
      activeTeam: 'homeTeam'
    }
  },
  methods: {
    handleClick (team) {
      if (this.activeTeam !== team) {
        this.activeTeam = team
      }
    }
  }
}
</script>
