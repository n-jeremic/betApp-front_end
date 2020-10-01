<template>
  <div>
    <app-statistic-item
      v-for="(statsObject, index) in statisticsData"
      :key="index"
      :statsObject="statsObject"
    />
  </div>
</template>

<script>
import StatisticItem from './StatisticItem.vue'

export default {
  props: {
    tabData: Array
  },
  components: {
    appStatisticItem: StatisticItem
  },
  computed: {
    statisticsData () {
      const result = []
      this.tabData[0].statistics.forEach((statsObject, index) => {
        const statType = statsObject.type
        let percentage = false

        let homeValue = statsObject.value
        if (homeValue === null) homeValue = 0
        if (homeValue.toString().includes('%')) {
          percentage = true
          const i = homeValue.toString().indexOf('%')
          homeValue = parseInt(homeValue.slice(0, i))
        }

        let awayValue = this.tabData[1].statistics[index].value
        if (awayValue === null) awayValue = 0
        if (awayValue.toString().includes('%')) {
          const i = awayValue.toString().indexOf('%')
          awayValue = parseInt(awayValue.slice(0, i))
        }

        const total = homeValue + awayValue

        result.push({
          statType,
          homeValue,
          awayValue,
          total,
          percentage
        })
      })

      return result
    }
  }
}
</script>
