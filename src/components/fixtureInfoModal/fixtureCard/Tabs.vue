<template>
  <div class="nav-container">
    <b-nav tabs fill>
      <b-nav-item
        v-for="(tab, index) in tabs"
        :key="index"
        :active="currentTab === tab.component"
        @click="currentTab = tab.component"
      >{{ tab.name }}</b-nav-item>
    </b-nav>
    <div class="tab-content">
      <component :is="currentTab" :tabData="tabsData[currentTab]" />
    </div>
  </div>
</template>

<script>
import OddsTab from './tabs/Odds.vue'
import PreviousGamesTab from './tabs/previousGames/PreviousGames.vue'
import StandingsTab from './tabs/Standings.vue'
import PlayersTab from './tabs/Players.vue'

export default {
  components: {
    odds: OddsTab,
    previousGames: PreviousGamesTab,
    standings: StandingsTab,
    players: PlayersTab
  },
  props: {
    tabsData: Object
  },
  data () {
    return {
      tabs: [
        { name: 'Previous games', component: 'previousGames' },
        { name: 'Standings', component: 'standings' },
        { name: 'Players', component: 'players' },
        { name: 'Odds', component: 'odds' }
      ],
      currentTab: 'previousGames'
    }
  }
}
</script>

<style scoped>
.nav-container {
  margin-top: 1rem;
}

.tab-content {
  padding: 1rem 0;
  overflow-y: auto;
}
</style>
