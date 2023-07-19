<template>
  <div class="icon-button-container" @click="handleClick">
      <mdi-icon
          :icon="icon"
          :class="classes"
          :color="color"
      >
      </mdi-icon>
  </div>
</template>

<script>
import MdiIcon from "../icons/MdiIcon";

export default {
  name: "IconButton",
  components: {
    MdiIcon,
  },
  props: {
    icon: String,
    color: String,
    link: String,
  },
  computed: {
    classes() {
      return [
        'icon-button',
      ];
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.icon-button-container {
  width: 24px;
  height: 24px;
}

icon-button:hover {
   background-color: whitesmoke;
   border-radius: 50%
 }
.icon-button {
  cursor: pointer;
}
</style>