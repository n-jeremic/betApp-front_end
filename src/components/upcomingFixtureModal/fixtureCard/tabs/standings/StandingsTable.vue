<template>
  <div class="table-container">
    <b-table-simple class="shadow-sm mb-1" small hover outlined>
      <b-thead head-variant="light">
        <b-th></b-th>
        <b-th>Team</b-th>
        <b-th class="text-center">MP</b-th>
        <b-th class="text-center th-padding">W</b-th>
        <b-th class="text-center th-padding">D</b-th>
        <b-th class="text-center th-padding">L</b-th>
        <b-th class="text-center th-padding">G</b-th>
        <b-th class="text-center">Pts</b-th>
      </b-thead>
      <b-tbody>
        <app-table-row
          v-for="(teamStanding, index) in tableData"
          :key="index"
          :tableRowData="teamStanding"
          :iterationIndex="index"
          :fixtureTeamsIds="fixtureTeamsIds"
        />
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import StandingsTableRow from './StandingsTableRow.vue'

export default {
  components: {
    appTableRow: StandingsTableRow
  },
  props: {
    tableData: Array,
    fixtureTeamsIds: Array
  }
}
</script>

<style scoped>
.table-container {
  height: 87%;
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.table-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.table-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.th-padding {
  padding: 0.3rem 0.6rem;
}
</style>
