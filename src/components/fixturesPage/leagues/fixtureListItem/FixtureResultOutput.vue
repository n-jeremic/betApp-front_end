<template>
  <div>
    <div
      v-if="fixtureStatus !== 'Not Started'"
      :class="['text-center', { 'text-danger' : fixtureStatus === 'onGoing' }, { 'text-secondary' : fixtureStatus === 'warning' }]"
      >
      <span class="score" v-if="fixtureGoals.home !== null">{{ fixtureGoals.home }}</span>
      <span>
        <b-icon
          icon="dash"
          :variant="`${ fixtureStatus === 'onGoing' ? 'danger' : fixtureStatus === 'warning' ? 'secondary' : '' }`"
          :class="[{ 'finished-fixture-color' : fixtureStatus === 'finished' }]"
        ></b-icon>
      </span>
      <span class="score" v-if="fixtureGoals.away !== null">{{ fixtureGoals.away }}</span>
    </div>
    <div v-else class="text-center">
      <span>
        <b-icon icon="dash"></b-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fixtureStatus: String,
    fixtureGoals: Object
  }
}
</script>

<style scoped>
.score {
  margin: 0 0.5rem;
  font-size: 22px;
  font-weight: 600;
}

.finished-fixture-color {
  color: #212529;
}

span {
  vertical-align: middle;
}
</style>
