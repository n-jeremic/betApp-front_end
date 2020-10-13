<template>
  <b-table-simple class="mb-1 shadow-sm" small outlined>
    <b-tbody>
      <b-tr>
        <b-th class="text-center" variant="secondary">
          {{ `First Half:  ${score.halftime.home} - ${score.halftime.away}` }}
        </b-th>
      </b-tr>
      <app-event-table-row
        v-for="(event, index) in mappedEvents.firstHalf"
        :key="index"
        :event="event"
        :teams="teams"
      />
      <b-tr>
        <b-td
          v-if="!mappedEvents.firstHalf.length"
          class="text-center"
          style="font-size: 14px"
        >No events in the first half.</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-center" variant="secondary">
          {{ `Second Half:  ${score.fulltime.home - score.halftime.home} - ${score.fulltime.away - score.halftime.away}` }}
        </b-th>
      </b-tr>
      <app-event-table-row
        v-for="(event, index) in mappedEvents.secondHalf"
        :key="(index + 1) * 115"
        :event="event"
        :teams="teams"
      />
      <b-tr>
        <b-td
          v-if="!mappedEvents.secondHalf.length"
          class="text-center"
          style="font-size: 14px"
        >No events in the second half.</b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import EventTableRow from './EventTableRow.vue'

export default {
  components: {
    appEventTableRow: EventTableRow
  },
  props: {
    tabData: Array,
    teams: Object,
    score: Object
  },
  computed: {
    mappedEvents () {
      const map = {
        firstHalf: [],
        secondHalf: []
      }
      this.tabData.forEach(event => {
        if (event.time.elapsed < 46) {
          map.firstHalf.push(event)
        } else {
          map.secondHalf.push(event)
        }
      })

      return map
    }
  }
}
</script>

<style scoped>
th {
  font-weight: 500;
  color: #444d55;
}
</style>
