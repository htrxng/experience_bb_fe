<template>
  <svg :class="`icon ${className}`" viewBox="0 0 24 24"  >
    <path :d="path" />
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
  },

}
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;
}
</style>
