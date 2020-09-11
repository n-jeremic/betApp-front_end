<template>
  <b-col cols="6" class="margin-top">
    <b-card bg-variant="info" text-variant="white" body-class="padding">
      <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: {
    fixture: Object
  }
}
</script>

<style scoped>
.margin-top {
  margin-top: 1rem;
}

.padding {
  padding: 0.5rem;
}
</style>
