<template>
  <b-card-header class="padding" header-bg-variant="secondary" header-text-variant="white">
    <b-row>
      <b-col cols="6">
        {{ fixtureTime }}
      </b-col>
      <b-col cols="6" class="text-right">
        {{ fixtureRound }}
      </b-col>
    </b-row>
  </b-card-header>
</template>

<script>
import {
  generateFixtureTimeString,
  generateFixtureRoundString
} from '../../../helpers/fixtureBasicInfo'

export default {
  props: {
    fixture: Object
  },
  data () {
    return {
      fixtureTime: generateFixtureTimeString(this.fixture),
      fixtureRound: generateFixtureRoundString(this.fixture)
    }
  }
}
</script>

<style scoped>
.padding {
  padding: 0.5rem 0.8rem;
}
</style>
