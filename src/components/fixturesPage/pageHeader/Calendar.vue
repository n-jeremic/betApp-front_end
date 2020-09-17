<template>
  <b-form-datepicker
    local="en"
    class="shadow-sm text-center"
    placeholder="Previous fixtures"
    menu-class="shadow"
    :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
    :max="$options.nrData.dateToday"
    :value="selectedDate"
    @input="handleInput"
  />
</template>

<script>
export default {
  props: {
    selectedDate: String
  },
  methods: {
    handleInput (inputValue) {
      this.$emit('input', inputValue)
    }
  },
  nrData: {
    dateToday: new Date()
  }
}
</script>
