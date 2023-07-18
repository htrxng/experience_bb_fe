<template>
  <div :class="classes">
    <svg-icon :path="path" ></svg-icon>
  </div>
</template>

<script>
import SvgIcon from "../icons/SvgIcon";
import get from "lodash/get";

export default {
  components: {SvgIcon},

  props: {
    icon: {
      type: String,
      required: true
    },
    size: {type: String, default: "normal"},
    color: {type: String, default: "grey"},
  },

  computed: {
    path() {
      let mdi = require("@mdi/js");
      return get(mdi, this.dashToCamel(this.icon));
    },

    classes() {
      return [
        "icon-container",
        `size-${this.size}`,
        `color-${this.color}`,
      ];
    },
  },

  methods: {
    dashToCamel(str) {
      return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    },
  },
};
</script>

<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}


.size-xl {
  font-size: 40px;

}

.size-large {
  font-size: 32px;

}

.size-medium {
  font-size: 24px;
}

.size-normal {
  font-size: 18px;
}

.size-small {
  font-size: 14px;
}

.size-xs {
  font-size: 12px;

}

.color-grey {
  color: grey;
  fill: grey;
}

.color-white {
  color: white;
  fill: white;
}


.color-green {
  color: green;
  fill: green;
}

.color-deepBlue {
  color: darkblue;
  fill: darkblue;
}

.color-blue {
  color: blue;
  fill: blue;
}

.color-red {
  color: firebrick;
  fill: firebrick;
}
.color-orange {
  color: orange;
  fill: orange;
}

</style>

