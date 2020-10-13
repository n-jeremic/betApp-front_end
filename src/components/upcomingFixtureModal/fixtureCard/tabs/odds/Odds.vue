<template>
  <div>
    <app-odds-card
      v-for="(oddsObject, index) in tabData"
      :key="index"
      :oddsArray="oddsObject[Object.keys(oddsObject)[0]]"
      :betType="Object.keys(oddsObject)[0]"
    />
  </div>
</template>

<script>
import OddsCard from './OddsCard.vue'

export default {
  props: {
    tabData: Array
  },
  components: {
    appOddsCard: OddsCard
  }
}
</script>
