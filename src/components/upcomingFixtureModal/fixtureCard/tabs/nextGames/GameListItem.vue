<template>
  <b-tr>
    <b-td class="right-border">{{ fixtureDate }}</b-td>
    <b-td>{{ fixtureOutput }}</b-td>
    <b-td class="text-center left-border" :id="`${this.fixtureObj.fixture.id}-tooltip-next-games`">
      <span>{{ fixtureLeague }}</span>
      <img
        :src="this.fixtureObj.league.flag ? this.fixtureObj.league.flag : this.fixtureObj.league.logo"
        :alt="`${this.fixtureObj.league.name}-flag`"
      >
    </b-td>
    <b-tooltip
      :target="`${this.fixtureObj.fixture.id}-tooltip-next-games`"
      noninteractive
    >{{ this.fixtureObj.league.name }}</b-tooltip>
  </b-tr>
</template>

<script>
export default {
  props: {
    fixtureObj: Object,
    currentTeamId: Number
  },
  computed: {
    fixtureDate () {
      const dateObject = new Date(this.fixtureObj.fixture.date)
      const dateString = dateObject.toDateString()
      const dateArr = dateString.split(' ')
      return `${dateArr[1]} ${dateArr[2]}`
    },
    fixtureLeague () {
      const leagueArr = this.fixtureObj.league.name.split(' ')
      if (leagueArr.length > 1) return `${leagueArr[0][0]}${leagueArr[1][0]}`
      else return leagueArr[0][0]
    },
    fixtureOutput () {
      const isHomeTeam = this.fixtureObj.teams.home.id === this.currentTeamId
      const caption = isHomeTeam ? 'vs' : '@'
      let oppositeTeam = isHomeTeam ? this.fixtureObj.teams.away.name : this.fixtureObj.teams.home.name
      if (oppositeTeam.length > 18) {
        const splitted = oppositeTeam.split(' ')
        oppositeTeam = splitted[0] + ' ' + splitted[1].slice(0, 3)
      }

      return `${caption} ${oppositeTeam}`
    }
  }
}
</script>

<style scoped>
img {
  height: 15px;
  width: 20px;
  margin-left: 0.3rem;
  margin-bottom: 0.2rem;
  object-fit: contain;
}

.right-border {
  border-right: 1px solid #dee2e6;
}

.left-border {
  border-left: 1px solid #dee2e6;
}
</style>
