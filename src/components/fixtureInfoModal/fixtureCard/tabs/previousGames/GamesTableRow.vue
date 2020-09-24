<template>
  <b-tr>
    <b-td>
      {{ fixtureDate }}
    </b-td>
    <b-td :id="`${this.fixture.fixture.id}-tooltip-previous-games`">
      <img
        :src="this.fixture.league.flag ? this.fixture.league.flag : this.fixture.league.logo"
        :alt="`${this.fixture.league.name}-flag`"
      >
      <span>{{ league }}</span>
    </b-td>
    <b-td>
      {{ oppositeTeam }}
    </b-td>
    <b-td class="score-output">
      {{ fixtureScore }}
    </b-td>
    <b-td>
      <b-avatar
        size="sm"
        :text="fixtureOutcome"
        :variant="`${fixtureOutcome === 'W' ? 'success' : fixtureOutcome === 'L' ? 'danger' : 'warning'}`"
        rounded
      />
    </b-td>
    <b-tooltip
      :target="`${this.fixture.fixture.id}-tooltip-previous-games`"
      noninteractive
    >{{ this.fixture.league.name }}</b-tooltip>
  </b-tr>
</template>

<script>
export default {
  props: {
    teamId: Number,
    fixture: Object
  },
  computed: {
    fixtureDate () {
      const dateObject = new Date(this.fixture.fixture.date)
      const dateString = dateObject.toDateString()
      const dateArr = dateString.split(' ')
      return `${dateArr[1]} ${dateArr[2]}`
    },
    isHomeTeam () {
      if (this.fixture.teams.home.id === this.teamId) return true
      else return false
    },
    oppositeTeam () {
      const caption = this.isHomeTeam ? 'vs' : '@'
      const oppositeTeam = this.isHomeTeam
        ? this.fixture.teams.away.name
        : this.fixture.teams.home.name

      return `${caption} ${oppositeTeam}`
    },
    fixtureScore () {
      return `${this.currentTeamGoals} - ${this.oppositeTeamGoals}`
    },
    currentTeamGoals () {
      return this.isHomeTeam ? this.fixture.goals.home : this.fixture.goals.away
    },
    oppositeTeamGoals () {
      return this.isHomeTeam ? this.fixture.goals.away : this.fixture.goals.home
    },
    fixtureOutcome () {
      if (this.currentTeamGoals > this.oppositeTeamGoals) return 'W'
      else if (this.currentTeamGoals === this.oppositeTeamGoals) return 'D'
      else return 'L'
    },
    league () {
      const leagueArr = this.fixture.league.name.split(' ')
      if (leagueArr.length > 1) return `${leagueArr[0][0]}${leagueArr[1][0]}`
      else return leagueArr[0][0]
    }
  }
}
</script>

<style scoped>
.score-output {
  font-weight: 600;
}

img {
  width: 20px;
  margin-right: 0.3rem;
  margin-bottom: 0.2rem;
}
</style>
