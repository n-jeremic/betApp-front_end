<template>
  <b-row class="m-0">
    <b-col cols="6" class="pr-2">
      <app-lineups-table :lineupsData="tabData[0]" />
    </b-col>
    <b-col cols="6" class="pl-2">
      <app-lineups-table :lineupsData="tabData[1]" />
    </b-col>
  </b-row>
</template>

<script>
import LineupsTable from './LineupsTable.vue'

export default {
  props: {
    tabData: Array
  },
  components: {
    appLineupsTable: LineupsTable
  }
}
</script>

<style scoped>
.col-6 {
  padding: 0;
}
</style>
