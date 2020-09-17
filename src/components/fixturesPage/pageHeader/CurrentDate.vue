<template>
  <b-input-group class="shadow-sm">
    <template v-slot:prepend>
      <b-button variant="outline-dark" disabled>
        <b-icon icon="calendar-check"></b-icon>
      </b-button>
    </template>
    <b-form-input :value="currentDate" class="text-center" readonly></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date().toDateString()
    }
  }
}
</script>

<style scoped>
input[readonly] {
  background-color: white;
 border: 1px solid #ced4da;
}

input[readonly]:focus {
  box-shadow: unset;
}

button[disabled] {
  opacity: 1;
  border: 1px solid #ced4da;
  border-right: 0;
}
</style>
