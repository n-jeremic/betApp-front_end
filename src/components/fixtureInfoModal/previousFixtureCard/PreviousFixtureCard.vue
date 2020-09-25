<template>
  <b-col cols="6" class="card-container">
    <b-card v-if="!loadingData" class="full-height">
      <template v-slot:header>
        test
        <span class="float-right" @click="closeCard">X</span>
      </template>
      <b-card-text>{{ selectedFixtureId }}</b-card-text>
    </b-card>
    <app-loader v-else :marginTop="'5rem'" :spinnerType="'border'" />
  </b-col>
</template>

<script>
import EventBus from '../../../eventBus'
import Loader from '../../shared/Loader.vue'

export default {
  props: {
    selectedFixtureId: Number
  },
  components: {
    appLoader: Loader
  },
  data () {
    return {
      loadingData: true
    }
  },
  methods: {
    closeCard () {
      EventBus.$emit('closePreviousGame', this.selectedFixtureId)
    }
  },
  created () {
    window.setTimeout(() => {
      this.loadingData = false
    }, 1500)
  }
}
</script>

<style scoped>
.card-container {
  height: 50%;
  margin-bottom: 1rem;
}

.full-height {
  height: 100%;
}

span {
  cursor: pointer;
}
</style>
