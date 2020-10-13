<template>
  <b-row>
    <b-col cols="4">
      {{ time }}
    </b-col>
    <b-col cols="4" class="text-center">
      <span
        :class="[
          'fixture-title',
          { 'text-info' : status === 'warning' },
          { 'text-danger' : status === 'onGoing' }
        ]"
      >
        {{ title }}
      </span>
      <b-icon
        v-if="status === 'warning'"
        icon="exclamation-octagon"
        variant="info"
        class="ml-2"
      />
      <b-icon
        v-else-if="status === 'onGoing'"
        icon="circle-fill"
        animation="throb"
        variant="danger"
        class="ml-2"
      />
    </b-col>
    <b-col cols="4" class="text-right">
      {{ round }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    time: String,
    title: String,
    round: String,
    status: String
  }
}
</script>

<style scoped>
.fixture-title {
  font-weight: 600;
  vertical-align: top;
}
</style>
