<template>
  <b-row>
    <b-col cols="6">
      <img :src="leagueInfo.flag" />
      <h4>{{ leagueInfo.country }}</h4>
    </b-col>
    <b-col cols="6" class="text-right">
      <h4>{{ leagueInfo.name }}</h4>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    leagueInfo: Object
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
  vertical-align: middle;
}
</style>
