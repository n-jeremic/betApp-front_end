<template>
  <b-form-datepicker
    size="lg"
    local="en"
    class="shadow-sm text-center"
    placeholder="Previous fixtures"
    menu-class="shadow"
    :calendar-width="calendarWidth"
    :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
    :max="$options.nrData.dateToday"
    :min="$options.nrData.minDate"
    :value="selectedDate"
    @input="handleInput"
  />
</template>

<script>
export default {
  props: {
    selectedDate: String,
    calendarColumnRef: HTMLDivElement
  },
  nrData: {
    dateToday: new Date(),
    minDate: '2020-08-01'
  },
  computed: {
    calendarWidth () {
      if (this.calendarColumnRef) {
        const columnWidth = this.calendarColumnRef.offsetWidth
        return `${columnWidth - 20}px`
      } else {
        return '270px'
      }
    }
  },
  methods: {
    handleInput (inputValue) {
      this.$emit('input', inputValue)
    }
  }
}
</script>
