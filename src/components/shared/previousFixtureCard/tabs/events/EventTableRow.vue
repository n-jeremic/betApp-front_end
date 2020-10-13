<template>
  <b-tr :class="{ 'text-right': !isHomeTeam }">
    <b-td v-if="isHomeTeam">
      <span class="mr-2">{{ eventTime }}</span>
      <b-icon :icon="eventIcon.icon" :variant="eventIcon.variant" class="mr-2" />
      <span class="mr-1">{{ event.player.name }}</span>
      <span v-if="parenthesesContent" class="text-muted">({{ parenthesesContent }})</span>
    </b-td>
    <b-td v-else>
      <span v-if="parenthesesContent" class="text-muted mr-1">({{ parenthesesContent }})</span>
      <span class="mr-2">{{ event.player.name }}</span>
      <b-icon :icon="eventIcon.icon" :variant="eventIcon.variant" class="mr-2" />
      <span>{{ eventTime }}</span>
    </b-td>
  </b-tr>
</template>

<script>
export default {
  props: {
    event: Object,
    teams: Object
  },
  computed: {
    isHomeTeam () {
      if (this.event.team.id === this.teams.home.id) return true
      else return false
    },
    eventTime () {
      const time = this.event.time.elapsed
      if (this.event.time.extra) return `${time}+${this.event.time.extra}'`
      else return `${time}'`
    },
    eventIcon () {
      const eventType = this.event.type
      const eventDetail = this.event.detail
      const iconObj = {}
      if (eventType === 'Goal') {
        if (eventDetail === 'Normal Goal' || eventDetail === 'Penalty') {
          iconObj.icon = 'patch-check-fll'
          iconObj.variant = 'success'
        } else if (eventDetail === 'Missed Penalty') {
          iconObj.icon = 'exclamation-triangle-fill'
          iconObj.variant = 'danger'
        } else {
          iconObj.icon = 'patch-check-fll'
          iconObj.variant = 'danger'
        }
      } else if (eventType === 'Card') {
        iconObj.icon = 'file-fill'
        if (eventDetail === 'Yellow Card') {
          iconObj.variant = 'warning'
        } else {
          iconObj.variant = 'danger'
        }
      } else if (eventType === 'subst') {
        iconObj.icon = 'arrow-repeat'
        iconObj.variant = 'secondary'
      } else {
        return null
      }

      return iconObj
    },
    parenthesesContent () {
      const eventDetail = this.event.detail
      if (this.event.assist.name) {
        return this.event.assist.name
      } else if (eventDetail === 'Own Goal') {
        return eventDetail
      } else if (eventDetail === 'Penalty') {
        return eventDetail
      } else if (eventDetail === 'Missed Penalty') {
        return eventDetail
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
tr {
  font-size: 14px;
}
</style>
