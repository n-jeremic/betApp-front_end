<template>
  <div id="modal-controller">
    <app-modal v-if="openModal" :selectedFixture="selectedFixture" :closeModalFn="closeModal" />
  </div>
</template>

<script>
import EventBus from '../../eventBus'
import Modal from './Modal.vue'

export default {
  components: {
    appModal: Modal
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
