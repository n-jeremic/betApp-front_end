<template>
  <b-row>
    <b-col cols="5">
      <div class="text-center">
        <img :src="teams.home.logo" :alt="`${teams.home.name}-logo`">
      </div>
      <div class="text-center team-name">
        {{ teams.home.name }}
      </div>
    </b-col>
    <b-col cols="2" class="text-center">
      <b-icon icon="dash" font-scale="2" shift-v="-10"></b-icon>
    </b-col>
    <b-col cols="5">
      <div class="text-center">
        <img :src="teams.away.logo" :alt="`${teams.away.name}-logo`">
      </div>
      <div class="text-center team-name">
        {{ teams.away.name }}
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    teams: Object
  }
}
</script>

<style scoped>
img {
  width: 60px;
}

.team-name {
  margin-top: 0.5rem;
  font-size: 20px;
  font-weight: 600;
  color: var(--title-color);
}
</style>
