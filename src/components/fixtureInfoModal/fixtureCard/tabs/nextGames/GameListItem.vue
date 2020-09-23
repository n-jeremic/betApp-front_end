<template>
  <b-tr>
    <b-td>{{ fixtureDate }}</b-td>
    <b-td>{{ fixtureOutput }}</b-td>
    <b-td class="text-right">
      <span>{{ fixtureLeague }}</span>
      <img
        :src="this.fixtureObj.league.flag ? this.fixtureObj.league.flag : this.fixtureObj.league.logo"
        :alt="`${this.fixtureObj.league.name}-flag`"
      >
    </b-td>
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
      const oppositeTeam = isHomeTeam ? this.fixtureObj.teams.away.name : this.fixtureObj.teams.home.name

      return `${caption} ${oppositeTeam}`
    }
  }
}
</script>

<style scoped>
img {
  width: 20px;
  margin-left: 0.3rem;
  margin-bottom: 0.2rem;
}
</style>
