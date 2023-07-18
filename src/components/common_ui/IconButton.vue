<template>
  <div class="icon-button-container"  @click="handleClick">
    <mdi-icon
        :icon="icon"
        :class="classes"
        :color="color"
    >
    </mdi-icon>
  </div>
</template>

<script>
import SvgIcon from "../icons/SvgIcon";
import MdiIcon from "../icons/MdiIcon";

export default {
  name: "IconButton",
  components: {
    MdiIcon,
    "svg-icon": SvgIcon,
  },
  props: {
    icon: String,
    color: String
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