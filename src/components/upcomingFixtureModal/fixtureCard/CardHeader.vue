<template>
  <b-card-header class="padding shadow-sm">
    <b-row>
      <b-col cols="6">
        <img :src="fixture.league.flag" alt="">
        <span class="align-middle">
          {{ `${fixture.league.name} - ${fixtureRound}` }}
        </span>
      </b-col>
      <b-col cols="5" class="text-right">
        <span class="align-middle">
          {{ fixtureTime }}
        </span>
      </b-col>
      <b-col cols="1" class="no-padding">
        <b-dropdown size="sm" variant="outline-dark" no-caret block>
          <template v-slot:button-content>
            <b-icon icon="three-dots-vertical"></b-icon>
          </template>
          <b-dropdown-item @click="closeModalFn">Close window</b-dropdown-item>
        </b-dropdown>
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
    fixture: Object,
    closeModalFn: Function
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
  padding: 0.3rem 0.8rem;
}

.no-padding {
  padding: 0;
  padding-right: 0.5rem;
}

img {
  width: 30px;
  margin-right: 3px;
  margin-top: 2px;
}
</style>
