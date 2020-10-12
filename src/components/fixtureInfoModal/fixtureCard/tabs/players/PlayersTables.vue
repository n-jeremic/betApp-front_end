<template>
  <div class="tables-container">
    <b-table-simple
      v-for="(playersGroup, index) in players"
      :key="index"
      class="mb-4 shadow-sm"
      small
      hover
      bordered
    >
      <b-thead head-variant="light">
        <b-th colspan="7">{{ generateTableTitle(index) }}</b-th>
      </b-thead>
      <b-tbody>
        <b-tr>
          <th>Player</th>
          <th class="text-center">Age</th>
          <th class="text-center" v-b-tooltip.hover title="Matches played">MP</th>
          <th class="text-center" v-b-tooltip.hover title="Matches started">MS</th>
          <th class="text-center" v-b-tooltip.hover title="Goals scored">GS</th>
          <th class="text-center" v-b-tooltip.hover title="Assists provided">AP</th>
          <th class="text-center" v-b-tooltip.hover title="Average rating">Rating</th>
        </b-tr>
        <b-tr v-for="player in playersGroup" :key="player.id">
          <td>
            <b-img :src="player.photo" :alt="`${player.name}-photo`" rounded="circle"/>
            <span>
              {{ player.name }}
            </span>
          </td>
          <td class="text-center">{{ player.age }}</td>
          <td class="text-center">{{ player.games.appearences }}</td>
          <td class="text-center">{{ player.games.lineups }}</td>
          <td class="text-center">{{ player.totalGoals }}</td>
          <td class="text-center">{{ player.totalAssists }}</td>
          <td class="text-center">{{ player.games.rating ? player.games.rating : 'N/A' }}</td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  props: {
    players: Array
  },
  methods: {
    generateTableTitle (integer) {
      if (integer === 0) return 'Goalkeepers'
      else if (integer === 1) return 'Defenders'
      else if (integer === 2) return 'Midfielders'
      else return 'Attackers'
    }
  }
}
</script>

<style scoped>
.tables-container {
  height: 87%;
  overflow-y: auto;
}

.table:last-child {
  margin-bottom: 5px !important;
}

img {
  width: 24px;
  margin-bottom: 2px;
  margin-right: 3px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.tables-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tables-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
