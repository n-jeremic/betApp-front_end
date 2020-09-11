<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="10">
          <app-fixtures-page/>
        </b-col>
        <b-col cols="2">
          <b-button variant="primary" size="lg" block>Nav placeholder</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FixturesPage from './components/fixtures/FixturesPage.vue'

export default {
  components: {
    appFixturesPage: FixturesPage
  }
}
</script>

<style>
#app {
  margin: 1rem 0;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #999999;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
