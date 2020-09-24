<template>
  <b-row>
    <b-col cols="6" class="padding-right">
      <app-next-games-list :teamData="tabData.homeTeam" :currentFixtureId="tabData.currentFixtureId" />
    </b-col>
    <b-col cols="6" class="padding-left">
      <app-next-games-list :teamData="tabData.awayTeam" :currentFixtureId="tabData.currentFixtureId" />
    </b-col>
  </b-row>
</template>

<script>
import NextGamesList from './NextGamesList.vue'

export default {
  components: {
    appNextGamesList: NextGamesList
  },
  props: {
    tabData: Object
  }
}
</script>

<style scoped>
.padding-right {
  padding-right: 0.5rem;
}

.padding-left {
  padding-left: 0.5rem;
}
</style>
