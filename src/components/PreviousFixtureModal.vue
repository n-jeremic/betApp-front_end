<template>
  <div class="modal-style">
    <b-row class="card-row">
      <b-col cols="3"></b-col>
      <app-previous-fixture-card :selectedFixtureId="selectedFixtureId" :cardHeight="'100%'" />
    </b-row>
  </div>
</template>

<script>
import PreviousFixtureCard from './shared/previousFixtureCard/PreviousFixtureCard.vue'

export default {
  props: {
    selectedFixtureId: Number
  },
  components: {
    appPreviousFixtureCard: PreviousFixtureCard
  }
}
</script>

<style scoped>
.card-row {
  padding: 3rem;
  height: 100%;
}
</style>
