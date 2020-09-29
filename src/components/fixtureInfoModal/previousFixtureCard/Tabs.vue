<template>
  <div class="tabs-container">
    <b-nav class="pb-2" pills justified small>
      <b-nav-item
        v-for="(tab, index) in tabs"
        :key="index"
        :active="activeTab === tab.prop"
        @click="changeTab(tab.prop)"
      >
        {{ tab.name }}
      </b-nav-item>
    </b-nav>
    <div class="tab-content">
      <component :is="activeTab" :tabData="tabsData[activeTab]" :teams="teams" :score="score" />
    </div>
  </div>
</template>

<script>
import EventsTab from './tabs/events/EventsTab.vue'
import StatsTab from './tabs/StatsTab.vue'
import LineupsTab from './tabs/LineupsTab.vue'

export default {
  components: {
    events: EventsTab,
    statistics: StatsTab,
    lineups: LineupsTab
  },
  props: {
    tabsData: Object,
    teams: Object,
    score: Object
  },
  data () {
    return {
      tabs: [
        { name: 'Events', prop: 'events' },
        { name: 'Stats', prop: 'statistics' },
        { name: 'Lineups', prop: 'lineups' }
      ],
      activeTab: 'events'
    }
  },
  methods: {
    changeTab (tab) {
      if (this.activeTab !== tab) this.activeTab = tab
    }
  }
}
</script>

<style scoped>
.tabs-container {
  height: 100%;
}

.tab-content {
  overflow-y: auto;
  height: 86%;
}
</style>
