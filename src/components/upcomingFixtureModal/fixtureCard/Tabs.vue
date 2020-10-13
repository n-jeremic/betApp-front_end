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
import OddsTab from './tabs/odds/Odds.vue'
import PreviousGamesTab from './tabs/previousGames/PreviousGames.vue'
import NextGamesTab from './tabs/nextGames/NextGames.vue'
import StandingsTab from './tabs/standings/Standings.vue'
import PlayersTab from './tabs/players/Players.vue'

export default {
  components: {
    odds: OddsTab,
    previousGames: PreviousGamesTab,
    nextGames: NextGamesTab,
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
        { name: 'Next games', component: 'nextGames' },
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
  height: 82%;
  overflow-y: hidden;
}

.tab-content {
  padding-top: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 93%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.tab-content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tab-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.nav-tabs {
  border-bottom: 1px solid #007bff;
}

.nav-tabs .nav-link.active {
  border-color: #007bff #007bff #fff !important;
  color: #007bff !important;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #007bff;
  color: #0056b3;
}
.nav-item a {
  color: #71808e;
}
</style>
