<template>
  <div id="modal-controller">
    <app-upcoming-fixture-modal
      v-if="openUpcomingFixtureModal"
      :selectedFixture="selectedFixture"
      :closeModalFn="closeUpcomingFixtureModal"
    />
    <app-previous-fixture-modal
      v-if="openPreviousFixtureModal"
      :selectedFixtureId="selectedFixture"
    />
  </div>
</template>

<script>
import EventBus from '../eventBus'
import UpcomingFixtureModal from './upcomingFixtureModal/Modal.vue'
import PreviousFixtureModal from './PreviousFixtureModal.vue'

export default {
  components: {
    appUpcomingFixtureModal: UpcomingFixtureModal,
    appPreviousFixtureModal: PreviousFixtureModal
  },
  data () {
    return {
      openUpcomingFixtureModal: false,
      openPreviousFixtureModal: false,
      selectedFixture: null
    }
  },
  methods: {
    closeUpcomingFixtureModal () {
      this.openUpcomingFixtureModal = false
      this.selectedFixture = null
    }
  },
  watch: {
    openPreviousFixtureModal: function (isModalOpened) {
      if (isModalOpened) {
        EventBus.$on('closePreviousGame', () => {
          this.openPreviousFixtureModal = false
          this.selectedFixture = null
        })
      } else {
        EventBus.$off('closePreviousGame')
      }
    }
  },
  created () {
    EventBus.$on('openUpcomingFixtureModal', fixtureObject => {
      this.openUpcomingFixtureModal = true
      this.selectedFixture = fixtureObject
    })

    EventBus.$on('openPreviousFixtureModal', fixtureId => {
      this.selectedFixture = fixtureId
      this.openPreviousFixtureModal = true
    })
  }
}
</script>
