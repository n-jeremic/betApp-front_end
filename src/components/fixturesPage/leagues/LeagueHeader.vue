<template>
  <b-card-header
    class="league-header"
    ref="header"
    @click="handleClick"
    @mouseover="$emit('mouseover')"
    @mouseout="$emit('mouseout')"
  >
    <b-row>
      <b-col cols="6">
        <img :src="leagueInfo.flag" />
        <h4>{{ leagueInfo.country }}</h4>
      </b-col>
      <b-col cols="6" class="text-right">
        <h4 class="mt-1">{{ leagueInfo.name }}</h4>
        <span class="ml-3">
          <b-icon v-if="listOpen" icon="chevron-up" font-scale="1.5" shift-v="-5"></b-icon>
          <b-icon v-else icon="chevron-down" font-scale="1.5" shift-v="-5"></b-icon>
        </span>
      </b-col>
    </b-row>
  </b-card-header>
</template>

<script>
export default {
  props: {
    leagueInfo: Object,
    listOpen: Boolean
  },
  methods: {
    async handleClick () {
      this.$emit('togglelist')
      await this.$nextTick()
      this.$refs.header.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 50px;
  margin-right: 1rem;
}

h4 {
  display: inline-block;
  vertical-align: middle !important;
  margin: 0;
}

.league-header {
  cursor: pointer;
  color: var(--title-color);
}
</style>
