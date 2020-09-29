<template>
  <b-card
    class="shadow-sm error-message"
    :style="{ 'font-size': fontSize, 'margin-top': noMargin ? '0' : '2rem' }"
  >
    {{ errorMessage }}
  </b-card>
</template>

<script>
export default {
  props: {
    errorMessage: String,
    fontSize: String,
    noMargin: Boolean
  }
}
</script>

<style scoped>
.error-message {
  text-align: center;
  font-weight: 600;
  color: #595959;
}
</style>
