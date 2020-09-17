<template>
<div id="modal-controller">
  <div id="modal" v-if="openModal">
    <b-icon class="close-icon" variant="danger" icon="x-circle-fill" font-scale="2" @click="closeModal"/>
    <b-container fluid>
      <b-row>
        <b-col cols="4">
          <app-fixture-card :fixtureBasicInfo="selectedFixture"/>
        </b-col>
        <b-col cols="8"></b-col>
      </b-row>
    </b-container>
  </div>
</div>
</template>

<script>
import EventBus from '../../eventBus'
import FixtureCard from './fixtureCard/FixtureCard.vue'

export default {
  components: {
    appFixtureCard: FixtureCard
  },
  data () {
    return {
      openModal: false,
      selectedFixture: null
    }
  },
  methods: {
    closeModal () {
      this.openModal = false
      this.selectedFixture = null
    }
  },
  created () {
    EventBus.$on('openModal', fixtureObject => {
      this.openModal = true
      this.selectedFixture = fixtureObject
    })
  }
}
</script>

<style scoped>
#modal {
  padding: 1rem 0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
}

.close-icon {
  position: fixed;
  right: 8px;
  top: 8px;
  z-index: 2000;
}

.container-fluid, .row, .row > div {
  height: 100%;
}

.close-icon:hover {
  cursor: pointer;
  color: white !important;
}
</style>
