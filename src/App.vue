<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="10">
          <router-view/>
        </b-col>
        <b-col cols="2">
          <b-button variant="primary" size="lg" block>Nav placeholder</b-button>
        </b-col>
      </b-row>
    </b-container>
    <app-modal-controller/>
  </div>
</template>

<script>
import ModalController from './components/fixtureInfoModal/Modal.vue'

export default {
  components: {
    appModalController: ModalController
  }
}
</script>

<style>
:root {
  --title-color: #4f5963
}

#app {
  margin: 1rem 0;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b3b3b3;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #737373;
  cursor: pointer;
}
</style>
