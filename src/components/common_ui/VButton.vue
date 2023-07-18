<template>
  <button :class="classes"
          :color="color"
  >
    <router-link class="link" v-bind:to="link"> {{ this.text }}</router-link>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    color: String,
    text: String,
    link: String,
  },
  computed: {
    classes() {
      return [
        "btn-container",
        `color-${this.color}`
      ]
    }
  }
}
</script>

<style scoped>
.btn-container {
  /*background-color: #43A047;*/
  /*color: white;*/
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-container .link {
  text-decoration: none;
  color: white;
}

.btn-container .link:hover {
  background-color: darkgreen;
}

.btn-container .link:focus {
  outline: none;
}

.color-green {
  background-color: #43A047;
  color: white;
}

.color-orange {
  background-color: orange;
  color: white;
}
.color-blue {
  background-color: cornflowerblue;
  color: white;
}
</style>