<template>
  <b-button-group class="shadow-sm" size="lg">
    <b-button
      v-for="(periodTitle, periodIndex) in $options.nrData.periodsTitles"
      :key="periodIndex"
      :variant="`${ activePeriodIndex === periodIndex ? 'primary' : 'outline-primary' }`"
      @click="handleClick(periodIndex)"
      class="button"
    >
      {{ periodTitle }}
    </b-button>
  </b-button-group>
</template>

<script>

export default {
  props: {
    periods: Array,
    activePeriodIndex: Number
  },
  nrData: {
    periodsTitles: null
  },
  methods: {
    handleClick (clickedPeriodIndex) {
      if (this.activePeriodIndex !== clickedPeriodIndex) {
        this.$emit('selectedPeriodChanged', clickedPeriodIndex)
      }
    }
  },
  created () {
    this.$options.nrData.periodsTitles = this.periods.map((period, index) => {
      if (index === 0) return 'Current period'
      if (index === 1) return 'Next period'
      if (index === 2) return 'After next period'
      else return 'Not set period'
    })
  }
}
</script>

<style scoped>
.button:focus {
  box-shadow: unset;
}

.button:first-child {
  border-right: 0;
}

.button:last-child {
  border-left: 0;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #3396ff;
  border-color: #007bff;
}
</style>
