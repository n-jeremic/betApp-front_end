<template>
  <div :style="{'margin-top': marginTop, 'text-align': 'center'}">
    <b-spinner
      variant="primary"
      style="width: 3rem; height: 3rem"
      :type="spinnerType"
    />
  </div>
</template>

<script>
export default {
  props: {
    marginTop: String,
    spinnerType: String
  }
}
</script>
