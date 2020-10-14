<template>
  <b-card-header header-border-variant="secondary" class="header-modified">
      <b-row>
        <b-col cols="5" class="text-right pr-0">
          {{ teams.home.name }}
        </b-col>
        <b-col cols="2" class="text-center p-0">
          {{ `${goals.home} - ${goals.away}` }}
        </b-col>
        <b-col cols="5" class="pl-0">
          {{ awayTeamName }}
          <b-icon icon="x-circle-fill" shift-v="-4" variant="danger" class="close-icon" @click="closeCardFn" />
        </b-col>
      </b-row>
  </b-card-header>
</template>

<script>
export default {
  props: {
    teams: Object,
    goals: Object,
    closeCardFn: Function
  },
  computed: {
    awayTeamName () {
      if (this.teams.away.name.length > 15) {
        const words = this.teams.away.name.split(' ')
        words[0] = words[0].slice(0, 3)
        return words.join(' ')
      } else {
        return this.teams.away.name
      }
    }
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
