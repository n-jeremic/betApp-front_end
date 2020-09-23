<template>
  <b-row>
    <b-col cols="5">
      <div class="text-center">
        <img :src="teams.home.logo" :alt="`${teams.home.name}-logo`">
      </div>
      <div class="text-center team-name">
        {{ teams.home.name | formatTeamName }}
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
        {{ teams.away.name | formatTeamName }}
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    teams: Object
  },
  filters: {
    formatTeamName (teamName) {
      const teamNameArr = teamName.split(' ')
      if (teamNameArr.length > 2) {
        let formatedName = ''
        teamNameArr.forEach(word => {
          formatedName += word[0]
        })
        return formatedName
      }

      return teamName
    }
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
