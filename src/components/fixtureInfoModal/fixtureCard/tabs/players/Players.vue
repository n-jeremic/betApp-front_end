<template>
  <div>
    <b-nav class="pb-3 shadow-sm" pills justified small>
      <b-nav-item :active="activeTeam === 'homeTeam'" @click="handleClick('homeTeam')">
        {{ tabData.teams.home.name }}
      </b-nav-item>
      <b-nav-item :active="activeTeam === 'awayTeam'" @click="handleClick('awayTeam')">
        {{ tabData.teams.away.name }}
      </b-nav-item>
    </b-nav>
    <app-players-tables :players="tabData[activeTeam]" ref="tables" />
  </div>
</template>

<script>
import PlayersTables from './PlayersTables.vue'

export default {
  components: {
    appPlayersTables: PlayersTables
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
        this.$refs.tables.$el.scrollTo(0, 0)
      }
    }
  }
}
</script>
