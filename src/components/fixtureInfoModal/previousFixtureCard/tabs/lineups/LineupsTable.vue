<template>
  <b-card
    :header="lineupsData.team.name"
    body-class="p-0"
    header-class="text-center header-style"
    class="shadow-sm mb-1"
  >
    <b-table-simple class="mb-0" small>
      <b-tr>
        <b-th colspan="2" class="border-top-0">
          Formation:
          <span class="font-weight-normal ml-1">{{ lineupsData.formation }}</span>
        </b-th>
      </b-tr>
      <b-tr>
        <b-th colspan="2">First squad:</b-th>
      </b-tr>
      <b-tr v-for="playerObj in sortPlayersByPosition(lineupsData.startXI)" :key="playerObj.player.id">
        <b-td
          v-if="playerObj.player.pos"
          class="border-right text-center"
          :variant="getColorByPosition(playerObj.player.pos)"
        >{{ playerObj.player.pos }}</b-td>
        <b-td>{{ playerObj.player.name | formatPlayerName }}</b-td>
      </b-tr>
      <b-tr>
        <b-th colspan="2">Substitutes:</b-th>
      </b-tr>
      <b-tr v-for="playerObj in sortPlayersByPosition(lineupsData.substitutes)" :key="playerObj.player.id">
        <b-td
          v-if="playerObj.player.pos"
          class="border-right text-center"
          :variant="getColorByPosition(playerObj.player.pos)"
        >{{ playerObj.player.pos }}</b-td>
        <b-td>{{ playerObj.player.name | formatPlayerName }}</b-td>
      </b-tr>
      <b-tr v-if="lineupsData.coach.name">
        <b-th colspan="2">Coach:</b-th>
      </b-tr>
      <b-tr v-if="lineupsData.coach.name">
        <b-td colspan="2">{{ lineupsData.coach.name }}</b-td>
      </b-tr>
    </b-table-simple>
  </b-card>
</template>

<script>
export default {
  props: {
    lineupsData: Object
  },
  filters: {
    formatPlayerName (playerName) {
      const arr = playerName.split(' ')
      if (arr.length > 3) {
        return arr.slice(0, 3).join(' ')
      } else {
        return playerName
      }
    }
  },
  methods: {
    sortPlayersByPosition (playersArr) {
      const order = ['G', 'D', 'M', 'F']
      const map = {}
      let result = []

      playersArr.forEach(element => {
        const playerPosition = element.player.pos
        if (map[playerPosition]) {
          map[playerPosition].push(element)
        } else {
          map[playerPosition] = [element]
        }
      })

      order.forEach(position => {
        if (map[position]) {
          result = result.concat(map[position])
        }
      })

      if (result.length) return result
      else return playersArr
    },
    getColorByPosition (playerPosition) {
      if (playerPosition === 'G') return 'info'
      else if (playerPosition === 'D') return 'primary'
      else if (playerPosition === 'M') return 'warning'
      else return 'success'
    }
  }
}
</script>

<style scoped>
.header-style {
  padding: 5px;
  color: var(--title-color);
  font-weight: 600;
}

.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.125);
}

th {
  color: #444d55;
  font-weight: 600;
}

td {
  font-size: 14px;
}
</style>
