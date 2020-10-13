<template>
  <b-card-header header-border-variant="secondary" class="header-modified text-center">
      <span class="mr-2">{{ teams.home.name }}</span>
      <span>{{ `${goals.home} - ${goals.away}` }}</span>
      <span class="ml-2">{{ teams.away.name }}</span>
    <b-icon icon="x-circle-fill" shift-v="-4" variant="danger" class="close-icon" @click="closeCardFn" />
  </b-card-header>
</template>

<script>
export default {
  props: {
    teams: Object,
    goals: Object,
    closeCardFn: Function
  }
}
</script>

<style scoped>
.header-modified {
  padding: 0.4rem;
  color: var(--title-color);
  font-weight: 600;
  font-size: 18px;
}

.close-icon {
  float: right;
  cursor: pointer;
}
</style>
