<template>
  <b-card
    :header="headerTitle"
    header-class="text-center padding"
    header-tag="h5"
    header-border-variant="info"
    class="mb-4 shadow-sm"
  >
    <b-row>
      <b-col cols="4" v-for="(oddObject, index) in oddsArray" :key="index">
        <b-card
          :header="Object.keys(oddObject)[0]"
          header-class="text-center padding"
          body-class="text-center padding"
          header-bg-variant="info"
          header-text-variant="white"
        >
          <b-card-text>{{ oddObject[Object.keys(oddObject)[0]] }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    oddsArray: Array,
    betType: String
  },
  computed: {
    headerTitle () {
      if (this.betType === 'matchWinner') return 'Match winner'
      else return 'Goals'
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 0.5rem;
}

h5.card-header {
  color: var(--title-color);
}
</style>
