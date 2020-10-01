<template>
  <div class="stat-container">
    <b-row class="mb-1">
      <b-col cols="3">{{ formatStatValue(statsObject.homeValue) }}</b-col>
      <b-col cols="6" class="text-center">{{ statsObject.statType }}</b-col>
      <b-col cols="3" class="text-right">{{ formatStatValue(statsObject.awayValue) }}</b-col>
    </b-row>
    <b-row>
      <b-col cols="6" class="pr-1">
        <b-progress :max="statsObject.total" class="rounded-left">
          <b-progress-bar :value="statsObject.total - statsObject.homeValue" class="grey-bg" />
          <b-progress-bar
            :value="statsObject.homeValue"
            :variant="`${ statsObject.homeValue > statsObject.awayValue ? 'warning' : 'secondary' }`"
          />
        </b-progress>
      </b-col>
      <b-col cols="6" class="pl-1">
        <b-progress :max="statsObject.total" class="rounded-right">
          <b-progress-bar
            :value="statsObject.awayValue"
            :variant="`${ statsObject.awayValue > statsObject.homeValue ? 'warning' : 'secondary' }`"
          />
          <b-progress-bar :value="statsObject.total - statsObject.awayValue" class="grey-bg" />
        </b-progress>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    statsObject: Object
  },
  methods: {
    formatStatValue (value) {
      if (this.statsObject.percentage) return `${value}%`
      else return value
    }
  }
}
</script>

<style scoped>
.row {
  margin: 0;
}
.progress {
  border-radius: 0;
}

.grey-bg {
  background-color: #e9ecef;
}

.stat-container {
  margin-bottom: 0.6rem;
  font-size: 14px;
}

.stat-container:last-child {
  margin-bottom: 0;
}
</style>
