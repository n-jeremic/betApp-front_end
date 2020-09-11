<template>
  <b-card class="shadow-sm error-message">
    {{ errorMessage }}
  </b-card>
</template>

<script>
export default {
  props: {
    errorMessage: String
  }
}
</script>

<style scoped>
.error-message {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #595959;
  margin-top: 2rem;
}
</style>
